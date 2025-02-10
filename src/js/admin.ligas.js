// @ts-check

/** @import { Partido } from './classes/Partido.js' */
/** @import { Jornada } from './classes/Jornada.js' */
/** @import { Liga } from './classes/Liga.js' */
/** @import { Equipo } from './classes/Equipo.js' */
/** @import { Clasificacion } from './classes/Clasificacion.js' */
import { getSelectValue, setSelectValue, getInputValue, setInputValue, getInputChecked, setInputChecked, replyButtonClick, getAPIData } from './utils/utils.js'
import { getUser, logoutUser } from './login.js'
/** @import { AccionesPartido } from './classes/AccionesPartido.js' */
/** @import { EstadisticaJugador } from './classes/EstadisticaJugador.js' */
import { store } from './store/redux.js'

/** @import { Jugador } from './classes/Jugador.js' */

const API_PORT = 3333
/** @type {string[]} */
const equiposLiga = []
let pagina = 1

document.addEventListener('DOMContentLoaded', onDOMContentLoaded)

// ------- EVENTS ------- //

async function onDOMContentLoaded() {
    const currentUser = getUser()
    if (!currentUser) {
        window.location.href = 'admin.html'
    }

    const addEquipoBtn = document.getElementById('add-equipo-btn')
    const crearLigaBtn = document.getElementById('crear-liga-btn')
    const clearFormBtn = document.getElementById('clear-form-btn')
    const showFormLigaBtn = document.getElementById('show-form-liga-btn')  
    const showEquipoTableBtn = document.getElementById('show-equipo-table-btn')
    const showClasificacionTableBtn = document.getElementById('show-clasificacion-table-btn')   
    const showJornadasBoxBtn = document.getElementById('show-jornadas-box-btn')
    const logoutBtn = document.getElementById('logout-btn')
    const btnPrevLigas = document.getElementById('btn-prev-ligas')
    const btnNextLigas = document.getElementById('btn-next-ligas')
    const savePartidoBtn = document.getElementById('save-partido-btn')
    const addAccionLocal = document.getElementById('add-accion-local')
    const addAccionVisitante = document.getElementById('add-accion-visitante')

    addEquipoBtn?.addEventListener('click', addEquipos)
    crearLigaBtn?.addEventListener('click', crearLiga)
    clearFormBtn?.addEventListener('click', clearLigaForm)
    showFormLigaBtn?.addEventListener('click', mostrarLigaForm)
    showEquipoTableBtn?.addEventListener('click', mostrarTablaEquipos)
    showClasificacionTableBtn?.addEventListener('click', mostrarTablaClasificacion)
    showJornadasBoxBtn?.addEventListener('click', mostrarCalendario)
    logoutBtn?.addEventListener('click', logoutUser)
    btnPrevLigas?.addEventListener('click', prevLigas)
    btnNextLigas?.addEventListener('click', nextLigas)
    savePartidoBtn?.addEventListener('click', guardarPartido)
    addAccionLocal?.addEventListener('click', crearAccionPartido.bind(addAccionLocal, 'local'))
    addAccionVisitante?.addEventListener('click', crearAccionPartido.bind(addAccionVisitante, 'visitante'))
    
    window.addEventListener('stateChanged', (event) => {
        console.log('stateChanged', /** @type {CustomEvent} */(event).detail)
    })

    loadEquiposInSelect()
    getLigas()
    ocultarLigaForm()
}


// ------- METHODS ------- //

// Ligas //
    
/**
 * Creamos la liga, con sus jornadas y partidos
 */
