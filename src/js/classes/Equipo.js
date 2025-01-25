// @ts-check

export class Equipo {
    id
    nombre
    poblacion
    direccion
    estadio
    jugadores
    /**
     * @param {string} nombre
     * @param {string} poblacion
     * @param {string} direccion
     * @param {string} estadio
     * @param {string[]} jugadores
     */
    constructor(nombre, poblacion = '', direccion = '', estadio = '', jugadores = []) {
        const timestamp = new Date()
        this.id = String(timestamp.getTime())
        this.nombre = nombre
        this.poblacion = poblacion
        this.direccion = direccion
        this.estadio = estadio
        this.jugadores = jugadores
    }
}