'use strict'

const express = require ('express')
const moduleGroups = express.Router()
const jsonfile = require('jsonfile')

let constants = require('../utils/constants')
let utilities = require('../utils/utilities')

let core = require('./core')

moduleGroups.post(constants.PATH_API + '/group/:action', (req, res) => {
  const action = req.params.action
  const languages = req.body.languages

  let files = []
  languages.map((file, index) => {
    files[index] = constants.PATH_JSON_FOLDER + '/' + languages[index] + '.json'
  })

  const levelsIsDefined = utilities.isDefined(req.body.levels)
  const levels = levelsIsDefined ? req.body.levels.split('/') : undefined
  let groupName = req.body.groupName
  let originalGroupName = req.body.originalGroupName
  let i = 0

  files.map((file, index) => {
    jsonfile.readFile(file, (err, obj) => {
      if (err) { console.log('Error on read json file : ' + file, 'err', err) }

      switch (action) {
        case constants.ADD:
          if (levelsIsDefined) {
            core.targetLevelForAction(obj, levels, i, index, action, groupName)
          } else {
            obj[groupName] = {}
          }
          break

        case constants.UPDATE:
          if (levelsIsDefined) {
            core.targetLevelForAction(obj, levels, i, index, action, originalGroupName, groupName)
          } else {
            let contentOfGroup = obj[originalGroupName]
            delete obj[originalGroupName]
            obj[groupName] = contentOfGroup
          }
          break

        case constants.DELETE:
          if (levelsIsDefined) {
            core.targetLevelForAction(obj, levels, i, index, action, groupName)
          } else {
            delete obj[groupName]
          }
          break
      }

      obj = utilities.sortJSON(obj)

      jsonfile.writeFile(file, obj, (err) => {
        if (err) { return console.log('Error on ' + action + ' group name on json file : ' + file, 'err', err) }
      })
    })
  })
  res.sendStatus(200)
})

module.exports = moduleGroups
