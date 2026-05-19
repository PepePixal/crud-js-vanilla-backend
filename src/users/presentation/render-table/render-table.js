import usersStore from '../../store/users-store';
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

        // todo listener a la tabla

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
                        <a href="#/" data-id="${ user.id }">Select</a>
                        |
                        <a href="#/" data-id="${ user.id }">Delete</a>
                </td>
            </tr>
        `;
    });


    //** agrega el contenido al body de la tabla **//

    table.querySelector('tbody').innerHTML = tableHTML;

};