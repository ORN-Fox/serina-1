'use strict'

const express = require ('express')
const jsonfile = require('jsonfile')
const path = require('path')
const fs = require('fs')

let constants = require('../utils/constants')
let utilities = require('../utils/utilities')

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

module.exports = {
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

  targetLevelForAction: (obj, levels, i, indexLanguage, action, value, newValue) => {
    return targetLevelForAction(obj, levels, i, indexLanguage, action, value, newValue)
  }
}
