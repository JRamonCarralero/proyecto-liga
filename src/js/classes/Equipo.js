// @ts-check

export class Equipo {
    id
    nombre
    poblacion
    direccion
    estadio
    /**
     * @param {string} nombre
     * @param {string} poblacion
     * @param {string} direccion
     * @param {string} estadio
     */
    constructor(nombre, poblacion = '', direccion = '', estadio = '', id = '') {
        const timestamp = new Date()
        this.id = (id != '')? id : `${timestamp.getTime()}_${nombre.split(' ').join('-').toLowerCase()}`      
        this.nombre = nombre
        this.poblacion = poblacion
        this.direccion = direccion
        this.estadio = estadio
    }
}