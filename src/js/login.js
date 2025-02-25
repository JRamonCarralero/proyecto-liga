// @ts-check

import {store} from './store/redux.js'

/** @import { Usuario } from './classes/Usuario.js';} */

document.addEventListener('DOMContentLoaded', onDOMContentLoaded)

// ------- EVENTS ------- //

/**
 * Carga los eventos de los botones y formularios de la p gina de login
 * y llama a loadState de la store para cargar el estado
 */
async function onDOMContentLoaded() {
    window.addEventListener('login-form-submit', (event) => {
        console.log('login-form-submit', /** @type {CustomEvent} */(event).detail)
        onLoginComponentSubmit(/** @type {CustomEvent} */(event).detail)
      })
}


// ------- METHODS ------- //

/**
 * Maneja el evento de login del componente de login.
 * Si el evento tiene datos de usuario, los almacena en el sessionStorage
 * y redirige a la p gina de inicio.
 * Si no tiene datos de usuario, muestra un mensaje de alerta.
 * @param {Object} apiData - Evento de login del componente de login
 */
function onLoginComponentSubmit(apiData) {
    console.log(`DESDE FUERA DEL COMPONENTE:`, apiData);
    if ('_id' in apiData
            && 'nombre' in apiData
            && 'apellidos' in apiData
            && 'nickname' in apiData
            && 'email' in apiData
            && 'rol' in apiData
            && 'token' in apiData) {
        const userData = /** @type {Usuario} */(apiData)
        sessionStorage.setItem('user', JSON.stringify(userData))
        store.login(userData)
        window.location.href = 'admin.noticias.html'
    } else {
        alert('Invalid user data')
    }
  }

/**
 * Cierra la sesion del usuario actual y redirige a la pagina principal.
 */
export function logoutUser() {
    sessionStorage.removeItem('user')
    store.login({})
    window.location.href = 'admin.html'
}

/**
 * Devuelve el usuario actualmente logueado, o null si no hay nadie logueado.
 * @returns {Usuario | string | null}
 */
export function getUser() {
    const user = sessionStorage.getItem('user')
    if(user) {
        const userData = JSON.parse(user)
        return userData.token
    } else {
        return null
        // ESTO ES PARA BORRAR; ES POR SI ACASO PODER HACER PRUEBAS
        //return 'prueba'
    }
}