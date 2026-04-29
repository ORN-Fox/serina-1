'use strict'

const chai = require('chai')
const expect = chai.expect

const utilities = require('../../utils/utilities')

describe('utilities tests', () => {
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
    expect(utilities.isObject({ key: 'hello', values: 'hello' })).to.equal(true)
    expect(utilities.isObject(['en'])).to.equal(true)
    expect(utilities.isObject(null)).to.equal(true)

    expect(utilities.isObject('hello')).to.equal(false)
    expect(utilities.isObject(undefined)).to.equal(false)
  })

  it('check is array', () => {
    expect(utilities.isArray(['en', 'fr'])).to.equal(true)
    expect(utilities.isArray([{ a: 1 }, { b: 2 }])).to.equal(true)

    expect(utilities.isArray({ key: 'hello', values: 'hello' })).to.equal(false)
    expect(utilities.isArray(1)).to.equal(false)
    expect(utilities.isArray('en')).to.equal(false)
    expect(utilities.isArray('')).to.equal(false)
    expect(utilities.isArray(undefined)).to.equal(false)
    expect(utilities.isArray(null)).to.equal(false)
  })

  it('check is plain object', () => {
    expect(utilities.isPlainObject({ key: 'hello', values: 'hello' })).to.equal(true)
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

  it('check translation validity', () => {
    expect(utilities.isValidTranslationIndex({ key: 'key', values: [ 'value', 'valeur2' ] }, 0)).to.equal(true)
    expect(utilities.isValidTranslationIndex({ key: 'key', values: [ 'value', 'valeur2' ] }, 1)).to.equal(true)

    expect(utilities.isValidTranslationIndex({ key: 'key', values: [ 'value', 'valeur2' ] }, -1)).to.equal(false)
    expect(utilities.isValidTranslationIndex({ key: 'key', values: [ 'value', 'valeur2' ] }, 2)).to.equal(false)
    expect(utilities.isValidTranslationIndex({ key: 'key', values: [ 'value', 'valeur2' ] }, 10)).to.equal(false)
    expect(utilities.isValidTranslationIndex({ key: 'key', values: [] }, 1)).to.equal(false)
    expect(utilities.isValidTranslationIndex({ key: 'key', values: [] }, -1)).to.equal(false)
    expect(utilities.isValidTranslationIndex(null, 1)).to.equal(false)
    expect(utilities.isValidTranslationIndex(undefined, 1)).to.equal(false)
  })
})
