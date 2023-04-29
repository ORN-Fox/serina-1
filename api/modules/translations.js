'use strict'

const express = require ('express')
const moduleTranslations = express.Router()
const jsonfile = require('jsonfile')

let constants = require('../utils/constants')
let utilities = require('../utils/utilities')

let core = require('./core')

moduleTranslations.post(constants.PATH_API + '/translation/:action', (req, res) => {
  const action = req.params.action
  const languages = req.body.languages

  let files = []
  languages.map((file, index) => {
    files[index] = constants.PATH_JSON_FOLDER + '/' + languages[index] + '.json'
  })

  const levelsIsDefined = utilities.isDefined(req.body.levels)
  const levels = levelsIsDefined ? req.body.levels.split('/') : undefined
  let translation = req.body.translation
  let i = 0

  files.map((file, index) => {
    jsonfile.readFile(file, (err, obj) => {
      if (err) { console.log('Error on read json file : ' + file, 'err', err) }

      switch (action) {
        case constants.ADD:
          if (levelsIsDefined) {
            core.targetLevelForAction(obj, levels, i, index, action, translation)
          } else {
            core.addOrUpdateTranslation(obj, index, translation)
          }
          break

        case constants.UPDATE:
          if (levelsIsDefined) {
            core.targetLevelForAction(obj, levels, i, index, action, translation)
          } else {
            if (translation.originalKey === translation.key) {
              core.addOrUpdateTranslation(obj, index, translation)
            } else {
              core.renameTranslation(obj, index, translation)
            }
          }
          break

        case constants.DELETE:
          if (levelsIsDefined) {
            core.targetLevelForAction(obj, levels, i, index, action, translation)
          } else {
            core.deleteTranslation(obj, translation)
          }
          break
      }

      obj = utilities.sortJSON(obj)

      jsonfile.writeFile(file, obj, { spaces: constants.JSON_NB_SPACES_INDENT }, (err) => {
        if (err) { return console.log('Error on ' + action + ' trad on json file : ' + file, 'err', err) }
      })
    })
  })
  res.sendStatus(200)
})

module.exports = moduleTranslations
