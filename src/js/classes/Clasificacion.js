// @ts-check

export class Clasificacion {
    id
    ligaId
    equipoId
    puntos
    partidosJugados
    partidosGanados
    partidosEmpatados
    partidosPerdidos
    puntosAnotados
    puntosRecibidos
    /**
     * Constructor de la clase Clasificacion
     * @param {string} liga - Id de la liga
     * @param {string} equipo - Id del equipo
     * @param {number} puntos - Puntos del equipo en la liga
     * @param {number} partidosJugados - Partidos jugados por el equipo en la liga
     * @param {number} partidosGanados - Partidos ganados por el equipo en la liga
     * @param {number} partidosEmpatados - Partidos empatados por el equipo en la liga
     * @param {number} partidosPerdidos - Partidos perdidos por el equipo en la liga
     * @param {number} puntosAnotados - Puntos anotados por el equipo en la liga
     * @param {number} puntosRecibidos - Puntos recibidos por el equipo en la liga
     */
    constructor(liga, equipo, puntos, partidosJugados, partidosGanados, partidosEmpatados, partidosPerdidos, puntosAnotados, puntosRecibidos) {
        const timestamp = new Date()
        this.id = `${timestamp.getTime()}_${equipo}`
        this.ligaId = liga
        this.equipoId = equipo
        this.puntos = puntos
        this.partidosJugados = partidosJugados
        this.partidosGanados = partidosGanados
        this.partidosEmpatados = partidosEmpatados
        this.partidosPerdidos = partidosPerdidos
        this.puntosAnotados = puntosAnotados
        this.puntosRecibidos = puntosRecibidos
    }
}