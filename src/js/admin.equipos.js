// @ts-check

/** @import { Equipo } from './classes/Equipo.js' */
/** @import { Jugador } from './classes/Jugador.js' */
import { setInputValue, getInputValue, getAPIData } from './utils/utils.js'
import { getUser, logoutUser } from './login.js'

document.addEventListener('DOMContentLoaded', onDOMContentLoaded)

const API_PORT = location.port ? `:${location.port}` : ''
let pagina = 1

// ------- EVENTS ------- //

/**
 * Carga los eventos de los botones y formularios y llamar a readEquipos
 */
async function onDOMContentLoaded() {
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
    showFormEquipoBtn?.addEventListener('click', mostrarVacioEquipoForm)
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
 * Envia al servidor los datos de un Equipo y lo guarda en la base de datos
 * Activa la edición del equipo creado para añadirle jugadores
 * @param {String} nombre 
 * @param {String} poblacion 
 * @param {String} direccion 
 * @param {String} estadio 
 */
async function crearEquipo(nombre, poblacion, direccion, estadio) {
    const campos = {
        "nombre": nombre,
        "poblacion": poblacion,
        "direccion": direccion,
        "estadio": estadio
    }
    const payload = JSON.stringify(campos)
    const newEquipo = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/create/equipos`, 'POST', payload)

    readEquipos()
    editarEquipo(newEquipo._id)
}

/**
 * Recoge los datos de un Equipo y los envia al servidor para actualizarlo
 * @param {String} id 
 * @param {String} nombre 
 * @param {String} poblacion 
 * @param {String} direccion 
 * @param {String} estadio 
 */
async function updateEquipo(id, nombre, poblacion, direccion, estadio) {
    const equipo = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/findbyid/equipos/${id}`)
    const camposModificados = {}
    const newEquipo = { ...equipo }
    if (newEquipo.nombre !== nombre) {
        camposModificados.nombre = nombre
        newEquipo.nombre = nombre
    }
    if (newEquipo.poblacion !== poblacion) {
        camposModificados.poblacion = poblacion
        newEquipo.poblacion = poblacion
    }
    if (newEquipo.direccion !== direccion) {
        camposModificados.direccion = direccion
        newEquipo.direccion = direccion
    }
    if (newEquipo.estadio !== estadio) {
        camposModificados.estadio = estadio
        newEquipo.estadio = estadio
    }
    const payload = JSON.stringify(camposModificados)
    await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/update/equipos/${id}`, 'PUT',  payload)
  
    drawEquipoRowContent(newEquipo)
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

    row.id = `row_${equipo._id}`
    tbody?.appendChild(row)

    drawEquipoRowContent(equipo)
} 

/**
 * Crea el contenido de una fila de la tabla Equipos con los datos de un Equipo
 * @param {Equipo} equipo
 */
function drawEquipoRowContent(equipo) {
    const row = document.getElementById(`row_${equipo._id}`)
    const cellId = document.createElement('td')
    const cellNombre = document.createElement('td')
    const cellPoblacion = document.createElement('td')
    const cellDireccion = document.createElement('td')
    const cellEstadio = document.createElement('td')
    const cellEdit = document.createElement('td')
    const editBtn = document.createElement('button')
    const delBtn = document.createElement('button')
    
    if (row) row.innerHTML = ''
    cellId.innerText = equipo._id
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
    editBtn.addEventListener('click', editarEquipo.bind(editBtn, equipo._id))
    cellEdit.appendChild(editBtn)
    delBtn.innerText = '🗑'
    delBtn.addEventListener('click', borrarEquipo.bind(delBtn, equipo._id))
    cellEdit.appendChild(delBtn)
}

/**
 * Obtiene el Equipo y sus jugadores del servidor y vuelca sus datos en el formulario y la tabla de Jugadores
 * @param {String} id 
 */
async function editarEquipo(id) {
    const equipo = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/findbyid/equipos/${id}`)
    const jugadores = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/filter/jugadores/${id}`)

    if (equipo) {
        setInputValue('eq-id', equipo._id)
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
 * Elimina un Equipo de la base de datos
 * @param {String} id 
 */
async function borrarEquipo(id) {
    const equipo = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/findbyid/equipos/${id}`)
    if (window.confirm(`¿Desea borrar al equipo ${equipo.nombre}?`)){
        const campos = {equipoId: ''}
        const payload = JSON.stringify(campos)
        await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/update/jugadores/many/equipo/${id}`, 'PUT', payload)

        const resp = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/delete/equipos/${id}`, 'DELETE')
        if (resp) alert('Equipo borrado con exito')
        readEquipos()
    }   
}

/**
 * Obtiene la informacion de los Equipos de la BBDD y llama a la funcion que los muestra
 */
