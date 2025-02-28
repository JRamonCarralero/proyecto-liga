/**
 * Suma dos numeros y devuelve el resultado.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function suma(a, b) {
    return a + b
}

/**
 * Resta dos numeros y devuelve el resultado.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function resta(a, b) {
    return a - b
}

/**
 * Multiplica dos numeros y devuelve el resultado.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function multiplica(a, b) {
    return a * b
}

/**
 * Divide dos numeros y devuelve el resultado.
 * @param {number} a - El numerador.
 * @param {number} b - El denominador.
 * @returns {number} - El resultado de la division.
 */
export function divide(a, b) {
    return a / b
}

/**
 * Calcula la potencia de dos numeros y devuelve el resultado.
 * @param {number} a - La base.
 * @param {number} b - El exponente.
 * @returns {number} - El resultado de la potencia.
 */
export function potencia(a, b) {
    return a ** b
}

/**
 * Dibuja una tabla con los datos proporcionados.
 * @param {string} idElement - El id del elemento HTML que se va a dibujar la tabla.
 * @param {object[]} data - Los datos a dibujar en la tabla, cada objeto debe tener las propiedades:
 * - id: string - La id del equipo.
 * - nombre: string - El nombre del equipo.
 * - poblacion: string - La poblacion del equipo.
 * - direccion: string - La direccion del equipo.
 * - estadio: string - El estadio del equipo.
 */
export function drawTabla(idElement, data) {
    const table = document.getElementById(idElement)
    table.innerHTML = ''
    for (let i = 0; i < data.length; i++) {
        const tr = document.createElement('tr')
        for (const key in data[i]) {
            const td = document.createElement('td')
            td.innerText = data[i][key]
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }
}