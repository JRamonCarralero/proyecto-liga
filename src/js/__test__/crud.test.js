/* eslint-disable no-undef */
import { readEquipos, countEquipos, createEquipo, deleteEquipo, updateEquipo, getEquipoById } from "./crudTesteo.js";

describe('Check CRUD methods of equipos', () => {
    it('readEquipos should return an array of equipos', () => {
        const equipos = readEquipos()
        expect(equipos).not.toBeNull()
        expect(Array.isArray(equipos)).toBe(true)
        expect(equipos.length).toBeGreaterThan(0)
    })
    it('countEquipos should return the number of equipos', () => {
        const equipos = readEquipos()
        const count = countEquipos()
        expect(count).toBe(equipos.length)
    })
    it('createEquipo should add a new equipo to the list of equipos', () => {
        const equipos = readEquipos()
        const length = equipos.length
        const equipo = { id: '4', nombre: 'Equipo 4', poblacion: 'Población 4', direccion: 'Calle 4', estadio: 'Estadio 4' }
        createEquipo(equipo)
        expect(countEquipos()).toBe(length + 1)
    })
    it('deleteEquipo should remove a equipo from the list of equipos', () => {
        const equipos = readEquipos()
        const length = equipos.length
        const equipo = equipos[0]
        deleteEquipo(equipo)
        expect(countEquipos()).toBe(length - 1)
    })
    it('updateEquipo should update a equipo in the list of equipos', () => {
        const equipos = readEquipos()
        const equipo = equipos[0]
        equipo.nombre = 'Equipo Actualizado'
        updateEquipo(equipo)
        expect(getEquipoById(equipo.id).nombre).toBe('Equipo Actualizado')
    })
    it('getEquipoById should return the equipo with the given id', () => {
        const equipos = readEquipos()
        const equipo = equipos[0]
        expect(getEquipoById(equipo.id)).toBe(equipo)
    })
})