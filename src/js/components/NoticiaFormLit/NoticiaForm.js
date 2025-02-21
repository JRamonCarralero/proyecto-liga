import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';
import css from "../../../css/admin.css" with { type: 'css'};

/**
 * Noticia form Web Component
 * 
 * @class NoticiaForm
 * @emits 'noticia-form-submit'
 */
export class NoticiaForm extends LitElement {
    static properties = {
        noticia: {type: Object}
    }

    static styles = [css];

    /**
     * Constructor for the NoticiaForm class.
     * Calls the LitElement constructor.
    */
    constructor() {
        super();
    }

    /**
     * Renders the noticia form HTML content.
     * 
     * @returns {import('lit').TemplateResult} The rendered HTML content.
     */
    render() {
        return html`
            <form class="noticias-form">
                <input type="hidden" name="id" id="id" .value=${this.noticia._id || ""}>
                <div>
                    <label for="titulo">Título</label>
                    <input type="text" id="titulo" name="titulo" .value=${this.noticia.titulo || ""}>
                </div>
                <div>
                    <label for="cabecera">Cabecera</label>
                    <textarea id="cabecera" name="cabecera" .value=${this.noticia.cabecera || ""}></textarea> 
                </div>
                <div>
                    <label for="contenido">Contenido</label>
                    <textarea name="contenido" id="contenido" .value=${this.noticia.contenido || ""}></textarea>
                </div>
            </form>
            <div class="div-buttons">
                <button id="sbmt-noticia-form" @click=${this._guardarNoticia}>Crear</button>
                <button id="clear-noticia-form" @click=${this._clearForm}>Limpiar</button>
                <button id="cancel-noticia-form" @click=${this._ocultarFormulario}>Cancelar</button>
            </div>
        `
    }

    // Private methods
    

    /**
     * Handles the submit of the noticia form.
     * Gets the noticia data from the form and logs it to the console.
     * If any of the fields are empty, it shows an alert and returns.
     * If all fields have data, it creates a CustomEvent with the noticia data
     * and dispatches it to the parent component.
     * Finally, it clears the form.
     */
    _guardarNoticia() {
        const noticiaSub = {
            id: this.renderRoot.getElementById('id').value,
            titulo: this.renderRoot.getElementById('titulo').value,
            cabecera: this.renderRoot.getElementById('cabecera').value,
            contenido: this.renderRoot.getElementById('contenido').value
        }

        console.log(noticiaSub)
        if (!noticiaSub.titulo || !noticiaSub.cabecera || !noticiaSub.contenido) {
            alert('Todos los campos son obligatorios')
            return
        }

        let exitFormEvent = new CustomEvent("noticia-form-submit", {
            bubbles: true,
            detail: noticiaSub
          })
        this.dispatchEvent(exitFormEvent);

        this._clearForm()
    }

    /**
     * Limpia el formulario de creacion de noticias y borra sus valores
     * @private
     */
    _clearForm() {
        this.renderRoot.getElementById('id').value = ''
        this.renderRoot.getElementById('titulo').value = ''
        this.renderRoot.getElementById('cabecera').value = ''
        this.renderRoot.getElementById('contenido').value = ''
    }

    /**
     * Oculta el formulario de creacion de noticias y borra sus valores
     * Despacha un evento "noticia-form-submit" con detail null para indicar que
     * el formulario se ha cerrado sin guardar la noticia
     * @private
     */
    _ocultarFormulario() {
        this._clearForm()
        let exitFormEvent = new CustomEvent("noticia-form-submit", {
            bubbles: true,
            detail: null
          })
        this.dispatchEvent(exitFormEvent);
    }
}

customElements.define("noticia-form-component", NoticiaForm);