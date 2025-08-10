import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormState, FormSchema, FormField } from '../types';
import { saveFormsToStorage, loadFormsFromStorage } from '../utils/localStorage';

const initialState: FormState = {
    currentForm: null,
    savedForms: [],
    formValues: {},
    formErrors: {},
    isLoading: false,
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setCurrentForm: (state, action: PayloadAction<FormSchema>) => {
            state.currentForm = action.payload;
        },

        resetCurrentForm: (state) => {
            state.currentForm = {
                id: Date.now().toString(),
                name: '',
                fields: [],
                createdAt: '',
            };
            state.formValues = {};
            state.formErrors = {};
        },

        addField: (state, action: PayloadAction<FormField>) => {
            if (state.currentForm) {
                state.currentForm.fields.push(action.payload);
            }
        },

        updateField: (state, action: PayloadAction<{ id: string; field: Partial<FormField> }>) => {
            if (state.currentForm) {
                const fieldIndex = state.currentForm.fields.findIndex(f => f.id === action.payload.id);
                if (fieldIndex !== -1) {
                    state.currentForm.fields[fieldIndex] = {
                        ...state.currentForm.fields[fieldIndex],
                        ...action.payload.field,
                    };
                }
            }
        },

        deleteField: (state, action: PayloadAction<string>) => {
            if (state.currentForm) {
                state.currentForm.fields = state.currentForm.fields.filter(
                    field => field.id !== action.payload
                );
            }
        },

        reorderFields: (state, action: PayloadAction<FormField[]>) => {
            if (state.currentForm) {
                state.currentForm.fields = action.payload;
            }
        },

        saveForm: (state, action: PayloadAction<string>) => {
            if (state.currentForm) {
                const formToSave: FormSchema = {
                    ...state.currentForm,
                    name: action.payload,
                    createdAt: new Date().toISOString(),
                };

                state.savedForms.push(formToSave);
                saveFormsToStorage(state.savedForms);
            }
        },

        loadSavedForms: (state) => {
            state.savedForms = loadFormsFromStorage();
        },

        setFormValue: (state, action: PayloadAction<{ fieldId: string; value: any }>) => {
            state.formValues[action.payload.fieldId] = action.payload.value;
        },

        setFormError: (state, action: PayloadAction<{ fieldId: string; error: string }>) => {
            if (action.payload.error) {
                state.formErrors[action.payload.fieldId] = action.payload.error;
            } else {
                delete state.formErrors[action.payload.fieldId];
            }
        },

        clearFormErrors: (state) => {
            state.formErrors = {};
        },

        clearFormValues: (state) => {
            state.formValues = {};
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },

        deleteForm: (state, action: PayloadAction<string>) => {
            state.savedForms = state.savedForms.filter(form => form.id !== action.payload);
            saveFormsToStorage(state.savedForms);
        },
    },
});

export const {
    setCurrentForm,
    resetCurrentForm,
    addField,
    updateField,
    deleteField,
    reorderFields,
    saveForm,
    loadSavedForms,
    setFormValue,
    setFormError,
    clearFormErrors,
    clearFormValues,
    setLoading,
    deleteForm,
} = formSlice.actions;

export default formSlice.reducer;