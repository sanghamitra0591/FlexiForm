import { FormField, ValidationRule } from '../types';

export const validateField = (field: FormField, value: any): string => {
  for (const rule of field.validationRules) {
    const error = validateRule(rule, value);
    if (error) return error;
  }
  return '';
};

const validateRule = (rule: ValidationRule, value: any): string => {
  switch (rule.type) {
    case 'required':
      if (!value || (Array.isArray(value) && value.length === 0)) {
        return rule.message;
      }
      break;
    
    case 'minLength':
      if (typeof value === 'string' && value.length < (rule.value || 0)) {
        return rule.message;
      }
      break;
    
    case 'maxLength':
      if (typeof value === 'string' && value.length > (rule.value || 0)) {
        return rule.message;
      }
      break;
    
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (typeof value === 'string' && !emailRegex.test(value)) {
        return rule.message;
      }
      break;
    
    case 'password':
      const passwordRegex = /^(?=.*\d).{8,}$/;
      if (typeof value === 'string' && !passwordRegex.test(value)) {
        return rule.message;
      }
      break;
  }
  return '';
};

export const getDefaultValidationMessage = (type: ValidationRule['type'], value?: number): string => {
  switch (type) {
    case 'required':
      return 'This field is required';
    case 'minLength':
      return `Minimum length is ${value || 1} characters`;
    case 'maxLength':
      return `Maximum length is ${value || 100} characters`;
    case 'email':
      return 'Please enter a valid email address';
    case 'password':
      return 'Password must be at least 8 characters with at least one number';
    default:
      return 'Invalid value';
  }
};