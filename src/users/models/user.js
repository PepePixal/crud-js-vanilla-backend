
// Nuestro modelo de estructura de datos de un usuario,
// independientemente del modelo de la base de datos.
// Tendremos que mapear el modelo de la BD con el nuestro.

export class User {

    constructor({ avatar, balance, firstName, gender, id, isActive, lastName }) {

        this.avatar = avatar;
        this.balance = balance;
        this.firstName = firstName;
        this.gender = gender;
        this.id = id;
        this.isActive = isActive;
        this.lastName = lastName;
    }

}