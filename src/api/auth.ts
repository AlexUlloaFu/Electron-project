// src/api/auth.ts
import { secureStorage } from '../utils/storage';

export interface AuthResponse {
  token?: string;
  error?: string;
}

export const authService = {
  async storeToken(token: string): Promise<void> {
    await secureStorage.storeToken(token);
  },

  async getToken(): Promise<string | null> {
    return await secureStorage.getToken();
  },

   clearToken: async() : Promise<void> => {
    secureStorage.clearToken();
  },

  register: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      return await response.json();
    } catch (error) {
      return { error: 'Connection failed' };
    }
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      return await response.json();
    } catch (error) {
      return { error: 'Connection failed' };
    }
  },
};