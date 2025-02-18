// @ts-check

/** @import { Jugador, PrimeraLinea } from "../classes/Jugador.js"; */
/** @import { Equipo } from "../classes/Equipo.js"; */
/** @import { Partido } from "../classes/Partido.js"; */
/** @import { Jornada } from "../classes/Jornada.js"; */
/** @import { Liga } from "../classes/Liga.js";  */
/** @import { Clasificacion } from "../classes/Clasificacion.js"; */
/** @import { Noticia } from "../classes/Noticia.js"; */
/** @import { Usuario } from "../classes/Usuario.js"; */
/** @import { AccionesPartido } from "../classes/AccionesPartido.js"; */
/** @import { EstadisticaJugador } from "../classes/EstadisticaJugador.js"; */


import { HttpError } from '../classes/HttpError.js'
import { simpleFetch } from '../lib/simpleFetch.js'
import { getUser } from '../login.js'
import { store } from '../store/redux.js'

const API_PORT = location.port ? `${location.port}` : ''
/**
 * Devuelve el valor de un elemento input cuyo id es idElement
 * Si no existe el elemento, devuelve cadena vacia
 * @param {String} idElement 
 * @returns {String}
 */
export function getInputValue(idElement) {
    const element = document.getElementById(idElement)
    if (element) {
        return /** @type {HTMLInputElement} */(element).value
    } else {
        return ''
    }
}

/**
 * Setea el valor de un elemento input cuyo id es idElement
 * Si no existe el elemento, no hace nada
 * @param {String} idElement 
 * @param {String} value       valor a setear
 */
export function setInputValue(idElement, value) {
    const element = document.getElementById(idElement)
    if (element) {
        /** @type {HTMLInputElement} */(element).value = value
    }
}

/**
 * Devuelve el valor seleccionado en un elemento select cuyo id es idElement
 * Si no existe el elemento, devuelve cadena vacia
 * @param {String} idElement 
 * @returns {String}
 */
export function getSelectValue(idElement) {
    const element = document.getElementById(idElement)
    if (element) {
        return /** @type {HTMLSelectElement} */(element).value
    } else {
        return ''
    }
}

/**
 * Setea el valor seleccionado en un elemento select cuyo id es idElement
 * Si no existe el elemento, no hace nada
 * @param {String} idElement 
 * @param {String} value       valor a setear
 */
export function setSelectValue(idElement, value) {
    const element = document.getElementById(idElement)
    if (element) {
        /** @type {HTMLSelectElement} */(element).value = value
    }
}

/**
 * Devuelve el valor del checked de un elemento input de tipo checkbox
 * Si no existe el elemento, devuelve false
 * @param {String} idElement    
 * @returns {Boolean}
 */
export function getInputChecked(idElement) {
    const element = document.getElementById(idElement)
    if (element) {
        return /** @type {HTMLInputElement} */(element).checked
    } else {
        return false
    }
}

/**
 * Setea el valor del checked de un elemento input de tipo checkbox
 * @param {String} idElement    id del elemento
 * @param {Boolean} value       valor a setear
 */
export function setInputChecked(idElement, value) {
    const element = document.getElementById(idElement)
    if (element) {
        /** @type {HTMLInputElement} */(element).checked = value
    }
}

/**
 * Devuelve el valor de un elemento input de tipo file cuyo id es idElement
 * Si no existe el elemento, devuelve null
 * @param {String} idElement 
 * @returns {FileList|null}
 */
export function getInputFile(idElement) {
    const element = document.getElementById(idElement)
    if (element) {
        return /** @type {HTMLInputElement} */(element).files
    } else {
        return null
    }
}

/**
 * Setea el valor de un elemento input de tipo file cuyo id es idElement
 * @param {String} idElement    id del elemento
 * @param {FileList} value       valor a setear
 */
export function setInputFile(idElement, value) {
    const element = document.getElementById(idElement)
    if (element) {
        /** @type {HTMLInputElement} */(element).files = value
    }
}

/**
 * Devuelve el valor de un elemento input 
 * Si no existe el elemento, devuelve cadena vacia
 * @param {HTMLElement | null | undefined} element 
 * @returns {String}
 */
