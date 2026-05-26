import usersStore from '../../store/users-store';
import { deleteUserById } from '../../use-cases/delete-user-by-id';
import { showModal } from '../render-modal/render-modal';
import './render-table.css';

// def var table
let table;

//** func crea una tabla html con encabezado y cuerop **//

const createTable = () => {
    // tabla
    const table = document.createElement('table');
    
    // encabezado de la tabla
    const tableHeader = document.createElement('thead');
    tableHeader.innerHTML = `
        <tr>
            <th>#ID</th>
            <th>Balance</th>
            <th>FirstName</th>
            <th>LasName</th>
            <th>Active</th>
            <th>Actions</th>
        </tr>
    `;
    
    // cuerpo de la tabla
    const tableBody = document.createElement('tbody');
    
    // agregar el encabezado y el cuerpo, a la tabla
    table.append( tableHeader, tableBody );

    return table;
};

/**
 * 
 * @param {MouseEvent} event 
 */
const tableSelectListener = ( event ) => {
    //obtener solo el elemento html cuya clase es .select-user,
    //del elemento que dispara el evento, la tabla
    const element = event.target.closest('.select-user');
    // si el element sobre el que se pulsa no es el Select, dara null, parar
    if ( !element ) return;
    // si el elemento si que es el Select
    // obtener el valor de su atributo data-id, que será el id del user
    const id = element.getAttribute( 'data-id');
    // llamar a la func que muestra el modal, enviando el id
    showModal(id);
}


/**
 * 
 * @param {MouseEvent} event 
 */
const tableDeleteListener = async( event ) => {
    //obtener solo el elemento html cuya clase es .select-user,
    //del elemento que dispara el evento, la tabla
    const element = event.target.closest('.delete-user');
    // si el element sobre el que se pulsa no es el Select, dara null, parar
    if ( !element ) return;
    // si el elemento si que es el Select,
    // obtener el valor de su atributo data-id, que será el id del user
    const id = element.getAttribute( 'data-id');
    
    // llamar a la func que elimina el usuario por su id, 
    // controlando el posible error
    try {
        //llama func que elimina el uer por su id
        await deleteUserById(id);
        // llama func que recarga los usuarios de la página actual
        await usersStore.reloadPage();
        document.querySelector('#current-page').innerText = usersStore.getCurrentPage();
        renderTable();

    } catch (error) {
        console.log(error);
        alert('No se pudo eliminar el usuario');
    }
}


/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderTable = ( element ) => {

    // obtiene los usuarios de store
    const users = usersStore.getUsers();

    // valida si todavía NO existe la tabla, la crea
    if ( !table ) {
        // crea la tabla por primera vez
        table = createTable();
        // agregar la tabla al elemento html
        // la primera estará vacia.
        element.append( table );

        //listener a toda la tabla que llama func tableSelectListener()
        table.addEventListener( 'click', (event) => tableSelectListener( event ) );
        //listener a toda la tabla que llama func tableDeleteListener()
        table.addEventListener( 'click', (event) => tableDeleteListener( event ) );

    } 


    //** genera el contenido de la tabla con la data de users **//

    let tableHTML = '';
    // iterar el arreglo de usuarios y por cada usuario
    users.forEach( user => {

        //agrgar una linea en la tabla con los datos del usauro
        tableHTML += `
            <tr>
                <td>${ user.id }</td>
                <td>${ user.balance }</td>
                <td>${ user.firstName }</td>
                <td>${ user.lastName }</td>
                <td>${ user.isActive }</td>
                <td>
                        <a href="#/" class="select-user" data-id="${ user.id }">Select</a>
                        |
                        <a href="#/" class="delete-user" data-id="${ user.id }">Delete</a>
                </td>
            </tr>
        `;
    });


    //** agrega el contenido al body de la tabla **//

    table.querySelector('tbody').innerHTML = tableHTML;

};