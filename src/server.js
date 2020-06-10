//Criando Servidor 
const express = require("express");
//executando express
const server = express();

//pegar banco de dados
const db = require("./database/db")

//Configurar pasta publick
server.use(express.static("public"));

//habilitar o uso do req.body na nossa applicacao
server.use(express.urlencoded({ extended: true }))

//utilizando template engine para automatizar o html
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//Confiurar caminhos da aplicacao
//pagina inicial
//req: Requisicao and res: Response
server.get("/", (req, res) => {
    return res.render("index.html");
})

server.get("/create-point", (req, res) => {
    //req.query: Query Strings da nossa url
    console.log(req.query)
    return res.render("create-point.html");
})

server.get("/delete-coleta", (req, res) => {
    //req.query: Query Strings da nossa url
    console.log(req.query)
    return res.render("delete-coleta.html");
})

server.post("/savepoint", (req, res) => {

    // req.body: O corpo do nosso formulario
    // console.log(req.body);

    //inserir dados no banco de dados

    const query = `
        INSERT INTO places (
            image, 
            name, 
            address,
            address2,
            state,   
            city,
            items
        ) VALUES (?, ?, ?, ?, ?, ?, ? );

    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.adress2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err);
            return res.send("erro no cadastro")
        }
        console.log("Cadastrado com sucesso");
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)

})

server.get("/search", (req, res) => {
    const search = req.query.search

    if (search == "") {
        //pesquisa vazia
        //mostrar pagina html com todos os dados do banco
        return res.render("search-results.html", { total: 0 })
    }

    //Pegar dados do banco de dados

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err);
        }

        // console.log('aqui estao seus registro');
        // console.log(rows);
        const total = rows.length;

        //Mostrar a pagina html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total });

    })
})

//Ligar o servidor 
server.listen(3000)
