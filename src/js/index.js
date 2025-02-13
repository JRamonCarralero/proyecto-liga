// @ts-check

//import { store } from './store/redux.js'
import { getInputValue, replyButtonClick, getAPIData, getSelectValue } from './utils/utils.js' 
/** @import { Liga } from './classes/Liga.js' */
/** @import { Clasificacion } from './classes/Clasificacion.js' */
/** @import { Jornada } from './classes/Jornada.js' */
/** @import { Partido } from './classes/Partido.js' */
/** @import { Equipo } from './classes/Equipo.js' */
/** @import { Jugador, PrimeraLinea } from './classes/Jugador.js' */
/** @import { Noticia } from './classes/Noticia.js' */
/** @import { EstadisticaJugador } from './classes/EstadisticaJugador.js'} */

let pagina = 1
const API_PORT = location.port ? `:${location.port}` : ''
document.addEventListener('DOMContentLoaded', onDOMContentLoaded)


// ------- EVENTS ------- //

/**
 * carga inicial
 */
function onDOMContentLoaded() {
    const body = document.querySelector('body')
    const searchBtn = document.getElementById('btn-search-noticias')
    const inputSearch = document.getElementById('search-noticias')
    const btnNext = document.getElementById('btn-next-noticias')
    const btnPrev = document.getElementById('btn-prev-noticias')
    
    const clasificacionBtn = document.getElementById('clasificacion-btn')
    const calendarioBtn = document.getElementById('calendario-btn')
    const equiposBtn = document.getElementById('equipos-btn')
    const estadisticasBtn = document.getElementById('estadisticas-btn')
    const volverEquiposBtn = document.getElementById('volver-equipos-btn')
    const selectLiga = document.getElementById('select-liga')
    const selectYear = document.getElementById('year-liga')
    const staSortJugador = document.getElementById('sta-sort-jugador')
    const staSortEquipo = document.getElementById('sta-sort-equipo')
    const staSortPuntos = document.getElementById('sta-sort-puntos')
    const staSortEnsayos = document.getElementById('sta-sort-ensayos')
    const staSortPpie = document.getElementById('sta-sort-ppie')
    const staSortTa = document.getElementById('sta-sort-ta')
    const staSortTr = document.getElementById('sta-sort-tr')

    if(body){
        switch (body.id) {
            case 'pag-principal':
                pagina = 1
                leerNoticias()
                break;
            case 'pag-noticias':
                pagina = 1
                if (searchBtn) searchBtn.addEventListener('click', searchNoticias.bind(searchBtn, 1))
                if (inputSearch) inputSearch.addEventListener('keypress', onInputEnter)
                if (btnNext) btnNext.addEventListener('click', nextNoticias)
                if (btnPrev) btnPrev.addEventListener('click', prevNoticias)
                    
                checkUrlParams()
                break;
            case 'pag-competicion':
                if (clasificacionBtn) clasificacionBtn.addEventListener('click', getClasificacion)
                if (calendarioBtn) calendarioBtn.addEventListener('click', getCalendario)
                if (equiposBtn) equiposBtn.addEventListener('click', getEquipos)
                if (estadisticasBtn) estadisticasBtn.addEventListener('click', getEstadisticas.bind(estadisticasBtn, 'puntos'))
                if (volverEquiposBtn) volverEquiposBtn.addEventListener('click', volverEquipos)
                if (selectLiga) selectLiga.addEventListener('change', replyButtonClick.bind(selectLiga, 'clasificacion-btn'))
                if (selectYear) selectYear.addEventListener('change', loadLigasByYear)
                if (staSortJugador) staSortJugador.addEventListener('click', getEstadisticas.bind(estadisticasBtn, 'jugador'))
                if (staSortEquipo) staSortEquipo.addEventListener('click', getEstadisticas.bind(estadisticasBtn, 'equipo'))
                if (staSortPuntos) staSortPuntos.addEventListener('click', getEstadisticas.bind(estadisticasBtn, 'puntos'))
                if (staSortEnsayos) staSortEnsayos.addEventListener('click', getEstadisticas.bind(estadisticasBtn, 'ensayos'))
                if (staSortPpie) staSortPpie.addEventListener('click', getEstadisticas.bind(estadisticasBtn, 'ppie'))
                if (staSortTa) staSortTa.addEventListener('click', getEstadisticas.bind(estadisticasBtn, 'TA'))
                if (staSortTr) staSortTr.addEventListener('click', getEstadisticas.bind(estadisticasBtn, 'TR'))
                
                loadLigasInSelect()    
                break;
            default:
                console.log('no encuentra body')
        }
    }

    
}

