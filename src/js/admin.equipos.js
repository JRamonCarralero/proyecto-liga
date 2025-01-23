// @ts-check

import { Equipo } from './classes/Equipo.js'
import { Jugador, PrimeraLinea, FactoriaJugador, TIPO_JUGADOR } from './classes/Jugador.js'
import { dataStore } from './classes/Store.js'

/**
 * @typedef {Object} storedDataType
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
    const limpiarJugadorBtn = document.getElementById('limpiar-jugador-btn')

    crearEquipoBtn?.addEventListener('click', guardarEquipo)
    formEquipo?.addEventListener('submit', onSubmitForm)
    crearJugadorBtn?.addEventListener('click', guardarJugador)
    formJugador?.addEventListener('submit', onSubmitForm)
    limpiarBtn?.addEventListener('click', clearEquiposFormInputs)
    limpiarJugadorBtn?.addEventListener('click', clearJugadorFormInputs)

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
 * Devuelve el valor del checked de un elemento input de tipo checkbox
 * Si no existe el elemento, devuelve false
 * @param {String} idElement    
 * @returns {Boolean}
 */
function getInputChecked(idElement) {
    const element = document.getElementById(idElement)
    if (element) {
        return /** @type {HTMLInputElement} */(element).checked
    } else {
        return false
    }
}

/**
 * Setea el valor del checked de un elemento input de tipo checkbox
 * @param {String} idElement    id del elemento
 * @param {Boolean} value       valor a setear
 */
function setInputChecked(idElement, value) {
    const element = document.getElementById(idElement)
    if (element) {
        /** @type {HTMLInputElement} */(element).checked = value
    }
}

/**
 * Recoge los valores del formulario de Equipo y valora si llamar a crear o actualizar
 */
function guardarEquipo() {
    const id = getInputValue('eq-id')
    const nombre = getInputValue('nombre')
    const poblacion = getInputValue('poblacion')
    const direccion = getInputValue('direccion')
    const estadio = getInputValue('estadio')

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
    const id = getInputValue('jg-id')
    const nombre =getInputValue('nombre-jugador')
    const apellidos = getInputValue('apellidos')
    const nacionalidad = getInputValue('nacionalidad')
    const altura = getInputValue('altura')
    const peso = getInputValue('peso')
    const especialista = getInputChecked('especialista')
    console.log(especialista)
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
    
    if (row) row.innerHTML = ''
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
        setInputValue('eq-id', equipo.id)
        setInputValue('nombre', equipo.nombre)
        setInputValue('poblacion', equipo.poblacion)
        setInputValue('direccion', equipo.direccion)
        setInputValue('estadio', equipo.estadio)
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

    setInputValue('jg-id', arrJugadores[indexJugador].id)
    setInputValue('nombre-jugador', arrJugadores[indexJugador].nombre)
    setInputValue('apellidos', arrJugadores[indexJugador].apellidos)
    setInputValue('nacionalidad', arrJugadores[indexJugador].nacionalidad)
    setInputValue('altura', String(arrJugadores[indexJugador].altura))
    setInputValue('peso', String(arrJugadores[indexJugador].peso))
    if (arrJugadores[indexJugador].hasOwnProperty('especialista')) {
        setInputChecked('especialista', true)
    } else {
        setInputChecked('especialista', false)
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
    setInputValue('eq-id', '')
    setInputValue('nombre', '')
    setInputValue('poblacion', '')
    setInputValue('direccion', '')
    setInputValue('estadio', '')

    clearJugadorFormInputs()
    clearJugadoresTable()
}

/**
 * Limpia el formulario de Jugadores
 */
function clearJugadorFormInputs(){
    setInputValue('jg-id', '')
    setInputValue('nombre-jugador', '')
    setInputValue('apellidos', '')
    setInputValue('nacionalidad', '')
    setInputValue('altura', '')
    setInputValue('peso', '')
    setInputChecked('especialista', false)
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
    /** @type {storedDataType} */
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