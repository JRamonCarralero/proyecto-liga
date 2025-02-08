// @ts-check

export class Liga {
    _id
    nombre
    year
    equipos
    /**
     * 
     * @param {string} _id
     * @param {string} nombre 
     * @param {string} year 
     * @param {string[]} equipos 
     */
    constructor(_id, nombre, year, equipos) {
        this._id = _id
        this.nombre = nombre
        this.year = year
        this.equipos = equipos
    }
}