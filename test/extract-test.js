require('./test-helper')
var expect = require('chai').expect
var extract = require('..')

describe('extract JSON values from a JSON string', function () {
  var args

  beforeEach(function () {
    var obj = {"the_key": "the_value"}
    args = {json: JSON.stringify(obj), key: "the_key"}
  })

	it('given a key, it should extract a value', function () {
		var key = "the_key"
		var value = "the value"
		var obj = {}
		obj[key] = value
		var json = JSON.stringify(obj)

		var result = extract({json: json, key: key})
		expect(result).to.equal(value)
	})

  it('throw an error if args is not passed', function () {
    expect(extract).to.throw(Error)
  })

  it('throw an error if args is not an object', function () {
    function anObjectIsRequired () { extract('hi') }
    expect(anObjectIsRequired).to.throw(Error)
  })

  it('throw an error if required arg "json" is missing', function () {
    function jsonIsARequiredArg () {
      delete args.json
      extract(args)
    }
    expect(jsonIsARequiredArg).to.throw(Error)
  })

  it('throw an error if required arg "key" is missing', function () {
    function jsonIsARequiredArg () {
      delete args.key
      extract(args)
    }
    expect(jsonIsARequiredArg).to.throw(Error)
  })

})

