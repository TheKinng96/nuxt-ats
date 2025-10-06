import { defineStore } from 'pinia'

interface User {
  id: string
  name: string
  email: string
  role: string
  organizationId: string
}

interface Organization {
  id: string
  name: string
  slug: string
}

interface AuthResponse {
  user: User
  organization: Organization
}

interface AuthState {
  user: User | null
  organization: Organization | null
  loading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    organization: null,
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    isAdmin: (state) => state.user?.role === 'ADMIN',
    isRecruiter: (state) => state.user?.role === 'RECRUITER' || state.user?.role === 'ADMIN',
  },

  actions: {
    async register(data: {
      name: string
      email: string
      password: string
      organizationName: string
    }) {
      this.loading = true
      try {
        const response = await $fetch<AuthResponse>('/api/auth/register', {
          method: 'POST',
          body: data,
        })

        this.user = response.user
        this.organization = response.organization

        return response
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async login(email: string, password: string) {
      this.loading = true
      try {
        const response = await $fetch<AuthResponse>('/api/auth/login', {
          method: 'POST',
          body: { email, password },
        })

        this.user = response.user
        this.organization = response.organization

        return response
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.loading = true
      try {
        await $fetch('/api/auth/logout', {
          method: 'POST',
        })

        this.user = null
        this.organization = null

        // Redirect to login page
        await navigateTo('/login')
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchUser() {
      this.loading = true
      try {
        const response = await $fetch<AuthResponse>('/api/auth/me')

        this.user = response.user
        this.organization = response.organization

        return response
      } catch (error) {
        // If unauthorized, clear user data
        this.user = null
        this.organization = null
        throw error
      } finally {
        this.loading = false
      }
    },

    clearAuth() {
      this.user = null
      this.organization = null
    },
  },
})