/**
 * Funcion que se dispara al pulsar enter en el input de busqueda de noticias
 * Llama a replySearchButtonClick
 * @param {KeyboardEvent} e
 */
function onInputEnter(e) {
    if (e.key === 'Enter') replyButtonClick('btn-search-noticias')
}

// ------- METHODS ------- //

// pagina principal //


/**
 * Limpia el contenedor de noticias y llama a la función de paginado
 */
function leerNoticias() {
    const section = document.getElementById('section-noticias')
    if (section) section.innerHTML = ''
    paginarNoticias()
}

/**
 * Dibuja una noticia en la seccion de noticias
 * @param {Noticia} noticia - La noticia a dibujar
 */
function drawNoticia(noticia) {
    const body = document.querySelector('body')
    if (body?.id === 'pag-noticias') {
        const section = document.getElementById('section-noticias')
        if (section) section.innerHTML += `
            <div class="box-noticia">
                <div class="img-box">
                    <img src="./assets/img/foto1-800x395.jpg" alt="${noticia.titulo}">
                    <h3><a class="link-noticia" href="./noticias.html?id=${noticia._id}">${noticia.titulo}</a></h3>
                </div>
                <div class="text-box">
                    <p>${noticia.cabecera}</p>
                </div>
            </div>
        `
    } else {
        const sectionMain = document.getElementById('main-section-noticias')
        if (sectionMain) sectionMain.innerHTML += `
            <div class="main-box-noticia">
                <div class="main-img-box">
                    <img class="img-main-noticia" src="./assets/img/foto1-800x395.jpg" alt="${noticia.titulo}">  
                </div>
                <div class="main-text-box">
                    <h3 class="main-title-noticia"><a class="main-link-noticia" href="./noticias.html?id=${noticia._id}">${noticia.titulo}</a></h3>
                    <p class="main-text-noticia">${noticia.cabecera}</p>
                </div>
            </div>
        `
    }
    
}


// pagina noticias //

/**
 * Comprueba los parametros de la url
 * Si hay un id, llama a leerDetalleNoticia
 * Si no, llama a leerNoticias
 */

function checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    if (id) leerDetalleNoticia(id)
    else leerNoticias()
}

/**
 * Lee una noticia de la BBDD y la dibuja en la pagina de noticias
 * @param {string} id - id de la noticia a dibujar
 */
