require('./test-helper')
var expect = require('chai').expect
var extract = require('../')

describe('extract JSON values from a JSON string', function () {
  var key = "the_key"
  var value = "the value"
  var extractParameters
  var obj

  before(function () {
    obj = {}
    obj[key] = value
  })

  beforeEach(function () {
    extractParameters = {json: JSON.stringify(obj), key: key}
  })

	it('given a key, it should extract a value', function () {
		expect(extract(extractParameters)).to.equal(value)
	})

  it('throw an error if args is not passed', function () {
    expect(extract).to.throw(Error)
  })

  it('throw an error if args is not an object', function () {
    expect(callExtractWith('not an object')).to.throw(Error)
  })

  it('throw an error if required arg "json" is missing', function () {
    expect(callExtractWithoutRequiredArg('json')).to.throw(Error)
  })

  it('throw an error if required arg "key" is missing', function () {
    expect(callExtractWithoutRequiredArg('key')).to.throw(Error)
  })

  function callExtractWithoutRequiredArg (arg) {
    delete extractParameters[arg]
    return callExtractWith(extractParameters)
  }

  function callExtractWith(params) {
    return function () {
      extract(params)
    }
  }

})