async function crearLiga() {
    const nombreLiga = getInputValue('nombre')
    const yearLiga = getInputValue('year')
    const equipos = [...equiposLiga]

    if (equipos.length % 2 != 0) {
        //const descanso = new Equipo('DESCANSO')
        //equipos.push(descanso.id)
        alert('La cantidad de equipos debe ser par')
        return
    }

    //const ligaClass = new Liga(nombreLiga, yearLiga, equipos)
    const camposLiga = {
        nombre: nombreLiga,
        year: yearLiga,
        equipos
    }
    const liga = await getAPIData(`http://${location.hostname}:${API_PORT}/create/ligas`, 'POST', JSON.stringify(camposLiga))
    const calendario = new Array(equipos.length-1).fill(null).map(() => new Array(equipos.length-1))

    for (let i = 0; i < equipos.length; i++) {
        calendario[0][i] = equipos[i];
    }
    for (let i = 1; i < equipos.length - 1; i++) {
        calendario[i] = [...calendario[i - 1]];
        const removed = calendario[i].splice(1, 1)
        calendario[i].push(removed[0]);
    }
    let esLocal = true
    for (let i = 0; i < equipos.length-1; i++) {
        const partidosLiga = []
        const jornadaObj = {
            jornadaDate: new Date(),
            numero: i + 1,
            ligaId: liga._id
        }
        const jornada = await getAPIData(`http://${location.hostname}:${API_PORT}/create/jornadas`, 'POST', JSON.stringify(jornadaObj))
        const vueltaObj = {
            jornadaDate: new Date(),
            numero: i + equipos.length,
            ligaId: liga._id
        }
        const vuelta = await getAPIData(`http://${location.hostname}:${API_PORT}/create/jornadas`, 'POST', JSON.stringify(vueltaObj))
        for (let j = 0; j < equipos.length / 2; j++) {
            if (esLocal) {
                const pIda = {
                    jornadaId: jornada._id,
                    ligaId: liga._id,
                    local: calendario[i][j],
                    visitante: calendario[i][equipos.length - j - 1],
                    puntosLocal: 0,
                    puntosVisitante: 0,
                    puntosCLocal: 0,
                    puntosCVisitante: 0,
                    jugadoresLocal: [],
                    jugadoresVisitante: [],
                    fecha: new Date(),
                    jugado: false
                }
                partidosLiga.push(pIda)
                const pVuelta = {
                    jornadaId: vuelta._id,
                    ligaId: liga._id,
                    local: calendario[i][equipos.length - j - 1],
                    visitante: calendario[i][j],
                    puntosLocal: 0,
                    puntosVisitante: 0,
                    puntosCLocal: 0,
                    puntosCVisitante: 0,
                    jugadoresLocal: [],
                    jugadoresVisitante: [],
                    fecha: new Date(),
                    jugado: false 
                }
                partidosLiga.push(pVuelta)
            } else {
                const pIda = {
                    jornadaId: jornada._id,
                    ligaId: liga._id,
                    local: calendario[i][equipos.length - j - 1],
                    visitante: calendario[i][j],
                    puntosLocal: 0,
                    puntosVisitante: 0,
                    puntosCLocal: 0,
                    puntosCVisitante: 0,
                    jugadoresLocal: [],
                    jugadoresVisitante: [],
                    fecha: new Date(),
                    jugado: false
                }
                partidosLiga.push(pIda)
                const pVuelta = {
                    jornadaId: vuelta._id,
                    ligaId: liga._id,
                    local: calendario[i][j],
                    visitante: calendario[i][equipos.length - j - 1],
                    puntosLocal: 0,
                    puntosVisitante: 0,
                    puntosCLocal: 0,
                    puntosCVisitante: 0,
                    jugadoresLocal: [],
                    jugadoresVisitante: [],
                    fecha: new Date(),
                    jugado: false 
                }
                partidosLiga.push(pVuelta)
            }
        }
        await getAPIData(`http://${location.hostname}:${API_PORT}/create/partidos/many`, 'POST', JSON.stringify(partidosLiga))
        esLocal = !esLocal
    }

    //const estadisticas = {
    //    equipos: equipos,
    //    ligaId: liga._id 
    //}
    //await getAPIData(`http://${location.hostname}:${API_PORT}/create/estadisticas/liga`, 'POST', JSON.stringify(estadisticas))

    drawLigaRow(liga)
    clearLigaForm()
    crearClasificacion(liga)
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
    
    row.id = `liga_${liga._id}`
    tbody?.appendChild(row)
    cellId.innerText = liga._id
    row.appendChild(cellId)
    cellNombre.innerText = liga.nombre
    row.appendChild(cellNombre)
    cellYear.innerText = liga.year
    row.appendChild(cellYear)
    row.appendChild(cellBtn)
    editBtn.innerText = '✎'
    editBtn.addEventListener('click', editarLiga.bind(editBtn, liga._id))
    cellBtn.appendChild(editBtn)
    delBtn.innerText = '🗑'
    delBtn.addEventListener('click', borrarLiga.bind(delBtn, liga._id))
    cellBtn.appendChild(delBtn)
}

/**
 * muestra la informacion de la liga
 * @param {string} id 
 */
async function editarLiga(id) {
    await cargarRedux(id)
    const liga = await getAPIData(`http://${location.hostname}:${API_PORT}/findbyid/ligas/${id}`)
    //const jornadas = store.jornada.getAll()
    const equipos = store.equipo.getAll()
    console.log('state', store.getState())

    if (liga){
        setInputValue('id-liga', liga[0].id)
        setInputValue('nombre', liga[0].nombre)
        setInputValue('year', liga[0].year)

        clearJornadasBox()
        mostrarLigaForm()
        clearEquiposTable()
        drawClasificacionTable(id)

        //jornadas.forEach(/** @param {Jornada} jornada*/jornada => drawJornadaBox(jornada))
        getCalendario()

        equipos.forEach((/** @type {Equipo} equipo */equipo) => {
            drawEquipoRow(equipo)
        })
    }
    
}

/**
 * Elimina la liga, sus jornadas y sus partidos
 * @param {string} id 
 */
