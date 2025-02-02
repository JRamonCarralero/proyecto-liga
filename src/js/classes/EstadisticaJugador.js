// @ts-check

export class EstadisticaJugador {
    id
    ligaId
    equipoId
    jugadorId
    ensayos
    puntosPie
    puntos
    tAmarillas
    tRojas

    /**
     * Constructor de la clase EstadisticaJugador
     * @param {string} ligaId - Id de la liga
     * @param {string} equipoId - Id del equipo
     * @param {string} jugadorId - Id del jugador
     * @param {string} ensayos - Numero de ensayos del jugador
     * @param {string} puntosPie - Puntos a pie del jugador
     * @param {string} puntos - Puntos totales del jugador
     * @param {string} tAmarillas - Tarjetas amarillas del jugador
     * @param {string} tRojas - Tarjetas rojas del jugador
     * @param {string} [id=''] - Id de la estadistica del jugador (opcional)
     */
    constructor(ligaId, equipoId, jugadorId, ensayos, puntosPie, puntos, tAmarillas, tRojas, id='') {
        const timestamp = new Date()
        this.id = (id != '')? id : String(timestamp.getTime())
        this.ligaId = ligaId
        this.equipoId = equipoId
        this.jugadorId = jugadorId
        this.ensayos = Number(ensayos)
        this.puntosPie = Number(puntosPie)
        this.puntos = Number(puntos)
        this.tAmarillas = Number(tAmarillas)
        this.tRojas = Number(tRojas)
    }
}