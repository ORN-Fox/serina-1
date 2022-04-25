'use strict'

const chai = require('chai')
const expect = chai.expect

const languages = require('../../modules/languages')

describe('languages module tests', () => {

  it ('check language code validity', () => {
    expect(languages.isValidLanguageCode('en-US')).to.equal(true)
    expect(languages.isValidLanguageCode('fr-FR')).to.equal(true)

    expect(languages.isValidLanguageCode('en')).to.equal(false)
    expect(languages.isValidLanguageCode('FR')).to.equal(false)
    expect(languages.isValidLanguageCode('english')).to.equal(false)
    expect(languages.isValidLanguageCode('')).to.equal(false)
    expect(languages.isValidLanguageCode(null)).to.equal(false)
    expect(languages.isValidLanguageCode(undefined)).to.equal(false)
    expect(languages.isValidLanguageCode()).to.equal(false)
  })

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
