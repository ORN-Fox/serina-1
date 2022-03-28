'use strict'

const express = require ('express')
const jsonfile = require('jsonfile')
const path = require('path')
const fs = require('fs')

let constants = require('../utils/constants')
let utilities = require('../utils/utilities')

// Group related

let addGroup = (obj, groupName) => {
  obj[groupName] = {}
}

let updateOrRenameGroup = (obj, groupName, originalGroupName) => {
  let contentOfGroup = obj[originalGroupName]
  delete obj[originalGroupName]
  obj[groupName] = contentOfGroup
}

let deleteGroup = (obj, groupName) => {
  delete obj[groupName]
}

// Translation related

let addOrUpdateTranslation = (obj, index, translation) => {
  obj[translation.key] = translation.value[index]
}

let renameTranslation = (obj, index, translation) => {
  delete obj[translation.originalKey]
  obj[translation.key] = translation.value[index]
}

let deleteTranslation = (obj, translation) => {
  delete obj[translation.key]
}

// Commons

let targetLevelForAction = (obj, levels, i, indexLanguage, action, value, newValue) => {
  for (let key in obj) {
    if (key === levels[i]) {
      if (key === levels[i] && i === levels.length - 1) {
        if (action === constants.ADD || action === constants.UPDATE) {
          if (utilities.isObject(value)) {
            if (action === constants.ADD) {
              addOrUpdateTranslation(obj[key], indexLanguage, value)
            } else {
              if (value.originalKey === value.key) {
                addOrUpdateTranslation(obj[key], indexLanguage, value)
              } else {
                renameTranslation(obj[key], indexLanguage, value)
              }
            }
          } else {
            if (action === constants.ADD) {
              addGroup(obj[key], value)
            } else {
              updateOrRenameGroup(obj[key], newValue, value)
            }
          }
          return obj
        } else if (action === constants.DELETE) {
          if (utilities.isObject(value)) {
            deleteTranslation(obj[key], value)
          } else {
            deleteGroup(obj[key], value)
          }
          return obj
        }
      }
      i++
      targetLevelForAction(obj[key], levels, i, indexLanguage, action, value, newValue)
    }
  }
}

module.exports = {

  // Group

  addGroup: (obj, groupName) => addGroup(obj, groupName),

  updateOrRenameGroup: (obj, groupName, originalGroupName) => updateOrRenameGroup(obj, groupName, originalGroupName),

  deleteGroup: (obj, groupName) => deleteGroup(obj, groupName),

  // Translation

  addOrUpdateTranslation: (obj, index, translation) => addOrUpdateTranslation(obj, index, translation),

  renameTranslation: (obj, index, translation) => renameTranslation(obj, index, translation),

  deleteTranslation: (obj, translation) => deleteTranslation(obj, translation),

  // Commons

  createFolderIsNotExist: (pathFolder) => {
    if (!fs.existsSync(path.join(__dirname, pathFolder))) {
      fs.mkdir(path.join(__dirname, pathFolder), (err) => {
        if (!err || (err && err.code === 'EEXIST')) {
          console.log('Successful creation for the', pathFolder, 'folder on path', __dirname)
        } else {
          console.error('Error on create folder', pathFolder, 'on path', __dirname, err)
        }
      })
    }
  },

  targetLevelForAction: (obj, levels, i, indexLanguage, action, value, newValue) => targetLevelForAction(obj, levels, i, indexLanguage, action, value, newValue)

}
