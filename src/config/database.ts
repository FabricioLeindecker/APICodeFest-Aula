//Importa o pacote do mysql
import mysql from 'mysql2';
//Importa o pacote do dotenv
import dotenv from 'dotenv';
dotenv.config();

//Cria uma conexão 
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
});

//Exporta o arquivo
export default {
    connection
};