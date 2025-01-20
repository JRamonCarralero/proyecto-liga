export class Clasificacion {
    id
    equipo
    puntos
    partidosJugados
    partidosGanados
    partidosEmpatados
    partidosPerdidos
    puntosAnotados
    puntosRecibidos
    constructor(equipo, puntos, partidosJugados, partidosGanados, partidosEmpatados, partidosPerdidos, puntosAnotados, puntosRecibidos) {
        const timestamp = new Date()
        this.id = String(timestamp.getTime())
        this.equipo = equipo
        this.puntos = puntos
        this.partidosJugados = partidosJugados
        this.partidosGanados = partidosGanados
        this.partidosEmpatados = partidosEmpatados
        this.partidosPerdidos = partidosPerdidos
        this.puntosAnotados = puntosAnotados
        this.puntosRecibidos = puntosRecibidos
    }
}