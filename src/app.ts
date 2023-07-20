//Importar o pacote express para criar o servidor
const express = require("express");
//Importa o user router
import userRouter from './routes/userRouter';

//Instancia o express na variável app
const app = express();

//importa a PORT do arquivo .env
const PORT = process.env.PORT || 3000;
//Express utilzar JSON
app.use(express.json());
//Utilizar o router
app.use(userRouter);

//Exporta a variavel app
export default app;