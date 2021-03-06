'use strict'

import { app, protocol, BrowserWindow, Notification, ipcMain, dialog } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import fs from 'fs'

const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1440,
    height: 800,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: (process.env.ELECTRON_NODE_INTEGRATION as unknown) as boolean,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
    // win.webContents.openDevTools()
    win.setTitle('任务清单-小灰灰')
  }
  // 设置标题
  // 设置菜单
  // win.setMenu({})
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', (e as any).toString())
    }
  }
  createWindow()
})
// push提醒func
const toastFun = (obj: {localId: number, name: string, times:number[]}, event: any) => {
  new Notification({
    title: `${obj.name}`,
    body: `即将到期，请尽快处理`
  }).show()
  event.reply('watch-reply', obj)
}

// 通信
  ipcMain.on('toast-message', (event, arg) => {
    setTimeout(() => {
      event.reply('toast-reply', 'pong')
      // 通知
      const toast = new Notification({
        title: '通知',
        subtitle: '今天的工作做完了吗？'
      })
      toast.show()
    }, 3000);
  })

  let list: number[] = []
  let now = 0
  let interval: any = null
  ipcMain.on('watch-lists', (event, arg) => {
    // event.reply('test', interval);
    clearInterval(interval)
    interval = setInterval(() => {
      now = (new Date()).valueOf()
      JSON.parse(arg).forEach((v: {times: number[], name: string, desc: string, localId: number}) => {
        const t = v.times[1] - now
        if( t <= 1000 * 60 * 10 && t > 0) {
          // 渲染层toast提示
          // !list.includes(v.localId) && event.reply('watch-reply', v) || (!list.includes(v.localId) && list.push(v.localId))
          // 进程层 系统级 toast提示
          !list.includes(v.localId) && toastFun(v, event) || (!list.includes(v.localId) && list.push(v.localId))
        }
      });
      // event.reply('test', list)
      // if(list.length === JSON.parse(arg).length) {
      //   clearInterval(interval)
      // }
    },1000)
  })

  ipcMain.on('doneCase', (event, id) => {
    // event.reply('test', id) 
    list = list.filter((v: number) => v !== id)
  })

  ipcMain.on('exportFun', (event, arg) => {

    const filters = [
      {
          name: 'export',
          extensions: ['md'] // 文件后缀名类型， 如md
      }
    ]
    const filePath = dialog.showSaveDialog({
      filters,
      defaultPath: 'export',
      title: '导出',
      buttonLabel: '导出',
    })
    filePath.then(res => {
      const app_path = app.getPath('desktop')
      fs.writeFileSync(`${app_path}/export.md`, arg, 'utf8')
    })
    
    // event.reply('toast-reply', `${app_path}/export.md`)
  })

  ipcMain.on('importFun', (event, arg) => {
    dialog.showOpenDialog({
        filters: [
            {
                name: 'MD文件',
                extensions: ['md']
            }
        ],
        properties: ['openFile'],
        message: '选择要导入的Mackdown文件',
        buttonLabel: '导入'
    }).then(res => {
      const data = fs.readFileSync(res.filePaths[0])
      event.reply('import-reply', data.toString())
    })
  })

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
