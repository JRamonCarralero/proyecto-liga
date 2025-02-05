// @ts-check

import { Partido } from './classes/Partido.js'
import { Jornada } from './classes/Jornada.js'
import { Liga } from './classes/Liga.js'
import { Equipo } from './classes/Equipo.js'
import { Clasificacion } from './classes/Clasificacion.js'
import { getSelectValue, setSelectValue, getInputValue, setInputValue, getInputChecked, setInputChecked, replyButtonClick, getAPIData } from './utils/utils.js'
import { getUser, logoutUser } from './login.js'
import { AccionesPartido } from './classes/AccionesPartido.js'
import { EstadisticaJugador } from './classes/EstadisticaJugador.js'

/** @import { Jugador } from './classes/Jugador.js' */

document.addEventListener('DOMContentLoaded', onDOMContentLoaded)

/** @type {string[]} */
const equiposLiga = []
let pagina = 1

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
        const descanso = new Equipo('DESCANSO')
        equipos.push(descanso.id)
    }

    const ligaClass = new Liga(nombreLiga, yearLiga, equipos)
    const liga = await getAPIData(`http://${location.hostname}:1337/create/ligas`, 'POST', ligaClass)
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
        const jornadaClass = new Jornada(i + 1, new Date(), liga.id)
        const jornada = await getAPIData(`http://${location.hostname}:1337/create/jornadas`, 'POST', jornadaClass)
        const vueltaClass = new Jornada(i + equipos.length, new Date(), liga.id)
        const vuelta = await getAPIData(`http://${location.hostname}:1337/create/jornadas`, 'POST', vueltaClass)
        for (let j = 0; j < equipos.length / 2; j++) {
            if (esLocal) {
                const pIda = new Partido(jornada.id, calendario[i][j],calendario[i][equipos.length - j - 1])
                const pVuelta = new Partido(vuelta.id, calendario[i][equipos.length - j - 1], calendario[i][j])

                await getAPIData(`http://${location.hostname}:1337/create/partidos`, 'POST', pIda)
                await getAPIData(`http://${location.hostname}:1337/create/partidos`, 'POST', pVuelta)
            } else {
                const pIda = new Partido(jornada.id, calendario[i][equipos.length - j - 1],calendario[i][j])                
                const pVuelta = new Partido(vuelta.id, calendario[i][j], calendario[i][equipos.length - j - 1])

                await getAPIData(`http://${location.hostname}:1337/create/partidos`, 'POST', pIda)
                await getAPIData(`http://${location.hostname}:1337/create/partidos`, 'POST', pVuelta)
            }
        }
        esLocal = !esLocal
    }
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
async function editarLiga(id) {
    const liga = await getAPIData(`http://${location.hostname}:1337/findbyid/ligas?id=${id}`)
    const jornadas = await getAPIData(`http://${location.hostname}:1337/filter/jornadas?tipo=ligaid&filter=${id}`)

    if (liga){
        setInputValue('id-liga', liga.id)
        setInputValue('nombre', liga.nombre)
        setInputValue('year', liga.year)

        clearJornadasBox()
        mostrarLigaForm()
        clearEquiposTable()
        drawClasificacionTable(id)

        jornadas.forEach(/** @param {Jornada} jornada*/jornada => drawJornadaBox(jornada))

        liga.equipos.forEach(async (/** @type {string} equipoId */equipoId) => {
            const equipo = await getAPIData(`http://${location.hostname}:1337/findbyid/equipos?id=${equipoId}`)
            drawEquipoRow(equipo)
        })
    }
    
}

/**
 * Elimina la liga, sus jornadas y sus partidos
 * @param {string} id 
 */
