// product-dao.js
class ProductDao {

    constructor(connection) {

        this._connection = connection;
    }

    list() {

        return new Promise((req, res) => 
            this._connection.query('SELECT top 1 cd_produto, nm_produto, qtd_estoque, vl_precovenda FROM TB_PRODUTO', (err, products) => {
                if(err) return reject(err);
                resolve(products);
            })
        );
    }
    // outros métodos de persistência
}