import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaGraduationCap } from 'react-icons/fa';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email)) {
      navigate('/');
    } else {
      setError("Bu e-posta adresine ait bir hesap bulunamadı. Lütfen önce kayıt olun.");
    }
  };

    <div className="min-h-screen flex bg-transparent relative z-10">
      <div className="flex-1 hidden lg:flex items-center justify-center p-12 relative">
        <div className="max-w-lg text-slate-800 z-10 relative">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-700 rounded-[2rem] flex items-center justify-center mb-10 shadow-softHover transform -rotate-3 hover:rotate-0 transition duration-500">
            <FaGraduationCap className="text-white text-5xl transform rotate-3 hover:rotate-0 transition duration-500" />
          </div>
          <h1 className="text-6xl font-extrabold mb-8 leading-tight drop-shadow-sm bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-primary-900">
            Derslerinizi kolayca planlayın.
          </h1>
          <p className="text-slate-600 text-xl leading-relaxed font-medium">
            Ders materyallerinizi düzenlemek, sınıfları planlamak ve eğitim sürecinizi modern bir panelden takip etmek için EduPlan'a giriş yapın.
          </p>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 relative z-10">
        <div className="w-full max-w-md glass-panel p-10 sm:p-12 rounded-[2.5rem] shadow-2xl">
          <div className="lg:hidden w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-[1.75rem] flex items-center justify-center mb-8 shadow-softHover">
            <FaGraduationCap className="text-white text-4xl" />
          </div>
          <h2 className="text-4xl font-extrabold text-slate-800 mb-3 drop-shadow-sm">Hoş Geldiniz 👋</h2>
          <p className="text-slate-500 mb-10 font-semibold text-lg">EduPlan hesabınıza giriş yapın</p>
          
          {error && (
            <div className="bg-red-50/80 backdrop-blur-md text-red-600 p-4 rounded-[1.25rem] mb-6 text-sm font-bold border border-red-200/50 shadow-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">E-posta Adresi</label>
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/60 backdrop-blur-md py-4 px-5 rounded-[1.5rem] border border-white/50 outline-none focus:ring-2 focus:ring-primary-400 text-slate-800 transition shadow-inner font-medium text-lg placeholder-slate-400"
                placeholder="ogretmen@okul.com"
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full py-4 rounded-[1.5rem] font-bold text-lg text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-soft hover:shadow-softHover transition mt-6 transform hover:-translate-y-1"
            >
              Giriş Yap
            </button>
          </form>

          <p className="text-center text-slate-500 mt-10 font-medium">
            Hesabınız yok mu? <Link to="/register" className="text-primary-600 font-bold hover:text-primary-700 transition ml-1 hover:underline">Buradan kayıt olun</Link>
          </p>
        </div>
      </div>
    </div>
};
