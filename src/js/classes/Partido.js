export class Partido {
    id
    local
    visitante
    puntosLocal
    puntosVisitante
    jugadoresLocal
    jugadoresVisitante
    jornada
    constructor(local, visitante, puntosLocal, puntosVisitante, jugadoresLocal, jugadoresVisitante, jornada) {
        const timestamp = new Date()
        this.id = String(timestamp.getTime())
        this.local = local
        this.visitante = visitante
        this.puntosLocal = puntosLocal
        this.puntosVisitante = puntosVisitante
        this.jugadoresVocal = jugadoresLocal
        this.jugadoresVisitante = jugadoresVisitante
        this.jornada = jornada
    }
}