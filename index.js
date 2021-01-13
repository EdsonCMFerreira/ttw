const http = require('http');
const fs = require('fs').promises;
const host = 'localhost';
const sql = require('mssql');
const connStr1 = "Server='DESKTOP-TKT2S2J\\NEWSQL'; Database=Db; User Id=sa; Password=321654987;";
const connStr = "Server=kasrvdb01; Database=DB_Site; User Id=sa; Password=K@lunga;";

const express = require('express')
//const expressOasGenerator = require('express-oas-generator');
const app = express()
const port = 3000
//expressOasGenerator.getSpec().parameters;

//expressOasGenerator.init(app,{} ); 

// Load the full build.

// var _ = require('lodash');npom
// expressOasGenerator.init(app, function(spec) {
//     _.set(spec, 'info.title', 'New Title');
//     _.set(spec, 'paths[\'/path\'].get.parameters[0].example', 2);
//     return spec;
// });

// expressOasGenerator.init(
//     app,
//     function(spec) { return spec; },
//     'path/to/a/file/filename.json',
//     60 * 1000,
//     'api-docs',
//     ['User', 'Student'],
//     ['users', 'students'],
//     ['production'],
//     true
//   )


//fazendo a conexão global
sql.connect(connStr)
   .then(conn => global.conn = conn)
   .catch(err => console.log(err));

function execSQLQuery(sqlQry, res){
    global.conn.request()
               .query(sqlQry)
               .then(result =>{
                 let fetch = result.recordset;
                 console.table(fetch)
                 res.end(JSON.stringify(fetch));
               })
               .catch(err => res.end(err));
}


// app.get('/ariel', (req, res) => {
//     res.send('Hello World!')
// })


app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})


app.get('/consulta', (req, res) => {
    fs.readFile(__dirname + "/consultas.html")
    .then(contents => {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(contents);
    })
})


app.get('/', (req, res) => {
    fs.readFile(__dirname + "/index.html", {"flag": 'rs'})
    .then(contents => {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(contents);
    })
})


app.get('/produtos', (req, res) => {
    execSQLQuery('SELECT top 20 cd_produto, nm_produto, qtd_estoque, vl_precovenda FROM TB_PRODUTO', res);
})


app.get('/apiproduto', (req, res) => {
    execSQLQuery('SELECT top 10 cd_produto, nm_produto, qtd_estoque, vl_precovenda FROM TB_PRODUTO', res);
})


app.get('/teste', (req, res) => {
    fs.readFile(__dirname + "/teste.html", function(err, data){
        res.end(data);
    })
})
