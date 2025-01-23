// @ts-check

import { Equipo } from './classes/Equipo.js'
import { Jugador, PrimeraLinea, FactoriaJugador, TIPO_JUGADOR } from './classes/Jugador.js'
import { dataStore } from './classes/Store.js'

/**
 * @typedef storedData
 * @property {Equipo[]=} equipos 
 * @property {import("./classes/Usuario").Usuario[]=} usuarios 
 * @property {import("./classes/Noticia").Noticia[]=} noticias 
 * @property {import("./classes/Liga").Liga[]=} ligas 
 */

document.addEventListener('DOMContentLoaded', onDOMContentLoaded)

/**
 * @type {(Jugador | PrimeraLinea)[]}
 */
let arrJugadores = []
const miFactoria = new FactoriaJugador

// ------- EVENTS ------- //

/**
 * Carga los eventos de los botones y formularios y llamar a readEquipos
 */
function onDOMContentLoaded() {
    const crearEquipoBtn = document.getElementById('crear-equipo-btn')
    const formEquipo = document.getElementById('form-equipo')
    const crearJugadorBtn = document.getElementById('crear-jugador-btn')
    const formJugador = document.getElementById('form-jugador')
    const limpiarBtn = document.getElementById('limpiar-btn')

    crearEquipoBtn?.addEventListener('click', guardarEquipo)
    formEquipo?.addEventListener('submit', onSubmitForm)
    crearJugadorBtn?.addEventListener('click', guardarJugador)
    formJugador?.addEventListener('submit', onSubmitForm)
    limpiarBtn?.addEventListener('click', clearEquiposFormInputs)

    readEquipos()
    //loadEquiposIntoLocalStorage()
}

/**
 * Cancela el submit de un form
 * @param {Event} e 
 */
function onSubmitForm(e) {
    e.preventDefault()
}



// ------- METHODS ------- //

/**
 * Recoge los valores del formulario de Equipo y valora si llamar a crear o actualizar
 */
function guardarEquipo() {
    const id = document.getElementById('eq-id')?.getAttribute('value') || ''
    const nombre = document.getElementById('nombre')?.getAttribute('value') || ''
    const poblacion = document.getElementById('poblacion')?.getAttribute('value') || ''
    const direccion = document.getElementById('direccion')?.getAttribute('value') || ''
    const estadio = document.getElementById('estadio')?.getAttribute('value') || ''

    if (id) {
        updateEquipo(id, nombre, poblacion, direccion, estadio)
    } else {
        crearEquipo(nombre, poblacion, direccion, estadio)
    }

}

/**
 * Crea el objeto Equipo y lo añade al dataStore
 * @param {String} nombre 
 * @param {String} poblacion 
 * @param {String} direccion 
 * @param {String} estadio 
 */
function crearEquipo(nombre, poblacion, direccion, estadio) {
    const equipo = new Equipo(nombre, poblacion, direccion, estadio, arrJugadores)

    dataStore.get().equipos?.push(equipo)

    localStorage.setItem('storedData', JSON.stringify(dataStore.get()))

    drawEquipoRow(equipo)
    clearEquiposFormInputs()
    clearJugadoresTable()
}

/**
 * Actualiza un Equipo de la dataStore
 * @param {String} id 
 * @param {String} nombre 
 * @param {String} poblacion 
 * @param {String} direccion 
 * @param {String} estadio 
 */
function updateEquipo(id, nombre, poblacion, direccion, estadio) {
    dataStore.get().equipos?.forEach(/**@param {Equipo} equipo*/equipo => {
        if (equipo.id === id) {
            equipo.nombre = nombre
            equipo.poblacion = poblacion
            equipo.direccion = direccion
            equipo.estadio = estadio
            equipo.jugadores = arrJugadores
        }
    })

    localStorage.setItem('storedData', JSON.stringify(dataStore.get()))

    const equipoSeleccionado = dataStore.get().equipos?.find(/**@param {Equipo} equipo*/equipo => equipo.id === id)
    if (equipoSeleccionado)drawEquipoRowContent(equipoSeleccionado)
    clearEquiposFormInputs()
    clearJugadoresTable()
}

/**
 * Recoge los valores del formulario de Jugador y valora si crear o actualizar
 */
