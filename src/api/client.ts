
export const apiClient = {

  get: async (url: string) => {
    return apiClient.fetchWrapper(url, 'GET');
  },

  post: async (url: string, body: unknown) => {
    return apiClient.fetchWrapper(url, 'POST', body);
  },

  fetchWrapper: async (url: string, method: string, body?: unknown) => {
    const token = await window.store.get('token').toString();
    
    const headers = {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    };

    const response = await fetch(`http://localhost:4000/api${url}`, { 
      method,
      headers,
      body: body ? JSON.stringify(body) : null
    });

    if (response.status === 401) {
      await window.store.remove('token');
      throw new Error('Session expired');
    }

    return await response.json();
  }
  
};