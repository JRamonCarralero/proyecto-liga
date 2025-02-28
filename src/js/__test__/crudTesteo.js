import equipos from '../../api/equipos.data.json'

/**
 * Returns all the teams stored in the app.
 * @returns {Array<Object>} List of teams.
 */
export function readEquipos() {
    return equipos
}

/**
 * Counts the total number of teams stored in the app.
 * @returns {number} The count of teams.
 */
export function countEquipos() {
    return equipos.length
}

/**
 * Adds a new team to the list of equipos.
 * @param {Object} equipo - The team object to be added.
 */
export function createEquipo(equipo) {
    equipos.push(equipo)
}

/**
 * Updates the given team in the list of equipos.
 * @param {Object} equipo - The team object to be updated.
 */
export function updateEquipo(equipo) {
    equipos[equipos.indexOf(equipo)] = equipo
}

/**
 * Deletes the given team from the list of equipos.
 * @param {Object} equipo - The team object to be deleted.
 */
export function deleteEquipo(equipo) {
    equipos.splice(equipos.indexOf(equipo), 1)
}

/**
 * Finds and returns the team with the given id.
 * @param {string} id - The id of the team to find.
 * @returns {Object | undefined} The team object with the given id, or undefined if no team is found.
 */
export function getEquipoById(id) {
    return equipos.find(equipo => equipo.id === id)
}