import React from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
} from '@mui/material';
import { FieldType } from '../../../types';
import { FIELD_TYPES } from '../../../constants';
import { Button } from '../../atoms';
import { Add as AddIcon } from '@mui/icons-material';

interface FieldSelectorProps {
    selectedType: FieldType;
    onTypeChange: (type: FieldType) => void;
    onAddField: () => void;
}

export const FieldSelector: React.FC<FieldSelectorProps> = ({
    selectedType,
    onTypeChange,
    onAddField,
}) => {
    return (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControl sx={{ flexGrow: 1, minWidth: 300 }}>
                <InputLabel>Field Type</InputLabel>
                <Select
                    value={selectedType}
                    onChange={(e) => onTypeChange(e.target.value as FieldType)}
                    label="Field Type"
                >
                    {FIELD_TYPES.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                            {type.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button
                variant="secondary"
                onClick={onAddField}
                startIcon={<AddIcon />}
                sx={{ flexShrink: 0, whiteSpace: 'nowrap' }}
            >
                Add Field
            </Button>
        </Box>

    );
};
