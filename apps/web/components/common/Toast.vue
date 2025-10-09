<script setup lang="ts">
import { useToast } from '~/composables/useToast'

const { toasts, removeToast } = useToast()

const getToastClasses = (type: string) => {
  const baseClasses = 'flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white mb-3 animate-slide-in-right'

  switch (type) {
    case 'success':
      return `${baseClasses} bg-green-600`
    case 'error':
      return `${baseClasses} bg-red-600`
    case 'warning':
      return `${baseClasses} bg-yellow-600`
    case 'info':
      return `${baseClasses} bg-blue-600`
    default:
      return `${baseClasses} bg-gray-600`
  }
}

const getIcon = (type: string) => {
  switch (type) {
    case 'success':
      return '✓'
    case 'error':
      return '✕'
    case 'warning':
      return '⚠'
    case 'info':
      return 'ℹ'
    default:
      return '•'
  }
}
</script>

<template>
  <div class="fixed top-4 right-4 z-50 pointer-events-none">
    <div class="flex flex-col items-end">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="getToastClasses(toast.type)"
          class="pointer-events-auto min-w-[300px] max-w-md"
        >
          <span class="text-xl font-bold">{{ getIcon(toast.type) }}</span>
          <span class="flex-1">{{ toast.message }}</span>
          <button
            @click="removeToast(toast.id)"
            class="text-white hover:text-gray-200 transition-colors ml-2"
          >
            ✕
          </button>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
@keyframes slide-in-right {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in-right {
  animation: slide-in-right 0.3s ease-out;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>
