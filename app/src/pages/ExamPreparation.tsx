import React, { useState } from 'react';
import { GraduationCap, Plus, Calendar, BookOpen, ChevronRight, Loader, Trash2 } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Modal, ProgressBar, SectionHeader } from '../components/shared/UI';
import { generateExamPlan } from '../services/aiService';
import type { Exam, ExamType } from '../types';
import { EXAM_TYPE_LABELS, STUDY_STATUS_LABELS } from '../types';

const SUBJECTS = ['Mathematics', 'English', 'EVS', 'Science', 'Social Studies', 'Hindi', 'Kannada', 'Telugu'];

export function ExamPreparation() {
  const { selectedChild, getChildExams, addExam, deleteExam } = useApp();
  const [addOpen, setAddOpen] = useState(false);
  const [studyPlan, setStudyPlan] = useState<{ examName: string; plan: string[] } | null>(null);
  const [planLoading, setPlanLoading] = useState(false);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);

  if (!selectedChild) return <div className="card text-center py-10 text-gray-500">Please select a child first.</div>;

  const exams = getChildExams(selectedChild.id);

  const handleGeneratePlan = async (exam: Exam) => {
    setPlanLoading(true);
    setSelectedExam(exam);
    setStudyPlan(null);
    const daysLeft = Math.max(1, Math.ceil((new Date(exam.startDate).getTime() - Date.now()) / 86400000));
    const plan = await generateExamPlan(exam.name, daysLeft, exam.subjects.map(s => s.subjectName));
    setStudyPlan({ examName: exam.name, plan });
    setPlanLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div />
        <button onClick={() => setAddOpen(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Exam
        </button>
      </div>

      {exams.length === 0 ? (
        <div className="card text-center py-12">
          <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-700 mb-1">No exams added yet</h3>
          <p className="text-sm text-gray-400 mb-4">Add an upcoming exam to start planning preparation.</p>
          <button onClick={() => setAddOpen(true)} className="btn-primary">Add First Exam</button>
        </div>
      ) : (
        <div className="space-y-4">
          {exams.map(exam => {
            const daysLeft = Math.ceil((new Date(exam.startDate).getTime() - Date.now()) / 86400000);
            const isUrgent = daysLeft <= 7 && daysLeft >= 0;
            return (
              <div key={exam.id} className="card">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-semibold text-gray-900">{exam.name}</h3>
                      <span className="badge-blue">{EXAM_TYPE_LABELS[exam.examType]}</span>
                      {isUrgent && <span className="badge bg-red-100 text-red-700">⏰ {daysLeft}d left</span>}
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(exam.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      {exam.endDate !== exam.startDate && ` – ${new Date(exam.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleGeneratePlan(exam)} className="btn-secondary text-xs flex items-center gap-1" disabled={planLoading}>
                      {planLoading && selectedExam?.id === exam.id ? <Loader className="w-3 h-3 animate-spin" /> : <Calendar className="w-3 h-3" />}
                      AI Plan
                    </button>
                    <button onClick={() => deleteExam(exam.id)} className="text-gray-400 hover:text-red-500 p-1 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Subject rows */}
                <div className="space-y-3">
                  {exam.subjects.map(sub => (
                    <div key={sub.subjectId} className="p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm text-gray-900">{sub.subjectName}</span>
                        <span className={`badge text-xs ${
                          sub.revisionStatus === 'completed' ? 'badge-green' :
                          sub.revisionStatus === 'in_progress' ? 'badge-blue' :
                          sub.revisionStatus === 'needs_revision' ? 'badge-yellow' : 'badge-gray'
                        }`}>
                          {STUDY_STATUS_LABELS[sub.revisionStatus]}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mb-2 text-xs text-gray-600">
                        <div><span className="font-medium">{sub.topicsCovered}</span> topics covered</div>
                        <div><span className="font-medium text-green-600">{sub.topicsStudied}</span> studied</div>
                        <div><span className="font-medium text-red-600">{sub.topicsCovered - sub.topicsStudied}</span> pending</div>
                      </div>
                      <ProgressBar value={sub.practiceCompleted} showLabel size="sm" color="bg-green-500" />
                      <p className="text-xs text-gray-400 mt-1">Practice {sub.practiceCompleted}% complete</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* AI Study Plan */}
      {studyPlan && (
        <div className="card">
          <SectionHeader title={`AI Study Plan: ${studyPlan.examName}`} />
          <div className="space-y-2">
            {studyPlan.plan.map((activity, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                <span className="text-sm text-gray-800">{activity}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">* This plan is AI-generated. Adjust it based on your child's needs.</p>
        </div>
      )}

      <AddExamModal open={addOpen} onClose={() => setAddOpen(false)} childId={selectedChild.id} addExam={addExam} />
    </div>
  );
}

function AddExamModal({ open, onClose, childId, addExam }: {
  open: boolean;
  onClose: () => void;
  childId: string;
  addExam: (exam: Exam) => void | Promise<void>;
}) {
  const [form, setForm] = useState({
    name: '',
    examType: 'monthly' as ExamType,
    startDate: '',
    endDate: '',
    selectedSubjects: [] as string[],
  });

  const toggleSubject = (sub: string) => {
    setForm(f => ({
      ...f,
      selectedSubjects: f.selectedSubjects.includes(sub)
        ? f.selectedSubjects.filter(s => s !== sub)
        : [...f.selectedSubjects, sub],
    }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.startDate || form.selectedSubjects.length === 0) return;
    const exam: Exam = {
      id: `exam-${Date.now()}`,
      childId,
      name: form.name,
      examType: form.examType,
      startDate: form.startDate,
      endDate: form.endDate || form.startDate,
      preparationStatus: 'not_started',
      subjects: form.selectedSubjects.map((sub, i) => ({
        subjectId: `sub-${i}`,
        subjectName: sub,
        chapters: [],
        topicsCovered: 0,
        topicsStudied: 0,
        practiceCompleted: 0,
        revisionStatus: 'not_started',
      })),
    };
    addExam(exam);
    onClose();
    setForm({ name: '', examType: 'monthly', startDate: '', endDate: '', selectedSubjects: [] });
  };

  return (
    <Modal open={open} onClose={onClose} title="Add Exam">
      <div className="space-y-4">
        <div>
          <label className="label">Exam Name</label>
          <input type="text" className="input" placeholder="e.g. Monthly Exam – October" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        </div>
        <div>
          <label className="label">Exam Type</label>
          <select className="select" value={form.examType} onChange={e => setForm(f => ({ ...f, examType: e.target.value as ExamType }))}>
            {Object.entries(EXAM_TYPE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Start Date</label>
            <input type="date" className="input" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} />
          </div>
          <div>
            <label className="label">End Date</label>
            <input type="date" className="input" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} />
          </div>
        </div>
        <div>
          <label className="label">Subjects</label>
          <div className="flex flex-wrap gap-2">
            {SUBJECTS.map(sub => (
              <button
                key={sub}
                onClick={() => toggleSubject(sub)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${form.selectedSubjects.includes(sub) ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="btn-secondary flex-1">Cancel</button>
          <button onClick={handleSubmit} className="btn-primary flex-1" disabled={!form.name || !form.startDate || form.selectedSubjects.length === 0}>
            Add Exam
          </button>
        </div>
      </div>
    </Modal>
  );
}
