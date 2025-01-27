// @ts-check

export class Partido {
    id
    local
    visitante
    puntosLocal
    puntosVisitante
    puntosCLocal
    puntosCVisitante
    jugadoresLocal
    jugadoresVisitante
    fecha
    jugado
    /**
     * 
     * @param {string} local 
     * @param {string} visitante 
     * @param {string} puntosLocal 
     * @param {string} puntosVisitante 
     * @param {string} puntosCLocal 
     * @param {string} puntosCVisitante
     * @param {string[]} jugadoresLocal
     * @param {string[]} jugadoresVisitante 
     * @param { Date } fecha
     * @param {boolean} jugado
     */
    constructor(local, visitante, puntosLocal = '0', puntosVisitante = '0', puntosCLocal = '0', puntosCVisitante = '0', jugadoresLocal = [], jugadoresVisitante = [], fecha = new Date(), jugado = false) {
        const timestamp = new Date()
        this.id = `${timestamp.getTime()}-${local}-${visitante}`
        this.local = local
        this.visitante = visitante
        this.puntosLocal = Number(puntosLocal)
        this.puntosVisitante = Number(puntosVisitante)
        this.puntosCLocal = Number(puntosCLocal)
        this.puntosCVisitante = Number(puntosCVisitante)
        this.jugadoresLocal = jugadoresLocal
        this.jugadoresVisitante = jugadoresVisitante
        this.fecha = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`
        this.jugado = jugado
    }
}