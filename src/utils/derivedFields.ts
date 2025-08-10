import { FormField } from '../types';

export const calculateDerivedValue = (
  field: FormField, 
  formValues: Record<string, any>
): any => {
  if (!field.isDerived || !field.derivedFrom || !field.derivedFormula) {
    return '';
  }

  try {
    switch (field.derivedFormula) {
      case 'age':
        return calculateAge(formValues[field.derivedFrom[0]]);
      
      case 'sum':
        return calculateSum(field.derivedFrom, formValues);
      
      case 'concat':
        return calculateConcatenation(field.derivedFrom, formValues);
      
      default:
        return '';
    }
  } catch (error) {
    console.error('Error calculating derived value:', error);
    return '';
  }
};

const calculateAge = (birthDate: string): string => {
  if (!birthDate) return '';
  
  const today = new Date();
  const birth = new Date(birthDate);
  
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age >= 0 ? age.toString() : '';
};

const calculateSum = (fieldIds: string[], formValues: Record<string, any>): string => {
  const sum = fieldIds.reduce((total, fieldId) => {
    const value = parseFloat(formValues[fieldId]) || 0;
    return total + value;
  }, 0);
  
  return sum.toString();
};

const calculateConcatenation = (fieldIds: string[], formValues: Record<string, any>): string => {
  return fieldIds
    .map(fieldId => formValues[fieldId] || '')
    .filter(value => value.toString().trim())
    .join(' ');
};