async function leerDetalleNoticia(id) {
    const noticia = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/findbyid/noticias/${id}`)
    const section = document.getElementById('detalle-noticia')
    const listNoticias = document.getElementById('list-noticias')
    
    if (listNoticias) listNoticias.style.display = 'none'
    if (section) {
        section.innerHTML = `
            <div class="detalle-noticia">
                <h2>${noticia.titulo}</h2>
                <img class="img-detalle-noticia" src="./assets/img/foto1-800x395.jpg" alt="imagen noticia">
                <p class="texto-noticia">${noticia.cabecera}</p>
                <p class="texto-noticia">${noticia.contenido}</p>
            </div>
        `
        section.style.display = 'block'
    }
}

/**
 * Busca noticias por su título y las dibuja en la pagina de noticias
 * @param {number} page
 */
function searchNoticias(page) {
    const search = getInputValue('search-noticias')
    const section = document.getElementById('section-noticias')
    const section2 = document.getElementById('detalle-noticia')
    const listNoticias = document.getElementById('list-noticias')
    
    pagina = page
    if (!search) {
        alert('Ingresa un criterio de busqueda')
        return
    }
    if (listNoticias) listNoticias.style.display = 'block'
    if (section) section.innerHTML = ''
    if (section2) section2.style.display = 'none'

    paginarNoticias()
}

/**
 * Muestra las noticias que corresponden al paginado en la pagina de noticias
 */
async function paginarNoticias() {
    const body = document.querySelector('body')
    const search = getInputValue('search-noticias').toLocaleLowerCase()
    const section = document.getElementById('section-noticias')
    const btnNext = document.getElementById('btn-next-noticias')
    const btnPrev = document.getElementById('btn-prev-noticias')
    let respNoticias
    if (search) respNoticias = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/filter/noticias/search/${pagina}/6/${search}`)
    else {
        if (body?.id === 'pag-noticias') respNoticias = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/filter/noticias/search/${pagina}/6/_`)
        else respNoticias = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/filter/noticias/search/${pagina}/3/_`)
    }
    let noticias = respNoticias.data
    if (noticias.length === 0) {
        if (section) section.innerHTML = '<p>No se encontraron noticias</p>'
    } else {
        if (body) {
            if (body.id === 'pag-noticias') {
                if (respNoticias.siguiente) {
                    if (btnNext) btnNext.style.display = 'block'
                } else {
                    if (btnNext) btnNext.style.display = 'none'
                }
                if (respNoticias.anterior) {
                    if (btnPrev) btnPrev.style.display = 'block'
                } else {
                    if (btnPrev) btnPrev.style.display = 'none'
                }
            }
        }
        noticias.forEach(/** @param {Noticia} noticia */noticia => drawNoticia(noticia))
    }
}

/**
 * Muestra las siguientes 6 noticias en la pagina de noticias
 */
function nextNoticias() {
    pagina += 1
    const section = document.getElementById('section-noticias')
    if (section) section.innerHTML = ''
    paginarNoticias()
}

/**
 * Muestra las 6 noticias previas en la pagina de noticias
 */
function prevNoticias() {
    pagina -= 1
    const section = document.getElementById('section-noticias')
    if (section) section.innerHTML = ''
    paginarNoticias()
}


// Pagina Competicion //

/**
 * Carga la lista de ligas y de años en los selects correspondientes
 */
async function loadLigasInSelect() {
    //const ligas = store.liga.getAll()
    const ligas = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/read/ligas`)
    const selectLigas = document.getElementById('select-liga')
    const selectYear = document.getElementById('year-liga')
    /** @type {string[]} */const years = []
    if (selectLigas) selectLigas.innerHTML = ''
    ligas.forEach(/** @param {Liga} liga */liga => {
        if (selectLigas) selectLigas.innerHTML += `
            <option value="${liga._id}">${liga.nombre}-${liga.year}</option>
        `
        if (years.findIndex(year => /** @type {string} */year === liga.year) === -1) years.push(liga.year)
    })

    if (selectYear) selectYear.innerHTML = `<option value="all">todos</option>`
    years.forEach(year => {
        if (selectYear) selectYear.innerHTML += `
            <option value="${year}">${year}</option>
        `
    })

    replyButtonClick('clasificacion-btn')
}

/**
 * Carga las ligas que se celebraron en el año seleccionado
 * en el select correspondiente y muestra la clasificacion de la
 * liga seleccionada
 */
async function loadLigasByYear(){
    const year = getInputValue('year-liga')
    const ligas = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/filter/ligas/${year}`)
    const selectLigas = document.getElementById('select-liga')
    if (selectLigas) selectLigas.innerHTML = ''
    ligas.forEach(/** @param {Liga} liga */liga => {
        if (selectLigas) selectLigas.innerHTML += `
            <option value="${liga._id}">${liga.nombre}-${liga.year}</option>
        `
    })
    replyButtonClick('clasificacion-btn')
}

/**
 * @typedef {Object} ClasificacionTabla
 * @property {string} equipo
 * @property {number} puntos
 * @property {number} partidosJugados
 * @property {number} partidosGanados
 * @property {number} partidosPerdidos
 * @property {number} partidosEmpatados
 * @property {number} puntosAnotados
 * @property {number} puntosRecibidos
 */

/**
 * Dibuja la tabla de clasificación para la liga especificada
 */
