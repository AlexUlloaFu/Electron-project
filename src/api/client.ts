import { authService } from './auth';

export const apiClient = {
  // Use arrow functions to preserve `this` context
  get: async (url: string) => {
    return apiClient.fetchWrapper(url, 'GET');
  },

  post: async (url: string, body: any) => {
    return apiClient.fetchWrapper(url, 'POST', body);
  },

  fetchWrapper: async (url: string, method: string, body?: any) => {
    const token = authService.getToken();
    
    const headers = {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '' // Fixed template literal
    };

    const response = await fetch(`http://localhost:4000/api${url}`, { // Fixed URL
      method,
      headers,
      body: body ? JSON.stringify(body) : null
    });

    if (response.status === 401) {
      authService.clearToken();
      throw new Error('Session expired');
    }

    return await response.json();
  }
};