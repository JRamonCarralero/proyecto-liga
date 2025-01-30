// @ts-check

import { Noticia } from './classes/Noticia.js'
import { store } from './store/redux.js'
import { setInputValue, getInputValue } from './utils/utils.js'
import { getUser, logoutUser } from './login.js'

let pagina = 1
document.addEventListener('DOMContentLoaded', onDOMContentLoaded)

// ------- EVENTS ------- //

function onDOMContentLoaded() {
    const currentUser = getUser()
    if (!currentUser) {
        window.location.href = 'admin.html'
    }

    const crearNoticiaBtn = document.getElementById('crear-noticia-btn')
    const sbmtNoticiaForm = document.getElementById('sbmt-noticia-form')
    const clearFormBtn = document.getElementById('clear-noticia-form')
    const cancelNoticiaBtn = document.getElementById('cancel-noticia-form')
    const btnNext = document.getElementById('btn-next-noticias')
    const btnPrev = document.getElementById('btn-prev-noticias')
    const logoutBtn = document.getElementById('logout-btn')
    
    crearNoticiaBtn?.addEventListener('click', mostrarFormulario)
    sbmtNoticiaForm?.addEventListener('click', guardarNoticia)
    clearFormBtn?.addEventListener('click', clearNoticiaForm)
    cancelNoticiaBtn?.addEventListener('click', ocultarFormulario)
    btnNext?.addEventListener('click', nextNoticias)
    btnPrev?.addEventListener('click', prevNoticias)
    logoutBtn?.addEventListener('click', logoutUser)
    
    window.addEventListener('stateChanged', (event) => {
        console.log('stateChanged', /** @type {CustomEvent} */(event).detail)
    })

    store.loadState()
    cargarNoticias()
}


// ------- METHODS ------- //

function guardarNoticia() {
    const id = getInputValue('id')
    const titulo = getInputValue('titulo')
    const cabecera = getInputValue('cabecera')
    const contenido = getInputValue('contenido')
    const imagen = ''

    if (!titulo || !cabecera || !contenido) {
        alert('Todos los campos son obligatorios')
        return
    }

    if (id) {
        updateNoticia(titulo, cabecera, imagen, contenido, id)
    } else {
        createNoticia(titulo, cabecera, imagen, contenido)
    }
    ocultarFormulario()
}

/**
 * Crea una nueva noticia en la Store
 * @param {string} titulo titulo de la noticia
 * @param {string} cabecera cabecera de la noticia
 * @param {string} imagen ruta de la imagen de la noticia
 * @param {string} contenido contenido de la noticia
 */
function createNoticia(titulo, cabecera, imagen, contenido) {
    const noticia = new Noticia(titulo, cabecera, imagen, contenido)
    store.noticia.create(noticia,() => {store.saveState()})

    alert('Noticia creada con exito')
    cargarNoticias()
    clearNoticiaForm()
}

/**
 * Actualiza una noticia existente en la Store
 * @param {string} titulo titulo de la noticia
 * @param {string} cabecera cabecera de la noticia
 * @param {string} imagen ruta de la imagen de la noticia
 * @param {string} contenido contenido de la noticia
 * @param {string} id id de la noticia a actualizar
 */
function updateNoticia(titulo, cabecera, imagen, contenido, id) {
    const noticia = new Noticia(titulo, cabecera, imagen, contenido, id)
    store.noticia.update(noticia,() => {store.saveState()})

    drawNoticiaRowContent(noticia)
    clearNoticiaForm()
}

/**
 * Borra una noticia de la Store
 * @param {string} id id de la noticia a borrar
 */
function borrarNoticia(id) {
    const noticia = store.noticia.getById(id)
    if (window.confirm(`¿Deseas borrar la noticia ${noticia.titulo}?`)) {
        store.noticia.delete(noticia,() => {store.saveState()})
        clearNoticiaForm()
        cargarNoticias()
    }
}

/**
 * Muestra una noticia en la tabla
 * @param {Noticia} noticia noticia a mostrar
 */
