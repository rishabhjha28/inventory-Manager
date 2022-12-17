const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:process.env.SQL_HOST,
    user:process.env.SQL_USER,
    database:process.env.SQL_DATABASE,
    password:process.env.SQL_DATABASE_PASSWORD
  });
  

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

module.exports = connection