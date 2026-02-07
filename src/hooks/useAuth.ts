import { useState, useEffect } from 'react';
import { User, LoginCredentials } from '@/types';
import * as authService from '@/services/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const unsubscribe = authService.onAuthChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setError('');
    setLoading(true);

    try {
      const user = await authService.login(credentials);
      setUser(user);
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setError('');
    setLoading(true);

    try {
      await authService.logout();
      setUser(null);
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer logout');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
  };
}
