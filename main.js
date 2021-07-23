const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const { downloadMp4, downloadMp3 } = require('./fileGen')

let win;
function createWindow () {
    win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true
    }})
  
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      })
})


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})


let formData;
ipcMain.on('formData', (event, arg) => {
  formData = arg
  console.log(formData);
});


let dir;
ipcMain.on('selectDirectory', async(event) => {
  dir = await dialog.showOpenDialog({properties: ['openDirectory']});
  console.log(dir.filePaths[0])

  if (formData.format === "MP4") {
    event.reply('elaborating', 'true')
    let fileElaboration = await downloadMp4(dir, formData)
    event.reply('completed', 'true')

  } else {
    event.reply('elaborating', 'true')
    let fileElaboration = await downloadMp3(dir, formData)
    event.reply('completed', 'true')
  }
});

