// @ts-check

import { Partido } from './classes/Partido.js'
import { Jornada } from './classes/Jornada.js'
import { Liga } from './classes/Liga.js'
import { Equipo } from './classes/Equipo.js'
import { Clasificacion } from './classes/Clasificacion.js'
import { store } from './store/redux.js'
import { getSelectValue, setSelectValue, getInputValue, setInputValue, getInputChecked, setInputChecked } from './utils/utils.js'

document.addEventListener('DOMContentLoaded', onDOMContentLoaded)

/** @type {string[]} */
const equiposLiga = []

// ------- EVENTS ------- //

function onDOMContentLoaded() {
    const addEquipoBtn = document.getElementById('add-equipo-btn')
    const crearLigaBtn = document.getElementById('crear-liga-btn')
    const clearFormBtn = document.getElementById('clear-form-btn')

    addEquipoBtn?.addEventListener('click', addEquipos)
    crearLigaBtn?.addEventListener('click', crearLiga)
    clearFormBtn?.addEventListener('click', clearLigaForm)
    
    window.addEventListener('stateChanged', (event) => {
        console.log('stateChanged', /** @type {CustomEvent} */(event).detail)
    })

    store.loadState()
    loadEquiposInSelect()
    getLigas()
}


// ------- METHODS ------- //

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
    const calendario = new Array(equipos.length-1).fill(null).map(() => new Array(equipos.length-1))
    for (let i = 0; i < equipos.length; i++) {
        calendario[0][i] = equipos[i];
    }
    for (let i = 1; i < equipos.length - 1; i++) {
        calendario[i] = [...calendario[i - 1]];
        const removed = calendario[i].splice(1, 1)
        calendario[i].push(removed[0]);
    }
  
    const jornadas = []
    const jornadasVuelta = []
    let esLocal = true
    for (let i = 0; i < equipos.length-1; i++) {
        const jornada = []
        const vuelta = []
        for (let j = 0; j < equipos.length / 2; j++) {
            if (esLocal) {
                const pIda = new Partido(calendario[i][j],calendario[i][equipos.length - j - 1])
                const pVuelta = new Partido(calendario[i][equipos.length - j - 1], calendario[i][j])

                store.partido.create(pIda)
                store.partido.create(pVuelta)

                jornada.push(pIda.id)
                vuelta.push(pVuelta.id)
            } else {
                const pIda = new Partido(calendario[i][equipos.length - j - 1],calendario[i][j])                
                const pVuelta = new Partido(calendario[i][j], calendario[i][equipos.length - j - 1])

                store.partido.create(pIda)
                store.partido.create(pVuelta)

                jornada.push(pIda.id)
                vuelta.push(pVuelta.id)
            }
        }
        const jornadaClass = new Jornada(i + 1, new Date(), jornada)
        store.jornada.create(jornadaClass)
        jornadas.push(jornadaClass.id)
        const vueltaClass = new Jornada(i + equipos.length, new Date(), vuelta)
        store.jornada.create(vueltaClass)
        jornadasVuelta.push(vueltaClass.id)
        esLocal = !esLocal
    }
    const liga = jornadas.concat(jornadasVuelta)

    const ligaClass = new Liga(nombreLiga, yearLiga, equipos, liga)
    
    store.liga.create(ligaClass,() => {store.saveState()})
   
    drawLigaRow(ligaClass)
    clearLigaForm()

    crearClasificacion(ligaClass)
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

    if (liga){
        setInputValue('id-liga', liga.id)
        setInputValue('nombre', liga.nombre)
        setInputValue('year', liga.year)

        liga.equipos.forEach(/** @param {string} equipoId */equipoId => {
            const equipo = store.equipo.getById(equipoId)
            drawEquipoRow(equipo)
        })
        clearJornadasBox()
        liga.jornadas.forEach(/** @param {string} jornadaId*/jornadaId => {
            const jornada = store.jornada.getById(jornadaId)
            drawJornadaBox(jornada)
        })

        drawClasificacionTable(id)
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
 * muestra la jornada
 * @param {Jornada} jornada 
 */
function drawJornadaBox(jornada) {
    const boxJornadas = document.getElementById('box-jornadas')
    const div = document.createElement('div')
    const title = document.createElement('h3')

    boxJornadas?.appendChild(div)
    title.innerText = `Jornada nº: ${jornada.numero}`
    div.appendChild(title)

    /** @type {string[]} */const arrPartidos = []
    jornada.partidos.forEach(/** @param {string} partidoId */partidoId => {
        const partido = store.partido.getById(partidoId)
        const eqLocal = store.equipo.getById(partido.local)
        const eqVisitante = store.equipo.getById(partido.visitante)
        div.innerHTML += `
            <div class="partido">
                <div class="equipo local">
                    <label for="${partido.id}-pc-local">PC <input type="number" name="pc-local" id="${partido.id}-pc-local" value="${partido.puntosCLocal}"></label>
                    <span>${eqLocal.nombre}</span>
                    <input type="number" name="p-local" id="${partido.id}-p-local" value="${partido.puntosLocal}">
                </div>
                /
                <div class="equipo visitante">
                    <input type="number" name="p-visitante" id="${partido.id}-p-visitante" value="${partido.puntosVisitante}">
                    <span>${eqVisitante.nombre}</span>
                    <label for="${partido.id}-pc-visitante"><input type="number" name="pc-visitante" id="${partido.id}-pc-visitante" value="${partido.puntosCVisitante}"> PC</label>
                </div>
            </div>
            <div class="f-partido">
                <label for="${partido.id}-fecha">Fecha: <input type="date" name="fecha" id="${partido.id}-fecha" value="${partido.fecha}"></label>
                <label for="${partido.id}-jugado">Jugado: <input type="checkbox" name="jugado" id="${partido.id}-jugado" ${partido.jugado ? 'checked' : ''}></label>
                <button type="button" id="${partido.id}-btn-save">Guardar</button>
            </div>
        `
        arrPartidos.push(`${partido.id}-btn-save`)
    })  
    
    arrPartidos.forEach(/** @param {string} botonId */botonId => {
        const btn = document.getElementById(botonId)
        btn?.addEventListener('click', guardarPartido.bind(btn, botonId))
    })    
}

/**
 * Guarda el partido con id en la store
 * @param {string} id id del partido a guardar
 */
function guardarPartido(id) {
    console.log('guardarPartido', id)
    const partido = /** @type {Partido} */{...store.partido.getById(id)}
    //const partido = store.partido.getById(id)
    partido.puntosLocal = getInputValue(`${id}-p-local`)
    partido.puntosVisitante = getInputValue(`${id}-p-visitante`)
    partido.puntosCLocal = getInputValue(`${id}-pc-local`)
    partido.puntosCVisitante = getInputValue(`${id}-pc-visitante`)
    partido.fecha = getInputValue(`${id}-fecha`)
    partido.jugado = getInputChecked(`${id}-jugado`)

    actualizarClasificacion(id)
    store.partido.update(partido,() => {store.saveState()})
}

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
    console.log(clasificacionLocal, clasificacionVisitante)

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
        
        console.log('clasificacion local: ',clasificacionLocal)
        console.log('clasificacion visitante: ',clasificacionVisitante)
        store.clasificacion.update(clasificacionLocal, () => {store.saveState()})
        store.clasificacion.update(clasificacionVisitante, () => {store.saveState()})

        drawClasificacionTable(liga)
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

/**
 * Obtiene las ligas existentes
 */
function getLigas() {
    const ligas = store.liga.getAll()
    const tbody = document.getElementById('tbody-ligas')
    if (tbody) tbody.innerHTML = ''
    ligas.forEach(/** @param {Liga} liga */liga => drawLigaRow(liga))
}

/**
 * Limpia el formulario de liga, la tabla de equipos y el contenedor de las jornadas
 */
function clearLigaForm() {
    setInputValue('nombre', '')
    setInputValue('year', '')
    setSelectValue('sel-equipo', '0')

    clearEquiposTable()
    clearJornadasBox()
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