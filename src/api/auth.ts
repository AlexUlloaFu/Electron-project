
export interface AuthResponse {
  token?: string;
  error?: string;
}

const API_URL = process.env.REACT_APP_BACKEND_URL

export const authService = {

  register: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
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
      const response = await fetch(`${API_URL}}/auth/login`, {
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