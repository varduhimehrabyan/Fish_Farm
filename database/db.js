const {Pool} = require('pg')

// require('dotenv').config();
// global.process.env = process.env

// const pool = new Pool({
//     user: 'postgres',
//     password: 'windows7',
//     host: 'localhost.',
//     port: 5432,
//     database: "Dzuk"
//   })

const pool = new Pool({
  user: process.env.user,
  password: process.env.password,
  host: process.env.host,
  port: process.env.port,
  database: process.env.database
})

  module.exports = pool;