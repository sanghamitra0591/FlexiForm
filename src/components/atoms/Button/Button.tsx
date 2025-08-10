import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { THEME_COLORS } from '../../../constants';

export interface CustomButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outlined' | 'text';
  gradient?: boolean;
}

export const Button: React.FC<CustomButtonProps> = ({
  variant = 'primary',
  gradient = true,
  sx,
  ...props
}) => {
  const getButtonStyles = () => {
    const baseStyles = {
      borderRadius: 2,
      textTransform: 'none' as const,
      fontWeight: 600,
      boxShadow: 'none',
      '&:hover': {
        boxShadow: '0 4px 8px rgba(0,0,0,0.12)',
      },
    };

    if (!gradient) {
      return baseStyles;
    }

    switch (variant) {
      case 'primary':
        return {
          ...baseStyles,
          background: THEME_COLORS.primary,
          color: 'white',
          '&:hover': {
            ...baseStyles['&:hover'],
            background: THEME_COLORS.primary,
            opacity: 0.9,
          },
        };
      case 'secondary':
        return {
          ...baseStyles,
          background: THEME_COLORS.secondary,
          color: 'white',
          '&:hover': {
            ...baseStyles['&:hover'],
            background: THEME_COLORS.secondary,
            opacity: 0.9,
          },
        };
      case 'tertiary':
        return {
          ...baseStyles,
          background: THEME_COLORS.tertiary,
          color: 'white',
          '&:hover': {
            ...baseStyles['&:hover'],
            background: THEME_COLORS.tertiary,
            opacity: 0.9,
          },
        };
      default:
        return baseStyles;
    }
  };

  const muiVariant = ['outlined', 'text'].includes(variant) ? variant as 'outlined' | 'text' : 'contained';

  return (
    <MuiButton
      variant={muiVariant}
      sx={{
        ...getButtonStyles(),
        ...sx,
      }}
      {...props}
    />
  );
};