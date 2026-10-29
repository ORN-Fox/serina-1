const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('serinaApp', {
  platform: process.platform,
  versions: process.versions,
  apiBaseUrl: 'http://127.0.0.1:7777/api'
})
