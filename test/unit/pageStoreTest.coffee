chai      = require 'chai'
sinon     = require 'sinon'
sinonChai = require 'sinon-chai'

chai.should()
chai.use sinonChai

Store       = require '../../src/stores'
PageStore   = require '../../src/stores/PageStore'
PageActions = require '../../src/actions/PageActions'

describe 'PageStore', ->
  describe '#getPages()', ->
    it 'should return an array of pages', ->
      pages = PageStore.getPages()
      pages.should.be.an 'array'

  describe '#getPageById()', ->
    it 'should return the page with the id given', ->
      page = title: 'Foo Bar'
      PageActions.createPage page
      uuids = PageStore.getPages().map (page) -> page.uuid
      last  = uuids[uuids.length - 1]
      query = PageStore.getPageById last
      query.should.equal page

  describe '#getLastPage()', ->
    page = title: 'Baz Bar'
    PageActions.createPage page
    PageStore.getLastPage().should.equal page

  describe '#getFirstPage()', ->
    first = PageStore.getPages()[0]
    PageStore.getFirstPage().should.equal first