function drawNoticiaRow(noticia) { 
    const tbody = document.getElementById('tbody-noticias')
    const row = document.createElement('tr')

    row.id = `row_n_${noticia.id}`
    tbody?.appendChild(row)

    drawNoticiaRowContent(noticia)
}

/**
 * Crea el contenido de una fila de la tabla de noticias
 * @param {Noticia} noticia - The news object containing the details to be displayed in the row.
 */

function drawNoticiaRowContent(noticia) {
    const row = document.getElementById(`row_n_${noticia.id}`)
    const cellId = document.createElement('td')
    const cellFecha = document.createElement('td')
    const cellTitulo = document.createElement('td')
    const cellEdit = document.createElement('td')
    const editBtn = document.createElement('button')
    const delBtn = document.createElement('button')

    if (row) row.innerHTML = ''
    cellId.innerText = noticia.id
    row?.appendChild(cellId)
    cellFecha.innerText = String(noticia.fecha)
    row?.appendChild(cellFecha)
    cellTitulo.innerText = noticia.titulo
    row?.appendChild(cellTitulo)
    row?.appendChild(cellEdit)
    editBtn.innerText = '✎'
    editBtn.addEventListener('click', editarNoticia.bind(editBtn, noticia.id))
    cellEdit.appendChild(editBtn)
    delBtn.innerText = '🗑'
    delBtn.addEventListener('click', borrarNoticia.bind(delBtn, noticia.id))
    cellEdit.appendChild(delBtn)
}

/**
 * Carga la noticia especificada por su id en los campos de edicion
 * @param {string} id - id de la noticia a editar
 */
function editarNoticia(id) {
    const noticia = store.noticia.getById(id)
    setInputValue('id', noticia.id)
    setInputValue('titulo', noticia.titulo)
    setInputValue('cabecera', noticia.cabecera)
    setInputValue('imagen', noticia.imagen)
    setInputValue('contenido', noticia.contenido)
}

/**
 * Limpia los campos de edicion de noticias
 */
function clearNoticiaForm() {
    setInputValue('id', '')
    setInputValue('titulo', '')
    setInputValue('cabecera', '')
    setInputValue('imagen', '')
    setInputValue('contenido', '')
}

/**
 * Carga las noticias de la store en la tabla
 */
function cargarNoticias() {
    pagina = 1
    const form = document.getElementById('noticias-form-container')
    if (form) form.style.display = 'none'
    paginarNoticias()
    //noticias.forEach(/** @param {Noticia} noticia */noticia => drawNoticiaRow(noticia))
}

/**
 * Muestra las noticias que corresponden al paginado en la pagina de noticias
 */
function paginarNoticias() {
    const btnNext = document.getElementById('btn-next-noticias')
    const btnPrev = document.getElementById('btn-prev-noticias')
    const respNoticias = store.noticia.getPage(pagina)
    respNoticias.noticias.forEach(/** @param {Noticia} noticia */noticia => drawNoticiaRow(noticia))
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

/**
 * Muestra las siguientes 20 noticias en la pagina de noticias
 */
function nextNoticias() {
    pagina += 1
    const tbody = document.getElementById('tbody-noticias')
    if (tbody) tbody.innerHTML = ''
    paginarNoticias()
}

/**
 * Muestra las 20 noticias previas en la pagina de noticias
 */
function prevNoticias() {
    pagina -= 1
    const tbody = document.getElementById('tbody-noticias')
    if (tbody) tbody.innerHTML = ''
    paginarNoticias()
}

/**
 * Muestra el formulario para crear noticias
 */
function mostrarFormulario() {
    const form = document.getElementById('noticias-form-container')
    const crearBtn = document.getElementById('crear-noticia-btn')
    clearNoticiaForm()
    if (form) form.style.display = 'block'
    if (crearBtn) crearBtn.style.display = 'none'
}

/**
 * Oculta el formulario de creacion de noticias y borra los valores de sus campos
 */
function ocultarFormulario() {
    const form = document.getElementById('noticias-form-container')
    const crearBtn = document.getElementById('crear-noticia-btn')
    if (form) form.style.display = 'none'
    if (crearBtn) crearBtn.style.display = 'inline'
    clearNoticiaForm()
}