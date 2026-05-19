
//Cargara los users de al BD, por páginas de 10 en 10

import { localhostUserToModel } from "../mappers/localhost-user.mapper";

/**
 * 
 * @param {Number} page 
 * @returns { Promise<Users[]>} 
 */
export const loadUsersByPage = async( page = 1 ) => {

    // definicion de la url / con variable de paginación (de 10 en 10 por defecto)
    const url = `${ import.meta.env.VITE_BASE_URL }/users?_page=${ page }`;

    // petición fetch(), retorna promesa y su resolución en el objeto Response
    const res = await fetch(url);
    //console.log(res);

    // extrae el body del objeto Response de la petición, a formato objeto JS
    // obteniendo un nuevo objeto con la data (ususrioa) y propiedades de la paginación
    const data  = await res.json(); 
    //console.log(data);

    //si el número de la pagina cargada es > al número de la propiedad de paginación data.last,
    //retorna un arreglo vacio y para.
    if( page > data.last ) return [];
    
    //.map() recorre el arrelgo .data del objeto data (BD) y a cada userLike (usuario) le aplica el mapeo
    // a nuestro modelo de user, generando un nuevo arreglo
    const users = data.data.map( userLike => localhostUserToModel( userLike ) );

    return users;

}