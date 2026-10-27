export const theme = {
  colors: {
    // Primary / Brand
    primary: '#3D52D5',
    primaryLight: '#EFF6FF',
    
    // Status - Verified
    verifiedBg: '#F0FDF4',
    verifiedBorder: '#85F467',
    verifiedText: '#010B4F',

    // Status - Not Verified / Pending
    notVerifiedBg: '#FFFBEB',
    notVerifiedBorder: '#92400E',
    notVerifiedText: '#92400E',

    // Status - Invalid / Danger
    invalidBg: '#FEF2F2',
    invalidBorder: '#B91C1C',
    invalidText: '#B91C1C',

    // Neutrals
    white: '#FFFFFF',
    surface: '#F3F3F3',
    border: '#E1E1E1',
    borderAlt: '#E3E3E3',
    
    // Text colors
    textPrimary: '#0A0A0A',
    textForeground: '#161616',
    textSecondary: '#666666',
    textLabel: '#777777',
    textTertiary: '#A3A3A3',
  },
  typography: {
    fontFamily: 'System', // Falls back to system sans-serif (or Geist if configured)
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 24,
      xxl: 32,
    },
    lineHeights: {
      xs: 16.8,
      sm: 19.6,
      md: 22.4,
      lg: 28,
      xl: 33.6,
      xxl: 44.8,
    },
    weights: {
      regular: '400' as const,
      medium: '500' as const,
      semiBold: '600' as const,
      bold: '700' as const,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    base: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
    xxxl: 64,
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    full: 9999,
  },
  shadows: {
    fab: {
      shadowColor: '#161616',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    },
  },
};
