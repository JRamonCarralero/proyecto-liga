// @ts-check

import { dataStore } from './classes/Store.js'
import { Partido } from './classes/Partido.js'
import { Jornada } from './classes/Jornada.js'
import { Liga } from './classes/Liga.js'
import { Equipo } from './classes/Equipo.js'
import { store } from './store/redux.js'

document.addEventListener('DOMContentLoaded', onDOMContentLoaded)

/** @type {string[]} */
const equiposLiga = []

// ------- EVENTS ------- //

function onDOMContentLoaded() {
    const addEquipoBtn = document.getElementById('add-equipo-btn')
    const crearLigaBtn = document.getElementById('crear-liga-btn')
    const clearFormBtn = document.getElementById('clear-form-btn')

    addEquipoBtn?.addEventListener('click', addEquipos)
    crearLigaBtn?.addEventListener('click', crearLiga)
    clearFormBtn?.addEventListener('click', clearLigaForm)

    loadEquiposInSelect()
    getLigas()
}


// ------- METHODS ------- //

/**
 * Devuelve el valor de un elemento input cuyo id es idElement
 * Si no existe el elemento, devuelve cadena vacia
 * @param {String} idElement 
 * @returns {String}
 */
function getInputValue(idElement) {
    const element = document.getElementById(idElement)
    if (element) {
        return /** @type {HTMLInputElement} */(element).value
    } else {
        return ''
    }
}

/**
 * Setea el valor de un elemento input cuyo id es idElement
 * Si no existe el elemento, no hace nada
 * @param {String} idElement 
 * @param {String} value       valor a setear
 */
function setInputValue(idElement, value) {
    const element = document.getElementById(idElement)
    if (element) {
        /** @type {HTMLInputElement} */(element).value = value
    }
}

/**
 * Devuelve el valor seleccionado en un elemento select cuyo id es idElement
 * Si no existe el elemento, devuelve cadena vacia
 * @param {String} idElement 
 * @returns {String}
 */
function getSelectValue(idElement) {
    const element = document.getElementById(idElement)
    if (element) {
        return /** @type {HTMLSelectElement} */(element).value
    } else {
        return ''
    }
}

/**
 * Setea el valor seleccionado en un elemento select cuyo id es idElement
 * Si no existe el elemento, no hace nada
 * @param {String} idElement 
 * @param {String} value       valor a setear
 */
function setSelectValue(idElement, value) {
    const element = document.getElementById(idElement)
    if (element) {
        /** @type {HTMLSelectElement} */(element).value = value
    }
}

/**
 * Añade equipos a la liga
 */
function addEquipos() {
    const selectId = getSelectValue('sel-equipo')

    const equipo =  store.equipo.getById(selectId)
    if (equipo) {
        equiposLiga.push(equipo.id)
        drawEquipoRow(equipo)
        setSelectValue('sel-equipo', '0')
    }
}

/**
 * Muestra el equipo en la tabla
 * @param {Equipo} equipo
 */
function drawEquipoRow(equipo) {
    const tbody = document.getElementById('tbody-equipos')
    const row = document.createElement('tr')
    const cellId = document.createElement('td')
    const cellNombre = document.createElement('td')
    const cellPoblacion = document.createElement('td')
    const cellDireccion = document.createElement('td')
    const cellEstadio = document.createElement('td')
    const cellEdit = document.createElement('td')
    const delBtn = document.createElement('button')

    row.id = `row_${equipo.id}`
    tbody?.appendChild(row)
    cellId.innerText = equipo.id
    row.appendChild(cellId)
    cellNombre.innerText = equipo.nombre
    row.appendChild(cellNombre)
    cellPoblacion.innerText = equipo.poblacion
    row.appendChild(cellPoblacion)
    cellDireccion.innerText = equipo.direccion
    row.appendChild(cellDireccion)
    cellEstadio.innerText = equipo.estadio
    row.appendChild(cellEstadio)
    row.appendChild(cellEdit)
    delBtn.innerText = '🗑'
    delBtn.addEventListener('click', borrarEquipo.bind(delBtn, equipo.id))
    cellEdit.appendChild(delBtn)
}

/**
 * Elimina equipo de la liga
 * @param {string} id 
 */
function borrarEquipo(id) {
    const index = equiposLiga.findIndex(equipo => equipo === id)

    if (index != -1) {
        document.getElementById(`row_${id}`)?.remove()
        equiposLiga.splice(index, 1)
    }
}
    
/**
 * Creamos la liga, con sus jornadas y partidos
 */
function crearLiga() {
    const nombreLiga = getInputValue('nombre')
    const yearLiga = getInputValue('year')
    const equipos = [...equiposLiga]

    if (equipos.length % 2 != 0) {
        const descanso = new Equipo('DESCANSO')
        equipos.push(descanso.id)
    }
    const calendario = new Array(equipos.length-1).fill(null).map(() => new Array(equipos.length-1))
    for (let i = 0; i < equipos.length; i++) {
        calendario[0][i] = equipos[i];
    }
    for (let i = 1; i < equipos.length - 1; i++) {
        calendario[i] = [...calendario[i - 1]];
        const removed = calendario[i].splice(1, 1)
        calendario[i].push(removed[0]);
    }
  
    const jornadas = []
    const jornadasVuelta = []
    let esLocal = true
    for (let i = 0; i < equipos.length-1; i++) {
        const jornada = []
        const vuelta = []
        for (let j = 0; j < equipos.length / 2; j++) {
            if (esLocal) {
                const pIda = new Partido(calendario[i][j],calendario[i][equipos.length - j - 1])
                const pVuelta = new Partido(calendario[i][equipos.length - j - 1], calendario[i][j])

                store.partido.create(pIda)
                store.partido.create(pVuelta)

                jornada.push(pIda.id)
                vuelta.push(pVuelta.id)
            } else {
                const pIda = new Partido(calendario[i][equipos.length - j - 1],calendario[i][j])                
                const pVuelta = new Partido(calendario[i][j], calendario[i][equipos.length - j - 1])

                store.partido.create(pIda)
                store.partido.create(pVuelta)

                jornada.push(pIda.id)
                vuelta.push(pVuelta.id)
            }
        }
        const jornadaClass = new Jornada(i + 1, new Date(), jornada)
        store.jornada.create(jornadaClass)
        jornadas.push(jornadaClass.id)
        const vueltaClass = new Jornada(i + equipos.length, new Date(), vuelta)
        store.jornada.create(vueltaClass)
        jornadasVuelta.push(vueltaClass.id)
        esLocal = !esLocal
    }
    const liga = jornadas.concat(jornadasVuelta)

    const ligaClass = new Liga(nombreLiga, yearLiga, equipos, liga)
    store.liga.create(ligaClass)

    localStorage.setItem('storedData', JSON.stringify(store.getState()))
   
    drawLigaRow(ligaClass)
    clearLigaForm()
}

