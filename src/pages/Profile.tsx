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
    <div className="min-h-screen pb-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        
        <main className="max-w-3xl mx-auto">
          <div className="bg-white rounded-[2rem] shadow-card border border-slate-50 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-primary-400 to-primary-600"></div>
            
            <div className="px-8 pb-8">
              <div className="relative flex justify-between items-end -mt-12 mb-8">
                <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-white shadow-soft">
                  <img src={currentUser.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <button 
                  onClick={handleLogout}
                  className="px-6 py-2 bg-red-50 text-red-600 rounded-full font-bold text-sm hover:bg-red-100 transition"
                >
                  Çıkış Yap
                </button>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-extrabold text-slate-800">{currentUser.firstName} {currentUser.lastName}</h2>
                <p className="text-primary-600 font-medium">{currentUser.email}</p>
              </div>

              {message && (
                <div className="bg-emerald-50 text-emerald-600 p-4 rounded-[1rem] mb-6 text-sm font-medium border border-emerald-100">
                  {message}
                </div>
              )}

              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Ad</label>
                    <input 
                      type="text" 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full bg-slate-50 py-3.5 px-4 rounded-[1.25rem] border-none outline-none focus:ring-2 focus:ring-primary-300 text-slate-700 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Soyad</label>
                    <input 
                      type="text" 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full bg-slate-50 py-3.5 px-4 rounded-[1.25rem] border-none outline-none focus:ring-2 focus:ring-primary-300 text-slate-700 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Uzmanlık Alanı</label>
                  <input 
                    type="text" 
                    value={formData.expertise}
                    onChange={(e) => setFormData({...formData, expertise: e.target.value})}
                    className="w-full bg-slate-50 py-3.5 px-4 rounded-[1.25rem] border-none outline-none focus:ring-2 focus:ring-primary-300 text-slate-700 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Kısa Biyografi</label>
                  <textarea 
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    className="w-full bg-slate-50 py-3.5 px-4 rounded-[1.25rem] border-none outline-none focus:ring-2 focus:ring-primary-300 text-slate-700 transition resize-none"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full sm:w-auto px-8 py-3.5 rounded-[1.25rem] font-bold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-soft hover:shadow-softHover transition flex items-center justify-center gap-2 mt-4"
                >
                  <FaUserEdit />
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
