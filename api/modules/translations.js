'use strict'

let express = require ('express')
let moduleTranslations = express.Router()
let jsonfile = require('jsonfile')

let constants = require('./constants')
let utilities = require('./utilities')

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
            targetLevelForAction(obj, levels, i, index, action, translation)
          } else {
            obj[translation.key] = translation.value[index]
          }
          break

        case constants.UPDATE:
          if (levelsIsDefined) {
            targetLevelForAction(obj, levels, i, index, action, translation)
          } else {
            if (translation.originalKey === translation.key) {
              obj[translation.key] = translation.value[index]
            } else {
              delete obj[translation.originalKey]
              obj[translation.key] = translation.value[index]
            }
          }
          break

        case constants.DELETE:
          if (levelsIsDefined) {
            targetLevelForAction(obj, levels, i, index, action, translation)
          } else {
            delete obj[translation.key]
          }
          break
      }

      obj = utilities.sortJSON(obj)

      jsonfile.writeFile(file, obj, (err) => {
        if (err) { return console.log('Error on ' + action + ' trad on json file : ' + file, 'err', err) }
      })
    })
  })
  res.sendStatus(200)
})

module.exports = moduleTranslations
