import { useState, useEffect } from 'react';
import type { LessonPlan } from '../interfaces';

export const useLessonPlans = () => {
  const [plans, setPlans] = useState<LessonPlan[]>(() => {
    const saved = localStorage.getItem('eduplans_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('eduplans_data', JSON.stringify(plans));
  }, [plans]);

  const addPlan = (plan: LessonPlan) => setPlans(prev => [...prev, plan]);

  const updatePlan = (updatedPlan: LessonPlan) => 
    setPlans(prev => prev.map(p => p.id === updatedPlan.id ? updatedPlan : p));

  const deletePlan = (id: string) => 
    setPlans(prev => prev.filter(p => p.id !== id));

  return { plans, addPlan, updatePlan, deletePlan };
};
