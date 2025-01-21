import { Equipo } from './classes/Equipo.js'
import { FactoriaJugador, TIPO_JUGADOR } from './classes/Jugador.js'
import { dataStore } from './classes/Store.js'

document.addEventListener('DOMContentLoaded', onDOMContentLoaded)

const JUGADORES = []
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
    console.log(jugador)

    JUGADORES.push(jugador)
}

function readEquipos() {
    const storedData = JSON.parse(localStorage.getItem('storedData')) || {}
    if (storedData.hasOwnProperty('equipos')) {
        const equipos = storedData['equipos']
        equipos.forEach(equipo => {
            drawEquipoRow(equipo)
        })
    }
}

function drawEquipoRow(equipo) {
    console.log(equipo)
} 