async function borrarLiga(id) {
    const liga = await getAPIData(`http://${location.hostname}:${API_PORT}/findbyid/ligas/${id}`)

    if (window.confirm(`¿Desea borrar la liga ${liga[0].nombre}, ${liga[0].year}?`)) {
        const ligaId = liga[0]._id

        //await getAPIData(`http://${location.hostname}:${API_PORT}/delete/partidos/many/liga/${ligaId}`, 'DELETE')
        //await getAPIData(`http://${location.hostname}:${API_PORT}/delete/jornadas/many/liga/${ligaId}`, 'DELETE')
        //await getAPIData(`http://${location.hostname}:${API_PORT}/delete/clasificaciones/many/liga/${ligaId}`, 'DELETE')
        await getAPIData(`http://${location.hostname}:${API_PORT}/delete/ligas/${ligaId}`, 'DELETE')

        document.getElementById(`liga_${id}`)?.remove()
        clearLigaForm()
    }
}

/**
 * Obtiene las ligas existentes
 */
async function getLigas() {
    const tbody = document.getElementById('tbody-ligas')
    if (tbody) tbody.innerHTML = ''

    const btnNext = document.getElementById('btn-next-ligas')
    const btnPrev = document.getElementById('btn-prev-ligas')
    const respLigas = await getAPIData(`http://${location.hostname}:${API_PORT}/read/ligas/page/${pagina}`)
    respLigas.data.forEach(/** @param {Liga} liga */liga => drawLigaRow(liga))
    if (respLigas.siguiente) {
        if (btnNext) btnNext.style.display = 'block'
    } else {
        if (btnNext) btnNext.style.display = 'none'
    }
    if (respLigas.anterior) {
        if (btnPrev) btnPrev.style.display = 'block'
    } else {
        if (btnPrev) btnPrev.style.display = 'none'
    }
}

/**
 * Muestra las siguientes 20 noticias en la pagina de noticias
 */
function nextLigas() {
    pagina += 1
    const tbody = document.getElementById('tbody-equipos')
    if (tbody) tbody.innerHTML = ''
    getLigas()
}

/**
 * Muestra las 20 noticias previas en la pagina de noticias
 */
function prevLigas() {
    pagina -= 1
    const tbody = document.getElementById('tbody-equipos')
    if (tbody) tbody.innerHTML = ''
    getLigas()
}

// Jornadas //

/**
 * Displays the calendar view.
 * Hides the classification and teams sections.
 * Fetches and displays the list of jornadas (matchdays) with corresponding buttons.
 * Each button has an event listener that renders the selected jornada when clicked.
 */
function getCalendario() {
    const jornadasSelect = document.getElementById('jornadas-select')
        if (jornadasSelect) jornadasSelect.innerHTML = ''
        const jornadas = store.getSortedJornadas()
        jornadas.forEach((/** @type {Jornada} */ jornada) => {
            const option = document.createElement('option')
            option.value = jornada._id
            option.innerHTML = `Jornada ${jornada.numero}`
            jornadasSelect?.appendChild(option)
            jornadasSelect?.addEventListener('change', drawSelectedJornada)
        })
        drawSelectedJornada()
}

/**
 * Dibuja la jornada especificada
 */
function drawSelectedJornada() {
    const jornadaId = getSelectValue('jornadas-select')
    const jornada = store.jornada.getById(jornadaId)
    console.log(jornada)
    const jornadaNumero = document.getElementById('jornada-numero')
    if (jornadaNumero) jornadaNumero.innerHTML = `Jornada ${jornada.numero}`

    const partidos = store.getPartidosFromJornadaId(jornada._id)
    const tbody = document.getElementById('tbody-calendario')
    if (tbody) tbody.innerHTML = ''

    partidos.forEach((/** @type {Partido} */ partido) => {
        const eqLocal = store.equipo.getById(partido.local)
        const eqVisitante = store.equipo.getById(partido.visitante)
        const tr = document.createElement('tr')
        const cellFecha = document.createElement('td')
        const cellLocal = document.createElement('td')
        const cellResultado = document.createElement('td')
        const cellVisitante = document.createElement('td')
        const cellEstadio = document.createElement('td')
        const cellEdit = document.createElement('td')
        const editBtn = document.createElement('button')

        tbody?.appendChild(tr)
        cellFecha.innerText = partido.fecha
        tr.appendChild(cellFecha)
        cellLocal.innerText = eqLocal.nombre
        tr.appendChild(cellLocal)
        cellResultado.innerHTML = `${partido.puntosLocal} - ${partido.puntosVisitante}`
        tr.appendChild(cellResultado)
        cellVisitante.innerText = eqVisitante.nombre
        tr.appendChild(cellVisitante)
        cellEstadio.innerText = eqLocal.estadio
        tr.appendChild(cellEstadio)
        editBtn.innerText = '✎'
        editBtn.addEventListener('click', editarPartido.bind(editBtn, partido._id))
        cellEdit.appendChild(editBtn)
        tr.appendChild(cellEdit)
    })
}


// Partidos //

/**
 * Edita un partido en la store
 * @param {string} id id del partido a editar
 */
