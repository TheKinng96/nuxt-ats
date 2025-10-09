<script setup lang="ts">
import { ref } from 'vue'
import { fieldTemplates, type FieldTemplate } from '~/lib/field-templates'

interface Emits {
  (e: 'select', template: FieldTemplate): void
}

const emit = defineEmits<Emits>()

const showTemplates = ref(false)

const handleSelectTemplate = (template: FieldTemplate) => {
  emit('select', template)
  showTemplates.value = false
}
</script>

<template>
  <div class="relative">
    <!-- Add Button -->
    <button
      v-if="!showTemplates"
      @click="showTemplates = true"
      class="w-full border-2 border-dashed border-gray-300 rounded-lg py-6 px-4 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group"
    >
      <div class="flex flex-col items-center gap-2">
        <span class="text-3xl group-hover:scale-110 transition-transform">+</span>
        <span class="text-sm font-medium text-gray-600 group-hover:text-blue-600">
          フィールドを追加
        </span>
      </div>
    </button>

    <!-- Template Selector -->
    <div
      v-else
      class="border-2 border-blue-400 rounded-lg bg-white shadow-lg p-4"
    >
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-medium text-gray-900">フィールドタイプを選択</h3>
        <button
          @click="showTemplates = false"
          class="text-gray-400 hover:text-gray-600 text-xl"
        >
          ×
        </button>
      </div>

      <!-- Template Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <button
          v-for="template in fieldTemplates"
          :key="template.id"
          @click="handleSelectTemplate(template)"
          class="flex flex-col items-center gap-2 p-4 border rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group"
        >
          <span class="text-3xl group-hover:scale-110 transition-transform">
            {{ template.icon }}
          </span>
          <span class="text-sm font-medium text-gray-700 text-center">
            {{ template.name }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
