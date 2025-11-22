import { createSlice } from '@reduxjs/toolkit';

export type Theme = 'dark' | 'light';

interface ThemeState {
  mode: Theme;
}

const initialState: ThemeState = {
  mode: 'dark',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;

// Theme Colors - Based on screenshot with teal/cyan accent
export const colors = {
  dark: {
    background: '#0d1b2a',
    backgroundGradient: ['#0a1628', '#0d1b2a', '#1a2332'],
    surface: '#1b263b',
    card: '#1e2a3a',
    primary: '#4dd0e1',
    primaryDark: '#26c6da',
    secondary: '#80deea',
    accent: '#00acc1',
    text: '#ffffff',
    textSecondary: '#b0bec5',
    textTertiary: '#78909c',
    border: '#263238',
    error: '#ef5350',
    warning: '#ffa726',
    success: '#66bb6a',
    rating: '#ffd700',
    overlay: 'rgba(0, 0, 0, 0.7)',
  },
  light: {
    background: '#f5f7fa',
    backgroundGradient: ['#e8f4f8', '#f5f7fa', '#e0f2f7'],
    surface: '#ffffff',
    card: '#ffffff',
    primary: '#00acc1',
    primaryDark: '#00838f',
    secondary: '#4dd0e1',
    accent: '#26c6da',
    text: '#1a1a1a',
    textSecondary: '#546e7a',
    textTertiary: '#78909c',
    border: '#e0e0e0',
    error: '#d32f2f',
    warning: '#f57c00',
    success: '#388e3c',
    rating: '#ffa000',
    overlay: 'rgba(255, 255, 255, 0.9)',
  },
};
