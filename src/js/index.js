// @ts-check

import { store } from './store/redux.js'
import { getInputValue, setInputValue } from './utils/utils.js' 
import { Liga } from './classes/Liga.js'
import { Clasificacion } from './classes/Clasificacion.js'
import { Jornada } from './classes/Jornada.js'
import { Equipo } from './classes/Equipo.js'
import { Jugador, PrimeraLinea } from './classes/Jugador.js'
import { Noticia } from './classes/Noticia'

document.addEventListener('DOMContentLoaded', onDOMContentLoaded)


// ------- EVENTS ------- //

/**
 * carga inicial
 */
function onDOMContentLoaded() {
    store.loadState()
    const body = document.querySelector('body')
    if(body){
        switch (body.id) {
            case 'pag-principal':
                leerNoticias()
                break;
            case 'pag-noticias':
                checkUrlParams()

                const searchBtn = document.getElementById('btn-search-noticias')
                
                if (searchBtn) searchBtn.addEventListener('click', searchNoticias)
                break;
            case 'pag-competicion':
                loadLigasInSelect()

                const clasificacionBtn = document.getElementById('clasificacion-btn')
                const calendarioBtn = document.getElementById('calendario-btn')
                const equiposBtn = document.getElementById('equipos-btn')

                if (clasificacionBtn) clasificacionBtn.addEventListener('click', getClasificacion)
                if (calendarioBtn) calendarioBtn.addEventListener('click', getCalendario)
                if (equiposBtn) equiposBtn.addEventListener('click', getEquipos)
                break;
            default:
                console.log('no encuentra body')
        }
    }

    
}



// ------- METHODS ------- //

// pagina principal //


/**
 * Lee las noticias de la store y las dibuja en la pagina principal
 */
function leerNoticias() {
    const noticias = store.noticia.getAll()
    const section = document.getElementById('section-noticias')
    if (section) section.innerHTML = ''
    noticias.forEach(/** @param {Noticia} noticia */noticia => drawNoticia(noticia))
}

/**
 * Dibuja una noticia en la seccion de noticias
 * @param {Noticia} noticia - La noticia a dibujar
 */
function drawNoticia(noticia) {
    const section = document.getElementById('section-noticias')
    if (section) section.innerHTML += `
        <div class="box-noticia">
            <h3><a href="./noticias.html?id=${noticia.id}">${noticia.titulo}</a></h3>
            <p>${noticia.cabecera}</p>
        </div>
    `
}


// pagina noticias //

function checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    if (id) leerDetalleNoticia(id)
    else leerNoticias()
}

/**
 * Lee una noticia de la store y la dibuja en la pagina de noticias
 * @param {string} id - id de la noticia a dibujar
 */
function leerDetalleNoticia(id) {
    const noticia = store.noticia.getById(id)
    const section = document.getElementById('detalle-noticia')
    if (section) section.innerHTML = `
        <h3>${noticia.titulo}</h3>
        <img src="./assets/img/foto1-800x395.jpg" alt="imagen noticia">
        <p>${noticia.cabecera}</p>
        <p>${noticia.contenido}</p>
    `
}

/**
 * Busca noticias por su título y las dibuja en la pagina de noticias
 */
function searchNoticias() {
    const search = getInputValue('search-noticias')
    if (!search) {
        alert('Ingresa un criterio de busqueda')
        return
    }
    const noticias = store.getNoticiasByTituloInclude(search)
    const section = document.getElementById('section-noticias')
    if (section) section.innerHTML = ''
    if (noticias.length === 0) {
        if (section) section.innerHTML = '<p>No se encontraron noticias</p>'
    } else if (noticias.length === 1) {
        leerDetalleNoticia(noticias[0].id)
    } else {
        noticias.forEach(/** @param {Noticia} noticia */noticia => drawNoticia(noticia))
    }
}


// Pagina Competicion //

/**
 * Carga la lista de ligas y de años en los selects correspondientes
 */
