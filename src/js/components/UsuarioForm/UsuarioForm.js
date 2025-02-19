// @ts-check

// @ts-expect-error No reconoce bien el css
import AppCss from "../../../css/admin.css" with { type: 'css'};
import { importTemplate } from "../../lib/importTemplate.js";
import { store } from '../../store/redux.js';
import { getElementInputValue, setElementInputValue } from "../../utils/utils.js";

const TEMPLATE = {
  id: 'form-usuario-template',
  //url: './js/components/ClasificacionTable/ClasificacionTable.html'
  url: new URL('./UsuarioForm.html', import.meta.url).href
}
// Wait for template to load
await importTemplate(TEMPLATE.url);

/**
 * Usuario Form Web Component
 * 
 * @class UsuarioForm
 * @emits 'usuario-form-submit'
 */
export class UsuarioForm extends HTMLElement {
    static observedAttributes = ["iduser"]

    /**
     * Returns the id of the user to edit, if attribute "id" is set.
     * @returns {string} The id of the user to edit, or empty string if attribute "id" is not set.
     */
    get idUser() {
        const data = this.getAttribute("iduser");
        if (data) return data;
        else return '';
    }

    /**
     * Get the template element.
     * @returns {HTMLTemplateElement | null} The template element.
     */
    get template(){
        const templateClasificacion = /** @type {HTMLTemplateElement} */(document.getElementById(TEMPLATE.id));
        return templateClasificacion;
    }

    /**
     * Constructor for the MainClasificacion class.
     * Calls the HTMLElement constructor.
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

        this._setUpContent();

        const form = shadow.getElementById("form-usuario");
        form?.addEventListener("submit", this._onFormSubmit.bind(this));

        const guardarBtn = shadow.getElementById('guardar-btn')
        const limpiarBtn = shadow.getElementById('limpiar-btn')
        const cancelarBtn = shadow.getElementById('cancelar-btn')

        cancelarBtn?.addEventListener('click', this._exitForm.bind(this))
        guardarBtn?.addEventListener('click', this._guardarUsuario.bind(this))
        limpiarBtn?.addEventListener('click', this._clearFormInputs.bind(this))
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
        if (name === "iduser") {
            console.log(`Attribute ${name} has changed.`, oldValue, newValue);
            
            if (newValue != '') this._editarUsuario()
            else this._clearFormInputs()
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
        if (this.shadowRoot && this.template) {
            // Replace previous content
            this.shadowRoot.innerHTML = '';
            this.shadowRoot.appendChild(this.template.content.cloneNode(true));
        }
    }

    /**
     * Handles the form submission event for the usuario form.
     * Prevents the default form submission behavior and sends a reply to
     * the element with id 'guardar-btn' to simulate a click.
     * @param {Event} e - The form submission event
     * @private
     */
    _onFormSubmit(e) {
        e.preventDefault()
        /* const guardarBtn = this.shadowRoot?.getElementById('guardar-btn')
        replyElementButtonClick(guardarBtn) */
    }

    /**
     * Limpia los campos de formulario de edicion de usuarios
     * @private
     */
    _clearFormInputs() {
        setElementInputValue(this.shadowRoot?.getElementById('id-user'), '')
        setElementInputValue(this.shadowRoot?.getElementById('email'), '')
        setElementInputValue(this.shadowRoot?.getElementById('pwd'), '')
        setElementInputValue(this.shadowRoot?.getElementById('rol'), '')
        setElementInputValue(this.shadowRoot?.getElementById('nombre'), '')
        setElementInputValue(this.shadowRoot?.getElementById('apellidos'), '')
        setElementInputValue(this.shadowRoot?.getElementById('nickname'), '')
    }

    /**
     * Exits the form by clearing all input fields and dispatching a
     * "login-form-submit" event with null detail to indicate form exit
     * without submission.
     * 
     * @private
     */
    _exitForm() {
        this._clearFormInputs()
        let exitFormEvent = new CustomEvent("usuario-form-submit", {
            bubbles: true,
            detail: null
          })
        this.dispatchEvent(exitFormEvent);
    }

    /**
     * Handles the form submission event for the usuario form.
     * Prevents the default form submission behavior and retrieves the
     * email, password, nombre, apellidos, nickname and rol values from the form.
     * If all values are set, creates a new usuario object and dispatches a
     * "usuario-form-submit" event with the usuario object as detail.
     * If any value is not set, shows an alert message to the user.
     * @private
     */
    _guardarUsuario() {
        const id = getElementInputValue(this.shadowRoot?.getElementById('id-user'))
        const nombre = getElementInputValue(this.shadowRoot?.getElementById('nombre'))
        const apellidos = getElementInputValue(this.shadowRoot?.getElementById('apellidos'))
        const nickname = getElementInputValue(this.shadowRoot?.getElementById('nickname'))
        const email = getElementInputValue(this.shadowRoot?.getElementById('email'))
        const rol = getElementInputValue(this.shadowRoot?.getElementById('rol'))
        const password = getElementInputValue(this.shadowRoot?.getElementById('pwd'))
    
        if (!nombre || !apellidos || !nickname || !email || !password || !rol) {
            alert('Todos los campos son obligatorios')
            return
        }

        const usuario = {
            _id: id,
            nombre,
            apellidos,
            nickname,
            email,
            rol,
            password
        }

        let onFormSubmitEvent = new CustomEvent("usuario-form-submit", {
            bubbles: true,
            detail: usuario
        })
        this.dispatchEvent(onFormSubmitEvent);
    }

    /**
     * Edita un usuario existente por su id.
     * Busca el usuario en la Store, y si lo encuentra, rellena los campos del formulario
     * con sus valores. Si no lo encuentra, no hace nada.
     * @private
     */
    _editarUsuario() {
        const idUser = this.getAttribute('iduser')
        const usuario = store.usuario.getById(idUser)

        setElementInputValue(this.shadowRoot?.getElementById('id-user'), usuario._id)
        setElementInputValue(this.shadowRoot?.getElementById('email'), usuario.email)
        setElementInputValue(this.shadowRoot?.getElementById('pwd'), usuario.password)
        setElementInputValue(this.shadowRoot?.getElementById('rol'), usuario.rol)
        setElementInputValue(this.shadowRoot?.getElementById('nombre'), usuario.nombre)
        setElementInputValue(this.shadowRoot?.getElementById('apellidos'), usuario.apellidos)
        setElementInputValue(this.shadowRoot?.getElementById('nickname'), usuario.nickname)
    }
}

customElements.define("usuario-form", UsuarioForm);