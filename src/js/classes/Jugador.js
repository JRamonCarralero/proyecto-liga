export class Jugador {
    id
    nombre
    apellidos
    nacionalidad
    altura
    peso 
    constructor(nombre, apellidos, nacionalidad, altura, peso, id) {
        const timestamp = new Date()
        this.id = id || String(timestamp.getTime())
        this.nombre = nombre
        this.apellidos = apellidos
        this.nacionalidad = nacionalidad
        this.altura = Number(altura)
        this.peso = Number(peso)
    }
}

export class PrimeraLinea extends Jugador {
    especialista
    constructor(nombre, apellidos, nacionalidad, altura, peso, equipo, id) {
        super(nombre, apellidos, nacionalidad, altura, peso, equipo, id)
        this.especialista = true
    }
}

export const TIPO_JUGADOR = {
    PRIMERA_LINEA: 'primera',
    OTRO: 'otro'
}

export class FactoriaJugador {
    createJugador(tipo, nombre, apellidos, nacionalidad, altura, peso, equipo){
        switch (tipo) {
            case TIPO_JUGADOR.PRIMERA_LINEA:
                return new PrimeraLinea(nombre, apellidos, nacionalidad, altura, peso, equipo)
                break
            case TIPO_JUGADOR.OTRO:
                return new Jugador(nombre, apellidos, nacionalidad, altura, peso, equipo)
        }
    }
}