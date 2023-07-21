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

 export default {
    listUsers
 }