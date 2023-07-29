import { Request, Response } from "express";
import db from '../config/database';

//Cria uma função asyncrona para exibir o banco de dados
async function listUsers(req: Request, res: Response) {
    db.connection.query('SELECT * FROM clients', (err, results) => {
        if (err) {
            res.json({
                sucess: false
            });
        } else {
            res.json({
                sucess: true,
                message: 'Listagem de usuários realizada com sucesso',
                data: results
            });
        }
    });
}

//Cria uma função para adicionar ao banco de dados
async function createUser(req: Request, res: Response) {
    const querySql = ('INSERT INTO clients(DS_NAME, NM_CELLPHONE, DS_STATUS) VALUES(?,?,?);');

    const params = Array(
        req.body.DS_NAME,
        req.body.NM_CELLPHONE,
        req.body.DS_STATUS
    );

    db.connection.query(querySql, params, (err, results) => {
        if (err) {
            res.json({
                sucess: false
            });
        } else {
            res.json({
                sucess: true,
                message: 'Cadastro realizado com sucesso',
                data: results
            });
        }
    });
}

//Cria uma função para editar o banco de dados
async function editUser(req: Request, res: Response) {
    const idUser = req.params.id;

    const querySql = ('UPDATE clients SET DS_NAME = ?, NM_CELLPHONE = ?, DS_STATUS = ? WHERE ID_CLIENT = ?');

    const params = Array(
        req.body.DS_NAME,
        req.body.NM_CELLPHONE,
        req.body.DS_STATUS,
        idUser
    );

    db.connection.query(querySql, params, (err, results) => {
        if (err) {
            res.json({
                sucess: false
            });
        } else {
            res.json({
                sucess: true,
                message: 'Atualização realizada com sucesso',
                data: results
            });
        }
    });
}

//Cria uma função para excluir um id no banco de dados
async function delUser(req: Request, res: Response) {
    const idUser = req.params.id;

    const querySql = ('DELETE FROM clients WHERE ID_CLIENT = ?');

    db.connection.query(querySql, idUser, () => {
        res.json({
            message: "Usuário excluído com sucesso",
        });
    });
}

export default {
    listUsers,
    createUser,
    editUser,
    delUser
}