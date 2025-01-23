// @ts-check

export class Usuario {
    id
    nombre
    apellidos
    nickname
    email
    rol
    password
    /**
     * 
     * @param {string} nombre 
     * @param {string} apellidos 
     * @param {string} nickname 
     * @param {string} email 
     * @param {string} rol 
     * @param {string} password 
     */
    constructor(nombre, apellidos, nickname, email, rol, password) {
        const timestamp = new Date()
        this.id = String(timestamp.getTime())
        this.nombre = nombre
        this.apellidos = apellidos
        this.nickname = nickname
        this.email = email
        this.rol = rol
        this.password = password
    }
}