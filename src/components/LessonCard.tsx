import type { LessonPlan, LessonStatus } from '../interfaces';
import { FaEdit, FaTrash, FaCalendarAlt, FaClock } from 'react-icons/fa';

interface LessonCardProps {
  plan: LessonPlan;
  onEdit: (plan: LessonPlan) => void;
  onDelete: (id: string) => void;
}

export const LessonCard = ({ plan, onEdit, onDelete }: LessonCardProps) => {
  const statusColors: Record<LessonStatus, string> = {
    'pending': 'bg-amber-100/80 text-amber-700 border border-amber-200/50',
    'in-progress': 'bg-blue-100/80 text-blue-700 border border-blue-200/50',
    'completed': 'bg-emerald-100/80 text-emerald-700 border border-emerald-200/50',
  };

  const statusTags: Record<LessonStatus, string> = {
    'pending': 'Beklemede',
    'in-progress': 'Devam Ediyor',
    'completed': 'Tamamlandı'
  };

  return (
    <div className="glass-panel glass-panel-hover rounded-[2rem] p-6 flex flex-col h-full relative group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary-600 mb-1.5 block drop-shadow-sm">{plan.course}</span>
          <h3 className="text-xl font-bold text-slate-800 leading-tight">{plan.topic}</h3>
        </div>
        <span className={`text-xs px-3 py-1.5 rounded-full font-bold whitespace-nowrap ml-2 backdrop-blur-md shadow-sm ${statusColors[plan.status]}`}>
          {statusTags[plan.status]}
        </span>
      </div>
      
      <p className="text-slate-600 text-sm flex-1 mb-6 line-clamp-3 leading-relaxed font-medium">
        {plan.notes || "Not eklenmemiş."}
      </p>
      
      <div className="flex justify-between items-center bg-white/40 backdrop-blur-md p-4 rounded-2xl mt-auto border border-white/50 shadow-inner">
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5 text-sm text-slate-600 font-semibold">
            <FaCalendarAlt className="text-primary-400" />
            <span>{plan.date}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-slate-600 font-semibold">
            <FaClock className="text-primary-400" />
            <span>{plan.duration}dk</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(plan)}
            className="w-9 h-9 rounded-full bg-white/80 text-slate-500 hover:text-primary-600 hover:bg-white flex items-center justify-center transition shadow-sm border border-white/60 hover:shadow-soft"
            title="Düzenle"
          >
            <FaEdit className="text-sm" />
          </button>
          <button 
            onClick={() => onDelete(plan.id)}
            className="w-9 h-9 rounded-full bg-white/80 text-slate-500 hover:text-red-500 hover:bg-white flex items-center justify-center transition shadow-sm border border-white/60 hover:shadow-soft"
            title="Sil"
          >
            <FaTrash className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};
