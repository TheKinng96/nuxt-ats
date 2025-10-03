# TODO - Current Tasks

## 🚀 Current Sprint

### High Priority
- [ ] Install dependencies and verify setup
- [ ] Initialize database and run migrations
- [ ] Set up authentication system
- [ ] Create basic layout and navigation

### In Progress
- [x] Set up monorepo structure
- [x] Configure Nuxt.js with Shadcn Vue
- [x] Create Prisma schema
- [x] Set up project documentation

### Next Up
- [ ] Create authentication pages (login/register)
- [ ] Build dashboard layout
- [ ] Implement form builder UI
- [ ] Set up Pinia stores for state management

## 📋 Feature Development Backlog

### Phase 1: Core Setup & Auth (Week 1-2)
- [ ] User authentication system
  - [ ] Login/Register pages
  - [ ] JWT token handling
  - [ ] Password hashing with bcrypt
  - [ ] Auth middleware
  - [ ] Session management
- [ ] Organization setup
  - [ ] Create organization flow
  - [ ] Organization settings page
  - [ ] User invitation system
- [ ] Basic layouts and navigation
  - [ ] Dashboard layout
  - [ ] Sidebar navigation
  - [ ] User profile dropdown
  - [ ] Responsive mobile menu

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
- [ ] API documentation
- [ ] Component documentation
- [ ] Deployment guide
- [ ] User guide
- [ ] Admin guide

## 💡 Ideas / Nice to Have
- [ ] Dark mode support
- [ ] Multi-language support (i18n)
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

**Last Updated:** 2025-10-03
