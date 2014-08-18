chai      = require 'chai'
sinon     = require 'sinon'
sinonChai = require 'sinon-chai'

chai.should()
chai.use sinonChai

AppActions   = require '../../src/actions/AppActions'

describe 'AppActions', ->
  describe '#login()', ->

