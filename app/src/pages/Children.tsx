import React, { useState } from 'react';
import { Users, Plus, Pencil, Trash2, GraduationCap, School } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Modal } from '../components/shared/UI';
import type { Child } from '../types';

export function Children() {
  const { children, selectedChild, selectChild, addChild, updateChild, deleteChild } = useApp();
  const [addOpen, setAddOpen] = useState(false);
  const [editChild, setEditChild] = useState<Child | null>(null);

  const CLASSES = ['KG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const YEARS = ['2023-2024', '2024-2025', '2025-2026'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <button onClick={() => setAddOpen(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Child
        </button>
      </div>

      {children.length === 0 ? (
        <div className="card text-center py-12">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-700 mb-1">No children added</h3>
          <p className="text-sm text-gray-400 mb-4">Add your child's details to get started.</p>
          <button onClick={() => setAddOpen(true)} className="btn-primary">Add Your Child</button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {children.map(child => (
            <div
              key={child.id}
              className={`card cursor-pointer transition-all ${selectedChild?.id === child.id ? 'ring-2 ring-blue-500' : 'hover:shadow-md'}`}
              onClick={() => selectChild(child)}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-white">{child.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">{child.name}</h3>
                    {selectedChild?.id === child.id && (
                      <span className="badge-green text-xs">Active</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-0.5">
                    <GraduationCap className="w-3 h-3" />
                    <span>Class {child.class}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-0.5">
                    <School className="w-3 h-3" />
                    <span className="truncate">{child.school}</span>
                  </div>
                  <p className="text-xs text-gray-400">{child.academicYear}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={e => { e.stopPropagation(); setEditChild(child); }}
                    className="text-gray-400 hover:text-blue-600 p-1 rounded"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); if (confirm(`Delete ${child.name}?`)) deleteChild(child.id); }}
                    className="text-gray-400 hover:text-red-500 p-1 rounded"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ChildFormModal
        open={addOpen || !!editChild}
        onClose={() => { setAddOpen(false); setEditChild(null); }}
        existingChild={editChild || undefined}
        onSave={(data) => {
          if (editChild) {
            updateChild(editChild.id, data);
          } else {
            addChild(data);
          }
          setAddOpen(false);
          setEditChild(null);
        }}
        classes={CLASSES}
        years={YEARS}
      />
    </div>
  );
}

function ChildFormModal({
  open, onClose, existingChild, onSave, classes, years,
}: {
  open: boolean;
  onClose: () => void;
  existingChild?: Child;
  onSave: (data: Omit<Child, 'id' | 'userId'>) => void;
  classes: string[];
  years: string[];
}) {
  const [form, setForm] = useState({
    name: existingChild?.name || '',
    class: existingChild?.class || '3',
    school: existingChild?.school || '',
    academicYear: existingChild?.academicYear || '2024-2025',
  });

  React.useEffect(() => {
    if (existingChild) {
      setForm({ name: existingChild.name, class: existingChild.class, school: existingChild.school, academicYear: existingChild.academicYear });
    } else {
      setForm({ name: '', class: '3', school: '', academicYear: '2024-2025' });
    }
  }, [existingChild, open]);

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    onSave(form);
  };

  return (
    <Modal open={open} onClose={onClose} title={existingChild ? 'Edit Child' : 'Add Child'}>
      <div className="space-y-4">
        <div>
          <label className="label">Child's Name *</label>
          <input type="text" className="input" placeholder="e.g. Sanju" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        </div>
        <div>
          <label className="label">Class / Grade *</label>
          <select className="select" value={form.class} onChange={e => setForm(f => ({ ...f, class: e.target.value }))}>
            {classes.map(c => <option key={c} value={c}>Class {c}</option>)}
          </select>
        </div>
        <div>
          <label className="label">School Name</label>
          <input type="text" className="input" placeholder="e.g. St. Mary's Primary School" value={form.school} onChange={e => setForm(f => ({ ...f, school: e.target.value }))} />
        </div>
        <div>
          <label className="label">Academic Year</label>
          <select className="select" value={form.academicYear} onChange={e => setForm(f => ({ ...f, academicYear: e.target.value }))}>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="btn-secondary flex-1">Cancel</button>
          <button onClick={handleSubmit} disabled={!form.name.trim()} className="btn-primary flex-1">
            {existingChild ? 'Save Changes' : 'Add Child'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
