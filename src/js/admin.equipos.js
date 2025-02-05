// @ts-check

import { Equipo } from './classes/Equipo.js'
import { FactoriaJugador, TIPO_JUGADOR } from './classes/Jugador.js'
import { store } from './store/redux.js'
import { setInputChecked, getInputChecked, setInputValue, getInputValue, getAPIData } from './utils/utils.js'
import { getUser, logoutUser } from './login.js'

/**
 * @import { Jugador, PrimeraLinea } from './classes/Jugador.js' 
 */

document.addEventListener('DOMContentLoaded', onDOMContentLoaded)

let pagina = 1
const miFactoria = new FactoriaJugador

// ------- EVENTS ------- //

/**
 * Carga los eventos de los botones y formularios y llamar a readEquipos
 */
async function onDOMContentLoaded() {
    //const apiData = await getAPIData(`http://${location.hostname}:1337/store.data.json`)
    //store.loadState(apiData)

    const currentUser = getUser()
    if (!currentUser) {
        window.location.href = 'admin.html'
    }

    const crearEquipoBtn = document.getElementById('crear-equipo-btn')
    const formEquipo = document.getElementById('form-equipo')
    const crearJugadorBtn = document.getElementById('crear-jugador-btn')
    const formJugador = document.getElementById('form-jugador')
    const limpiarBtn = document.getElementById('limpiar-btn')
    const showFormEquipoBtn = document.getElementById('show-form-equipo-btn')
    const cancelarBtn = document.getElementById('cancelar-btn')
    const logoutBtn = document.getElementById('logout-btn')
    const btnPrevEquipos = document.getElementById('btn-prev-equipos')
    const btnNextEquipos = document.getElementById('btn-next-equipos')

    crearEquipoBtn?.addEventListener('click', guardarEquipo)
    formEquipo?.addEventListener('submit', onSubmitForm)
    crearJugadorBtn?.addEventListener('click', guardarJugador)
    formJugador?.addEventListener('submit', onSubmitForm)
    limpiarBtn?.addEventListener('click', clearEquiposFormInputs)
    showFormEquipoBtn?.addEventListener('click', mostrarEquipoForm)
    cancelarBtn?.addEventListener('click', cancelarGuardadoEquipo)
    logoutBtn?.addEventListener('click', logoutUser)
    btnPrevEquipos?.addEventListener('click', prevEquipos)
    btnNextEquipos?.addEventListener('click', nextEquipos)

    window.addEventListener('stateChanged', (event) => {
        console.log('stateChanged', /** @type {CustomEvent} */(event).detail)
    })

    readEquipos()
    ocultarEquipoForm()
}

/**
 * Cancela el submit de un form
 * @param {Event} e 
 */
function onSubmitForm(e) {
    e.preventDefault()
}


// ------- METHODS ------- //

// Equipos //

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
    const equipo = new Equipo(nombre, poblacion, direccion, estadio)

    store.equipo.create(equipo,() => {store.saveState()})

    readEquipos()
    editarEquipo(equipo.id)
    /* clearEquiposFormInputs()
    clearJugadoresTable()
    ocultarEquipoForm() */
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
    const equipo = /** @type {Equipo} */{...store.equipo.getById(id)}
    equipo.nombre = nombre
    equipo.poblacion = poblacion
    equipo.direccion = direccion
    equipo.estadio = estadio

    store.equipo.update(equipo,() => {store.saveState()})
  
    drawEquipoRowContent(equipo)
    clearEquiposFormInputs()
    clearJugadoresTable()
    ocultarEquipoForm()
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
 * Obtiene el Equipo del dataStore y vuelca sus datos en el formulario y muestra la tabla con sus Jugadores
 * @param {String} id 
 */
async function editarEquipo(id) {
    //const equipo = store.equipo.getById(id)
    const equipo = await getAPIData(`http://${location.hostname}:1337/findbyid/equipos?id=${id}`)
    //const jugadores = store.getJugadoresFromEquipoId(id)
    const jugadores = await getAPIData(`http://${location.hostname}:1337/filter/jugadores?tipo=equipoId&filter=${id}`)

    if (equipo) {
        setInputValue('eq-id', equipo.id)
        setInputValue('nombre', equipo.nombre)
        setInputValue('poblacion', equipo.poblacion)
        setInputValue('direccion', equipo.direccion)
        setInputValue('estadio', equipo.estadio)
    }    

    clearJugadoresTable()
    clearJugadorFormInputs()
    if (jugadores) jugadores.forEach(/**@param {Jugador} jugador*/jugador => {
        drawJugadorRow(jugador)
    })
    mostrarEquipoForm()
}

/**
 * Elimina un Equipo de la dataStore
 * @param {String} id 
 */
function borrarEquipo(id) {
    const equipo = store.equipo.getById(id)
    if (window.confirm(`¿Desea borrar al equipo ${equipo.nombre}?`)){
        const jugadores = store.getJugadoresFromEquipoId(id)
        jugadores.forEach(/**@param {Jugador} jugador*/jugador => {
            store.deleteJugadorFromEquipo(jugador.id,() => {store.saveState()})
        })

        store.equipo.delete(equipo,() => {store.saveState()})
        readEquipos()
    }   
}

/**
 * Obtiene la informacion de los Equipos de la store y los muestra en la tabla
 */
