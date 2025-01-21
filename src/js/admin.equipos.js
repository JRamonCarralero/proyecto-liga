import { Equipo } from './classes/Equipo.js'
import { FactoriaJugador, TIPO_JUGADOR } from './classes/Jugador.js'
import { dataStore } from './classes/Store.js'

document.addEventListener('DOMContentLoaded', onDOMContentLoaded)

let JUGADORES = []
const miFactoria = new FactoriaJugador

// ------- EVENTS ------- //

function onDOMContentLoaded() {
    const crearEquipoBtn = document.getElementById('crear-equipo-btn')
    const formEquipo = document.getElementById('form-equipo')
    const crearJugadorBtn = document.getElementById('crear-jugador-btn')
    const formJugador = document.getElementById('form-jugador')

    crearEquipoBtn.addEventListener('click', crearEquipo)
    formEquipo.addEventListener('submit', onSubmitForm)
    crearJugadorBtn.addEventListener('click', crearJugador)
    formJugador.addEventListener('submit', onSubmitForm)

    readEquipos()
}

function onSubmitForm(e) {
    e.preventDefault()
}



// ------- METHODS ------- //

function crearEquipo() {
    const nombre = document.getElementById('nombre')
    const poblacion = document.getElementById('poblacion')
    const direccion = document.getElementById('direccion')
    const estadio = document.getElementById('estadio')

    const equipo = new Equipo(nombre.value, poblacion.value, direccion.value, estadio.value, JUGADORES)

    dataStore.get().equipos.push(equipo)

    localStorage.setItem('storedData', JSON.stringify(dataStore.get()))

    drawEquipoRow(equipo)
    clearEquiposFormInputs()
    clearJugadoresTable()
}

function crearJugador() {
    const nombre = document.getElementById('nombre-jugador')
    const apellidos = document.getElementById('apellidos')
    const nacionalidad = document.getElementById('nacionalidad')
    const altura = document.getElementById('altura')
    const peso = document.getElementById('peso')
    const especialista = document.getElementById('especialista')
    
    let jugador
    if (especialista.checked) {
        jugador = miFactoria.createJugador(TIPO_JUGADOR.PRIMERA_LINEA, nombre.value, apellidos.value, nacionalidad.value, altura.value, peso.value)
    } else {
        jugador = miFactoria.createJugador(TIPO_JUGADOR.OTRO, nombre.value, apellidos.value, nacionalidad.value, altura.value, peso.value)
    }

    JUGADORES.push(jugador)
    
    drawJugadorRow(jugador)
    clearJugadorFormInputs()
}

function readEquipos() {
    const storedData = JSON.parse(localStorage.getItem('storedData')) || {}
    if (storedData.hasOwnProperty('equipos')) {
        const equipos = storedData['equipos']
        equipos.forEach(equipo => {
            dataStore.get().equipos.push(equipo)
            drawEquipoRow(equipo)
        })
    }
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
    const editBtn = document.createElement('button')

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
    editBtn.innerText = '✎'
    editBtn.addEventListener('click', editarEquipo.bind(this, equipo.id))
    cellEdit.appendChild(editBtn)
} 

function drawJugadorRow(jugador) {
    const tbody = document.getElementById('tbody-jugadores')
    const row = document.createElement('tr')
    const cellId = document.createElement('td')
    const cellNombre = document.createElement('td')
    const cellApellidos = document.createElement('td')
    const cellNacionalidad = document.createElement('td')
    const cellAltura = document.createElement('td')
    const cellPeso = document.createElement('td')
    const cellEdit = document.createElement('td')
    const editBtn = document.createElement('button')

    row.id = `row_j_${jugador.id}`
    tbody.appendChild(row)
    cellId.innerText = jugador.id
    row.appendChild(cellId)    
    cellNombre.innerText = jugador.nombre
    row.appendChild(cellNombre)  
    cellApellidos.innerText = jugador.apellidos
    row.appendChild(cellApellidos)  
    cellNacionalidad.innerText = jugador.nacionalidad
    row.appendChild(cellNacionalidad)  
    cellAltura.innerText = jugador.altura
    row.appendChild(cellAltura)  
    cellPeso.innerText = jugador.peso
    row.appendChild(cellPeso) 
    row.appendChild(cellEdit)
    editBtn.innerText = '✎'
    editBtn.addEventListener('click', editarJugador.bind(this, jugador.id))
    cellEdit.appendChild(editBtn)
}

function editarEquipo(id) {
    const equipos = dataStore.get().equipos
    const equipo = equipos.find(element => element.id === id)
    const jugadores = equipo.jugadores

    console.log(equipo)

    document.getElementById('nombre').value = equipo.nombre
    document.getElementById('poblacion').value = equipo.poblacion
    document.getElementById('direccion').value = equipo.direccion
    document.getElementById('estadio').value = equipo.estadio

    clearJugadoresTable()
    clearJugadorFormInputs()
    jugadores.forEach(jugador => {
        drawJugadorRow(jugador)
        JUGADORES.push(jugador)
    })
}

function editarJugador(id) {
    const indexJugador = JUGADORES.findIndex(element => element.id === id)
    console.log(indexJugador)
    console.log(JUGADORES[indexJugador])

    document.getElementById('nombre-jugador').value = JUGADORES[indexJugador].nombre
    document.getElementById('apellidos').value = JUGADORES[indexJugador].apellidos
    document.getElementById('nacionalidad').value = JUGADORES[indexJugador].nacionalidad
    document.getElementById('altura').value = JUGADORES[indexJugador].altura
    document.getElementById('peso').value = JUGADORES[indexJugador].peso
    if (JUGADORES[indexJugador].especialista) {
        document.getElementById('especialista').checked = true
    } else {
        document.getElementById('especialista').checked = false
    }
}


function clearEquiposFormInputs(){
    document.getElementById('nombre').value = ''
    document.getElementById('poblacion').value = ''
    document.getElementById('direccion').value = ''
    document.getElementById('estadio').value = ''
}

function clearJugadorFormInputs(){
    document.getElementById('nombre-jugador').value = ''
    document.getElementById('apellidos').value = ''
    document.getElementById('nacionalidad').value = ''
    document.getElementById('altura').value = ''
    document.getElementById('peso').value = ''
    document.getElementById('especialista').checked = false
}

function clearJugadoresTable(){
    JUGADORES = []
    document.getElementById('tbody-jugadores').innerHTML = ''
}