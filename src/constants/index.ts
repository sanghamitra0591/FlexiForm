import { FieldType } from '../types';

export const FIELD_TYPES: { value: FieldType; label: string }[] = [
  { value: 'text', label: 'Text' },
  { value: 'number', label: 'Number' },
  { value: 'textarea', label: 'Textarea' },
  { value: 'select', label: 'Select' },
  { value: 'radio', label: 'Radio' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'date', label: 'Date' },
];

export const VALIDATION_TYPES = [
  { value: 'required', label: 'Required' },
  { value: 'minLength', label: 'Minimum Length' },
  { value: 'maxLength', label: 'Maximum Length' },
  { value: 'email', label: 'Email Format' },
  { value: 'password', label: 'Password (8+ chars, 1 number)' },
] as const;

export const DERIVED_FORMULAS = [
  { value: 'age', label: 'Age Calculation' },
  { value: 'sum', label: 'Sum' },
  { value: 'concat', label: 'Concatenation' },
] as const;

export const ROUTES = {
  CREATE: '/create',
  PREVIEW: '/preview',
  MY_FORMS: '/myforms',
} as const;

export const LOCAL_STORAGE_KEY = 'formBuilderForms';

export const THEME_COLORS = {
  primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  secondary: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  tertiary: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  neutral: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
} as const;