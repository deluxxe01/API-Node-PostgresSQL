require("dotenv").config(".env"); 

//essa é a requisição que vai ser usada
const db = require("./db");

const port = process.env.PORT;

const express = require('express');

//guardando na variavel 
const app = express();

app.use(express.json())



//Criar a rota que vai enviar a requesição para a função  requesição
//app é o objeto  (mandar algm coisa para o banco e pedir uma resposta: assincrona "async")
//requisiao precisa de uma resposta (req,res)
app.post("/client", async function(requisition, response) {
    await db.insertCustomer(requisition.body)
    
     //Retornar algo que deu certo
    response.sendStatus(201)
})

app.listen(port);

console.log("Backend Rodando!")