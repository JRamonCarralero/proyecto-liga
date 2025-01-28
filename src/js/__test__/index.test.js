import mockData from '../../apis/equipos.json'
import { drawEquipoRow } from '../admin.equipos.js'

describe('Add equipos to the HTML Table', () => {
    beforeEach(() => {
        localStorage.setItem('equiposlist', JSON.stringify({equipos: mockData }))
      })
    it('Should get an array of equipos from the localStorage', () => {
        const data = JSON.parse(localStorage.getItem('equiposlist') || '[]')
        
        expect(data.equipos).not.toBeNull()
        expect(Array.isArray(data.equipos)).toBe(true)
        expect(data.equipos.length).toBeGreaterThan(0)
    })
})