//Importar o pacote express para criar o servidor
const express = require("express");
//Importar o pacote File System para manipular arquivos
const fs = require('fs');
//Importa router do express
const router = express.Router();
//Importar banco de dados de extensão .json
const data: string = './database.json';

//Listar usuários
router.get('/api/users', (req: any, res: any) => {
    const jsonData = fs.readFileSync(data);
    //Analisa string JSON e trasnsforma em um objeto Javascript
    res.send(JSON.parse(jsonData));
});

//Cadastrar Usuários
router.post('/api/users', (req: any, res: any) => {
    //Atribui a base de dados em nova variavel
    const jsonDataBase = fs.readFileSync(data);
    //Analisa string JSON e transforma em um objeto JavaScript
    let content = JSON.parse(jsonDataBase);

    //Método de acrescentar um iD sem substituir o ultimo ID após utilizar o delete
    //Verifica a quantidade maxima de objetos na base de dados
    const maxId = Math.max(...Object.keys(content).map(key => parseInt(key, 10)));
    //Atribui a quantidade máxima de IDs
    const newId = maxId + 1;
    //Cria uma nova chave de objeto ja somado +1 ao total de objetos
    content[newId] = req.body;

    /* Método criado em aula 
    //Verifica a quantidade de objetos na base de dados
    let index: number = Object.keys(content).length;
    //Cria uma nova chave de objeto somando +1 do total de objetos
    content[index++] = req.body;
    */

    //Analisa um objeto em JavaScript e transforma em uma string JSON
    const values = JSON.stringify(content);
    //Lê o arquivo da base de dados e adiciona o novo objeto
    fs.writeFileSync(data, values);
    //retorno amigável para o usuário que chamou o endpoint
    res.status(201).send("User registered sucessfully");
});

//Atualizar Usuário
router.put('/api/user/:id', (req: any, res: any) => {
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
    //Retorno amigável para o usuário que chamou o endpoint
    res.send(`User with id ${userId} has been updated`)
});

//Deletar Usuário
router.delete('/api/user/:id', (req: any, res: any) => {
    //Atribui a base de dados em nova variavel
    const jsonDataBase = fs.readFileSync(data);
    //Recupera o id enviado por parametro
    const userId = req.params.id;
    //Analisa string JSON e transforma em um objeto JavaScript
    let content = JSON.parse(jsonDataBase);
    //Delete
    delete content[userId];
    //Analisa um objeto em JavaScript e transforma em uma string JSON
    const values = JSON.stringify(content);
    //Lê o arquivo da base de dados e adiciona o novo objeto
    fs.writeFileSync(data, values);
    //Retorno amigável para o usuário que chamou o endpoint
    res.send(`User with id ${userId} has been deleted`);
});

//Exporta o router
export default router;