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

  return (
    <div className="min-h-screen flex bg-slate-50">
      <div className="flex-1 hidden lg:flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-800 p-12">
        <div className="max-w-lg text-white">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-[1.5rem] flex items-center justify-center mb-10 shadow-soft">
            <FaGraduationCap className="text-white text-5xl" />
          </div>
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">Derslerinizi kolayca planlayın.</h1>
          <p className="text-primary-100 text-lg leading-relaxed">Ders materyallerinizi düzenlemek, sınıfları planlamak ve eğitim sürecinizi modern bir panelden takip etmek için EduPlan'a giriş yapın.</p>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md bg-white p-10 rounded-[2rem] shadow-card border border-slate-50">
          <div className="lg:hidden w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-[1.25rem] flex items-center justify-center mb-8 shadow-soft">
            <FaGraduationCap className="text-white text-3xl" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Tekrar Hoş Geldiniz 👋</h2>
          <p className="text-slate-500 mb-8 font-medium">EduPlan hesabınıza giriş yapın</p>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-[1rem] mb-6 text-sm font-medium border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">E-posta Adresi</label>
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 py-3.5 px-4 rounded-[1.25rem] border-none outline-none focus:ring-2 focus:ring-primary-300 text-slate-700 transition"
                placeholder="ogretmen@okul.com"
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full py-3.5 rounded-[1.25rem] font-bold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-soft hover:shadow-softHover transition mt-4"
            >
              Giriş Yap
            </button>
          </form>

          <p className="text-center text-slate-500 mt-8 font-medium">
            Hesabınız yok mu? <Link to="/register" className="text-primary-600 font-bold hover:underline">Buradan kayıt olun</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
