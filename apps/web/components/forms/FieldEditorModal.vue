<script setup lang="ts">
import { ref, watch } from 'vue'

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
  field: FormField | null
  show: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'save', field: FormField): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const localField = ref<FormField | null>(null)
const optionsText = ref('')

watch(
  () => props.field,
  (newField) => {
    if (newField) {
      localField.value = { ...newField }
      // Parse options if it's a select/multi-select/radio field
      if (newField.options) {
        try {
          const parsed = JSON.parse(newField.options)
          optionsText.value = Array.isArray(parsed) ? parsed.join('\n') : ''
        } catch (e) {
          optionsText.value = ''
        }
      } else {
        optionsText.value = ''
      }
    }
  },
  { immediate: true }
)

const hasOptions = () => {
  const type = localField.value?.type
  return type === 'SELECT' || type === 'MULTI_SELECT' || type === 'RADIO'
}

const handleSave = () => {
  if (!localField.value) return

  // Convert options text to JSON if applicable
  if (hasOptions() && optionsText.value.trim()) {
    const options = optionsText.value
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
    localField.value.options = JSON.stringify(options)
  }

  emit('save', localField.value)
  emit('close')
}

const handleClose = () => {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="show && localField"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      @click.self="handleClose"
    >
      <div
        class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b">
          <h2 class="text-xl font-semibold text-gray-900">
            フィールドを編集
          </h2>
          <button
            @click="handleClose"
            class="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <!-- Body -->
        <div class="p-6 space-y-6">
          <!-- Label -->
          <div class="space-y-2">
            <Label for="label">
              ラベル
              <span class="text-red-500">*</span>
            </Label>
            <Input
              id="label"
              v-model="localField.label"
              type="text"
              placeholder="質問や項目名を入力"
            />
          </div>

          <!-- Type (Read-only) -->
          <div class="space-y-2">
            <Label>フィールドタイプ</Label>
            <div class="px-3 py-2 bg-gray-50 border rounded-md text-gray-700">
              {{ localField.type }}
            </div>
          </div>

          <!-- Placeholder -->
          <div class="space-y-2">
            <Label for="placeholder">プレースホルダー</Label>
            <Input
              id="placeholder"
              v-model="localField.placeholder"
              type="text"
              placeholder="入力例を表示（オプション）"
            />
          </div>

          <!-- Help Text -->
          <div class="space-y-2">
            <Label for="helpText">ヘルプテキスト</Label>
            <Input
              id="helpText"
              v-model="localField.helpText"
              type="text"
              placeholder="補足説明（オプション）"
            />
          </div>

          <!-- Options (for SELECT, MULTI_SELECT, RADIO) -->
          <div v-if="hasOptions()" class="space-y-2">
            <Label for="options">
              選択肢
              <span class="text-red-500">*</span>
            </Label>
            <textarea
              id="options"
              v-model="optionsText"
              rows="5"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1行に1つずつ選択肢を入力&#10;例:&#10;オプション 1&#10;オプション 2&#10;オプション 3"
            ></textarea>
            <p class="text-sm text-gray-500">
              1行に1つずつ選択肢を入力してください
            </p>
          </div>

          <!-- Required -->
          <div class="flex items-center space-x-2">
            <input
              id="required"
              v-model="localField.required"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <Label for="required" class="cursor-pointer">
              必須項目にする
            </Label>
          </div>

          <!-- Show in Table -->
          <div class="flex items-center space-x-2">
            <input
              id="showInTable"
              v-model="localField.showInTable"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <Label for="showInTable" class="cursor-pointer">
              候補者テーブルに表示
            </Label>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
          <Button variant="outline" @click="handleClose">
            キャンセル
          </Button>
          <Button @click="handleSave">
            保存
          </Button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