function loadLigasInSelect() {
    const ligas = store.liga.getAll()
    const selectLigas = document.getElementById('select-liga')
    const selectYear = document.getElementById('year-liga')
    /** @type {string[]} */const years = []
    if (selectLigas) selectLigas.innerHTML = ''
    ligas.forEach(/** @param {Liga} liga */liga => {
        if (selectLigas) selectLigas.innerHTML += `
            <option value="${liga.id}">${liga.nombre}</option>
        `
        if (years.findIndex(year => /** @type {string} */year === liga.year) === -1) years.push(liga.year)
    })

    if (selectYear) selectYear.innerHTML = `<option value="all">todos</option>`
    years.forEach(year => {
        if (selectYear) selectYear.innerHTML += `
            <option value="${year}">${year}</option>
        `
    })
}

/**
 * Dibuja la tabla de clasificación para la liga especificada
 */
function getClasificacion() {
    const ligaId = getInputValue('select-liga')
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

/**
 * Muestra el calendario de la liga seleccionada
 */
function getCalendario() {
    const ligaId = getInputValue('select-liga')
    const divCalendario = document.getElementById('box-calendario')
    const jornadas = store.getJornadasFromLigaId(ligaId)

    jornadas.forEach(/** @param {Jornada} jornada */jornada => {
        if (divCalendario) divCalendario.innerHTML += `
            <div class="box-jornada">
                <h3>Jornada nº: ${jornada.numero}</h3>
                ${jornada.partidos.map(/** @param {string} partidoId */partidoId => {
                    const partido = store.partido.getById(partidoId)
                    const eqLocal = store.equipo.getById(partido.local)
                    const eqVisitante = store.equipo.getById(partido.visitante)
                    return `
                        <div class="partido">
                            <span>${eqLocal.nombre}</span>
                            <span>${partido.puntosLocal}</span>
                            -
                            <span>${partido.puntosVisitante}</span>
                            <span>${eqVisitante.nombre}</span>

                            <span>${partido.fecha}</span>
                        </div>
                    `
                }).join('')}
            </div>
         `
    })   
}

/**
 * Obtiene y muestra los equipos de una liga seleccionada
 */
function getEquipos() {
    const ligaId = getInputValue('select-liga')
    const tbody = document.getElementById('tbody-equipos')
    const equipos = store.getEquiposFromLigaId(ligaId)
    console.log(equipos)

    if (tbody) tbody.innerHTML = ''
    /** @type {string[]} */const arrEquipos = []
    equipos.forEach(/** @param {Equipo} equipo */equipo => {
        if (tbody) tbody.innerHTML += `
            <tr>
                <td id="row_e_${equipo.id}">${equipo.nombre}</td>
                <td>${equipo.poblacion}</td>
                <td>${equipo.direccion}</td>
                <td>${equipo.estadio}</td>
            </tr>
        `
        arrEquipos.push(equipo.id)
    })
    arrEquipos.forEach(/** @param {string} equipoId */equipoId => {
        const td = document.getElementById(`row_e_${equipoId}`)
        if (td) td.addEventListener('click', getJugadoresFromEquipoId.bind(td, equipoId))
    })
}

/**
 * Muestra los jugadores de un equipo
 * @param {string} equipoId - Id del equipo
 */
function getJugadoresFromEquipoId(equipoId) {
    const tbody = document.getElementById('tbody-jugadores')
    const jugadores = store.getJugadoresFromEquipoId(equipoId)

    if (tbody) tbody.innerHTML = ''
    jugadores.forEach(/** @param {Jugador | PrimeraLinea} jugador */jugador => {
        if (tbody) tbody.innerHTML += `
            <tr>
                <td>${jugador.nombre}</td>
                <td>${jugador.apellidos}</td>
                <td>${jugador.nacionalidad}</td>
                <td>${jugador.altura}</td>
                <td>${jugador.peso}</td>
            </tr>
        `
    })
}
