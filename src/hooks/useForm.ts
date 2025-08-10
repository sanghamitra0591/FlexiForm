import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { 
  setFormValue, 
  setFormError, 
  clearFormValues, 
  clearFormErrors 
} from '../store/formSlice';
import { validateField } from '../utils/validation';
import { calculateDerivedValue } from '../utils/derivedFields';
import { FormField } from '../types';

export const useForm = () => {
  const dispatch = useAppDispatch();
  const { currentForm, formValues, formErrors } = useAppSelector(state => state.form);

  const handleFieldChange = useCallback((fieldId: string, value: any) => {
    dispatch(setFormValue({ fieldId, value }));
    
    // Find the field and validate
    const field = currentForm?.fields.find(f => f.id === fieldId);
    if (field) {
      const error = validateField(field, value);
      dispatch(setFormError({ fieldId, error }));
    }
  }, [dispatch, currentForm]);

  const handleFieldValidation = useCallback((fieldId: string, error: string) => {
    dispatch(setFormError({ fieldId, error }));
  }, [dispatch]);

  const clearForm = useCallback(() => {
    dispatch(clearFormValues());
    dispatch(clearFormErrors());
  }, [dispatch]);

  const getFieldValue = useCallback((field: FormField) => {
    if (field.isDerived) {
      return calculateDerivedValue(field, formValues);
    }
    return formValues[field.id] || field.defaultValue || '';
  }, [formValues]);

  const validateForm = useCallback(() => {
    if (!currentForm) return false;

    let isValid = true;
    currentForm.fields.forEach(field => {
      const value = getFieldValue(field);
      const error = validateField(field, value);
      if (error) {
        dispatch(setFormError({ fieldId: field.id, error }));
        isValid = false;
      }
    });

    return isValid;
  }, [currentForm, getFieldValue, dispatch]);

  // Update derived fields when their parent values change
  useEffect(() => {
    if (currentForm) {
      currentForm.fields.forEach(field => {
        if (field.isDerived) {
          const derivedValue = calculateDerivedValue(field, formValues);
          if (formValues[field.id] !== derivedValue) {
            dispatch(setFormValue({ fieldId: field.id, value: derivedValue }));
          }
        }
      });
    }
  }, [currentForm, formValues, dispatch]);

  return {
    currentForm,
    formValues,
    formErrors,
    handleFieldChange,
    handleFieldValidation,
    clearForm,
    getFieldValue,
    validateForm,
  };
};