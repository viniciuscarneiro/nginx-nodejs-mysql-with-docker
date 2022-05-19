const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user:'root',
    password: 'root',
    database: 'nodedb',
    port: '3306'
}
const mysql = require('mysql')
const connection = mysql.createConnection(config)
const sql = `INSERT INTO people(name) values ('Vinícius Carneiro de Brito')`
connection.query(sql)
connection.end()

app.get('/', (req, res)=>{
    res.send('<h1>Test com NodeJS</h1>')
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})