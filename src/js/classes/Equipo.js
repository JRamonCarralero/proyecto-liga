// @ts-check

export class Equipo {
    _id
    nombre
    poblacion
    direccion
    estadio
    /**
     * @param {string} nombre
     * @param {string} poblacion
     * @param {string} direccion
     * @param {string} estadio
     * @param {string} _id 
     */
    constructor(_id, nombre, poblacion = '', direccion = '', estadio = '') {
        this._id = _id      
        this.nombre = nombre
        this.poblacion = poblacion
        this.direccion = direccion
        this.estadio = estadio
    }
}