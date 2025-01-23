export class Jornada {
    id
    fecha
    numero
    partidos
    constructor(numero, partidos) {
        const timestamp = new Date()
        this.id = String(timestamp.getTime())
        this.fecha = ''
        this.numero = numero
        this.partidos = partidos
    }
}