/**
 * Muestra la liga en la tabla
 * @param {Liga} liga
 */
function drawLigaRow(liga) {
    const tbody = document.getElementById('tbody-ligas')
    const row = document.createElement('tr')
    const cellId = document.createElement('td')
    const cellNombre = document.createElement('td')
    const cellYear = document.createElement('td')
    const cellBtn = document.createElement('td')
    const editBtn = document.createElement('button')
    const delBtn = document.createElement('button')
    
    row.id = `liga_${liga.id}`
    tbody?.appendChild(row)
    cellId.innerText = liga.id
    row.appendChild(cellId)
    cellNombre.innerText = liga.nombre
    row.appendChild(cellNombre)
    cellYear.innerText = liga.year
    row.appendChild(cellYear)
    row.appendChild(cellBtn)
    editBtn.innerText = '✎'
    editBtn.addEventListener('click', editarLiga.bind(editBtn, liga.id))
    cellBtn.appendChild(editBtn)
    delBtn.innerText = '🗑'
    delBtn.addEventListener('click', borrarLiga.bind(delBtn, liga.id))
    cellBtn.appendChild(delBtn)
}

/**
 * muestra la informacion de la liga
 * @param {string} id 
 */
function editarLiga(id) {
    const liga = dataStore.get().ligas?.find(/** @param {Liga} lg*/lg => lg.id === id)

    if (liga){
        setInputValue('id-liga', liga.id)
        setInputValue('nombre', liga.nombre)
        setInputValue('year', liga.year)

        liga.equipos.forEach(/** @param {string} equipoId */equipoId => {
            const equipo = store.equipo.getById(equipoId)
            drawEquipoRow(equipo)
        })
        clearJornadasBox()
        liga.jornadas.forEach(/** @param {string} jornadaId*/jornadaId => {
            const jornada = store.jornada.getById(jornadaId)
            drawJornadaBox(jornada)
        })
    }
    
}

/**
 * Elimina la liga
 * @param {string} id 
 */
function borrarLiga(id) {
    const liga = store.liga.getById(id)

    if (window.confirm(`¿Desea borrar la liga ${liga.nombre}?`)) {
        store.liga.delete(liga)
        document.getElementById(`liga_${id}`)?.remove()
        localStorage.setItem('storedData', JSON.stringify(store.getState()))
        clearLigaForm()
    }
}

/**
 * muestra la jornada
 * @param {Jornada} jornada 
 */
function drawJornadaBox(jornada) {
    const boxJornadas = document.getElementById('box-jornadas')
    const div = document.createElement('div')
    const title = document.createElement('h3')

    boxJornadas?.appendChild(div)
    title.innerText = `Jornada nº: ${jornada.numero}`
    div.appendChild(title)

    jornada.partidos.forEach(/** @param {string} partidoId */partidoId => {
        const partido = store.partido.getById(partidoId)
        const texto = document.createElement('p')
        texto.innerText = `${partido.local.nombre} vs ${partido.visitante.nombre}`
        div.appendChild(texto)
    })   
}


/**
 * Carga los equipos en el selector del formulario
 */
function loadEquiposInSelect() {
    const equipos = store.getState().equipos
    const select = document.getElementById('sel-equipo')
    if (select) select.innerHTML = `<option value="0">Seleccione un equipo</option>`
    equipos.forEach(/** @param {Equipo} equipo */equipo => {
        if (select) select.innerHTML += `
                <option value="${equipo.id}">${equipo.nombre}</option>
            `
    })
}

/**
 * Obtiene las ligas existentes
 */
function getLigas() {
    const ligas = store.getState().ligas
    const tbody = document.getElementById('tbody-ligas')
    if (tbody) tbody.innerHTML = ''
    ligas.forEach(/** @param {Liga} liga */liga => drawLigaRow(liga))
}

/**
 * Limpia el formulario de liga, la tabla de equipos y el contenedor de las jornadas
 */
function clearLigaForm() {
    setInputValue('nombre', '')
    setInputValue('year', '')
    setSelectValue('sel-equipo', '0')

    clearEquiposTable()
    clearJornadasBox()
}

/**
 * Limpia la tabla de Equipos
 */
function clearEquiposTable() {
    const tbody = document.getElementById('tbody-equipos')
    if (tbody) tbody.innerHTML = ''
}

/**
 * Limpia el contenedor de las jornadas
 */
function clearJornadasBox() {
    const boxJornadas = document.getElementById('box-jornadas')
    if (boxJornadas) boxJornadas.innerHTML = ''
}