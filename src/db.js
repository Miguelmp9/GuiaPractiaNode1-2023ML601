// importacion del paquete 'pg' para conectarse a postgresql
import pkg from 'pg';

//importacion dotenv para leer las variables de entrono dese el archivo .env
import dotenv from 'dotenv';

//Cargamos las variables de entorno
dotenv.config();

//Extracion de las clases Pool del 'pg' del paquete pg
const { Pool } = pkg;
//creamos y exportamos un pool de conexiones a la base de datos utilizando las variables de entorno
export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});