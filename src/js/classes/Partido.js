// @ts-check

export class Partido {
    id
    local
    visitante
    puntosLocal
    puntosVisitante
    jugadoresLocal
    jugadoresVisitante
    fecha
    /**
     * 
     * @param {import("./Equipo").Equipo} local 
     * @param {import("./Equipo").Equipo} visitante 
     * @param {string} puntosLocal 
     * @param {string} puntosVisitante 
     * @param {(import("./Jugador").Jugador | import("./Jugador").PrimeraLinea)[]} jugadoresLocal
     * @param {(import("./Jugador").Jugador | import("./Jugador").PrimeraLinea)[]} jugadoresVisitante 
     * @param { Date } fecha
     */
    constructor(local, visitante, puntosLocal = '0', puntosVisitante = '0', jugadoresLocal = [], jugadoresVisitante = [], fecha = new Date()) {
        const timestamp = new Date()
        this.id = String(timestamp.getTime())
        this.local = local
        this.visitante = visitante
        this.puntosLocal = Number(puntosLocal)
        this.puntosVisitante = Number(puntosVisitante)
        this.jugadoresLocal = jugadoresLocal
        this.jugadoresVisitante = jugadoresVisitante
        this.fecha = fecha
    }
}