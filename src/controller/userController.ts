import { Request, Response } from "express";
import db from'../config/database';

//Cria uma função asyncrona para exibir o banco de dados
async function listUsers(req: Request, res: Response) {
    db.connection.query('SELECT * FROM clients', (err, results) => {
        console.log(results);
        res.send(results);
    });
};

async function createUser(req:Request, res:Response) {
    const querySql = ('INSERT INTO clients(DS_NAME, NM_CELLPHONE, DS_STATUS) VALUES(?,?,?);');

    const params = Array(
        req.body.DS_NAME,
        req.body.NM_CELLPHONE,
        req.body.DS_STATUS
    );

    db.connection.query(querySql, params, (err, results) => {
        res.send('Cadastro realizado com sucesso' + results);
    });
};

async function editUser(req:Request, res:Response) {
    const querySql = ('UPDATE clients SET (?,?,?) =  WHERE ID_CLIENT = :id');

    const params = Array(
        req.body.DS_NAME,
        req.body.NM_CELLPHONE,
        req.body.DS_STATUS
    );

    db.connection.query(querySql, params, (err, results) => {
        res.send('Atualização realizada com sucesso' + results);
    });
};

export default {
    listUsers,
    createUser,
    editUser
};

// //Cria uma função asyncrona para adicionar novos usuários
// async function addUsers(req: Request, res: Response) {
//     //Atribui a base de dados em nova variavel
//     const jsonDataBase = fs.readFileSync(data);
//     //Analisa string JSON e transforma em um objeto JavaScript
//     let content = JSON.parse(jsonDataBase);

//     //Método de acrescentar um iD sem substituir o ultimo ID após utilizar o delete
//     //Verifica a quantidade maxima de objetos na base de dados
//     let maxId: number = Math.max(...Object.keys(content).map(key => parseInt(key, 10)));

//     //Se o arquivo database.js estiver vazio ele inicia com o ID 0 (zero)
//     if (Object.keys(content).length === 0) {
//         maxId = -1;
//     };

//     // Obtém o array de usuários do corpo da requisição
//     const usersToAdd: any = req.body;

//     // Adiciona cada usuário ao conteúdo com um novo ID
//     for (let i = 0; i < usersToAdd.length; i++) {
//         maxId++; // Incrementa o maxId para obter o novo ID para o usuário atual
//         content[maxId] = usersToAdd[i]; // Adiciona o usuário com o novo ID ao conteúdo
//     };

//     /* Método criado em aula 
//    //Verifica a quantidade de objetos na base de dados
//    let index: number = Object.keys(content).length;
//    //Cria uma nova chave de objeto somando +1 do total de objetos
//    content[index++] = req.body;
//    */

//     //Analisa um objeto em JavaScript e transforma em uma string JSON
//     const values = JSON.stringify(content);
//     //Lê o arquivo da base de dados e adiciona o novo objeto
//     fs.writeFileSync(data, values);
//     //retorno amigável para o usuário que chamou o endpoint
//     res.status(201).send("User registered sucessfully");
// };

// //Cria uma função asyncrona para editar usuários
// async function editUsers(req: Request, res: Response) {
//     //Atribui a base de dados em nova variavel
//     const jsonDataBase = fs.readFileSync(data);
//     //recupera o id enviado por parametro
//     const userId = req.params.id;
//     //Analisa string JSON e transforma em um objeto JavaScript
//     let content = JSON.parse(jsonDataBase);
//     //Atribui os dados da requisição ao usuario existente na base de dados
//     content[userId] = req.body;
//     //Analisa um objeto em JavaScript e transforma em uma string JSON
//     const values = JSON.stringify(content);
//     //Lê o arquivo da base de dados e adiciona o novo objeto
//     fs.writeFileSync(data, values);
//     //Retorno amigável para o usuário que chamou o endpoint
//     res.send(`User with id ${userId} has been updated`)
// };

// //Cria uma função asyncrona para deletar usuários
// async function delUsers(req: Request, res: Response) {
//     //Atribui a base de dados em nova variavel
//     const jsonDataBase = fs.readFileSync(data);
//     //Recupera o id enviado por parametro
//     const userId = req.params.id;
//     //Analisa string JSON e transforma em um objeto JavaScript
//     let content = JSON.parse(jsonDataBase);
//     //Delete
//     delete content[userId];
//     //Analisa um objeto em JavaScript e transforma em uma string JSON
//     const values = JSON.stringify(content);
//     //Lê o arquivo da base de dados e adiciona o novo objeto
//     fs.writeFileSync(data, values);
//     //Retorno amigável para o usuário que chamou o endpoint
//     res.send(`User with id ${userId} has been deleted`);
// }