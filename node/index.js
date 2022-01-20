const express = require('express')
const mysql = require('mysql');


const app = express()

const port = 3000;

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

const connection = mysql.createConnection(config);

const createSql = `CREATE TABLE IF NOT EXISTS people(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))`;
const insertSql = `INSERT INTO people(name) values ('Raul')`;
const selectSql = `SELECT * FROM people`;

connection.query(createSql);
connection.query(insertSql);

let people;

connection.query(selectSql, (err, result, fields) => {
  people = result; 
});

connection.end();

let peopleString = '';

app.get('/', (req, res) => {
   people.forEach(p => {
    peopleString += `<p>${p.name}</p>`
  })
  
  res.send(`
    <h1>Full Cycle</h1>

    ${peopleString}
  `)

  peopleString = '';
});

app.listen(port, () => {
  console.log(`rodando na porta ${port}`)
})