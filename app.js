var express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const port = 3000;

var produtosRouter = require('./routes/produtos');
var clientesRouter = require('./routes/clientes');

const options = {
  swaggerDefinition: {
    info: {
      title: 'Sistema API',
      version: '1.0.0',
      description: 'Teste de auto documentação de API com Swagger'
    },
    host: "localhost:3000",
    basePath: "/",
    swagger: "2.0"
  },
  apis: ['./routes/*.js']
};

var cssOptions = {
  customCss: `
  .swagger-ui .topbar { display:none }
  .swagger-ui .scheme-container { display:none }
  .swagger-ui .try-out { display:none }`,
  customSiteTitle: "Nardin APIs"
};

const specs = swaggerJsdoc(options);

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/produtos', produtosRouter);
app.use('/clientes', clientesRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs, cssOptions));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
        
})

app.get('/consultas', (req, res) => {
    res.sendFile(__dirname + "/views/consultas.html")
  
})

app.listen(port, () => {
  console.log(`App listening at http://127.0.0.1:${port}/docs`)
})
