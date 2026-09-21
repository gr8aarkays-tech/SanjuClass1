import React, { useState } from 'react';
import { Settings as SettingsIcon, Key, Server, Shield, Bell, Palette } from 'lucide-react';

export function Settings() {
  const [aiProvider, setAiProvider] = useState('mock');
  const [apiKey, setApiKey] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* AI Provider */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Server className="w-5 h-5 text-blue-600" />
          <h2 className="font-semibold text-gray-900">AI Provider Configuration</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="label">AI Provider</label>
            <select className="select" value={aiProvider} onChange={e => setAiProvider(e.target.value)}>
              <option value="mock">Mock (Local Development)</option>
              <option value="openai">OpenAI (GPT-4)</option>
              <option value="watsonx">IBM watsonx.ai</option>
              <option value="anthropic">Anthropic (Claude)</option>
            </select>
            {aiProvider === 'mock' && (
              <p className="text-xs text-green-600 mt-1">✓ Using mock AI responses. No API key required.</p>
            )}
          </div>
          {aiProvider !== 'mock' && (
            <div>
              <label className="label">API Key</label>
              <div className="relative">
                <Key className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  className="input pl-9"
                  placeholder="Enter your API key"
                  value={apiKey}
                  onChange={e => setApiKey(e.target.value)}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">API keys are stored only in browser memory and never sent to our servers.</p>
            </div>
          )}
        </div>
      </div>

      {/* Privacy */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-blue-600" />
          <h2 className="font-semibold text-gray-900">Privacy & Security</h2>
        </div>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>All uploaded documents are stored securely and are only accessible by you.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>Your child's data is never shared with third parties.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>AI processing is performed by your selected AI provider. Review their privacy policy before use.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-yellow-500 mt-0.5">⚠</span>
            <span>When using AI providers, document content is sent to their APIs for processing. Use <strong>Mock</strong> mode for sensitive documents.</span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-blue-600" />
          <h2 className="font-semibold text-gray-900">Notifications</h2>
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" checked={notifications} onChange={e => setNotifications(e.target.checked)} />
          <span className="text-sm text-gray-700">Enable exam reminder notifications</span>
        </label>
      </div>

      {/* About */}
      <div className="card">
        <div className="flex items-center gap-2 mb-3">
          <SettingsIcon className="w-5 h-5 text-blue-600" />
          <h2 className="font-semibold text-gray-900">About</h2>
        </div>
        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>AI School Learning Assistant</strong> v1.0</p>
          <p>An AI-powered companion that helps parents organize school learning materials and support their child's education.</p>
          <p className="text-xs text-gray-400 mt-2">Phase 1 MVP · Built with React + TypeScript + Tailwind CSS</p>
        </div>
      </div>

      <button onClick={handleSave} className="btn-primary w-full flex items-center justify-center gap-2">
        {saved ? '✓ Saved!' : 'Save Settings'}
      </button>
    </div>
  );
}
