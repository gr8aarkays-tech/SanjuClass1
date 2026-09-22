import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeId = 'blue' | 'purple' | 'green' | 'rose' | 'amber' | 'dark';

export interface Theme {
  id: ThemeId;
  label: string;
  emoji: string;
  // CSS variable values
  '--color-bg': string;
  '--color-surface': string;
  '--color-border': string;
  '--color-text': string;
  '--color-text-muted': string;
  '--color-primary': string;
  '--color-primary-hover': string;
  '--color-primary-light': string;
  '--color-primary-text': string;
  '--color-sidebar-bg': string;
  '--color-sidebar-border': string;
  '--color-sidebar-active-bg': string;
  '--color-sidebar-active-text': string;
  '--color-card-bg': string;
  '--color-card-border': string;
  '--color-input-border': string;
  '--color-input-focus': string;
  '--color-header-bg': string;
}

export const THEMES: Theme[] = [
  {
    id: 'blue',
    label: 'Ocean Blue',
    emoji: '🔵',
    '--color-bg': '#f0f4ff',
    '--color-surface': '#e8eeff',
    '--color-border': '#c7d4f8',
    '--color-text': '#1e293b',
    '--color-text-muted': '#64748b',
    '--color-primary': '#2563eb',
    '--color-primary-hover': '#1d4ed8',
    '--color-primary-light': '#dbeafe',
    '--color-primary-text': '#1e40af',
    '--color-sidebar-bg': '#ffffff',
    '--color-sidebar-border': '#e2e8f0',
    '--color-sidebar-active-bg': '#eff6ff',
    '--color-sidebar-active-text': '#1d4ed8',
    '--color-card-bg': '#ffffff',
    '--color-card-border': '#e2e8f0',
    '--color-input-border': '#cbd5e1',
    '--color-input-focus': '#3b82f6',
    '--color-header-bg': '#ffffff',
  },
  {
    id: 'purple',
    label: 'Royal Purple',
    emoji: '🟣',
    '--color-bg': '#faf5ff',
    '--color-surface': '#f3e8ff',
    '--color-border': '#d8b4fe',
    '--color-text': '#1e1b4b',
    '--color-text-muted': '#6b7280',
    '--color-primary': '#7c3aed',
    '--color-primary-hover': '#6d28d9',
    '--color-primary-light': '#ede9fe',
    '--color-primary-text': '#5b21b6',
    '--color-sidebar-bg': '#ffffff',
    '--color-sidebar-border': '#e9d5ff',
    '--color-sidebar-active-bg': '#f5f3ff',
    '--color-sidebar-active-text': '#6d28d9',
    '--color-card-bg': '#ffffff',
    '--color-card-border': '#e9d5ff',
    '--color-input-border': '#d8b4fe',
    '--color-input-focus': '#8b5cf6',
    '--color-header-bg': '#ffffff',
  },
  {
    id: 'green',
    label: 'Forest Green',
    emoji: '🟢',
    '--color-bg': '#f0fdf4',
    '--color-surface': '#dcfce7',
    '--color-border': '#bbf7d0',
    '--color-text': '#14532d',
    '--color-text-muted': '#6b7280',
    '--color-primary': '#16a34a',
    '--color-primary-hover': '#15803d',
    '--color-primary-light': '#dcfce7',
    '--color-primary-text': '#166534',
    '--color-sidebar-bg': '#ffffff',
    '--color-sidebar-border': '#bbf7d0',
    '--color-sidebar-active-bg': '#f0fdf4',
    '--color-sidebar-active-text': '#15803d',
    '--color-card-bg': '#ffffff',
    '--color-card-border': '#d1fae5',
    '--color-input-border': '#a7f3d0',
    '--color-input-focus': '#22c55e',
    '--color-header-bg': '#ffffff',
  },
  {
    id: 'rose',
    label: 'Cherry Rose',
    emoji: '🌸',
    '--color-bg': '#fff1f2',
    '--color-surface': '#ffe4e6',
    '--color-border': '#fecdd3',
    '--color-text': '#4c0519',
    '--color-text-muted': '#6b7280',
    '--color-primary': '#e11d48',
    '--color-primary-hover': '#be123c',
    '--color-primary-light': '#ffe4e6',
    '--color-primary-text': '#9f1239',
    '--color-sidebar-bg': '#ffffff',
    '--color-sidebar-border': '#fecdd3',
    '--color-sidebar-active-bg': '#fff1f2',
    '--color-sidebar-active-text': '#be123c',
    '--color-card-bg': '#ffffff',
    '--color-card-border': '#fecdd3',
    '--color-input-border': '#fda4af',
    '--color-input-focus': '#f43f5e',
    '--color-header-bg': '#ffffff',
  },
  {
    id: 'amber',
    label: 'Sunny Amber',
    emoji: '🟡',
    '--color-bg': '#fffbeb',
    '--color-surface': '#fef3c7',
    '--color-border': '#fde68a',
    '--color-text': '#451a03',
    '--color-text-muted': '#78716c',
    '--color-primary': '#d97706',
    '--color-primary-hover': '#b45309',
    '--color-primary-light': '#fef3c7',
    '--color-primary-text': '#92400e',
    '--color-sidebar-bg': '#ffffff',
    '--color-sidebar-border': '#fde68a',
    '--color-sidebar-active-bg': '#fffbeb',
    '--color-sidebar-active-text': '#b45309',
    '--color-card-bg': '#ffffff',
    '--color-card-border': '#fde68a',
    '--color-input-border': '#fcd34d',
    '--color-input-focus': '#f59e0b',
    '--color-header-bg': '#ffffff',
  },
  {
    id: 'dark',
    label: 'Dark Mode',
    emoji: '🌙',
    '--color-bg': '#0f172a',
    '--color-surface': '#1e293b',
    '--color-border': '#334155',
    '--color-text': '#f1f5f9',
    '--color-text-muted': '#94a3b8',
    '--color-primary': '#3b82f6',
    '--color-primary-hover': '#2563eb',
    '--color-primary-light': '#1e3a5f',
    '--color-primary-text': '#93c5fd',
    '--color-sidebar-bg': '#1e293b',
    '--color-sidebar-border': '#334155',
    '--color-sidebar-active-bg': '#1e3a5f',
    '--color-sidebar-active-text': '#93c5fd',
    '--color-card-bg': '#1e293b',
    '--color-card-border': '#334155',
    '--color-input-border': '#475569',
    '--color-input-focus': '#3b82f6',
    '--color-header-bg': '#1e293b',
  },
];

