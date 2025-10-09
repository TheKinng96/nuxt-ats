<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import ja from './dashboard.locale.ja'

const { t } = useComponentI18n({ messages: { ja } })
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

// Sidebar state
const isSidebarOpen = ref(true)
const isMobileMenuOpen = ref(false)

// Navigation items
const navigationItems = computed(() => [
  {
    name: 'dashboard',
    label: t('layout.navigation.dashboard'),
    path: '/dashboard',
    icon: '📊',
  },
  {
    name: 'candidates',
    label: t('layout.navigation.candidates'),
    path: '/dashboard/candidates',
    icon: '👥',
  },
  {
    name: 'forms',
    label: t('layout.navigation.forms'),
    path: '/dashboard/forms',
    icon: '📝',
  },
  {
    name: 'pipeline',
    label: t('layout.navigation.pipeline'),
    path: '/dashboard/pipeline',
    icon: '📈',
  },
  {
    name: 'interviews',
    label: t('layout.navigation.interviews'),
    path: '/dashboard/interviews',
    icon: '💼',
  },
  {
    name: 'settings',
    label: t('layout.navigation.settings'),
    path: '/dashboard/settings',
    icon: '⚙️',
  },
])

const handleLogout = async () => {
  await authStore.logout()
  navigateTo('/auth/login')
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const isActiveRoute = (path: string) => {
  return route.path === path
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Mobile menu button -->
    <div class="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30 px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <button
          @click="toggleMobileMenu"
          class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <span class="text-xl">☰</span>
        </button>
        <h1 class="font-bold text-xl text-gray-900">{{ t('layout.appName') }}</h1>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-700 hidden sm:inline">{{ authStore.user?.name }}</span>
        <button
          @click="handleLogout"
          class="p-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
        >
          {{ t('layout.user.logout') }}
        </button>
      </div>
    </div>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed top-0 left-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-40',
        'lg:translate-x-0',
        isSidebarOpen ? 'lg:w-64' : 'lg:w-20',
        isMobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0',
      ]"
    >
      <!-- Sidebar header -->
      <div class="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        <h1
          v-show="isSidebarOpen || isMobileMenuOpen"
          class="font-bold text-xl text-gray-900 transition-opacity"
        >
          {{ t('layout.appName') }}
        </h1>
        <button
          @click="toggleSidebar"
          :title="t('layout.toggleSidebar')"
          class="hidden lg:block p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <span class="text-lg">{{ isSidebarOpen ? '◀' : '▶' }}</span>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="p-4 space-y-2">
        <NuxtLink
          v-for="item in navigationItems"
          :key="item.name"
          :to="item.path"
          @click="isMobileMenuOpen = false"
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
            isActiveRoute(item.path)
              ? 'bg-blue-50 text-blue-600 font-medium'
              : 'text-gray-700 hover:bg-gray-100',
          ]"
        >
          <span class="text-xl">{{ item.icon }}</span>
          <span
            v-show="isSidebarOpen || isMobileMenuOpen"
            class="transition-opacity"
          >
            {{ item.label }}
          </span>
        </NuxtLink>
      </nav>

      <!-- User section at bottom -->
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
        <div
          :class="[
            'flex items-center gap-3',
            isSidebarOpen || isMobileMenuOpen ? 'justify-between' : 'justify-center',
          ]"
        >
          <div
            v-show="isSidebarOpen || isMobileMenuOpen"
            class="flex items-center gap-3 flex-1 min-w-0"
          >
            <div class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
              {{ authStore.user?.name?.charAt(0).toUpperCase() }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">
                {{ authStore.user?.name }}
              </p>
              <p class="text-xs text-gray-500 truncate">
                {{ authStore.user?.email }}
              </p>
            </div>
          </div>
          <button
            @click="handleLogout"
            :title="isSidebarOpen || isMobileMenuOpen ? '' : t('layout.user.logout')"
            class="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
          >
            <span class="text-lg">🚪</span>
          </button>
        </div>
      </div>
    </aside>

    <!-- Mobile overlay -->
    <div
      v-if="isMobileMenuOpen"
      @click="isMobileMenuOpen = false"
      class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
    />

    <!-- Main content -->
    <main
      :class="[
        'transition-all duration-300',
        'pt-16 lg:pt-0',
        isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20',
      ]"
    >
      <slot />
    </main>

    <!-- Toast notifications -->
    <Toast />
  </div>
</template>
