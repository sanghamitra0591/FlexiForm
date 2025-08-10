import React from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
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
        <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, sm: 8, md: 8 }}>
                <FormControl fullWidth>
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
            </Grid>

            <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                <Button
                    fullWidth
                    variant="secondary"
                    onClick={onAddField}
                    startIcon={<AddIcon />}
                    sx={{ mt: { xs: 1, sm: 0 } }}
                >
                    Add Field
                </Button>
            </Grid>
        </Grid>
    );
};
