import './render-modal.css';
// importar para poder insertar el html del archivo render-modal.html,
// a un elelemto html - Funciona en vite con "?raw"
import modalHtml from "./render-modal.html?raw";
import {getUserById} from "../../use-cases/get-user-by-id";

let modal, form;
let loadedUser = {};

/**
 * Mostrar el modal, vacio para nuevo user si no recibe id,
 * o caragando data si se recibe un id de usuario (actualización)
 * @param {String | Number} id 
 */
export const showModal = async( id ) => {
    //si existe el elemento con div modal, eliminar su clase hide-modal,
    //que es la que hace que el modal permanezca oculto
    modal?.classList.remove('hide-modal');

    loadedUser = {};

    // si no recibe id, parar y salir
    if (!id) return;

    // si se recibe un id, obtener e user por su id
    const user = await getUserById( id );

    // llama func asigna los valores de las prop de user seleccionado,
    // a los inputs del formulario del modal 
    setFormValues(user);

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
 * Agrega los valores del usuario seleccionado a los campos del form del modal
 * @param {User} user 
 */
const setFormValues = ( user ) => {
    //obtener del form, el elemento html cuyo atributo name sea = "firstName" y
    // y a su value asignarle el valor de la propiedad user.firstName
    form.querySelector('[name="firstName"]').value = user.firstName;
    form.querySelector('[name="lastName"]').value = user.lastName;
    form.querySelector('[name="balance"]').value = user.balance;
    form.querySelector('[name="isActive"]').checked = user.isActive;
    loadedUser = user;
};


/**
 * Renderiza la ventana modal y agrega user a la BD con el callback
 * @param {HTMLDivElement} element
 * @param {(userLike)=>Promise} callback 
 */
export const renderModal = ( element, callback ) => {

    //si ya existe una ventana modal creada, retorna
    if ( modal ) return;

    // crea elemento html div
    modal = document.createElement('div');
    //inserta el html del archivo render-modal.html
    modal.innerHTML = modalHtml;
    modal.className = 'modal-container hide-modal';

    //selecciona el div form del div modal
    form = modal.querySelector('form');

    //listener para cerrar el modal '.modal-container'
    modal.addEventListener( 'click', ( event ) => {        
        //si el elemento html que dispara el evento,
        //contiene la class modal-container
        if (event.target.className === 'modal-container') {
            // oculta el modal
            hideModal();
        }
    });

    // listener al envio del formulario (cuando se pulsa el botón save)
    form.addEventListener( 'submit', async(event) => {
        //prevenir el comportamiento por defecto del evento, 
        //enviar el formulario posteado en la url del navegador y refresco web.
        event.preventDefault();

        //FormData() construye un objeto especial de pares-valores (STRINGS) a partir del formulario,
        //para ver el contenido: console.log([...datos.entries()]);
        const formData = new FormData( form );

        //gerera nuevo objeto userLike idéntico, a partir del objeto loadedUser,
        // usando un Spread Operator ...
        const userLike = { ...loadedUser };

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

        // console.log(userLike);
        
        // llama la func callback recibida como argumento en callback,
        // enviandole el userLike (objeto nuevo usuario)
        await callback( userLike );

        // ocultar y resetear el modal
        hideModal();

    });

    // mostrar el modal en el elemento html
    element.append( modal );

};