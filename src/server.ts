//Importa a variavel app do arquivo app.ts
import app from './app';
//Importa a biblioteca do dotenv
import dotenv from 'dotenv';
dotenv.config();
//Importa a variavel PORT do arquivo .env
const PORT = process.env.PORT || 3333;

//Iniciar servidor
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});