function editarPartido(id) {
    const partidoId = id.replace('-edit-btn', '')
    const partido = store.partido.getById(partidoId)
    const eqLocal = store.equipo.getById(partido.local)
    const eqVisitante = store.equipo.getById(partido.visitante)
    const boxEditPartido = document.getElementById('box-edit-partido')
    const boxJornadas = document.getElementById('box-jornadas')
    const eqLocalNombre = document.getElementById('eq-local-nombre')
    const eqVisitanteNombre = document.getElementById('eq-visitante-nombre')
    const accionesLocalList = document.getElementById('acciones-local-list')
    const accionesVisitanteList = document.getElementById('acciones-visitante-list')

    if (boxJornadas) boxJornadas.style.display = 'none'
    if (boxEditPartido) boxEditPartido.style.display = 'block'
    if (accionesLocalList) accionesLocalList.innerHTML = ''
    if (accionesVisitanteList) accionesVisitanteList.innerHTML = ''
    
    setInputValue('id-partido', partido._id)
    setInputValue('eq-local-id', partido.local)
    setInputValue('eq-visitante-id', partido.visitante)
    setInputValue('p-local', partido.puntosLocal)
    setInputValue('p-visitante', partido.puntosVisitante)
    setInputValue('pc-local', partido.puntosCLocal)
    setInputValue('pc-visitante', partido.puntosCVisitante)
    setInputValue('fecha', partido.fecha)
    setInputChecked('jugado', partido.jugado)

    if (eqLocalNombre) eqLocalNombre.innerText = eqLocal.nombre
    if (eqVisitanteNombre) eqVisitanteNombre.innerText = eqVisitante.nombre

    cargarJugadoresPartido(partido.local, partido.visitante)
    cargarAccionesPartido(partido._id)
}

/**
 * Guarda el partido con id en la store y llama a actualizar la clasificacion
 */
async function guardarPartido() {
    const ligaId = getInputValue('liga-id')
    const partidoId = getInputValue('id-partido')
    const campos = {
        puntosLocal: getInputValue(`p-local`),
        puntosVisitante: getInputValue(`p-visitante`),
        puntosCLocal: getInputValue(`pc-local`),
        puntosCVisitante: getInputValue(`pc-visitante`),
        fecha: getInputValue(`fecha`),
        jugado: getInputChecked(`jugado`)
    }
    const partido = store.partido.getById(partidoId)
    const partidoUpdated = {...partido, ...campos}
    store.partido.update(partidoUpdated)
    await getAPIData(`http://${location.hostname}:${API_PORT}/update/partidos/${partidoId}`, 'PUT', JSON.stringify(campos))
    actualizarClasificacion(partidoId)
    editarLiga(ligaId)
    replyButtonClick('show-jornadas-box-btn')
}



// Acciones //

/**
 * Carga las acciones de un partido en la tabla correspondiente.
 * @param {string} idPartido - La id del partido cuyas acciones se quieren cargar.
 */
async function cargarAccionesPartido(idPartido) {
    const acciones = await getAPIData(`http://${location.hostname}:${API_PORT}/filter/acciones/partidoid/${idPartido}`)
    acciones.forEach(/** @param {AccionesPartido} accion */accion => {
        crearAccionRow(accion)
        //generarEstadisticasJugador(accion)
    })
}

/**
 * Crea un <li> y lo agrega a la lista de acciones local o visitante
 * segun la id del equipo en la accion.
 * @param {AccionesPartido} accion - La accion cuyas acciones se quieren agregar a la lista.
 */
async function crearAccionRow(accion) {
    const eqLocal = getInputValue('eq-local-id')
    const eqVisitante = getInputValue('eq-visitante-id')
    let acto = ''

    switch (accion.accion) {
        case 'E': 
            acto = 'Ensayo' 
            break
        case 'ET': 
            acto = 'Transformación' 
            break
        case 'EC': 
            acto = 'Ensayo de Castigo' 
            break
        case 'GC': 
            acto = 'Golpe de Castigo' 
            break
        case 'D': 
            acto = 'Drop' 
            break
        case 'TA': 
            acto = 'Tarjeta Amarilla' 
            break
        case 'TR': 
            acto = 'Tarjeta Roja' 
            break
        default: 
            break            
    }

    if (accion.equipoId == eqLocal) {
        const ol = document.getElementById('acciones-local-list')
        const li = document.createElement('li')
        const jugador = await getAPIData(`http://${location.hostname}:${API_PORT}/findbyid/jugadores/${accion.jugadorId}`)
        li.innerText = `${accion.minuto}: ${jugador[0].nombre} ${jugador[0].apellidos} - ${acto}`
        ol?.appendChild(li)
    } else if (accion.equipoId == eqVisitante) {
        const ol = document.getElementById('acciones-visitante-list')
        const li = document.createElement('li')
        const jugador = await getAPIData(`http://${location.hostname}:${API_PORT}/findbyid/jugadores/${accion.jugadorId}`)
        li.innerText = `${accion.minuto}: ${jugador[0].nombre} ${jugador[0].apellidos} - ${acto}`
        ol?.appendChild(li)
    } else {
        console.error('Equipo no encontrado')
    }
}

