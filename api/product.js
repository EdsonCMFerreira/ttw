// app/api/product.js

const ProdutoDao = require('./product-dao');

app.get('/products', (req, res, next) => 
    new ProductDao(req.connection)
    .list()
    .then(products => res.json(products))
    .catch(next)
);