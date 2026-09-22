import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { useTheme, THEMES, type ThemeId } from '../../contexts/ThemeContext';

export function ThemePicker() {
  const { themeId, setTheme, theme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        title="Change theme"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all hover:opacity-80"
        style={{
          backgroundColor: 'var(--color-primary-light)',
          color: 'var(--color-primary-text)',
        }}
      >
        <Palette className="w-4 h-4" />
        <span className="hidden sm:inline">{theme.emoji} {theme.label}</span>
        <span className="sm:hidden">{theme.emoji}</span>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-52 rounded-xl shadow-xl border z-50 overflow-hidden"
          style={{
            backgroundColor: 'var(--color-card-bg)',
            borderColor: 'var(--color-card-border)',
          }}
        >
          <div className="p-2">
            <p className="text-xs font-semibold px-2 py-1 mb-1"
              style={{ color: 'var(--color-text-muted)' }}>
              Choose Theme
            </p>
            {THEMES.map(t => (
              <button
                key={t.id}
                onClick={() => { setTheme(t.id); setOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-80"
                style={{
                  backgroundColor: themeId === t.id ? 'var(--color-primary-light)' : 'transparent',
                  color: 'var(--color-text)',
                }}
              >
                {/* Color swatch */}
                <span
                  className="w-5 h-5 rounded-full flex-shrink-0 border-2"
                  style={{
                    backgroundColor: t['--color-primary'],
                    borderColor: themeId === t.id ? t['--color-primary'] : 'transparent',
                  }}
                />
                <span className="flex-1 text-left">{t.label}</span>
                {themeId === t.id && (
                  <Check className="w-3.5 h-3.5 flex-shrink-0"
                    style={{ color: 'var(--color-primary)' }} />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
