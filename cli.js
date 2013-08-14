var argv = require('optimist')
    .demand(['file', 'key'])
    .describe({file: 'path/to/a/json/file.json', key: 'the_json_key', json: 'output value as a JSON string'})
    .usage('Extract a JSON value from a JSON file.')
    .alias({f: 'file', k: 'key'}).argv
var fs = require('fs')
var extract = require('./')

function go () {
  var json = fs.readFileSync(argv.file, 'utf8')
  var value = extract({json: json, key: argv.key})
  var output = argv.json ? JSON.stringify(value) : value.toString()
  process.stdout.write(output)
}

go()

