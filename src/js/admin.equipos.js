import { Equipo } from './classes/Equipo.js'
import { FactoriaJugador, TIPO_JUGADOR } from './classes/Jugador.js'
import { dataStore } from './classes/Store.js'

document.addEventListener('DOMContentLoaded', onDOMContentLoaded)

let JUGADORES = []
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

    crearEquipoBtn.addEventListener('click', guardarEquipo)
    formEquipo.addEventListener('submit', onSubmitForm)
    crearJugadorBtn.addEventListener('click', guardarJugador)
    formJugador.addEventListener('submit', onSubmitForm)
    limpiarBtn.addEventListener('click', clearEquiposFormInputs)

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
    const id = document.getElementById('eq-id').value
    const nombre = document.getElementById('nombre').value
    const poblacion = document.getElementById('poblacion').value
    const direccion = document.getElementById('direccion').value
    const estadio = document.getElementById('estadio').value

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
    const equipo = new Equipo(nombre, poblacion, direccion, estadio, JUGADORES)

    dataStore.get().equipos.push(equipo)

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
    dataStore.get().equipos.forEach(equipo => {
        if (equipo.id === id) {
            equipo.nombre = nombre
            equipo.poblacion = poblacion
            equipo.direccion = direccion
            equipo.estadio = estadio
            equipo.jugadores = JUGADORES
        }
    })

    localStorage.setItem('storedData', JSON.stringify(dataStore.get()))

    drawEquipoRowContent(dataStore.get().equipos.find(equipo => equipo.id === id))
    clearEquiposFormInputs()
    clearJugadoresTable()
}

/**
 * Recoge los valores del formulario de Jugador y valora si crear o actualizar
 */
function guardarJugador() {
    const id = document.getElementById('jg-id').value
    const nombre = document.getElementById('nombre-jugador').value
    const apellidos = document.getElementById('apellidos').value
    const nacionalidad = document.getElementById('nacionalidad').value
    const altura = document.getElementById('altura').value
    const peso = document.getElementById('peso').value
    const especialista = document.getElementById('especialista').checked
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
        jugador = miFactoria.createJugador(TIPO_JUGADOR.PRIMERA_LINEA, nombre, apellidos, nacionalidad, altura, peso)
    } else {
        jugador = miFactoria.createJugador(TIPO_JUGADOR.OTRO, nombre, apellidos, nacionalidad, altura, peso)
    }

    JUGADORES.push(jugador)
    
    drawJugadorRow(jugador)
    clearJugadorFormInputs()
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
    const index = JUGADORES.findIndex(jug => jug.id === id)
    let jugador
    if (especialista) {
        jugador = miFactoria.createJugador(TIPO_JUGADOR.PRIMERA_LINEA, nombre, apellidos, nacionalidad, altura, peso, id)
    } else {
        jugador = miFactoria.createJugador(TIPO_JUGADOR.OTRO, nombre, apellidos, nacionalidad, altura, peso, id)
    }
    console.log(jugador, index)
    if (index != -1) {
        JUGADORES[index] = jugador

        drawJugadorRowContent(jugador)
        clearJugadorFormInputs()
    } else {
        console.error('Jugador no encontrado')
    }
}

/**
 * Crea una fila en la tabla de equipos y llama a la función que crea el contenido
 * @param {Object} equipo 
 */
function drawEquipoRow(equipo) {
    const tbody = document.getElementById('tbody-equipos')
    const row = document.createElement('tr')

    row.id = `row_${equipo.id}`
    tbody.appendChild(row)

    drawEquipoRowContent(equipo)
} 

/**
 * Crea el contenido de una fila de la tabla Equipos con los datos de un Equipo
 * @param {Object} equipo 
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
    
    row.innerHTML = ''
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
    delBtn.innerText = '🗑'
    delBtn.addEventListener('click', borrarEquipo.bind(this, equipo.id))
    cellEdit.appendChild(delBtn)
}

/**
 * Crea una fila en la tabla de Jugadores y llama a la función que crea su contenido
 * @param {Object} jugador 
 */
function drawJugadorRow(jugador) {
    const tbody = document.getElementById('tbody-jugadores')
    const row = document.createElement('tr')

    row.id = `row_j_${jugador.id}`
    tbody.appendChild(row)

    drawJugadorRowContent(jugador)
}

/**
 * Crea el contenido de una fila de la tabla Jugadores con los datos de un Jugador
 * @param {Object} jugador 
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
    
    row.innerHTML = ''
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
    delBtn.innerText = '🗑'
    delBtn.addEventListener('click', borrarJugador.bind(this, jugador.id))
    cellEdit.appendChild(delBtn)
}

/**
 * Obtiene el Equipo del dataStore y vuelca sus datos en el formulario y muestra la tabla con sus Jugadores
 * @param {String} id 
 */
function editarEquipo(id) {
    const equipos = dataStore.get().equipos
    const equipo = equipos.find(element => element.id === id)
    const jugadores = equipo.jugadores

    console.log(equipo)

    document.getElementById('eq-id').value = equipo.id
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

/**
 * Obtiene los datos de un Jugador y los muestra en su formulario
 * @param {String} id 
 */
function editarJugador(id) {
    const indexJugador = JUGADORES.findIndex(element => element.id === id)

    document.getElementById('jg-id').value = JUGADORES[indexJugador].id
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

/**
 * Elimina un Equipo de la dataStore
 * @param {String} id 
 */
function borrarEquipo(id) {
    const index = dataStore.get().equipos.findIndex(eq => eq.id === id)
    if (window.confirm(`¿Desea borrar al equipo ${dataStore.get().equipos[index].nombre}?`)){
        dataStore.get().equipos.splice(index, 1)
        document.getElementById(`row_${id}`).remove()

        localStorage.setItem('storedData', JSON.stringify(dataStore.get()))
    }    
}

/**
 * Elimina un Jugador de la lista de Jugadores del Equipo
 * El cambio no es efectivo hasta que se guarde el Equipo en la dataStore
 * @param {String} id 
 */
function borrarJugador(id) {
    const index = JUGADORES.findIndex(jug => jug.id === id)

    JUGADORES.splice(index, 1)
    document.getElementById(`row_j_${id}`).remove()
}

/**
 * Limpia el formulario de Equipos
 */
function clearEquiposFormInputs(){
    document.getElementById('eq-id').value = ''
    document.getElementById('nombre').value = ''
    document.getElementById('poblacion').value = ''
    document.getElementById('direccion').value = ''
    document.getElementById('estadio').value = ''

    clearJugadorFormInputs()
    clearJugadoresTable()
}

/**
 * Limpia el formulario de Jugadores
 */
function clearJugadorFormInputs(){
    document.getElementById('jg-id').value = ''
    document.getElementById('nombre-jugador').value = ''
    document.getElementById('apellidos').value = ''
    document.getElementById('nacionalidad').value = ''
    document.getElementById('altura').value = ''
    document.getElementById('peso').value = ''
    document.getElementById('especialista').checked = false
}

/**
 * Limpia la tabla de Jugadores
 */
function clearJugadoresTable(){
    JUGADORES = []
    document.getElementById('tbody-jugadores').innerHTML = ''
}

/**
 * Obtiene la informacion de los Equipos del localStorage y lo añade al dataStore
 */
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