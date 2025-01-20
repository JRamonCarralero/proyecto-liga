export class Equipo {
    id
    nombre
    poblacion
    escudo
    estadio
    direccion
    constructor(nombre, poblacion, escudo, estadio, direccion) {
        const timestamp = new Date()
        this.id = String(timestamp.getTime())
        this.nombre = nombre
        this.poblacion = poblacion
        this.escudo = escudo
        this.estadio = estadio
        this.direccion = direccion
    }
}