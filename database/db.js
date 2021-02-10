const {Pool} = require('pg');
// require('dotenv').config()
const secureEnv = require('secure-env');
global.env = secureEnv({secret:'Zh-43VTW4fGVZK6fW4Ls'});

const pool = new Pool({
  user: global.env.user,
  password: global.env.password,
  host: global.env.host,
  port: global.env.port,
  database: global.env.database
})

  module.exports = pool;