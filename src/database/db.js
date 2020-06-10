//importar a dependencia do sqlite3
const sqlite3 = require('sqlite3').verbose();

//criar o obejto que ira fazer a operacoes no banco de dados
const db = new sqlite3.Database('./src/database/database.db');

//Exportando arquivo

module.exports = db

//utilizar o objeto de banco de dados para nossas operacoes
// db.serialize(() => {
//     //Criar uma tabela com comandos SQL
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)

//     //Inserir dados na tabela
//     const query = `
//         INSERT INTO places (
//             image, 
//             name, 
//             address,
//             address2,
//             state,   
//             city,
//             items
//         ) VALUES (?, ?, ?, ?, ?, ?, ? );

//     `
//     const values = [
//         "",
//         "Papersider",
//         "Guilherme Gemballa, Jardim America",
//         "Numero 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Residuos Eletronicos, Lampadas"
//     ]       

//     function afterInsertData(err){ 
//         if(err){
//             return console.log(err);
//         }
//         console.log("Cadastrado com sucesso");
//         console.log(this)
//     }
    
//     db.run(query, values, afterInsertData)

//       //Deletar um dado da tabela     
    //   db.run(`DELETE FROM places WHERE id = ?`, [4], function(err){
    //     if(err){
    //         return console.log(err);
    //     }
    //         console.log('Registro deletado com sucesso')
    // })

// // })

    //Consultar dados da tabela
//     db.all(`
//         SELECT *  FROM places
//     `, function(err, rows){
//         if(err){
//             return console.log(err);
//         }

//         console.log('aqui estao seus registro');
//         console.log(rows);

// })
