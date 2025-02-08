// @ts-check

export class Jornada {
    _id
    fecha
    numero
    ligaId
    /**
     * 
     * @param {string} _id
     * @param {number} numero 
     * @param {Date} fecha
     * @param {string} ligaId 
     */
    constructor(_id, numero, fecha, ligaId) {
        this._id = _id
        this.fecha = fecha
        this.numero = numero
        this.ligaId = ligaId
    }
}