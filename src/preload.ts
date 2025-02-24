import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('videoUtils', {
  getVideoFiles: (folderPath: string) => ipcRenderer.invoke('get-video-files', folderPath),
});


contextBridge.exposeInMainWorld('secureStorage', {
  encrypt: (data: string) => {
    console.log('Encryption request:', data);
    return ipcRenderer.invoke('encrypt-data', data);
  },
  decrypt: (buffer: Buffer) => ipcRenderer.invoke('decrypt-data', buffer)
});