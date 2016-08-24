'use strict'

const test = require('ava')
const uuid = require('uuid-base62')
const Db = require('../')

const dbName = `platzigram_${uuid.v4()}`

const db = new Db({ db: dbName })

test('save image', async t => {
  t.is(typeof db.saveImage, 'function', 'saveImage is function')
})
