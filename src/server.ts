//Importar o pacote express para criar o servidor
const express = require("express");
//Importar o pacote File System para manipular arquivos
const fs = require('fs');
//Importar banco de dados de extensão .json
const data: string = './database.json';
//Instancia o express na variável app
const app = express();
//Express utilzar JSON
app.use(express.json());

//Listar usuários
app.get('/api/users', (req: any, res: any) => {
    const jsonData = fs.readFileSync(data);
    //Analisa string JSON e trasnsforma em um objeto Javascript
    res.send(JSON.parse(jsonData));
});

//Cadastrar Usuários
app.post('/api/users', (req: any, res: any) => {
    //Atribui a base de dados em nova variavel
    const jsonDataBase = fs.readFileSync(data);
    //Analisa string JSON e transforma em um objeto JavaScript
    let content = JSON.parse(jsonDataBase);
    //Verifica a quantidade de objetos na base de dados
    let index: number = Object.keys(content).length;
    //Cria uma nova chave de objeto somando +1 do total de objetos
    content[index++] = req.body;
    //Analisa um objeto em JavaScript e transforma em uma string JSON
    const values = JSON.stringify(content);
    //Lê o arquivo da base de dados e adiciona o novo objeto
    fs.writeFileSync(data, values);
    //retorno amigável para o usuário que chamou o endpoint
    res.status(201).send("User registered sucessfully");
});

//Atualizar Usuário
app.put('/api/user/:id', (req: any, res: any) => {
    //Atribui a base de dados em nova variavel
    const jsonDataBase = fs.readFileSync(data);
    //recupera o id enviado por parametro
    const userId = req.params.id;
    //Analisa string JSON e transforma em um objeto JavaScript
    let content = JSON.parse(jsonDataBase);
    //Atribui os dados da requisição ao usuario existente na base de dados
    content[userId] = req.body;
    //Analisa um objeto em JavaScript e transforma em uma string JSON
    const values = JSON.stringify(content);
    //Lê o arquivo da base de dados e adiciona o novo objeto
    fs.writeFileSync(data, values);
    //Retorno amigável para o usuário que o endpoint
    res.send(`User with id ${userId} has been updated`)
});

//Deletar Usuário
app.delete('/api/user', (req: any, res: any) => {

});

//Iniciar servidor
app.listen(3000, () => {
    console.log(`Running on port 3000`);
});
