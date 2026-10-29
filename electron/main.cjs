const { app, BrowserWindow, dialog, net, protocol, utilityProcess } = require('electron')
const path = require('node:path')
const fs = require('node:fs')
const { pathToFileURL } = require('node:url')

const APP_ROOT = path.join(__dirname, '..')
const DIST_PATH = path.join(APP_ROOT, 'dist', 'serina', 'browser')
const DEV_URL = 'http://localhost:4200'
const API_HOST = process.env.SERINA_API_HOST || '127.0.0.1'
const API_PORT = process.env.SERINA_API_PORT || '7777'
const API_START_TIMEOUT_MS = 15000

protocol.registerSchemesAsPrivileged([{
  scheme: 'serina',
  privileges: {
    standard: true,
    secure: true,
    supportFetchAPI: true
  }
}])

let mainWindow
let apiProcess

function ensureUserDataFolder() {
  const dir = path.join(app.getPath('userData'), 'serina')
  fs.mkdirSync(dir, { recursive: true })
  process.env.SERINA_DATA_DIR = dir
  return dir
}

function startApi() {
  const entrypoint = path.join(
    APP_ROOT,
    'api',
    app.isPackaged ? 'dist/api.js' : 'api.js'
  )

  if (!fs.existsSync(entrypoint)) {
    console.error('API entrypoint not found:', entrypoint)
    return Promise.resolve(false)
  }

  const dataDir = ensureUserDataFolder()
  const env = {
    ...process.env,
    SERINA_DATA_DIR: dataDir,
    SERINA_API_HOST: API_HOST,
    SERINA_API_PORT: API_PORT
  }

  return new Promise((resolve) => {
    let settled = false
    const finishStartup = (ready) => {
      if (settled) {
        return
      }

      settled = true
      clearTimeout(startupTimeout)
      resolve(ready)
    }

    const startupTimeout = setTimeout(() => {
      console.error('API did not become ready before the startup timeout.')
      finishStartup(false)
    }, API_START_TIMEOUT_MS)

    apiProcess = utilityProcess.fork(entrypoint, [], {
      cwd: app.isPackaged ? app.getPath('userData') : APP_ROOT,
      env,
      serviceName: 'Serina API',
      stdio: 'inherit'
    })

    apiProcess.on('message', (message) => {
      if (message && message.type === 'api-ready') {
        finishStartup(true)
      }
    })

    apiProcess.on('exit', (code) => {
      console.log(`API process exited with code ${code}`)
      finishStartup(false)
    })

    apiProcess.on('error', (error) => {
      console.error('API process failed:', error)
    })
  })
}

function registerCustomProtocol() {
  protocol.handle('serina', (request) => {
    const requestUrl = new URL(request.url)
    const requestPath = decodeURIComponent(requestUrl.pathname).replace(/^\/+/, '')
    const resolvedPath = path.resolve(DIST_PATH, requestPath || 'index.html')
    const isInApp = resolvedPath === DIST_PATH || resolvedPath.startsWith(`${DIST_PATH}${path.sep}`)

    if (requestUrl.host !== 'app' || !isInApp) {
      return new Response('Not found', { status: 404 })
    }

    let filePath = resolvedPath
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      if (path.extname(requestPath)) {
        return new Response('Not found', { status: 404 })
      }

      filePath = path.join(DIST_PATH, 'index.html')
    }

    return net.fetch(pathToFileURL(filePath).toString())
  })
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 980,
    minHeight: 700,
    show: false,
    backgroundColor: '#ffffff',
    autoHideMenuBar: true,
    title: 'Serina',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true
    }
  })
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.webContents.setWindowOpenHandler(() => ({ action: 'deny' }))
  mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
    const parsed = new URL(navigationUrl)
    const allowedOrigins = ['serina://app', 'http://localhost:4200']

    if (!allowedOrigins.includes(parsed.origin)) {
      event.preventDefault()
    }
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  const targetUrl = app.isPackaged ? 'serina://app/' : DEV_URL
  mainWindow.loadURL(targetUrl).catch((error) => {
    console.error(`Failed to load ${targetUrl}:`, error)

    if (!app.isPackaged) {
      dialog.showErrorBox(
        'Angular development server is not running',
        'Start it in another terminal with "npm start", then relaunch Electron with "npm run electron:dev".'
      )
      app.quit()
    }
  })
}

if (!app.requestSingleInstanceLock()) {
  app.quit()
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore()
      }
      mainWindow.focus()
    }
  })
}

app.on('before-quit', () => {
  if (apiProcess) {
    apiProcess.kill()
  }
})

app.whenReady().then(async () => {
  if (app.isPackaged) {
    registerCustomProtocol()
  }

  const apiReady = await startApi()
  if (!apiReady) {
    console.error('Continuing startup without a ready API.')
  }

  createWindow()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
