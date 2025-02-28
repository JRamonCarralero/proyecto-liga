/* eslint-disable no-undef */
import { suma, resta, multiplica, divide, potencia } from './checkTesteo.js'

describe('Check the math functions', () => {
    it('Should sum two numbers', () => {
        expect(suma(1, 2)).toBe(3)
        expect(suma(2, 2)).toBe(4)
        expect(suma(3, 7)).toBe(10)
    })
    it('Should subtract two numbers', () => {
        expect(resta(1, 2)).toBe(-1)
        expect(resta(4, 2)).toBe(2)
        expect(resta(9, 3)).toBe(6)
    })
    it('Should multiply two numbers', () => {
        expect(multiplica(1, 2)).toBe(2)
        expect(multiplica(2, 2)).toBe(4)
        expect(multiplica(3, 7)).toBe(21)
    })
    it('Should divide two numbers', () => {
        expect(divide(1, 2)).toBe(0.5)
        expect(divide(4, 2)).toBe(2)
        expect(divide(9, 3)).toBe(3)
    })
    it('Should raise a number to a power', () => {
        expect(potencia(2, 3)).toBe(8)
        expect(potencia(4, 2)).toBe(16)
        expect(potencia(9, 3)).toBe(729)
    })
})