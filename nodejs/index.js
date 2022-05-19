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

app.get('/', (req, res)=>{
    let conn = mysql.createConnection(config)
    executeInsert(conn,
        ()=>
        executeQuery(conn,(results)=>{
            var result = results.map(function(people) {
                return '<li>' + people.name + '</li>' 
            });
            res.send(
                '<h1>Full Cycle Rocks!</h1>' + 
                '</br>' +
                '<h2><ul>'+ result.toString().replace(/,/g, '') + '</ul></h2>'
            )
        })
    )
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})

function executeQuery(conn, callback) {
    let query = 'SELECT name FROM people'
    conn.query(query, function (err, results, fields) {
        if (err) { 
            throw err
        }
        return callback(results);
    })
}

function executeInsert(conn, callback) {
    var insertSql = `INSERT INTO people(name) values ('Vinícius Carneiro de Brito - ` + Date.now().toString()+ `')`
    conn.query(insertSql, (err) =>{
        if (err) { 
            throw err
        }
        callback();
    })
    
}