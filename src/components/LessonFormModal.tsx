import React, { useState, useEffect } from 'react';
import type { LessonPlan, LessonStatus } from '../interfaces';
import { FaTimes } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

interface LessonFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (plan: LessonPlan) => void;
  initialData?: LessonPlan;
}

export const LessonFormModal = ({ isOpen, onClose, onSave, initialData }: LessonFormModalProps) => {
  const [formData, setFormData] = useState<Partial<LessonPlan>>({
    course: '',
    topic: '',
    date: new Date().toISOString().split('T')[0],
    duration: 45,
    status: 'pending',
    notes: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        course: '',
        topic: '',
        date: new Date().toISOString().split('T')[0],
        duration: 45,
        status: 'pending',
        notes: ''
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...(formData as LessonPlan),
      id: initialData?.id || uuidv4()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] mx-auto animate-in fade-in zoom-in-95 duration-200">
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white">
          <h2 className="text-2xl font-bold text-slate-800">
            {initialData ? 'Planı Düzenle' : 'Yeni Ders Planı'}
          </h2>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center transition">
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="px-8 py-6 overflow-y-auto flex-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Ders</label>
                <input 
                  required
                  type="text" 
                  value={formData.course} 
                  onChange={(e) => setFormData({...formData, course: e.target.value})}
                  className="w-full bg-slate-50 py-3.5 px-4 rounded-[1.25rem] border-none outline-none focus:ring-2 focus:ring-primary-300 text-slate-700 transition"
                  placeholder="Örn: Matematik"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Durum</label>
                <select 
                  value={formData.status} 
                  onChange={(e) => setFormData({...formData, status: e.target.value as LessonStatus})}
                  className="w-full bg-slate-50 py-3.5 px-4 rounded-[1.25rem] border-none outline-none focus:ring-2 focus:ring-primary-300 text-slate-700 transition cursor-pointer"
                >
                  <option value="pending">Beklemede</option>
                  <option value="in-progress">Devam Ediyor</option>
                  <option value="completed">Tamamlandı</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Konu</label>
              <input 
                required
                type="text" 
                value={formData.topic} 
                onChange={(e) => setFormData({...formData, topic: e.target.value})}
                className="w-full bg-slate-50 py-3.5 px-4 rounded-[1.25rem] border-none outline-none focus:ring-2 focus:ring-primary-300 text-slate-700 transition"
                placeholder="Örn: Cebir'e Giriş"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Tarih</label>
                <input 
                  required
                  type="date" 
                  value={formData.date} 
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-slate-50 py-3.5 px-4 rounded-[1.25rem] border-none outline-none focus:ring-2 focus:ring-primary-300 text-slate-700 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Süre (dk)</label>
                <input 
                  required
                  type="number" 
                  min="5"
                  value={formData.duration} 
                  onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                  className="w-full bg-slate-50 py-3.5 px-4 rounded-[1.25rem] border-none outline-none focus:ring-2 focus:ring-primary-300 text-slate-700 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Notlar</label>
              <textarea 
                rows={4}
                value={formData.notes} 
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="w-full bg-slate-50 py-3.5 px-4 rounded-[1.25rem] border-none outline-none focus:ring-2 focus:ring-primary-300 text-slate-700 transition resize-none leading-relaxed"
                placeholder="Gerekli materyalleri veya notları buraya ekleyin..."
              ></textarea>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-3.5 rounded-[1.25rem] font-bold text-slate-500 hover:bg-slate-100 transition"
            >
              İptal
            </button>
            <button 
              type="submit" 
              className="px-8 py-3.5 rounded-[1.25rem] font-bold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-soft hover:shadow-softHover transition"
            >
              {initialData ? 'Güncelle' : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