/**
 * Crea una nueva accion de partido
 * @param {string} equipoStr El string que indica el equipo al que se le va a agregar la accion. Debe ser 'local' o 'visitante'
 */
async function crearAccionPartido(equipoStr) {
    const partidoId = getInputValue('id-partido')
    console.log('id-partido', partidoId)
    const partido = store.partido.getById(partidoId)
    console.log('partido', partido)
    if (equipoStr === 'local') {
        const equipoId = getInputValue('eq-local-id')
        const minuto = getInputValue('minuto-local')
        const jugadorId = getInputValue('jugador-local')
        const accion = getInputValue('accion-local')
        const accionPartidoClass =  {
            partidoId: partidoId,
            ligaId: partido.ligaId,
            minuto: minuto,
            jugadorId: jugadorId,
            equipoId: equipoId,
            accion: accion
        }
        const accionPartido = await getAPIData(`http://${location.hostname}:${API_PORT}/create/acciones`, 'POST', JSON.stringify(accionPartidoClass))
        crearAccionRow(accionPartido)
        generarEstadisticasJugador(accionPartido)
    } else if (equipoStr === 'visitante') {
        const equipoId = getInputValue('eq-visitante-id')
        const minuto = getInputValue('minuto-visitante')
        const jugadorId = getInputValue('jugador-visitante')
        const accion = getInputValue('accion-visitante')
        const accionPartidoClass =  {
            partidoId: partidoId,
            ligaId: partido.ligaId,
            minuto: minuto,
            jugadorId: jugadorId,
            equipoId: equipoId,
            accion: accion
        }
        const accionPartido = await getAPIData(`http://${location.hostname}:${API_PORT}/create/acciones`, 'POST', JSON.stringify(accionPartidoClass))
        crearAccionRow(accionPartido)
        generarEstadisticasJugador(accionPartido)
    } else {
        console.error('Acción de partido erronea')
    }
}



// Estadisticas //

/**
 * Genera una estadistica de jugador en una liga, equipo y jugador,
 * si no existe la crea, si existe la actualiza.
 * @param {AccionesPartido} accion - Accion a realizar
 */
async function generarEstadisticasJugador(accion) {
    const estadisticaJugador = await getAPIData(`http://${location.hostname}:${API_PORT}/filter/estadisticas/estjugador/${accion.ligaId}/${accion.equipoId}/${accion.jugadorId}`)
    console.log('estadisticaJugador', estadisticaJugador)
    let estadistica
    if (estadisticaJugador[0]) {
        estadistica = {...estadisticaJugador[0]}
    } else {
        const estadisticaClass = {
            ligaId: accion.ligaId,
            equipoId: accion.equipoId,
            jugadorId: accion.jugadorId,
            ensayos: 0,
            puntosPie: 0,
            puntos: 0,
            tAmarillas: 0,
            tRojas: 0
        }
        estadistica = await getAPIData(`http://${location.hostname}:${API_PORT}/create/estadisticas`, 'POST', JSON.stringify(estadisticaClass))
    }
    if (estadistica) {
        const camposModificados = {...estadistica}
        delete camposModificados._id
        switch (accion.accion) {
            case 'E':
                camposModificados.ensayos +=  1
                camposModificados.puntos +=  5
                break
            case 'ET':
                camposModificados.puntosPie += 2
                camposModificados.puntos += 2
                break
            case 'EC':
                camposModificados.ensayos += 1
                camposModificados.puntos += 7
                break
            case 'GC':
                camposModificados.puntosPie += 3
                camposModificados.puntos += 3
                break
            case 'D':
                camposModificados.puntosPie += 3
                camposModificados.puntos += 3
                break
            case 'TA':
                camposModificados.tAmarillas += 1
                break
            case 'TR':
                camposModificados.tRojas += 1
                break
        }
        await getAPIData(`http://${location.hostname}:${API_PORT}/update/estadisticas/${estadistica._id}`, 'PUT', JSON.stringify(camposModificados))
    }
}


// Clasificacion //

/**
 * Actualiza la clasificacion de los equipos de un partido
 * @param {string} idPartido id del partido a actualizar
 */
