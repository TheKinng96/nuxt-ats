<script setup lang="ts">
// Redirect to the builder page
definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const route = useRoute()
const formId = route.params.id as string

// Immediately redirect to builder
await navigateTo(`/dashboard/forms/${formId}/builder`)
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <p class="text-gray-600">Redirecting to form builder...</p>
  </div>
</template>
