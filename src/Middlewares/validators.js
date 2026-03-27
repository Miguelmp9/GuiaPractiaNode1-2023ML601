// Importamos las funciones para generar validadores (body, param, query)   
import { body, validationResult} from 'express-validator';

/*-----------------------
  Helper: runVaalidations
  ----------------------

  -recibe un array de validciones (p. ej. [body(...), body (...), ...])
  -Ejecuta  cada validaciones  contra la peticion 
  -Revisa validationResult y, si hay errores, responde con 400 con formato estandarizado 
  -Si no hay errores, llama a next() para continuar con el siguientes middleware/controlador
  
*/

export const runValidations = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            await validation.run(req);
        }

        const errors = validationResult(req);

        if (errors.isEmpty()) {
            return next();
        }

        return res.status(400).json({
            status: 'error',
            errors: errors.array()
        });
    }   
}

/* ------------------------
    Validadores para crer usuario (post)
    ------------------------
    -name: requerido, string, minimo 3 caracteres
    -email: requerido, string, formato email
    -password: requerido, string, minimo 6 caracteres
*/  

export const createUserValidators = [
    body('nombre')
        .trim()
        .notEmpty()
        .withMessage('El nombre es obligatorio'),

    body('email')
        .trim()
        .isEmail()
        .withMessage('El email no es válido'),

    body('contrasenia')
        .trim()
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres')
]

