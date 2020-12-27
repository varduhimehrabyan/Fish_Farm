const {Pool} = require('pg')

require('dotenv').config()
global.process.env = process.env

const pool = new Pool({
    user: 'postgres',
    password: 'windows7',
    host: 'localhost',
    port: 5432,
    database: "Dzuk"
  })

  module.exports = pool;