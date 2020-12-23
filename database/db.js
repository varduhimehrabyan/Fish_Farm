const {Pool} = require('pg')

require('dotenv').config()
global.process.env = process.env

const pool = new Pool({
    user: 'postgres',
    password: 'postgressa',
    host: '192.168.88.32',
    port: 5432,
    database: "Dzuk"
  })

  module.exports = pool;