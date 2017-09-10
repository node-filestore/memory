# FileStore - Memory

Store and retreive files in memory.

## Installation

```sh
npm install --save @filestore/memory
```

## Usage

```js
const Memory = require('@filestore/memory')
const fs = require('fs')

const filestore = new Memory()
const file = fs.createReadStream('my-file.txt')

filestore.put('my-file.txt', file).then(() => {
  // "my-file.txt" is now stored in memory
})
```

## API

The API is meant to be interchangeable with any other `@filestore/...` module.

### `new Memory([options])`

Instantiates a new Memory FileStore class.

(as of now, no options exists)

### `.put(id: string, data: Input[, options: object]) => Promise<void>`

Save a file in memory.

`data` can be a `ReadableStream`, `Buffer`, `string`, `Iterable<Buffer|string>` or `Promise`.

### `.get(id: string) => ReadableStream`

Fetch a file from memory.

### `.has(id: string) => Promise<boolean>`

Check if a file exists in memory.
