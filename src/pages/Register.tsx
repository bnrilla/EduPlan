import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaGraduationCap } from 'react-icons/fa';

export const Register = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', expertise: '', bio: '' });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const success = register(formData);
    if (success) {
      navigate('/');
    } else {
      setError("Bu e-posta adresi ile zaten bir hesap oluşturulmuş.");
    }
  };

  return (
    <div className="min-h-screen flex bg-transparent relative z-10">
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 relative z-10">
        
        <div className="w-full max-w-xl glass-panel p-10 sm:p-12 rounded-[2.5rem] shadow-2xl relative z-10">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-[1.75rem] flex items-center justify-center mb-8 shadow-softHover">
            <FaGraduationCap className="text-white text-4xl" />
          </div>
          <h2 className="text-4xl font-extrabold text-slate-800 mb-3 drop-shadow-sm">Hesap Oluştur ✨</h2>
          <p className="text-slate-500 mb-10 font-semibold text-lg">Devam etmek için öğretmen hesabınızı oluşturun</p>
          
          {error && (
            <div className="bg-red-50/80 backdrop-blur-md text-red-600 p-4 rounded-[1.25rem] mb-6 text-sm font-bold border border-red-200/50 shadow-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Ad</label>
                <input 
                  required
                  type="text" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full bg-white/60 backdrop-blur-md py-4 px-5 rounded-[1.5rem] border border-white/50 outline-none focus:ring-2 focus:ring-primary-400 text-slate-800 transition shadow-inner font-medium text-lg placeholder-slate-400"
                  placeholder="Ahmet"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Soyad</label>
                <input 
                  required
                  type="text" 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full bg-white/60 backdrop-blur-md py-4 px-5 rounded-[1.5rem] border border-white/50 outline-none focus:ring-2 focus:ring-primary-400 text-slate-800 transition shadow-inner font-medium text-lg placeholder-slate-400"
                  placeholder="Yılmaz"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">E-posta Adresi</label>
              <input 
                required
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white/60 backdrop-blur-md py-4 px-5 rounded-[1.5rem] border border-white/50 outline-none focus:ring-2 focus:ring-primary-400 text-slate-800 transition shadow-inner font-medium text-lg placeholder-slate-400"
                placeholder="ogretmen@okul.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Uzmanlık Alanı (Branş)</label>
              <input 
                required
                type="text" 
                value={formData.expertise}
                onChange={(e) => setFormData({...formData, expertise: e.target.value})}
                className="w-full bg-white/60 backdrop-blur-md py-4 px-5 rounded-[1.5rem] border border-white/50 outline-none focus:ring-2 focus:ring-primary-400 text-slate-800 transition shadow-inner font-medium text-lg placeholder-slate-400"
                placeholder="Örn: Matematik, Tarih"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Kısa Biyografi</label>
              <textarea 
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className="w-full bg-white/60 backdrop-blur-md py-4 px-5 rounded-[1.5rem] border border-white/50 outline-none focus:ring-2 focus:ring-primary-400 text-slate-800 transition shadow-inner font-medium text-lg placeholder-slate-400 resize-none"
                placeholder="Kendinizden biraz bahsedin..."
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="w-full py-4 rounded-[1.5rem] font-bold text-lg text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-soft hover:shadow-softHover transition mt-6 transform hover:-translate-y-1"
            >
              Kaydı Tamamla
            </button>
          </form>

          <p className="text-center text-slate-500 mt-10 font-medium">
            Zaten bir hesabınız var mı? <Link to="/login" className="text-primary-600 font-bold hover:text-primary-700 transition ml-1 hover:underline">Giriş Yapın</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
