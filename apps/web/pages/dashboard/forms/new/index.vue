<script setup lang="ts">
import { ref, onMounted } from 'vue'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const router = useRouter()
const creating = ref(true)

// Automatically create a blank form and redirect to builder
onMounted(async () => {
  try {
    // Create a blank form with default values
    const timestamp = new Date().toISOString().split('T')[0]
    const response: any = await $fetch('/api/forms', {
      method: 'POST',
      body: {
        name: `無題のフォーム ${timestamp}`,
        slug: `untitled-form-${Date.now()}`,
        description: '',
        isActive: false, // Start as inactive
      },
    })

    // Redirect to builder
    await navigateTo(`/dashboard/forms/${response.form.id}/builder`)
  } catch (error) {
    console.error('Failed to create form:', error)
    creating.value = false
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center" v-if="creating">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
      <p class="text-gray-600">新しいフォームを作成中...</p>
    </div>
    <div v-else class="text-center">
      <p class="text-red-600 mb-4">フォームの作成に失敗しました</p>
      <Button as-child>
        <NuxtLink to="/dashboard/forms">
          フォーム一覧に戻る
        </NuxtLink>
      </Button>
    </div>
  </div>
</template>
