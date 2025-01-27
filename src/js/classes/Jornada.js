export class Jornada {
    id
    fecha
    numero
    partidos
    /**
     * 
     * @param {number} numero 
     * @param {Date} fecha
     * @param {string[]} partidos 
     */
    constructor(numero, fecha, partidos) {
        const timestamp = new Date()
        this.id = `${timestamp.getTime()}_${numero}`
        this.fecha = fecha
        this.numero = numero
        this.partidos = partidos
    }
}