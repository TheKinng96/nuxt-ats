<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface FormField {
  id?: string
  label: string
  type: string
  placeholder?: string
  helpText?: string
  required: boolean
  options?: string
  showInTable: boolean
  order: number
}

interface Props {
  field: FormField
  index: number
}

interface Emits {
  (e: 'update', field: FormField): void
  (e: 'delete', fieldId: string | undefined): void
  (e: 'duplicate', field: FormField): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const localField = ref({ ...props.field })
const optionsText = ref('')

// Parse options on mount
if (localField.value.options) {
  try {
    const parsed = JSON.parse(localField.value.options)
    optionsText.value = Array.isArray(parsed) ? parsed.join('\n') : ''
  } catch (e) {
    optionsText.value = ''
  }
}

const hasOptions = computed(() => {
  const type = localField.value.type
  return type === 'SELECT' || type === 'MULTI_SELECT' || type === 'RADIO'
})

// Auto-save on changes
watch(localField, (newValue) => {
  // Convert options text to JSON if applicable
  if (hasOptions.value && optionsText.value.trim()) {
    const options = optionsText.value
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
    newValue.options = JSON.stringify(options)
  }

  emit('update', newValue)
}, { deep: true })

watch(optionsText, () => {
  if (hasOptions.value) {
    const options = optionsText.value
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
    localField.value.options = JSON.stringify(options)
  }
})

const fieldTypeIcons: Record<string, string> = {
  TEXT: '📝',
  EMAIL: '✉️',
  PHONE: '📱',
  TEXTAREA: '📄',
  NUMBER: '#️⃣',
  SELECT: '▼',
  MULTI_SELECT: '☑️',
  CHECKBOX: '☑️',
  RADIO: '⚪',
  DATE: '📅',
  FILE: '📎',
  URL: '🔗',
}

const fieldTypeLabels: Record<string, string> = {
  TEXT: 'テキスト',
  EMAIL: 'メール',
  PHONE: '電話',
  TEXTAREA: 'テキストエリア',
  NUMBER: '数値',
  SELECT: 'プルダウン',
  MULTI_SELECT: '複数選択',
  CHECKBOX: 'チェックボックス',
  RADIO: 'ラジオボタン',
  DATE: '日付',
  FILE: 'ファイル',
  URL: 'URL',
}

const getFieldIcon = (type: string) => fieldTypeIcons[type] || '❓'
const getFieldLabel = (type: string) => fieldTypeLabels[type] || type
</script>

<template>
  <div class="group relative border rounded-lg bg-white hover:border-blue-400 hover:shadow-md transition-all duration-200 p-6">
    <!-- Drag Handle -->
    <div
      class="absolute left-2 top-1/2 -translate-y-1/2 cursor-move opacity-0 group-hover:opacity-100 transition-opacity"
      data-handle
    >
      <div class="flex flex-col gap-0.5">
        <div class="w-1 h-1 rounded-full bg-gray-400"></div>
        <div class="w-1 h-1 rounded-full bg-gray-400"></div>
        <div class="w-1 h-1 rounded-full bg-gray-400"></div>
        <div class="w-1 h-1 rounded-full bg-gray-400"></div>
        <div class="w-1 h-1 rounded-full bg-gray-400"></div>
        <div class="w-1 h-1 rounded-full bg-gray-400"></div>
      </div>
    </div>

    <!-- Actions (Top Right) -->
    <div class="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <Button
        variant="ghost"
        size="sm"
        @click="emit('duplicate', localField)"
        title="複製"
      >
        <span class="text-base">📋</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        @click="emit('delete', localField.id)"
        title="削除"
        class="text-red-600 hover:text-red-700 hover:bg-red-50"
      >
        <span class="text-base">🗑️</span>
      </Button>
    </div>

    <!-- Field Content -->
    <div class="space-y-4 pr-24">
      <!-- Question (Title) -->
      <div class="space-y-2">
        <input
          v-model="localField.label"
          type="text"
          placeholder="質問"
          class="w-full text-lg font-medium text-gray-900 border-0 border-b-2 border-transparent hover:border-gray-200 focus:border-blue-500 focus:outline-none transition-colors px-0 py-1"
        />
        <span v-if="localField.required" class="text-red-500 text-sm">* 必須</span>
      </div>

