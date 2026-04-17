import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Header } from '../components/Header';
import { FaUserEdit } from 'react-icons/fa';

export const Profile = () => {
  const { currentUser, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    expertise: currentUser?.expertise || '',
    bio: currentUser?.bio || ''
  });

  const [message, setMessage] = useState('');

  if (!currentUser) return null;

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setMessage('Profil başarıyla güncellendi!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen pb-24 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Header />
        
        <main className="max-w-3xl mx-auto">
          <div className="glass-panel rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/50">
            <div className="h-32 bg-gradient-to-r from-primary-400 to-primary-600 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
            </div>
            
            <div className="px-8 sm:px-12 pb-10">
              <div className="relative flex justify-between items-end -mt-16 mb-8">
                <div className="w-32 h-32 rounded-full border-4 border-white/80 overflow-hidden bg-white shadow-softHover transform transition hover:scale-105">
                  <img src={currentUser.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <button 
                  onClick={handleLogout}
                  className="px-6 py-2.5 bg-red-50/80 backdrop-blur-md border border-red-100 text-red-600 rounded-full font-bold text-sm hover:bg-red-500 hover:text-white transition shadow-sm"
                >
                  Çıkış Yap
                </button>
              </div>

              <div className="mb-10">
                <h2 className="text-3xl font-extrabold text-slate-800 drop-shadow-sm">{currentUser.firstName} {currentUser.lastName}</h2>
                <p className="text-primary-600 font-bold tracking-wide">{currentUser.email}</p>
              </div>

              {message && (
                <div className="bg-emerald-50/80 backdrop-blur-md text-emerald-600 p-4 rounded-[1.25rem] mb-8 text-sm font-bold border border-emerald-200/50 shadow-sm">
                  {message}
                </div>
              )}

              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Ad</label>
                    <input 
                      type="text" 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full bg-white/60 backdrop-blur-md py-4 px-5 rounded-[1.5rem] border border-white/50 outline-none focus:ring-2 focus:ring-primary-400 text-slate-800 transition shadow-inner font-medium text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Soyad</label>
                    <input 
                      type="text" 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full bg-white/60 backdrop-blur-md py-4 px-5 rounded-[1.5rem] border border-white/50 outline-none focus:ring-2 focus:ring-primary-400 text-slate-800 transition shadow-inner font-medium text-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Uzmanlık Alanı</label>
                  <input 
                    type="text" 
                    value={formData.expertise}
                    onChange={(e) => setFormData({...formData, expertise: e.target.value})}
                    className="w-full bg-white/60 backdrop-blur-md py-4 px-5 rounded-[1.5rem] border border-white/50 outline-none focus:ring-2 focus:ring-primary-400 text-slate-800 transition shadow-inner font-medium text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Kısa Biyografi</label>
                  <textarea 
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    className="w-full bg-white/60 backdrop-blur-md py-4 px-5 rounded-[1.5rem] border border-white/50 outline-none focus:ring-2 focus:ring-primary-400 text-slate-800 transition shadow-inner font-medium text-lg resize-none"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full sm:w-auto px-8 py-4 rounded-[1.5rem] font-bold text-lg text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-soft hover:shadow-softHover transition flex items-center justify-center gap-3 mt-6 transform hover:-translate-y-1"
                >
                  <FaUserEdit className="text-xl" />
                  <span>Profili Güncelle</span>
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
