// @ts-check

import { store } from './store/redux.js'
import { getInputValue, replyButtonClick, getAPIData, getSelectValue } from './utils/utils.js' 
/** @import { Liga } from './classes/Liga.js' */
/** @import { Clasificacion } from './classes/Clasificacion.js' */
/** @import { Jornada } from './classes/Jornada.js' */
/** @import { Partido } from './classes/Partido.js' */
/** @import { Equipo } from './classes/Equipo.js' */
/** @import { Jugador, PrimeraLinea } from './classes/Jugador.js' */
/** @import { Noticia } from './classes/Noticia.js' */

let pagina = 1
const API_PORT = 3333
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
    const volverEquiposBtn = document.getElementById('volver-equipos-btn')
    const selectLiga = document.getElementById('select-liga')
    const selectYear = document.getElementById('year-liga')

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
                if (volverEquiposBtn) volverEquiposBtn.addEventListener('click', volverEquipos)
                if (selectLiga) selectLiga.addEventListener('change', cargarRedux)
                if (selectYear) selectYear.addEventListener('change', loadLigasByYear)
                
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
 * Lee las noticias de la store y las dibuja en la pagina principal
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
async function leerDetalleNoticia(id) {
    const noticia = await getAPIData(`http://${location.hostname}:${API_PORT}/findbyid/noticias/${id}`)
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
    if (search) respNoticias = await getAPIData(`http://${location.hostname}:${API_PORT}/filter/noticias/${pagina}/titulo/${search}`)
    else respNoticias = await getAPIData(`http://${location.hostname}:${API_PORT}/read/noticias/short/${pagina}`)
    const noticias = respNoticias.data
    if (noticias.length === 0) {
        if (section) section.innerHTML = '<p>No se encontraron noticias</p>'
    } else {
        noticias.forEach(/** @param {Noticia} noticia */noticia => drawNoticia(noticia))
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
    const ligas = await getAPIData(`http://${location.hostname}:${API_PORT}/read/ligas`)
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

    cargarRedux()
    //replyButtonClick('clasificacion-btn')
}

async function loadLigasByYear(){
    const year = getInputValue('year-liga')
    //const ligas = store.getLigasByYear(year)
    const ligas = await getAPIData(`http://${location.hostname}:${API_PORT}/filter/ligas/year/${year}`)
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
 * Dibuja la tabla de clasificación para la liga especificada
 */
async function getClasificacion() {
    const ligaId = getInputValue('select-liga')
    const tbody = document.getElementById('tbody-clasificacion')
    const tituloLiga = document.getElementById('titulo-liga')
    const clasificaciones = store.getClasificacionesFromLigaId(ligaId)
    const liga = await getAPIData(`http://${location.hostname}:${API_PORT}/findbyid/ligas/${ligaId}`)
    let contador = 0

    const boxClasificacion = document.getElementById('box-clasificacion')
    const boxCalendario = document.getElementById('box-calendario')
    const boxEquipos = document.getElementById('box-equipos')

    if (boxClasificacion) boxClasificacion.style.display = 'block'
    if (boxCalendario) boxCalendario.style.display = 'none'
    if (boxEquipos) boxEquipos.style.display = 'none'

    if(tituloLiga) tituloLiga.innerHTML = `${liga[0].nombre}, Temporada ${liga[0].year}`
    if (tbody) tbody.innerHTML = ''
    clasificaciones.forEach(/** @param {Clasificacion} clasificacion */clasificacion => {
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

/**
 * Muestra el calendario de la liga seleccionada
 */
//async function getCalendario() {
//    const ligaId = getInputValue('select-liga')
//    const divCalendario = document.getElementById('box-calendario')
//    //const jornadas = store.getJornadasFromLigaId(ligaId)
//    const jornadas = await getAPIData(`http://${location.hostname}:${API_PORT}/filter/jornadas/ligaid/${ligaId}`)
//
//    const boxClasificacion = document.getElementById('box-clasificacion')
//    const boxEquipos = document.getElementById('box-equipos')
//
//    if (boxClasificacion) boxClasificacion.style.display = 'none'
//    if (divCalendario) divCalendario.style.display = 'block'
//    if (boxEquipos) boxEquipos.style.display = 'none'
//
//    if (divCalendario) divCalendario.innerHTML = ''
//    jornadas.forEach(async (/** @type {Jornada} jornada */jornada) => {
//        //const partidos = store.getPartidosFromJornadaId(jornada.id)
//        const partidos = await getAPIData(`http://${location.hostname}:${API_PORT}/filter/partidos/jornadaid/${jornada.id}`)
//        const boxJornada = document.createElement('div')
//        const jornadaTitle = document.createElement('h3')
//
//        divCalendario?.appendChild(boxJornada)
//        boxJornada.classList.add('box-jornada')
//        jornadaTitle.innerHTML = `Jornada nº: ${jornada.numero}`
//        boxJornada.appendChild(jornadaTitle)
//
//        partidos.forEach(async (/** @type {Partido} partido */partido) => {
//            const eqLocal = await getAPIData(`http://${location.hostname}:${API_PORT}/findbyid/equipos/${partido.local}`)
//            const eqVisitante = await getAPIData(`http://${location.hostname}:${API_PORT}/findbyid/equipos/${partido.visitante}`)
//            const partidoBox = document.createElement('div')
//            const spanLocal = document.createElement('span')
//            const spanVisitante = document.createElement('span')
//            const spanPuntosLocal = document.createElement('span')
//            const spanPuntosVisitante = document.createElement('span')
//            const spanFecha = document.createElement('span')
//
//            partidoBox.classList.add('partido')
//            boxJornada.appendChild(partidoBox)
//
//            spanLocal.innerHTML = `${eqLocal.nombre}`
//            partidoBox.appendChild(spanLocal)
//            spanPuntosLocal.innerHTML = `${partido.puntosLocal}`
//            partidoBox.appendChild(spanPuntosLocal)
//            partidoBox.innerHTML += '-'
//            spanPuntosVisitante.innerHTML = `${partido.puntosVisitante}`
//            partidoBox.appendChild(spanPuntosVisitante)
//            spanVisitante.innerHTML = `${eqVisitante.nombre}`
//            partidoBox.appendChild(spanVisitante)
//            spanFecha.innerHTML = `${partido.fecha}`
//            partidoBox.appendChild(spanFecha)  
//        })
//    })   
//}

/**
 * Displays and sets up the calendar view.
 * Hides the classification and teams sections.
 * Fetches and displays the list of jornadas (matchdays) with corresponding buttons.
 * Each button has an event listener that renders the selected jornada when clicked.
 */

function getCalendario() {
    const divCalendario = document.getElementById('box-calendario')
    const boxClasificacion = document.getElementById('box-clasificacion')
    const boxEquipos = document.getElementById('box-equipos')

    if (boxClasificacion) boxClasificacion.style.display = 'none'
    if (divCalendario) divCalendario.style.display = 'block'
    if (boxEquipos) boxEquipos.style.display = 'none'

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
    })
}

/**
 * Obtiene y muestra los equipos de una liga seleccionada
 */
async function getEquipos() {
    //const ligaId = getInputValue('select-liga')
    const tbody = document.getElementById('tbody-equipos')
    
    const boxClasificacion = document.getElementById('box-clasificacion')
    const boxCalendario = document.getElementById('box-calendario')
    const boxEquipos = document.getElementById('box-equipos')
    const tableEquiposBoc = document.getElementById('table-equipo-box')
    const jugadoresBox = document.getElementById('jugadores-box')

    if (boxClasificacion) boxClasificacion.style.display = 'none'
    if (boxCalendario) boxCalendario.style.display = 'none'
    if (boxEquipos) boxEquipos.style.display = 'block'
    if (tableEquiposBoc) tableEquiposBoc.style.display = 'block'
    if (jugadoresBox) jugadoresBox.style.display = 'none'
    if (tbody) tbody.innerHTML = ''

    //const equipos = store.getEquiposFromLigaId(ligaId)
    //const liga = await getAPIData(`http://${location.hostname}:${API_PORT}/findbyid/ligas/${ligaId}`)
    const equipos = store.equipo.getAll()
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
    const equipo = store.equipo.getById(equipoId)
    const jugadores = await getAPIData(`http://${location.hostname}:${API_PORT}/filter/jugadores/${equipoId}`)    
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




async function cargarRedux() {
    console.log('cargando redux')
    //limpiamos la store
    store.loadState([], 'jornadas')
    store.loadState([], 'partidos')
    store.loadState([], 'equipos')
    store.loadState([], 'clasificaciones')
    //cargamos los datos
    const ligaId = getInputValue('select-liga')
    const liga = await getAPIData(`http://${location.hostname}:${API_PORT}/findbyid/ligas/${ligaId}`)
    liga[0].equipos.forEach(async (/** @type {string}*/equipoId) => {
        const equipo = await getAPIData(`http://${location.hostname}:${API_PORT}/findbyid/equipos/${equipoId}`)
        store.equipo.create(equipo[0])
    }) 
    const jornadas = await getAPIData(`http://${location.hostname}:${API_PORT}/filter/jornadas/${ligaId}`)
    store.loadState(jornadas, 'jornadas')
    const partidos = await getAPIData(`http://${location.hostname}:${API_PORT}/filter/partidos/liga/${ligaId}`)
    store.loadState(partidos, 'partidos')
    const clasificaciones = await getAPIData(`http://${location.hostname}:${API_PORT}/filter/clasificaciones/${ligaId}`)
    store.loadState(clasificaciones, 'clasificaciones')
    replyButtonClick('clasificacion-btn')
}