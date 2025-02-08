// @ts-check

export class Usuario {
    _id
    nombre
    apellidos
    nickname
    email
    rol
    password
    /**
     * 
     * @param {string} _id
     * @param {string} nombre 
     * @param {string} apellidos 
     * @param {string} nickname 
     * @param {string} email 
     * @param {string} rol 
     * @param {string} password 
     */
    constructor(_id, nombre, apellidos, nickname, email, rol, password) {
        this._id = _id
        this.nombre = nombre
        this.apellidos = apellidos
        this.nickname = nickname
        this.email = email
        this.rol = rol
        this.password = password
    }
}