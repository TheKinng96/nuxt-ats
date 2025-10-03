// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// Form types
export interface FormFieldDefinition {
  id: string
  label: string
  type: 'text' | 'email' | 'phone' | 'textarea' | 'number' | 'select' | 'multiSelect' | 'checkbox' | 'radio' | 'date' | 'file' | 'url'
  placeholder?: string
  helpText?: string
  required: boolean
  order: number
  options?: Array<{ label: string; value: string }>
  validation?: Record<string, any>
  showInTable: boolean
}

export interface FormDefinition {
  id: string
  name: string
  slug: string
  description?: string
  isActive: boolean
  fields: FormFieldDefinition[]
}

// Candidate types
export interface CandidateListItem {
  id: string
  name: string
  email: string
  phone?: string
  currentStage?: {
    id: string
    name: string
    color?: string
  }
  status: 'ACTIVE' | 'HIRED' | 'REJECTED' | 'WITHDRAWN' | 'ON_HOLD'
  score?: number
  assignedTo?: {
    id: string
    name: string
  }
  createdAt: string
  updatedAt: string
}

export interface CandidateDetail extends CandidateListItem {
  formId: string
  organizationId: string
  submissions: Array<{
    id: string
    data: Record<string, any>
    createdAt: string
  }>
  documents: Array<{
    id: string
    name: string
    type: string
    url: string
    createdAt: string
  }>
  stageHistory: Array<{
    id: string
    stage: {
      id: string
      name: string
      color?: string
    }
    enteredAt: string
    exitedAt?: string
    duration?: number
  }>
  comments: Array<{
    id: string
    content: string
    user: {
      id: string
      name: string
    }
    createdAt: string
    updatedAt: string
  }>
  aiSummaries: Array<{
    id: string
    type: string
    summary: string
    createdAt: string
  }>
}

// Stage types
export interface Stage {
  id: string
  name: string
  description?: string
  color?: string
  order: number
  candidateCount?: number
}

// Automation types
export interface AutomationRule {
  id: string
  name: string
  description?: string
  trigger: 'STAGE_CHANGE' | 'FORM_SUBMISSION' | 'TIME_BASED' | 'MANUAL'
  triggerStageId?: string
  isActive: boolean
  actions: AutomationAction[]
}

export interface AutomationAction {
  id: string
  type: 'SEND_EMAIL' | 'CREATE_NOTIFICATION' | 'UPDATE_FIELD' | 'ASSIGN_TO_USER' | 'ADD_TAG' | 'SCHEDULE_INTERVIEW'
  config: Record<string, any>
  order: number
}

// User types
export interface User {
  id: string
  email: string
  name: string
  role: 'ADMIN' | 'RECRUITER' | 'INTERVIEWER' | 'VIEWER'
  organizationId: string
}

export interface AuthSession {
  user: User
  token: string
}

// Interview types
export interface Interview {
  id: string
  title: string
  candidateId: string
  candidate?: {
    id: string
    name: string
    email: string
  }
  hostId: string
  host?: {
    id: string
    name: string
  }
  scheduledAt: string
  duration: number
  location?: string
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  notes?: string
  participants?: Array<{
    id: string
    name: string
  }>
}

// Activity types
export interface Activity {
  id: string
  type: 'CANDIDATE_CREATED' | 'CANDIDATE_UPDATED' | 'STAGE_CHANGED' | 'DOCUMENT_UPLOADED' | 'INTERVIEW_SCHEDULED' | 'COMMENT_ADDED' | 'EMAIL_SENT' | 'AUTOMATION_TRIGGERED'
  candidateId: string
  userId?: string
  user?: {
    id: string
    name: string
  }
  metadata?: Record<string, any>
  createdAt: string
}

// Filter types
export interface CandidateFilters {
  stageId?: string
  status?: string
  assignedToId?: string
  search?: string
  tags?: string[]
}

// Table column configuration
export interface TableColumn {
  key: string
  label: string
  sortable?: boolean
  visible: boolean
  width?: number
  format?: (value: any) => string
}
