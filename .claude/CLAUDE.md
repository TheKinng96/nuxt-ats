# Claude Code - Repository Working Structure

This document provides guidance for Claude Code (or any AI assistant) when working on this project.

## Repository Overview

This is a **monorepo** for an AI-powered Applicant Tracking System (ATS) built with:
- **Nuxt.js 3** (Vue 3, TypeScript)
- **Shadcn Vue** for UI components
- **Prisma ORM** with SQLite database
- **Pinia** for state management
- **Yup** for form validation

## Project Structure

```
nuxt-ats/
├── apps/
│   └── web/                    # Main Nuxt.js application
│       ├── components/         # Vue components (UI building blocks)
│       ├── pages/             # Nuxt pages (auto-routed)
│       ├── layouts/           # Page layouts (default, dashboard, etc.)
│       ├── composables/       # Vue composables (reusable logic)
│       ├── stores/            # Pinia stores (state management)
│       ├── server/            # Nitro server (API routes, middleware)
│       ├── lib/               # Utility functions
│       ├── assets/            # CSS, images, fonts
│       └── public/            # Static files
├── packages/
│   ├── database/              # Prisma schema, migrations, client
│   │   ├── prisma/           # schema.prisma
│   │   └── src/              # Prisma client export
│   ├── types/                # Shared TypeScript types
│   ├── ui/                   # Shared UI components (future)
│   ├── ai/                   # AI integration utilities (future)
│   └── email/                # Email templates and service (future)
├── TODO.md                    # Current tasks and sprint planning
├── ROADMAP.md                 # Long-term vision and feature roadmap
├── ARCHITECTURE.md            # Technical architecture documentation
└── README.md                  # Setup guide and project overview
```

## Task Management

### Where to Find Tasks
1. **TODO.md** - Current sprint tasks, active development items
2. **ROADMAP.md** - Long-term vision, feature phases, future plans
3. **GitHub Issues** - Bug reports and feature requests (when applicable)

### Updating Tasks
- When starting a feature, move it from "Next Up" to "In Progress" in TODO.md
- When completing a task, mark it with `[x]` and move to completed section
- Add new tasks as they're discovered
- Keep TODO.md focused on current/near-term work
- Keep ROADMAP.md for future vision and planning

## Development Workflow

### Starting New Features
1. Check TODO.md for current priorities
2. Review ARCHITECTURE.md for technical context
3. Check Prisma schema in `packages/database/prisma/schema.prisma`
4. Review shared types in `packages/types/src/index.ts`
5. Implement feature in appropriate location
6. Update TODO.md when complete

### File Organization
- **Pages** (`apps/web/pages/`): Route-based, one file per page
- **Components** (`apps/web/components/`): Reusable UI components
  - Organize by feature: `components/candidates/`, `components/forms/`
  - Shadcn components go in: `components/ui/`
- **API Routes** (`apps/web/server/api/`): Backend endpoints
  - Mirror database structure: `api/candidates/`, `api/forms/`
- **Stores** (`apps/web/stores/`): One store per domain
  - Examples: `useAuthStore`, `useCandidatesStore`, `useFormsStore`

### Database Changes
1. Update schema in `packages/database/prisma/schema.prisma`
2. Run `pnpm db:push` (development) or `pnpm db:migrate` (production)
3. Regenerate client: `pnpm db:generate`
4. Update types in `packages/types/src/index.ts` if needed

### Adding Dependencies
- **Web app**: `cd apps/web && pnpm add <package>`
- **Database**: `cd packages/database && pnpm add <package>`
- **Root workspace**: `pnpm add -w <package>`

### Naming Conventions
- **Files**: kebab-case (`candidate-list.vue`, `use-auth.ts`)
- **Components**: PascalCase in code (`<CandidateList />`)
- **Composables**: camelCase with 'use' prefix (`useAuth`, `useCandidates`)
- **Stores**: camelCase with 'use' and 'Store' (`useAuthStore`)
- **Types**: PascalCase (`CandidateListItem`, `FormDefinition`)
- **API routes**: kebab-case (`/api/candidates/[id].get.ts`)
- **i18n locale files**: `ComponentName.locale.ja.ts` (always include language code)

## Internationalization (i18n)

### Overview
- **Language**: Japanese (ja) only
- **System**: @nuxtjs/i18n with Vue I18n
- **Pattern**: Hybrid - global translations + component-level translations
- **TypeScript**: Full autocomplete support for all translation keys

### File Structure
```
apps/web/
├── i18n/locales/           # Global translations
│   ├── ja.ts              # Central Japanese translations
│   └── index.ts           # Type exports
├── pages/
│   ├── index.vue
│   └── index.locale.ja.ts # Page-specific translations
└── components/
    ├── candidates/
    │   ├── CandidateList.vue
    │   └── CandidateList.locale.ja.ts  # Component translations
    └── ui/                # Shadcn components (no locales needed)
```

