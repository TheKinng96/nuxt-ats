// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-09',
  devtools: { enabled: true },

  experimental: {
    buildCache: false
  },

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    'shadcn-nuxt',
    '@nuxtjs/i18n'
  ],

  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },

  i18n: {
    locales: [
      {
        code: 'ja',
        iso: 'ja-JP',
        name: '日本語',
        file: 'ja.ts'
      }
    ],
    langDir: 'locales',
    defaultLocale: 'ja',
    strategy: 'no_prefix',
    vueI18n: './vue-i18n.config.ts'
  },

  runtimeConfig: {
    // Private keys (server-only)
    databaseUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    openaiApiKey: process.env.OPENAI_API_KEY,
    anthropicApiKey: process.env.ANTHROPIC_API_KEY,
    s3AccessKey: process.env.S3_ACCESS_KEY,
    s3SecretKey: process.env.S3_SECRET_KEY,
    s3Bucket: process.env.S3_BUCKET,
    s3Region: process.env.S3_REGION,
    emailApiKey: process.env.EMAIL_API_KEY,

    // Public keys (exposed to client)
    public: {
      appUrl: process.env.APP_URL || 'http://localhost:3000',
    }
  },

  typescript: {
    strict: true,
    typeCheck: false
  },

  eslint: {
    config: {
      stylistic: true
    }
  }
})
