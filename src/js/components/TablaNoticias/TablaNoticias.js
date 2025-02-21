import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';
import css from "../../../css/admin.css" with { type: 'css'};

export class TablaNoticias extends LitElement {
    static properties = {
        noticias: {type: Array}
    }

    static styles = [css];

    constructor() {
        super();
        this.noticias = [];
    }

    render() {
        return html`
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Titulo</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="tbody-noticias">
                    ${this.noticias.map((noticia) => html`
                        <tr>
                            <td>${noticia._id}</td>
                            <td>${noticia.fecha}</td>
                            <td>${noticia.titulo}</td>
                            <td>
                                <button class="btn-table" @click="${this._editarNoticia.bind(this,noticia._id)}">✎</button>
                                <button class="btn-table" @click="${this._borrarNoticia.bind(this,noticia._id)}">🗑</button>
                            </td>
                        </tr>
                    `)}
                </tbody>
            </table>
        `;
    }

    // Private Methods

    /**
     * Handles the editing of a news by its id.
     * Logs the news id to the console.
     * @param {string} id - The id of the news to edit.
     * @private
     */
    _editarNoticia(id) {
        const onFormSubmitEvent = new CustomEvent("editar-noticia-click", {
            bubbles: true,
            detail: id
        })
        this.dispatchEvent(onFormSubmitEvent);
    }

    /**
     * Handles the deletion of a news by its id.
     * Logs the news id to the console.
     * @param {string} id - The id of the news to delete.
     * @private
     */
    _borrarNoticia(id) {        
        const onFormSubmitEvent = new CustomEvent("borrar-noticia-click", {
            bubbles: true,
            detail: id
        })
        this.dispatchEvent(onFormSubmitEvent);
    }
}

// @ts-expect-error No reconoce bien la clase
customElements.define("tabla-noticias", TablaNoticias);