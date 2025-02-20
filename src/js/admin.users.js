// @ts-check

import { store } from './store/redux.js'
import { getAPIData } from './utils/utils.js'
import { getUser, logoutUser } from './login.js'

const API_PORT = location.port ? `:${location.port}` : ''

document.addEventListener('DOMContentLoaded', onDOMcontentLoaded)


// ------- EVENTS ------- //

/**
 * Carga los eventos de los botones y formularios de la p gina de admin de usuarios
 * y llama a loadState de la store para cargar el estado
 */
async function onDOMcontentLoaded() {
    const usuarios = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/read/usuarios`)
    store.updateAllUsuarios(usuarios)

    const currentUser = getUser()
    if (!currentUser) {
        window.location.href = 'admin.html'
    }
    
    const crearUsuarioBtn = document.getElementById('crear-usuario-btn')
    const logoutBtn = document.getElementById('logout-btn')

    crearUsuarioBtn?.addEventListener('click', mostrarFormulario)
    logoutBtn?.addEventListener('click', logoutUser)

    window.addEventListener('stateChanged', (event) => {
        console.log('stateChanged', /** @type {CustomEvent} */(event).detail)
    })
    window.addEventListener('edit-user-event', (event) => {
        console.log('edit-user-event', /** @type {CustomEvent} */(event).detail)
        editarUsuario(/** @type {CustomEvent} */(event).detail)
      })
    window.addEventListener('delete-user-event', (event) => {
        console.log('delete-user-event', /** @type {CustomEvent} */(event).detail)
        borrarUsuario(/** @type {CustomEvent} */(event).detail)
      })
    window.addEventListener('usuario-form-submit', (event) => {
        console.log('usuario-form-submit', /** @type {CustomEvent} */(event).detail)
        const usuario = (/** @type {CustomEvent} */(event).detail)
        if (!usuario) ocultarFormulario()
        else {
            if (usuario._id === '') createUsuario(usuario.email, usuario.password, usuario.rol, usuario.nombre, usuario.apellidos, usuario.nickname)
            else updateUsuario(usuario._id, usuario.email, usuario.password, usuario.rol, usuario.nombre, usuario.apellidos, usuario.nickname)
        }
      })

    ocultarFormulario()
}


// ------- METHODS ------- //


/**
 * Crea un nuevo usuario en la Store y en la BBDD
 * @param {string} email email del usuario
 * @param {string} password password del usuario
 * @param {string} rol rol del usuario
 * @param {string} nombre nombre del usuario
 * @param {string} apellidos apellidos del usuario
 * @param {string} nickname nickname del usuario
 */
async function createUsuario(email, password, rol, nombre, apellidos, nickname) {
    const campos = {nombre, apellidos, nickname, email, rol, password}
    const payload = JSON.stringify(campos)
    const usuario = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/create/usuarios`, 'POST', payload)
    store.usuario.create(usuario, () => {store.saveState()})

    if (usuario) alert('Usuario creado con exito')
    ocultarFormulario()
}

/**
 * Actualiza un usuario en la Store y en la BBDD
 * @param {string} id id del usuario
 * @param {string} email email del usuario
 * @param {string} password password del usuario
 * @param {string} rol rol del usuario
 * @param {string} nombre nombre del usuario
 * @param {string} apellidos apellidos del usuario
 * @param {string} nickname nickname del usuario
 */
async function updateUsuario(id, email, password, rol, nombre, apellidos, nickname) { 
    const usuario = /** @type {Usuario} */{...store.usuario.getById(id)}
    const camposModificados = {}
    if (usuario.email != email) {
        camposModificados.email = email
        usuario.email = email
    }
    if (usuario.password != password) {
        camposModificados.password = password
        usuario.password = password
    }
    if (usuario.rol != rol) {
        camposModificados.rol = rol
        usuario.rol = rol
    }
    if (usuario.nombre != nombre) {
        camposModificados.nombre = nombre
        usuario.nombre = nombre
    }
    if (usuario.apellidos != apellidos) {
        camposModificados.apellidos = apellidos
        usuario.apellidos = apellidos
    }
    if (usuario.nickname != nickname) {
        camposModificados.nickname = nickname
        usuario.nickname = nickname
    }

    const payload = JSON.stringify(camposModificados)
    await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/update/usuarios/${id}`, 'PUT', payload)
    store.usuario.update(usuario)

    ocultarFormulario()
}

/**
 * Borra un usuario de la Store y de la BBDD
 * @param {string} id id del usuario a borrar
 */
async function borrarUsuario(id) {
    const usuario = store.usuario.getById(id)

    if (window.confirm(`¿Desea borrar el usuario ${usuario.email}?`)) {
        await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/delete/usuarios/${id}`, 'DELETE')
        store.usuario.delete(usuario, () => {store.saveState()})
    }
    
}

/**
 * Llena los campos de edicion de usuarios con los datos del usuario especificado por su id
 * @param {string} id id del usuario a editar
 */
function editarUsuario(id) {
    mostrarFormulario()
    const component = document.getElementById('usuarioFormWC')
    component?.setAttribute('iduser', id)
}

/**
 * Muestra el formulario de creacion de usuarios
 */
function mostrarFormulario() {
    const form = document.getElementById('form-usuario-container')
    const crearUsuarioBtn = document.getElementById('crear-usuario-btn')

    if (form) form.style.display = 'block'
    if (crearUsuarioBtn) crearUsuarioBtn.style.display = 'none'

    const component = document.getElementById('usuarioFormWC')
    component?.setAttribute('iduser', "")
}

/**
 * Oculta el formulario de creación de usuarios y restablece los campos a sus valores predeterminados.
 * También muestra el botón de creación de usuario.
 */
function ocultarFormulario() {
    const form = document.getElementById('form-usuario-container')
    const crearUsuarioBtn = document.getElementById('crear-usuario-btn')    

    if (form)form.style.display = 'none'        
    if (crearUsuarioBtn) crearUsuarioBtn.style.display = 'inline'
}