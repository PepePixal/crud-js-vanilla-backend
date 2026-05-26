

import { localhostUserToModel } from "../mappers/localhost-user.mapper";

/**
 * Cargar user de la BD, por su id
 * @param {String | Number} id 
 * @returns { Promise<User>} 
 */
export const getUserById = async( id ) => {

    // definicion de la url 
    const url = `${ import.meta.env.VITE_BASE_URL }/users/${id}`;

    // petición fetch(), retorna promesa y su resolución en el objeto Response
    const res = await fetch( url );
    //console.log(res);

    // extrae el body del objeto Response de la petición, a formato objeto JS
    // obteniendo un nuevo objeto con la data (ususrioa)
    const data  = await res.json(); 
    //console.log(data);
    
    // mapeo a nuestro modelo de user, generando un nuevo arreglo
    const user = localhostUserToModel( data );
    //console.log(user);

    return user;

}