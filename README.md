# Nuxt ATS - AI-Powered Applicant Tracking System

A modern, AI-powered Applicant Tracking System built with Nuxt.js, featuring dynamic form building, drag-and-drop pipeline management, and intelligent automation workflows.

## Features

### Core Features
- 🎯 **Dynamic Form Builder** - Create custom application forms with drag-and-drop field management
- 📊 **Drag & Drop Pipeline** - Visual candidate pipeline with customizable stages
- 🤖 **AI Integration** - Automatic resume summarization and interview transcript processing
- ⚡ **Workflow Automation** - Set up automated emails, notifications, and actions based on triggers
- 👥 **Team Collaboration** - Multi-user support with role-based access control
- 📁 **Document Management** - Upload and manage resumes, cover letters, and other documents
- 📅 **Interview Scheduling** - Built-in calendar and scheduling system
- 💬 **Comments & Notes** - Collaborate with your team on candidate evaluations
- 📈 **Analytics** - Track recruitment metrics and performance

### Technical Features
- Built with Nuxt 3 and Vue 3
- Shadcn Vue components for UI
- SQLite database with Prisma ORM
- Pinia for state management
- Yup for form validation
- TypeScript support
- Monorepo architecture

## Project Structure

```
nuxt-ats/
├── apps/
│   └── web/                    # Main Nuxt.js application
│       ├── components/         # Vue components
│       ├── pages/             # Nuxt pages (routes)
│       ├── layouts/           # Page layouts
│       ├── composables/       # Vue composables
│       ├── stores/            # Pinia stores
│       ├── server/            # Server API routes
│       └── lib/               # Utility functions
├── packages/
│   ├── database/              # Prisma schema and client
│   ├── types/                 # Shared TypeScript types
│   ├── ui/                    # Shared UI components
│   ├── ai/                    # AI integration utilities
│   └── email/                 # Email templates and service
└── package.json               # Root package.json
```

## Getting Started

### Prerequisites
- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nuxt-ats.git
cd nuxt-ats
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cd apps/web
cp .env.example .env
```

4. Generate Prisma client and push database schema:
```bash
pnpm db:generate
pnpm db:push
```

5. Start the development server:
```bash
pnpm dev
```

Visit `http://localhost:3000` to see your application.

## Database Commands

```bash
# Generate Prisma client
pnpm db:generate

# Push schema to database (development)
pnpm db:push

# Create and run migrations (production)
pnpm db:migrate

# Open Prisma Studio (database GUI)
pnpm db:studio
```

## Development

### Running the Development Server
```bash
pnpm dev
```

### Building for Production
```bash
pnpm build
```

### Type Checking
```bash
pnpm type-check
```

### Linting
```bash
pnpm lint
```

## Architecture Overview

### Database Schema
The system uses a comprehensive Prisma schema with the following main entities:

- **Organizations** - Multi-tenant support
- **Users** - Team members with role-based access
- **Forms & FormFields** - Dynamic application forms
- **Candidates** - Applicant records
- **Stages** - Pipeline stages
- **Automations** - Workflow automation rules
- **Documents** - File uploads
- **AISummaries** - AI-generated content
- **Interviews** - Interview scheduling
- **Activities** - Audit logs

See [.claude/ARCHITECTURE.md](./.claude/ARCHITECTURE.md) for detailed architecture documentation.

### State Management
- **Pinia** for client-side state management
- Stores are organized by feature (candidates, forms, auth, etc.)

### Form Validation
- **Yup** for schema-based validation
- Reusable validation schemas in the types package

### UI Components
- **Shadcn Vue** for base components
- Custom components built on top of Shadcn
- Tailwind CSS for styling

## Key Features Implementation

### Dynamic Form Builder
Forms are fully customizable with support for:
- Text, Email, Phone, Textarea, Number
- Select, Multi-select, Radio, Checkbox
- Date, File upload, URL
- Custom validation rules
- Conditional logic
- Field mapping to table columns

### Workflow Automation
Create automation rules based on:
- **Triggers**: Stage change, form submission, time-based, manual
- **Actions**: Send email, create notification, update fields, assign to user, add tag, schedule interview

### AI Features
- Resume/CV parsing and summarization
- Interview transcript processing
- Automatic field extraction from documents
- Candidate ranking and scoring

### Pipeline Management
- Drag-and-drop interface
- Customizable stages with colors
- Stage duration tracking
- Bulk actions on candidates

## Environment Variables

See `.env.example` in `apps/web/` for all available environment variables:

- `DATABASE_URL` - SQLite database path
- `JWT_SECRET` - Authentication secret
- `OPENAI_API_KEY` - OpenAI API key for AI features
- `ANTHROPIC_API_KEY` - Anthropic Claude API key
- `S3_*` - S3 configuration for file storage
- `EMAIL_API_KEY` - Email service API key

## API Routes

### Public Routes
- `POST /api/public/applications/:formId` - Submit application

### Authenticated Routes
- `/api/auth/*` - Authentication
- `/api/candidates/*` - Candidate management
- `/api/forms/*` - Form builder
- `/api/stages/*` - Pipeline stages
- `/api/automations/*` - Automation rules
- `/api/ai/*` - AI processing
- `/api/documents/*` - File management
- `/api/interviews/*` - Interview scheduling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository.
