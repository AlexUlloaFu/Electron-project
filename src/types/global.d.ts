interface Window {
    secureStorage: {
      encrypt: (data: string) => Promise<Buffer>;
      decrypt: (encryptedString: string) => Promise<string>;
    };
    store: {
      get: (key: string) => unknown;
      set: (key: string, value: unknown) => void;
      remove: (key: string) => void;
    };
    
}