function guardarJugador() {
    const id = document.getElementById('jg-id')?.getAttribute('value') || ''
    const nombre = document.getElementById('nombre-jugador')?.getAttribute('value') || ''
    const apellidos = document.getElementById('apellidos')?.getAttribute('value') || ''
    const nacionalidad = document.getElementById('nacionalidad')?.getAttribute('value') || ''
    const altura = document.getElementById('altura')?.getAttribute('value') || ''
    const peso = document.getElementById('peso')?.getAttribute('value') || ''
    const especialista = document.getElementById('especialista')?.getAttribute('checked') === 'true' || false
    console.log(id)
    if (id) {
        updateJugador(id, nombre, apellidos, nacionalidad, altura, peso, especialista)
    } else {
        crearJugador(nombre, apellidos, nacionalidad, altura, peso, especialista)
    }
}

/**
 * Llama a la factoria para crear un nuevo objeto, que puede ser de tipo Jugador o PrimeraLinea, y crea el jugador
 * @param {String} nombre 
 * @param {String} apellidos 
 * @param {String} nacionalidad 
 * @param {String} altura 
 * @param {String} peso 
 * @param {Boolean} especialista 
 */
function crearJugador(nombre, apellidos, nacionalidad, altura, peso, especialista) {
    let jugador
    if (especialista) {
        jugador = miFactoria.createJugador(TIPO_JUGADOR.PRIMERA_LINEA, nombre, apellidos, nacionalidad, altura, peso, '')
    } else {
        jugador = miFactoria.createJugador(TIPO_JUGADOR.OTRO, nombre, apellidos, nacionalidad, altura, peso, '')
    }

    if (jugador){
        arrJugadores.push(jugador)
    
        drawJugadorRow(jugador)
        clearJugadorFormInputs()
    } else {
        console.error('function crearJugador:  no se encontró jugador')
    }
    
}

/**
 * Llama a la factoria para crear un nuevo objeto, que puede ser de tipo Jugador o PrimeraLinea y actualiza el jugador
 * @param {String} id 
 * @param {String} nombre 
 * @param {String} apellidos 
 * @param {String} nacionalidad 
 * @param {String} altura 
 * @param {String} peso 
 * @param {Boolean} especialista 
 */
function updateJugador(id, nombre, apellidos, nacionalidad, altura, peso, especialista) {
    const index = arrJugadores.findIndex(jug => jug.id === id)
    let jugador
    if (especialista) {
        jugador = miFactoria.createJugador(TIPO_JUGADOR.PRIMERA_LINEA, nombre, apellidos, nacionalidad, altura, peso, id)
    } else {
        jugador = miFactoria.createJugador(TIPO_JUGADOR.OTRO, nombre, apellidos, nacionalidad, altura, peso, id)
    }
    console.log(jugador, index)
    if (index != -1 && jugador) {
        arrJugadores[index] = jugador

        drawJugadorRowContent(jugador)
        clearJugadorFormInputs()
    } else {
        console.error('Jugador no encontrado')
    }
}

/**
 * Crea una fila en la tabla de equipos y llama a la función que crea el contenido
 * @param {Equipo} equipo 
 */
function drawEquipoRow(equipo) {
    const tbody = document.getElementById('tbody-equipos')
    const row = document.createElement('tr')

    row.id = `row_${equipo.id}`
    tbody?.appendChild(row)

    drawEquipoRowContent(equipo)
} 

/**
 * Crea el contenido de una fila de la tabla Equipos con los datos de un Equipo
 * @param {Equipo} equipo
 */
function drawEquipoRowContent(equipo) {
    const row = document.getElementById(`row_${equipo.id}`)
    const cellId = document.createElement('td')
    const cellNombre = document.createElement('td')
    const cellPoblacion = document.createElement('td')
    const cellDireccion = document.createElement('td')
    const cellEstadio = document.createElement('td')
    const cellEdit = document.createElement('td')
    const editBtn = document.createElement('button')
    const delBtn = document.createElement('button')
    
    if (row) {
        row.innerHTML = ''
    }
    cellId.innerText = equipo.id
    row?.appendChild(cellId)
    cellNombre.innerText = equipo.nombre
    row?.appendChild(cellNombre)
    cellPoblacion.innerText = equipo.poblacion
    row?.appendChild(cellPoblacion)
    cellDireccion.innerText = equipo.direccion
    row?.appendChild(cellDireccion)
    cellEstadio.innerText = equipo.estadio
    row?.appendChild(cellEstadio)
    row?.appendChild(cellEdit)
    editBtn.innerText = '✎'
    editBtn.addEventListener('click', editarEquipo.bind(editBtn, equipo.id))
    cellEdit.appendChild(editBtn)
    delBtn.innerText = '🗑'
    delBtn.addEventListener('click', borrarEquipo.bind(delBtn, equipo.id))
    cellEdit.appendChild(delBtn)
}