async function getClasificacion() {
    const ligaId = getInputValue('select-liga')
    const tbody = document.getElementById('tbody-clasificacion')
    const tituloLiga = document.getElementById('titulo-liga')
    const clasificaciones = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/read/clasificaciones/table/${ligaId}`)
    const liga = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/findbyid/ligas/${ligaId}`)
    let contador = 0

    const boxClasificacion = document.getElementById('box-clasificacion')
    const boxCalendario = document.getElementById('box-calendario')
    const boxEquipos = document.getElementById('box-equipos')
    const boxEstadisticas = document.getElementById('box-estadisticas')

    if (boxClasificacion) boxClasificacion.style.display = 'block'
    if (boxCalendario) boxCalendario.style.display = 'none'
    if (boxEquipos) boxEquipos.style.display = 'none'
    if (boxEstadisticas) boxEstadisticas.style.display = 'none'

    if(tituloLiga) tituloLiga.innerHTML = `${liga.nombre}, Temporada ${liga.year}`
    if (tbody) tbody.innerHTML = ''
    clasificaciones.forEach(/** @param {ClasificacionTabla} clasificacion */clasificacion => {
        if (tbody) tbody.innerHTML += `
            <tr>
                <td>${++contador}</td>
                <td>${clasificacion.equipo}</td>
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
 * Muestra la vista del calendario
 * Rellena el selector de jornadas
 * Llama a la funcion que dibuja la jornada
 */

async function getCalendario() {
    const ligaId = getSelectValue('select-liga')
    const boxClasificacion = document.getElementById('box-clasificacion')
    const boxCalendario = document.getElementById('box-calendario')
    const boxEquipos = document.getElementById('box-equipos')
    const boxEstadisticas = document.getElementById('box-estadisticas')

    if (boxClasificacion) boxClasificacion.style.display = 'none'
    if (boxCalendario) boxCalendario.style.display = 'block'
    if (boxEquipos) boxEquipos.style.display = 'none'
    if (boxEstadisticas) boxEstadisticas.style.display = 'none'

    const jornadasSelect = document.getElementById('jornadas-select')
    if (jornadasSelect) jornadasSelect.innerHTML = ''
    const jornadas = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/filter/jornadas/${ligaId}`)
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
 * @typedef {Object} PartidoTable
 * @property {string} _id
 * @property {string} equipoLocal
 * @property {string} equipoVisitante
 * @property {number} puntosLocal
 * @property {number} puntosVisitante
 * @property {number} puntosCLocal
 * @property {number} puntosCVisitante
 * @property {Date} fecha
 * @property {boolean} jugado
 * @property {string} estadio
 */
/**
 * Dibuja la jornada especificada
 */
async function drawSelectedJornada() {
    const jornadaId = getSelectValue('jornadas-select')
    const jornada = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/findbyid/jornadas/${jornadaId}`)
    const jornadaNumero = document.getElementById('jornada-numero')
    if (jornadaNumero) jornadaNumero.innerHTML = `Jornada ${jornada.numero}`

    const partidos = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/read/partidos/table/${jornadaId}`)
    const tbody = document.getElementById('tbody-calendario')
    if (tbody) tbody.innerHTML = ''

    partidos.forEach((/** @type {PartidoTable} */ partido) => {
        const tr = document.createElement('tr')
        const cellFecha = document.createElement('td')
        const cellLocal = document.createElement('td')
        const cellResultado = document.createElement('td')
        const cellVisitante = document.createElement('td')
        const cellEstadio = document.createElement('td')

        tbody?.appendChild(tr)
        cellFecha.innerText = String(partido.fecha)
        tr.appendChild(cellFecha)
        cellLocal.innerText = partido.equipoLocal
        tr.appendChild(cellLocal)
        cellResultado.innerHTML = `${partido.puntosLocal} - ${partido.puntosVisitante}`
        tr.appendChild(cellResultado)
        cellVisitante.innerText = partido.equipoVisitante
        tr.appendChild(cellVisitante)
        cellEstadio.innerText = partido.estadio
        tr.appendChild(cellEstadio)
    })
}

