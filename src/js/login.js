// @ts-check

import {store} from './store/redux.js'
import {getInputValue, getAPIData} from './utils/utils.js'

/** @import { Usuario } from './classes/Usuario.js';} */

document.addEventListener('DOMContentLoaded', onDOMContentLoaded)

// ------- EVENTS ------- //

/**
 * Carga los eventos de los botones y formularios de la p gina de login
 * y llama a loadState de la store para cargar el estado
 */
async function onDOMContentLoaded() {
    const apiData = await getAPIData(`http://${location.hostname}:1337/store.data.json`)
    store.loadState(apiData)

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
 * @returns {void}
 * Llena los campos de email y pwd del formulario de login con los valores
 * que se hayan introducido en el formulario, y llama al m todo loginUser de
 * la store con dichos valores. Si el usuario se loguea correctamente, se
 * guarda en el sessionStorage y se redirige a la pagina de usuarios.
 * Si no se loguea correctamente, se muestra un mensaje de alerta.
 */
function loginUser() {
    const email = getInputValue('email')
    const pwd = getInputValue('pwd')

    const user = store.loginUser(email, pwd)
    console.log(user)
    if (user) {
        user.password = "******"
        sessionStorage.setItem('user', JSON.stringify(user))
        store.login(user)
        window.location.href = 'admin.noticias.html'
    } else {
        alert('El email o la contraseña son incorrectos')
    }
}

/**
 * Cierra la sesion del usuario actual y redirige a la pagina principal.
 */
export function logoutUser() {
    sessionStorage.removeItem('user')
    //Response.redirect('index.html')
    window.location.href = 'admin.html'
}

/**
 * Devuelve el usuario actualmente logueado, o null si no hay nadie logueado.
 * @returns {Usuario | string}
 */
export function getUser() {
    const user = sessionStorage.getItem('user')
    if(user)  return JSON.parse(user)
    //return null
    // ESTO ES PARA BORRAR; ES POR SI ACASO PODER HACER PRUEBAS
    return 'prueba'
}