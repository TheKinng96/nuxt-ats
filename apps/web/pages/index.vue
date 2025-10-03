<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        Nuxt ATS
      </h1>
      <p class="text-xl text-gray-600 mb-8">
        AI-Powered Applicant Tracking System
      </p>
      <div class="flex gap-4 justify-center">
        <UButton to="/dashboard" size="lg">
          Dashboard
        </UButton>
        <UButton to="/login" variant="outline" size="lg">
          Login
        </UButton>
      </div>
    </div>
  </div>
</template>
