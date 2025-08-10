import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { FormRendererProps } from '../../../types';
import { FormInput } from '../../molecules';
import { calculateDerivedValue } from '../../../utils/derivedFields';

export const FormRenderer: React.FC<FormRendererProps> = ({
  form,
  values,
  errors,
  onChange,
  onValidate,
}) => {
  const getFieldValue = (field: any) => {
    if (field.isDerived) {
      return calculateDerivedValue(field, values);
    }
    return values[field.id] || field.defaultValue || '';
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    onChange(fieldId, value);
  };

  if (!form || form.fields.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No fields to display
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Add some fields to see the form preview
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {form.fields.map((field, index) => (
        <Box key={field.id} sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            {field.required && (
              <Chip label="Required" size="small" color="error" variant="outlined" />
            )}
            {field.isDerived && (
              <Chip label="Auto-calculated" size="small" color="info" variant="outlined" />
            )}
          </Box>
          
          <FormInput
            field={field}
            value={getFieldValue(field)}
            error={errors[field.id]}
            onChange={(value) => handleFieldChange(field.id, value)}
            disabled={field.isDerived}
          />
          
          {field.isDerived && (
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
              This value is automatically calculated based on other fields
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};