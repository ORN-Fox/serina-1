'use strict'

const chai = require('chai')
const expect = chai.expect

const utilities = require('../utils/utilities')

const core = require('../modules/core')
const languages = require('../modules/languages')

require('./modules/core-test')

describe('check entities', () => {
  it('check levels is defined', () => {
    expect(utilities.isDefined('/language/fr/actions')).to.equal(true)
    expect(utilities.isDefined('/language/fr/')).to.equal(true)
    expect(utilities.isDefined(['en', 'fr'])).to.equal(true)
    expect(utilities.isDefined({ code: 'fr', nbEntities: 75 })).to.equal(true)

    expect(utilities.isDefined(0)).to.equal(true)
    expect(utilities.isDefined('')).to.equal(true)

    expect(utilities.isDefined(null)).to.equal(false)
    expect(utilities.isDefined(undefined)).to.equal(false)
  })

  it('check entities is a object', () => {
    expect(utilities.isObject({ key: 'hello', value: 'hello' })).to.equal(true)
    expect(utilities.isObject(['en'])).to.equal(true)
    expect(utilities.isObject(null)).to.equal(true)

    expect(utilities.isObject('hello')).to.equal(false)
    expect(utilities.isObject(undefined)).to.equal(false)
  })

  it('check is array', () => {
    expect(utilities.isArray(['en', 'fr'])).to.equal(true)
    expect(utilities.isArray([{ a: 1 }, { b: 2 }])).to.equal(true)

    expect(utilities.isArray({ key: 'hello', value: 'hello' })).to.equal(false)
    expect(utilities.isArray(1)).to.equal(false)
    expect(utilities.isArray('en')).to.equal(false)
    expect(utilities.isArray('')).to.equal(false)
    expect(utilities.isArray(undefined)).to.equal(false)
    expect(utilities.isArray(null)).to.equal(false)
  })

  it('check is plain object', () => {
    expect(utilities.isPlainObject({ key: 'hello', value: 'hello' })).to.equal(true)
    expect(utilities.isPlainObject({})).to.equal(true)

    expect(utilities.isPlainObject(['en', 'fr'])).to.equal(false)
    expect(utilities.isPlainObject([{ a: 1 }, { b: 2 }])).to.equal(false)
    expect(utilities.isPlainObject(1)).to.equal(false)
    expect(utilities.isPlainObject('en')).to.equal(false)
    expect(utilities.isPlainObject('')).to.equal(false)
    expect(utilities.isPlainObject()).to.equal(false)
    expect(utilities.isPlainObject(undefined)).to.equal(false)
    expect(utilities.isPlainObject(null)).to.equal(false)
  })
})

describe('sort json', () => {
  it('asc sort', () => {
    expect(utilities.sortJSON({ "validate": "validate", "cancel": "cancel" })).to.deep.equal({ "cancel": "cancel", "validate": "validate" })
    expect(utilities.sortJSON({ "d": { "value": 1}, "a": "hello" })).to.deep.equal({ "a": "hello", "d": { "value": 1} })
    expect(utilities.sortJSON({ a: 2 })).to.deep.equal({ a: 2})
    expect(utilities.sortJSON([{ "welcome": "welcome" }])).to.deep.equal([{ "welcome": "welcome" }])
    expect(utilities.sortJSON({})).to.deep.equal({})
    expect(utilities.sortJSON([])).to.deep.equal([])

    expect(utilities.sortJSON(0)).to.deep.equal(0)
    expect(utilities.sortJSON('hello')).to.deep.equal('hello')
    expect(utilities.sortJSON('')).to.deep.equal('')
    expect(utilities.sortJSON(null)).to.deep.equal(null)
    expect(utilities.sortJSON(undefined)).to.deep.equal(undefined)
  })
})

describe('manipulate translations', () => {
  it('count only translations', () => {
    expect(languages.countTranslations({ "a": 1, "b": 2, "c": 3 })).to.equal(3)
    expect(languages.countTranslations({ "validate": "validate", "cancel": "cancel" })).to.equal(2)

    expect(languages.countTranslations({ "actions": { "validate": "validate", "cancel": "cancel" }, "welcome": "welcome" })).to.equal(3)
    expect(languages.countTranslations({ "actions": { "validate": "validate", "cancel": "cancel" }, "toast": {}, "welcome": "welcome" })).to.equal(3)

    expect(languages.countTranslations({})).to.equal(0)
    expect(languages.countTranslations([])).to.equal(0)
    expect(languages.countTranslations(undefined)).to.equal(0)
    expect(languages.countTranslations(null)).to.equal(0)
    expect(languages.countTranslations('')).to.equal(0)
    expect(languages.countTranslations()).to.equal(0)
  })
})
