//Importamos nuestro pool de conexiones a la BD
import { pool } from '../db.js';

//Importamos bcryptsj para generrar hashes y comprar contraseñas
import bcryptjs from 'bcryptjs';

//================================
//Obtener todos los usuarios
//================================
export const getAllUsers = async () => {
    const result = await pool.query('SELECT * FROM doc.usuarios');
    return result.rows; //retorna un array con todos los usuarios
};

//================================
//Obtener los usuarios por email
//================================
export const getUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM doc.usuarios WHERE email = $1', [email]);
        return result.rows[0]; //retorna el primer usuario encontrado o null si no se encontro
};

//================================
//Obtener todos los usuarios por nombre
//================================
export const getBuscarNombre = async (nombre) => {
    
    const buscar = `%${nombre}%`;
    //ejecutamos la consulta SQL utilizando ILIKE para buscar coincidencias parciales sin importar mayúsculas o minúsculas
   
    const result = await pool.query('SELECT * FROM doc.usuarios WHERE nombre ILIKE $1', [buscar]);
    
    return result.rows;
};


//================================
//Creacion de usuario
//================================
export const postCrearUsuario = async (nombre, documento, carnet, email, contrasenia) => {
   
    //Numero de salt rounds (cost), 10 esun valor razonable para desarrollo,
    const saltRounds = 10;
    
    //Generamos el hash de la contraseña utilizando bcryptjs
    //bcrypt.genSaltSync devuelve el salt de forma sincrona
    const salt = bcryptjs.genSaltSync(saltRounds);

    //bcrypt.hashSync devuelve el hash de forma sincrona
    const hashedPassword = bcryptjs.hashSync(contrasenia, salt);
        // Definimos la consulta SQL con parametros
        const query = `INSERT INTO doc.usuarios (nombre, documento, carnet, email, contrasenia, bloqueado, ultimo_login, activo) 
               VALUES ($1, $2, $3, $4, $5, 'N', null, 'A') RETURNING *`;

        //Ejecutamos la consulta SQL utilizando los parametros proporcionados
        const result = await pool.query(query, [nombre, documento, carnet, email, hashedPassword]);

        //retorno el nuevo usuario creado 
        return result.rows[0];

    
};


//================================
//Actualizar usuario
//================================
export const actualizarUsuario = async (usuario) => {
    //Definir la consulta SQL con parametros
    const query = `UPDATE doc.usuarios SET nombre = $1, documento=$2, carnet=$3, email=$4, contrasenia=$5 WHERE id_usuario=$6 RETURNING *`;

    try{
        //Ejecutamos la actualizacion
        const result = await pool.query(query, usuario);
        //Si no encontro usuario con ese ID
        if(result.rowCount === 0)   throw new Error('Usuario no encontrado'); //retorna null si no se encontro el usuario
        //retorna el usuario actualizado
        return result.rows[0];
    } catch (err) {
        throw err;
    }
};

//================================
//Eliminr usuario
//================================
export const eliminarUsuario = async (id_usuario) => {
    try {
        //Verificacon si el usuario existe
        const usuarioAEliminar = await pool.query('SELECT * FROM doc.usuarios WHERE id_usuario = $1', [id_usuario]);

        // Si no existe, lanzamos un error
        if (usuarioAEliminar.rowCount === 0) {
            throw new Error('Usuario no encontrado');
        }
        // Si existe, ejecutamos la sentencia Delete
        const result = await pool.query('DELETE FROM doc.usuarios WHERE id_usuario = $1', [id_usuario]);

        //confirmacion la eliminacion
        return { message: 'Usuario eliminado exitosamente' };
    } catch (err) {
        throw err;
    }
    
};