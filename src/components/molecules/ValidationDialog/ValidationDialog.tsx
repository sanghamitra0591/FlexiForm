import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
} from '@mui/material';
import { ValidationRule, ValidationDialogProps } from '../../../types';
import { VALIDATION_TYPES } from '../../../constants';
import { getDefaultValidationMessage } from '../../../utils/validation';
import { Button } from '../../atoms';

export const ValidationDialog: React.FC<ValidationDialogProps> = ({
  open,
  onClose,
  onAdd,
}) => {
  const [rule, setRule] = useState<ValidationRule>({
    type: 'required',
    message: '',
  });

  const handleTypeChange = (type: ValidationRule['type']) => {
    const defaultMessage = getDefaultValidationMessage(type, rule.value);
    setRule({
      type,
      message: defaultMessage,
      value: ['minLength', 'maxLength'].includes(type) ? rule.value || 1 : undefined,
    });
  };

  const handleAdd = () => {
    if (rule.message.trim()) {
      onAdd(rule);
      setRule({ type: 'required', message: '' });
      onClose();
    }
  };

  const handleClose = () => {
    setRule({ type: 'required', message: '' });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Validation Rule</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Rule Type</InputLabel>
            <Select
              value={rule.type}
              onChange={(e) => handleTypeChange(e.target.value as ValidationRule['type'])}
            >
              {VALIDATION_TYPES.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {['minLength', 'maxLength'].includes(rule.type) && (
            <TextField
              fullWidth
              type="number"
              label="Value"
              value={rule.value || ''}
              onChange={(e) => setRule({ ...rule, value: parseInt(e.target.value) || 1 })}
              sx={{ mb: 2 }}
              inputProps={{ min: 1 }}
            />
          )}

          <TextField
            fullWidth
            label="Error Message"
            value={rule.message}
            onChange={(e) => setRule({ ...rule, message: e.target.value })}
            multiline
            rows={2}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAdd} disabled={!rule.message.trim()}>
          Add Rule
        </Button>
      </DialogActions>
    </Dialog>
  );
};