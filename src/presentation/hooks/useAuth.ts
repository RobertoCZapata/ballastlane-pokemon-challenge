/**
 * useAuth Hook
 * Manages authentication state and operations
 */

'use client';

import { useState } from 'react';
import { TokenStorage } from '@/infrastructure/storage/TokenStorage';
import { AuthResponse } from '@/core/entities/User';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data: AuthResponse = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || 'Login failed');
        return false;
      }

      if (data.token) {
        TokenStorage.setToken(data.token);
        return true;
      }

      setError('No token received');
      return false;
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Login error:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    TokenStorage.removeToken();
  };

  const isAuthenticated = (): boolean => {
    return TokenStorage.isAuthenticated();
  };

  return {
    login,
    logout,
    isAuthenticated,
    isLoading,
    error,
  };
}
