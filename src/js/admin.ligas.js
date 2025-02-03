// @ts-check

import { Partido } from './classes/Partido.js'
import { Jornada } from './classes/Jornada.js'
import { Liga } from './classes/Liga.js'
import { Equipo } from './classes/Equipo.js'
import { Clasificacion } from './classes/Clasificacion.js'
import { store } from './store/redux.js'
import { getSelectValue, setSelectValue, getInputValue, setInputValue, getInputChecked, setInputChecked, replyButtonClick, getAPIData } from './utils/utils.js'
import { getUser, logoutUser } from './login.js'
import { AccionesPartido } from './classes/AccionesPartido.js'
import { EstadisticaJugador } from './classes/EstadisticaJugador.js'

/** @import { Jugador, PrimeraLinea } from './classes/Jugador.js' */

document.addEventListener('DOMContentLoaded', onDOMContentLoaded)

/** @type {string[]} */
const equiposLiga = []
let pagina = 1

// ------- EVENTS ------- //

async function onDOMContentLoaded() {
    const apiData = await getAPIData(`http://${location.hostname}:1337/store.data.json`)
    store.loadState(apiData)

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
function crearLiga() {
    const nombreLiga = getInputValue('nombre')
    const yearLiga = getInputValue('year')
    const equipos = [...equiposLiga]

    if (equipos.length % 2 != 0) {
        const descanso = new Equipo('DESCANSO')
        equipos.push(descanso.id)
    }

    const liga = new Liga(nombreLiga, yearLiga, equipos)
    store.liga.create(liga,() => {store.saveState()})

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
        store.jornada.create(jornadaClass,() => {store.saveState()})
        const vueltaClass = new Jornada(i + equipos.length, new Date(), liga.id)
        store.jornada.create(vueltaClass,() => {store.saveState()})
        for (let j = 0; j < equipos.length / 2; j++) {
            if (esLocal) {
                const pIda = new Partido(jornadaClass.id, calendario[i][j],calendario[i][equipos.length - j - 1])
                const pVuelta = new Partido(vueltaClass.id, calendario[i][equipos.length - j - 1], calendario[i][j])

                store.partido.create(pIda,() => {store.saveState()})
                store.partido.create(pVuelta,() => {store.saveState()})
            } else {
                const pIda = new Partido(jornadaClass.id, calendario[i][equipos.length - j - 1],calendario[i][j])                
                const pVuelta = new Partido(vueltaClass.id, calendario[i][j], calendario[i][equipos.length - j - 1])

                store.partido.create(pIda,() => {store.saveState()})
                store.partido.create(pVuelta,() => {store.saveState()})
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
function editarLiga(id) {
    const liga = store.liga.getById(id)
    const jornadas = store.getJornadasFromLigaId(id)

    if (liga){
        setInputValue('id-liga', liga.id)
        setInputValue('nombre', liga.nombre)
        setInputValue('year', liga.year)

        clearEquiposTable()
        liga.equipos.forEach(/** @param {string} equipoId */equipoId => {
            const equipo = store.equipo.getById(equipoId)
            drawEquipoRow(equipo)
        })
        clearJornadasBox()
        jornadas.forEach(/** @param {Jornada} jornada*/jornada => drawJornadaBox(jornada))

        drawClasificacionTable(id)
        mostrarLigaForm()
    }
    
}

/**
 * Elimina la liga, sus jornadas y sus partidos
 * @param {string} id 
 */
function borrarLiga(id) {
    const liga = store.liga.getById(id)

    if (window.confirm(`¿Desea borrar la liga ${liga.nombre}?`)) {
        const jornadas = store.getJornadasFromLigaId(liga.id)
        jornadas.forEach(/** @param {Jornada} jornada */jornada => {
            const partidos = store.getPartidosFromJornadaId(jornada.id)
            partidos.forEach(/** @param {Partido} partido */partido => {
                store.partido.delete(partido,() => {store.saveState()})
            })
            store.jornada.delete(jornada,() => {store.saveState()})
        })

        store.deleteClasificacionesFromLigaId(liga.id)
        store.liga.delete(liga,() => {store.saveState()})
        document.getElementById(`liga_${id}`)?.remove()
        clearLigaForm()
    }
}

/**
 * Obtiene las ligas existentes
 */
function getLigas() {
    const tbody = document.getElementById('tbody-ligas')
    if (tbody) tbody.innerHTML = ''

    const btnNext = document.getElementById('btn-next-ligas')
    const btnPrev = document.getElementById('btn-prev-ligas')
    const respLigas = store.liga.getPage(pagina)
    respLigas.ligas.forEach(/** @param {Liga} liga */liga => drawLigaRow(liga))
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
function drawJornadaBox(jornada) {
    const boxJornadas = document.getElementById('box-jornadas')
    const div = document.createElement('div')
    const title = document.createElement('h3')
    const partidos = store.getPartidosFromJornadaId(jornada.id)

    boxJornadas?.appendChild(div)
    title.innerText = `Jornada nº: ${jornada.numero}`
    div.appendChild(title)

    /** @type {String[]} */const arrPartidos = []
    partidos.forEach(/** @param {Partido} partido */partido => {
        const eqLocal = store.equipo.getById(partido.local)
        const eqVisitante = store.equipo.getById(partido.visitante)
        div.innerHTML += `
            <div class="partido">
                <span>${eqLocal.nombre}</span>
                <span>${partido.puntosLocal}</span>
                -
                <span>${partido.puntosVisitante}</span>
                <span>${eqVisitante.nombre}</span>

                <span>${partido.fecha}</span>
                <button type="button" id="${partido.id}-edit-btn">Editar</button>
            </div>
        `
        arrPartidos.push(`${partido.id}-edit-btn`)
    })  
    
    arrPartidos.forEach(/** @param {string} botonId */botonId => {
        const btn = document.getElementById(botonId)
        btn?.addEventListener('click', editarPartido.bind(btn, botonId))
    })    
}



// Partidos //

/**
 * Edita un partido en la store
 * @param {string} id id del partido a editar
 */
function editarPartido(id) {
    console.log(id)
    const partido = store.partido.getById(id.replace('-edit-btn', ''))
    console.log(partido)
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
function guardarPartido() {
    const ligaId = getInputValue('liga-id')
    const partidoId = getInputValue('id-partido')
    const partido = /** @type {Partido} */{...store.partido.getById(partidoId)}
    partido.puntosLocal = getInputValue(`p-local`)
    partido.puntosVisitante = getInputValue(`p-visitante`)
    partido.puntosCLocal = getInputValue(`pc-local`)
    partido.puntosCVisitante = getInputValue(`pc-visitante`)
    partido.fecha = getInputValue(`fecha`)
    partido.jugado = getInputChecked(`jugado`)
    actualizarClasificacion(partidoId)
    store.partido.update(partido,() => {store.saveState()})

    editarLiga(ligaId)
    replyButtonClick('show-jornadas-box-btn')
}



// Acciones //

/**
 * Carga las acciones de un partido en la tabla correspondiente.
 * @param {string} idPartido - La id del partido cuyas acciones se quieren cargar.
 */
function cargarAccionesPartido(idPartido) {

    const acciones = store.getAccionesByPartidoId(idPartido)
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
function crearAccionRow(accion) {
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
        const jugador = store.jugador.getById(accion.jugadorId)
        li.innerText = `${accion.minuto}: ${jugador.nombre} ${jugador.apellidos} - ${acto}`
        ol?.appendChild(li)
    } else if (accion.equipoId == eqVisitante) {
        const ol = document.getElementById('acciones-visitante-list')
        const li = document.createElement('li')
        const jugador = store.jugador.getById(accion.jugadorId)
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
function crearAccionPartido(equipoStr) {
    const partidoId = getInputValue('id-partido')
    if (equipoStr === 'local') {
        const equipoId = getInputValue('eq-local-id')
        const minuto = getInputValue('minuto-local')
        const jugadorId = getInputValue('jugador-local')
        const accion = getInputValue('accion-local')
        const accionPartido =  new AccionesPartido(partidoId, minuto, jugadorId, equipoId, accion)
        store.accionesPartido.create(accionPartido,() => {store.saveState()})
        crearAccionRow(accionPartido)
    } else if (equipoStr === 'visitante') {
        const equipoId = getInputValue('eq-visitante-id')
        const minuto = getInputValue('minuto-visitante')
        const jugadorId = getInputValue('jugador-visitante')
        const accion = getInputValue('accion-visitante')
        const accionPartido =  new AccionesPartido(partidoId, minuto, jugadorId, equipoId, accion)
        store.accionesPartido.create(accionPartido,() => {store.saveState()})
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
function generarEstadisticasJugador(accion) {
    const idLiga = getInputValue('id-liga')
    const estadisticaJugador = store.getEstadisticaFromLigaEquipoJugador(idLiga, accion.equipoId, accion.jugadorId)
    let estadistica
    if (estadisticaJugador) {
        estadistica = {...estadisticaJugador}
    } else {
        estadistica = new EstadisticaJugador(idLiga, accion.equipoId, accion.jugadorId, '0', '0', '0', '0', '0')
        store.estadisticaJugador.create(estadistica, () => { store.saveState() })
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
        store.estadisticaJugador.update(estadistica, () => { store.saveState() })
    }
}



// Clasificacion //

/**
 * Actualiza la clasificacion de los equipos de un partido
 * @param {string} idPartido id del partido a actualizar
 */
function actualizarClasificacion(idPartido) {
    const puntosLocal = getInputValue(`${idPartido}-p-local`)
    const puntosVisitante = getInputValue(`${idPartido}-p-visitante`)
    const puntosCLocal = getInputValue(`${idPartido}-pc-local`)
    const puntosCVisitante = getInputValue(`${idPartido}-pc-visitante`)
    const jugado = getInputChecked(`${idPartido}-jugado`)
    const partido = store.partido.getById(idPartido)
    const eqLocal = partido.local
    const eqVisitante = partido.visitante
    const liga = getInputValue('id-liga')
    const clasificacionLocal = /** @type {Clasificacion} */{...store.getClasificacionByLigaAndEquipo(liga, eqLocal)}
    const clasificacionVisitante = /** @type {Clasificacion} */{...store.getClasificacionByLigaAndEquipo(liga, eqVisitante)}

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

        store.clasificacion.update(clasificacionLocal, () => {store.saveState()})
        store.clasificacion.update(clasificacionVisitante, () => {store.saveState()})

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
    clasificaciones.forEach(/** @param {Clasificacion} clasificacion */clasificacion => {
        const equipo = store.equipo.getById(clasificacion.equipo)
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
function addEquipos() {
    const selectId = getSelectValue('sel-equipo')

    const equipo =  store.equipo.getById(selectId)
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
function loadEquiposInSelect() {
    const equipos = store.equipo.getAll()
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
function cargarJugadoresPartido(localId, visitanteId) {
    const jugadoresLocal = store.getJugadoresFromEquipoId(localId)
    const jugadoresVisitante = store.getJugadoresFromEquipoId(visitanteId)
    const jugadorLocal = document.getElementById('jugador-local')
    const jugadorVisitante = document.getElementById('jugador-visitante')

    jugadoresLocal.forEach(/** @param {Jugador | PrimeraLinea} jugador */jugador => {
        if (jugadorLocal) {
            const option = document.createElement('option')
            option.value = jugador.id
            option.innerText = `${jugador.nombre} ${jugador.apellidos}`
            jugadorLocal.appendChild(option)
        }
    })
    jugadoresVisitante.forEach(/** @param {Jugador | PrimeraLinea} jugador */jugador => {
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
 * @param {Liga} liga - La liga para la cual se creará la clasificación.
 */

function crearClasificacion(liga) {
    const equipos = liga.equipos
    equipos.forEach(/** @param {string} equipoId */equipoId => {
      const clasificacion = new Clasificacion(liga.id, equipoId, 0, 0, 0, 0, 0, 0, 0) 
      
      store.clasificacion.create(clasificacion,() => {store.saveState()})
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