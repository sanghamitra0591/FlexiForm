import React from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormHelperText,
} from '@mui/material';
import { FormField } from '../../../types';

interface FormInputProps {
  field: FormField;
  value: any;
  error?: string;
  onChange: (value: any) => void;
  disabled?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  field,
  value,
  error,
  onChange,
  disabled = false,
}) => {
  const commonProps = {
    error: Boolean(error),
    helperText: error,
    disabled: disabled || field.isDerived,
  };

  const renderInput = () => {
    switch (field.type) {
      case 'text':
        return (
          <TextField
            fullWidth
            label={field.label}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            {...commonProps}
          />
        );

      case 'number':
        return (
          <TextField
            fullWidth
            type="number"
            label={field.label}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            {...commonProps}
          />
        );

      case 'textarea':
        return (
          <TextField
            fullWidth
            multiline
            rows={4}
            label={field.label}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            {...commonProps}
          />
        );

      case 'select':
        return (
          <FormControl fullWidth error={Boolean(error)} disabled={disabled || field.isDerived}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              label={field.label}
            >
              {field.options?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        );

      case 'radio':
        return (
          <FormControl error={Boolean(error)} disabled={disabled || field.isDerived}>
            <FormLabel component="legend">{field.label}</FormLabel>
            <RadioGroup
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
            >
              {field.options?.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        );

      case 'checkbox':
        return (
          <FormControl error={Boolean(error)} disabled={disabled || field.isDerived}>
            <FormLabel component="legend">{field.label}</FormLabel>
            <FormGroup>
              {field.options?.map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      checked={(value || []).includes(option)}
                      onChange={(e) => {
                        const currentValue = value || [];
                        const newValue = e.target.checked
                          ? [...currentValue, option]
                          : currentValue.filter((v: string) => v !== option);
                        onChange(newValue);
                      }}
                    />
                  }
                  label={option}
                />
              ))}
            </FormGroup>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        );

      case 'date':
        return (
          <TextField
            fullWidth
            type="date"
            label={field.label}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            InputLabelProps={{ shrink: true }}
            {...commonProps}
          />
        );

      default:
        return null;
    }
  };

  return renderInput();
};