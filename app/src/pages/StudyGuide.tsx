import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronRight, Lightbulb, Eye, Pencil, Dumbbell, Zap, Loader } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { LoadingSpinner, StatusBadge, SectionHeader } from '../components/shared/UI';
import { generateStudyGuide, type StudyGuideSection } from '../services/aiService';
import { STUDY_STATUS_LABELS } from '../types';

export function StudyGuide() {
  const { selectedChild, getChildSubjects, getSubjectChapters, getChapterTopics, updateTopic } = useApp();
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [guide, setGuide] = useState<StudyGuideSection | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'read' | 'highlight' | 'understand' | 'practice' | 'revise'>('read');
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());

  if (!selectedChild) return <div className="card text-center py-10 text-gray-500">Please select a child first.</div>;

  const subjects = getChildSubjects(selectedChild.id);

  const handleSubjectChange = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setSelectedChapter('');
    setGuide(null);
  };

  const handleGenerateGuide = async () => {
    if (!selectedSubject || !selectedChapter) return;
    const subject = subjects.find(s => s.id === selectedSubject);
    const chapters = getSubjectChapters(selectedSubject);
    const chapter = chapters.find(c => c.id === selectedChapter);
    if (!subject || !chapter) return;
    setLoading(true);
    setGuide(null);
    try {
      const result = await generateStudyGuide(subject.name, chapter.name);
      setGuide(result);
      setActiveTab('read');
    } finally {
      setLoading(false);
    }
  };

  const currentSubject = subjects.find(s => s.id === selectedSubject);
  const chapters = selectedSubject ? getSubjectChapters(selectedSubject) : [];
  const currentChapter = chapters.find(c => c.id === selectedChapter);
  const chapterTopics = selectedChapter ? getChapterTopics(selectedChapter) : [];

  const tabs = [
    { id: 'read' as const, label: 'What to Read', icon: BookOpen, color: 'text-blue-600' },
    { id: 'highlight' as const, label: 'What to Highlight', icon: Lightbulb, color: 'text-yellow-600' },
    { id: 'understand' as const, label: 'Understand', icon: Eye, color: 'text-purple-600' },
    { id: 'practice' as const, label: 'What to Practice', icon: Dumbbell, color: 'text-green-600' },
    { id: 'revise' as const, label: 'Quick Revision', icon: Zap, color: 'text-orange-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Selector */}
      <div className="card">
        <h2 className="section-title">Study Guide Generator</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          <div>
            <label className="label">Subject</label>
            <select className="select" value={selectedSubject} onChange={e => handleSubjectChange(e.target.value)}>
              <option value="">Select subject…</option>
              {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Chapter</label>
            <select className="select" value={selectedChapter} onChange={e => { setSelectedChapter(e.target.value); setGuide(null); }} disabled={!selectedSubject}>
              <option value="">Select chapter…</option>
              {chapters.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleGenerateGuide}
              disabled={!selectedSubject || !selectedChapter || loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading ? <><Loader className="w-4 h-4 animate-spin" /> Generating…</> : <><BookOpen className="w-4 h-4" /> Generate Study Guide</>}
            </button>
          </div>
        </div>
      </div>

      {/* Topics status */}
      {selectedChapter && chapterTopics.length > 0 && (
        <div className="card">
          <SectionHeader title={`Topics: ${currentChapter?.name || ''}`} />
          <div className="grid sm:grid-cols-2 gap-2">
            {chapterTopics.map(topic => (
              <div key={topic.id} className="flex items-center gap-3 p-2.5 border border-gray-100 rounded-xl">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{topic.name}</p>
                  <span className={`text-xs ${topic.importance === 'high' ? 'text-red-600' : topic.importance === 'medium' ? 'text-yellow-600' : 'text-gray-500'}`}>
                    {topic.importance === 'high' ? '★ High priority' : topic.importance === 'medium' ? '◆ Medium priority' : '○ Standard'}
                  </span>
                </div>
                <select
                  className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white"
                  value={topic.studyStatus}
                  onChange={e => updateTopic(topic.id, { studyStatus: e.target.value as any })}
                >
                  {Object.entries(STUDY_STATUS_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="card py-12">
          <LoadingSpinner size="lg" text="Generating your personalized study guide…" />
        </div>
      )}

      {/* Study guide content */}
      {guide && !loading && (
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              {currentSubject?.name} – {currentChapter?.name}
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === 'read' && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 font-medium">📚 Read these sections carefully:</p>
              <ol className="space-y-2">
                {guide.whatToRead.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                    <span className="text-sm text-gray-800">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {activeTab === 'highlight' && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 font-medium">🖊 Highlight these important points:</p>
              {guide.whatToHighlight.map((item, i) => (
                <div key={i} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{item.item}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{item.reason}</p>
                      {item.memorize && <span className="mt-1 inline-block badge bg-red-100 text-red-700 text-xs">Must Memorize</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'understand' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 font-medium">💡 Understand these concepts:</p>
              {guide.whatToUnderstand.map((item, i) => (
                <div key={i} className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                  <h4 className="font-semibold text-purple-900 mb-2">{item.concept}</h4>
                  <p className="text-sm text-gray-700 mb-3">{item.explanation}</p>
                  <div className="p-2 bg-white rounded-lg border border-purple-100 mb-3">
                    <p className="text-xs font-medium text-purple-600 mb-1">Example:</p>
                    <p className="text-sm text-gray-700">{item.example}</p>
                  </div>
                  {item.commonMistakes.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-red-600 mb-1">Common Mistakes to Avoid:</p>
                      <ul className="space-y-1">
                        {item.commonMistakes.map((m, j) => <li key={j} className="text-xs text-gray-600 flex items-start gap-1"><span className="text-red-400 mt-0.5">⚠</span>{m}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'practice' && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 font-medium">✏️ Practice these exercises:</p>
              {guide.whatToPractice.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                  <Dumbbell className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-800">{item}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'revise' && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">🎯 Key Points to Remember:</p>
                <ul className="space-y-1.5">
                  {guide.quickRevision.keyPoints.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-800">
                      <span className="text-green-500 font-bold mt-0.5">✓</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
              {guide.quickRevision.importantWords.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">📖 Important Words:</p>
                  <div className="flex flex-wrap gap-2">
                    {guide.quickRevision.importantWords.map(w => <span key={w} className="badge-purple px-3 py-1">{w}</span>)}
                  </div>
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">❓ Oral Practice Questions:</p>
                <div className="space-y-2">
                  {guide.quickRevision.oralQuestions.map((q, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg border border-orange-100">
                      <span className="text-orange-600 font-bold text-sm">{i + 1}.</span>
                      <span className="text-sm text-gray-800">{q}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {!guide && !loading && selectedSubject && selectedChapter && (
        <div className="card text-center py-8 text-gray-400">
          <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-40" />
          <p>Click "Generate Study Guide" to create a personalized guide for this chapter.</p>
        </div>
      )}
    </div>
  );
}
