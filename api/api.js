'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const jsonfile = require('jsonfile')
const api = express()

let constants = require('./utils/constants')
let utilities = require('./utils/utilities')

let core = require('./modules/core')
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
  core.createFolderIsNotExist('/json/')
})

module.exports = api
