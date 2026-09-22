import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, Eye, EyeOff, Loader, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    setError('');
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Login failed.');
    }
  };

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to your account">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}
        <div>
          <label className="auth-label">Email address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="email"
              className="auth-input pl-9"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
            />
          </div>
        </div>
        <div>
          <label className="auth-label">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              className="auth-input pl-9 pr-10"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="auth-btn w-full flex items-center justify-center gap-2"
        >
          {loading ? <><Loader className="w-4 h-4 animate-spin" /> Signing in…</> : 'Sign In'}
        </button>
      </form>

      {/* Demo hint */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700">
        <strong>New here?</strong> Register below to create an account. All data is saved in your browser.
      </div>

      <p className="text-center text-sm text-gray-500 mt-4">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-600 font-medium hover:underline">Register</Link>
      </p>
    </AuthShell>
  );
}

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirm) { setError('Please fill in all fields.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    setLoading(true);
    setError('');
    const result = await register(name, email, password);
    setLoading(false);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Registration failed.');
    }
  };

  return (
    <AuthShell title="Create your account" subtitle="Start managing your child's learning today">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}
        <div>
          <label className="auth-label">Your name</label>
          <input
            type="text"
            className="auth-input"
            placeholder="e.g. Rajesh Kumar"
            value={name}
            onChange={e => setName(e.target.value)}
            autoComplete="name"
            autoFocus
          />
        </div>
        <div>
          <label className="auth-label">Email address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="email"
              className="auth-input pl-9"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
        </div>
        <div>
          <label className="auth-label">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              className="auth-input pl-9 pr-10"
              placeholder="At least 6 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div>
          <label className="auth-label">Confirm password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              className="auth-input pl-9"
              placeholder="Repeat your password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              autoComplete="new-password"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="auth-btn w-full flex items-center justify-center gap-2"
        >
          {loading ? <><Loader className="w-4 h-4 animate-spin" /> Creating account…</> : 'Create Account'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 font-medium hover:underline">Sign in</Link>
      </p>
    </AuthShell>
  );
}

// ─── Shared auth shell ────────────────────────────────────────────────────────

function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
            style={{ backgroundColor: 'var(--color-primary)' }}>
            <GraduationCap className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{title}</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>{subtitle}</p>
          <p className="text-xs font-semibold mt-1" style={{ color: 'var(--color-primary)' }}>
            AI School Learning Assistant
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl shadow-xl border p-6"
          style={{ backgroundColor: 'var(--color-card-bg)', borderColor: 'var(--color-card-border)' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
