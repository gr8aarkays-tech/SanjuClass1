import React from 'react';
import { Link } from 'react-router-dom';
import {
  Upload, Calendar, GraduationCap, BookOpen,
  FileQuestion, AlertTriangle, CheckCircle,
  Clock, TrendingUp, FileText, Zap,
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { StatusBadge, ProgressBar, SectionHeader } from '../components/shared/UI';
import { MATERIAL_TYPE_LABELS, EXAM_TYPE_LABELS } from '../types';

export function Dashboard() {
  const { selectedChild, getChildExams, getChildMaterials, getChildSubjects, getSubjectChapters, getChapterTopics, getChildQuestionPapers } = useApp();

  if (!selectedChild) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <GraduationCap className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">No child selected</h2>
        <p className="text-gray-500 mb-4">Add a child to get started</p>
        <Link to="/children" className="btn-primary">Manage Children</Link>
      </div>
    );
  }

  const exams = getChildExams(selectedChild.id);
  const materials = getChildMaterials(selectedChild.id);
  const subjects = getChildSubjects(selectedChild.id);
  const questionPapers = getChildQuestionPapers(selectedChild.id);

  // Compute stats
  const upcomingExam = exams.find(e => e.preparationStatus !== 'completed');
  const pendingMaterials = materials.filter(m => m.processingStatus === 'requires_review').length;
  const recentMaterials = materials.slice(0, 3);

  // Topics needing attention
  const attentionTopics: { topic: string; subject: string; chapter: string }[] = [];
  subjects.forEach(sub => {
    getSubjectChapters(sub.id).forEach(ch => {
      getChapterTopics(ch.id).filter(t => t.studyStatus === 'needs_revision' || t.studyStatus === 'not_started').forEach(t => {
        attentionTopics.push({ topic: t.name, subject: sub.name, chapter: ch.name });
      });
    });
  });

  // Subject progress
  const subjectProgress = subjects.map(sub => {
    const chs = getSubjectChapters(sub.id);
    const allTopics = chs.flatMap(c => getChapterTopics(c.id));
    const done = allTopics.filter(t => t.studyStatus === 'completed').length;
    const pct = allTopics.length ? Math.round((done / allTopics.length) * 100) : 0;
    return { subject: sub, progress: pct, total: allTopics.length, done };
  });

  const daysToExam = upcomingExam
    ? Math.max(0, Math.ceil((new Date(upcomingExam.startDate).getTime() - Date.now()) / 86400000))
    : null;

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-5 text-white">
        <p className="text-blue-100 text-sm mb-1">Welcome back!</p>
        <h2 className="text-xl font-bold mb-1">{selectedChild.name}'s Learning Dashboard</h2>
        <p className="text-blue-100 text-sm">Class {selectedChild.class} · {selectedChild.school}</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <QuickStat icon={<GraduationCap className="w-5 h-5" />} label="Upcoming Exam" value={upcomingExam ? upcomingExam.name.split('–')[0].trim() : 'None'} sub={daysToExam !== null ? `${daysToExam} days away` : ''} color="blue" />
        <QuickStat icon={<AlertTriangle className="w-5 h-5" />} label="Needs Review" value={pendingMaterials.toString()} sub="uploaded materials" color="yellow" />
        <QuickStat icon={<FileText className="w-5 h-5" />} label="Question Papers" value={questionPapers.length.toString()} sub="generated" color="purple" />
        <QuickStat icon={<Zap className="w-5 h-5" />} label="Topics Pending" value={attentionTopics.filter(t => t.topic).length.toString()} sub="need attention" color="red" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Upcoming exam */}
        {upcomingExam && (
          <div className="card">
            <SectionHeader
              title="Upcoming Exam"
              action={<Link to="/exam-prep" className="text-xs text-blue-600 hover:underline">View all</Link>}
            />
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100">
              <GraduationCap className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm">{upcomingExam.name}</p>
                <p className="text-xs text-gray-500 mb-2">{EXAM_TYPE_LABELS[upcomingExam.examType]} · {new Date(upcomingExam.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                <div className="flex flex-wrap gap-1">
                  {upcomingExam.subjects.map(s => (
                    <span key={s.subjectId} className="badge-blue text-xs">{s.subjectName}</span>
                  ))}
                </div>
              </div>
            </div>
            {daysToExam !== null && daysToExam <= 10 && (
              <div className="mt-3 p-2.5 bg-red-50 rounded-lg border border-red-100">
                <p className="text-xs text-red-700 font-medium">⏰ Only {daysToExam} days left! Start preparing now.</p>
              </div>
            )}
          </div>
        )}

        {/* Subject progress */}
        <div className="card">
          <SectionHeader
            title="Study Progress"
            action={<Link to="/study-guide" className="text-xs text-blue-600 hover:underline">Study Guide</Link>}
          />
          <div className="space-y-3">
            {subjectProgress.length === 0 ? (
              <p className="text-sm text-gray-400">No subjects added yet</p>
            ) : (
              subjectProgress.map(({ subject, progress, total, done }) => (
                <div key={subject.id}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{subject.name}</span>
                    <span className="text-xs text-gray-500">{done}/{total} topics</span>
                  </div>
                  <ProgressBar value={progress} showLabel color="bg-blue-500" size="sm" />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Topics needing attention */}
        <div className="card">
          <SectionHeader
            title="Topics Needing Attention"
            action={<Link to="/study-guide" className="text-xs text-blue-600 hover:underline">Study Guide</Link>}
          />
          {attentionTopics.length === 0 ? (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm">All topics are on track!</span>
            </div>
          ) : (
            <div className="space-y-2">
              {attentionTopics.slice(0, 5).map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg border border-yellow-100">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.topic}</p>
                    <p className="text-xs text-gray-500">{item.subject} · {item.chapter}</p>
                  </div>
                </div>
              ))}
              {attentionTopics.length > 5 && (
                <p className="text-xs text-gray-400 text-center">+{attentionTopics.length - 5} more topics</p>
              )}
            </div>
          )}
        </div>

        {/* Recent uploads */}
        <div className="card">
          <SectionHeader
            title="Recent Uploads"
            action={<Link to="/upload" className="text-xs text-blue-600 hover:underline">Upload more</Link>}
          />
          {recentMaterials.length === 0 ? (
            <div className="text-center py-4">
              <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-400">No uploads yet</p>
              <Link to="/upload" className="btn-primary text-xs mt-2 inline-block">Upload Materials</Link>
            </div>
          ) : (
            <div className="space-y-2">
              {recentMaterials.map(mat => (
                <div key={mat.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${mat.fileType === 'pdf' ? 'bg-red-100' : mat.fileType === 'link' ? 'bg-green-100' : 'bg-blue-100'}`}>
                    <FileText className={`w-4 h-4 ${mat.fileType === 'pdf' ? 'text-red-600' : mat.fileType === 'link' ? 'text-green-600' : 'text-blue-600'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{mat.fileName}</p>
                    <p className="text-xs text-gray-500">{MATERIAL_TYPE_LABELS[mat.materialType]}</p>
                  </div>
                  <StatusBadge status={mat.processingStatus === 'processed' ? 'completed' : mat.processingStatus === 'requires_review' ? 'needs_revision' : 'in_progress'} size="sm" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="card">
        <h2 className="section-title">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { to: '/upload', icon: Upload, label: 'Upload Material', color: 'bg-blue-50 text-blue-700 hover:bg-blue-100' },
            { to: '/question-generator', icon: FileQuestion, label: 'Generate Questions', color: 'bg-purple-50 text-purple-700 hover:bg-purple-100' },
            { to: '/study-guide', icon: BookOpen, label: 'Study Guide', color: 'bg-green-50 text-green-700 hover:bg-green-100' },
            { to: '/exam-prep', icon: GraduationCap, label: 'Exam Prep', color: 'bg-orange-50 text-orange-700 hover:bg-orange-100' },
          ].map(({ to, icon: Icon, label, color }) => (
            <Link key={to} to={to} className={`flex flex-col items-center gap-2 p-4 rounded-xl font-medium text-sm transition-colors ${color}`}>
              <Icon className="w-6 h-6" />
              <span className="text-center leading-tight">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuickStat({ icon, label, value, sub, color }: { icon: React.ReactNode; label: string; value: string; sub: string; color: string }) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600',
    green: 'bg-green-50 text-green-600',
  };
  return (
    <div className="card flex flex-col gap-2">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${colors[color]}`}>{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-lg font-bold text-gray-900 leading-tight">{value}</p>
        <p className="text-xs text-gray-400">{sub}</p>
      </div>
    </div>
  );
}
