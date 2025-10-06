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
  name: '',
  email: '',
  password: '',
  organizationName: '',
})

const errors = ref<Record<string, string>>({})
const serverError = ref('')

// Validation schema
const registerSchema = yup.object({
  name: yup
    .string()
    .required(t('common.validation.required'))
    .min(2, t('common.validation.minLength', { min: 2 })),
  email: yup
    .string()
    .required(t('common.validation.required'))
    .email(t('common.validation.email')),
  password: yup
    .string()
    .required(t('common.validation.required'))
    .min(8, t('common.validation.minLength', { min: 8 })),
  organizationName: yup
    .string()
    .required(t('common.validation.required'))
    .min(2, t('common.validation.minLength', { min: 2 })),
})

// Submit handler
const handleSubmit = async () => {
  errors.value = {}
  serverError.value = ''

  try {
    // Validate form
    await registerSchema.validate(formData.value, { abortEarly: false })

    // Call API
    await authStore.register(formData.value)

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
          {{ t('auth.register.title') }}
        </CardTitle>
        <CardDescription class="text-center">
          {{ t('auth.register.subtitle') }}
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

          <!-- Name Field -->
          <div class="space-y-2">
            <Label for="name">{{ t('common.form.labels.name') }}</Label>
            <Input
              id="name"
              v-model="formData.name"
              type="text"
              :placeholder="t('common.form.placeholders.name')"
              :class="{ 'border-destructive': errors.name }"
              :disabled="isLoading"
            />
            <p v-if="errors.name" class="text-sm text-destructive">
              {{ errors.name }}
            </p>
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

          <!-- Organization Name Field -->
          <div class="space-y-2">
            <Label for="organizationName">{{ t('common.form.labels.organizationName') }}</Label>
            <Input
              id="organizationName"
              v-model="formData.organizationName"
              type="text"
              :placeholder="t('common.form.placeholders.organizationName')"
              :class="{ 'border-destructive': errors.organizationName }"
              :disabled="isLoading"
            />
            <p v-if="errors.organizationName" class="text-sm text-destructive">
              {{ errors.organizationName }}
            </p>
          </div>

          <!-- Submit Button -->
          <Button
            type="submit"
            class="w-full"
            :disabled="isLoading"
          >
            {{ isLoading ? t('common.messages.loading') : t('auth.register.submit') }}
          </Button>

          <!-- Agreement Text -->
          <p class="text-xs text-center text-muted-foreground">
            {{ t('auth.register.agreement') }}
          </p>
        </form>

        <!-- Login Link -->
        <div class="mt-6 text-center text-sm">
          <span class="text-muted-foreground">{{ t('auth.register.hasAccount') }}</span>
          {{ ' ' }}
          <NuxtLink to="/login" class="font-medium text-primary hover:underline">
            {{ t('auth.register.login') }}
          </NuxtLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
