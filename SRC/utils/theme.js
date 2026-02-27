// ──────────────────────────────────────
// DARK Theme (default)
// ──────────────────────────────────────
export const DarkColors = {
  background: '#0D0D0D',
  surface: '#1A1A2E',
  surfaceLight: '#222240',
  card: '#16213E',
  accent: '#E8A020',
  accentLight: '#F5C355',
  accentDark: '#B87A10',
  textPrimary: '#F0F0F0',
  textSecondary: '#9A9AB0',
  textMuted: '#555570',
  border: '#2A2A4A',
  danger: '#E05050',
  success: '#50C878',
  white: '#FFFFFF',
  statusBar: 'light-content',
  isDark: true,
};

// ──────────────────────────────────────
// LIGHT Theme
// ──────────────────────────────────────
export const LightColors = {
  background: '#F0F2F5',
  surface: '#FFFFFF',
  surfaceLight: '#F8F9FB',
  card: '#FFFFFF',
  accent: '#C07010',      // darker gold for contrast on white
  accentLight: '#E8A020',
  accentDark: '#8B5A00',
  textPrimary: '#1A1A2E',
  textSecondary: '#4A4A6A',
  textMuted: '#9A9AB0',
  border: '#E0E2F0',
  danger: '#D03030',
  success: '#2A9A50',
  white: '#FFFFFF',
  statusBar: 'dark-content',
  isDark: false,
};

// ──────────────────────────────────────
// Category Colors (work on both themes)
// ──────────────────────────────────────
export const CategoryColorsDark = {
  Whisky: { bg: '#2D1B00', text: '#F5A623', border: '#8B5E00' },
  Beer:   { bg: '#1A2A00', text: '#A3D900', border: '#5A8000' },
  Rum:    { bg: '#2A0A1A', text: '#F07080', border: '#8B2040' },
  Vodka:  { bg: '#001A2A', text: '#60BFFF', border: '#005A8B' },
  Wine:   { bg: '#250010', text: '#D070C0', border: '#700040' },
  Gin:    { bg: '#0D2A1A', text: '#50E0A0', border: '#207050' },
  CL:     { bg: '#1A1A00', text: '#E0E050', border: '#707000' },
  Brandy: { bg: '#2A1200', text: '#E08040', border: '#803000' },
  LAB:    { bg: '#0A1A2A', text: '#80A0E0', border: '#304060' },
  Other:  { bg: '#1A1A1A', text: '#909090', border: '#404040' },
};

export const CategoryColorsLight = {
  Whisky: { bg: '#FFF3E0', text: '#8B5A00', border: '#FFB74D' },
  Beer:   { bg: '#F1F8E9', text: '#33691E', border: '#8BC34A' },
  Rum:    { bg: '#FCE4EC', text: '#880E4F', border: '#F48FB1' },
  Vodka:  { bg: '#E3F2FD', text: '#0D47A1', border: '#90CAF9' },
  Wine:   { bg: '#F3E5F5', text: '#4A148C', border: '#CE93D8' },
  Gin:    { bg: '#E8F5E9', text: '#1B5E20', border: '#A5D6A7' },
  CL:     { bg: '#FFFFF0', text: '#827717', border: '#C8C840' },
  Brandy: { bg: '#FBE9E7', text: '#8B3A00', border: '#FFAB91' },
  LAB:    { bg: '#E8EAF6', text: '#1A237E', border: '#9FA8DA' },
  Other:  { bg: '#F5F5F5', text: '#424242', border: '#BDBDBD' },
};

export const getCategoryColor = (category, isDark = true) => {
  const palette = isDark ? CategoryColorsDark : CategoryColorsLight;
  return palette[category] || (isDark ? CategoryColorsDark.Other : CategoryColorsLight.Other);
};

// ──────────────────────────────────────
// Spacing, Font, Radius (shared)
// ──────────────────────────────────────
export const Spacing = {
  xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32,
};

export const FontSize = {
  xs: 10, sm: 12, md: 14, lg: 16, xl: 18, xxl: 22, xxxl: 28,
};

export const BorderRadius = {
  sm: 6, md: 10, lg: 14, xl: 20, round: 999,
};

// Default export for backward compat (Dark)
export const Colors = DarkColors;