/**
 * Crea una fila en la tabla de Jugadores y llama a la función que crea su contenido
 * @param {Jugador | PrimeraLinea} jugador 
 */
function drawJugadorRow(jugador) {
    const tbody = document.getElementById('tbody-jugadores')
    const row = document.createElement('tr')

    row.id = `row_j_${jugador.id}`
    tbody?.appendChild(row)

    drawJugadorRowContent(jugador)
}

/**
 * Crea el contenido de una fila de la tabla Jugadores con los datos de un Jugador
 * @param {Jugador | PrimeraLinea} jugador
 */
function drawJugadorRowContent(jugador) {
    const row = document.getElementById(`row_j_${jugador.id}`)
    const cellId = document.createElement('td')
    const cellNombre = document.createElement('td')
    const cellApellidos = document.createElement('td')
    const cellNacionalidad = document.createElement('td')
    const cellAltura = document.createElement('td')
    const cellPeso = document.createElement('td')
    const cellEdit = document.createElement('td')
    const editBtn = document.createElement('button')
    const delBtn = document.createElement('button')
    
    if (row) {
        row.innerHTML = ''
    }
    cellId.innerText = jugador.id
    row?.appendChild(cellId)    
    cellNombre.innerText = jugador.nombre
    row?.appendChild(cellNombre)  
    cellApellidos.innerText = jugador.apellidos
    row?.appendChild(cellApellidos)  
    cellNacionalidad.innerText = jugador.nacionalidad
    row?.appendChild(cellNacionalidad)  
    cellAltura.innerText = String(jugador.altura)
    row?.appendChild(cellAltura)  
    cellPeso.innerText = String(jugador.peso)
    row?.appendChild(cellPeso) 
    row?.appendChild(cellEdit)
    editBtn.innerText = '✎'
    editBtn.addEventListener('click', editarJugador.bind(editBtn, jugador.id))
    cellEdit.appendChild(editBtn)
    delBtn.innerText = '🗑'
    delBtn.addEventListener('click', borrarJugador.bind(delBtn, jugador.id))
    cellEdit.appendChild(delBtn)
}

/**
 * Obtiene el Equipo del dataStore y vuelca sus datos en el formulario y muestra la tabla con sus Jugadores
 * @param {String} id 
 */
function editarEquipo(id) {
    const equipos = dataStore.get().equipos
    const equipo = equipos?.find(/**@param {Equipo} element*/element => element.id === id)
    const jugadores = equipo?.jugadores

    console.log(equipo)
    if (equipo) {
        document.getElementById('eq-id')?.setAttribute('value', equipo.id)
        document.getElementById('nombre')?.setAttribute('value', equipo.nombre)
        document.getElementById('poblacion')?.setAttribute('value', equipo.poblacion)
        document.getElementById('direccion')?.setAttribute('value', equipo.direccion)
        document.getElementById('estadio')?.setAttribute('value', equipo.estadio)
    }    

    clearJugadoresTable()
    clearJugadorFormInputs()
    if (jugadores) jugadores.forEach(/**@param {(Jugador | PrimeraLinea)} jugador*/jugador => {
        drawJugadorRow(jugador)
        arrJugadores.push(jugador)
    })
}

/**
 * Obtiene los datos de un Jugador y los muestra en su formulario
 * @param {String} id 
 */