async function actualizarClasificacion(idPartido) {
    const puntosLocal = getInputValue(`${idPartido}-p-local`)
    const puntosVisitante = getInputValue(`${idPartido}-p-visitante`)
    const puntosCLocal = getInputValue(`${idPartido}-pc-local`)
    const puntosCVisitante = getInputValue(`${idPartido}-pc-visitante`)
    const jugado = getInputChecked(`${idPartido}-jugado`)
    const partido = store.partido.getById(idPartido)
    const eqLocal = partido.local
    const eqVisitante = partido.visitante
    const liga = getInputValue('id-liga')
    const clasificacionLocal = store.getClasificacionByLigaAndEquipo(liga, eqLocal)
    const clasificacionVisitante = store.getClasificacionByLigaAndEquipo(liga, eqVisitante)

    if (jugado) {
        if (partido.jugado) {
            clasificacionLocal.puntosAnotados += Number(puntosLocal) - Number(partido.puntosLocal)
            clasificacionLocal.puntos += Number(puntosCLocal) - Number(partido.puntosCLocal)
            clasificacionLocal.puntosRecibidos += Number(puntosVisitante) - Number(partido.puntosVisitante)
            clasificacionVisitante.puntosAnotados += Number(puntosVisitante) - Number(partido.puntosVisitante)
            clasificacionVisitante.puntos += Number(puntosCVisitante) - Number(partido.puntosCVisitante)
            clasificacionVisitante.puntosRecibidos += Number(puntosLocal) - Number(partido.puntosLocal)
    
            if (Number(partido.puntosLocal) > Number(partido.puntosVisitante)) {
                clasificacionLocal.partidosGanados -= 1
                clasificacionVisitante.partidosPerdidos -= 1
            } else if (Number(partido.puntosLocal) < Number(partido.puntosVisitante)) {
                clasificacionLocal.partidosPerdidos -= 1
                clasificacionVisitante.partidosGanados -= 1
            } else {
                clasificacionLocal.partidosEmpatados -= 1
                clasificacionVisitante.partidosEmpatados -= 1
            }
            clasificacionLocal.partidosJugados -= 1
            clasificacionVisitante.partidosJugados -= 1
            
    
            if (Number(puntosLocal) > Number(puntosVisitante)) {
                clasificacionLocal.partidosGanados += 1
                clasificacionVisitante.partidosPerdidos += 1
            } else if (Number(puntosLocal) < Number(puntosVisitante)) {
                clasificacionLocal.partidosPerdidos += 1
                clasificacionVisitante.partidosGanados += 1
            } else {
                clasificacionLocal.partidosEmpatados += 1
                clasificacionVisitante.partidosEmpatados += 1
            }
            clasificacionLocal.partidosJugados += 1
            clasificacionVisitante.partidosJugados += 1
        } else {
            clasificacionLocal.puntosAnotados += Number(puntosLocal)
            clasificacionLocal.puntos += Number(puntosCLocal)
            clasificacionLocal.puntosRecibidos += Number(puntosVisitante)
            clasificacionVisitante.puntosAnotados += Number(puntosVisitante)
            clasificacionVisitante.puntos += Number(puntosCVisitante)
            clasificacionVisitante.puntosRecibidos += Number(puntosLocal)
    
            if (Number(puntosLocal) > Number(puntosVisitante)) {
                clasificacionLocal.partidosGanados += 1
                clasificacionVisitante.partidosPerdidos += 1
            } else if (Number(puntosLocal) < Number(puntosVisitante)) {
                clasificacionLocal.partidosPerdidos += 1
                clasificacionVisitante.partidosGanados += 1
            } else {
                clasificacionLocal.partidosEmpatados += 1
                clasificacionVisitante.partidosEmpatados += 1
            }
            clasificacionLocal.partidosJugados += 1
            clasificacionVisitante.partidosJugados += 1
        }

        const clasLocal = {...clasificacionLocal}
        delete clasLocal._id
        const clasVisitante = {...clasificacionVisitante}
        delete clasVisitante._id
        await getAPIData(`http://${location.hostname}:${API_PORT}/update/clasificaciones/${clasificacionLocal._id}`, 'PUT', JSON.stringify(clasLocal))
        await getAPIData(`http://${location.hostname}:${API_PORT}/update/clasificaciones/${clasificacionVisitante._id}`, 'PUT', JSON.stringify(clasVisitante))
 
        drawClasificacionTable(liga)
    }  
}

/**
 * Dibuja la tabla de clasificación para la liga especificada
 * @param {string} ligaId - El ID de la liga para la que se va a dibujar la tabla de clasificación
 */
function drawClasificacionTable(ligaId) {
    const tbody = document.getElementById('tbody-clasificacion')
    const clasificaciones = store.getClasificacionesFromLigaId(ligaId)
    let contador = 0

    if (tbody) tbody.innerHTML = ''
    clasificaciones.forEach(async (/** @type {Clasificacion} clasificacion */clasificacion) => {
        const equipo = store.equipo.getById(clasificacion.equipoId)
        if (tbody) tbody.innerHTML += `
            <tr>
                <td>${++contador}</td>
                <td>${equipo.nombre}</td>
                <td>${clasificacion.puntos}</td>
                <td>${clasificacion.partidosJugados}</td>
                <td>${clasificacion.partidosGanados}</td>
                <td>${clasificacion.partidosPerdidos}</td>
                <td>${clasificacion.partidosEmpatados}</td>
                <td>${clasificacion.puntosAnotados}</td>
                <td>${clasificacion.puntosRecibidos}</td>
            </tr>
        `
    })
}

