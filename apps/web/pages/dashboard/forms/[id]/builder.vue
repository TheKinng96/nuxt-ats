<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
// import Draggable from 'vuedraggable'
import { fieldTemplates, createFieldFromTemplate, type FieldTemplate } from '~/lib/field-templates'
import { useToast } from '~/composables/useToast'
import ja from './builder.locale.ja'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const { t } = useComponentI18n({ messages: { ja } })
const { success, error: showError } = useToast()
const route = useRoute()
const router = useRouter()

const formId = computed(() => route.params.id as string)

// State
const form = ref<any>(null)
const fields = ref<any[]>([])
const loading = ref(true)
const saving = ref(false)
const error = ref('')

// Header image state
const headerImage = ref<string | null>(null)
const showImageUpload = ref(false)

// Form description
const description = ref('')

// Tab state
const activeTab = ref<'edit' | 'insights'>('edit')

// Fetch form data
const fetchForm = async () => {
  loading.value = true
  error.value = ''

  try {
    const response: any = await $fetch(`/api/forms/${formId.value}`)
    form.value = response.form
    fields.value = response.form.fields || []
    headerImage.value = response.form.headerImage || null
    description.value = response.form.description || ''
  } catch (err: any) {
    error.value = err.data?.statusMessage || t('builder.errors.fetchFailed')
  } finally {
    loading.value = false
  }
}

// Add field from template
const handleAddField = (template: FieldTemplate) => {
  const newField = createFieldFromTemplate(template.id, fields.value.length)
  if (newField) {
    fields.value.push({
      ...newField,
      id: `temp-${Date.now()}`, // Temporary ID for new fields
    })
  }
}

// Update field (inline editing)
const handleUpdateField = (updatedField: any) => {
  const index = fields.value.findIndex((f) => f.id === updatedField.id)
  if (index !== -1) {
    fields.value[index] = updatedField
  }
}

// Duplicate field
const handleDuplicateField = (field: any) => {
  const duplicatedField = {
    ...field,
    id: `temp-${Date.now()}`,
    label: `${field.label} (コピー)`,
    order: fields.value.length,
  }
  fields.value.push(duplicatedField)
}

// Delete field
const handleDeleteField = (fieldId: string) => {
  fields.value = fields.value.filter((f) => f.id !== fieldId)
  success('フィールドを削除しました')
}

// Update field orders after drag
const updateFieldOrders = () => {
  fields.value.forEach((field, index) => {
    field.order = index
  })
}

// Save all changes
const handleSave = async () => {
  saving.value = true
  error.value = ''

  try {
    // Update field orders
    updateFieldOrders()

    // Prepare fields data (remove temp IDs)
    const fieldsData = fields.value.map((field) => {
      const { id, ...rest } = field
      return id && !id.startsWith('temp-') ? { id, ...rest } : rest
    })

    // Call API
    await $fetch(`/api/forms/${formId.value}`, {
      method: 'PUT',
      body: {
        name: form.value.name,
        slug: form.value.slug,
        description: description.value,
        headerImage: headerImage.value,
        isActive: form.value.isActive,
        fields: fieldsData,
      },
    })

    // Refetch to get updated data
    await fetchForm()

    // Show success message
    success(t('builder.success.saved'))
  } catch (err: any) {
    error.value = err.data?.statusMessage || t('builder.errors.saveFailed')
  } finally {
    saving.value = false
  }
}

// Toggle publish status
const handleTogglePublish = async () => {
  if (!form.value) return

  saving.value = true
  error.value = ''

  try {
    form.value.isActive = !form.value.isActive

    await $fetch(`/api/forms/${formId.value}`, {
      method: 'PUT',
      body: {
        name: form.value.name,
        slug: form.value.slug,
        description: description.value,
        headerImage: headerImage.value,
        isActive: form.value.isActive,
      },
    })

    success(form.value.isActive ? 'フォームを公開しました' : 'フォームを非公開にしました')
  } catch (err: any) {
    form.value.isActive = !form.value.isActive // Revert on error
    error.value = err.data?.statusMessage || 'ステータスの更新に失敗しました'
  } finally {
    saving.value = false
  }
}

// Handle image upload (placeholder - will be implemented later)
const handleImageUpload = () => {
  const url = prompt(t('builder.imageUpload.prompt'))
  if (url) {
    headerImage.value = url
  }
  showImageUpload.value = false
}

const removeHeaderImage = () => {
  headerImage.value = null
  success('ヘッダー画像を削除しました')
}

