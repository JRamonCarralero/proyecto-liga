export class Liga {
    id
    nombre
    year
    equipos
    jornadas
    constructor(nombre, year, equipos, jornadas) {
        const timestamp = new Date()
        this.id = String(timestamp.getTime())
        this.nombre = nombre
        this.year = year
        this.equipos = equipos
        this.jornadas = jornadas
    }
}