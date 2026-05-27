'use strict'

const express = require ('express')
const moduleLanguages = express.Router()
const jsonfile = require('jsonfile')
const fs = require('fs')
const path = require('path')
const multer  = require('multer')
const httpStatusCodes = require('http-status-codes').StatusCodes

let constants = require('../utils/constants')
let utilities = require('../utils/utilities')

jsonfile.spaces = constants.JSON_NB_SPACES_INDENT

let createLanguage = (res, languageCode) => {
  jsonfile.writeFile(constants.PATH_JSON_FOLDER + '/' + languageCode + '.json', { }, { spaces: constants.JSON_NB_SPACES_INDENT }, (err) => {
    if (err) { return console.log('Error on create ' + languageCode + '.json file', err) }
    res.send({})
  })
}

let deleteLanguage = (res, languageCode) => {
  fs.stat(constants.PATH_JSON_FOLDER + '/' + languageCode + '.json', (err) => {
    if (err) { return console.error(err) }

    fs.unlink(constants.PATH_JSON_FOLDER + '/' + languageCode + '.json', (err) => {
      if (err) { return console.log(err) }
      console.log('file "' + languageCode + '.json" deleted successfully')
      res.send({})
    })
  })
}

moduleLanguages.isValidLanguageCode = (languageCode) => {
  let regex = new RegExp(/^\w{2}-\w{2}$/m)
  return typeof languageCode === 'string' && languageCode.length === 5 && regex.test(languageCode)
}

moduleLanguages.countTranslations = (obj) => {
  if (!obj || !utilities.isObject(obj) || !utilities.isDefined(obj)) {
    return 0
  }
  let count = 0
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]
      if (typeof value === 'object' && value !== null) {
        count += moduleLanguages.countTranslations(value)
      } else {
        count++
      }
    }
  }
  return count
}

moduleLanguages.get(constants.PATH_API + '/languages', async (_req, res) => {
  try {
    const files = await fs.promises.readdir(constants.PATH_JSON_FOLDER)
    const languages = await Promise.all(files.map(async (fileName) => {
      const filePath = path.join(constants.PATH_JSON_FOLDER, fileName)
      const content = await jsonfile.readFile(filePath)
      return {
        code: fileName.replace('.json', ''),
        nbTranslations: moduleLanguages.countTranslations(content)
      }
    }))
    res.send(languages)
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
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
    res.sendStatus(httpStatusCodes.BAD_REQUEST)
  }
})

moduleLanguages.post(constants.PATH_API + '/language/import', (req, res) => {
  let storage = multer.diskStorage({
    destination: constants.PATH_JSON_FOLDER,
    filename: function (_req, file, cb) {
      if (fs.existsSync(path.join(constants.PATH_JSON_FOLDER, file.originalname))) {
        return
      } else {
        cb(null, file.originalname)
      }
    }
  })

  let upload = multer({ storage: storage }).single('file')

  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error('Error', err)
      res.sendStatus(httpStatusCodes.INTERNAL_SERVER_ERROR)
    } else if (err) {
      console.error('Unknow err', err)
      res.sendStatus(httpStatusCodes.INTERNAL_SERVER_ERROR)
    }

    res.send({})
  })
})

module.exports = moduleLanguages
