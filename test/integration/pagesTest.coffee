chai      = require 'chai'
sinon     = require 'sinon'
sinonChai = require 'sinon-chai'
slug      = require 'slug'

chai.should()
chai.use sinonChai

PageActions = require '../../src/actions/PageActions'
PageStore   = require '../../src/stores/PageStore'
Dispatcher  = require '../../src/dispatchers'

Dispatcher.injectTestHelpers()

describe 'Pages', ->
  describe 'PageActions', ->
    describe '#createPage()', ->
      it 'should create a page', ->
        page = title: 'Foo Bar'
        PageActions.createPage page
        PageStore.getPages().indexOf(page).should.be.greaterThan -1

      it 'should generate a uuid for the new page', ->
        PageActions.createPage title: 'Another page'
        PageStore.getPages().forEach (page) ->
          page.uuid.should.be.ok

      it 'should generate a slug for the new page', ->
        PageActions.createPage title: 'Baz bar'
        PageStore.getPages().forEach (page) ->
          page.slug.should.equal slug(page.title).toLowerCase()

    describe '#destroyPage()', ->
      it 'should require a uuid param', ->
        PageActions.destroyPage.should.throw 'Invariant Violation'

      it 'should remove the page with the targeted uuid', ->
        uuids = PageStore.getPages().map (page) -> page.uuid
        last = uuids[uuids.length  - 1]
        PageActions.destroyPage last
        affectedUuids = PageStore.getPages().map (page) -> page.uuid
        affectedUuids.indexOf(last).should.equal -1

