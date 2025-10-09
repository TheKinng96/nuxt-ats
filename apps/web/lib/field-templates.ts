// Field templates for quick form building
// These are preset configurations for common field types

export interface FieldTemplate {
  id: string
  name: string
  icon: string
  type: string
  label: string
  placeholder?: string
  helpText?: string
  required: boolean
  options?: string
  validation?: string
  showInTable: boolean
}

export const fieldTemplates: FieldTemplate[] = [
  // Text inputs
  {
    id: 'short-text',
    name: '短文回答',
    icon: '📝',
    type: 'TEXT',
    label: '無題の質問',
    placeholder: 'ここに回答を入力してください',
    required: false,
    showInTable: true,
  },
  {
    id: 'long-text',
    name: '長文回答',
    icon: '📄',
    type: 'TEXTAREA',
    label: '無題の質問',
    placeholder: '詳細な回答を入力してください',
    required: false,
    showInTable: true,
  },
  {
    id: 'email',
    name: 'メールアドレス',
    icon: '✉️',
    type: 'EMAIL',
    label: 'メールアドレス',
    placeholder: 'example@email.com',
    required: false,
    showInTable: true,
  },
  {
    id: 'phone',
    name: '電話番号',
    icon: '📱',
    type: 'PHONE',
    label: '電話番号',
    placeholder: '090-1234-5678',
    required: false,
    showInTable: true,
  },
  {
    id: 'url',
    name: 'URL',
    icon: '🔗',
    type: 'URL',
    label: 'URL',
    placeholder: 'https://example.com',
    required: false,
    showInTable: true,
  },

  // Number
  {
    id: 'number',
    name: '数値',
    icon: '#️⃣',
    type: 'NUMBER',
    label: '数値を入力',
    placeholder: '0',
    required: false,
    showInTable: true,
  },

  // Date
  {
    id: 'date',
    name: '日付',
    icon: '📅',
    type: 'DATE',
    label: '日付を選択',
    required: false,
    showInTable: true,
  },

  // Selection
  {
    id: 'select',
    name: 'プルダウン',
    icon: '▼',
    type: 'SELECT',
    label: '選択してください',
    placeholder: '選択してください',
    required: false,
    options: JSON.stringify(['オプション 1', 'オプション 2', 'オプション 3']),
    showInTable: true,
  },
  {
    id: 'multi-select',
    name: '複数選択',
    icon: '☑️',
    type: 'MULTI_SELECT',
    label: '該当するものを全て選択',
    required: false,
    options: JSON.stringify(['オプション 1', 'オプション 2', 'オプション 3']),
    showInTable: true,
  },
  {
    id: 'radio',
    name: 'ラジオボタン',
    icon: '⚪',
    type: 'RADIO',
    label: '一つ選択してください',
    required: false,
    options: JSON.stringify(['オプション 1', 'オプション 2', 'オプション 3']),
    showInTable: true,
  },
  {
    id: 'checkbox',
    name: 'チェックボックス',
    icon: '☑️',
    type: 'CHECKBOX',
    label: '同意する',
    required: false,
    showInTable: true,
  },

  // File upload
  {
    id: 'file',
    name: 'ファイル',
    icon: '📎',
    type: 'FILE',
    label: 'ファイルをアップロード',
    helpText: 'PDF、Word、または画像ファイル（最大10MB）',
    required: false,
    showInTable: true,
  },
]

// Common preset forms
export const formPresets = {
  general: [
    'short-text',
    'long-text',
    'email',
    'phone',
    'file',
  ],
  jobApplication: [
    'email',
    'phone',
    'long-text', // 志望動機
    'file', // 履歴書
    'select', // 希望職種
  ],
}

// Get template by ID
export function getFieldTemplate(id: string): FieldTemplate | undefined {
  return fieldTemplates.find((t) => t.id === id)
}

// Create a new field from template
export function createFieldFromTemplate(
  templateId: string,
  order: number
): (Omit<FieldTemplate, 'id' | 'name' | 'icon'> & { order: number }) | null {
  const template = getFieldTemplate(templateId)
  if (!template) return null

  return {
    type: template.type,
    label: template.label,
    placeholder: template.placeholder,
    helpText: template.helpText,
    required: template.required,
    order,
    options: template.options,
    validation: template.validation,
    showInTable: template.showInTable,
  }
}
