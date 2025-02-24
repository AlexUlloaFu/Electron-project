export const secureStorage = {
    async storeToken(token: string): Promise<void> {
      try {
        console.log('Storing token:', token);
        console.log(window.secureStorage);
        
        const encrypted = await window.secureStorage.encrypt(token);
        console.log('Encrypted buffer:', encrypted);
        
        const base64String = encrypted.toString('base64');
        console.log('Base64 encoded:', base64String);
        
        localStorage.setItem('authToken', base64String);
        console.log('Token stored successfully');
      } catch (error) {
        throw new Error('Failed to store token');
      }
    },
  
    async getToken(): Promise<string | null> {
      try {
        const encrypted = localStorage.getItem('authToken');
        if (!encrypted) return null;
        
        const buffer = Buffer.from(encrypted, 'base64');
        return await window.secureStorage.decrypt(buffer);
      } catch (error) {
        this.clearToken();
        return null;
      }
    },
  
    clearToken(): void {
      localStorage.removeItem('authToken');
    }
};