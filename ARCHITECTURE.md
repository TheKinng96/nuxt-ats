# ATS System Architecture

## Overview
Monorepo-based Applicant Tracking System with AI-powered features, dynamic form building, and workflow automation.

## Tech Stack
- **Frontend**: Nuxt.js 3 (Vue 3, TypeScript)
- **Backend**: Nuxt API routes / Nitro server
- **Database**: PostgreSQL (with Prisma ORM)
- **AI**: OpenAI API / Anthropic Claude
- **File Storage**: S3-compatible (AWS S3/MinIO)
- **Email**: Resend/SendGrid
- **Real-time**: WebSockets (Socket.io)

## Monorepo Structure
```
/
├── apps/
│   ├── web/              # Main Nuxt.js application
│   └── api/              # Optional standalone API (if needed)
├── packages/
│   ├── database/         # Prisma schema, migrations, client
│   ├── ui/               # Shared Vue components
│   ├── types/            # Shared TypeScript types
│   ├── ai/               # AI integration utilities
│   └── email/            # Email templates and service
├── package.json          # Root workspace config
└── pnpm-workspace.yaml
```

## Core Features

### 1. Dynamic Form Builder
- Custom field creation (text, email, phone, file upload, multi-select, etc.)
- Field validation rules
- Conditional logic
- Public form URLs
- Field mapping to candidate table columns

### 2. Candidate Management
- Drag-and-drop pipeline stages (Applied → Screening → Interview → Offer → Hired/Rejected)
- Customizable table views with show/hide columns
- Bulk actions
- Advanced filtering and search
- Document viewer

### 3. Workflow Automation
- Trigger: Stage change, form submission, time-based
- Actions:
  - Send email (to candidate, team member, custom)
  - Create notification
  - Update candidate fields
  - Schedule interviews
  - Assign to team member
- Template system for emails

### 4. AI Features
- Resume/CV summarization
- Interview transcript processing
- Automatic field extraction from documents
- Candidate ranking/scoring

### 5. Team Collaboration
- Role-based access control (Admin, Recruiter, Interviewer, Viewer)
- Team workspaces
- Comments and notes on candidates
- Activity timeline

## Database Schema (High-Level)

### Core Entities
- **Organizations**: Multi-tenant support
- **Users**: Team members with roles
- **Forms**: Dynamic application forms
- **FormFields**: Field definitions with types and validation
- **Candidates**: Applicant records
- **CandidateData**: JSON storage for dynamic form responses
- **Stages**: Pipeline stages (customizable per organization)
- **CandidateStages**: Candidate position in pipeline
- **Automations**: Workflow automation rules
- **AutomationActions**: Actions to execute
- **Documents**: Uploaded files (resumes, cover letters)
- **AISummaries**: Generated summaries
- **Interviews**: Scheduled interviews
- **Transcripts**: Interview recordings and transcripts
- **Activities**: Audit log

## API Structure

### Public APIs
- `POST /api/public/applications/{formId}` - Submit application
- `GET /api/public/forms/{formId}` - Get form structure

### Authenticated APIs
- `/api/auth/*` - Authentication
- `/api/organizations/*` - Org management
- `/api/forms/*` - Form CRUD
- `/api/candidates/*` - Candidate management
- `/api/stages/*` - Pipeline stages
- `/api/automations/*` - Automation rules
- `/api/ai/*` - AI processing
- `/api/documents/*` - File upload/download
- `/api/interviews/*` - Interview scheduling
- `/api/users/*` - User management

## State Management
- Pinia stores for client state
- Server-side state in Nitro storage
- Real-time updates via WebSocket

## Security
- JWT-based authentication
- Row-level security (RLS) via organization scoping
- File upload validation and scanning
- Rate limiting on public APIs
- CORS configuration

## AI Integration
- Document parsing: Extract text from PDF/DOCX
- Summarization: Generate candidate summaries
- Transcript processing: Convert speech-to-text, extract key points
- Field extraction: Auto-fill candidate data from resume
