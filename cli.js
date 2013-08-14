var fs = require('fs')
var optimist = require('optimist')
var extract = require('./')

var argv = optimist
    .usage('Extract a JSON value from a JSON file.')
    .demand(['file', 'key'])
    .describe({
      file: 'path/to/a/json/file.json',
      key: 'the_json_key',
      json: 'output value as a JSON string'
    })
    .alias({
      f: 'file',
      k: 'key'
    }).argv

function loadAndExtract () {
  var json = fs.readFileSync(argv.file, 'utf8')
  var value = extract({ json: json, key: argv.key })
  return argv.json ? JSON.stringify(value) : value.toString()
}

function writeOutput(str) {
  process.stdout.write(str)
}

writeOutput(loadAndExtract())

