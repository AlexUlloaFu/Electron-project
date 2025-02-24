import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('videoUtils', {
  getVideoFiles: (folderPath: string) => ipcRenderer.invoke('get-video-files', folderPath),
});

contextBridge.exposeInMainWorld('store', {
  get: (key : string) => ipcRenderer.invoke("getStoreValue",key),
  set: (key : string, value : unknown) => ipcRenderer.invoke('setStoreValue', key, value),
  remove: (key : string) => ipcRenderer.invoke('removeStoreValue', key),
})