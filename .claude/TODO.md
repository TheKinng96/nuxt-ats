# TODO - Current Tasks

## 🚀 Current Sprint

### High Priority
- [ ] Start Form Builder development (Phase 2)
- [ ] Create organization settings page
- [ ] Implement user invitation system

### Recently Completed
- [x] Set up monorepo structure
- [x] Configure Nuxt.js with Shadcn Vue
- [x] Create Prisma schema
- [x] Set up project documentation
- [x] Implement Japanese i18n with component-level translations
- [x] Add i18n documentation and guidelines to CLAUDE.md
- [x] Initialize database and run first migration
- [x] Set up authentication system foundation (JWT, middleware)
- [x] Create authentication pages (login/register with component-level i18n)
- [x] Set up Pinia stores for state management (useAuthStore)
- [x] Organize pages into logical folder structure
- [x] Create basic dashboard page with user info display
- [x] Implement auth and guest middleware for route protection
- [x] Fix database connection and path configuration
- [x] Create dashboard layout with sidebar navigation
- [x] Build dashboard layout component with collapsible sidebar
- [x] Add navigation menu with all main sections
- [x] Implement user profile section in sidebar
- [x] Create placeholder pages for main features (candidates, forms, pipeline, interviews, settings)
- [x] Make dashboard fully responsive for mobile
- [x] Fix app.vue to use NuxtLayout wrapper

### Next Up
- [ ] Implement role-based navigation visibility
- [ ] Add organization settings page with edit functionality
- [ ] Build form builder UI (drag-and-drop)

## 📋 Feature Development Backlog

### Phase 1: Core Setup & Auth (Week 1-2) ✅
- [x] User authentication system
  - [x] Login/Register pages (with component-level i18n)
  - [x] JWT token handling (HTTP-only cookies)
  - [x] Password hashing with bcrypt
  - [x] Auth middleware (auth.ts and guest.ts)
  - [x] Session management (via authStore)
- [ ] Organization setup
  - [x] Create organization flow (during registration)
  - [ ] Organization settings page
  - [ ] User invitation system
- [x] Basic layouts and navigation
  - [x] Dashboard layout with sidebar
  - [x] Sidebar navigation component
  - [x] User profile section in sidebar
  - [x] Responsive mobile menu
  - [x] Placeholder pages for all main sections

### Phase 2: Form Builder (Week 3-4)
- [ ] Form builder UI
  - [ ] Drag-and-drop field arrangement
  - [ ] Field type selector (text, email, phone, etc.)
  - [ ] Field properties panel
  - [ ] Validation rules configuration
  - [ ] Preview mode
- [ ] Form management
  - [ ] Create/Edit/Delete forms
  - [ ] Form list page
  - [ ] Form status toggle (active/inactive)
  - [ ] Form slug generation
- [ ] Public form pages
  - [ ] Render form from schema
  - [ ] Form submission handling
  - [ ] File upload support
  - [ ] Success/Error messages
  - [ ] Form validation with Yup

### Phase 3: Candidate Management (Week 5-6)
- [ ] Candidate list page
  - [ ] Table view with sorting/filtering
  - [ ] Search functionality
  - [ ] Column visibility toggle
  - [ ] Pagination
  - [ ] Bulk actions
- [ ] Candidate detail page
  - [ ] Candidate information display
  - [ ] Document viewer
  - [ ] Stage history timeline
  - [ ] Comments section
  - [ ] Activity log
  - [ ] AI summary display
- [ ] Candidate operations
  - [ ] Create candidate manually
  - [ ] Edit candidate information
  - [ ] Delete candidate
  - [ ] Assign to user
  - [ ] Add tags
  - [ ] Update status

### Phase 4: Pipeline & Stages (Week 7-8)
- [ ] Pipeline view
  - [ ] Kanban board UI
  - [ ] Drag-and-drop candidates between stages
  - [ ] Stage cards with candidate count
  - [ ] Quick actions on cards
  - [ ] Filters and search
- [ ] Stage management
  - [ ] Create/Edit/Delete stages
  - [ ] Reorder stages
  - [ ] Set stage colors
  - [ ] Stage settings
- [ ] Stage transitions
  - [ ] Track stage history
  - [ ] Calculate time in stage
  - [ ] Stage change triggers

### Phase 5: Workflow Automation (Week 9-10)
- [ ] Automation builder
  - [ ] Trigger selection (stage change, form submit, time-based)
  - [ ] Action builder UI
  - [ ] Email template editor
  - [ ] Notification configuration
  - [ ] Conditional logic
