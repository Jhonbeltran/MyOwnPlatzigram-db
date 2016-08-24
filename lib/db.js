'use strict'

const r = require('rethinkdb')
const co = require('co')
const Promise = require('bluebird')

const defaults = {
  host: 'localhost',
  port: 28015,
  db: 'platzigram'
}

class Db {
  constructor (options) {
    options = options || {}
    this.host = options.host || defaults.host
    this.port = options.port || defaults.port
    this.db = options.db || defaults.db
  }

  connect (callback) {
    this.connection = r.connect({
      host: this.host,
      port: this.port
    })

    let db = this.db
    let connection = this.connection
    let setup = co.wrap(function * () {
      let conn = yield connection
      let dbList = yield r.dbList().run(conn)
      if (dbList.indexOf(db) === -1) {
        yield r.dbCreate(db).run(conn)
      }

      let dbTables = yield r.db(db).tableList().run(conn)

      if (dbTables.indexOf('imagenes') === -1) {
        yield r.db(db).tableCreate('imagenes').run(conn)
      }

      if (dbTables.indexOf('users') === -1) {
        yield r.db(db).tableCreate('users').run(conn)
      }

      return conn
    })
    return Promise.resolve(setup()).asCallback(callback)
  }

  saveImage (image, callback) {

  }
}

module.exports = Db
