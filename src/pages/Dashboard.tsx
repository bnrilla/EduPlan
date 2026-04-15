import { useState } from 'react';
import { useLessonPlans } from '../hooks/useLessonPlans';
import { Header } from '../components/Header';
import { SummaryCards } from '../components/SummaryCards';
import { FilterBar } from '../components/FilterBar';
import { LessonCard } from '../components/LessonCard';
import { LessonFormModal } from '../components/LessonFormModal';
import type { LessonPlan } from '../interfaces';

export const Dashboard = () => {
  const { plans, addPlan, updatePlan, deletePlan } = useLessonPlans();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<LessonPlan | undefined>(undefined);

  const filteredPlans = plans.filter(plan => {
    const matchesSearch = 
      plan.topic.toLowerCase().includes(searchTerm.toLowerCase()) || 
      plan.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || plan.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddNew = () => {
    setEditingPlan(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (plan: LessonPlan) => {
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  const handleSave = (plan: LessonPlan) => {
    if (editingPlan) {
      updatePlan(plan);
    } else {
      addPlan(plan);
    }
  };

  return (
    <div className="min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        
        <main>
          <div className="mb-10">
            <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Genel Bakış</h2>
            <p className="text-slate-500 font-medium tracking-tight">Eğitim içeriklerinizi ve planlarınızı kolayca yönetin</p>
          </div>
          
          <SummaryCards plans={plans} />
          
          <FilterBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            statusFilter={statusFilter} 
            setStatusFilter={setStatusFilter} 
            onAddNew={handleAddNew} 
          />

          {filteredPlans.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center shadow-card border border-slate-50 mt-8">
              <div className="w-24 h-24 bg-primary-50 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <span className="text-4xl block translate-y-1">📚</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Ders planı bulunamadı</h3>
              <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
                {searchTerm || statusFilter !== 'all' 
                  ? "Arama kriterlerinize uygun ders planı bulunamadı."
                  : "Henüz hiç ders planı oluşturmadınız. Başlamak için 'Yeni Plan' butonuna tıklayın!"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
              {filteredPlans.map(plan => (
                <LessonCard 
                  key={plan.id} 
                  plan={plan} 
                  onEdit={handleEdit} 
                  onDelete={deletePlan} 
                />
              ))}
            </div>
          )}
        </main>
      </div>

      <LessonFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave} 
        initialData={editingPlan} 
      />
    </div>
  );
};
