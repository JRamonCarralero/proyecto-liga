// @ts-check

export class AccionesPartido {
    _id
    partidoId
    ligaId
    minuto
    jugadorId
    equipoId
    accion
    
/**
 * Constructs an instance of AccionesPartido.
 * @param {string} partidoId - The unique identifier for the action.
 * @param {string} ligaId
 * @param {string} minuto - The minute in which the action took place.
 * @param {string} jugadorId - The ID of the player involved in the action.
 * @param {string} equipoId - The ID of the team associated with the action.
 * @param {string} accion - The description of the action performed.
 * @param {string} _id - An optional unique identifier for the action. If not provided, a timestamp-based ID will be generated.
 */

    constructor(_id, partidoId, ligaId, minuto, jugadorId, equipoId, accion) {
        this._id = _id
        this.partidoId = partidoId
        this.ligaId = ligaId
        this.minuto = Number(minuto)
        this.jugadorId = jugadorId
        this.equipoId = equipoId
        this.accion = accion
    }
}