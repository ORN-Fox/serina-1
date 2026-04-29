'use strict'

const chai = require('chai')
const expect = chai.expect

const core = require('../../modules/core')

describe('core tests', () => {

  // Groups tests

  it('add group', () => {
    expect(core.addGroup({}, 'group')).to.deep.equal({ group: {} })
    expect(core.addGroup({ group: {} }, 'pages')).to.deep.equal({ group: {}, pages: {} })

    expect(core.addGroup({}, undefined)).to.deep.equal({})
    expect(core.addGroup({}, null)).to.deep.equal({})
    expect(core.addGroup({}, '')).to.deep.equal({ '': {} })
    expect(core.addGroup({})).to.deep.equal({})
  })

  it('update group', () => {
    expect(core.updateOrRenameGroup({ group: { key: 'value' } }, 'updatedGroup', 'group')).to.deep.equal({ updatedGroup: { key: 'value' } })

    expect(core.updateOrRenameGroup({ group: { key: 'value' } }, undefined, 'group')).to.deep.equal({ group: { key: 'value' } })
    expect(core.updateOrRenameGroup({ group: { key: 'value' } }, null, 'group')).to.deep.equal({ group: { key: 'value' } })
    expect(core.updateOrRenameGroup({ group: { key: 'value' } }, '', 'group')).to.deep.equal({ '': { key: 'value' } })
  })

  it('rename group', () => {
    expect(core.updateOrRenameGroup({ group: {} }, 'renamedGroup', 'group')).to.deep.equal({ renamedGroup: {} })

    expect(core.updateOrRenameGroup({ group: {} }, undefined, 'group')).to.deep.equal({ group: {} })
    expect(core.updateOrRenameGroup({ group: {} }, null, 'group')).to.deep.equal({ group: {} })
    expect(core.updateOrRenameGroup({ group: {} }, '', 'group')).to.deep.equal({ '': {} })
  })

  it('delete group', () => {
    expect(core.deleteGroup({ group: {} }, 'group')).to.deep.equal({})

    expect(core.deleteGroup({ group: {} }, undefined)).to.deep.equal({ group: {} })
    expect(core.deleteGroup({ group: {} }, null)).to.deep.equal({ group: {} })
    expect(core.deleteGroup({ group: {} }, '')).to.deep.equal({ group: {} })
  })

  // Translations tests

  it('add translation', () => {
    expect(core.addOrUpdateTranslation({}, 0, { key: 'key', values: [ 'value', 'valeur' ] })).to.deep.equal({ key: 'value' })
    expect(core.addOrUpdateTranslation({ key: 'value' }, 0, { key: 'key2', values: [ 'value2', 'valeur2' ] })).to.deep.equal({ key: 'value', key2: 'value2' })
    expect(core.addOrUpdateTranslation({}, 1, { key: 'key', values: [ 'value', 'valeur' ] })).to.deep.equal({ key: 'valeur' })
  })

  it('update translation', () => {
    expect(core.addOrUpdateTranslation({ key: 'value' }, 1, { key: 'key', values: [ 'value', 'valeur' ] })).to.deep.equal({ key: 'valeur' })

    expect(core.addOrUpdateTranslation({ key: 'value' }, -1, { key: 'key', values: [ 'value', 'valeur' ] })).to.deep.equal({ key: 'value' })
    expect(core.addOrUpdateTranslation({ key: 'value' }, 2, { key: 'key', values: [ 'value', 'valeur' ] })).to.deep.equal({ key: 'value' })
    expect(core.addOrUpdateTranslation({ key: 'value' }, undefined, { key: 'key', values: [ 'value', 'valeur' ] })).to.deep.equal({ key: 'value' })
    expect(core.addOrUpdateTranslation({ key: 'value' }, null, { key: 'key', values: [ 'value', 'valeur' ] })).to.deep.equal({ key: 'value' })
  })

  it('rename translation', () => {
    expect(core.renameTranslation({ key: 'value' }, 0, { key: 'updatedKey', originalKey: 'key', values: [ 'value', 'valeur' ] })).to.deep.equal({ updatedKey: 'value' })
    expect(core.renameTranslation({ key: 'value', key2: 'value2' }, 0, { key: 'updatedKey', originalKey: 'key', values: [ 'value', 'valeur' ] })).to.deep.equal({ updatedKey: 'value', key2: 'value2' })
  })

  it('delete translation', () => {
    expect(core.deleteTranslation({ key: 'value' }, { key: 'key', values: [ 'value', 'valeur' ] })).to.deep.equal({})
    expect(core.deleteTranslation({ key: 'value', key2: 'value2' }, { key: 'key2', values: [ 'value2', 'valeur2' ] })).to.deep.equal({ key: 'value' })

    expect(core.deleteTranslation({}, { key: 'key', values: [ 'value', 'valeur' ] })).to.deep.equal({})
    expect(core.deleteTranslation({}, undefined)).to.deep.equal({})
    expect(core.deleteTranslation({}, null)).to.deep.equal({})
    expect(core.deleteTranslation({}, '')).to.deep.equal({})
    expect(core.deleteTranslation({}, {})).to.deep.equal({})
  })
})
