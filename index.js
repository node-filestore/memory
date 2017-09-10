'use strict'

const { Readable } = require('stream')

const getStream = require('get-stream')
const intoStream = require('into-stream')
const isStream = require('is-stream')

const kMap = Symbol('map')

module.exports = class FileStoreMemory {
  constructor (options) {
    options = options || {}

    if (typeof options !== 'object' || options === null) {
      throw new TypeError('Expected options object to be provided')
    }

    this[kMap] = new Map()
  }

  put (id, data, options) {
    if (typeof id !== 'string') {
      throw new TypeError('Expected "id" to be a string')
    }

    if (!isStream(data)) {
      data = intoStream(data)
    }

    options = options || {}

    if (typeof options !== 'object') {
      throw new TypeError('Expected "options" to be an object')
    }

    return getStream.buffer(data).then((content) => {
      this[kMap].set(id, content)
    })
  }

  get (id) {
    if (typeof id !== 'string') {
      throw new TypeError('Expected "id" to be a string')
    }

    if (!this[kMap].has(id)) {
      return new Readable({
        read () { this.emit('error', Object.assign(new Error('Not found'), { code: 'ENOENT' })) }
      })
    }

    return intoStream(this[kMap].get(id))
  }

  has (id) {
    if (typeof id !== 'string') {
      throw new TypeError('Expected "id" to be a string')
    }

    return Promise.resolve(this[kMap].has(id))
  }
}
