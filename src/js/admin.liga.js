import { emptyArray } from './decorators/emptyArray.js'
import { dataStore } from './classes/Store.js'
import { Partido } from './classes/Partido.js'
import { Jornada } from './classes/Jornada.js'
import { Liga } from './classes/Liga.js'

document.addEventListener('DOMContentLoaded', onDOMContentLoaded)

const equiposLiga = []

// ------- EVENTS ------- //

function onDOMContentLoaded() {
    const addEquipoBtn = document.getElementById('add-equipo-btn')
    const crearLigaBtn = document.getElementById('crear-liga-btn')
    const clearFormBtn = document.getElementById('clear-form-btn')

    addEquipoBtn.addEventListener('click', addEquipos)
    crearLigaBtn.addEventListener('click', crearLiga)
    clearFormBtn.addEventListener('click', clearLigaForm)

    loadEquiposInSelect()
    getLigas()

    //dataStore.get().ligas = []
    //localStorage.setItem('storedData', JSON.stringify(dataStore.get()))
}


// ------- METHODS ------- //

function addEquipos() {
    const select = document.getElementById('sel-equipo')
    const selectId = select.value

    const equipo =  dataStore.get().equipos.find(eq => eq.id === selectId)
    equiposLiga.push(equipo)
    drawEquipoRow(equipo)
}

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
    tbody.appendChild(row)
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
    delBtn.addEventListener('click', borrarEquipo.bind(this, equipo.id))
    cellEdit.appendChild(delBtn)
}

function borrarEquipo(id) {
    const index = equiposLiga.find(equipo => equipo.id === id)

    document.getElementById(`row_${id}`).remove()
    equiposLiga.splice(index, 1)
}

function crearLiga() {
    const nombreLiga = document.getElementById('nombre').value
    const yearLiga = document.getElementById('year').value
    const equipos = [...equiposLiga]

    if (equipos.length % 2 != 0) {
        equipos.push({id: '0000', nombre: 'DESCANSO'})
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
        const jornadaClass = new Jornada(i + 1, jornada)
        jornadas.push(jornadaClass)
        const vueltaClass = new Jornada(i + equipos.length, vuelta)
        jornadasVuelta.push(vueltaClass)
        esLocal = !esLocal
    }
    const liga = jornadas.concat(jornadasVuelta)

    const ligaClass = new Liga(nombreLiga, yearLiga, equipos, liga)
    console.log(ligaClass)

    dataStore.get().ligas.push(ligaClass)
    localStorage.setItem('storedData', JSON.stringify(dataStore.get()))
   
    drawLigaRow(ligaClass)
    clearLigaForm()
}

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
    tbody.appendChild(row)
    cellId.innerText = liga.id
    row.appendChild(cellId)
    cellNombre.innerText = liga.nombre
    row.appendChild(cellNombre)
    cellYear.innerText = liga.year
    row.appendChild(cellYear)
    row.appendChild(cellBtn)
    editBtn.innerText = '✎'
    editBtn.addEventListener('click', editarLiga.bind(this, liga.id))
    cellBtn.appendChild(editBtn)
    delBtn.innerText = '🗑'
    delBtn.addEventListener('click', borrarLiga.bind(this, liga.id))
    cellBtn.appendChild(delBtn)
}

function editarLiga(id) {
    const liga = dataStore.get().ligas.find(lg => lg.id === id)
    const boxJornadas = document.getElementById('box-jornadas')

    document.getElementById('id-liga').value = liga.id
    document.getElementById('nombre').value = liga.nombre
    document.getElementById('year').value = liga.year

    liga.equipos.forEach(equipo => drawEquipoRow(equipo))
    boxJornadas.innerHTML = ''
    liga.jornadas.forEach(jornada => drawJornadaBox(jornada))
}

function borrarLiga(id) {
    const ligas =  dataStore.get().ligas
    const index = ligas.findIndex(liga => liga.id === id)

    if (window.confirm(`¿Desea borrar la liga ${ligas[index].nombre}?`)) {
        ligas.splice(index, 1)

        document.getElementById(`liga_${id}`).remove()
        dataStore.get().ligas = ligas
        localStorage.setItem('storedData', JSON.stringify(dataStore.get()))
    }
}

function drawJornadaBox(jornada) {
    console.log(jornada)
    const boxJornadas = document.getElementById('box-jornadas')
    const div = document.createElement('div')
    const title = document.createElement('h3')

    boxJornadas.appendChild(div)
    title.innerText = `Jornada nº: ${jornada.numero}`
    div.appendChild(title)

    jornada.partidos.forEach(partido => {
        const texto = document.createElement('p')
        texto.innerText = `${partido.local.nombre} vs ${partido.visitante.nombre}`
        div.appendChild(texto)
    })   
}



function loadEquiposInSelect() {
    const storedData = JSON.parse(localStorage.getItem('storedData')) || {}
    const select = document.getElementById('sel-equipo')
    select.innerHTML = `<option value="0">Seleccione un equipo</option>`
    if (storedData.hasOwnProperty('equipos')) {
        const equipos = storedData['equipos']
        dataStore.get().equipos = equipos
        equipos.forEach(equipo => {
            select.innerHTML += `
                <option value="${equipo.id}">${equipo.nombre}</option>
            `
        })
    }
}

function getLigas() {
    const storedData = JSON.parse(localStorage.getItem('storedData')) || {}
    document.getElementById('tbody-ligas').innerHTML = ''
    if (storedData.hasOwnProperty('ligas')) {
        const ligas = storedData.ligas
        dataStore.get().ligas = ligas
        ligas.forEach(liga => drawLigaRow(liga))
    }
}

function clearLigaForm() {
    const select = document.getElementById('sel-equipo')

    select.innerHTML = `<option value="0">Seleccione un equipo</option>`
    document.getElementById('nombre').value = ''
    document.getElementById('year').value = ''
    document.getElementById('tbody-equipos').innerHTML = ''
    document.getElementById('box-jornadas').innerHTML = ''
}