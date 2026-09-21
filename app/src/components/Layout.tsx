import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import {
  LayoutDashboard,
  Upload,
  Calendar,
  BookOpen,
  FileQuestion,
  Dumbbell,
  Library,
  Users,
  Settings,
  GraduationCap,
  Menu,
  X,
  ChevronDown,
  Bot,
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/upload', label: 'Upload Materials', icon: Upload },
  { to: '/weekly-plan', label: 'Weekly Plan', icon: Calendar },
  { to: '/exam-prep', label: 'Exam Preparation', icon: GraduationCap },
  { to: '/study-guide', label: 'Study Guide', icon: BookOpen },
  { to: '/question-generator', label: 'Question Generator', icon: FileQuestion },
  { to: '/practice', label: 'Practice Mode', icon: Dumbbell },
  { to: '/library', label: 'Question Library', icon: Library },
  { to: '/children', label: 'Children', icon: Users },
  { to: '/assistant', label: 'AI Assistant', icon: Bot },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { selectedChild, children: childList, selectChild } = useApp();
  const [childDropdownOpen, setChildDropdownOpen] = useState(false);
  const location = useLocation();

  const currentPage = navItems.find(n => n.to === location.pathname)?.label || 'Dashboard';

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-gray-900 leading-tight">School AI</p>
            <p className="text-xs text-gray-500 truncate">Learning Assistant</p>
          </div>
          <button className="ml-auto lg:hidden text-gray-400 hover:text-gray-600" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Child selector */}
        <div className="px-3 py-3 border-b border-gray-100">
          <div className="relative">
            <button
              onClick={() => setChildDropdownOpen(!childDropdownOpen)}
              className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-left"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-blue-700">
                  {selectedChild?.name.charAt(0) || '?'}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {selectedChild?.name || 'Select Child'}
                </p>
                <p className="text-xs text-gray-500">Class {selectedChild?.class}</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${childDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {childDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {childList.map((child: { id: string; name: string; class: string }) => (
                  <button
                    key={child.id}
                    onClick={() => { selectChild(child as any); setChildDropdownOpen(false); }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${selectedChild?.id === child.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}`}
                  >
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-700">
                      {child.name.charAt(0)}
                    </span>
                    <span>{child.name}</span>
                    <span className="ml-auto text-xs text-gray-400">Cl. {child.class}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-gray-100">
          <p className="text-xs text-gray-400 text-center">AI School Learning Assistant v1.0</p>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-30">
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-base font-semibold text-gray-900">{currentPage}</h1>
          <div className="ml-auto flex items-center gap-2">
            {selectedChild && (
              <span className="hidden sm:flex items-center gap-1.5 text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium">
                <span className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                  {selectedChild.name.charAt(0)}
                </span>
                {selectedChild.name} · Class {selectedChild.class}
              </span>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
