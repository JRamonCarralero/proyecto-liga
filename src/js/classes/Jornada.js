export class Jornada {
    id
    fecha
    numero
    partidos
    constructor(fecha, numero, partidos) {
        const timestamp = new Date()
        this.id = String(timestamp.getTime())
        this.fecha = fecha
        this.numero = numero
        this.partidos = partidos
    }
}