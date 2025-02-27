// @ts-check

import { getInputValue, replyButtonClick, getAPIData, getSelectValue } from './utils/utils.js' 
/** @import { Liga } from './classes/Liga.js' */
/** @import { Jornada } from './classes/Jornada.js' */
/** @import { Noticia } from './classes/Noticia.js' */

let pagina = 1
let pagEstadisticas = 1
let sortEstadisticas = 'puntos'
const API_PORT = location.port ? `:${location.port}` : ''
document.addEventListener('DOMContentLoaded', onDOMContentLoaded)


// ------- EVENTS ------- //

/**
 * carga inicial
 */
async function onDOMContentLoaded() {
    const body = document.querySelector('body')

    const clasificacionTable = document.querySelector('clasificacion-table')
    const selectedLigaTitle = document.querySelector('selected-liga-title')

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
    const salirResumenBtn = document.getElementById('salir-resumen-btn')
    const btnEstPrev = document.getElementById('btn-est-prev')
    const btnEstNext = document.getElementById('btn-est-next')

    const appConfig = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/read/appconfig`)
    localStorage.setItem('appConfig', JSON.stringify(appConfig[0]))
    let mainLiga = ''
    if (appConfig) mainLiga = appConfig[0].ligaId

    if(body){
        switch (body.id) {
            case 'pag-principal':
                pagina = 1
                leerNoticias()
                if (clasificacionTable) clasificacionTable.setAttribute('data', JSON.stringify(await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/read/clasificaciones/table/${mainLiga}`)))
                if (selectedLigaTitle) selectedLigaTitle.setAttribute('liga', JSON.stringify(await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/findbyid/ligas/${mainLiga}`)))
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
                if (salirResumenBtn) salirResumenBtn.addEventListener('click', ocultarResumen)
                if (btnEstPrev) btnEstPrev.addEventListener('click', prevEstadisticas)
                if (btnEstNext) btnEstNext.addEventListener('click', nextEstadisticas)
                
                loadLigasInSelect()    
                break;
            default:
                console.log('no encuentra body')
        }
    }  

    window.addEventListener('sort-estadistica-by-event', (event) => {
        console.log('sort-estadistica-by-event', /** @type {CustomEvent} */(event).detail)
        getEstadisticas(/** @type {CustomEvent} */(event).detail)
      })
    window.addEventListener('show-equipo-event', (event) => {
        console.log('show-equipo-event', /** @type {CustomEvent} */(event).detail)
        getJugadoresFromEquipoId(/** @type {CustomEvent} */(event).detail)
      })
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
    paginarNoticias()
}

/**
 * Dibuja una noticia en la seccion de noticias
 * @param {Noticia[]} noticias - La noticia a dibujar
 */
function drawNoticia(noticias) {
    const body = document.querySelector('body')
    const component = document.getElementById('noticiaBoxWC')
    if (body?.id === 'pag-noticias') {
        component?.setAttribute('noticias', JSON.stringify({noticias: noticias, origin: 'list'}))
    } else {
        component?.setAttribute('noticias', JSON.stringify({noticias: noticias, origin: 'main'}))
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
    const noticia = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/findbyid/noticias/${id}`)
    //const section = document.getElementById('detalle-noticia')
    const listNoticias = document.getElementById('list-noticias')
    
    if (listNoticias) listNoticias.style.display = 'none'

    const component = document.getElementById('detalleNoticiaWC')
    component?.setAttribute('noticia', JSON.stringify(noticia))
}

/**
 * Busca noticias por su título y las dibuja en la pagina de noticias
 * @param {number} page
 */
function searchNoticias(page) {
    const search = getInputValue('search-noticias')
    const section2 = document.getElementById('detalle-noticia')
    const listNoticias = document.getElementById('list-noticias')
    
    pagina = page
    if (!search) {
        alert('Ingresa un criterio de busqueda')
        return
    }
    if (listNoticias) listNoticias.style.display = 'block'
    if (section2) section2.style.display = 'none'

    paginarNoticias()
}

/**
 * Muestra las noticias que corresponden al paginado en la pagina de noticias
 */
