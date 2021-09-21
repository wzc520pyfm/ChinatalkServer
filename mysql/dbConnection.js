const config = require('../config/config');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
});

connection.connect();

module.exports = connection;
