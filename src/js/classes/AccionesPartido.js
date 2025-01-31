// @ts-check

export class AccionesPartido {
    id
    minuto
    jugadorId
    equipoId
    accion

    
/**
 * Constructs an instance of AccionesPartido.
 * @param {number} minuto - The minute in which the action took place.
 * @param {string} jugadorId - The ID of the player involved in the action.
 * @param {string} equipoId - The ID of the team associated with the action.
 * @param {string} accion - The description of the action performed.
 * @param {string} [id=''] - An optional unique identifier for the action. If not provided, a timestamp-based ID will be generated.
 */

    constructor(minuto, jugadorId, equipoId, accion, id='') {
        const timestamp = new Date()
        this.id = (id != '')? id : String(timestamp.getTime())
        this.minuto = minuto
        this.jugadorId = jugadorId
        this.equipoId = equipoId
        this.accion = accion
    }
}