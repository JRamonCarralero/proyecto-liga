// @ts-check

// @ts-expect-error No reconoce bien el css
import AppCss from "../../../css/admin.css" with { type: 'css'};
import { importTemplate } from "../../lib/importTemplate.js";

/** @import { Usuario } from '../../classes/Usuario.js' */

const TEMPLATE = {
  id: 'tabla-usuarios-template',
  url: new URL('./TablaUsuarios.html', import.meta.url).href
}
// Wait for template to load
await importTemplate(TEMPLATE.url);

/**
 * @class TablaUsuarios
 * @property {Usuario[]} usuariosList
 * @emits 'usuarios-delete'
 * @emits 'usuarios-update' 
 */
export class TablaUsuarios extends HTMLElement {
    static observedAttributes = ["usuarios"];
    /**
     * @type {Usuario[]}
     */
    usuariosList = []

    /**
     * Get the template element.
     * @returns {HTMLTemplateElement | null} The template element.
     */
    get template(){
        const templateClasificacion = /** @type {HTMLTemplateElement} */(document.getElementById(TEMPLATE.id));
        return templateClasificacion;
    }

    /**
     * Constructor of the class.
     * Calls the superclass constructor.
     */
    constructor() {
        super();
    }

    /**
     * Called when the element is inserted into a document.
     * We create the shadow root and add the styles and the form HTML.
     * We also add an event listener to the form to handle the submit event.
     */
    connectedCallback() {
        console.log("Custom element added to page.");
        const shadow = this.attachShadow({ mode: "open" });
        shadow.adoptedStyleSheets = [AppCss];
        
        window.addEventListener('stateChanged', this._handleStateChanged.bind(this), { passive: true });
    }

    /**
     * Called when the element is removed from a document.
     * We log a message to the console.
     */
    disconnectedCallback() {
        console.log("Custom element removed from page.");
    }

    /**
     * Called when the element is adopted into a new document.
     * We log a message to the console.
     */
    adoptedCallback() {
        console.log("Custom element moved to new page.");
    }
    
    /**
     * Called when an observed attribute has changed.
     * @param {string} name - The name of the attribute that has changed.
     * @param {string} oldValue - The old value of the attribute.
     * @param {string} newValue - The new value of the attribute.
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'usuarios') {
            console.log(`attributeChangedCallback: Attribute ${name} has changed.`, oldValue, newValue);
        }
    }

    // Private Methods

    /**
     * Sets up the HTML content for the clasificacion table within the shadow root.
     * Clears any existing content and appends the template content if both the 
     * shadow root and template are available. Then calls _getMainClasificacion
     * to populate the table with data.
     * 
     * @private
     */
    _setUpContent() {
        // Prevent render when disconnected or the template is not loaded
        if (this.shadowRoot && this.template && this.usuariosList) {
            // Replace previous content
            this.shadowRoot.innerHTML = '';
            this.shadowRoot.appendChild(this.template.content.cloneNode(true));

            const tbody = document.getElementById('tbody-usuarios')
            if (tbody) tbody.innerHTML = ''
            this.usuariosList.forEach(usuario => this._drawUsuarioRow(usuario))
        }
    }

    /**
     * Handles state changes related to usuarios and updates the table accordingly
     * @private
     * @param {import('../../store/redux.js').State} state - The new state of the store
     */
    _handleStateChanged(state) {
        // Do whatever is needed in this component after a particular state value changes
        // Filter by the states needed in this component
        if (state?.detail?.type === 'CREATE_USUARIO' || state?.detail?.type === 'UPDATE_USUARIO' || state?.detail?.type === 'DELETE_USUARIO' || state?.detail?.type === 'UPDATE_ALL_USUARIOS'){
          // eslint-disable-next-line no-unsafe-optional-chaining
          this.usuariosList = [...state?.detail?.changes?.usuarios]
          this._setUpContent()
        }
    }

    /**
     * Dibuja una fila de la tabla de usuarios
     * @param {Usuario} usuario El usuario a dibujar
     * @private
     */
    _drawUsuarioRow(usuario) {
        const tbody = this.shadowRoot?.getElementById('tbody-usuarios')
        const tr = document.createElement('tr')
        tbody?.appendChild(tr)
    
        const cellId = document.createElement('td')
        const cellNombre = document.createElement('td')
        const cellApellidos = document.createElement('td')
        const cellNickname = document.createElement('td')
        const cellEmail = document.createElement('td') 
        const cellRol = document.createElement('td')
        const cellEdit = document.createElement('td')
        const editBtn = document.createElement('button')
        const delBtn = document.createElement('button')
    
        cellId.innerText = usuario._id
        tr.appendChild(cellId)
        cellNombre.innerText = usuario.nombre
        tr.appendChild(cellNombre)
        cellApellidos.innerText = usuario.apellidos
        tr.appendChild(cellApellidos)
        cellNickname.innerText = usuario.nickname
        tr.appendChild(cellNickname)
        cellEmail.innerText = usuario.email
        tr.appendChild(cellEmail)
        cellRol.innerText = usuario.rol
        tr.appendChild(cellRol)
        tr.appendChild(cellEdit)
        editBtn.innerText = '✎'
        editBtn.classList.add('btn-table')
        editBtn.addEventListener('click', this._editarUsuario.bind(this, usuario._id))
        cellEdit.appendChild(editBtn)
        delBtn.innerText = '🗑'
        delBtn.classList.add('btn-table')
        delBtn.addEventListener('click', this._borrarUsuario.bind(this, usuario._id))
        cellEdit.appendChild(delBtn)
    }

    /**
     * Handles the editing of a user by their id.
     * Logs the user id to the console.
     * @param {string} id - The id of the user to edit.
     * @private
     */
    _editarUsuario(id) {
        console.log('editar usuario', id)
        try {
            let editUser = new CustomEvent("edit-user-event", {
                bubbles: true,
                detail: id
              })
            this.dispatchEvent(editUser)
        } catch (error) {
            console.log(error)
        }        
    }

    /**
     * Handles the deletion of a user by their id.
     * Logs the user id to the console.
     * @param {string} id - The id of the user to delete.
     * @private
     */
    _borrarUsuario(id) {
        let deleteUser = new CustomEvent("delete-user-event", {
            bubbles: true,
            detail: id
          })
        this.dispatchEvent(deleteUser)
    }
}

customElements.define("usuarios-table", TablaUsuarios);