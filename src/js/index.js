// @ts-check

//import { store } from './store/redux.js'
import { getInputValue, replyButtonClick, getAPIData } from './utils/utils.js' 
/** @import { Liga } from './classes/Liga.js' */
/** @import { Clasificacion } from './classes/Clasificacion.js' */
/** @import { Jornada } from './classes/Jornada.js' */
/** @import { Partido } from './classes/Partido.js' */
/** @import { Equipo } from './classes/Equipo.js' */
/** @import { Jugador, PrimeraLinea } from './classes/Jugador.js' */
/** @import { Noticia } from './classes/Noticia.js' */

let pagina = 1
document.addEventListener('DOMContentLoaded', onDOMContentLoaded)


// ------- EVENTS ------- //

/**
 * carga inicial
 */
function onDOMContentLoaded() {
    //const testServerBtn = document.getElementById('test-server-btn')

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
                //if (testServerBtn) testServerBtn.addEventListener('click', testServer)
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
                if (selectLiga) selectLiga.addEventListener('change', getClasificacion)
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
    //noticias.forEach(/** @param {Noticia} noticia */noticia => drawNoticia(noticia))
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
                <h3><a class="link-noticia" href="./noticias.html?id=${noticia.id}">${noticia.titulo}</a></h3>
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
    const noticia = await getAPIData(`http://${location.hostname}:1337/findbyid/noticias?id=${id}`)
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
    if (search) respNoticias = await getAPIData(`http://${location.hostname}:1337/filter/noticias?page=${pagina}&tipo=titulo&filter=${search}`)
    else respNoticias = await getAPIData(`http://${location.hostname}:1337/readshortpage/noticias?page=${pagina}`)
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
    const ligas = await getAPIData(`http://${location.hostname}:1337/read/ligas`)
    const selectLigas = document.getElementById('select-liga')
    const selectYear = document.getElementById('year-liga')
    /** @type {string[]} */const years = []
    if (selectLigas) selectLigas.innerHTML = ''
    ligas.forEach(/** @param {Liga} liga */liga => {
        if (selectLigas) selectLigas.innerHTML += `
            <option value="${liga.id}">${liga.nombre}-${liga.year}</option>
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

async function loadLigasByYear(){
    const year = getInputValue('year-liga')
    //const ligas = store.getLigasByYear(year)
    const ligas = await getAPIData(`http://${location.hostname}:1337/filter/ligas?tipo=year&filter=${year}`)
    const selectLigas = document.getElementById('select-liga')
    if (selectLigas) selectLigas.innerHTML = ''
    ligas.forEach(/** @param {Liga} liga */liga => {
        if (selectLigas) selectLigas.innerHTML += `
            <option value="${liga.id}">${liga.nombre}-${liga.year}</option>
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
    //const clasificaciones = store.getClasificacionesFromLigaId(ligaId)
    //const liga = store.liga.getById(ligaId)
    const clasificaciones = await getAPIData(`http://${location.hostname}:1337/filter/clasificaciones?tipo=ligaid&filter=${ligaId}`)
    const liga = await getAPIData(`http://${location.hostname}:1337/findbyid/ligas?id=${ligaId}`)
    let contador = 0

    const boxClasificacion = document.getElementById('box-clasificacion')
    const boxCalendario = document.getElementById('box-calendario')
    const boxEquipos = document.getElementById('box-equipos')

    if (boxClasificacion) boxClasificacion.style.display = 'block'
    if (boxCalendario) boxCalendario.style.display = 'none'
    if (boxEquipos) boxEquipos.style.display = 'none'

    if(tituloLiga) tituloLiga.innerHTML = `${liga.nombre}, Temporada ${liga.year}`
    if (tbody) tbody.innerHTML = ''
    clasificaciones.forEach(async (/** @type {Clasificacion} */clasificacion) => {
        //const equipo = store.equipo.getById(clasificacion.equipo)
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

/**
 * Muestra el calendario de la liga seleccionada
 */
async function getCalendario() {
    const ligaId = getInputValue('select-liga')
    const divCalendario = document.getElementById('box-calendario')
    //const jornadas = store.getJornadasFromLigaId(ligaId)
    const jornadas = await getAPIData(`http://${location.hostname}:1337/filter/jornadas?tipo=ligaid&filter=${ligaId}`)

    const boxClasificacion = document.getElementById('box-clasificacion')
    const boxEquipos = document.getElementById('box-equipos')

    if (boxClasificacion) boxClasificacion.style.display = 'none'
    if (divCalendario) divCalendario.style.display = 'block'
    if (boxEquipos) boxEquipos.style.display = 'none'

    if (divCalendario) divCalendario.innerHTML = ''
    jornadas.forEach(async (/** @type {Jornada} jornada */jornada) => {
        //const partidos = store.getPartidosFromJornadaId(jornada.id)
        const partidos = await getAPIData(`http://${location.hostname}:1337/filter/partidos?tipo=jornadaid&filter=${jornada.id}`)
        const boxJornada = document.createElement('div')
        const jornadaTitle = document.createElement('h3')

        divCalendario?.appendChild(boxJornada)
        boxJornada.classList.add('box-jornada')
        jornadaTitle.innerHTML = `Jornada nº: ${jornada.numero}`
        boxJornada.appendChild(jornadaTitle)

        partidos.forEach(async (/** @type {Partido} partido */partido) => {
            const eqLocal = await getAPIData(`http://${location.hostname}:1337/findbyid/equipos?id=${partido.local}`)
            const eqVisitante = await getAPIData(`http://${location.hostname}:1337/findbyid/equipos?id=${partido.visitante}`)
            const partidoBox = document.createElement('div')
            const spanLocal = document.createElement('span')
            const spanVisitante = document.createElement('span')
            const spanPuntosLocal = document.createElement('span')
            const spanPuntosVisitante = document.createElement('span')
            const spanFecha = document.createElement('span')

            partidoBox.classList.add('partido')
            boxJornada.appendChild(partidoBox)

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
        })
    })   
}

/**
 * Obtiene y muestra los equipos de una liga seleccionada
 */
async function getEquipos() {
    const ligaId = getInputValue('select-liga')
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
    const liga = await getAPIData(`http://${location.hostname}:1337/findbyid/ligas?id=${ligaId}`)
    liga.equipos.forEach(async (/** @type {string}*/equipoId) => {
        const equipo = await getAPIData(`http://${location.hostname}:1337/findbyid/equipos?id=${equipoId}`)
        
        const tr = document.createElement('tr')
        const cellNombre = document.createElement('td')
        const cellPoblacion = document.createElement('td')
        const cellDireccion = document.createElement('td')
        const cellEstadio = document.createElement('td')

        cellNombre.innerText = equipo.nombre
        cellNombre.classList.add('cp')
        cellNombre.addEventListener('click', getJugadoresFromEquipoId.bind(cellNombre, equipo.id))
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
    //const equipo = store.equipo.getById(equipoId)
    //const jugadores = store.getJugadoresFromEquipoId(equipoId)
    const equipo = await getAPIData(`http://${location.hostname}:1337/findbyid/equipos?id=${equipoId}`)
    const jugadores = await getAPIData(`http://${location.hostname}:1337/filter/jugadores?tipo=equipoid&filter=${equipoId}`)    
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
 * Tests the server by sending a request to create a user.
 * Prevents the default form submission behavior, makes an asynchronous
 * request to the specified API endpoint, and logs the response data.
 */
/* async function testServer() {
    const usuario = {
        id: '125454941354',
        nombre: 'aaa',
        apellidos: 'aaa',
        nickname: 'aaa',
        email: 'p@e',
        rol: 'user',
        password: '123'
    }
    const usuarioSearchParams = new URLSearchParams(usuario).toString()

    const jugador = {
        id: "2154621654",
        nombre: "Pedro",
        apellidos: "Martinez",
        nacionalidad: "Española",
        altura: "188",
        peso: "97",
        equipoId: "21654214"
    }
    const jugadorSearchParams = new URLSearchParams(jugador).toString()

    const apiData = await getAPIData(`http://${location.hostname}:1337/create/usuarios?${usuarioSearchParams}`)
    console.log('apiData', apiData)

    const jugApiData = await getAPIData(`http://${location.hostname}:1337/create/jugadores?${jugadorSearchParams}`)
    console.log('jugApiData', jugApiData)
} */