import { app, BrowserWindow, ipcMain } from 'electron';
import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'
import Store from 'electron-store';

type StoreType = {
  token: string
}

const store = new Store<StoreType>(
  {
    encryptionKey: 'your-very-secure-static-key',
    defaults: {
      token: ''
    }
  }
) ;

const isDevelopment = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';


declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      devTools: isDevelopment,      
      webSecurity: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
    },
    autoHideMenuBar: true
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow()
});


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('get-video-files', (event, folderPath) => {
  try {
    const files = fs.readdirSync(folderPath);
    return files
      .filter(file => ['.mp4', '.webm', '.ogg'].includes(path.extname(file).toLowerCase()))
      .map(file => pathToFileURL(path.join(folderPath, file)).href); // Convert to file:// URL
  } catch (error) {
    console.error('Error reading video files:', error);
    return [];
  }
});


ipcMain.handle('getStoreValue', (event, key) => {
	// @ts-expect-error ts is not getting the required type
  const value = store.get(key);
	return value
});

ipcMain.handle('setStoreValue', (event, key , value) => {
	// @ts-expect-error ts is not getting the required type
  return store.set(key,value);
});

ipcMain.handle('removeStoreValue', (event, key) => {
  console.log('el finde seman y no estar sitiento ooooo',key);
  
	// @ts-expect-error ts is not getting the required type
  return store.delete(key);
});
