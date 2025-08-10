import { FormSchema } from '../types';
import { LOCAL_STORAGE_KEY } from '../constants';

export const saveFormsToStorage = (forms: FormSchema[]): boolean => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(forms));
    return true;
  } catch (error) {
    console.error('Failed to save forms to localStorage:', error);
    return false;
  }
};

export const loadFormsFromStorage = (): FormSchema[] => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load forms from localStorage:', error);
    return [];
  }
};

export const clearFormsStorage = (): boolean => {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear forms from localStorage:', error);
    return false;
  }
};