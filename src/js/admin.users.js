// @ts-check

import { store } from './store/redux.js'
import { Usuario } from './classes/Usuario.js'
import { setInputValue, getInputValue } from './utils/utils.js'

document.addEventListener('DOMContentLoaded', onDOMcontentLoaded)


// ------- EVENTS ------- //

function onDOMcontentLoaded() {
    const crearUsuarioBtn = document.getElementById('crear-user-btn')
    const limpiarBtn = document.getElementById('limpiar-btn')
    const form = document.getElementById('form-usuario')

    crearUsuarioBtn?.addEventListener('click', guardarUsuario)
    limpiarBtn?.addEventListener('click', clearFormInputs)
    form?.addEventListener('submit', onFormSubmit)

    window.addEventListener('stateChanged', (event) => {
        console.log('stateChanged', /** @type {CustomEvent} */(event).detail)
    })

    store.loadState()
    cargarUsuarios()
}

/**
 * Cancela el submit de un form
 * @param {Event} e 
 */
function onFormSubmit(e) {
    e.preventDefault()
}


// ------- METHODS ------- //

function guardarUsuario() {
    const id = getInputValue('id-user')
    const nombre = getInputValue('nombre')
    const apellidos = getInputValue('apellidos')
    const nickname = getInputValue('nickname')
    const email = getInputValue('email')
    const rol = getInputValue('rol')
    const password = getInputValue('pwd')

    if (id) {   
        updateUsuario(id, email, password, rol, nombre, apellidos, nickname)
    } else {
        createUsuario(email, password, rol, nombre, apellidos, nickname)
    }
}

/**
 * Crea un nuevo usuario en la Store
 * @param {string} email email del usuario
 * @param {string} password password del usuario
 * @param {string} rol rol del usuario
 * @param {string} nombre nombre del usuario
 * @param {string} apellidos apellidos del usuario
 * @param {string} nickname nickname del usuario
 */
function createUsuario(email, password, rol, nombre, apellidos, nickname) {
    const usuario = new Usuario(nombre, apellidos, nickname, email, rol, password)
    store.usuario.create(usuario, () => {store.saveState()})

    drawUsuarioRow(usuario)
    clearFormInputs()
}

/**
 * Actualiza un usuario en la Store
 * @param {string} id id del usuario
 * @param {string} email email del usuario
 * @param {string} password password del usuario
 * @param {string} rol rol del usuario
 * @param {string} nombre nombre del usuario
 * @param {string} apellidos apellidos del usuario
 * @param {string} nickname nickname del usuario
 */
function updateUsuario(id, email, password, rol, nombre, apellidos, nickname) { 
    const usuario = store.usuario.getById(id)
    usuario.email = email
    usuario.password = password
    usuario.rol = rol
    usuario.nombre = nombre
    usuario.apellidos = apellidos
    usuario.nickname = nickname

    store.usuario.update(usuario, () => {store.saveState()})

    drawUsuarioContentRow(usuario)
    clearFormInputs()
}

/**
 * Borra un usuario de la Store
 * @param {string} id id del usuario a borrar
 */
function borrarUsuario(id) {
    const usuario = store.usuario.getById(id)

    document.getElementById(`row_u_${id}`)?.remove()

    store.usuario.delete(usuario, () => {store.saveState()})
    clearFormInputs()
}


/**
 * Llena los campos de edicion de usuarios con los datos del usuario especificado por su id
 * @param {string} id id del usuario a editar
 */
function editarUsuario(id) {
    const usuario = store.usuario.getById(id)
    setInputValue('id-user', id)
    setInputValue('email', usuario.email)
    setInputValue('pwd', usuario.password)
    setInputValue('rol', usuario.rol)
    setInputValue('nombre', usuario.nombre)
    setInputValue('apellidos', usuario.apellidos)
    setInputValue('nickname', usuario.nickname)
}

/**
 * Dibuja una fila de la tabla de usuarios
 * @param {Usuario} usuario El usuario a dibujar
 */
function drawUsuarioRow(usuario) {
    const tbody = document.getElementById('tbody-usuarios')
    const tr = document.createElement('tr')

    tr.id = `row_u_${usuario.id}`
    tr.innerHTML = ''
    tbody?.appendChild(tr)

    drawUsuarioContentRow(usuario)
}

/**
 * Dibuja el contenido de una fila de la tabla de usuarios
 * @param {Usuario} usuario El usuario a dibujar
 */
function drawUsuarioContentRow(usuario){
    const tr = document.getElementById(`row_u_${usuario.id}`)
    const cellId = document.createElement('td')
    const cellNombre = document.createElement('td')
    const cellApellidos = document.createElement('td')
    const cellNickname = document.createElement('td')
    const cellEmail = document.createElement('td') 
    const cellRol = document.createElement('td')
    const cellEdit = document.createElement('td')
    const editBtn = document.createElement('button')
    const delBtn = document.createElement('button')

    if (tr)tr.innerHTML = ''
    cellId.innerText = usuario.id
    tr?.appendChild(cellId)
    cellNombre.innerText = usuario.nombre
    tr?.appendChild(cellNombre)
    cellApellidos.innerText = usuario.apellidos
    tr?.appendChild(cellApellidos)
    cellNickname.innerText = usuario.nickname
    tr?.appendChild(cellNickname)
    cellEmail.innerText = usuario.email
    tr?.appendChild(cellEmail)
    cellRol.innerText = usuario.rol
    tr?.appendChild(cellRol)
    cellEdit.innerText = '✎'
    cellEdit.addEventListener('click', editarUsuario.bind(cellEdit, usuario.id))
    tr?.appendChild(cellEdit)
    delBtn.innerText = '🗑'
    delBtn.addEventListener('click', borrarUsuario.bind(delBtn, usuario.id))
    tr?.appendChild(delBtn)
}

/**
 * Limpia los campos de edicion de usuarios
 */
function clearFormInputs() {
    setInputValue('id', '')
    setInputValue('email', '')
    setInputValue('pwd', '')
    setInputValue('rol', '')
    setInputValue('nombre', '')
    setInputValue('apellidos', '')
    setInputValue('nickname', '')
}

/**
 * Carga todos los usuarios de la Store en la tabla de usuarios
 * Se utiliza en el evento DOMContentLoaded
 */
function cargarUsuarios() {
    const usuarios = store.usuario.getAll()
    usuarios.forEach(/** @param {Usuario} usuario*/usuario => drawUsuarioRow(usuario))
}