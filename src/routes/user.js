//Importamos Router desde Express para crear un conjunto de rutas
import { Router } from 'express';
//importamos los metodos definimos en services /userServices.js
import { getAllUsers, getUserByEmail, getBuscarNombre, postCrearUsuario, actualizarUsuario, eliminarUsuario} from '../services/userServices.js';

//Creamos una instancia de Router
const router = Router();

//Definimos la ruta para obtener todos los usuarios (Get /users)
router.get('/', getAllUsers);

//Ruta para obtener un usuario por email (Get /users/:email)
router.get('/buscarPorEmail/:email', getUserByEmail);
//Ruta para buscar usuarios por nombre (Get /users/buscarPorNombre/:nombre)
router.get('/buscarPorNombre/:nombre', async (req, res) => {
    const { nombre } = req.params;
    try {
        const allUserByName = await getBuscarNombre(nombre);
        res.json(allUserByName);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//ruta para crear un nuevo usuario (Post /users)
router.post('/', async (req, res) => {
    try {
        //Extraccion de los datos enviados al body
        const { nombre, documento, carnet, email, contrasenia } = req.body;
        //llamdo al servicio que maneja la insercion de la BD
        const newUser = await postCrearUsuario(nombre, documento, carnet, email, contrasenia);
        //Respuesta con el usuario creado
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Actualizacion de usuario (Put /users)
router.put('/:id_usuario', async (req, res) => {
    try {
        //extraccion de los datos
        const {nombre, documento, carnet, email, contrasenia} = req.body;
        //extraccion de la id
        const { id_usuario } = req.params;

        //Creamos un arreglo con los datos
        const datos = [nombre, documento, carnet, email, contrasenia, id_usuario];

        //Llamamos al servicio que maneja la actualizacion en la BD}
        const updateUser = await actualizarUsuario(datos);
        //Respuesta con el usuario actualizado
        res.json(updateUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Eliminacion de usuario (Delete /users)
router.delete('/:id_usuario', async (req, res) => {
    try {
        //extraccion de la id
        const { id_usuario } = req.params;
        //Llamamos al servicio que maneja la eliminacion en la BD}
        const deleteUser = await eliminarUsuario(id_usuario);

        res.json(deleteUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }   
});

//Exportamos el router para usarlo en index.js
export default router;