<script setup lang="ts">
import { ref, computed } from 'vue'
import * as yup from 'yup'
import { useAuthStore } from '@/stores/useAuthStore'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const authStore = useAuthStore()
const router = useRouter()

// Form state
const formData = ref({
  email: '',
  password: '',
})

const errors = ref<Record<string, string>>({})
const serverError = ref('')

// Validation schema
const loginSchema = yup.object({
  email: yup
    .string()
    .required(t('common.validation.required'))
    .email(t('common.validation.email')),
  password: yup
    .string()
    .required(t('common.validation.required')),
})

// Submit handler
const handleSubmit = async () => {
  errors.value = {}
  serverError.value = ''

  try {
    // Validate form
    await loginSchema.validate(formData.value, { abortEarly: false })

    // Call API
    await authStore.login(formData.value.email, formData.value.password)

    // Redirect to dashboard
    await router.push('/')
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      // Handle validation errors
      error.inner.forEach((err) => {
        if (err.path) {
          errors.value[err.path] = err.message
        }
      })
    } else if (error && typeof error === 'object' && 'data' in error) {
      // Handle server validation errors
      const data = (error as any).data
      if (data?.data?.errors) {
        serverError.value = data.data.errors.join(', ')
      } else if (data?.statusMessage) {
        serverError.value = data.statusMessage
      }
    } else {
      // Handle other errors
      serverError.value = t('auth.errors.invalidCredentials')
    }
  }
}

const isLoading = computed(() => authStore.loading)
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
    <Card class="w-full max-w-md">
      <CardHeader class="space-y-1">
        <CardTitle class="text-2xl font-bold text-center">
          {{ t('auth.login.title') }}
        </CardTitle>
        <CardDescription class="text-center">
          {{ t('auth.login.subtitle') }}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Server Error Alert -->
          <div
            v-if="serverError"
            class="rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
          >
            {{ serverError }}
          </div>

          <!-- Email Field -->
          <div class="space-y-2">
            <Label for="email">{{ t('common.form.labels.email') }}</Label>
            <Input
              id="email"
              v-model="formData.email"
              type="email"
              :placeholder="t('common.form.placeholders.email')"
              :class="{ 'border-destructive': errors.email }"
              :disabled="isLoading"
            />
            <p v-if="errors.email" class="text-sm text-destructive">
              {{ errors.email }}
            </p>
          </div>

          <!-- Password Field -->
          <div class="space-y-2">
            <Label for="password">{{ t('common.form.labels.password') }}</Label>
            <Input
              id="password"
              v-model="formData.password"
              type="password"
              :placeholder="t('common.form.placeholders.password')"
              :class="{ 'border-destructive': errors.password }"
              :disabled="isLoading"
            />
            <p v-if="errors.password" class="text-sm text-destructive">
              {{ errors.password }}
            </p>
          </div>

          <!-- Forgot Password Link -->
          <div class="text-right">
            <NuxtLink to="/forgot-password" class="text-sm font-medium text-primary hover:underline">
              {{ t('auth.login.forgotPassword') }}
            </NuxtLink>
          </div>

          <!-- Submit Button -->
          <Button
            type="submit"
            class="w-full"
            :disabled="isLoading"
          >
            {{ isLoading ? t('common.messages.loading') : t('auth.login.submit') }}
          </Button>
        </form>

        <!-- Register Link -->
        <div class="mt-6 text-center text-sm">
          <span class="text-muted-foreground">{{ t('auth.login.noAccount') }}</span>
          {{ ' ' }}
          <NuxtLink to="/register" class="font-medium text-primary hover:underline">
            {{ t('auth.login.register') }}
          </NuxtLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
