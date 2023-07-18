const express = require('express');
const data = require('../database.json');

let file = data;

const app = express();

app.use(express.json());

app.get('/users', (req: any, res: any) => {
    res.send(data);
});

app.post('/users', (req: any, res: any) => {
    console.log(req.body);

    let user = {
        nome: req.body.nome,
        idade: req.body.idade,
        cidade: req.body.cidade
    }

    file.push(user);

    return res.send("Dados inseridos com sucesso");
});

app.delete('/users', (req: any, res: any) => {

    let delUser = {
        nome: req.body.nome,
        idade: req.body.idade,
        cidade: req.body.cidade
    }

    file.pop(delUser);

    return res.send("Dados excluidos com sucesso");
});

// app.put('/users', (req: any, res: any) => {

//     let editUser = {
//         nome: req.body.nome,
//         idade: req.body.idade,
//         cidade: req.body.cidade
//     }

//     file.replace();

//     return res.send("Dados atualizados");
// })

app.listen(3000, () => {
    console.log(`Running on port 3000`);
});
