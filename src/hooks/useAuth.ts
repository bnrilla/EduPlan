import { useState, useEffect } from 'react';
import type { TeacherProfile } from '../interfaces';
import { v4 as uuidv4 } from 'uuid';

export const useAuth = () => {
  const [users, setUsers] = useState<TeacherProfile[]>(() => {
    const saved = localStorage.getItem('eduplan_users');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState<TeacherProfile | null>(() => {
    const saved = localStorage.getItem('eduplan_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('eduplan_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('eduplan_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('eduplan_current_user');
    }
  }, [currentUser]);

  const login = (email: string) => {
    const user = users.find(u => u.email === email.toLowerCase().trim());
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const register = (data: Omit<TeacherProfile, 'id'>) => {
    const email = data.email.toLowerCase().trim();
    if (users.find(u => u.email === email)) {
      return false; // Email already exists
    }
    
    const newProfile: TeacherProfile = {
      ...data,
      email,
      id: uuidv4(),
      avatarUrl: `https://ui-avatars.com/api/?name=${data.firstName}+${data.lastName}&background=c4b5fd&color=fff&bold=true`
    };
    
    setUsers([...users, newProfile]);
    setCurrentUser(newProfile);
    return true;
  };

  const updateProfile = (data: Partial<TeacherProfile>) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...data };
      setCurrentUser(updatedUser);
      setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return {
    currentUser,
    isAuthenticated: !!currentUser,
    login,
    register,
    updateProfile,
    logout
  };
};
