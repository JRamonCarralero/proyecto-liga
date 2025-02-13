// @ts-check

export class Liga {
    _id
    nombre
    year
    equipos
    main
    /**
     * 
     * @param {string} _id
     * @param {string} nombre 
     * @param {string} year 
     * @param {string[]} equipos 
     * @param {boolean} main
     */
    constructor(_id, nombre, year, equipos, main) {
        this._id = _id
        this.nombre = nombre
        this.year = year
        this.equipos = equipos
        this.main = main
    }
}