async function readEquipos() {
    clearEquiposTable()
    const btnNext = document.getElementById('btn-next-equipos')
    const btnPrev = document.getElementById('btn-prev-equipos')
    const respEquipos = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/read/equipos/page/${pagina}`)
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
 * Muestra la siguiente pagina de Equipos
 */
function nextEquipos() {
    pagina += 1
    const tbody = document.getElementById('tbody-equipos')
    if (tbody) tbody.innerHTML = ''
    readEquipos()
}

/**
 * Muestra la anterior pagina de Equipos
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
    if (id) {
        updateJugador(id, nombre, apellidos, nacionalidad, altura, peso)
    } else {
        crearJugador(nombre, apellidos, nacionalidad, altura, peso)
    }
}

/**
 * Crea el Jugador en la BBDD
 * @param {String} nombre 
 * @param {String} apellidos 
 * @param {String} nacionalidad 
 * @param {String} altura 
 * @param {String} peso 
 */
async function crearJugador(nombre, apellidos, nacionalidad, altura, peso) {
    const equipoId = getInputValue('eq-id')
    const campos = {nombre, apellidos, nacionalidad, altura, peso, equipoId}

    const payload = JSON.stringify(campos)
    const newJugador = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/create/jugadores`, 'POST', payload)
    drawJugadorRow(newJugador)
    clearJugadorFormInputs()
}

/**
 * Actualiza el Jugador en la BBDD
 * @param {String} id 
 * @param {String} nombre 
 * @param {String} apellidos 
 * @param {String} nacionalidad 
 * @param {String} altura 
 * @param {String} peso 
 */
async function updateJugador(id, nombre, apellidos, nacionalidad, altura, peso) {
    const equipoId = getInputValue('eq-id')
    
    const camposModificados = {}
    const jugadorAPI = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/findbyid/jugadores/${id}`)
    const newJugador = { ...jugadorAPI }
    if (newJugador.nombre !== nombre) {
        camposModificados.nombre = nombre
        newJugador.nombre = nombre
    }
    if (newJugador.apellidos !== apellidos) {
        camposModificados.apellidos = apellidos
        newJugador.apellidos = apellidos
    }
    if (newJugador.nacionalidad !== nacionalidad) {
        camposModificados.nacionalidad = nacionalidad
        newJugador.nacionalidad = nacionalidad
    }
    if (newJugador.altura !== altura) {
        camposModificados.altura = altura
        newJugador.altura = altura
    }
    if (newJugador.peso !== peso) {
        camposModificados.peso = peso
        newJugador.peso = peso
    }
    if (newJugador.equipoId !== equipoId) {
        camposModificados.equipoId = equipoId
        newJugador.equipoId = equipoId
    }
    const payload = JSON.stringify(camposModificados)
    await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/update/jugadores/${id}`, 'PUT', payload)
    if (newJugador) console.log('jugador actualizado', newJugador)

    drawJugadorRowContent(newJugador)
    clearJugadorFormInputs()
}

/**
 * Crea una fila en la tabla de Jugadores y llama a la función que crea su contenido
 * @param {Jugador} jugador 
 */
function drawJugadorRow(jugador) {
    const tbody = document.getElementById('tbody-jugadores')
    const row = document.createElement('tr')

    row.id = `row_j_${jugador._id}`
    tbody?.appendChild(row)

    drawJugadorRowContent(jugador)
}

/**
 * Crea el contenido de una fila de la tabla Jugadores con los datos de un Jugador
 * @param {Jugador} jugador
 */
function drawJugadorRowContent(jugador) {
    const row = document.getElementById(`row_j_${jugador._id}`)
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
    cellId.innerText = jugador._id
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
    editBtn.addEventListener('click', editarJugador.bind(editBtn, jugador._id))
    cellEdit.appendChild(editBtn)
    delBtn.innerText = '🗑'
    delBtn.addEventListener('click', borrarJugador.bind(delBtn, jugador._id))
    cellEdit.appendChild(delBtn)
}

/**
 * Obtiene los datos de un Jugador y los muestra en su formulario
 * @param {String} id 
 */
async function editarJugador(id) {
    const jugador = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/findbyid/jugadores/${id}`)
    setInputValue('jg-id', jugador._id)
    setInputValue('nombre-jugador', jugador.nombre)
    setInputValue('apellidos', jugador.apellidos)
    setInputValue('nacionalidad', jugador.nacionalidad)
    setInputValue('altura', String(jugador.altura))
    setInputValue('peso', String(jugador.peso))
}

/**
 * Elimina un Jugador de la lista de Jugadores del Equipo
 * El jugador permanecerá en la BBDD sin equipo
 * @param {String} id 
 */
function borrarJugador(id) {
    document.getElementById(`row_j_${id}`)?.remove()

    //store.deleteJugadorFromEquipo(id)
    const campos = {equipoId: ''}
    const payload = JSON.stringify(campos)
    getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/update/jugadores/${id}`, 'PUT', payload)
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
}

/**
 * Limpia la tabla de Jugadores
 */
function clearJugadoresTable(){
    const tbody = document.getElementById('tbody-jugadores')
    if (tbody) tbody.innerHTML = ''
}

/**
 * Limpia la tabla de Equipos
 */
function clearEquiposTable() {
    const tbody = document.getElementById('tbody-equipos')
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

function mostrarVacioEquipoForm() {
    clearEquiposFormInputs()
    mostrarEquipoForm()
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

/**
 * Cancela el guardado del Equipo y oculta el formulario y muestra la tabla de Equipos
 */
function cancelarGuardadoEquipo() {
    ocultarEquipoForm()
}