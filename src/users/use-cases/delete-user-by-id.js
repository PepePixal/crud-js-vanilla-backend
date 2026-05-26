/**
* Actualiza user ya existente en la BD
* @param {String|Number} id
*/
export const deleteUserById = async( id ) => {

    // definicion de la url 
    const url = `${ import.meta.env.VITE_BASE_URL }/users/${ id }`;

    // petición fetch tip POST, que retorna promise y su resolucion (Response),
    // que asignaremos a res
    const res = await fetch( url, {
        method: 'DELETE',
    });

    // extrae el body del objeto Response de la petición en formato string JSON y 
    // lo transforma a nuevo objeto JS, con la data (usuario)
    const deleteResoult = await res.json();
    console.log({deleteResoult});

    return true;

};
