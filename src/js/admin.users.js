// @ts-check

import { store } from './store/redux.js'
/** @import { Usuario } from './classes/Usuario.js' */
import { setInputValue, getInputValue, getAPIData } from './utils/utils.js'
import { getUser, logoutUser } from './login.js'

const API_PORT = location.port ? `:${location.port}` : ''

document.addEventListener('DOMContentLoaded', onDOMcontentLoaded)


// ------- EVENTS ------- //

/**
 * Carga los eventos de los botones y formularios de la p gina de admin de usuarios
 * y llama a loadState de la store para cargar el estado
 */

async function onDOMcontentLoaded() {
    const usuarios = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/read/usuarios`)
    store.loadState(usuarios, 'usuarios')
    store.saveState()

    const currentUser = getUser()
    if (!currentUser) {
        window.location.href = 'admin.html'
    }
    
    const crearUsuarioBtn = document.getElementById('crear-usuario-btn')
    const guardarBtn = document.getElementById('guardar-btn')
    const limpiarBtn = document.getElementById('limpiar-btn')
    const cancelarBtn = document.getElementById('cancelar-btn')
    const form = document.getElementById('form-usuario')
    const logoutBtn = document.getElementById('logout-btn')

    crearUsuarioBtn?.addEventListener('click', mostrarFormulario)
    cancelarBtn?.addEventListener('click', ocultarFormulario)
    guardarBtn?.addEventListener('click', guardarUsuario)
    limpiarBtn?.addEventListener('click', clearFormInputs)
    form?.addEventListener('submit', onFormSubmit)
    logoutBtn?.addEventListener('click', logoutUser)

    window.addEventListener('stateChanged', (event) => {
        console.log('stateChanged', /** @type {CustomEvent} */(event).detail)
    })

    cargarUsuarios()
    ocultarFormulario()
}

/**
 * Cancela el submit de un form
 * @param {Event} e 
 */
function onFormSubmit(e) {
    e.preventDefault()
}


// ------- METHODS ------- //

/**
 * Guarda o actualiza un usuario en la Store.
 * Obtiene los valores de los campos de entrada del formulario de usuario,
 * valida que todos los campos obligatorios estén llenos, y luego llama a
 * `updateUsuario` si se proporciona un ID de usuario existente, o a 
 * `createUsuario` si se está creando un nuevo usuario. Muestra un mensaje 
 * de alerta si algún campo necesario está vacío.
 */

function guardarUsuario() {
    const id = getInputValue('id-user')
    const nombre = getInputValue('nombre')
    const apellidos = getInputValue('apellidos')
    const nickname = getInputValue('nickname')
    const email = getInputValue('email')
    const rol = getInputValue('rol')
    const password = getInputValue('pwd')

    if (!nombre || !apellidos || !nickname || !email || !password || !rol) {
        alert('Todos los campos son obligatorios')
        return
    }
    if (id) {   
        updateUsuario(id, email, password, rol, nombre, apellidos, nickname)
    } else {
        createUsuario(email, password, rol, nombre, apellidos, nickname)
    }
}

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
    const usuario = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/create/usuarios`, 'POST', payload)
    store.usuario.create(usuario, () => {store.saveState()})

    if (usuario) alert('Usuario creado con exito')
    cargarUsuarios()
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
    await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/update/usuarios/${id}`, 'PUT', payload)
    store.usuario.update(usuario, () => {store.saveState()})

    drawUsuarioContentRow(usuario)
    ocultarFormulario()
}

/**
 * Borra un usuario de la Store y de la BBDD
 * @param {string} id id del usuario a borrar
 */
async function borrarUsuario(id) {
    const usuario = store.usuario.getById(id)

    if (window.confirm(`¿Desea borrar el usuario ${usuario.email}?`)) {
        await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/delete/usuarios/${id}`, 'DELETE')
        store.usuario.delete(usuario, () => {store.saveState()})
        cargarUsuarios()
        clearFormInputs()
    }
    
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
    mostrarFormulario()
}

/**
 * Dibuja una fila de la tabla de usuarios
 * @param {Usuario} usuario El usuario a dibujar
 */
function drawUsuarioRow(usuario) {
    const tbody = document.getElementById('tbody-usuarios')
    const tr = document.createElement('tr')

    tr.id = `row_u_${usuario._id}`
    tr.innerHTML = ''
    tbody?.appendChild(tr)

    drawUsuarioContentRow(usuario)
}

/**
 * Dibuja el contenido de una fila de la tabla de usuarios
 * @param {Usuario} usuario El usuario a dibujar
 */
function drawUsuarioContentRow(usuario){
    const tr = document.getElementById(`row_u_${usuario._id}`)
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
    cellId.innerText = usuario._id
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
    tr?.appendChild(cellEdit)
    editBtn.innerText = '✎'
    editBtn.classList.add('btn-table')
    editBtn.addEventListener('click', editarUsuario.bind(cellEdit, usuario._id))
    cellEdit?.appendChild(editBtn)
    delBtn.innerText = '🗑'
    delBtn.classList.add('btn-table')
    delBtn.addEventListener('click', borrarUsuario.bind(delBtn, usuario._id))
    cellEdit?.appendChild(delBtn)
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
    const tbody = document.getElementById('tbody-usuarios')
    if (tbody) tbody.innerHTML = ''
    usuarios.forEach(/** @param {Usuario} usuario*/usuario => drawUsuarioRow(usuario))
}

/**
 * Muestra el formulario de creacion de usuarios
 */
function mostrarFormulario() {
    const form = document.getElementById('form-usuario-container')
    const crearUsuarioBtn = document.getElementById('crear-usuario-btn')

    if (form) form.style.display = 'block'
    if (crearUsuarioBtn) crearUsuarioBtn.style.display = 'none'
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
    clearFormInputs()
}