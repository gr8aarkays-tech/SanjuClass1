import React, { createContext, useContext, useState, useCallback } from 'react';
import type {
  Child,
  Subject,
  Chapter,
  Topic,
  Exam,
  UploadedMaterial,
  WeeklyLesson,
  GeneratedQuestionPaper,
  PracticeAttempt,
} from '../types';
import {
  mockChildren,
  mockSubjects,
  mockChapters,
  mockTopics,
  mockExams,
  mockMaterials,
  mockWeeklyLessons,
  mockQuestionPaper,
  mockPracticeAttempts,
} from '../data/mockData';

interface AppState {
  currentUser: { id: string; name: string; email: string };
  children: Child[];
  selectedChild: Child | null;
  subjects: Subject[];
  chapters: Chapter[];
  topics: Topic[];
  exams: Exam[];
  materials: UploadedMaterial[];
  weeklyLessons: WeeklyLesson[];
  questionPapers: GeneratedQuestionPaper[];
  practiceAttempts: PracticeAttempt[];
}

interface AppContextValue extends AppState {
  selectChild: (child: Child) => void;
  addChild: (child: Omit<Child, 'id' | 'userId'>) => void;
  updateChild: (id: string, updates: Partial<Child>) => void;
  deleteChild: (id: string) => void;
  addMaterial: (material: UploadedMaterial) => void;
  updateMaterial: (id: string, updates: Partial<UploadedMaterial>) => void;
  deleteMaterial: (id: string) => void;
  addQuestionPaper: (paper: GeneratedQuestionPaper) => void;
  addExam: (exam: Exam) => void;
  updateExam: (id: string, updates: Partial<Exam>) => void;
  deleteExam: (id: string) => void;
  updateTopic: (id: string, updates: Partial<Topic>) => void;
  addPracticeAttempt: (attempt: PracticeAttempt) => void;
  getChildSubjects: (childId: string) => Subject[];
  getSubjectChapters: (subjectId: string) => Chapter[];
  getChapterTopics: (chapterId: string) => Topic[];
  getChildExams: (childId: string) => Exam[];
  getChildMaterials: (childId: string) => UploadedMaterial[];
  getChildWeeklyLessons: (childId: string) => WeeklyLesson[];
  getChildQuestionPapers: (childId: string) => GeneratedQuestionPaper[];
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children: reactChildren }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({
    currentUser: { id: 'user-1', name: 'Parent', email: 'parent@example.com' },
    children: mockChildren,
    selectedChild: mockChildren[0],
    subjects: mockSubjects,
    chapters: mockChapters,
    topics: mockTopics,
    exams: mockExams,
    materials: mockMaterials,
    weeklyLessons: mockWeeklyLessons,
    questionPapers: [mockQuestionPaper],
    practiceAttempts: mockPracticeAttempts,
  });

  const selectChild = useCallback((child: Child) => {
    setState(s => ({ ...s, selectedChild: child }));
  }, []);

  const addChild = useCallback((childData: Omit<Child, 'id' | 'userId'>) => {
    const newChild: Child = { ...childData, id: `child-${Date.now()}`, userId: 'user-1' };
    setState(s => ({ ...s, children: [...s.children, newChild], selectedChild: s.selectedChild || newChild }));
  }, []);

  const updateChild = useCallback((id: string, updates: Partial<Child>) => {
    setState(s => ({
      ...s,
      children: s.children.map(c => c.id === id ? { ...c, ...updates } : c),
      selectedChild: s.selectedChild?.id === id ? { ...s.selectedChild, ...updates } : s.selectedChild,
    }));
  }, []);

  const deleteChild = useCallback((id: string) => {
    setState(s => ({
      ...s,
      children: s.children.filter(c => c.id !== id),
      selectedChild: s.selectedChild?.id === id ? (s.children.find(c => c.id !== id) || null) : s.selectedChild,
    }));
  }, []);

  const addMaterial = useCallback((material: UploadedMaterial) => {
    setState(s => ({ ...s, materials: [material, ...s.materials] }));
  }, []);

  const updateMaterial = useCallback((id: string, updates: Partial<UploadedMaterial>) => {
    setState(s => ({ ...s, materials: s.materials.map(m => m.id === id ? { ...m, ...updates } : m) }));
  }, []);

  const deleteMaterial = useCallback((id: string) => {
    setState(s => ({ ...s, materials: s.materials.filter(m => m.id !== id) }));
  }, []);

  const addQuestionPaper = useCallback((paper: GeneratedQuestionPaper) => {
    setState(s => ({ ...s, questionPapers: [paper, ...s.questionPapers] }));
  }, []);

  const addExam = useCallback((exam: Exam) => {
    setState(s => ({ ...s, exams: [...s.exams, exam] }));
  }, []);

  const updateExam = useCallback((id: string, updates: Partial<Exam>) => {
    setState(s => ({ ...s, exams: s.exams.map(e => e.id === id ? { ...e, ...updates } : e) }));
  }, []);

  const deleteExam = useCallback((id: string) => {
    setState(s => ({ ...s, exams: s.exams.filter(e => e.id !== id) }));
  }, []);

  const updateTopic = useCallback((id: string, updates: Partial<Topic>) => {
    setState(s => ({ ...s, topics: s.topics.map(t => t.id === id ? { ...t, ...updates } : t) }));
  }, []);

  const addPracticeAttempt = useCallback((attempt: PracticeAttempt) => {
    setState(s => ({ ...s, practiceAttempts: [...s.practiceAttempts, attempt] }));
  }, []);

  const getChildSubjects = useCallback((childId: string) => state.subjects.filter(s => s.childId === childId), [state.subjects]);
  const getSubjectChapters = useCallback((subjectId: string) => state.chapters.filter(c => c.subjectId === subjectId), [state.chapters]);
  const getChapterTopics = useCallback((chapterId: string) => state.topics.filter(t => t.chapterId === chapterId), [state.topics]);
  const getChildExams = useCallback((childId: string) => state.exams.filter(e => e.childId === childId), [state.exams]);
  const getChildMaterials = useCallback((childId: string) => state.materials.filter(m => m.childId === childId), [state.materials]);
  const getChildWeeklyLessons = useCallback((childId: string) => state.weeklyLessons.filter(l => l.childId === childId), [state.weeklyLessons]);
  const getChildQuestionPapers = useCallback((childId: string) => state.questionPapers.filter(p => p.childId === childId), [state.questionPapers]);

  const value: AppContextValue = {
    ...state,
    selectChild, addChild, updateChild, deleteChild,
    addMaterial, updateMaterial, deleteMaterial,
    addQuestionPaper, addExam, updateExam, deleteExam,
    updateTopic, addPracticeAttempt,
    getChildSubjects, getSubjectChapters, getChapterTopics,
    getChildExams, getChildMaterials, getChildWeeklyLessons, getChildQuestionPapers,
  };

  return <AppContext.Provider value={value}>{reactChildren}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
