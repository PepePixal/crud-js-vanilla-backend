
import './render-buttons.css'; 
import usersStore from '../../store/users-store';
import { renderTable } from '../render-table/render-table';




export const renderButtons = ( element ) => {

    const nextButton = document.createElement('button');
    nextButton.innerText = ' Next > ';
    
    const prevButton = document.createElement('button');
    prevButton.innerText = ' < Prev ';

    const currentPageLabel = document.createElement('span');
    currentPageLabel.id = 'current-page'
    currentPageLabel.innerText = usersStore.getCurrentPage();

    // agrega botones y label al elemento html
    element.append( prevButton, currentPageLabel, nextButton );

    // listaeners a los botones:

    nextButton.addEventListener('click', async() => {
                
        //llama func que carga la siguiente tanda de usuarios (10), de la BD
        await usersStore.loadNextPage();
        //obtiene el número de la página actual y la insertar en el html
        currentPageLabel.innerHTML = usersStore.getCurrentPage() ;
        //renderiza los nuevos usuario en la tabla
        renderTable( element );

    });


    prevButton.addEventListener( 'click', async() => {

        await usersStore.loadPreviusPage();

        currentPageLabel.innerHTML = usersStore.getCurrentPage() ;

        renderTable( element );


    });

};