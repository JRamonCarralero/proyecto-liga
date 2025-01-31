// @ts-check

export class Liga {
    id
    nombre
    year
    equipos
    /**
     * 
     * @param {string} nombre 
     * @param {string} year 
     * @param {string[]} equipos 
     */
    constructor(nombre, year, equipos) {
        const timestamp = new Date()
        this.id = String(timestamp.getTime())
        this.nombre = nombre
        this.year = year
        this.equipos = equipos
    }
}