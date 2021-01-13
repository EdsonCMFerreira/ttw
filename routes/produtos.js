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
 * /produtos:
 *    get:
 *      tags: 
 *        - Produtos
 *      summary: Retorna todos os produtos da lista
 */
router.get('/', function(req, res, next) {
  execSQLQuery('SELECT top 20 cd_produto, nm_produto, qtd_estoque, vl_precovenda FROM TB_PRODUTO', res);
});

module.exports = router;