interface ThemeContextValue {
  theme: Theme;
  themeId: ThemeId;
  setTheme: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
const THEME_KEY = 'sanju_theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>(() => {
    return (localStorage.getItem(THEME_KEY) as ThemeId) || 'blue';
  });

  const theme = THEMES.find(t => t.id === themeId) || THEMES[0];

  // Apply CSS variables to :root whenever theme changes
  useEffect(() => {
    const root = document.documentElement;
    const vars: (keyof Omit<Theme, 'id' | 'label' | 'emoji'>)[] = [
      '--color-bg', '--color-surface', '--color-border', '--color-text',
      '--color-text-muted', '--color-primary', '--color-primary-hover',
      '--color-primary-light', '--color-primary-text', '--color-sidebar-bg',
      '--color-sidebar-border', '--color-sidebar-active-bg', '--color-sidebar-active-text',
      '--color-card-bg', '--color-card-border', '--color-input-border',
      '--color-input-focus', '--color-header-bg',
    ];
    vars.forEach(v => root.style.setProperty(v, theme[v]));
    // Toggle dark class for any tailwind dark: utilities
    root.classList.toggle('dark', themeId === 'dark');
  }, [theme, themeId]);

  const setTheme = (id: ThemeId) => {
    setThemeId(id);
    localStorage.setItem(THEME_KEY, id);
  };

  return (
    <ThemeContext.Provider value={{ theme, themeId, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