### Global vs Component-Level Translations

**Use Global Translations (`i18n/locales/ja.ts`) for:**
- Common UI elements (buttons, labels, etc.)
- Validation messages
- Error messages
- Navigation items
- Status labels
- Anything reused across multiple components

**Use Component-Level Translations (`ComponentName.locale.ja.ts`) for:**
- Component-specific content
- Page-specific headings and descriptions
- Feature-specific terminology
- Dynamic content unique to that component

### Creating Component Locale Files

**1. Create locale file next to component:**
```ts
// components/candidates/CandidateList.locale.ja.ts
export default {
  candidateList: {  // Always namespace under component name
    title: '候補者一覧',
    searchPlaceholder: '候補者を検索...',
    noResults: '候補者が見つかりません'
  }
}
```

**2. Use in component:**
```vue
<script setup lang="ts">
import ja from './CandidateList.locale.ja'

const { t } = useComponentI18n({ messages: { ja } })
</script>

<template>
  <div>
    <h1>{{ t('candidateList.title') }}</h1>
    <!-- Can also access global translations -->
    <button>{{ t('common.buttons.save') }}</button>
  </div>
</template>
```

### Import Patterns
- **Component locales**: `import ja from './ComponentName.locale.ja'`
- **Global translations**: Auto-imported via Nuxt i18n module
- **Path aliases**: Use `~` or `@` for app root imports
- **Composable**: `useComponentI18n` (auto-imported by Nuxt)

### TypeScript Autocomplete
The system provides full autocomplete for:
- ✅ Global translation keys (e.g., `common.buttons.save`)
- ✅ Component-level keys (e.g., `candidateList.title`)
- ✅ Works in both `<script>` and `<template>` sections
- ✅ Type-safe with compile-time checking

### Naming Rules
1. **Locale files**: Always use `.locale.ja.ts` suffix
2. **Top-level key**: Must match component name in camelCase
   - Component: `CandidateList.vue` → Key: `candidateList`
   - Component: `FormBuilder.vue` → Key: `formBuilder`
3. **Nested keys**: Use descriptive, specific names
4. **Keep same base name**: `CandidateList.vue` + `CandidateList.locale.ja.ts`

### Best Practices
- ✅ **Always namespace** component translations under a unique key
- ✅ **Co-locate** translations with their components
- ✅ **Use direct export** - no wrapper functions needed
- ✅ **Keep translations close** to where they're used
- ✅ **Reuse global** translations when possible
- ❌ **Don't duplicate** common terms in component locales
- ❌ **Don't mix** business logic with translation keys

### Common Patterns

**Navigation with translations:**
```vue
<Button as-child>
  <NuxtLink to="/dashboard">
    {{ t('common.navigation.dashboard') }}
  </NuxtLink>
</Button>
```

**Form labels:**
```vue
<FormField v-slot="{ componentField }" name="email">
  <FormItem>
    <FormLabel>{{ t('common.form.email') }}</FormLabel>
    <FormControl>
      <Input type="email" v-bind="componentField" />
    </FormControl>
  </FormItem>
</FormField>
```

**Conditional text:**
```vue
<p v-if="isEmpty">{{ t('candidateList.noResults') }}</p>
```

### Troubleshooting
- **Missing key warning**: Check spelling and namespace
- **No autocomplete**: Ensure locale file uses direct export (not wrapped)
- **Type errors**: Verify locale file has correct structure
- **Keys not showing**: Restart TypeScript server in IDE

### Documentation
- **Quick Start**: See `apps/web/I18N-QUICK-START.md`
- **Full Guide**: See `apps/web/I18N.md`

## Key Architectural Decisions

### Multi-tenancy
- All data is scoped by `organizationId`
- Use Prisma middleware or row-level filtering for isolation
- Never expose data across organizations

### Authentication
- JWT tokens stored in HTTP-only cookies
- User roles: ADMIN, RECRUITER, INTERVIEWER, VIEWER
- Implement middleware for route protection

### State Management
- **Pinia stores** for client state
- **Server state** in Nitro storage (if needed)
- Use composables for shared logic, stores for global state

### Form Handling
- **Yup schemas** for validation
- Store schemas in composables or utils
- Reuse validation across client and server

### API Design
- RESTful conventions
- Use HTTP status codes correctly
- Return consistent response format (see `ApiResponse` type)
- Handle errors gracefully

### UI Components
- **Shadcn Vue** for base components (buttons, inputs, dialogs)
- Build custom components on top of Shadcn
- Use `cn()` utility from `lib/utils.ts` for class merging
- Follow Tailwind CSS best practices

