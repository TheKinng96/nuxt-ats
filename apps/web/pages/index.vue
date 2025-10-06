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
        <NuxtLink
          to="/dashboard"
          class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Dashboard
        </NuxtLink>
        <NuxtLink
          to="/login"
          class="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
        >
          Login
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
