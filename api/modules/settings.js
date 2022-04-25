'use strict'

const express = require ('express')
const moduleSettings = express.Router()

let constants = require('../utils/constants')
let utilities = require('../utils/utilities')

moduleSettings.post(constants.PATH_API + '/settings/set-custom-translation-path', (req, res) => {

  let customTranslationsPath = req.body.customTranslationsPath

  if (utilities.isDefined(customTranslationsPath))
  {
    constants.PATH_JSON_FOLDER = customTranslationsPath == '-1' ? constants.DEFAULT_PATH_JSON_FOLDER : customTranslationsPath
    res.sendStatus(200)
  } else {
    console.error('Custom translation path "' + customTranslationsPath +  '" is incorect or invalid')
    res.sendStatus(400)
  }

})

module.exports = moduleSettings