async function readEquipos() {
    const btnNext = document.getElementById('btn-next-equipos')
    const btnPrev = document.getElementById('btn-prev-equipos')
    //const respEquipos = store.equipo.getPage(pagina)
    const respEquipos = await getAPIData(`http://${location.hostname}:1337/readpage/equipos?page=${pagina}`)
    respEquipos.data.forEach(/** @param {Equipo} equipo */equipo => drawEquipoRow(equipo))
    if (respEquipos.siguiente) {
        if (btnNext) btnNext.style.display = 'block'
    } else {
        if (btnNext) btnNext.style.display = 'none'
    }
    if (respEquipos.anterior) {
        if (btnPrev) btnPrev.style.display = 'block'
    } else {
        if (btnPrev) btnPrev.style.display = 'none'
    }
}

/**
 * Muestra las siguientes 20 noticias en la pagina de noticias
 */
function nextEquipos() {
    pagina += 1
    const tbody = document.getElementById('tbody-equipos')
    if (tbody) tbody.innerHTML = ''
    readEquipos()
}

/**
 * Muestra las 20 noticias previas en la pagina de noticias
 */
function prevEquipos() {
    pagina -= 1
    const tbody = document.getElementById('tbody-equipos')
    if (tbody) tbody.innerHTML = ''
    readEquipos()
}


// Jugadores //

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
    const equipoId = getInputValue('eq-id')
    let jugador
    if (especialista) {
        jugador = miFactoria.createJugador(TIPO_JUGADOR.PRIMERA_LINEA, nombre, apellidos, nacionalidad, altura, peso, equipoId, '')
    } else {
        jugador = miFactoria.createJugador(TIPO_JUGADOR.OTRO, nombre, apellidos, nacionalidad, altura, peso, equipoId, '')
    }

    if (jugador){
        store.jugador.create(jugador,() => {store.saveState()})
    
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
    const equipoId = getInputValue('eq-id')
    let jugador
    if (especialista) {
        jugador = miFactoria.createJugador(TIPO_JUGADOR.PRIMERA_LINEA, nombre, apellidos, nacionalidad, altura, peso, equipoId, id)
    } else {
        jugador = miFactoria.createJugador(TIPO_JUGADOR.OTRO, nombre, apellidos, nacionalidad, altura, peso, equipoId, id)
    }
    if (jugador) {
        store.jugador.update(jugador,() => {store.saveState()})

        drawJugadorRowContent(jugador)
        clearJugadorFormInputs()
    } else {
        console.error('Jugador no encontrado')
    }
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
 * Obtiene los datos de un Jugador y los muestra en su formulario
 * @param {String} id 
 */
async function editarJugador(id) {
    //const jugador = store.jugador.getById(id)
    const jugador = await getAPIData(`http://${location.hostname}:1337/findbyid/jugadores?id=${id}`)
    setInputValue('jg-id', jugador.id)
    setInputValue('nombre-jugador', jugador.nombre)
    setInputValue('apellidos', jugador.apellidos)
    setInputValue('nacionalidad', jugador.nacionalidad)
    setInputValue('altura', String(jugador.altura))
    setInputValue('peso', String(jugador.peso))
    if (jugador.especialista) {
        setInputChecked('especialista', true)
    } else {
        setInputChecked('especialista', false)
    }
}

/**
 * Elimina un Jugador de la lista de Jugadores del Equipo
 * El cambio no es efectivo hasta que se guarde el Equipo en la dataStore
 * @param {String} id 
 */
function borrarJugador(id) {
    document.getElementById(`row_j_${id}`)?.remove()

    store.deleteJugadorFromEquipo(id)
}


// Mostrar, ocultar y limpiar formularios //


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
    const tbody = document.getElementById('tbody-jugadores')
    if (tbody) tbody.innerHTML = ''
}

/**
 * Muestra el formulario de Equipos
 */
function mostrarEquipoForm() {
    const equipoFormContainer = document.getElementById('equipo-form-container')
    const tableEquiposContainer = document.getElementById('table-equipos-container')
    const showFormEquipoBtn = document.getElementById('show-form-equipo-btn')
    const jugadoresContainer = document.getElementById('jugadores-container')
    const eqId = getInputValue('eq-id')

    if (eqId) {
        if (jugadoresContainer) jugadoresContainer.style.display = 'block'
    } else{
        if (jugadoresContainer) jugadoresContainer.style.display = 'none'
    }
    if (tableEquiposContainer) tableEquiposContainer.style.display = 'none'
    if (equipoFormContainer) equipoFormContainer.style.display = 'block'
    if (showFormEquipoBtn) showFormEquipoBtn.style.display = 'none'
}

/**
 * Oculta el formulario de Equipos y muestra la tabla de Equipos
 */
function ocultarEquipoForm() {
    const equipoFormContainer = document.getElementById('equipo-form-container')
    const tableEquiposContainer = document.getElementById('table-equipos-container')
    const showFormEquipoBtn = document.getElementById('show-form-equipo-btn')
    
    if (tableEquiposContainer) tableEquiposContainer.style.display = 'block'
    if (equipoFormContainer) equipoFormContainer.style.display = 'none'
    if (showFormEquipoBtn) showFormEquipoBtn.style.display = 'inline'
}

function cancelarGuardadoEquipo() {
   /*  const equipoId = getInputValue('eq-id')
    if (equipoId) {
        const equipo = store.equipo.getById(equipoId)
        if (equipo) {
            const jugadores = equipo.jugadores
            arrJugadores.forEach(jugadorId => {
                if (!jugadores.includes(jugadorId)) {
                    const jugador = store.jugador.getById(jugadorId)
                    store.jugador.delete(jugador,() => {store.saveState()})
                }
            })
        }
    } else {
        arrJugadores.forEach(jugadorId => {
            const jugador = store.jugador.getById(jugadorId)
            store.jugador.delete(jugador,() => {store.saveState()})
        })
    }
    arrJugadores = [] */
    ocultarEquipoForm()
}