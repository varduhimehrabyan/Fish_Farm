const {Pool} = require('pg');
require('dotenv').config()
// const secureEnv = require('secure-env');
global.env = process.env
// secureEnv({secret:'Zh-43VTW4fGVZK6fW4Ls'});
console.log(process.env.user);

const pool = new Pool({
  user: process.env.user,
  password: process.env.password,
  host: process.env.host,
  port: process.env.port,
  database: process.env.database
})

  module.exports = pool;