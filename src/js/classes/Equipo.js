export class Equipo {
    id
    nombre
    poblacion
    estadio
    direccion
    jugadores
    constructor(nombre, poblacion, estadio, direccion, jugadores) {
        const timestamp = new Date()
        this.id = String(timestamp.getTime())
        this.nombre = nombre
        this.poblacion = poblacion
        this.estadio = estadio
        this.direccion = direccion
        this.jugadores = jugadores
    }
}