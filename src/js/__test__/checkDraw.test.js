/* eslint-disable no-undef */
import mockData from '../../api/equipos.data.json'
import { drawTabla } from './checkTesteo.js'

describe('Check the drawTable function', () => {
    it('mockData should be an array of Equipos', () => {
        expect(mockData).not.toBeNull()
        expect(Array.isArray(mockData)).toBe(true)
        expect(mockData.length).toBeGreaterThan(0)
    })
    it('should add equipos to the html table', () => {
        document.body.innerHTML = `
            <table id="equiposTable">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Dirección</th>
                    <th>Población</th>
                    <th>Estadio</th>
                </tr>
            </thead>
            <tbody id="equiposTableBody">
            </tbody>
            </table>
        `
        const tableBody = document.getElementById('equiposTableBody')
        expect(tableBody).not.toBeNull()
        expect(tableBody.getElementsByTagName('tr').length).toBe(0)
        drawTabla('equiposTableBody', mockData)
        expect(tableBody.getElementsByTagName('tr').length).toBeGreaterThan(0) 
    })
})