async function borrarLiga(id) {
    const liga = await getAPIData(`http://${location.hostname}:1337/findbyid/ligas?id=${id}`)

    if (window.confirm(`¿Desea borrar la liga ${liga.nombre}?`)) {
        const jornadas = await getAPIData(`http://${location.hostname}:1337/filter/jornadas?tipo=ligaid&filter=${id}`)
        jornadas.forEach(async (/** @type {Jornada} jornada */jornada) => {
            const partidos = await getAPIData(`http://${location.hostname}:1337/filter/partidos?tipo=jornadaid&filter=${jornada.id}`)
            partidos.forEach(async (/** @type {Partido} partido */partido) => {
                getAPIData(`http://${location.hostname}:1337/delete/partidos/${partido.id}`, 'DELETE')
            })
            getAPIData(`http://${location.hostname}:1337/delete/jornadas/${jornada.id}`, 'DELETE')
        })
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
    const respLigas = await getAPIData(`http://${location.hostname}:1337/readpage/ligas?page=${pagina}`)
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
 * muestra la jornada
 * @param {Jornada} jornada 
 */
async function drawJornadaBox(jornada) {
    const boxJornadas = document.getElementById('box-jornadas')
    const div = document.createElement('div')
    const title = document.createElement('h3')
    const partidos = await getAPIData(`http://${location.hostname}:1337/filter/partidos?tipo=jornadaid&filter=${jornada.id}`)

    boxJornadas?.appendChild(div)
    title.innerText = `Jornada nº: ${jornada.numero}`
    div.appendChild(title)

    partidos.forEach(async (/** @type {Partido} partido */partido) => {
        const eqLocal = await getAPIData(`http://${location.hostname}:1337/findbyid/equipos?id=${partido.local}`)
        const eqVisitante = await getAPIData(`http://${location.hostname}:1337/findbyid/equipos?id=${partido.visitante}`)
        const partidoBox = document.createElement('div')
        const spanLocal = document.createElement('span')
        const spanVisitante = document.createElement('span')
        const spanPuntosLocal = document.createElement('span')
        const spanPuntosVisitante = document.createElement('span')
        const spanFecha = document.createElement('span')
        const btnEditPartido = document.createElement('button')

        partidoBox.classList.add('partido')
        div?.appendChild(partidoBox)

        spanLocal.innerHTML = `${eqLocal.nombre}`
        partidoBox.appendChild(spanLocal)
        spanPuntosLocal.innerHTML = `${partido.puntosLocal}`
        partidoBox.appendChild(spanPuntosLocal)
        partidoBox.innerHTML += '-'
        spanPuntosVisitante.innerHTML = `${partido.puntosVisitante}`
        partidoBox.appendChild(spanPuntosVisitante)
        spanVisitante.innerHTML = `${eqVisitante.nombre}`
        partidoBox.appendChild(spanVisitante)
        spanFecha.innerHTML = `${partido.fecha}`
        partidoBox.appendChild(spanFecha) 
        btnEditPartido.id = `${partido.id}-edit-btn`
        btnEditPartido.innerText = 'Editar'
        btnEditPartido.addEventListener('click', editarPartido.bind(btnEditPartido, partido.id))
        partidoBox.appendChild(btnEditPartido)
    })    
}



// Partidos //

/**
 * Edita un partido en la store
 * @param {string} id id del partido a editar
 */
async function editarPartido(id) {
    const partidoId = id.replace('-edit-btn', '')
    const partido = await getAPIData(`http://${location.hostname}:1337/findbyid/partidos?id=${partidoId}`)
    const eqLocal = await getAPIData(`http://${location.hostname}:1337/findbyid/equipos?id=${partido.local}`)
    const eqVisitante = await getAPIData(`http://${location.hostname}:1337/findbyid/equipos?id=${partido.visitante}`)
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
    
    setInputValue('id-partido', partido.id)
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
    cargarAccionesPartido(partido.id)
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
    
    await getAPIData(`http://${location.hostname}:1337/update/partidos/${partidoId}`, 'PUT', campos)
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
    const acciones = await getAPIData(`http://${location.hostname}:1337/filter/accionespartido?tipo=partidoid&filter=${idPartido}`)
    acciones.forEach(/** @param {AccionesPartido} accion */accion => {
        crearAccionRow(accion)
        generarEstadisticasJugador(accion)
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
        const jugador = await getAPIData(`http://${location.hostname}:1337/findbyid/jugadores?id=${accion.jugadorId}`)
        li.innerText = `${accion.minuto}: ${jugador.nombre} ${jugador.apellidos} - ${acto}`
        ol?.appendChild(li)
    } else if (accion.equipoId == eqVisitante) {
        const ol = document.getElementById('acciones-visitante-list')
        const li = document.createElement('li')
        const jugador = await getAPIData(`http://${location.hostname}:1337/findbyid/jugadores?id=${accion.jugadorId}`)
        li.innerText = `${accion.minuto}: ${jugador.nombre} ${jugador.apellidos} - ${acto}`
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
    if (equipoStr === 'local') {
        const equipoId = getInputValue('eq-local-id')
        const minuto = getInputValue('minuto-local')
        const jugadorId = getInputValue('jugador-local')
        const accion = getInputValue('accion-local')
        const accionPartidoClass =  new AccionesPartido(partidoId, minuto, jugadorId, equipoId, accion)
        const accionPartido = await getAPIData(`http://${location.hostname}:1337/create/accionespartido`, 'POST', accionPartidoClass)
        crearAccionRow(accionPartido)
    } else if (equipoStr === 'visitante') {
        const equipoId = getInputValue('eq-visitante-id')
        const minuto = getInputValue('minuto-visitante')
        const jugadorId = getInputValue('jugador-visitante')
        const accion = getInputValue('accion-visitante')
        const accionPartidoClass =  new AccionesPartido(partidoId, minuto, jugadorId, equipoId, accion)
        const accionPartido = await getAPIData(`http://${location.hostname}:1337/create/accionespartido`, 'POST', accionPartidoClass)
        crearAccionRow(accionPartido)
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
    const idLiga = getInputValue('id-liga')
    const estadisticaJugador = await getAPIData(`http://${location.hostname}:1337/filter/estadisticasjugador?tipo=estjugador&ligaid=${idLiga}&equipoid=${accion.equipoId}&jugadorid=${accion.jugadorId}`)
    let estadistica
    if (estadisticaJugador) {
        estadistica = {...estadisticaJugador}
    } else {
        estadistica = new EstadisticaJugador(idLiga, accion.equipoId, accion.jugadorId, '0', '0', '0', '0', '0')
        await getAPIData(`http://${location.hostname}:1337/create/estadisticasjugador`, 'POST', estadistica)
    }
    if (estadistica) {
        switch (accion.accion) {
            case 'E':
                estadistica.ensayos += 1
                estadistica.puntos += 5
                break
            case 'ET':
                estadistica.puntosPie += 2
                estadistica.puntos += 2
                break
            case 'EC':
                estadistica.ensayos += 1
                estadistica.puntos += 7
                break
            case 'GC':
                estadistica.puntosPie += 3
                estadistica.puntos += 3
                break
            case 'D':
                estadistica.puntosPie += 3
                estadistica.puntos += 3
                break
            case 'TA':
                estadistica.tAmarillas = estadistica.tAmarillas + 1
                break
            case 'TR':
                estadistica.tRojas = estadistica.tRojas + 1
                break
        }
        await getAPIData(`http://${location.hostname}:1337/update/estadisticasjugador`, 'PUT', estadistica)
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
    const partido = await getAPIData(`http://${location.hostname}:1337/findbyid/partidos?id=${idPartido}`)
    const eqLocal = partido.local
    const eqVisitante = partido.visitante
    const liga = getInputValue('id-liga')
    const clasificacionLocal = await getAPIData(`http://${location.hostname}:1337/filter/clasificaciones?tipo=ligaequipo&ligaid=${liga}&equipoid=${eqLocal}`)
    const clasificacionVisitante = await getAPIData(`http://${location.hostname}:1337/filter/clasificaciones?tipo=ligaequipo&ligaid=${liga}&equipoid=${eqVisitante}`)

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

        await getAPIData(`http://${location.hostname}:1337/update/clasificaciones/${clasificacionLocal.id}`, 'PUT', clasificacionLocal)
        await getAPIData(`http://${location.hostname}:1337/update/clasificaciones/${clasificacionVisitante.id}`, 'PUT', clasificacionVisitante)
 
        drawClasificacionTable(liga)
    }  
}

/**
 * Dibuja la tabla de clasificación para la liga especificada
 * @param {string} ligaId - El ID de la liga para la que se va a dibujar la tabla de clasificación
 */
async function drawClasificacionTable(ligaId) {
    const tbody = document.getElementById('tbody-clasificacion')
    const clasificaciones = await getAPIData(`http://${location.hostname}:1337/filter/clasificaciones?tipo=ligaid&filter=${ligaId}`)
    let contador = 0

    if (tbody) tbody.innerHTML = ''
    clasificaciones.forEach(async (/** @type {Clasificacion} clasificacion */clasificacion) => {
        const equipo = await getAPIData(`http://${location.hostname}:1337/findbyid/equipos?id=${clasificacion.equipoId}`)
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

    const equipo =  await getAPIData(`http://${location.hostname}:1337/findbyid/equipos?id=${selectId}`)
    if (equipo) {
        equiposLiga.push(equipo.id)
        drawEquipoRow(equipo)
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
    const equipos = await getAPIData(`http://${location.hostname}:1337/read/equipos`)
    const select = document.getElementById('sel-equipo')
    if (select) select.innerHTML = `<option value="0">Seleccione un equipo</option>`
    equipos.forEach(/** @param {Equipo} equipo */equipo => {
        if (select) select.innerHTML += `
                <option value="${equipo.id}">${equipo.nombre}</option>
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
    const jugadoresLocal = await getAPIData(`http://${location.hostname}:1337/filter/jugadores?tipo=equipoId&filter=${localId}`)
    const jugadoresVisitante = await getAPIData(`http://${location.hostname}:1337/filter/jugadores?tipo=equipoId&filter=${visitanteId}`)
    const jugadorLocal = document.getElementById('jugador-local')
    const jugadorVisitante = document.getElementById('jugador-visitante')

    jugadoresLocal.forEach(/** @param {Jugador} jugador */jugador => {
        if (jugadorLocal) {
            const option = document.createElement('option')
            option.value = jugador.id
            option.innerText = `${jugador.nombre} ${jugador.apellidos}`
            jugadorLocal.appendChild(option)
        }
    })
    jugadoresVisitante.forEach(/** @param {Jugador} jugador */jugador => {
        if (jugadorVisitante) {
            const option = document.createElement('option')
            option.value = jugador.id
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
    const boxJornadas = document.getElementById('box-jornadas')
    if (boxJornadas) boxJornadas.innerHTML = ''
}

/**
 * Crea una clasificación para la liga dada con cada equipo.
 * Inicializa las estadísticas de cada equipo como cero.
 * 
 * @param {*} liga - La liga para la cual se creará la clasificación.
 */

function crearClasificacion(liga) {
    console.log('liga.equipos',liga.equipos)
    liga.equipos.forEach(async (/** @type {string} equipoId */equipoId) => {
      const clasificacion = new Clasificacion(liga.id, equipoId, 0, 0, 0, 0, 0, 0, 0) 
      await getAPIData(`http://${location.hostname}:1337/create/clasificaciones`, 'POST', clasificacion)
    })
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