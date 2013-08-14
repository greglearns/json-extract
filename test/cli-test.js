require('./test-helper')
var expect = require('chai').expect
var exec = require('child_process').exec
var path = require('path')
var fs = require('fs')

describe('CLI tool', function () {

  this.slow(200)

  var cmd,
      key,
      value,
      filePath

  before(function () {
    filePath = path.join(__dirname, 'fixture', 'good.json')
    var record = validRecord()
    key = record.key
    value = record.value

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

    exec(command(), {}, function (err, stdout, stderr) {
      expect(err).to.not.exist
      expect(stdout).to.equal(value)
      expect(stderr).to.be.empty
      done()
    })

  })

  it('should print usage information if a required field is missing', function (done) {
    removeOneArgument()

    exec(command(), {}, function (err, stdout, stderr) {
      expect(stderr).to.match(/missing required arguments/i)
      done()
    })

  })

  function removeOneArgument () {
    cmd.splice(2, 2)
  }

  function command () {
    return cmd.join(' ')
  }

  function validRecord () {
    var data = fixture()
    var key = Object.keys(data)[0]
    var value = data[key]
    return {
      key: key,
      value: value
    }
  }

  function fixture () {
    console.log("I am loaded")
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  }

})

