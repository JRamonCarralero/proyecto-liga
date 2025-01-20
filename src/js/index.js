import NOTICIAS from '../apis/noticias.json' with { type: 'json' }

document.addEventListener('DOMContentLoaded', onDOMContentLoaded)


// ------- EVENTS ------- //

/**
 * carga inicial
 */
function onDOMContentLoaded() {
  getHeaderNews()
  createLeagueSeason()
  /*
    1. añadir addEventListener a los elementos que necesitan
    2. llamar al metodo que crea el contenido de noticias
  */
}

/**
 * crear funciones para los distintos eventos
 * @param {Event} e 
 */
function onClickWhatever(e) {
  console.log('click')
}



// ------- METHODS ------- //

// pagina principal //

/**
 * obtener las cabeceras de las noticias
 */
function getHeaderNews() {
  const section = document.getElementById('section-noticias')
  section.innerHTML = ''
  NOTICIAS.forEach(element => {
    console.log(element)
    section.innerHTML += `
      <div class="box-noticia">
        <h3><a>${element.titulo}</a></h3>
        <p>${element.cabecera}</p>
      </div>
    `
  })
}

// pagina de noticias //

/**
 * obtener noticia por su id
 */
function getNewById() {

}

/**
 * añadir la noticia a la página
 */
function printNew() {

}

/**
 * buscar noticias que el título incluya un texto introducido por el usuario
 */
function searchNewByTitleIncludes() {

}

/**
 * mostrar las noticias que coinciden con la búsqueda
 */
function printSuggestedNews() {

}


// pagina de competicion //

function getCalendario() {}

function printCalendario() {}

function getClasificacion() {}

function printClasificacion() {}

function getJornadas() {}

function printJornadas() {}

function getJornadaById() {}

function printJornada() {}

function getPartidos() {}

function printPartidos() {}

function getEquipos() {}

function printEquipos() {}

function getJugadores() {}

function printJugadores() {}

function getJugadorById() {}

function printJugador() {}


// pagina de administración //

function createUser() {}

function getUsers() {}

function getUserById() {}

function printUser() {}

function updateUser() {}

function deleteUser() {}

/* 
  Las funciones de de leer y mostrar de los elementos que trabajamos a continuación están hechas en competicion
*/

function createNew() {}

function updateNew() {}

function deleteNew() {}

function crearJugador() {}

function editarJugador() {}

function borrarJugador() {}

function crearEquipo() {}

function editarEquipo() {}

function borrarEquipo() {}

function crearPartido() {}

function editarPartido() {}

function borrarPartido() {}

function crearJornada() {}

function editarJornada() {}

function borrarJornada() {}

function crearCalendario() {}

function editarCalendario() {}

function borrarCalendario() {}

function crearClasificacion() {}

function editarClasificacion() {}

function borrarClasificacion() {}

function crearLiga() {}

function leerLiga() {}

function mostrarLiga() {}

function editarLiga() {}

function borrarLiga() {}


function createLeagueSeason() {
  const equipos = [1,2,3,4,5,6,7,8,9,10,11,12]
  const calendario = new Array(equipos.length-1).fill(null).map(() => new Array(equipos.length-1))
  for (let i = 0; i < equipos.length; i++) {
    calendario[0][i] = i + 1;
  }
  for (let i = 1; i < equipos.length - 1; i++) {
    calendario[i] = [...calendario[i - 1]];
    const removed = calendario[i].splice(1, 1)
    calendario[i].push(removed[0]);
  }

  const jornadas = []
  const jornadasVuelta = []
  let local = true
  for (let i = 0; i < equipos.length-1; i++) {
    const jornada = []
    const vuelta = []
    for (let j = 0; j < equipos.length / 2; j++) {
      if (local) {
        jornada.push([`equipo ${calendario[i][j]}`, `equipo ${calendario[i][equipos.length - j - 1]}`])
        vuelta.push([`equipo ${calendario[i][equipos.length - j - 1]}`, `equipo ${calendario[i][j]}`])
      } else {
        jornada.push([`equipo ${calendario[i][equipos.length - j - 1]}`, `equipo ${calendario[i][j]}`])
        vuelta.push([`equipo ${calendario[i][j]}`, `equipo ${calendario[i][equipos.length - j - 1]}`])
      }
    }
    jornadas.push(jornada)
    jornadasVuelta.push(vuelta)
    local = !local
  }
  const liga = jornadas.concat(jornadasVuelta)

  console.log(liga)
}

  