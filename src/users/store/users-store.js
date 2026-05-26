import { loadUsersByPage } from "../use-cases/load-users-by-page";


const state = {
    currentPage: 0,
    users: []
};


// funciones

const loadNextPage = async() => {

    // llama func que carga la pagina de users desde la BD,
    // enviando la página a cargar
    const users = await loadUsersByPage( state.currentPage + 1);

    // valida si NO hay usuarios en la página solicitada, para y retorna
    if ( users.length === 0) return;
    
    // aumenta el constador de paginas
    state.currentPage += 1;
    
    // asigna los usuarios cargados a la propiedad users del obj state,
    // para poder obtenerlos en cualquier parte de la aplicación, con getUsers
    state.users = users;
   
};

const loadPreviusPage = async() => {

    // valida si el número de la pagian actual es 1, retorna
    if ( state.currentPage === 1 ) return;

    // llama func que carga la pagina de users desde la BD,
    // enviando la página a cargar
    const users = await loadUsersByPage( state.currentPage - 1);

    // actualiza el contador de página
    state.currentPage -= 1;

    // asigna los usuarios cargados de la BD, al state del store
    state.users = users;

};


/**
 * Cuando haya un cambio en un usuario, crea nuevo arreglo de users storaje
 * @param {User} updatedUser 
 */
const onUserChanged = ( updatedUser ) => {

    // def. bandera
    let wasFound = false;
    
    // mapea el arreglo de usuarios y genera un nuevo arreglo .users,
    // según la condición por cada usuario:
    state.users = state.users.map( user => {
        // si el id de usuario es = al id del usuario actualizado recibido
        if ( user.id === updatedUser.id ) {
            // bandera encontrado a true
            wasFound = true;
            // retorna el usuario actualizado recibido
            return updatedUser;
        }
        // de lo contrario, retorna el usuario ya existente
        return user; 
    });

    // En caso de que tengamos menos de 10 usuarios en la página del state.users,
    // y el usuario actualizado no esté, tendremos que insertarlo
    if ( state.users.length < 10 && !wasFound ) {
        state.users.push( updatedUser );
    };

};

const reloadPage = async() => {
    throw new Error( 'No implementado');

};


// exportación por default
export default {
    // exportar todas las funciones por default
    loadNextPage,
    loadPreviusPage,
    onUserChanged,
    reloadPage,

    // exporta la propiedad users del objeto state, usando el operador ... (spread)
    // para que exporte los elementos del arreglos de users, por separado.
    // (al ser un objeto, pasa por referencia)
    /**
     * @returns {User[]}
     */
    getUsers: () => [...state.users],
    
    /**
     * @returns {Number}
     */
    //exporta la propiedad curretnPage del objeto state.
    // (al ser un valor primitivo, pasa por valor)
    getCurrentPage: () => state.currentPage,

}