async function paginarNoticias() {
    const body = document.querySelector('body')
    const search = getInputValue('search-noticias').toLocaleLowerCase()
    const btnNext = document.getElementById('btn-next-noticias')
    const btnPrev = document.getElementById('btn-prev-noticias')
    let respNoticias
    if (search) respNoticias = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/filter/noticias/search/${pagina}/6/${search}`)
    else {
        if (body?.id === 'pag-noticias') respNoticias = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/filter/noticias/search/${pagina}/6/_`)
        else respNoticias = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/filter/noticias/search/${pagina}/3/_`)
    }
    console.log('noticias', respNoticias)
    let noticias = respNoticias.data
    if (noticias.length === 0) {
        console.log('sin noticias')
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
        drawNoticia(noticias)
    }
}

/**
 * Muestra las siguientes 6 noticias en la pagina de noticias
 */
function nextNoticias() {
    pagina += 1
    paginarNoticias()
}

/**
 * Muestra las 6 noticias previas en la pagina de noticias
 */
function prevNoticias() {
    pagina -= 1
    paginarNoticias()
}


// Pagina Competicion //

/**
 * Carga la lista de ligas y de años en los selects correspondientes
 */
async function loadLigasInSelect() {
    const appConfig = localStorage.getItem('appConfig')
    let mainLiga = ''
    if (appConfig) mainLiga = JSON.parse(appConfig).ligaId
    const ligas = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/read/ligas`)
    const selectLigas = document.getElementById('select-liga')
    const selectYear = document.getElementById('year-liga')
    /** @type {string[]} */const years = []
    if (selectLigas) selectLigas.innerHTML = ''
    ligas.forEach(/** @param {Liga} liga */liga => {
        if (selectLigas) selectLigas.innerHTML += `
            <option value="${liga._id}" ${liga._id === mainLiga ? 'selected' : ''}>${liga.nombre}-${liga.year}</option>
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
    const appConfig = localStorage.getItem('appConfig')
    let mainLiga = ''
    if (appConfig) mainLiga = JSON.parse(appConfig).ligaId
    const year = getInputValue('year-liga')
    const ligas = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/filter/ligas/${year}`)
    const selectLigas = document.getElementById('select-liga')
    if (selectLigas) selectLigas.innerHTML = ''
    ligas.forEach(/** @param {Liga} liga */liga => {
        if (selectLigas) selectLigas.innerHTML += `
            <option value="${liga._id}" ${liga._id === mainLiga ? 'selected' : ''}>${liga.nombre}-${liga.year}</option>
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
    const clasificaciones = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/read/clasificaciones/table/${ligaId}`)
    const liga = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/findbyid/ligas/${ligaId}`)

    const clasificacionTable = document.querySelector('clasificacion-table')
    const selectedLigaTitle = document.querySelector('selected-liga-title')

    const boxClasificacion = document.getElementById('box-clasificacion')
    const boxCalendario = document.getElementById('box-calendario')
    const boxEquipos = document.getElementById('box-equipos')
    const boxEstadisticas = document.getElementById('box-estadisticas')

    if (boxClasificacion) boxClasificacion.style.display = 'block'
    if (boxCalendario) boxCalendario.style.display = 'none'
    if (boxEquipos) boxEquipos.style.display = 'none'
    if (boxEstadisticas) boxEstadisticas.style.display = 'none'

    if (clasificacionTable) clasificacionTable.setAttribute('data', JSON.stringify(clasificaciones))
    if (selectedLigaTitle) selectedLigaTitle.setAttribute('liga', JSON.stringify(liga))
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
    const resumenPartido = document.getElementById('resumen-partido')

    if (boxClasificacion) boxClasificacion.style.display = 'none'
    if (boxCalendario) boxCalendario.style.display = 'block'
    if (boxEquipos) boxEquipos.style.display = 'none'
    if (boxEstadisticas) boxEstadisticas.style.display = 'none'
    if (resumenPartido) resumenPartido.style.display = 'none'

    const jornadasSelect = document.getElementById('jornadas-select')
    if (jornadasSelect) jornadasSelect.innerHTML = ''
    const jornadas = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/filter/jornadas/${ligaId}`)
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
    const jornada = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/findbyid/jornadas/${jornadaId}`)
    const jornadaNumero = document.getElementById('jornada-numero')
    if (jornadaNumero) jornadaNumero.innerHTML = `Jornada ${jornada.numero}`

    const partidos = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/read/partidos/table/${jornadaId}`)
    const tbody = document.getElementById('tbody-calendario')
    if (tbody) tbody.innerHTML = ''

    partidos.forEach((/** @type {PartidoTable} */ partido) => {
        const tr = document.createElement('tr')
        const cellFecha = document.createElement('td')
        const cellLocal = document.createElement('td')
        const cellResultado = document.createElement('td')
        const cellVisitante = document.createElement('td')
        const cellEstadio = document.createElement('td')
        const cellPartido = document.createElement('td')

        tbody?.appendChild(tr)
        cellFecha.innerText = String(partido.fecha)
        cellFecha.classList.add('hidden')
        tr.appendChild(cellFecha)
        cellLocal.innerText = partido.equipoLocal
        tr.appendChild(cellLocal)
        cellResultado.innerHTML = `${partido.puntosLocal} - ${partido.puntosVisitante}`
        tr.appendChild(cellResultado)
        cellVisitante.innerText = partido.equipoVisitante
        tr.appendChild(cellVisitante)
        cellEstadio.innerText = partido.estadio
        cellEstadio.classList.add('hidden')
        tr.appendChild(cellEstadio)
        tr.appendChild(cellPartido)
        if (partido.jugado) {
            const verPartido = document.createElement('button')
            verPartido.classList.add('btn-table')
            verPartido.innerHTML = '▶'
            verPartido.addEventListener('click', verAccionesPartido.bind(verPartido, partido))
            cellPartido.appendChild(verPartido)
        }
    })
}

