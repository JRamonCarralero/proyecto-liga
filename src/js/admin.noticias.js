// @ts-check

/** @import { Noticia } from './classes/Noticia.js' */
import { getAPIData } from './utils/utils.js'
import { getUser, logoutUser } from './login.js'

let pagina = 1
const API_PORT = location.port ? `:${location.port}` : ''
document.addEventListener('DOMContentLoaded', onDOMContentLoaded)

// ------- EVENTS ------- //

/**
 * Carga los eventos de los botones y formularios de la p gina de administraci n de noticias
 * y llama a cargarNoticias para cargar las noticias
 */
async function onDOMContentLoaded() {
    const currentUser = getUser()
    if (!currentUser) {
        window.location.href = 'admin.html'
    }

    const crearNoticiaBtn = document.getElementById('crear-noticia-btn')
    const btnNext = document.getElementById('btn-next-noticias')
    const btnPrev = document.getElementById('btn-prev-noticias')
    const logoutBtn = document.getElementById('logout-btn')
    
    crearNoticiaBtn?.addEventListener('click', mostrarFormulario)
    btnNext?.addEventListener('click', nextNoticias)
    btnPrev?.addEventListener('click', prevNoticias)
    logoutBtn?.addEventListener('click', logoutUser)
    
    window.addEventListener('stateChanged', (event) => {
        console.log('stateChanged', /** @type {CustomEvent} */(event).detail)
    })
    window.addEventListener('editar-noticia-click', (event) => {
        console.log('editar-noticia-click', /** @type {CustomEvent} */(event).detail)
        editarNoticia(/** @type {CustomEvent} */(event).detail)
      })
    window.addEventListener('borrar-noticia-click', (event) => {
        console.log('borrar-noticia-click', /** @type {CustomEvent} */(event).detail)
        borrarNoticia(/** @type {CustomEvent} */(event).detail)
      })
    window.addEventListener('noticia-form-submit', (event) => {
        console.log('noticia-form-submit', /** @type {CustomEvent} */(event).detail)
        const noticia = (/** @type {CustomEvent} */(event).detail)
        console.log('noticia', noticia)
        if (!noticia) ocultarFormulario()
        else {
            if (noticia.id) updateNoticia(noticia.titulo, noticia.cabecera, noticia.imagen, noticia.contenido, noticia.id)
            else createNoticia(noticia.titulo, noticia.cabecera, noticia.imagen, noticia.contenido)
        }
      })

    cargarNoticias()
}


// ------- METHODS ------- //

/**
 * Crea una nueva noticia en la BBDD
 * @param {string} titulo titulo de la noticia
 * @param {string} cabecera cabecera de la noticia
 * @param {string} imagen ruta de la imagen de la noticia
 * @param {string} contenido contenido de la noticia
 */
async function createNoticia(titulo, cabecera, imagen, contenido) {
    const campos = {
        titulo: titulo,
        cabecera: cabecera,
        imagen: imagen,
        contenido: contenido
    }
    const payload = JSON.stringify(campos)
    const respNoticia = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/create/noticias`, 'POST', payload)

    if (respNoticia) alert('Noticia creada con exito')
    cargarNoticias()
}

/**
 * Actualiza una noticia existente en la BBDD
 * @param {string} titulo titulo de la noticia
 * @param {string} cabecera cabecera de la noticia
 * @param {string} imagen ruta de la imagen de la noticia
 * @param {string} contenido contenido de la noticia
 * @param {string} id id de la noticia a actualizar
 */
async function updateNoticia(titulo, cabecera, imagen, contenido, id) {
    const noticia = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/findbyid/noticias/${id}`)
    const camposModificados = {}
    const noticiaFinal = {...noticia}

    if (titulo !== noticia.titulo) {
        camposModificados.titulo = titulo
        noticiaFinal.titulo = titulo
    }
    if (cabecera !== noticia.cabecera) {
        camposModificados.cabecera = cabecera
        noticiaFinal.cabecera = cabecera
    }
    if (imagen !== noticia.imagen) {
        camposModificados.imagen = imagen
        noticiaFinal.imagen = imagen
    }
    if (contenido !== noticia.contenido) {
        camposModificados.contenido = contenido
        noticiaFinal.contenido = contenido
    }

    const payload = JSON.stringify(camposModificados)
    await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/update/noticias/${id}`, 'PUT', payload)
    
    paginarNoticias()
    ocultarFormulario()
}

/**
 * Borra una noticia de la BBDD
 * @param {string} id id de la noticia a borrar
 */
async function borrarNoticia(id) {
    const noticia =  await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/findbyid/noticias/${id}`)
    if (window.confirm(`¿Deseas borrar la noticia ${noticia.titulo}?`)) {
        const resp = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/delete/noticias/${id}`, 'DELETE')
        if (resp) alert('Noticia borrada con exito')
        cargarNoticias()
    }
}

/**
 * Carga la noticia especificada por su id en los campos de edicion
 * @param {string} id - id de la noticia a editar
 */
async function editarNoticia(id) {
    mostrarFormulario()

    const noticia = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/findbyid/noticias/${id}`)
    const component = document.getElementById('noticiaFormWC')
    component?.setAttribute('noticia', JSON.stringify(noticia))
}

/**
 * Carga las noticias de la store en la tabla
 */
function cargarNoticias() {
    pagina = 1
    const form = document.getElementById('noticias-form-container')
    if (form) form.style.display = 'none'
    const tbody = document.getElementById('tbody-noticias')
    if (tbody) tbody.innerHTML = ''
    paginarNoticias()
}

/**
 * Muestra las noticias que corresponden al paginado en la pagina de noticias
 */
async function paginarNoticias() {
    const btnNext = document.getElementById('btn-next-noticias')
    const btnPrev = document.getElementById('btn-prev-noticias')
    const componente = document.getElementById('noticiasTableWC')
    const respNoticias = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/filter/noticias/search/${pagina}/20/_`)
    //respNoticias.data.forEach(/** @param {Noticia} noticia */noticia => drawNoticiaRow(noticia))
    componente?.setAttribute('noticias', JSON.stringify(respNoticias.data))
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

    const component = document.getElementById('noticiaFormWC')
    component?.setAttribute('noticia', '{}')

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
}