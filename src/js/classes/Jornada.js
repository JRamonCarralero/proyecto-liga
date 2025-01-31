// @ts-check

export class Jornada {
    id
    fecha
    numero
    ligaId
    /**
     * 
     * @param {number} numero 
     * @param {Date} fecha
     * @param {string} ligaId 
     */
    constructor(numero, fecha, ligaId) {
        const timestamp = new Date()
        this.id = `${timestamp.getTime()}_${numero}`
        this.fecha = fecha
        this.numero = numero
        this.ligaId = ligaId
    }
}