/**
 * @typedef {Object} AccionesTable
 * @property {string} _id
 * @property {string} eqNombre
 * @property {string} ligaId
 * @property {string} minuto
 * @property {string} jugadorId
 * @property {string} jugNombre
 * @property {string} jugApellidos
 * @property {string} equipoId
 * @property {string} accion
 */
/**
 * Muestra las acciones de un partido
 * @param {PartidoTable} partido partido cuyas acciones se desean mostrar
 */
async function verAccionesPartido(partido) {
    let pEqLocal = 0
    let pEqVisitante = 0
    const eqLocal = document.getElementById('eq-local')
    const eqVisitante = document.getElementById('eq-visitante')
    const pLocalEl = document.getElementById('p-local')
    const pVisitanteEl = document.getElementById('p-visitante')
    const resumenAcciones = document.getElementById('resumen-acciones')
    const resumenPartido = document.getElementById('resumen-partido')
    const salirResumenBtn = document.getElementById('salir-resumen-btn')

    if (eqLocal) eqLocal.innerText = partido.equipoLocal
    if (eqVisitante) eqVisitante.innerText = partido.equipoVisitante
    if (pLocalEl) pLocalEl.innerText = String(pEqLocal)
    if (pVisitanteEl) pVisitanteEl.innerText = String(pEqVisitante)
    if (resumenAcciones) resumenAcciones.innerHTML = ''
    if (resumenPartido) resumenPartido.style.display = 'block'
    if (salirResumenBtn) salirResumenBtn.style.display = 'none'

    const acciones = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/read/acciones/table/${partido._id}`)
    let i = 0

    /**
     * Agrega las acciones de un partido en orden cronologico
     * con un retardo de 2 segundos entre cada accion
     */
    function addAcciones() {
        const p = document.createElement('p')
        switch (acciones[i].accion) {
            case 'E': 
                p.innerText = `⌚︎ ${acciones[i].minuto}: ${acciones[i].jugNombre} ${acciones[i].jugApellidos} anota un ensayo 🏉 para ${acciones[i].eqNombre}` 
                if (partido.equipoLocal === acciones[i].eqNombre) {
                    pEqLocal += 5
                    if (pLocalEl) pLocalEl.innerText = String(pEqLocal)
                } else {
                    pEqVisitante += 5                
                    if (pVisitanteEl) pVisitanteEl.innerText = String(pEqVisitante)
                }
                break
            case 'ET': 
                p.innerText = `⌚︎ ${acciones[i].minuto}: ${acciones[i].jugNombre} ${acciones[i].jugApellidos} transforma el ensayo ┟┧ para ${acciones[i].eqNombre}`  
                if (partido.equipoLocal === acciones[i].eqNombre) {
                    pEqLocal += 2
                    if (pLocalEl) pLocalEl.innerText = String(pEqLocal)
                } else {
                    pEqVisitante += 2                
                    if (pVisitanteEl) pVisitanteEl.innerText = String(pEqVisitante)
                }
                break
            case 'EC': 
                p.innerText = `⌚︎ ${acciones[i].minuto}: Concedido ensayo de castigo 🏉 al jugador ${acciones[i].jugNombre} ${acciones[i].jugApellidos} para ${acciones[i].eqNombre}`  
                if (partido.equipoLocal === acciones[i].eqNombre) {
                    pEqLocal += 7
                    if (pLocalEl) pLocalEl.innerText = String(pEqLocal)
                } else {
                    pEqVisitante += 7                
                    if (pVisitanteEl) pVisitanteEl.innerText = String(pEqVisitante)
                }
                break
            case 'GC': 
                p.innerText = `⌚︎ ${acciones[i].minuto}: ${acciones[i].jugNombre} ${acciones[i].jugApellidos} anota un golpe de castigo ┟┧ para ${acciones[i].eqNombre}`  
                if (partido.equipoLocal === acciones[i].eqNombre) {
                    pEqLocal += 3
                    if (pLocalEl) pLocalEl.innerText = String(pEqLocal)
                } else {
                    pEqVisitante += 3                
                    if (pVisitanteEl) pVisitanteEl.innerText = String(pEqVisitante)
                }
                break
            case 'D': 
                p.innerText = `⌚︎ ${acciones[i].minuto}: ${acciones[i].jugNombre} ${acciones[i].jugApellidos} anota un drop ┟┧ para ${acciones[i].eqNombre}`  
                if (partido.equipoLocal === acciones[i].eqNombre) {
                    pEqLocal += 3
                    if (pLocalEl) pLocalEl.innerText = String(pEqLocal)
                } else {
                    pEqVisitante += 3                
                    if (pVisitanteEl) pVisitanteEl.innerText = String(pEqVisitante)
                }
                break
            case 'TA':
                p.innerText =  `⌚︎ ${acciones[i].minuto}: El jugador ${acciones[i].jugNombre} ${acciones[i].jugApellidos} de ${acciones[i].eqNombre} recibe una tarjeta amarilla 🟨` 
                break
            case 'TR':
                p.innerText =  `⌚︎ ${acciones[i].minuto}: El jugador ${acciones[i].jugNombre} ${acciones[i].jugApellidos} de ${acciones[i].eqNombre} recibe una tarjeta roja 🟥` 
                break
            default:
                console.log('accion no reconocida', acciones[i].accion)
        }
        p.classList.add('accion-p-element')
        resumenAcciones?.appendChild(p)
        if (i++ < acciones.length - 1) setTimeout(addAcciones, 2000)
        else if (salirResumenBtn) {
            salirResumenBtn.style.display = 'inline'
            const final = document.createElement('p')
            final.innerText = 'Fin del partido'
            final.classList.add('accion-p-element')
            final.classList.add('accion-p-final')
            resumenAcciones?.appendChild(final)
        }
    }

    addAcciones()
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

    const equipos = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/filter/equipos/${ligaId}`)
    console.log('index equipos', equipos)
    const componentEquipos = document.getElementById('equiposTableWC')
    componentEquipos?.setAttribute('equipos', JSON.stringify(equipos))
}

