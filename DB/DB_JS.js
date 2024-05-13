const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'postDB',
  port: 3306,
  password: 'Michal2024', 
}).promise();

module.exports = pool;