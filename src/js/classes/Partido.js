// @ts-check

export class Partido {
    _id
    jornadaId
    ligaId
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
     * @param {string} _id
     * @param {string} jornadaId
     * @param {string} ligaId
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
    constructor(_id, jornadaId, ligaId, local, visitante, puntosLocal = '0', puntosVisitante = '0', puntosCLocal = '0', puntosCVisitante = '0', jugadoresLocal = [], jugadoresVisitante = [], fecha = new Date(), jugado = false) {
        this._id = _id  
        this.jornadaId = jornadaId 
        this.ligaId = ligaId
        this.local = local
        this.visitante = visitante
        this.puntosLocal = Number(puntosLocal)
        this.puntosVisitante = Number(puntosVisitante)
        this.puntosCLocal = Number(puntosCLocal)
        this.puntosCVisitante = Number(puntosCVisitante)
        this.jugadoresLocal = jugadoresLocal
        this.jugadoresVisitante = jugadoresVisitante
        this.fecha = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}-${fecha.getDate().toString().padStart(2, '0')}`
        this.jugado = jugado
    }
}