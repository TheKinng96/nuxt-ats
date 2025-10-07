<script setup lang="ts">
import ja from './index.locale.ja'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const { t } = useComponentI18n({ messages: { ja } })
</script>

<template>
  <div class="p-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">{{ t('pipeline.title') }}</h1>
      <p class="mt-2 text-gray-600">{{ t('pipeline.subtitle') }}</p>
    </div>

    <Card>
      <CardContent class="p-12 text-center">
        <div class="text-6xl mb-4">📈</div>
        <h2 class="text-xl font-semibold text-gray-900 mb-2">{{ t('pipeline.comingSoon') }}</h2>
        <p class="text-gray-600">{{ t('pipeline.description') }}</p>
      </CardContent>
    </Card>
  </div>
</template>
