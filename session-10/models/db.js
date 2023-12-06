const mysql = require('mysql');

const connections = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mahasiswa',
});

connections.connect((err) => {
  if (err) {
    console.error('🔴 Could not connect to MySql database:', err);
  } else {
    console.log('🟢 Connected to MySql database');
  }
});

module.exports = connections;
