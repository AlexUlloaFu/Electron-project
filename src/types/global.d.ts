interface Window {
    secureStorage: {
      encrypt: (data: string) => Promise<Buffer>;
      decrypt: (buffer: Buffer) => Promise<string>;
    };
}