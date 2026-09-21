import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Loader, MessageCircle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { chatWithAssistant } from '../services/aiService';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  time: string;
}

const SUGGESTIONS = [
  'What should my child study today?',
  'Summarize the monthly exam syllabus.',
  'Create a 5-day revision plan.',
  'My child struggles with fractions. Give practice exercises.',
  'What topics are pending for the next exam?',
];

export function AIAssistant() {
  const { selectedChild } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      text: `Hello! I'm your AI learning assistant${selectedChild ? ` for ${selectedChild.name}` : ''}. I can help you understand what to study, generate practice questions, explain concepts, or create a revision plan. What would you like help with today?`,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput('');

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: msg, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) };
    setMessages(m => [...m, userMsg]);
    setLoading(true);

    try {
      const response = await chatWithAssistant(msg, selectedChild?.name || 'your child');
      const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', text: response, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) };
      setMessages(m => [...m, assistantMsg]);
    } finally {
      setLoading(false);
    }
  };

  if (!selectedChild) return <div className="card text-center py-10 text-gray-500">Please select a child first.</div>;

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)]">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'assistant' ? 'bg-blue-100' : 'bg-gray-100'}`}>
              {msg.role === 'assistant' ? <Bot className="w-4 h-4 text-blue-600" /> : <User className="w-4 h-4 text-gray-600" />}
            </div>
            <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
              <div className={`p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${msg.role === 'assistant' ? 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm' : 'bg-blue-600 text-white rounded-tr-sm'}`}>
                {msg.text}
              </div>
              <span className="text-xs text-gray-400">{msg.time}</span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Bot className="w-4 h-4 text-blue-600" />
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm p-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {SUGGESTIONS.map(s => (
            <button key={s} onClick={() => handleSend(s)} className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors">
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2 border-t border-gray-200 pt-3">
        <input
          type="text"
          className="input flex-1"
          placeholder="Ask anything about your child's studies…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
          disabled={loading}
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          className="btn-primary px-3 flex-shrink-0"
        >
          {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
