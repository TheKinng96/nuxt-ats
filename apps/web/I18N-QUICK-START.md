# i18n Quick Start Guide

## ✅ What's Been Set Up

1. **@nuxtjs/i18n** module installed and configured
2. **Language**: Japanese (ja) only
3. **TypeScript autocomplete** for all translation keys
4. **Component-level locales** for co-located translations

## 🚀 Quick Usage

### In a Page or Component

```vue
<script setup lang="ts">
// For component-level translations
import ja from './YourComponent.locale.ja'
const { t } = useComponentI18n({ messages: { ja } })

// For global translations only
// const { t } = useI18n()
</script>

<template>
  <div>
    <!-- Component translations -->
    <h1>{{ t('yourComponent.title') }}</h1>

    <!-- Global translations -->
    <button>{{ t('common.buttons.save') }}</button>
  </div>
</template>
```

### Create Component Locale File

`YourComponent.locale.ja.ts`:
```ts
export default {
  yourComponent: {
    title: 'マイコンポーネント',
    description: 'これは素晴らしい！'
  }
}
```

## 📁 File Structure

```
apps/web/
├── i18n/locales/           ← Global translations (buttons, errors, etc.)
│   ├── en.ts
│   ├── ja.ts
│   └── index.ts
├── vue-i18n.config.ts      ← i18n configuration
├── pages/
│   ├── index.vue
│   └── index.locale.ja.ts     ← Page-specific translations
└── components/
    └── ComponentName.vue
        └── ComponentName.locale.ja.ts  ← Component-specific translations
```

## 🎯 Available Global Translations

Already defined in `i18n/locales/en.ts` and `ja.ts`:

- `common.buttons.*` - save, cancel, delete, edit, create, etc.
- `common.navigation.*` - home, dashboard, candidates, etc.
- `common.status.*` - active, inactive, pending, etc.
- `common.messages.*` - success, error, loading, etc.
- `common.validation.*` - required, email, phone, etc.


## 💡 Import Aliases

Use `~` or `@` to import from app root:

```ts
// ✅ Good
import { useComponentI18n } from '~/composables/useComponentI18n'
import type { ComponentLocale } from '~/types/i18n'

// ❌ Avoid
import { useComponentI18n } from '../../../composables/useComponentI18n'
```

## 📖 Full Documentation

See `I18N.md` for complete documentation including:
- Date and number formatting
- Adding new languages
- TypeScript autocomplete details
- Best practices
- Troubleshooting

## 🎨 Example: Full Component

```vue
<!-- components/candidates/CandidateCard.vue -->
<script setup lang="ts">
import ja from './CandidateCard.locale.ja'

const { t } = useComponentI18n({ messages: { ja } })

defineProps<{
  candidate: {
    name: string
    email: string
  }
}>()
</script>

<template>
  <div class="card">
    <h3>{{ t('candidateCard.title') }}</h3>
    <p>{{ candidate.name }}</p>
    <p>{{ candidate.email }}</p>
    <button>{{ t('common.buttons.edit') }}</button>
  </div>
</template>
```

```ts
// components/candidates/CandidateCard.locale.ja.ts
export default {
  candidateCard: {
    title: '候補者の詳細',
    viewProfile: 'プロフィールを見る'
  }
}
```

## ✨ Features

- ✅ **Full TypeScript autocomplete** in both `<script>` and `<template>`
- ✅ **Co-located translations** - keep translations next to components
- ✅ **Namespace isolation** - no key conflicts between components
- ✅ **Date/number formatting** built-in (JPY currency)

## 🎬 Start Developing

1. Start dev server: `pnpm dev`
2. Open http://localhost:3000
3. Create your component locale files
4. Enjoy full autocomplete! 🎉
