require('./test-helper')
var expect = require('chai').expect
var exec = require('child_process').exec
var path = require('path')
var fs = require('fs')

describe('CLI tool', function () {

  var slowThresholdInMS = 200
  this.slow(slowThresholdInMS)

  var cmd,
      key,
      value,
      filePath

  var cachedValidRecord,
      cachedData

  before(function () {
    filePath = path.join(__dirname, 'fixture', 'good.json')
    key = validRecord().key
    value = validRecord().value
    expect(value).to.not.be.empty
  })

  beforeEach(function () {
    var cliPath = path.join(__dirname, '..', 'cli.js')
    cmd = [
      'node', cliPath,
      '--file', filePath,
      '--key', key
    ]
  })

  it('happy path: can read a file and extract a key', function (done) {
    verify({ stdoutExpected: value }, done)
  })

  it('should print usage information if a required field is missing', function (done) {
    removeArgFromCommand()
    verify({ stderrExpected: /missing required arguments/i, errExpected: true }, done)
  })

  it ('should return a JSON string if --json is included', function (done) {
    addArgToCommand('--json')
    verify({ stdoutExpected: JSON.stringify(value) }, done)
  })

  it ('should return a JSON boolean correctly', function (done) {
    var key = 'a_boolean'
    replaceKeyWith(key)
    addArgToCommand('--json')
    expect(fixture()[key]).to.equal(true)
    verify({ stdoutExpected: JSON.stringify(true)}, done)
  })

  it ('should return a JSON array correctly', function (done) {
    var key = 'an_array'
    replaceKeyWith(key)
    addArgToCommand('--json')
    var value = fixture()[key]
    expect(value).to.be.an("array")

    var expectedOutput = JSON.stringify(value).replace(/(\[|\])/, "\\$1")
    verify({ stdoutExpected: expectedOutput }, done)
  })


  // HELPER FUNCTIONS

  function verify (params, cb) {
    exec(command(), {}, function(err, stdout, stderr) {
      expectMatch(stdout, params.stdoutExpected || '')
      expectMatch(stderr, params.stderrExpected || '')
      expect(!!err).to.equal(!!params.errExpected)
      cb()
    })
  }

  function expectMatch (obj, expected) {
    if (typeof expected  === 'string') {
      expected = new RegExp('^' + expected + '$')
    }
    expect(obj).to.match(expected)
  }

  function removeArgFromCommand () {
    cmd.splice(2, 2)
  }

  function addArgToCommand (arg) {
    cmd.push(arg)
  }

  function replaceKeyWith(val) {
    var keyIndex = cmd.indexOf(key)
    expect(keyIndex).to.be.at.least(0)
    cmd[keyIndex] = val
  }

  function command () {
    return cmd.join(' ')
  }

  function validRecord () {
    if (!cachedValidRecord){
      var data = fixture()
      var key = Object.keys(data)[0]
      var value = data[key]

      cachedValidRecord = {
        key: key,
        value: value
      }
    }
    return cachedValidRecord
  }

  function fixture () {
    if (!cachedData) {
      cachedData = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    }
    return cachedData
  }

})

