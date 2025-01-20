export class Jornada {
    id
    fecha
    numero
    liga
    constructor(fecha, numero, liga) {
        const timestamp = new Date()
        this.id = String(timestamp.getTime())
        this.fecha = fecha
        this.numero = numero
        this.liga = liga
    }
}