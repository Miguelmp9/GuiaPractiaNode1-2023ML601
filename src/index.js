//import del express
import express from 'express';

//importacion del router de usuarios
import userRouter from './routes/user.js';

//import del dotenv
import dotenv from 'dotenv'; 
dotenv.config();   

//Instancia de express
const app = express();

// Middleware que permite interpretar JSON en las peticiones
app.use(express.json());

//definir una ruta Get en la Raiz del servidor
app.get('/', (req, res) => {
    res.send('Hola Mundo version UNicaes! funciono :D');
});

//Asociamos todas las rutas de usuarios al prefijo '/users'
app.use('/users', userRouter);
//Iniciamos el servidor en el puerto definido 

app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor corriendo en http://localhost:' + (process.env.PORT || 3000));
});

