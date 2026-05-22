// Almacenar en la BD, un User nuevo o un User actualizado.
// - si recibe un usuario sin id, es un usuario nuevo
// - si recibe un usuario con id, es una actualización de usurario

import { userModelToLocalhost } from '../mappers/user-to-localhost.mapper.js';
import {User} from '../models/user.js'


/**
 * Valida si es user nuevo o existente y los registra en la BD
 * @param {Like<User>} obj_estructura_de_usuario 
 */
export const saveUser = async( userLike ) => {

    // instancia de nuestro objeto modelo User,
    // con los datos del objeto recibido en userLike
    const user = new User( userLike );

    // valida si el firts y el last name NO existen
    if ( !user.firstName || !user.lastName )
        throw 'First & Last name, are required';
    
    // mapear nuestro modelo de user, al modelo de la BD
    const userToSave = userModelToLocalhost( user );

    //* Actualización de usuario existente *//

    // validar si el usuario recibido ya existía,
    // si el objeto user recibido YA contiene la propiedad id, es una actualización
    if ( user.id ) {
        throw 'Actualización no implementada';
        return;
    }

    //* Usuario nuevo *//

    // llama func que registra el usuario en la BD y 
    // obtiene el usuario registrado
    const updatedUser = await createUser( userToSave );

    // retorna el usuario nuevo registrado
    return updatedUser;
};

    
/**
* Crea user en la BD
* @param {Like<User>} obj_estructura_de_usuario
*/
const createUser = async( user ) => {

    // definicion de la url 
    const url = `${ import.meta.env.VITE_BASE_URL }/users`;

    // petición fetch tip POST, que retorna promise y su resolucion (Response),
    // que asignaremos a res
    const res = await fetch( url, {
        method: 'POST',
        //serializar el objeto user a un string JSON, para el body 
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // extrae el body del objeto Response de la petición, a formato objeto JS
    // obteniendo un nuevo objeto con la data (ususrioa)
    const newUser = await res.json();

    console.log({newUser});

    return newUser;

};







