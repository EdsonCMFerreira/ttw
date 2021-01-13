var express = require('express');
var router = express.Router();

const sql = require('mssql');
const connStr = "Server=kasrvdb01; Database=DB_Site; User Id=sa; Password=K@lunga;";

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


/**
 * @swagger
 * /clientes:
 *    get:
 *      tags: 
 *        - Clientes
 *      summary: Retorna todos os produtos comprados pelos cliestes
 */
router.get('/', function(req, res, next) {
  execSQLQuery('USP_TEST_EF', res);
});

module.exports = router;