// @ts-check

export class Jugador {
    id
    nombre
    apellidos
    nacionalidad
    altura
    peso 
    equipoId
    /**
     * 
     * @param {string} nombre 
     * @param {string} apellidos 
     * @param {string} nacionalidad 
     * @param {string} altura 
     * @param {string} peso 
     * @param {string} equipoId
     * @param {string} id 
     */
    constructor(nombre, apellidos, nacionalidad, altura, peso, equipoId, id) {
        const timestamp = new Date()
        this.id = (id != '')? id : String(timestamp.getTime())
        this.nombre = nombre
        this.apellidos = apellidos
        this.nacionalidad = nacionalidad
        this.altura = Number(altura)
        this.peso = Number(peso)
        this.equipoId = equipoId
    }
}

export class PrimeraLinea extends Jugador {
    especialista
    /**
     * 
     * @param {string} nombre 
     * @param {string} apellidos 
     * @param {string} nacionalidad 
     * @param {string} altura 
     * @param {string} peso 
     * @param {string} equipoId
     * @param {string} id 
     */
    constructor(nombre, apellidos, nacionalidad, altura, peso, equipoId, id) {
        super(nombre, apellidos, nacionalidad, altura, peso, equipoId, id)
        this.especialista = true
    }
}

export const TIPO_JUGADOR = {
    PRIMERA_LINEA: 'primera',
    OTRO: 'otro'
}

export class FactoriaJugador {
    /**
     * 
     * @param {string} tipo 
     * @param {string} nombre 
     * @param {string} apellidos 
     * @param {string} nacionalidad 
     * @param {string} altura 
     * @param {string} peso 
     * @param {string} equipoId
     * @param {string} id
     * @returns 
     */
    createJugador(tipo, nombre, apellidos, nacionalidad, altura, peso, equipoId, id){
        switch (tipo) {
            case TIPO_JUGADOR.PRIMERA_LINEA:
                return new PrimeraLinea(nombre, apellidos, nacionalidad, altura, peso, equipoId, id)
            case TIPO_JUGADOR.OTRO:
                return new Jugador(nombre, apellidos, nacionalidad, altura, peso, equipoId, id)
        }
    }
}