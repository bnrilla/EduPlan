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
    <div className="min-h-screen flex bg-slate-50">
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 relative overflow-hidden">
        {/* Background decorative blobs */}
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-60"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-60"></div>
        
        <div className="w-full max-w-xl bg-white p-10 rounded-[2rem] shadow-card border border-slate-50 relative z-10">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-[1.25rem] flex items-center justify-center mb-8 shadow-soft">
            <FaGraduationCap className="text-white text-3xl" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Hesap Oluştur ✨</h2>
          <p className="text-slate-500 mb-8 font-medium">Devam etmek için öğretmen hesabınızı oluşturun</p>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-[1rem] mb-6 text-sm font-medium border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Ad</label>
                <input 
                  required
                  type="text" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full bg-slate-50 py-3.5 px-4 rounded-[1.25rem] border-none outline-none focus:ring-2 focus:ring-primary-300 text-slate-700 transition"
                  placeholder="Ahmet"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Soyad</label>
                <input 
                  required
                  type="text" 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full bg-slate-50 py-3.5 px-4 rounded-[1.25rem] border-none outline-none focus:ring-2 focus:ring-primary-300 text-slate-700 transition"
                  placeholder="Yılmaz"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">E-posta Adresi</label>
              <input 
                required
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-slate-50 py-3.5 px-4 rounded-[1.25rem] border-none outline-none focus:ring-2 focus:ring-primary-300 text-slate-700 transition"
                placeholder="ogretmen@okul.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Uzmanlık Alanı (Branş)</label>
              <input 
                required
                type="text" 
                value={formData.expertise}
                onChange={(e) => setFormData({...formData, expertise: e.target.value})}
                className="w-full bg-slate-50 py-3.5 px-4 rounded-[1.25rem] border-none outline-none focus:ring-2 focus:ring-primary-300 text-slate-700 transition"
                placeholder="Örn: Matematik, Tarih"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Kısa Biyografi</label>
              <textarea 
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className="w-full bg-slate-50 py-3.5 px-4 rounded-[1.25rem] border-none outline-none focus:ring-2 focus:ring-primary-300 text-slate-700 transition resize-none"
                placeholder="Kendinizden biraz bahsedin..."
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="w-full py-4 rounded-[1.25rem] font-bold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-soft hover:shadow-softHover transition mt-4"
            >
              Kaydı Tamamla
            </button>
          </form>

          <p className="text-center text-slate-500 mt-8 font-medium">
            Zaten bir hesabınız var mı? <Link to="/login" className="text-primary-600 font-bold hover:underline">Giriş Yapın</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
