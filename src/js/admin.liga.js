// @ts-check

import { dataStore } from './classes/Store.js'
import { Partido } from './classes/Partido.js'
import { Jornada } from './classes/Jornada.js'
import { Liga } from './classes/Liga.js'
import { Equipo } from './classes/Equipo'

/**
 * @typedef storedData
 * @property {Equipo[]=} equipos 
 * @property {import("./classes/Usuario").Usuario[]=} usuarios 
 * @property {import("./classes/Noticia").Noticia[]=} noticias 
 * @property {Liga[]=} ligas 
 */

document.addEventListener('DOMContentLoaded', onDOMContentLoaded)

/** @type {Equipo[]} */
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

    //dataStore.get().ligas = []
    //localStorage.setItem('storedData', JSON.stringify(dataStore.get()))
}


// ------- METHODS ------- //

/**
 * Añade equipos a la liga
 */
function addEquipos() {
    const select = document.getElementById('sel-equipo')
    const selectId = select?.getAttribute('value') || ''

    const equipo =  dataStore.get().equipos?.find(/**@param {Equipo} eq*/eq => eq.id === selectId)
    if (equipo) {
        equiposLiga.push(equipo)
        drawEquipoRow(equipo)
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
    const index = equiposLiga.findIndex(equipo => equipo.id === id)

    document.getElementById(`row_${id}`)?.remove()
    if (index != -1) {
        equiposLiga.splice(index, 1)
    }
}
    
/**
 * Creamos la liga, con sus jornadas y partidos
 */
function crearLiga() {
    const nombreLiga = document.getElementById('nombre')?.getAttribute('value') || ''
    const yearLiga = document.getElementById('year')?.getAttribute('value') || ''
    const equipos = [...equiposLiga]

    if (equipos.length % 2 != 0) {
        const descanso = new Equipo('DESCANSO')
        equipos.push(descanso)
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
                jornada.push(new Partido(calendario[i][j],calendario[i][equipos.length - j - 1]))
                vuelta.push(new Partido(calendario[i][equipos.length - j - 1], calendario[i][j]))
            } else {
                jornada.push(new Partido(calendario[i][equipos.length - j - 1], calendario[i][j]))
                vuelta.push(new Partido(calendario[i][j], calendario[i][equipos.length - j - 1]))
            }
        }
        const jornadaClass = new Jornada(i + 1, new Date(), jornada)
        jornadas.push(jornadaClass)
        const vueltaClass = new Jornada(i + equipos.length, new Date(), vuelta)
        jornadasVuelta.push(vueltaClass)
        esLocal = !esLocal
    }
    const liga = jornadas.concat(jornadasVuelta)

    const ligaClass = new Liga(nombreLiga, yearLiga, equipos, liga)
    console.log(ligaClass)

    dataStore.get().ligas?.push(ligaClass)
    localStorage.setItem('storedData', JSON.stringify(dataStore.get()))
   
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
    const boxJornadas = document.getElementById('box-jornadas')

    if (liga){
        document.getElementById('id-liga')?.setAttribute('value', liga.id)
        document.getElementById('nombre')?.setAttribute('value', liga.nombre)
        document.getElementById('year')?.setAttribute('value', liga.year)

        liga.equipos.forEach(/** @param {Equipo} equipo */equipo => drawEquipoRow(equipo))
        if (boxJornadas) boxJornadas.innerHTML = ''
        liga.jornadas.forEach(/** @param {Jornada} jornada*/jornada => drawJornadaBox(jornada))
    }
    
}

/**
 * Elimina la liga
 * @param {string} id 
 */
function borrarLiga(id) {
    const ligas =  dataStore.get().ligas
    if (ligas) {
        const index = ligas.findIndex(/** @param {Liga} liga */liga => liga.id === id)

        if (window.confirm(`¿Desea borrar la liga ${ligas[index].nombre}?`)) {
            ligas.splice(index, 1)

            document.getElementById(`liga_${id}`)?.remove()
            dataStore.get().ligas = ligas
            localStorage.setItem('storedData', JSON.stringify(dataStore.get()))
        }
    }
}

/**
 * muestra la jornada
 * @param {Jornada} jornada 
 */
function drawJornadaBox(jornada) {
    console.log(jornada)
    const boxJornadas = document.getElementById('box-jornadas')
    const div = document.createElement('div')
    const title = document.createElement('h3')

    boxJornadas?.appendChild(div)
    title.innerText = `Jornada nº: ${jornada.numero}`
    div.appendChild(title)

    jornada.partidos.forEach(/** @param {Partido} partido */partido => {
        const texto = document.createElement('p')
        texto.innerText = `${partido.local.nombre} vs ${partido.visitante.nombre}`
        div.appendChild(texto)
    })   
}


/**
 * Carga los equipos en el selector del formulario
 */
function loadEquiposInSelect() {
    const jsonStoredData = localStorage.getItem('storedData')
    /** @type {storedData} */
    let storedData = {}
    if (jsonStoredData) {
        storedData = JSON.parse(jsonStoredData)
    }
    //const storedData = JSON.parse(localStorage.getItem('storedData')) || {}
    const select = document.getElementById('sel-equipo')
    if (select) select.innerHTML = `<option value="0">Seleccione un equipo</option>`
    if (storedData.hasOwnProperty('equipos')) {
        const equipos = storedData['equipos']
        dataStore.get().equipos = equipos
        if (equipos) equipos.forEach(/** @param {Equipo} equipo */equipo => {
            if (select) select.innerHTML += `
                <option value="${equipo.id}">${equipo.nombre}</option>
            `
        })
    }
}

/**
 * Obtiene las ligas existentes
 */
function getLigas() {
    const jsonStoredData = localStorage.getItem('storedData')
    /** @type {storedData} */
    let storedData = {}
    if (jsonStoredData) {
        storedData = JSON.parse(jsonStoredData)
    }
    //const storedData = JSON.parse(localStorage.getItem('storedData')) || {}
    const tbody = document.getElementById('tbody-ligas')
    if (tbody) tbody.innerHTML = ''
    if (storedData.hasOwnProperty('ligas')) {
        const ligas = storedData.ligas
        dataStore.get().ligas = ligas
        if (ligas) ligas.forEach(liga => drawLigaRow(liga))
    }
}

function clearLigaForm() {
    const select = document.getElementById('sel-equipo')

    if (select) select.innerHTML = `<option value="0">Seleccione un equipo</option>`
    document.getElementById('nombre')?.setAttribute('value', '')
    document.getElementById('year')?.setAttribute('value', '')
    document.getElementById('tbody-equipos')?.setAttribute('value', '')
    document.getElementById('box-jornadas')?.setAttribute('value', '')
}