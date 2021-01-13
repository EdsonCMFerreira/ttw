var express = require('express');
var conexao = require('../conexao');
var router = express.Router();

/**
 * @swagger
 * /produtos:
 *    get:
 *      tags: 
 *        - Produtos
 *      summary: Retorna todos os produtos da lista
 */
router.get('/', function (req, res, next) {
  //execSQLQuery('SELECT top 20 cd_produto, nm_produto, qtd_estoque, vl_precovenda FROM TB_PRODUTO', res);

  var exec = conexao.executeQuery('SELECT top 20 cd_produto, nm_produto, qtd_estoque, vl_precovenda FROM TB_PRODUTO');

  exec.then(result =>{
    res.json(result.recordset);
  });

});

module.exports = router;