      <!-- Description/Help Text -->
      <input
        v-model="localField.helpText"
        type="text"
        placeholder="説明（オプション）"
        class="w-full text-sm text-gray-600 border-0 border-b-2 border-transparent hover:border-gray-200 focus:border-blue-500 focus:outline-none transition-colors px-0 py-1"
      />

      <!-- Answer Field Preview -->
      <div class="mt-6">
        <!-- Text Input Preview -->
        <div v-if="localField.type === 'TEXT'">
          <input
            type="text"
            :placeholder="localField.placeholder || 'テキストを入力'"
            disabled
            class="w-full md:w-1/2 border-b border-gray-300 py-2 text-gray-400 bg-transparent cursor-not-allowed"
          />
        </div>

        <!-- Email Preview -->
        <div v-else-if="localField.type === 'EMAIL'">
          <input
            type="email"
            :placeholder="localField.placeholder || 'メールアドレスを入力'"
            disabled
            class="w-full md:w-1/2 border-b border-gray-300 py-2 text-gray-400 bg-transparent cursor-not-allowed"
          />
        </div>

        <!-- Phone Preview -->
        <div v-else-if="localField.type === 'PHONE'">
          <input
            type="tel"
            :placeholder="localField.placeholder || '電話番号を入力'"
            disabled
            class="w-full md:w-1/2 border-b border-gray-300 py-2 text-gray-400 bg-transparent cursor-not-allowed"
          />
        </div>

        <!-- URL Preview -->
        <div v-else-if="localField.type === 'URL'">
          <input
            type="url"
            :placeholder="localField.placeholder || 'URLを入力'"
            disabled
            class="w-full md:w-1/2 border-b border-gray-300 py-2 text-gray-400 bg-transparent cursor-not-allowed"
          />
        </div>

        <!-- Textarea Preview -->
        <div v-else-if="localField.type === 'TEXTAREA'">
          <textarea
            :placeholder="localField.placeholder || '長文を入力'"
            disabled
            rows="3"
            class="w-full border border-gray-300 rounded px-3 py-2 text-gray-400 bg-gray-50 cursor-not-allowed"
          ></textarea>
        </div>

        <!-- Number Preview -->
        <div v-else-if="localField.type === 'NUMBER'">
          <input
            type="number"
            :placeholder="localField.placeholder || '数値を入力'"
            disabled
            class="w-full md:w-1/3 border-b border-gray-300 py-2 text-gray-400 bg-transparent cursor-not-allowed"
          />
        </div>

        <!-- Date Preview -->
        <div v-else-if="localField.type === 'DATE'">
          <input
            type="date"
            disabled
            class="w-full md:w-1/3 border border-gray-300 rounded px-3 py-2 text-gray-400 bg-gray-50 cursor-not-allowed"
          />
        </div>

        <!-- Select/Radio/Checkbox with Options Editor -->
        <div v-else-if="hasOptions" class="space-y-3">
          <div class="text-sm text-gray-600 mb-2">選択肢を編集:</div>
          <textarea
            v-model="optionsText"
            rows="4"
            class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="選択肢を1行に1つずつ入力&#10;例:&#10;選択肢 1&#10;選択肢 2&#10;選択肢 3"
          ></textarea>
        </div>

        <!-- File Upload Preview -->
        <div v-else-if="localField.type === 'FILE'">
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-400">
            <span class="text-2xl mb-2 block">📎</span>
            <span class="text-sm">ファイルをアップロード</span>
          </div>
        </div>
      </div>

      <!-- Options (Bottom) -->
      <div class="flex items-center gap-6 pt-4 border-t">
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            v-model="localField.required"
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span class="text-sm text-gray-700">必須</span>
        </label>

        <label class="flex items-center gap-2 cursor-pointer">
          <input
            v-model="localField.showInTable"
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span class="text-sm text-gray-700">テーブル表示</span>
        </label>
      </div>
    </div>
  </div>
</template>
