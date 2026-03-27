import * as userService from '../services/userServices.js';

export const getObtenerTodosLosUsuarios = async (req, res, next) => {
    try {
        const result = await userService.getAllUsers();
        res.json(result);
    } catch (err) {
        return next(err);
    }
};

export const getObtenerPorEmail = async (req, res, next) => {
    try {
        const { email } = req.params;
        const result = await userService.getUserByEmail(email);
        res.json(result);
    } catch (err) {
        return next(err);
    }
};

export const getBuscarNombre = async (req, res, next) => {
    try {
        const { nombre } = req.params;
        const result = await userService.getBuscarNombre(nombre);
        res.json(result);
    } catch (err) {
        return next(err);
    }
};

export const postCrearUsuario = async (req, res, next) => {
    try {
        const { nombre, documento, carnet, email, contrasenia } = req.body;
        const newUser = await userService.postCrearUsuario(nombre, documento, carnet, email, contrasenia);
        res.status(201).json(newUser);
    } catch (err) {
        return next(err);
    }
};

export const putActualizarUsuario = async (req, res, next) => {
    try {
        const { id_usuario } = req.params;
        const { nombre, documento, carnet, email, contrasenia } = req.body;
        const datos = [nombre, documento, carnet, email, contrasenia, id_usuario];
        const updatedUser = await userService.actualizarUsuario(datos);
        res.json(updatedUser);
    } catch (err) {
        return next(err);
    }
};

export const deleteEliminarUsuario = async (req, res, next) => {
    try {
        const { id_usuario } = req.params;
        const result = await userService.eliminarUsuario(id_usuario);
        res.status(200).json(result);
    } catch (err) {
        return next(err);
    }
};