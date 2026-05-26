import { User } from '../models/user';

// mapeador del modelo de user de la aplicación,
// al modelo de user de la BD .json en localhost,

// func que requiere el modelo de usuario de la aplicación y
// retorna el modelo de usuario de la BD .json
export const userModelToLocalhost = ( user ) => {

    // desestructurar el objeto que viene en user (modelo aplicación)
    const { 
        avatar,
        balance,
        firstName,
        gender,
        id,
        isActive,
        lastName

    } = user;

    // retornar nueva instancia de nuestro modelo User,
    // mapeando las propiedades, con nombre distinto
    return ({
        avatar,
        balance,
        first_name: firstName,
        gender,
        id,
        isActive,
        last_name: lastName
    });

};
