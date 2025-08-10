import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  List as ListIcon,
  Delete as DeleteIcon,
  Preview as PreviewIcon,
  DateRange as DateIcon,
  Description as FormIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { 
  loadSavedForms, 
  setCurrentForm, 
  deleteForm,
  resetCurrentForm,
  clearFormValues,
  clearFormErrors,
} from '../store/formSlice';
import { FormSchema } from '../types';
import { ROUTES } from '../constants';
import { Button, GradientCard } from '../components/atoms';

export const MyFormsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { savedForms } = useAppSelector(state => state.form);
  const [deleteDialog, setDeleteDialog] = useState<string | null>(null);

  useEffect(() => {
    dispatch(loadSavedForms());
  }, [dispatch]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleFormSelect = (form: FormSchema) => {
    dispatch(setCurrentForm(form));
    dispatch(clearFormValues());
    dispatch(clearFormErrors());
    navigate(ROUTES.PREVIEW);
  };

  const handleDeleteForm = (formId: string) => {
    dispatch(deleteForm(formId));
    setDeleteDialog(null);
  };

  const handleNewForm = () => {
    dispatch(resetCurrentForm());
    navigate(ROUTES.CREATE);
  };

  const formToDelete = deleteDialog ? savedForms.find(f => f.id === deleteDialog) : null;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <GradientCard gradientType="primary" sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
              My Forms
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              View and manage your saved forms ({savedForms.length})
            </Typography>
          </Box>
          <Button
            variant="secondary"
            onClick={handleNewForm}
            startIcon={<FormIcon />}
          >
            Create New Form
          </Button>
        </Box>
      </GradientCard>

      {/* Forms Grid */}
      {savedForms.length === 0 ? (
        <GradientCard
          gradientType="neutral"
          sx={{ p: 4, textAlign: 'center' }}
        >
          <ListIcon sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No saved forms
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
            Create and save your first form to see it here
          </Typography>
          <Button variant="primary" onClick={handleNewForm}>
            Create Your First Form
          </Button>
        </GradientCard>
      ) : (
        <Grid container spacing={3}>
          {savedForms.map((form) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={form.id}>
              <Card
                elevation={2}
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onClick={() => handleFormSelect(form)}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    mb: 2 
                  }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 'bold',
                        color: 'primary.main',
                        wordBreak: 'break-word',
                        flexGrow: 1,
                        mr: 1,
                      }}
                    >
                      {form.name}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteDialog(form.id);
                      }}
                      color="error"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Chip
                      icon={<FormIcon />}
                      label={`${form.fields.length} field${form.fields.length !== 1 ? 's' : ''}`}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ mr: 1 }}
                    />
                    {form.fields.some(f => f.isDerived) && (
                      <Chip
                        label="Has derived fields"
                        size="small"
                        color="secondary"
                        variant="outlined"
                      />
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                    <DateIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2">
                      {formatDate(form.createdAt)}
                    </Typography>
                  </Box>

                  {/* Field Types Preview */}
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" color="text.secondary" gutterBottom>
                      Field types:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {[...new Set(form.fields.map(f => f.type))].map((type) => (
                        <Chip
                          key={type}
                          label={type}
                          size="small"
                          sx={{ fontSize: '0.7rem', height: 20 }}
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>

                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<PreviewIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFormSelect(form);
                    }}
                  >
                    Preview Form
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={Boolean(deleteDialog)}
        onClose={() => setDeleteDialog(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Delete Form</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the form "{formToDelete?.name}"? 
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={() => setDeleteDialog(null)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={() => handleDeleteForm(deleteDialog!)}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};