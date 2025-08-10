import React from 'react';
import { Paper, PaperProps } from '@mui/material';
import { THEME_COLORS } from '../../../constants';

export interface GradientCardProps extends PaperProps {
  gradientType?: 'primary' | 'secondary' | 'tertiary' | 'neutral';
  textColor?: string;
}

export const GradientCard: React.FC<GradientCardProps> = ({
  gradientType = 'primary',
  textColor = 'white',
  sx,
  children,
  ...props
}) => {
  const getGradient = () => {
    switch (gradientType) {
      case 'primary':
        return THEME_COLORS.primary;
      case 'secondary':
        return THEME_COLORS.secondary;
      case 'tertiary':
        return THEME_COLORS.tertiary;
      case 'neutral':
        return THEME_COLORS.neutral;
      default:
        return THEME_COLORS.primary;
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        background: getGradient(),
        color: gradientType === 'neutral' ? '#333' : textColor,
        borderRadius: 2,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
};