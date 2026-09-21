import React from 'react';
import { type StudyStatus, STUDY_STATUS_LABELS, STUDY_STATUS_COLORS } from '../../types';

interface StatusBadgeProps {
  status: StudyStatus;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const cls = STUDY_STATUS_COLORS[status];
  const label = STUDY_STATUS_LABELS[status];
  return (
    <span className={`${cls} ${size === 'sm' ? 'text-xs px-2 py-0.5' : ''} badge`}>
      {label}
    </span>
  );
}

interface ProgressBarProps {
  value: number;
  color?: string;
  size?: 'sm' | 'md';
  showLabel?: boolean;
}

export function ProgressBar({ value, color = 'bg-blue-500', size = 'md', showLabel = false }: ProgressBarProps) {
  const h = size === 'sm' ? 'h-1.5' : 'h-2.5';
  return (
    <div className="flex items-center gap-2">
      <div className={`flex-1 bg-gray-200 rounded-full ${h} overflow-hidden`}>
        <div
          className={`${h} ${color} rounded-full transition-all duration-500`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {showLabel && <span className="text-xs text-gray-600 w-8 text-right">{value}%</span>}
    </div>
  );
}

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export function LoadingSpinner({ size = 'md', text }: LoadingSpinnerProps) {
  const sz = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-10 h-10' : 'w-6 h-6';
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${sz} border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin`} />
      {text && <p className="text-sm text-gray-500">{text}</p>}
    </div>
  );
}

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-gray-300 mb-4">{icon}</div>
      <h3 className="text-base font-semibold text-gray-700 mb-1">{title}</h3>
      {description && <p className="text-sm text-gray-500 max-w-sm mb-4">{description}</p>}
      {action}
    </div>
  );
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export function Modal({ open, onClose, title, children, maxWidth = 'max-w-lg' }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className={`relative bg-white rounded-2xl shadow-xl w-full ${maxWidth} max-h-[90vh] overflow-y-auto`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

export function Divider({ label }: { label?: string }) {
  if (!label) return <hr className="border-gray-100 my-4" />;
  return (
    <div className="flex items-center gap-3 my-4">
      <hr className="flex-1 border-gray-200" />
      <span className="text-xs text-gray-400 font-medium">{label}</span>
      <hr className="flex-1 border-gray-200" />
    </div>
  );
}

export function SectionHeader({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="section-title mb-0">{title}</h2>
      {action}
    </div>
  );
}
