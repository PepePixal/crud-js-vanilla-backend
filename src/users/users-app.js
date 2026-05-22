import { renderAddButton } from "./presentation/render-add-button/render-add-button";
import { renderButtons } from "./presentation/render-buttons/render-buttons";
import { renderModal } from "./presentation/render-modal/render-modal";
import { renderTable } from "./presentation/render-table/render-table";
import usersStore from "./store/users-store";
import { saveUser } from "./use-cases/save-user";


/**
 * 
 * @param {HTMLDivElement} element 
 */
export const UsersApp = async( element ) => {

    // mostrar un loading
    element.innerHTML = 'Loading...';
    
    //llama func que carga la página con ususarios
    await usersStore.loadNextPage()
    
    // eliminar el loading
    element.innerHTML = ' ';

    renderTable( element );

    renderButtons( element );

    renderAddButton( element );

    // llama func enviando element donde renderizar y
    // func callback que recibe el userLike (objeto usuario),
    renderModal( element, async( userLike ) => {
        // llama func que agregará el nuevo userLike en la BD,
        const user = await saveUser( userLike );
        // todo actualiza el userStore con el nuevo user almacenado y 
        usersStore.onUserChanged( user );
        // renderiza la tabla con el nuevo user agregado
        renderTable();
    });

}