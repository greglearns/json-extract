var assert = require('assert')

module.exports = function (args) {
	validateArgs(args)
	return JSON.parse(args.json)[args.key]
}

function validateArgs (args) {
	assert.ok(typeof args === 'object', 'You must pass an object with keys [json, key]')
	assert.ok(args.hasOwnProperty("json"), 'You must pass in an object that has a "json" key.')
	assert.ok(args.hasOwnProperty("key"), 'You must pass in an object that has a "key" key.')
}

