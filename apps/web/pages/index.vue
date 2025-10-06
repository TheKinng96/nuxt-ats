<script setup lang="ts">
import ja from './index.locale.ja'

definePageMeta({
  layout: 'default'
})

// Use component-level i18n with autocomplete support
const { t } = useComponentI18n({ messages: { ja } })
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    <!-- Main Content -->
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        {{ t('home.title') }}
      </h1>
      <p class="text-xl text-gray-600 mb-8">
        {{ t('home.subtitle') }}
      </p>
      <div class="flex gap-4 justify-center">
        <NuxtLink
          to="/dashboard"
          class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          {{ t('home.buttons.dashboard') }}
        </NuxtLink>
        <NuxtLink
          to="/login"
          class="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
        >
          {{ t('home.buttons.login') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
