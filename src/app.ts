//Importar o pacote express para criar o servidor
const express = require("express");
//Importa o userRouter
import userRouter from './routes/userRouter';
//Instancia o express na variável app
const app = express();
//Express utilzar JSON
app.use(express.json());
//Utilizar o router
app.use('/api', userRouter);

//Exporta a variavel app
export default app;
