// Validation rule types
export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'email' | 'password';
  value?: number;
  message: string;
}

// Form field types
export type FieldType = 'text' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date';

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  defaultValue: string | string[];
  validationRules: ValidationRule[];
  options?: string[];
  isDerived: boolean;
  derivedFrom?: string[];
  derivedFormula?: string;
}

// Form schema
export interface FormSchema {
  id: string;
  name: string;
  fields: FormField[];
  createdAt: string;
}

// Form state
export interface FormState {
  currentForm: FormSchema | null;
  savedForms: FormSchema[];
  formValues: Record<string, any>;
  formErrors: Record<string, string>;
  isLoading: boolean;
}

// Component props types
export interface FieldConfigPanelProps {
  field: FormField;
  onUpdate: (updates: Partial<FormField>) => void;
  onDelete: () => void;
  availableFields: FormField[];
}

export interface FormRendererProps {
  form: FormSchema;
  values: Record<string, any>;
  errors: Record<string, string>;
  onChange: (fieldId: string, value: any) => void;
  onValidate: (fieldId: string, error: string) => void;
}

export interface ValidationDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (rule: ValidationRule) => void;
}