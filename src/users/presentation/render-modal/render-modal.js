import './render-modal.css';
// importar para poder insertar el html del archivo render-modal.html,
// a un elelemto html - Funciona en vite con "?raw"
import modalHtml from "./render-modal.html?raw";

let modal, form;

// mostrar el modal, eliminando la clase css
export const showModal = () => {
    //si existe el elemento con div modal, eliminar su clase hide-modal,
    //que es la que hace que el modal permanezca oculto
    modal?.classList.remove('hide-modal');
};

// ocultar el modal, agregando la clase css
export const hideModal = () => {
    //si existe el elemento con div modal, agregarle la clase hide-modal,
    //que es la que hace que el modal permanezca oculto
    modal?.classList.add('hide-modal');

    //si existe el elemento form, resetearlo
    form?.reset();
};



/**
 * Renderiza la ventana modal
 * @param {HTMLDivElement} element 
 */
export const renderModal = ( element ) => {

    //si ya existe una ventana modal creada, retorna
    if ( modal ) return;

    // crea elemento html div
    modal = document.createElement('div');
    //inserta el html del archivo render-modal.html
    modal.innerHTML = modalHtml;
    modal.className = 'modal-container hide-modal';

    //selecciona el div form del div modal
    form = modal.querySelector('form');

    //listener para cerra el modal '.modal-container'
    modal.addEventListener( 'click', ( event ) => {        
        //si el elemento html que dispara el evento,
        //contiene la class modal-container
        if (event.target.className === 'modal-container') {
            // oculta el modal
            hideModal();
        }
    });

    // listener al envio del formulario (cuando se pulsa el botón save)
    form.addEventListener( 'submit', (event) => {
        //prevenir el comportamiento por defecto del evento, 
        //enviar el formulario posteado en la url del navegador y refresco web.
        event.preventDefault();

        //FormData() construye un objeto especial de pares-valores (STRINGS) a partir del formulario,
        //para ver el contenido: console.log([...datos.entries()]);
        const formData = new FormData( form );

        //def objeto vacio
        const userLike = {};

        // recorrer objeto especial formData, obteniendo [por destructiración], cada par llave-valor y
        // en cada itereción:
        for ( const [key, value] of formData ) {
            
            // si la llave del par recorrido es 'balance', 
            // agregar al objeto userLike, la clave key y su valor convertido a número (+value)
            if ( key === 'balance' ) {
                userLike[key] = +value;     // + convierte el valor de value a tipo número
                // para el código y continua con la isguiente iteracción del for
                continue;
            }

            // si no existe (o es undefined) la llave isActive,
            // asignala al objeto userLike y dale el valor false
            if(!key['isActive']) userLike['isActive'] = false;
                        
            // si la llave del par recorrido es 'isAcitive',
            // agrega al objeto userLike, la llave y 
            // el valor true si (?) value es on, o de lo contrario(:) false          
            if ( key === 'isActive' ) {
                userLike[key] = (value === 'on') ? true : userLike[key] = false;
                //para el código y continua con la isguiente iteracción del for
                continue;
            };
            
            // para el resto llaves, agrega la llave y el valor del par, al objeto userLike
            userLike[key] = value;
        };

        console.log(userLike);
        // todo guardar el nuevo usuario

        // ocultar y resetear el modal
        hideModal();

    });

    element.append( modal );

};