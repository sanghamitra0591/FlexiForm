import React, { useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  IconButton,
  Chip,
  Typography,
  Grid,
  Box,
  Divider,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  DragIndicator as DragIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { FieldConfigPanelProps, ValidationRule } from '../../../types';
import { DERIVED_FORMULAS } from '../../../constants';
import { ValidationDialog } from '../../molecules';
import { Button } from '../../atoms';

// Update the interface to include isDragging prop
interface ExtendedFieldConfigPanelProps extends FieldConfigPanelProps {
  isDragging?: boolean;
}

export const FieldConfigPanel: React.FC<ExtendedFieldConfigPanelProps> = ({
  field,
  onUpdate,
  onDelete,
  availableFields,
  isDragging = false,
}) => {
  const [validationDialog, setValidationDialog] = useState(false);

  const addValidationRule = (rule: ValidationRule) => {
    onUpdate({
      validationRules: [...field.validationRules, rule],
    });
  };

  const removeValidationRule = (index: number) => {
    onUpdate({
      validationRules: field.validationRules.filter((_, i) => i !== index),
    });
  };

  const handleOptionsChange = (value: string) => {
    const options = value.split(',').map(opt => opt.trim()).filter(opt => opt);
    onUpdate({ options });
  };

  return (
    <Card 
      sx={{ 
        height: 'fit-content',
        border: isDragging ? '2px dashed #1976d2' : '2px solid transparent',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: 3,
        },
        transition: 'all 0.2s ease-in-out',
        transform: isDragging ? 'rotate(2deg)' : 'none',
      }}
    >
      <CardContent>
        {/* Header with drag handle */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 2 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DragIcon 
              sx={{ 
                color: isDragging ? '#1976d2' : '#666', 
                cursor: 'move',
                '&:hover': { color: '#1976d2' }
              }} 
            />
            <Chip 
              label={field.type} 
              color="primary" 
              size="small" 
              sx={{ fontWeight: 600 }}
            />
          </Box>
          <IconButton onClick={onDelete} color="error" size="small">
            <DeleteIcon />
          </IconButton>
        </Box>

        {/* Basic Configuration */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              fullWidth
              label="Field Label"
              value={field.label}
              onChange={(e) => onUpdate({ label: e.target.value })}
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={field.required}
                  onChange={(e) => onUpdate({ required: e.target.checked })}
                  color="primary"
                />
              }
              label="Required"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        {/* Default Value */}
        <TextField
          fullWidth
          label="Default Value"
          value={Array.isArray(field.defaultValue) 
            ? field.defaultValue.join(', ') 
            : field.defaultValue
          }
          onChange={(e) => onUpdate({ 
            defaultValue: field.type === 'checkbox' 
              ? e.target.value.split(', ').filter(v => v.trim())
              : e.target.value 
          })}
          size="small"
          sx={{ mb: 2 }}
        />

        {/* Options for select, radio, checkbox */}
        {['select', 'radio', 'checkbox'].includes(field.type) && (
          <TextField
            fullWidth
            label="Options (comma separated)"
            value={field.options?.join(', ') || ''}
            onChange={(e) => handleOptionsChange(e.target.value)}
            size="small"
            placeholder="Option 1, Option 2, Option 3"
            sx={{ mb: 2 }}
            helperText="Separate options with commas"
          />
        )}

        <Divider sx={{ my: 2 }} />

        {/* Derived Field Configuration */}
        <Box sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={field.isDerived}
                onChange={(e) => onUpdate({ isDerived: e.target.checked })}
                color="secondary"
              />
            }
            label={
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  Derived Field
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Calculate value from other fields
                </Typography>
              </Box>
            }
          />

          {field.isDerived && (
            <Box sx={{ mt: 2, pl: 2, borderLeft: '3px solid', borderColor: 'secondary.main' }}>
              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <InputLabel>Parent Fields</InputLabel>
                <Select
                  multiple
                  value={field.derivedFrom || []}
                  onChange={(e) => onUpdate({ derivedFrom: e.target.value as string[] })}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => {
                        const parentField = availableFields.find(f => f.id === value);
                        return (
                          <Chip 
                            key={value} 
                            label={parentField?.label || value} 
                            size="small" 
                            color="secondary"
                          />
                        );
                      })}
                    </Box>
                  )}
                >
                  {availableFields
                    .filter(f => f.id !== field.id && !f.isDerived)
                    .map((f) => (
                      <MenuItem key={f.id} value={f.id}>
                        {f.label} ({f.type})
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel>Formula</InputLabel>
                <Select
                  value={field.derivedFormula || ''}
                  onChange={(e) => onUpdate({ derivedFormula: e.target.value })}
                >
                  {DERIVED_FORMULAS.map((formula) => (
                    <MenuItem key={formula.value} value={formula.value}>
                      {formula.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Validation Rules */}
        <Box>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 2 
          }}>
            <Typography variant="subtitle2" fontWeight={600}>
              Validation Rules
            </Typography>
            <Button
              size="small"
              onClick={() => setValidationDialog(true)}
              startIcon={<AddIcon />}
              variant="outlined"
            >
              Add Rule
            </Button>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {field.validationRules.length === 0 ? (
              <Typography variant="body2" color="text.secondary" fontStyle="italic">
                No validation rules added
              </Typography>
            ) : (
              field.validationRules.map((rule, index) => (
                <Chip
                  key={index}
                  label={`${rule.type}${rule.value ? ` (${rule.value})` : ''}`}
                  onDelete={() => removeValidationRule(index)}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              ))
            )}
          </Box>
        </Box>

        {/* Validation Dialog */}
        <ValidationDialog
          open={validationDialog}
          onClose={() => setValidationDialog(false)}
          onAdd={addValidationRule}
        />
      </CardContent>
    </Card>
  );
};