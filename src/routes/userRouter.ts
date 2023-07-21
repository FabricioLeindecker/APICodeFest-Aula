//Importar o pacote express para criar o servidor
const express = require("express");

//Importa router do express
const router = express.Router();

//Importa o userController
import userController from "../controller/userController";

//Listar usuários
router.get('/users', userController.listUsers);

//Cadastrar Usuários
router.post('/users', (req: any, res: any) => {
    //Atribui a base de dados em nova variavel
    const jsonDataBase = fs.readFileSync(data);
    //Analisa string JSON e transforma em um objeto JavaScript
    let content = JSON.parse(jsonDataBase);

    //Método de acrescentar um iD sem substituir o ultimo ID após utilizar o delete
    //Verifica a quantidade maxima de objetos na base de dados
    let maxId: number = Math.max(...Object.keys(content).map(key => parseInt(key, 10)));
    //Atribui a quantidade máxima de IDs 
    let newId: number;

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
});

//Atualizar Usuário
router.put('/user/:id', (req: any, res: any) => {
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
router.delete('/user/:id', (req: any, res: any) => {
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