- [ ] Automation management
  - [ ] List all automations
  - [ ] Enable/Disable automations
  - [ ] Test automation
  - [ ] View automation logs
- [ ] Email system
  - [ ] Email template management
  - [ ] Variable interpolation
  - [ ] Send emails via API (Resend/SendGrid)
  - [ ] Email tracking

### Phase 6: AI Integration (Week 11-12)
- [ ] Document processing
  - [ ] PDF text extraction
  - [ ] DOCX text extraction
  - [ ] Resume parsing
  - [ ] Field extraction from documents
- [ ] AI summarization
  - [ ] Resume/CV summarization
  - [ ] Extract key skills and experience
  - [ ] Generate candidate highlights
  - [ ] Scoring/Ranking algorithm
- [ ] Interview transcripts
  - [ ] Upload audio/video recordings
  - [ ] Speech-to-text conversion
  - [ ] Transcript summarization
  - [ ] Key points extraction

### Phase 7: Interview Management (Week 13-14)
- [ ] Interview scheduling
  - [ ] Calendar integration
  - [ ] Create interview slots
  - [ ] Assign interviewers
  - [ ] Send interview invitations
  - [ ] Reminder notifications
- [ ] Interview management
  - [ ] Interview list page
  - [ ] Interview detail page
  - [ ] Add interview notes
  - [ ] Update interview status
  - [ ] Reschedule/Cancel interviews

### Phase 8: Team Collaboration (Week 15-16)
- [ ] User management
  - [ ] Invite team members
  - [ ] Role assignment (Admin, Recruiter, Interviewer, Viewer)
  - [ ] User permissions
  - [ ] Remove users
- [ ] Comments & Notes
  - [ ] Add comments on candidates
  - [ ] @mentions for team members
  - [ ] Edit/Delete comments
  - [ ] Comment notifications
- [ ] Activity tracking
  - [ ] Log all actions
  - [ ] Activity feed
  - [ ] Filter by user/type
  - [ ] Export activity logs

### Phase 9: Document Management (Week 17)
- [ ] File upload system
  - [ ] S3 integration
  - [ ] File type validation
  - [ ] File size limits
  - [ ] Virus scanning
- [ ] Document viewer
  - [ ] PDF viewer
  - [ ] Image viewer
  - [ ] Download documents
  - [ ] Delete documents

### Phase 10: Analytics & Reporting (Week 18)
- [ ] Dashboard analytics
  - [ ] Candidate pipeline metrics
  - [ ] Stage conversion rates
  - [ ] Time-to-hire statistics
  - [ ] Source tracking
- [ ] Reports
  - [ ] Custom report builder
  - [ ] Export to CSV/Excel
  - [ ] Scheduled reports
  - [ ] Email reports

## 🐛 Bug Fixes
- [ ] None yet

## 🔧 Technical Debt
- [ ] Add comprehensive error handling
- [ ] Set up logging system
- [ ] Add API rate limiting
- [ ] Implement caching strategy
- [ ] Add unit tests
- [ ] Add E2E tests
- [ ] Performance optimization
- [ ] Security audit

## 📝 Documentation
- [x] README.md
- [x] ARCHITECTURE.md
- [x] i18n Quick Start Guide (I18N-QUICK-START.md)
- [x] i18n Full Documentation (I18N.md)
- [x] CLAUDE.md with i18n guidelines
- [ ] API documentation
- [ ] Component documentation
- [ ] Deployment guide
- [ ] User guide
- [ ] Admin guide

## 💡 Ideas / Nice to Have
- [ ] Dark mode support
- [x] Multi-language support (i18n) - Japanese implemented
- [ ] Add additional languages (English, etc.)
- [ ] Mobile app (React Native/Flutter)
- [ ] Slack/Discord integration
- [ ] Zapier integration
- [ ] Browser extension for sourcing candidates
- [ ] Candidate portal (check application status)
- [ ] Video interview integration (Zoom/Meet)
- [ ] Skills assessment platform integration
- [ ] Background check integration
- [ ] Offer letter generation
- [ ] E-signature integration
- [ ] GDPR compliance tools (data export/deletion)
- [ ] Candidate referral program
- [ ] Job board integration (LinkedIn, Indeed, etc.)

---

**Last Updated:** 2025-10-07 (Phase 1 Core Setup & Auth completed! 🎉)