// Equipos //

/**
 * Añade equipos a la liga
 */
async function addEquipos() {
    const selectId = getSelectValue('sel-equipo')

    const equipo =  await getAPIData(`http://${location.hostname}:${API_PORT}/findbyid/equipos/${selectId}`)
    if (equipo) {
        equiposLiga.push(equipo[0]._id)
        drawEquipoRow(equipo[0])
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

    row.id = `row_${equipo._id}`
    tbody?.appendChild(row)
    cellId.innerText = equipo._id
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
    delBtn.addEventListener('click', borrarEquipo.bind(delBtn, equipo._id))
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
 * Carga los equipos en el selector del formulario
 */
async function loadEquiposInSelect() {
    //const equipos = store.equipo.getAll()
    const equipos = await getAPIData(`http://${location.hostname}:${API_PORT}/read/equipos`)
    const select = document.getElementById('sel-equipo')
    if (select) select.innerHTML = `<option value="0">Seleccione un equipo</option>`
    equipos.forEach(/** @param {Equipo} equipo */equipo => {
        if (select) select.innerHTML += `
                <option value="${equipo._id}">${equipo.nombre}</option>
            `
    })
}

// Jugadores //

/**
 * Completa los select de jugadores local y visitante
 * @param {string} localId - La id del equipo local.
 * @param {string} visitanteId - La id del equipo visitante.
 */
async function cargarJugadoresPartido(localId, visitanteId) {
    const jugadoresLocal = await getAPIData(`http://${location.hostname}:${API_PORT}/filter/jugadores/${localId}`)
    const jugadoresVisitante = await getAPIData(`http://${location.hostname}:${API_PORT}/filter/jugadores/${visitanteId}`)
    const jugadorLocal = document.getElementById('jugador-local')
    const jugadorVisitante = document.getElementById('jugador-visitante')

    jugadoresLocal.forEach(/** @param {Jugador} jugador */jugador => {
        if (jugadorLocal) {
            const option = document.createElement('option')
            option.value = jugador._id
            option.innerText = `${jugador.nombre} ${jugador.apellidos}`
            jugadorLocal.appendChild(option)
        }
    })
    jugadoresVisitante.forEach(/** @param {Jugador} jugador */jugador => {
        if (jugadorVisitante) {
            const option = document.createElement('option')
            option.value = jugador._id
            option.innerText = `${jugador.nombre} ${jugador.apellidos}`
            jugadorVisitante.appendChild(option)
        }
    })
}

// Mostrar, ocultar y limpiar formularios y tablas //

/**
 * Limpia el formulario de liga, la tabla de equipos y el contenedor de las jornadas
 */
function clearLigaForm() {
    setInputValue('id-liga', '')
    setInputValue('nombre', '')
    setInputValue('year', '')
    setSelectValue('sel-equipo', '0')
    while (equiposLiga.length > 0) equiposLiga.pop()

    clearEquiposTable()
    clearJornadasBox()
    ocultarLigaForm()
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
    const boxJornadas = document.getElementById('tbody-calendario')
    if (boxJornadas) boxJornadas.innerHTML = ''
}

/**
 * Crea una clasificación para la liga dada con cada equipo.
 * Inicializa las estadísticas de cada equipo como cero.
 * 
 * @param {*} liga - La liga para la cual se creará la clasificación.
 */

async function crearClasificacion(liga) {
    console.log('liga.equipos',liga.equipos)
    /** @type {*[]} */const clasificaciones = []
    liga.equipos.forEach(/** @param {string} equipoId */equipoId => {
      //const clasificacion = new Clasificacion(liga.id, equipoId, 0, 0, 0, 0, 0, 0, 0)
      const clasificacion = {
        ligaId: liga._id,
        equipoId: equipoId,
        puntos: 0,
        partidosJugados: 0,
        partidosGanados: 0,
        partidosEmpatados: 0,
        partidosPerdidos: 0,
        puntosAnotados: 0,
        puntosRecibidos: 0
      } 
      clasificaciones.push(clasificacion)
    })
    await getAPIData(`http://${location.hostname}:${API_PORT}/create/clasificaciones/many`, 'POST', JSON.stringify(clasificaciones))
}

function mostrarLigaForm() {
    const tableLigaContainer = document.getElementById('table-liga-container')
    const formLigaContainer = document.getElementById('form-liga-container')
    const boxEquipos = document.getElementById('box-equipos')
    const boxClasificacion = document.getElementById('box-clasificacion')
    const boxCalendario = document.getElementById('box-jonadas')
    const boxEditPartido = document.getElementById('box-edit-partido')
    const boxButtons = document.getElementById('box-buttons')
    const showFormLigaBtn = document.getElementById('show-form-liga-btn')
    const idLiga = getInputValue('id-liga')
    const boxButtonSubmit = document.getElementById('box-button-submit')

    if (showFormLigaBtn) showFormLigaBtn.style.display = 'none'
    if (tableLigaContainer) tableLigaContainer.style.display = 'none'
    if (formLigaContainer) formLigaContainer.style.display = 'block'
    if (boxEquipos) boxEquipos.style.display = 'block'
    if (boxClasificacion) boxClasificacion.style.display = 'none'
    if (boxCalendario) boxCalendario.style.display = 'none'
    if (boxEditPartido) boxEditPartido.style.display = 'none'
    if (idLiga) {
        if (boxButtons) boxButtons.style.display = 'flex'
        if (boxButtonSubmit) boxButtonSubmit.style.display = 'none'
    } else {
        if (boxButtons) boxButtons.style.display = 'none'
        if (boxButtonSubmit) boxButtonSubmit.style.display = 'flex'
    } 
}

function ocultarLigaForm() {
    const tableLigaContainer = document.getElementById('table-liga-container')
    const formLigaContainer = document.getElementById('form-liga-container')
    const boxEquipos = document.getElementById('box-equipos')
    const boxClasificacion = document.getElementById('box-clasificacion')
    const boxCalendario = document.getElementById('box-jornadas')
    const boxButtons = document.getElementById('box-buttons')
    const showFormLigaBtn = document.getElementById('show-form-liga-btn')

    if (showFormLigaBtn) showFormLigaBtn.style.display = 'inline'
    if (tableLigaContainer) tableLigaContainer.style.display = 'block'
    if (formLigaContainer) formLigaContainer.style.display = 'none' 
    if (boxEquipos) boxEquipos.style.display = 'none'
    if (boxClasificacion) boxClasificacion.style.display = 'none'
    if (boxCalendario) boxCalendario.style.display = 'none'
    if (boxButtons) boxButtons.style.display = 'none'
}

/**
 * Muestra la tabla de equipos de la liga
 * Oculta las tablas de clasificacion y calendario
 */
function mostrarTablaEquipos() {
    const boxEquipos = document.getElementById('box-equipos')
    const boxClasificacion = document.getElementById('box-clasificacion')
    const boxCalendario = document.getElementById('box-jornadas')

    if (boxEquipos) boxEquipos.style.display = 'block'
    if (boxClasificacion) boxClasificacion.style.display = 'none'
    if (boxCalendario) boxCalendario.style.display = 'none'
}

/**
 * Muestra la tabla de clasificacion de la liga
 * Oculta las tablas de equipos y calendario
 */
function mostrarTablaClasificacion() {
    const boxEquipos = document.getElementById('box-equipos')
    const boxClasificacion = document.getElementById('box-clasificacion')
    const boxCalendario = document.getElementById('box-jornadas')

    if (boxEquipos) boxEquipos.style.display = 'none'
    if (boxClasificacion) boxClasificacion.style.display = 'block'
    if (boxCalendario) boxCalendario.style.display = 'none'
}

/**
 * Muestra la tabla de calendario de la liga
 * Oculta las tablas de equipos y clasificacion
 */
function mostrarCalendario() {
    const boxEquipos = document.getElementById('box-equipos')
    const boxClasificacion = document.getElementById('box-clasificacion')
    const boxCalendario = document.getElementById('box-jornadas')

    if (boxEquipos) boxEquipos.style.display = 'none'
    if (boxClasificacion) boxClasificacion.style.display = 'none'
    if (boxCalendario) boxCalendario.style.display = 'block'
}


// Carga Redux //

/**
 * Loads and updates the Redux store with data related to a specific league.
 * 
 * Clears existing store data for 'jornadas', 'partidos', 'equipos', and 'clasificaciones'.
 * Fetches new data for these entities based on the provided league ID and updates the store.
 * 
 * @param {string} ligaId - The ID of the league for which data is to be loaded.
 */
async function cargarRedux(ligaId) {
    //limpiamos la store
    store.loadState([], 'jornadas')
    store.loadState([], 'partidos')
    store.loadState([], 'equipos')
    store.loadState([], 'clasificaciones')

    const jornadas = await getAPIData(`http://${location.hostname}:${API_PORT}/filter/jornadas/${ligaId}`)
    store.loadState(jornadas, 'jornadas')
    const partidos = await getAPIData(`http://${location.hostname}:${API_PORT}/filter/partidos/liga/${ligaId}`)
    store.loadState(partidos, 'partidos')
    const clasificaciones = await getAPIData(`http://${location.hostname}:${API_PORT}/filter/clasificaciones/${ligaId}`)
    store.loadState(clasificaciones, 'clasificaciones')
    const liga = await getAPIData(`http://${location.hostname}:${API_PORT}/findbyid/ligas/${ligaId}`)
    liga[0].equipos.forEach(async (/** @type {string}*/equipoId) => {
        const equipo = await getAPIData(`http://${location.hostname}:${API_PORT}/findbyid/equipos/${equipoId}`)
        store.equipo.create(equipo[0])
    }) 
}