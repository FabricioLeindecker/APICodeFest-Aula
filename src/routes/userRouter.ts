//Importar o pacote express para criar o servidor
const express = require("express");
//Importa router do express
const router = express.Router();

//Importa o userController
import userController from "../controller/userController";

//Listar usuários
router.get('/users', userController.listUsers);
//Cadastrar Usuários
router.post('/users', userController.createUser);
// //Atualizar Usuário
router.put('/user/:id', userController.editUser);
// //Deletar Usuário
// router.delete('/user/:id', userController.delUsers);

//Exporta o router
export default router;