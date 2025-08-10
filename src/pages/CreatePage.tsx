import React, { useState } from 'react';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Alert,
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
    addField,
    updateField,
    deleteField,
    saveForm,
    reorderFields  // Add this action to your formSlice
} from '../store/formSlice';
import { FieldType, FormField } from '../types';
import { Button, GradientCard } from '../components/atoms';
import { FieldSelector } from '../components/molecules';
import { FieldConfigPanel } from '../components/organisms';

export const CreatePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { currentForm } = useAppSelector(state => state.form);

    const [fieldType, setFieldType] = useState<FieldType>('text');
    const [saveDialog, setSaveDialog] = useState(false);
    const [formName, setFormName] = useState('');
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [draggedField, setDraggedField] = useState<string | null>(null);

    const handleAddField = () => {
        const newField: FormField = {
            id: Date.now().toString(),
            type: fieldType,
            label: `${fieldType.charAt(0).toUpperCase() + fieldType.slice(1)} Field`,
            required: false,
            defaultValue: fieldType === 'checkbox' ? [] : '',
            validationRules: [],
            options: ['select', 'radio', 'checkbox'].includes(fieldType)
                ? ['Option 1', 'Option 2', 'Option 3']
                : undefined,
            isDerived: false,
        };
        dispatch(addField(newField));
    };

    const handleUpdateField = (id: string, updates: Partial<FormField>) => {
        dispatch(updateField({ id, field: updates }));
    };

    const handleDeleteField = (id: string) => {
        dispatch(deleteField(id));
    };

    const handleSaveForm = () => {
        if (formName.trim() && currentForm && currentForm.fields.length > 0) {
            dispatch(saveForm(formName.trim()));
            setFormName('');
            setSaveDialog(false);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        }
    };

    // Drag and Drop handlers
    const handleDragStart = (e: React.DragEvent, fieldId: string) => {
        setDraggedField(fieldId);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent, targetFieldId: string) => {
        e.preventDefault();

        if (draggedField && draggedField !== targetFieldId && currentForm) {
            const fields = [...currentForm.fields];
            const draggedIndex = fields.findIndex(f => f.id === draggedField);
            const targetIndex = fields.findIndex(f => f.id === targetFieldId);

            // Remove dragged field and insert at target position
            const [draggedFieldData] = fields.splice(draggedIndex, 1);
            fields.splice(targetIndex, 0, draggedFieldData);

            dispatch(reorderFields(fields));
        }

        setDraggedField(null);
    };

    const handleDragEnd = () => {
        setDraggedField(null);
    };

    const canSaveForm = currentForm && currentForm.fields.length > 0;

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Header */}
            <GradientCard gradientType="primary" sx={{ p: { xs: 2, sm: 3 }, mb: 3, overflow: 'hidden' }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } }}>
                    Form Builder
                </Typography>
                <Typography variant="subtitle1" sx={{ opacity: 0.9, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                    Create dynamic forms with custom fields and validation rules
                </Typography>
            </GradientCard>

            {/* Success Alert */}
            {saveSuccess && (
                <Alert severity="success" sx={{ mb: 3 }}>
                    Form saved successfully!
                </Alert>
            )}

            {/* Add New Field Section */}
            <Box>
                <Typography variant="h6" sx={{ color: '#333', fontWeight: 'bold' }}>
                    Add New Field
                </Typography>
                <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid size={{ xs: 12, md: 8, lg: 9 }}>
                            <FieldSelector
                                selectedType={fieldType}
                                onTypeChange={setFieldType}
                                onAddField={handleAddField}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
                            {canSaveForm && (
                                <Button
                                    fullWidth
                                    variant="primary"
                                    onClick={() => setSaveDialog(true)}
                                    startIcon={<SaveIcon />}
                                    sx={{ mt: { xs: 2, md: 0 } }}
                                >
                                    Save Form
                                </Button>
                            )}
                        </Grid>

                        {/* Field Count Info */}
                        {currentForm?.fields && currentForm.fields.length > 0 && (
                            <Box sx={{ p: 2, bgcolor: 'grey.200', borderRadius: 1, display: 'inline-block' }}>
                                <Typography variant="body2" color="text.secondary">
                                    Fields added: {currentForm?.fields.length || 0}
                                </Typography>
                            </Box>
                        )}
                    </Grid>
                </Paper>
            </Box>

            {/* Main Content */}
            <Box>
                {!currentForm?.fields.length ? (
                    <GradientCard
                        gradientType="neutral"
                        sx={{ p: 4, textAlign: 'center' }}
                    >
                        <Typography variant="h6" color="text.secondary">
                            No fields added yet
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Start building your form by adding fields from above
                        </Typography>
                    </GradientCard>
                ) : (
                    <Box>
                        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                            Form Fields ({currentForm.fields.length})
                        </Typography>

                        {/* Grid layout for field cards */}
                            <Grid container spacing={3}>
                                {currentForm.fields.map((field) => (
                                    <Grid
                                        size={{
                                            xs: 12,  // 1 per row on extra-small screens
                                            sm: 6,   // 2 per row on small screens
                                            md: 4,   // 3 per row on medium screens
                                            lg: 3
                                        }}
                                        key={field.id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, field.id)}
                                        onDragOver={handleDragOver}
                                        onDrop={(e) => handleDrop(e, field.id)}
                                        onDragEnd={handleDragEnd}
                                        sx={{
                                            cursor: draggedField === field.id ? 'grabbing' : 'grab',
                                            opacity: draggedField === field.id ? 0.5 : 1,
                                            transition: 'opacity 0.2s ease',
                                            maxWidth: '100%',
                                        }}
                                    >
                                        <FieldConfigPanel
                                            field={field}
                                            onUpdate={(updates) => handleUpdateField(field.id, updates)}
                                            onDelete={() => handleDeleteField(field.id)}
                                            availableFields={currentForm.fields}
                                            isDragging={draggedField === field.id}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                    </Box>
                )}
            </Box>

            {/* Save Form Dialog */}
            <Dialog
                open={saveDialog}
                onClose={() => setSaveDialog(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Save Form</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        fullWidth
                        label="Form Name"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        sx={{ mt: 1 }}
                        placeholder="Enter a descriptive name for your form"
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="text" onClick={() => setSaveDialog(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSaveForm}
                        disabled={!formName.trim()}
                    >
                        Save Form
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};