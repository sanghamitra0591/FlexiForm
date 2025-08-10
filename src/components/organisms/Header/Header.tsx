import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Tab,
  Tabs,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Create as CreateIcon, 
  Preview as PreviewIcon, 
  List as ListIcon 
} from '@mui/icons-material';
import { ROUTES } from '../../../constants';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentTab = () => {
    switch (location.pathname) {
      case ROUTES.CREATE:
        return 0;
      case ROUTES.PREVIEW:
        return 1;
      case ROUTES.MY_FORMS:
        return 2;
      default:
        return 0;
    }
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    const routes = [ROUTES.CREATE, ROUTES.PREVIEW, ROUTES.MY_FORMS];
    navigate(routes[newValue]);
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar>
        <Typography 
          variant="h5" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #FFF 30%, #E3F2FD 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Flexi Form
        </Typography>
        
        <Box>
          <Tabs 
            value={getCurrentTab()} 
            onChange={handleTabChange}
            textColor="inherit"
            sx={{
              '& .MuiTab-root': {
                color: 'rgba(255,255,255,0.8)',
                fontWeight: 600,
                minWidth: 120,
                '&.Mui-selected': {
                  color: 'white',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'white',
                height: 3,
                borderRadius: '3px 3px 0 0',
              },
            }}
          >
            <Tab 
              icon={<CreateIcon />} 
              label="Create" 
              iconPosition="start"
            />
            <Tab 
              icon={<PreviewIcon />} 
              label="Preview" 
              iconPosition="start"
            />
            <Tab 
              icon={<ListIcon />} 
              label="My Forms" 
              iconPosition="start"
            />
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};