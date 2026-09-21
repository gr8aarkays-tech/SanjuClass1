import React from 'react';
import { FileQuestion as FileQ } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

export function QuestionLibrary() {
  const { selectedChild, getChildQuestionPapers } = useApp();
  const navigate = useNavigate();

  if (!selectedChild) return <div className="card text-center py-10 text-gray-500">Please select a child first.</div>;

  const papers = getChildQuestionPapers(selectedChild.id);

  return (
    <div className="space-y-4">
      {papers.length === 0 ? (
        <div className="card text-center py-12">
          <FileQ className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-700 mb-1">No question papers yet</h3>
          <p className="text-sm text-gray-400 mb-4">Generate question papers from the Question Generator.</p>
          <button onClick={() => navigate('/question-generator')} className="btn-primary">Go to Generator</button>
        </div>
      ) : (
        papers.map(paper => (
          <div key={paper.id} className="card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-gray-900">{paper.title}</h3>
                <p className="text-sm text-gray-500">{paper.questions.length} questions · {paper.totalMarks} marks · {new Date(paper.createdAt).toLocaleDateString('en-IN')}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => navigate('/practice')} className="btn-secondary text-xs">Practice</button>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mt-3">
              {paper.config.questionTypes.map(qt => (
                <span key={qt.type} className="badge-blue text-xs">{qt.label} ({qt.quantity})</span>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