onMounted(() => {
  fetchForm()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <!-- Top Bar -->
    <div class="sticky top-0 z-40 bg-white border-b shadow-sm">
      <div class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <Button variant="ghost" size="sm" as-child>
            <NuxtLink :to="`/dashboard/forms`">
              ← {{ t('builder.back') }}
            </NuxtLink>
          </Button>
          <div class="h-6 w-px bg-gray-300"></div>
          <h1 class="font-semibold text-gray-900">
            {{ form?.name || t('builder.title') }}
          </h1>
        </div>
        <div class="flex items-center gap-2">
          <Button variant="outline" size="sm" :disabled="saving">
            {{ t('builder.preview') }}
          </Button>
          <Button
            v-if="form?.isActive"
            variant="outline"
            size="sm"
            @click="handleTogglePublish"
            :disabled="saving"
          >
            非公開にする
          </Button>
          <Button
            v-else
            variant="default"
            size="sm"
            @click="handleTogglePublish"
            :disabled="saving"
            class="bg-green-600 hover:bg-green-700"
          >
            公開する
          </Button>
          <Button size="sm" @click="handleSave" :disabled="saving">
            {{ saving ? t('common.messages.loading') : t('builder.save') }}
          </Button>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div v-if="!loading && form" class="bg-white border-b">
      <div class="max-w-5xl mx-auto px-4">
        <div class="flex gap-1">
          <button
            @click="activeTab = 'edit'"
            :class="[
              'px-6 py-3 font-medium text-sm border-b-2 transition-colors',
              activeTab === 'edit'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            ]"
          >
            {{ t('builder.tabs.edit') }}
          </button>
          <button
            @click="activeTab = 'insights'"
            :class="[
              'px-6 py-3 font-medium text-sm border-b-2 transition-colors',
              activeTab === 'insights'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            ]"
          >
            {{ t('builder.tabs.insights') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Error -->
    <div v-if="error" class="max-w-3xl mx-auto mt-6 px-4">
      <div class="rounded-lg bg-red-50 p-4 text-sm text-red-600">
        {{ error }}
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="max-w-3xl mx-auto mt-12 px-4 text-center">
      <p class="text-gray-600">{{ t('common.messages.loading') }}</p>
    </div>

    <!-- Edit Tab -->
    <div v-else-if="form && activeTab === 'edit'" class="max-w-3xl mx-auto mt-8 px-4 space-y-6">
      <!-- Header Image Section -->
      <div class="bg-white rounded-lg border overflow-hidden">
        <div
          v-if="headerImage"
          class="relative group"
        >
          <img
            :src="headerImage"
            alt="Form header"
            class="w-full h-64 object-cover"
          />
          <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
            <Button
              size="sm"
              variant="outline"
              class="bg-white"
              @click="handleImageUpload"
            >
              {{ t('builder.imageUpload.change') }}
            </Button>
            <Button
              size="sm"
              variant="outline"
              class="bg-white text-red-600 hover:text-red-700"
              @click="removeHeaderImage"
            >
              {{ t('builder.imageUpload.remove') }}
            </Button>
          </div>
        </div>
        <button
          v-else
          @click="handleImageUpload"
          class="w-full py-12 border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group"
        >
          <div class="flex flex-col items-center gap-2">
            <span class="text-4xl">🖼️</span>
            <span class="text-sm font-medium text-gray-600 group-hover:text-blue-600">
              {{ t('builder.imageUpload.add') }}
            </span>
          </div>
        </button>
      </div>

      <!-- Form Title & Description -->
      <div class="bg-white rounded-lg border p-8">
        <!-- Inline Editable Title -->
        <input
          v-model="form.name"
          type="text"
          class="w-full text-3xl font-bold text-gray-900 mb-4 border border-gray-300 rounded-md hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all px-3 py-2"
          placeholder="無題のフォーム"
        />

        <!-- Inline Editable Description -->
        <textarea
          v-model="description"
          rows="3"
          class="w-full text-gray-600 border border-gray-300 rounded-md hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all px-3 py-2 resize-none"
          :placeholder="t('builder.description.placeholder')"
        ></textarea>
      </div>

      <!-- Fields Section -->
      <div class="space-y-4">
        <!-- Temporary: Simple list without drag and drop -->
        <div class="space-y-4">
          <FormsFieldBlock
            v-for="(field, index) in fields"
            :key="field.id"
            :field="field"
            :index="index"
            @update="handleUpdateField"
            @delete="handleDeleteField"
            @duplicate="handleDuplicateField"
          />
        </div>

        <!-- Add Field Button -->
        <FormsAddFieldButton @select="handleAddField" />
      </div>
    </div>

    <!-- Insights Tab -->
    <div v-else-if="form && activeTab === 'insights'" class="max-w-5xl mx-auto mt-8 px-4 space-y-6">
      <!-- Stats Overview -->
      <Card>
        <CardHeader>
          <CardTitle>{{ t('builder.stats.title') }}</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-3 gap-6">
            <div class="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <div class="text-4xl font-bold text-blue-900">{{ fields.length }}</div>
              <div class="text-sm text-blue-700 mt-2 font-medium">{{ t('builder.stats.fields') }}</div>
            </div>
            <div class="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <div class="text-4xl font-bold text-green-900">{{ form._count.candidates }}</div>
              <div class="text-sm text-green-700 mt-2 font-medium">{{ t('builder.stats.candidates') }}</div>
            </div>
            <div class="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <div class="text-4xl font-bold text-purple-900">{{ form._count.submissions }}</div>
              <div class="text-sm text-purple-700 mt-2 font-medium">{{ t('builder.stats.submissions') }}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Form Details -->
      <Card>
        <CardHeader>
          <CardTitle>フォーム詳細</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div class="flex justify-between py-3 border-b">
              <span class="text-gray-600">フォームURL</span>
              <span class="font-mono text-sm text-gray-900">/apply/{{ form.slug }}</span>
            </div>
            <div class="flex justify-between py-3 border-b">
              <span class="text-gray-600">ステータス</span>
              <span :class="form.isActive ? 'text-green-600 font-medium' : 'text-gray-600'">
                {{ form.isActive ? '公開中' : '非公開' }}
              </span>
            </div>
            <div class="flex justify-between py-3 border-b">
              <span class="text-gray-600">作成日</span>
              <span class="text-gray-900">{{ new Date(form.createdAt).toLocaleDateString('ja-JP') }}</span>
            </div>
            <div class="flex justify-between py-3">
              <span class="text-gray-600">最終更新</span>
              <span class="text-gray-900">{{ new Date(form.updatedAt).toLocaleDateString('ja-JP') }}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
