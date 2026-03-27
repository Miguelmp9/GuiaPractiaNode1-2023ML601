
//-------------------
// Middleware de manejo de errores
//-------------------

//Exportamos una funcion middleware que captura los errores y devuelve una respuesta con el mensaje de error
export const errorHandler = (err, req, res, next) => {
    //Imprimimos el error en la consola para depuración
    console.error(err.stack);

    // Si el error tiene un status definido, lo usamos. Si no, asumimos 500 (server error)
    const statusCode = err.status || 500;
   
    // Si el error tiene  tiene un mensaje definido, lo usamos. Si no, asumimos un mensaje genérico
    const message = err.message || 'Ocurrió un error en el servidor';   

    //Respondemos con un JSON uniforme
    res.status(statusCode).json({
        status: 'error',
        message
    });
};