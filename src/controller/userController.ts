import { Request, Response } from "express";

//Importar o pacote File System para manipular arquivos
const fs = require('fs');
//Importar banco de dados de extensão .json
const data: string = './database.json';

//Cria uma função asyncrona para exibir o banco de dados
async function listUsers(req: Request, res: Response) {
    const jsonData = fs.readFileSync(data);
    //Analisa string JSON e trasnsforma em um objeto Javascript
    res.send(JSON.parse(jsonData));
};
//Cria uma função asyncrona para adicionar novos usuários
async function addUsers(req: Request, res: Response) {
    //Atribui a base de dados em nova variavel
    const jsonDataBase = fs.readFileSync(data);
    //Analisa string JSON e transforma em um objeto JavaScript
    let content = JSON.parse(jsonDataBase);

    //Método de acrescentar um iD sem substituir o ultimo ID após utilizar o delete
    //Verifica a quantidade maxima de objetos na base de dados
    let maxId: number = Math.max(...Object.keys(content).map(key => parseInt(key, 10)));
    //Atribui a quantidade máxima de IDs 
    let newId: number;
    //Se o arquivo database.js estiver vazio ele inicia com o ID 0 (zero)
    if (Object.keys(content).length === 0) {
        newId = 0;
    } else {
        newId = maxId + 1;
    };
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
};

//Cria uma função asyncrona para editar usuários
async function editUsers(req: Request, res:Response) {
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
}; 

//Cria uma função asyncrona para deletar usuários
async function delUsers(req: Request, res: Response) {
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
}

 export default {
    listUsers,
    addUsers, 
    editUsers,
    delUsers
}