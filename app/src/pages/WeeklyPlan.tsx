import React, { useState } from 'react';
import { Calendar, CheckCircle, Clock, AlertTriangle, BookOpen, Filter } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { StatusBadge, SectionHeader } from '../components/shared/UI';
import type { StudyStatus } from '../types';
import { STUDY_STATUS_LABELS } from '../types';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const SUBJECTS = ['All', 'Mathematics', 'English', 'EVS', 'Science', 'Social Studies', 'Hindi'];
const STATUSES: StudyStatus[] = ['not_started', 'in_progress', 'needs_revision', 'completed'];

export function WeeklyPlan() {
  const { selectedChild, getChildWeeklyLessons, weeklyLessons } = useApp();
  const [filterSubject, setFilterSubject] = useState('All');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [localStatuses, setLocalStatuses] = useState<Record<string, StudyStatus>>({});

  if (!selectedChild) return <div className="card text-center py-10 text-gray-500">Please select a child first.</div>;

  const lessons = getChildWeeklyLessons(selectedChild.id);

  const filtered = lessons.filter(l => {
    if (filterSubject !== 'All' && l.subject !== filterSubject) return false;
    const status = localStatuses[l.id] || l.status;
    if (filterStatus !== 'all' && status !== filterStatus) return false;
    return true;
  });

  const grouped = DAYS.reduce((acc, day) => {
    acc[day] = filtered.filter(l => l.day === day);
    return acc;
  }, {} as Record<string, typeof lessons>);

  const setStatus = (id: string, status: StudyStatus) => {
    setLocalStatuses(s => ({ ...s, [id]: status }));
  };

  const statusCounts = STATUSES.reduce((acc, s) => {
    acc[s] = lessons.filter(l => (localStatuses[l.id] || l.status) === s).length;
    return acc;
  }, {} as Record<StudyStatus, number>);

  const statusIcon = (s: StudyStatus) => {
    if (s === 'completed') return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (s === 'in_progress') return <Clock className="w-4 h-4 text-blue-500" />;
    if (s === 'needs_revision') return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    return <BookOpen className="w-4 h-4 text-gray-400" />;
  };

  const subjectColors: Record<string, string> = {
    Mathematics: 'bg-blue-500',
    English: 'bg-green-500',
    EVS: 'bg-emerald-500',
    Science: 'bg-purple-500',
    'Social Studies': 'bg-orange-500',
    Hindi: 'bg-red-500',
  };

  return (
    <div className="space-y-6">
      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {STATUSES.map(s => (
          <div key={s} className="card flex items-center gap-3">
            {statusIcon(s)}
            <div>
              <p className="text-lg font-bold text-gray-900">{statusCounts[s]}</p>
              <p className="text-xs text-gray-500">{STUDY_STATUS_LABELS[s]}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-600">Filter:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {SUBJECTS.map(sub => (
              <button
                key={sub}
                onClick={() => setFilterSubject(sub)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${filterSubject === sub ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {sub}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setFilterStatus('all')} className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${filterStatus === 'all' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>All</button>
            {STATUSES.map(s => (
              <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${filterStatus === s ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {STUDY_STATUS_LABELS[s]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly calendar */}
      <div className="space-y-4">
        {DAYS.map(day => {
          const dayLessons = grouped[day] || [];
          if (dayLessons.length === 0) return null;
          return (
            <div key={day} className="card">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                <h3 className="font-semibold text-gray-900">{day}</h3>
                {dayLessons.some(l => l.homeworkDue) && (
                  <span className="badge bg-orange-100 text-orange-700 text-xs ml-auto">📝 Homework Due</span>
                )}
              </div>
              <div className="space-y-2">
                {dayLessons.map(lesson => {
                  const currentStatus = localStatuses[lesson.id] || lesson.status;
                  return (
                    <div key={lesson.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      currentStatus === 'completed' ? 'bg-green-50 border-green-200' :
                      currentStatus === 'needs_revision' ? 'bg-yellow-50 border-yellow-200' :
                      currentStatus === 'in_progress' ? 'bg-blue-50 border-blue-200' :
                      'bg-gray-50 border-gray-200'
                    }`}>
                      <div className={`w-3 h-8 rounded-full flex-shrink-0 ${subjectColors[lesson.subject] || 'bg-gray-400'}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{lesson.topic}</p>
                        <p className="text-xs text-gray-500">{lesson.subject} · {lesson.chapter}</p>
                        {lesson.homeworkDue && <p className="text-xs text-orange-600 font-medium">📝 Homework due</p>}
                      </div>
                      <select
                        className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white flex-shrink-0"
                        value={currentStatus}
                        onChange={e => setStatus(lesson.id, e.target.value as StudyStatus)}
                      >
                        {STATUSES.map(s => <option key={s} value={s}>{STUDY_STATUS_LABELS[s]}</option>)}
                      </select>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="card text-center py-8 text-gray-400">
            <Calendar className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p>No lessons match the selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
