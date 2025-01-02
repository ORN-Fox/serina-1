'use strict'

const express = require ('express')
const moduleSettings = express.Router()
const httpStatusCodes = require('http-status-codes').StatusCodes

let constants = require('../utils/constants')
let utilities = require('../utils/utilities')

moduleSettings.post(constants.PATH_API + '/settings/update', (req, res) => {

  let customTranslationsPath = req.body.customTranslationsPath
  let enableSortAscJson = req.body.enableSortAscJson

  if (utilities.isDefined(customTranslationsPath) && utilities.isDefined(enableSortAscJson)) {
    constants.PATH_JSON_FOLDER = customTranslationsPath == '-1' ? constants.DEFAULT_PATH_JSON_FOLDER : customTranslationsPath
    constants.ENABLE_SORT_ASC_JSON = enableSortAscJson
    res.send({})
  } else {
    console.error('Unable to update settings because is invalid or incorrect', customTranslationsPath, enableSortAscJson)
    res.sendStatus(httpStatusCodes.BAD_REQUEST)
  }

})

module.exports = moduleSettings
