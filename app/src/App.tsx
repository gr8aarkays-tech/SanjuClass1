import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { UploadMaterials } from './pages/UploadMaterials';
import { WeeklyPlan } from './pages/WeeklyPlan';
import { ExamPreparation } from './pages/ExamPreparation';
import { StudyGuide } from './pages/StudyGuide';
import { QuestionGenerator } from './pages/QuestionGenerator';
import { PracticeMode } from './pages/PracticeMode';
import { QuestionLibrary } from './pages/QuestionLibrary';
import { Children } from './pages/Children';
import { AIAssistant } from './pages/AIAssistant';
import { Settings } from './pages/Settings';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<UploadMaterials />} />
            <Route path="/weekly-plan" element={<WeeklyPlan />} />
            <Route path="/exam-prep" element={<ExamPreparation />} />
            <Route path="/study-guide" element={<StudyGuide />} />
            <Route path="/question-generator" element={<QuestionGenerator />} />
            <Route path="/practice" element={<PracticeMode />} />
            <Route path="/library" element={<QuestionLibrary />} />
            <Route path="/children" element={<Children />} />
            <Route path="/assistant" element={<AIAssistant />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  );
}