/**
 * Obtiene y muestra los equipos de una liga seleccionada
 */
async function getEquipos() {
    const ligaId = getSelectValue('select-liga')
    const tbody = document.getElementById('tbody-equipos')
    
    const boxClasificacion = document.getElementById('box-clasificacion')
    const boxCalendario = document.getElementById('box-calendario')
    const boxEquipos = document.getElementById('box-equipos')
    const tableEquiposBoc = document.getElementById('table-equipo-box')
    const jugadoresBox = document.getElementById('jugadores-box')
    const boxEstadisticas = document.getElementById('box-estadisticas')

    if (boxClasificacion) boxClasificacion.style.display = 'none'
    if (boxCalendario) boxCalendario.style.display = 'none'
    if (boxEquipos) boxEquipos.style.display = 'block'
    if (tableEquiposBoc) tableEquiposBoc.style.display = 'block'
    if (jugadoresBox) jugadoresBox.style.display = 'none'
    if (boxEstadisticas) boxEstadisticas.style.display = 'none'
    if (tbody) tbody.innerHTML = ''

    const equipos = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/filter/equipos/${ligaId}`)
    equipos.forEach(async (/** @type {Equipo}*/equipo) => {        
        const tr = document.createElement('tr')
        const cellNombre = document.createElement('td')
        const cellPoblacion = document.createElement('td')
        const cellDireccion = document.createElement('td')
        const cellEstadio = document.createElement('td')

        cellNombre.innerText = equipo.nombre
        cellNombre.classList.add('cp')
        cellNombre.addEventListener('click', getJugadoresFromEquipoId.bind(cellNombre, equipo._id))
        tr.appendChild(cellNombre)
        cellPoblacion.innerText = equipo.poblacion
        tr.appendChild(cellPoblacion)
        cellDireccion.innerText = equipo.direccion
        tr.appendChild(cellDireccion)
        cellEstadio.innerText = equipo.estadio
        tr.appendChild(cellEstadio)
        tbody?.appendChild(tr)
    })
}

/**
 * Muestra los jugadores de un equipo
 * @param {string} equipoId - Id del equipo
 */
async function getJugadoresFromEquipoId(equipoId) {
    const tbody = document.getElementById('tbody-jugadores')
    const equipo = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/findbyid/equipos/${equipoId}`)
    const jugadores = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/filter/jugadores/${equipoId}`)    
    const equipoNombre = document.getElementById('equipo-nombre')
    const equipoData = document.getElementById('equipo-data')
    
    const tableEquiposBox = document.getElementById('table-equipo-box')
    const jugadoresBox = document.getElementById('jugadores-box')
    if (tableEquiposBox) tableEquiposBox.style.display = 'none'
    if (jugadoresBox) jugadoresBox.style.display = 'block'

    if (equipoNombre) equipoNombre.innerHTML = equipo.nombre
    if (equipoData) equipoData.innerHTML = `
        <p>Población: ${equipo.poblacion}</p>
        <p>Dirección: ${equipo.direccion}</p>
        <p>Estadio: ${equipo.estadio}</p>
    `


    if (tbody) tbody.innerHTML = ''
    jugadores.forEach(/** @param {Jugador | PrimeraLinea} jugador */jugador => {
        const tr = document.createElement('tr')
        const cellNombre = document.createElement('td')
        const cellApellidos = document.createElement('td')
        const cellNacionalidad = document.createElement('td')
        const cellAltura = document.createElement('td')
        const cellPeso = document.createElement('td')

        cellNombre.innerText = jugador.nombre
        tr.appendChild(cellNombre)
        cellApellidos.innerText = jugador.apellidos
        tr.appendChild(cellApellidos)
        cellNacionalidad.innerText = jugador.nacionalidad
        tr.appendChild(cellNacionalidad)
        cellAltura.innerText = String(jugador.altura)
        tr.appendChild(cellAltura)
        cellPeso.innerText = String(jugador.peso)
        tr.appendChild(cellPeso)
        tbody?.appendChild(tr)
    })
}

/**
 * Vuelve a mostrar la tabla de equipos y oculta la de jugadores
 */
function volverEquipos() {
    const tableEquiposBox = document.getElementById('table-equipo-box')
    const jugadoresBox = document.getElementById('jugadores-box')
    if (tableEquiposBox) tableEquiposBox.style.display = 'block'
    if (jugadoresBox) jugadoresBox.style.display = 'none'
}

/**
 * @typedef {Object} EstadisticaTable
 * @property {string} eqNombre
 * @property {string} jugNombre
 * @property {string} jugApellidos
 * @property {number} ensayos
 * @property {number} puntosPie
 * @property {number} puntos
 * @property {number} tAmarillas
 * @property {number} tRojas
 */
/**
 * Dibuja en la tabla de estadisticas de los jugadores de la liga seleccionada
 * @param {string} sortBy El campo por el que se ordena la tabla
 */
async function getEstadisticas(sortBy) {
    const ligaId = getSelectValue('select-liga')
    const boxClasificacion = document.getElementById('box-clasificacion')
    const boxCalendario = document.getElementById('box-calendario')
    const boxEquipos = document.getElementById('box-equipos')
    const boxEstadisticas = document.getElementById('box-estadisticas')
    const ths = document.querySelectorAll('.th-cursor')

    for (const th of ths) {
        th.classList.remove('th-selected')
    }
    switch (sortBy) {
        case 'jugador':
            document.getElementById('sta-sort-jugador')?.classList.add('th-selected')
            break
        case 'equipo':
            document.getElementById('sta-sort-equipo')?.classList.add('th-selected')
            break
        case 'ensayos':
            document.getElementById('sta-sort-ensayos')?.classList.add('th-selected')
            break
        case 'ppie':
            document.getElementById('sta-sort-ppie')?.classList.add('th-selected')
            break
        case 'TA':
            document.getElementById('sta-sort-ta')?.classList.add('th-selected')
            break
        case 'TR':
            document.getElementById('sta-sort-tr')?.classList.add('th-selected')
            break
        default:
            document.getElementById('sta-sort-puntos')?.classList.add('th-selected')
        }

    if (boxClasificacion) boxClasificacion.style.display = 'none'
    if (boxCalendario) boxCalendario.style.display = 'none'
    if (boxEquipos) boxEquipos.style.display = 'none'
    if (boxEstadisticas) boxEstadisticas.style.display = 'block'

    const tbody = document.getElementById('tbody-estadisticas')
    if (tbody) tbody.innerHTML = ''
    const estadisticas = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/read/estadisticas/table/${ligaId}/${sortBy}`)
    estadisticas.forEach((/** @type {EstadisticaTable}*/estadistica) => drawEstadisticaRow(estadistica))
}

