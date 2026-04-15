import type { LessonPlan } from '../interfaces';
import { FaBookOpen, FaCheckCircle, FaClock } from 'react-icons/fa';

interface SummaryCardsProps {
  plans: LessonPlan[];
}

export const SummaryCards = ({ plans }: SummaryCardsProps) => {
  const total = plans.length;
  const completed = plans.filter(p => p.status === 'completed').length;
  const pending = plans.filter(p => p.status === 'pending').length;

  const cards = [
    { title: 'Toplam Ders', value: total, icon: FaBookOpen, color: 'text-primary-600', bg: 'bg-primary-50' },
    { title: 'Tamamlandı', value: completed, icon: FaCheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { title: 'Beklemede', value: pending, icon: FaClock, color: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white rounded-3xl p-6 shadow-card hover:shadow-softHover transition duration-300 border border-slate-50 flex items-center gap-5">
          <div className={`w-16 h-16 rounded-[1.25rem] flex items-center justify-center ${card.bg} ${card.color}`}>
            <card.icon className="text-3xl" />
          </div>
          <div>
            <p className="text-slate-500 font-medium text-sm mb-1">{card.title}</p>
            <h3 className="text-3xl font-extrabold text-slate-800">{card.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};
