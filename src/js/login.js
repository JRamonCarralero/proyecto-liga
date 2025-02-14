// @ts-check

import {store} from './store/redux.js'
import {getInputValue, getAPIData} from './utils/utils.js'

/** @import { Usuario } from './classes/Usuario.js';} */

const API_PORT = location.port ? `:${location.port}` : ''
document.addEventListener('DOMContentLoaded', onDOMContentLoaded)

// ------- EVENTS ------- //

/**
 * Carga los eventos de los botones y formularios de la p gina de login
 * y llama a loadState de la store para cargar el estado
 */
async function onDOMContentLoaded() {
    const form = document.getElementById('form-login')
    const loginBtn = document.getElementById('login-btn')

    form?.addEventListener('submit', onFormSubmit)
    loginBtn?.addEventListener('click', loginUser)
}

/**
 * Cancela el submit del formulario
 * @param {Event} e 
 */
function onFormSubmit(e) {
    e.preventDefault()
}


// ------- METHODS ------- //

/**
 * Intenta loguear a un usuario.
 * Llena los campos de email y pwd del formulario de login con los valores
 * que se hayan introducido en el formulario, y llama al m todo loginUser de
 * la store con dichos valores. Si el usuario se loguea correctamente, se
 * guarda en el sessionStorage y se redirige a la pagina de usuarios.
 * Si no se loguea correctamente, se muestra un mensaje de alerta.
 */
async function loginUser() {
    const loginData = {
        email: getInputValue('email'),
        password: getInputValue('pwd')
    }
    const payload = JSON.stringify(loginData)
    const apiData = await getAPIData(`http://${location.hostname}${API_PORT}/api/login`, 'POST', payload)
    console.log('apiData', apiData)
    if (!apiData) {
        alert('El email o la contraseña son incorrectos')
    } else {
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