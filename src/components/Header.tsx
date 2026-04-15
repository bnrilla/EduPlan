import { FaGraduationCap } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Header = () => {
  const { currentUser } = useAuth();

  return (
    <header className="flex justify-between items-center mb-10 pt-6">
      <Link to="/" className="flex items-center gap-4 hover:opacity-80 transition cursor-pointer">
        <div className="bg-gradient-to-br from-primary-500 to-primary-700 w-14 h-14 rounded-2xl flex items-center justify-center shadow-soft">
          <FaGraduationCap className="text-white text-3xl" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">EduPlan</h1>
          <p className="text-slate-500 text-sm font-medium mt-0.5">Öğretmen Paneli</p>
        </div>
      </Link>

      {currentUser && (
        <Link to="/profile" className="flex items-center gap-4 group cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-800 group-hover:text-primary-600 transition">{currentUser.firstName} {currentUser.lastName}</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-0.5">{currentUser.expertise}</p>
          </div>
          <div className="w-14 h-14 bg-white rounded-2xl shadow-card border border-slate-100 flex items-center justify-center overflow-hidden group-hover:shadow-softHover transition">
            <img src={currentUser.avatarUrl} alt="Kullanıcı Avatarı" className="w-full h-full object-cover" />
          </div>
        </Link>
      )}
    </header>
  );
};
