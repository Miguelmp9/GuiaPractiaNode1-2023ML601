//Importamos Router desde Express para crear un conjunto de rutas
import { Router } from 'express';

//importamos los metodos definimos en services /userServices.js
//import { getAllUsers, getUserByEmail, getBuscarNombre, postCrearUsuario, actualizarUsuario, eliminarUsuario} from '../services/userServices.js';

// Importacion del controlador que maneja la logica de cada ruta
import * as userController from '../Controllers/usersController.js';

// Importamos nuestra validaciones y el runner que las ejecuta
import { createUserValidators, runValidations } from '../Middlewares/validators.js';    

//Creamos una instancia de Router
const router = Router();

//Definimos la ruta para obtener todos los usuarios (Get /users)
router.get('/', userController.getObtenerTodosLosUsuarios);


//Ruta para obtener un usuario por email (Get /users/:email)
router.get('/buscarPorEmail/:email', userController.getObtenerPorEmail);

//Ruta para buscar usuarios por nombre (Get /users/buscarPorNombre/:nombre)
router.get('/buscarPorNombre/:nombre', userController.getBuscarNombre);

//ruta para crear un nuevo usuario (Post /users)
router.post('/', runValidations(createUserValidators), userController.postCrearUsuario);

//Actualizacion de usuario (Put /users)
router.put('/:id_usuario', userController.putActualizarUsuario);

//Eliminacion de usuario (Delete /users)
router.delete('/:id_usuario', userController.deleteEliminarUsuario);

//Exportamos el router para usarlo en index.js
export default router;