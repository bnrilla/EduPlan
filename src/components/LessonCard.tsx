import type { LessonPlan, LessonStatus } from '../interfaces';
import { FaEdit, FaTrash, FaCalendarAlt, FaClock } from 'react-icons/fa';

interface LessonCardProps {
  plan: LessonPlan;
  onEdit: (plan: LessonPlan) => void;
  onDelete: (id: string) => void;
}

export const LessonCard = ({ plan, onEdit, onDelete }: LessonCardProps) => {
  const statusColors: Record<LessonStatus, string> = {
    'pending': 'bg-amber-100 text-amber-700',
    'in-progress': 'bg-blue-100 text-blue-700',
    'completed': 'bg-emerald-100 text-emerald-700',
  };

  const statusTags: Record<LessonStatus, string> = {
    'pending': 'Beklemede',
    'in-progress': 'Devam Ediyor',
    'completed': 'Tamamlandı'
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-card hover:shadow-softHover transition duration-300 border border-slate-50 flex flex-col h-full relative group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary-500 mb-1.5 block">{plan.course}</span>
          <h3 className="text-xl font-bold text-slate-800 leading-tight">{plan.topic}</h3>
        </div>
        <span className={`text-xs px-3 py-1.5 rounded-full font-semibold whitespace-nowrap ml-2 ${statusColors[plan.status]}`}>
          {statusTags[plan.status]}
        </span>
      </div>
      
      <p className="text-slate-500 text-sm flex-1 mb-6 line-clamp-3 leading-relaxed">
        {plan.notes || "Not eklenmemiş."}
      </p>
      
      <div className="flex justify-between items-center bg-slate-50/80 p-4 rounded-2xl mt-auto">
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
            <FaCalendarAlt className="text-slate-400" />
            <span>{plan.date}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
            <FaClock className="text-slate-400" />
            <span>{plan.duration}dk</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(plan)}
            className="w-8 h-8 rounded-full bg-white text-slate-400 hover:text-primary-600 hover:bg-primary-50 flex items-center justify-center transition shadow-sm border border-slate-100"
            title="Düzenle"
          >
            <FaEdit className="text-xs" />
          </button>
          <button 
            onClick={() => onDelete(plan.id)}
            className="w-8 h-8 rounded-full bg-white text-slate-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition shadow-sm border border-slate-100"
            title="Sil"
          >
            <FaTrash className="text-xs" />
          </button>
        </div>
      </div>
    </div>
  );
};
