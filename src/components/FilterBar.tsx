import { FaSearch, FaPlus } from 'react-icons/fa';

interface FilterBarProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  onAddNew: () => void;
}

export const FilterBar = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter, onAddNew }: FilterBarProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 glass-panel p-4 rounded-[2rem]">
      <div className="flex w-full md:w-auto gap-4 flex-1">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Derslerde ara..." 
            className="w-full bg-white/60 backdrop-blur-md border border-white/60 outline-none py-3.5 pl-12 pr-4 rounded-[1.25rem] text-slate-700 focus:ring-2 focus:ring-primary-400 transition shadow-inner font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="bg-white/60 backdrop-blur-md border border-white/60 outline-none py-3.5 px-5 rounded-[1.25rem] text-slate-700 focus:ring-2 focus:ring-primary-400 transition cursor-pointer shadow-inner font-medium"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Tüm Durumlar</option>
          <option value="pending">Beklemede</option>
          <option value="in-progress">Devam Ediyor</option>
          <option value="completed">Tamamlandı</option>
        </select>
      </div>
      <button 
        onClick={onAddNew}
        className="w-full md:w-auto bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold py-3.5 px-8 rounded-[1.25rem] shadow-soft hover:shadow-softHover transition flex items-center justify-center gap-3"
      >
        <FaPlus />
        <span>Yeni Plan</span>
      </button>
    </div>
  );
};
