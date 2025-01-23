export class Partido {
    id
    local
    visitante
    puntosLocal
    puntosVisitante
    jugadoresLocal
    jugadoresVisitante
    fecha
    constructor(local, visitante) {
        const timestamp = new Date()
        this.id = String(timestamp.getTime())
        this.local = local
        this.visitante = visitante
        this.puntosLocal = ''
        this.puntosVisitante = ''
        this.jugadoresLocal = []
        this.jugadoresVisitante = []
        this.fecha = ''
    }
}