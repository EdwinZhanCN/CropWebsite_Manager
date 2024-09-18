// electron-main.js
const { app, BrowserWindow } = require('electron');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 950,
        height: 650,
        minWidth: 600,  // 设置窗口的最小宽度
        minHeight: 450, // 设置窗口的最小高度'
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // 如果使用了 preload 脚本，应设置为 true
            // enableRemoteModule: true, // 如果需要使用 remote 模块，Electron 10+ 需要显式启用
        },
    });

    if (process.env.MODE === 'development') {
        mainWindow.loadURL('http://localhost:5000'); // Vite 默认端口
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile('./dist/index.html'); // 生产模式下的文件路径
    }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
