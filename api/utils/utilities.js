'use strict'

const constants = require("./constants")

let utilities = {
  isDefined: (value) => {
    return value !== undefined && value !== null
  },

  isObject: (value) => {
    return typeof value === 'object'
  },

  isArray: (val) => {
    return Object.prototype.toString.call(val) === '[object Array]'
  },

  isPlainObject: (val) => {
    return Object.prototype.toString.call(val) === '[object Object]'
  },

  isValidTranslationIndex: (translation, index) => {
    if (utilities.isDefined(translation) && utilities.isDefined(index))
      return index >= 0 && index < translation.value.length
    return false
  },

  sortJSON: (json) => {
    try {
      let r = utilities.sortAsc(json)
      return JSON.parse(JSON.stringify(r, null, 4))
    } catch (ex) {
      return json
    }
  },

  sortAsc: (un) => {
    let or = {}
    if (utilities.isArray(un)) {
      or = utilities.sortAsc()
      if (or)
      {
        or.forEach((v, i) => {
          or[i] = utilities.sortAsc(v)
        })
      }
    } else if (utilities.isPlainObject(un)) {
      or = {}
      Object.keys(un).sort((a, b) => {
        if (a.toLowerCase() < b.toLowerCase()) { return -1 }
        if (a.toLowerCase() > b.toLowerCase()) { return 1 }
        return 0
      }).forEach((key) => {
        or[key] = utilities.sortJSON(un[key])
      })
    } else {
      or = un
    }
    return or
  }

}

module.exports = utilities
