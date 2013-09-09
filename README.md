# json-extract

Use Node.js to extract JSON values from a JSON file.

[![NPM](https://nodei.co/npm/json-extract.png)](https://nodei.co/npm/json-extract/)

[![Build Status](https://travis-ci.org/greglearns/json-extract.png?branch=master)](https://travis-ci.org/greglearns/json-extract) [![Dependency Status](https://david-dm.org/greglearns/json-extract.png)](https://david-dm.org/greglearns/json-extract)

# Usage

```bash
json-extract --file path/to/a/json/file --key THE_KEY  # will return the value associated with THE_KEY
```

Nested keys are allowed:
* --key some.nested.value: will access nested objects.
* --key an_array.5: will access an array like an_array[5].
* --key some.nested.array.5: will access the 5th entry in an array that is nested in objects.

# Installation

```bash
npm install -g json-extract
// install globally
```

# Test

```bash
make test
```

# License

MIT

