import React from 'react';
import { Container, Paper, Typography, Box, Alert } from '@mui/material';
import { Preview as PreviewIcon, Send as SendIcon } from '@mui/icons-material';
import { useForm } from '../hooks/useForm';
import { Button, GradientCard } from '../components/atoms';
import { FormRenderer } from '../components/organisms';

export const PreviewPage: React.FC = () => {
  const {
    currentForm,
    formValues,
    formErrors,
    handleFieldChange,
    handleFieldValidation,
    validateForm,
  } = useForm();

  const handleSubmit = () => {
    const isValid = validateForm();
    if (isValid) {
      // In a real app, you would submit the form data to a server
      alert('Form submitted successfully! (This is just a preview)');
    } else {
      alert('Please fix the validation errors before submitting');
    }
  };

  if (!currentForm || currentForm.fields.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <GradientCard
          gradientType="primary"
          sx={{ p: 4, textAlign: 'center' }}
        >
          <PreviewIcon sx={{ fontSize: 64, mb: 2, opacity: 0.8 }} />
          <Typography variant="h5" gutterBottom>
            No Form to Preview
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Create a form first to see the preview
          </Typography>
        </GradientCard>
      </Container>
    );
  }

  const hasErrors = Object.keys(formErrors).length > 0;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header */}
      <GradientCard gradientType="primary" sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Form Preview
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
          {currentForm.name || 'Untitled Form'}
        </Typography>
        {currentForm.fields.length > 0 && (
          <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
            {currentForm.fields.length} field{currentForm.fields.length !== 1 ? 's' : ''}
          </Typography>
        )}
      </GradientCard>

      {/* Form Content */}
      <Paper elevation={2} sx={{ p: 4 }}>
        {hasErrors && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            Please fix the validation errors before submitting the form.
          </Alert>
        )}

        <FormRenderer
          form={currentForm}
          values={formValues}
          errors={formErrors}
          onChange={handleFieldChange}
          onValidate={handleFieldValidation}
        />
        
        {/* Submit Button */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="tertiary"
            size="large"
            onClick={handleSubmit}
            startIcon={<SendIcon />}
            sx={{ px: 4 }}
          >
            Submit Form
          </Button>
        </Box>

        {/* Form Data Debug (for development) */}
        {process.env.NODE_ENV === 'development' && (
          <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              Form Data (Development Only):
            </Typography>
            <pre style={{ fontSize: '12px', overflow: 'auto' }}>
              {JSON.stringify({ formValues, formErrors }, null, 2)}
            </pre>
          </Box>
        )}
      </Paper>
    </Container>
  );
};