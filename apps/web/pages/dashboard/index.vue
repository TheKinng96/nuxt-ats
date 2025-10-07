<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore'
import ja from './index.locale.ja'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const { t } = useComponentI18n({ messages: { ja } })
const authStore = useAuthStore()
</script>

<template>
  <div class="p-8">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">{{ t('dashboard.title') }}</h1>
      <p class="mt-2 text-gray-600">{{ t('dashboard.welcome', { name: authStore.user?.name }) }}</p>
    </div>

    <!-- Content -->
    <div class="max-w-7xl">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- User Information Card -->
        <Card>
          <CardHeader>
            <CardTitle>{{ t('dashboard.userInfo.title') }}</CardTitle>
            <CardDescription>{{ t('dashboard.userInfo.subtitle') }}</CardDescription>
          </CardHeader>
          <CardContent>
            <dl class="space-y-4">
              <div>
                <dt class="text-sm font-medium text-gray-500">{{ t('dashboard.userInfo.name') }}</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ authStore.user?.name }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">{{ t('dashboard.userInfo.email') }}</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ authStore.user?.email }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">{{ t('dashboard.userInfo.role') }}</dt>
                <dd class="mt-1">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ authStore.user?.role }}
                  </span>
                </dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">{{ t('dashboard.userInfo.userId') }}</dt>
                <dd class="mt-1 text-sm text-gray-900 font-mono">{{ authStore.user?.id }}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <!-- Organization Information Card -->
        <Card>
          <CardHeader>
            <CardTitle>{{ t('dashboard.organizationInfo.title') }}</CardTitle>
            <CardDescription>{{ t('dashboard.organizationInfo.subtitle') }}</CardDescription>
          </CardHeader>
          <CardContent>
            <dl class="space-y-4">
              <div>
                <dt class="text-sm font-medium text-gray-500">{{ t('dashboard.organizationInfo.name') }}</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ authStore.organization?.name }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">{{ t('dashboard.organizationInfo.slug') }}</dt>
                <dd class="mt-1 text-sm text-gray-900 font-mono">{{ authStore.organization?.slug }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">{{ t('dashboard.organizationInfo.organizationId') }}</dt>
                <dd class="mt-1 text-sm text-gray-900 font-mono">{{ authStore.organization?.id }}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <!-- Debug Information Card -->
        <Card class="lg:col-span-2">
          <CardHeader>
            <CardTitle>{{ t('dashboard.debug.title') }}</CardTitle>
            <CardDescription>{{ t('dashboard.debug.subtitle') }}</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div>
                <h3 class="text-sm font-medium text-gray-500 mb-2">{{ t('dashboard.debug.authState') }}</h3>
                <ul class="space-y-1 text-sm">
                  <li>
                    <span class="font-medium">{{ t('dashboard.debug.isAuthenticated') }}:</span>
                    <span :class="authStore.isAuthenticated ? 'text-green-600' : 'text-red-600'">
                      {{ authStore.isAuthenticated }}
                    </span>
                  </li>
                  <li>
                    <span class="font-medium">{{ t('dashboard.debug.isAdmin') }}:</span>
                    <span :class="authStore.isAdmin ? 'text-green-600' : 'text-gray-600'">
                      {{ authStore.isAdmin }}
                    </span>
                  </li>
                  <li>
                    <span class="font-medium">{{ t('dashboard.debug.isRecruiter') }}:</span>
                    <span :class="authStore.isRecruiter ? 'text-green-600' : 'text-gray-600'">
                      {{ authStore.isRecruiter }}
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-500 mb-2">{{ t('dashboard.debug.fullUserObject') }}</h3>
                <pre class="bg-gray-100 rounded p-4 overflow-auto text-xs">{{ JSON.stringify(authStore.user, null, 2) }}</pre>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-500 mb-2">{{ t('dashboard.debug.fullOrganizationObject') }}</h3>
                <pre class="bg-gray-100 rounded p-4 overflow-auto text-xs">{{ JSON.stringify(authStore.organization, null, 2) }}</pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
