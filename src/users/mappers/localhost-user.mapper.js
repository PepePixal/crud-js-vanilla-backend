import { User } from '../models/user';


// mapeador del modelo de user de la BD json, en localhost,
// al model user de la aplicación

// func que requiere el modelo de usuario de la BD, en localhost y
// retorna una instancia de nuetro modelo de usuario
export const localhostUserToModel = ( localhostUser ) => {

    // desestructurar el objeto que viene en localhostUser
    const { 
        avatar,
        balance,
        first_name,
        gender,
        id,
        isActive,
        last_name

    } = localhostUser;

    // retornar nueva instancia de nuestro modelo User,
    // mapeando las propiedades, con nombre distinto
    return new User ({
        avatar,
        balance,
        firstName: first_name,
        gender,
        id,
        isActive,
        lastName: last_name
    });

};