/**
 * Dibuja una fila de la tabla de estadisticas de jugador con los datos
 * de una estadistica
 * @param {EstadisticaTable} estadistica La estadistica a dibujar
 */
function drawEstadisticaRow(estadistica) {
    const tbody = document.getElementById('tbody-estadisticas')
    const tr = document.createElement('tr')
    const cellJugador = document.createElement('td')
    const cellEquipo = document.createElement('td')
    const cellEnsayos = document.createElement('td')
    const cellPPie = document.createElement('td')
    const cellPuntos = document.createElement('td')
    const cellTA = document.createElement('td')
    const cellTR = document.createElement('td')

    tbody?.appendChild(tr)
    cellJugador.textContent = `${estadistica.jugNombre} ${estadistica.jugApellidos}`
    tr.appendChild(cellJugador)
    cellEquipo.textContent = estadistica.eqNombre
    tr.appendChild(cellEquipo)
    cellPuntos.textContent = String(estadistica.puntos)
    tr.appendChild(cellPuntos)
    cellEnsayos.textContent = String(estadistica.ensayos)
    tr.appendChild(cellEnsayos)
    cellPPie.textContent = String(estadistica.puntosPie)
    tr.appendChild(cellPPie)
    cellTA.textContent = String(estadistica.tAmarillas)
    tr.appendChild(cellTA)
    cellTR.textContent = String(estadistica.tRojas)
    tr.appendChild(cellTR)
}