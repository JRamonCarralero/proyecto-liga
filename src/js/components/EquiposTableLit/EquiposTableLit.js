import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';
import css from "../../../css/styles.css" with { type: 'css'};

/**
 * A web component that displays a table of teams.
 * 
 * @class EquiposTable
 * @extends LitElement
 * @emits 'show-equipo'
 */
export class EquiposTable extends LitElement {
    static properties = {
        equipos: {type: Array}
    }

    static styles = [css]

    /**
     * Initializes a new instance of the EquiposTable class.
     * Sets the initial value of the equipos property to an empty array.
     */
    constructor() {
        super();
        this.equipos = [];
    }

    /**
     * Renders the table of teams.
     * 
     * @returns {import('lit').TemplateResult} The rendered HTML content.
     */
    render() {
        if (!this.equipos) return null;        
        return html`
            <table id="table-equipos">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Poblacion</th>
                            <th class="hidden">Dirección</th>
                            <th>Estadio</th>
                        </tr>
                    </thead>
                    <tbody id="tbody-equipos">
                        ${this.equipos.map(equipo => this._rowContent(equipo))}
                    </tbody>
                </table>
        `;
    }

    /**
     * Generates a table row for the given team.
     * 
     * @param {Equipo} equipo The team to generate a row for.
     * @returns {import('lit').TemplateResult} The rendered HTML content.
     * @private
     */
    _rowContent(equipo) {
        return html`
            <tr>
                <td class="cp" @click=${this._showEquipo.bind(this, equipo._id)}>${equipo.nombre}</td>
                <td>${equipo.poblacion}</td>
                <td class="hidden">${equipo.direccion}</td>
                <td>${equipo.estadio}</td>
            </tr>
        `;
    }

    /**
     * Dispatches a show-equipo-event with the given equipoId as detail.
     * @param {string} equipoId - The id of the equipo to show.
     * @private
     */
    _showEquipo(equipoId) {
        const showEquipoEvent = new CustomEvent("show-equipo-event", {
            bubbles: true,
            detail: equipoId
        })
        this.dispatchEvent(showEquipoEvent);
    }
}

customElements.define('equipos-table', EquiposTable);