/* eslint-disable */
const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');
function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: 'AMZ',
    width: 1280,
    minWidth: 600,
    height: 720,
    minHeight: 400,
    frame: false,
    webPreferences: {
      webSecurity: true,
      contextIsolation: true,
      // enableRemoteModule: true,
      nodeIntegration: true,
      // devTools: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // // this is just to start dev tools at the start of app
  // mainWindow.webContents.openDevTools();

  const startUrl = url.format({
    pathname: path.join(__dirname, './amz/build/index.html'),
    protocol: 'file:',
  });

  // mainWindow.loadURL(startUrl);
  mainWindow.loadURL('http://localhost:3000');
}

const { ipcMain } = require('electron');

ipcMain.on('minimize-window', (event) => {
  const window = BrowserWindow.fromWebContents(event.sender);
  window.minimize();
});

ipcMain.on('maximize-window', (event) => {
  const window = BrowserWindow.fromWebContents(event.sender);
  if (window.isMaximized()) {
    window.unmaximize();
  } else {
    window.maximize();
  }
});

ipcMain.on('close-window', (event) => {
  const window = BrowserWindow.fromWebContents(event.sender);
  window.close();
});

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
