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
     * @param {number} ensayos - Numero de ensayos del jugador
     * @param {number} puntosPie - Puntos a pie del jugador
     * @param {number} puntos - Puntos totales del jugador
     * @param {number} tAmarillas - Tarjetas amarillas del jugador
     * @param {number} tRojas - Tarjetas rojas del jugador
     * @param {string} [id=''] - Id de la estadistica del jugador (opcional)
     */
    constructor(ligaId, equipoId, jugadorId, ensayos, puntosPie, puntos, tAmarillas, tRojas, id='') {
        const timestamp = new Date()
        this.id = (id != '')? id : String(timestamp.getTime())
        this.ligaId = ligaId
        this.equipoId = equipoId
        this.jugadorId = jugadorId
        this.ensayos = ensayos
        this.puntosPie = puntosPie
        this.puntos = puntos
        this.tAmarillas = tAmarillas
        this.tRojas = tRojas
    }
}