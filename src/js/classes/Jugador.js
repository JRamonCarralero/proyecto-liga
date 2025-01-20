export class Jugador {
    id
    nombre
    apellidos
    nacionalidad
    altura
    peso
    equipo
    
    constructor(nombre, apellidos, nacionalidad, altura, peso, equipo) {
        const timestamp = new Date()
        this.id = String(timestamp.getTime())
        this.nombre = nombre
        this.apellidos = apellidos
        this.nacionalidad = nacionalidad
        this.altura = altura
        this.peso = peso
        this.equipo = equipo
    }
}