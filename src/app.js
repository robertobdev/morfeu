var mysql = require('mysql');
const fs = require('fs');
const selectBuilder = require('./selectBuilder');
const insertBuilder = require('./insertBuilder');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'adonis',
  multipleStatements: true,
});

const app = () => {
  const tables = [
    {
      alias: 'us',
      table: 'user'
    },
  ];

  const sql = selectBuilder(tables, [1, 2, 3]);
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    // connected!
    let insert = '';
    results.forEach((result, index) => {
      insert += insertBuilder(result, tables[index].table);
    });
    fs.writeFileSync('insert.sql', insert);
    exit();
  });
};

const exit = (value) => {
  console.log(`LOG:`, value);
  process.exit();
};

app();
