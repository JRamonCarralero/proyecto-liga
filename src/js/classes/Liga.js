// @ts-check

export class Liga {
    id
    nombre
    year
    equipos
    jornadas
    /**
     * 
     * @param {string} nombre 
     * @param {string} year 
     * @param {(import("./Equipo").Equipo)[]} equipos 
     * @param {(import("./Jornada").Jornada)[]} jornadas 
     */
    constructor(nombre, year, equipos, jornadas) {
        const timestamp = new Date()
        this.id = String(timestamp.getTime())
        this.nombre = nombre
        this.year = year
        this.equipos = equipos
        this.jornadas = jornadas
    }
}