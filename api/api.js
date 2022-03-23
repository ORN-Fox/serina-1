'use strict'

const express = require('express')
const bodyParser = require('body-parser')
let jsonfile = require('jsonfile')
const path = require('path')
const fs = require('fs')
const api = express()

let constants = require('./modules/constants')

let utilities = require('./modules/utilities')
let languages = require('./modules/languages')

let groups = require('./modules/groups')
let translations = require('./modules/translations')

jsonfile.spaces = constants.JSON_NB_SPACES_INDENT

api.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
api.use(bodyParser.json())
api.use('/', languages)
api.use('/', groups)
api.use('/', translations)

let createFolderIsNotExist = (pathFolder) => {
  if (!fs.existsSync(path.join(__dirname, pathFolder))) {
    fs.mkdir(path.join(__dirname, pathFolder), (err) => {
      if (!err || (err && err.code === 'EEXIST')) {
        console.log('Successful creation for the', pathFolder, 'folder on path', __dirname)
      } else {
        console.error('Error on create folder', pathFolder, 'on path', __dirname, err)
      }
    })
  }
}

let targetLevelForAction = (obj, levels, i, indexLanguage, action, value, newValue) => {
  for (let key in obj) {
    if (key === levels[i]) {
      if (key === levels[i] && i === levels.length - 1) {
        if (action === constants.ADD || action === constants.UPDATE) {
          if (utilities.isObject(value)) {
            if (action === constants.ADD) {
              obj[key][value.key] = value.value[indexLanguage]
            } else {
              if (value.originalKey === value.key) {
                obj[key][value.key] = value.value[indexLanguage]
              } else {
                delete obj[key][value.originalKey]
                obj[key][value.key] = value.value[indexLanguage]
              }
            }
          } else {
            if (action === constants.ADD) {
              obj[key][value] = {}
            } else {
              let copyContent = obj[key][value]
              delete obj[key][value]
              obj[key][newValue] = copyContent
            }
          }
          return obj
        } else if (action === constants.DELETE) {
          if (utilities.isObject(value)) {
            delete obj[key][value.key]
          } else {
            delete obj[key][value]
          }
          return obj
        }
      }
      i++
      targetLevelForAction(obj[key], levels, i, indexLanguage, action, value, newValue)
    }
  }
}

api.get(constants.PATH_API + '/', (req, res) => {
  let address = req.protocol + '://' + req.headers.host + constants.PATH_API
  res.send({
    'GET': [
      address + '/language/:code/create',
      address + '/language/:code/delete',
      address + '/language/:code/download',
      address + '/language/:code/open',
      address + '/languages'
    ],
    'POST': [
      address + '/group/add',
      address + '/group/update',
      address + '/group/delete',
      address + '/translation/add',
      address + '/translation/update',
      address + '/translation/delete'
    ]
  })
})

const server = api.listen(7777, 'localhost', () => {
  console.log('API listen on ' + server.address().address + ':' + server.address().port + ' !')
  createFolderIsNotExist('/json/')
})

module.exports = api