export function getElementInputValue(element) {
    if (element) {
        return /** @type {HTMLInputElement} */(element).value
    } else {
        return ''
    }
}

/**
 * Setea el valor de un elemento input
 * Si no existe el elemento, no hace nada
 * @param {HTMLElement | null | undefined} element  
 * @param {String} value       valor a setear
 */
export function setElementInputValue(element, value) {
    if (element) {
        /** @type {HTMLInputElement} */(element).value = value
    }
}

/**
 * Devuelve el valor seleccionado en un elemento select
 * Si no existe el elemento, devuelve cadena vacia
 * @param {HTMLElement | null | undefined} element 
 * @returns {String}
 */
export function getElementSelectValue(element) {
    if (element) {
        return /** @type {HTMLSelectElement} */(element).value
    } else {
        return ''
    }
}

/**
 * Setea el valor seleccionado en un elemento select cuyo id es idElement
 * Si no existe el elemento, no hace nada
 * @param {HTMLElement | null | undefined} element 
 * @param {String} value       valor a setear
 */
export function setElementSelectValue(element, value) {
    if (element) {
        /** @type {HTMLSelectElement} */(element).value = value
    }
}

/**
 * Devuelve el valor del checked de un elemento input de tipo checkbox
 * Si no existe el elemento, devuelve false
 * @param {HTMLElement | null | undefined} element    
 * @returns {Boolean}
 */
export function getElementInputChecked(element) {
    if (element) {
        return /** @type {HTMLInputElement} */(element).checked
    } else {
        return false
    }
}

/**
 * Setea el valor del checked de un elemento input de tipo checkbox
 * @param {HTMLElement | null | undefined} element 
 * @param {Boolean} value       valor a setear
 */
export function setElementInputChecked(element, value) {
    if (element) {
        /** @type {HTMLInputElement} */(element).checked = value
    }
}

/**
 * Simula un click en el boton con id = idButton
 * @param {string} idButton
 */
export function replyButtonClick(idButton) {
    const button = document.getElementById(idButton)
    const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
    button?.dispatchEvent(clickEvent)
}

/**
 * Get data from API
 * @param {string} apiURL
 * @param {string} method
 * @param {Object} [data]
 * @returns {Promise<any>} 
 */
export async function getAPIData(apiURL, method = 'GET', data) {
    //console.log('url', apiURL)
    let apiData
  
    //console.log('getAPIData', method, data)
    try {
      let headers = new Headers()
  
      headers.append('Content-Type', 'application/json')
      headers.append('Access-Control-Allow-Origin', '*')
      if (data) {
        headers.append('Content-Length', String(JSON.stringify(data).length))
      }
      const userData = getUser()
      if (userData) {
        headers.append('Authorization', `Bearer ${userData}`)
      }
      apiData = await simpleFetch(apiURL, {
        // Si la petición tarda demasiado, la abortamos
        signal: AbortSignal.timeout(3000),
        method: method,
        // @ts-expect-error TODO
        body: data || undefined,
        headers: headers
      });
    } catch (/** @type {any | HttpError} */err) {
      if (err.name === 'AbortError') {
        console.error('Fetch abortado');
      }
      if (err instanceof HttpError) {
        if (err.response.status === 404) {
          console.error('Not found');
        }
        if (err.response.status === 500) {
          console.error('Internal server error');
        }
      }
    }
  
    return apiData
  }

  export async function cargarRedux() {
    const ligaId = getInputValue('select-liga')
    //limpiamos la store
    store.loadState([], 'jornadas')
    store.loadState([], 'partidos')
    store.loadState([], 'equipos')
    store.loadState([], 'clasificaciones')
    store.loadState([], 'estadisticas')
    store.loadState([], 'jugadores')

    const data = await getAPIData(`${location.protocol}//${location.hostname}:${API_PORT}/read/liga/data/${ligaId}`)
    store.loadState(data.partidos, 'partidos')
    store.loadState(data.jornadas, 'jornadas')
    store.loadState(data.clasificaciones, 'clasificaciones')
    store.loadState(data.equipos, 'equipos')
    store.loadState(data.estadisticas, 'estadisticas')
    store.loadState(data.jugadores, 'jugadores')
}