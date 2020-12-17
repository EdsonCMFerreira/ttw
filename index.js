const http = require('http');
const fs = require('fs').promises;
const host = 'localhost';
const port = 8001;
const sql = require('mssql');
const connStr = "Server=kasrvdb01; Database=DB_Site; User Id=sa; Password=K@lunga;";
//const connStr = "Server='DESKTOP-TKT2S2J\\NEWSQL'; Database=Db; User Id=sa; Password=321654987;";

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

const requestListener = function (req, res) {
    switch (req.url) {
        
        case "/":
            fs.readFile(__dirname + "/index.html", {"flag": 'rs'})
            .then(contents => {
                res.setHeader("Content-Type", "text/html");
                res.writeHead(200);
                res.end(contents);
            })
            break

        case "/index":
            fs.readFile(__dirname + "/index.html", {"flag": 'rs'})
            .then(contents => {
                res.setHeader("Content-Type", "text/html");
                res.writeHead(200);
                res.end(contents);
            })
            break

        case "/produtos":
            execSQLQuery('SELECT top 5 * from sys.tables', res);
            break

        case "/consulta":
            fs.readFile(__dirname + "/consultas.html")
            .then(contents => {
                res.setHeader("Content-Type", "text/html");
                res.writeHead(200);
                res.end(contents);
            })
            break

            case "/validalogin":


                 var username = request.body.username;
                 var password = request.body.password;
                var username = '1';
                var password = '00';
                if (username && password) {
                    
                    execSQLQuery('SELECT * FROM TB_ClienteLoginSite WHERE cd_LoginSite   = ? AND CD_DC = ?', [username, password], function(error, res, fields) {
                        if (res.length > 0) {
                            request.session.loggedin = true;
                            request.session.username = username;
                            response.redirect('/home');
                        } else {
                            response.send('Incorrect Username and/or Password!');
                        }
                        response.end();
                    });
                } else {
                    response.send('Please enter Username and Password!');
                    response.end();
                }
    
                break

            case "/apiproduto":
                execSQLQuery('SELECT top 10 cd_produto, nm_produto FROM TB_PRODUTO', res);
                break

    }
}
const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Servidor de Api'S rodando em http://${host}:${port}`);
});

