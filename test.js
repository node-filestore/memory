/* eslint-env mocha */

'use strict'

const assert = require('assert')

const assertRejects = require('assert-rejects')
const getStream = require('get-stream')

const MemoryStoreMemory = require('./')

describe('FileStore - Memory', () => {
  let filestore

  before(() => {
    filestore = new MemoryStoreMemory()
  })

  describe('.put()', () => {
    const name = 'a'
    const expected = 'test1'

    it('should create a file', () => {
      return filestore.put(name, expected).then(() => {
        return getStream(filestore.get(name))
      }).then((content) => {
        assert.strictEqual(content, expected)
      })
    })
  })

  describe('.get()', () => {
    const name = 'b'
    const expected = 'test2'

    before(() => {
      return filestore.put(name, expected)
    })

    it('should stream a file', () => {
      return getStream(filestore.get(name)).then((actual) => {
        assert.strictEqual(actual, expected)
      })
    })

    it('should error when file not found', () => {
      return assertRejects(
        getStream(filestore.get('nope')),
        (err) => (err.code === 'ENOENT')
      )
    })
  })

  describe('.has()', () => {
    const name = 'c'

    before(() => {
      return filestore.put(name, 'test')
    })

    it('should report that file exists', () => {
      return filestore.has(name).then((actual) => {
        assert.strictEqual(actual, true)
      })
    })

    it('should report that file does not exists', () => {
      return filestore.has('nope').then((actual) => {
        assert.strictEqual(actual, false)
      })
    })
  })
})
