<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ja from './index.locale.ja'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const { t } = useComponentI18n({ messages: { ja } })

// State
const forms = ref<any[]>([])
const loading = ref(true)
const error = ref('')

// Fetch forms
const fetchForms = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await $fetch('/api/forms')
    forms.value = response.forms
  } catch (err: any) {
    error.value = err.data?.statusMessage || t('forms.errors.fetchFailed')
  } finally {
    loading.value = false
  }
}

// Delete form
const deleteForm = async (id: string, name: string) => {
  if (!confirm(t('forms.confirmDelete', { name }))) {
    return
  }

  try {
    await $fetch(`/api/forms/${id}`, { method: 'DELETE' })
    await fetchForms()
  } catch (err: any) {
    alert(err.data?.statusMessage || t('forms.errors.deleteFailed'))
  }
}

// Format date
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

onMounted(() => {
  fetchForms()
})
</script>

<template>
  <div class="p-8">
    <!-- Header -->
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">{{ t('forms.title') }}</h1>
        <p class="mt-2 text-gray-600">{{ t('forms.subtitle') }}</p>
      </div>
      <Button as-child>
        <NuxtLink to="/dashboard/forms/new">
          <span class="text-lg mr-2">+</span>
          {{ t('forms.createButton') }}
        </NuxtLink>
      </Button>
    </div>

    <!-- Error message -->
    <div v-if="error" class="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">
      {{ error }}
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="text-center py-12">
      <p class="text-gray-600">{{ t('common.messages.loading') }}</p>
    </div>

    <!-- Empty state -->
    <Card v-else-if="forms.length === 0">
      <CardContent class="p-12 text-center">
        <div class="text-6xl mb-4">📝</div>
        <h2 class="text-xl font-semibold text-gray-900 mb-2">{{ t('forms.empty.title') }}</h2>
        <p class="text-gray-600 mb-6">{{ t('forms.empty.description') }}</p>
        <Button as-child>
          <NuxtLink to="/dashboard/forms/new">
            {{ t('forms.createButton') }}
          </NuxtLink>
        </Button>
      </CardContent>
    </Card>

    <!-- Forms grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card v-for="form in forms" :key="form.id" class="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <CardTitle class="text-lg">{{ form.name }}</CardTitle>
              <CardDescription v-if="form.description" class="mt-1">
                {{ form.description }}
              </CardDescription>
            </div>
            <span
              :class="[
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                form.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800',
              ]"
            >
              {{ form.isActive ? t('forms.status.active') : t('forms.status.inactive') }}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <!-- Form stats -->
          <div class="space-y-2 text-sm text-gray-600 mb-4">
            <div class="flex items-center justify-between">
              <span>{{ t('forms.stats.fields') }}</span>
              <span class="font-medium text-gray-900">{{ form._count.fields }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span>{{ t('forms.stats.candidates') }}</span>
              <span class="font-medium text-gray-900">{{ form._count.candidates }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span>{{ t('forms.stats.submissions') }}</span>
              <span class="font-medium text-gray-900">{{ form._count.submissions }}</span>
            </div>
          </div>

          <!-- Form slug -->
          <div class="mb-4 p-2 bg-gray-50 rounded text-xs font-mono text-gray-600">
            /apply/{{ form.slug }}
          </div>

          <!-- Created date -->
          <p class="text-xs text-gray-500 mb-4">
            {{ t('forms.createdAt') }}: {{ formatDate(form.createdAt) }}
          </p>

          <!-- Actions -->
          <div class="flex gap-2">
            <NuxtLink
              :to="`/dashboard/forms/${form.id}/builder`"
              class="flex-1 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 transition-colors"
            >
              {{ t('forms.actions.edit') }}
            </NuxtLink>
            <Button variant="outline" @click="deleteForm(form.id, form.name)" class="px-3">
              🗑️
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
