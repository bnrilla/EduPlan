import { FaGraduationCap } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Header = () => {
  const { currentUser } = useAuth();

  return (
    <header className="flex justify-between items-center mb-10 pt-6">
      <Link to="/" className="flex items-center gap-4 group cursor-pointer">
        <div className="bg-gradient-to-br from-primary-500 to-primary-700 w-14 h-14 rounded-[1.25rem] flex items-center justify-center shadow-soft group-hover:shadow-softHover transition duration-300">
          <FaGraduationCap className="text-white text-3xl drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight drop-shadow-sm">EduPlan</h1>
          <p className="text-slate-500 text-sm font-semibold mt-0.5 uppercase tracking-widest">Öğretmen Paneli</p>
        </div>
      </Link>

      {currentUser && (
        <Link to="/profile" className="flex items-center gap-4 group cursor-pointer glass-panel py-2 px-4 rounded-[2rem]">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-800 group-hover:text-primary-600 transition">{currentUser.firstName} {currentUser.lastName}</p>
            <p className="text-xs font-semibold text-primary-500 uppercase tracking-widest mt-0.5">{currentUser.expertise}</p>
          </div>
          <div className="w-12 h-12 bg-white rounded-full shadow-sm border-2 border-white flex items-center justify-center overflow-hidden group-hover:shadow-softHover transition duration-300 transform group-hover:scale-105">
            <img src={currentUser.avatarUrl} alt="Kullanıcı Avatarı" className="w-full h-full object-cover" />
          </div>
        </Link>
      )}
    </header>
  );
};
