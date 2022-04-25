'use strict'

const express = require ('express')
const moduleLanguages = express.Router()
const jsonfile = require('jsonfile')
const fs = require('fs')
const multer  = require('multer')

let constants = require('../utils/constants')
let utilities = require('../utils/utilities')

jsonfile.spaces = constants.JSON_NB_SPACES_INDENT

let createLanguage = (res, languageCode) => {
  jsonfile.writeFile(constants.PATH_JSON_FOLDER + '/' + languageCode + '.json', {}, (err) => {
    if (err) { return console.log('Error on create ' + languageCode + '.json file', err) }
    res.sendStatus(200)
  })
}

let deleteLanguage = (res, languageCode) => {
  fs.stat(constants.PATH_JSON_FOLDER + '/' + languageCode + '.json', (err) => {
    if (err) { return console.error(err) }

    fs.unlink(constants.PATH_JSON_FOLDER + '/' + languageCode + '.json', (err) => {
      if (err) { return console.log(err) }
      console.log('file "' + languageCode + '.json" deleted successfully')
      res.sendStatus(200)
    })
  })
}

moduleLanguages.isValidLanguageCode = (languageCode) => {
  let regex = new RegExp(/^\w{2}-\w{2}$/m)
  return typeof languageCode === 'string' && languageCode.length === 5 && regex.test(languageCode)
}

moduleLanguages.countTranslations = (obj) => {
  let item, nbTranslations = 0
  if (utilities.isDefined(obj) && obj !== '') {
    if (obj instanceof Object) {
      for (item in obj) {
        if (obj.hasOwnProperty(item)) {
          nbTranslations += moduleLanguages.countTranslations(obj[item])
        } else {
          break
        }
      }
    } else {
      nbTranslations++
    }
  }
  return nbTranslations
}

moduleLanguages.get(constants.PATH_API + '/languages', (req, res) => {
  let languages = []
  let files = fs.readdirSync(constants.PATH_JSON_FOLDER)

  files.forEach((fileName) => {
    let content = jsonfile.readFileSync(constants.PATH_JSON_FOLDER + '/' + fileName)
    languages.push({ code: fileName.replace('.json', ''), nbTranslations: moduleLanguages.countTranslations(content) })
  })
  res.send(languages)
})

moduleLanguages.get(constants.PATH_API + '/language/:code/:action', (req, res) => {
  let languageCode = req.params.code
  let action = req.params.action

  if (moduleLanguages.isValidLanguageCode(languageCode)) {
    switch (action) {
      case 'create':
        createLanguage(res, languageCode)
        break
      case 'delete':
        deleteLanguage(res, languageCode)
        break
      case 'download':
        res.setHeader('Content-Type', 'application/json')
        res.download(constants.PATH_JSON_FOLDER + '/' + languageCode + '.json')
        break
      case 'open':
        res.sendFile(constants.PATH_JSON_FOLDER + '/' + languageCode + '.json')
        break
    }
  } else {
    console.error('Language code is not valid', languageCode)
    res.sendStatus(400)
  }
})

moduleLanguages.post(constants.PATH_API + '/language/import', (req, res) => {
  let storage = multer.diskStorage({
    destination: constants.PATH_JSON_FOLDER,
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

  let upload = multer({ storage: storage }).single('file')

  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error('Error', err)
      res.sendStatus(500)
    } else if (err) {
      console.error('Unknow err', err)
      res.sendStatus(500)
    }

    res.sendStatus(200)
  })
})

module.exports = moduleLanguages