/**
 * Muestra los jugadores de un equipo
 * @param {string} equipoId - Id del equipo
 */
async function getJugadoresFromEquipoId(equipoId) {
    const equipo = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/findbyid/equipos/${equipoId}`)
    const jugadores = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/filter/jugadores/${equipoId}`)    
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

    const componentJugadores = document.getElementById('jugadoresTableWC')
    componentJugadores?.setAttribute('jugadores', JSON.stringify(jugadores))
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
    const btnEstPrev = document.getElementById('btn-est-prev')
    const btnEstNext = document.getElementById('btn-est-next')

    if(sortBy != sortEstadisticas) pagEstadisticas = 1
    sortEstadisticas = sortBy

    if (boxClasificacion) boxClasificacion.style.display = 'none'
    if (boxCalendario) boxCalendario.style.display = 'none'
    if (boxEquipos) boxEquipos.style.display = 'none'
    if (boxEstadisticas) boxEstadisticas.style.display = 'block'

    const tbody = document.getElementById('tbody-estadisticas')
    if (tbody) tbody.innerHTML = ''
    const estadisticas = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/read/estadisticas/table/${ligaId}/${sortBy}/${pagEstadisticas}`)
    estadisticas.column = sortBy
    const component = document.getElementById('estadisticasTableWC')
    component?.setAttribute('estadisticas', JSON.stringify(estadisticas))
    if (estadisticas.siguiente) {
        if (btnEstNext) btnEstNext.style.display = 'block'
    } else {
        if (btnEstNext) btnEstNext.style.display = 'none'
    }
    if (estadisticas.anterior) {
        if (btnEstPrev) btnEstPrev.style.display = 'block'
    } else {
        if (btnEstPrev) btnEstPrev.style.display = 'none'
    }
}

/**
 * Muestra la siguiente página de estadisticas
 */
function nextEstadisticas() {
    pagEstadisticas += 1
    getEstadisticas(sortEstadisticas)
}

/**
 * Muestra la página anterior de estadisticas
 */
function prevEstadisticas() {
    pagEstadisticas -= 1
    getEstadisticas(sortEstadisticas)
}

/**
 * Oculta el resumen del partido
 */
function ocultarResumen() {
    const resumenPartido = document.getElementById('resumen-partido')
    if (resumenPartido) resumenPartido.style.display = 'none'
}