function editarJugador(id) {
    const indexJugador = arrJugadores.findIndex(element => element.id === id)

    document.getElementById('jg-id')?.setAttribute('value', arrJugadores[indexJugador].id)
    document.getElementById('nombre-jugador')?.setAttribute('value', arrJugadores[indexJugador].nombre)
    document.getElementById('apellidos')?.setAttribute('value', arrJugadores[indexJugador].apellidos)
    document.getElementById('nacionalidad')?.setAttribute('value', arrJugadores[indexJugador].nacionalidad)
    document.getElementById('altura')?.setAttribute('value', String(arrJugadores[indexJugador].altura))
    document.getElementById('peso')?.setAttribute('value', String(arrJugadores[indexJugador].peso))
    if (arrJugadores[indexJugador].hasOwnProperty('especialista')) {
        document.getElementById('especialista')?.setAttribute('checked', 'true')
    } else {
        document.getElementById('especialista')?.setAttribute('checked', 'false')
    }
}

/**
 * Elimina un Equipo de la dataStore
 * @param {String} id 
 */
function borrarEquipo(id) {
    const index = dataStore.get().equipos?.findIndex(/**@param {Equipo} eq*/eq => eq.id === id)
    const equipos = dataStore.get().equipos
    if (index && index !== -1 && equipos) {
        const nombreEquipo = equipos[index].nombre
        if (window.confirm(`¿Desea borrar al equipo ${nombreEquipo}?`)){
            dataStore.get().equipos?.splice(index, 1)
            document.getElementById(`row_${id}`)?.remove()
    
            localStorage.setItem('storedData', JSON.stringify(dataStore.get()))
        }  
    }  
}

/**
 * Elimina un Jugador de la lista de Jugadores del Equipo
 * El cambio no es efectivo hasta que se guarde el Equipo en la dataStore
 * @param {String} id 
 */
function borrarJugador(id) {
    const index = arrJugadores.findIndex(jug => jug.id === id)

    arrJugadores.splice(index, 1)
    document.getElementById(`row_j_${id}`)?.remove()
}

/**
 * Limpia el formulario de Equipos
 */
function clearEquiposFormInputs(){
    document.getElementById('eq-id')?.setAttribute('value', '')
    document.getElementById('nombre')?.setAttribute('value', '')
    document.getElementById('poblacion')?.setAttribute('value', '')
    document.getElementById('direccion')?.setAttribute('value', '')
    document.getElementById('estadio')?.setAttribute('value', '')

    clearJugadorFormInputs()
    clearJugadoresTable()
}

/**
 * Limpia el formulario de Jugadores
 */
function clearJugadorFormInputs(){
    document.getElementById('jg-id')?.setAttribute('value', '')
    document.getElementById('nombre-jugador')?.setAttribute('value', '')
    document.getElementById('apellidos')?.setAttribute('value', '')
    document.getElementById('nacionalidad')?.setAttribute('value', '')
    document.getElementById('altura')?.setAttribute('value', '')
    document.getElementById('peso')?.setAttribute('value', '')
    document.getElementById('especialista')?.setAttribute('checked', 'false')
}

/**
 * Limpia la tabla de Jugadores
 */
function clearJugadoresTable(){
    arrJugadores = []
    const tbody = document.getElementById('tbody-jugadores')
    if (tbody) tbody.innerHTML = ''
}

/**
 * Obtiene la informacion de los Equipos del localStorage y lo añade al dataStore
 */
function readEquipos() {
    const jsonStoredData = localStorage.getItem('storedData')
    /** @type {storedData} */
    let storedData = {}
    if (jsonStoredData) {
        storedData = JSON.parse(jsonStoredData)
    }
    //const storedData = JSON.parse(localStorage.getItem('storedData')) || {}
    if (storedData.hasOwnProperty('equipos')) {
        dataStore.get().equipos = []
        const equipos = storedData.equipos
        equipos?.forEach(/**@param {Equipo} equipo*/equipo => {
            dataStore.get().equipos?.push(equipo)
            drawEquipoRow(equipo)
        })
    }
}

/*  
    USAR SOLO SI HAY QUE CARGAR DATOS

function loadEquiposIntoLocalStorage() {
    let equipos = []
    fetch('../apis/equipos.json')
        .then(response => response.json()) 
        .then(data => {
            equipos = data
            console.log('equipos: ', equipos)
            dataStore.get().equipos = equipos
            localStorage.setItem('storedData', JSON.stringify(dataStore.get()))
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
          });
}
          */