## Common Commands

```bash
# Development
pnpm dev                    # Start dev server
pnpm build                  # Build for production
pnpm preview                # Preview production build

# Database
pnpm db:generate            # Generate Prisma client
pnpm db:push                # Push schema to DB (dev)
pnpm db:migrate             # Create migration (prod)
pnpm db:studio              # Open Prisma Studio

# Quality
pnpm lint                   # Run linter
pnpm type-check             # Check TypeScript types
```

## Environment Variables

See `apps/web/.env.example` for all required environment variables:
- `DATABASE_URL` - SQLite database path
- `JWT_SECRET` - Authentication secret
- `OPENAI_API_KEY` - OpenAI API key
- `ANTHROPIC_API_KEY` - Anthropic Claude API key
- `S3_*` - S3 file storage configuration
- `EMAIL_API_KEY` - Email service API key

## Testing Strategy

### Current State
- No tests yet (early development phase)

### Future Testing Plan
1. **Unit tests** - Composables, utilities, pure functions
2. **Component tests** - Vue components with Vitest
3. **API tests** - Server routes and middleware
4. **E2E tests** - Critical user flows with Playwright

## Code Style & Preferences

### Vue Components
- Use `<script setup>` syntax
- TypeScript with proper types
- Composables for logic reuse
- Props with TypeScript interfaces

### TypeScript
- Strict mode enabled
- Avoid `any` types
- Export types from `packages/types`
- Use type inference where possible

### CSS/Styling
- Tailwind CSS utility classes
- Custom CSS in `assets/css/main.css`
- Use CSS variables for theming
- Mobile-first responsive design

## Feature Development Guidelines

### Dynamic Form Builder
- Schema stored in database
- Render forms from JSON schema
- Support all field types from Prisma enum
- Map form fields to candidate table columns

### Workflow Automation
- Trigger-action architecture
- Support multiple actions per automation
- Email templates with variable interpolation
- Log all automation executions

### AI Integration
- Async processing (don't block user requests)
- Cache AI responses
- Handle API errors gracefully
- Store summaries in database

### Pipeline Management
- Drag-and-drop with smooth animations
- Real-time updates (future: WebSockets)
- Track stage history for analytics
- Bulk operations for efficiency

## Git Workflow

### Commits
- Clear, descriptive commit messages
- Group related changes together
- Use conventional commits when possible
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation
  - `refactor:` for code refactoring
  - `chore:` for maintenance

### Branches (when team grows)
- `main` - Production-ready code
- `develop` - Integration branch
- `feature/*` - New features
- `fix/*` - Bug fixes

## Documentation

### When to Update Docs
- **README.md**: Setup changes, new features overview
- **ARCHITECTURE.md**: Technical decisions, system design changes
- **TODO.md**: Task updates, sprint planning
- **ROADMAP.md**: Vision changes, new phases
- **CLAUDE.md**: Working structure, conventions, guidelines

### Code Documentation
- JSDoc for complex functions
- README in each package directory
- API documentation (future: Swagger/OpenAPI)

## Debugging Tips

### Common Issues
1. **Prisma client not found**: Run `pnpm db:generate`
2. **Module not found**: Check pnpm workspace references
3. **Type errors**: Ensure types package is up to date
4. **Database locked**: Close Prisma Studio

### Useful Tools
- **Prisma Studio**: Visual database browser
- **Vue DevTools**: Component inspection
- **Nuxt DevTools**: Built-in debugging
- **Network tab**: API request debugging

## Performance Considerations

### Database
- Add indexes for frequently queried fields
- Use `select` to limit returned fields
- Implement pagination for large lists
- Consider caching for read-heavy operations

### Frontend
- Lazy load components
- Use virtual scrolling for long lists
- Optimize images and assets
- Code splitting for large pages

### API
- Rate limiting on public endpoints
- Response caching where appropriate
- Async processing for heavy tasks
- Connection pooling for database

## Security Checklist

- [ ] Validate all user input
- [ ] Sanitize data before database operations
- [ ] Use parameterized queries (Prisma does this)
- [ ] Implement CORS properly
- [ ] Secure file uploads (type, size validation)
- [ ] Don't expose sensitive data in API responses
- [ ] Use HTTPS in production
- [ ] Implement rate limiting
- [ ] Hash passwords (bcrypt)
- [ ] Validate JWT tokens on protected routes

## Questions?

When in doubt:
1. Check existing code for patterns
2. Review ARCHITECTURE.md for decisions
3. Check TODO.md for context on current work
4. Follow TypeScript errors - they often point to the solution
5. Test changes with `pnpm dev` before committing

---

**Remember**: This is a living document. Update it as the project evolves and new patterns emerge.

**Last Updated:** 2025-10-06
