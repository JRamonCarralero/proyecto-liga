import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';
import css from "../../../css/styles.css" with { type: 'css'};

/**
 * Estadisticas Table Web Component
 * 
 * @class EstadisticasTable
 * @emits 'sort-estadistica-by-event'
 */
export class EstadisticasTable extends LitElement {
    static properties = {
        estadisticas: {type: Object}
    }

    static styles = [css]

    /**
     * Constructor for the EstadisticasTable class.
     * Calls the HTMLElement constructor and set the estadisticas property to an empty object.
     */
    constructor() {
        super();
        this.estadisticas = {};
    }

    /**
     * Renders the Estadisticas Table component.
     * 
     * @returns {import('lit').TemplateResult} The rendered HTML content.
     */
    render() {
        if (!this.estadisticas.data) return null;
        return html`
            <div class="select-column-box">
                <label for="select-column">Ordenar por: 
                    <select id="select-column" class="select-column" @change=${this._selectValue} >
                        <option value="jugador" ${this.estadisticas.column === 'jugador' ? 'selected' : ''}>Jugador</option>
                        <option value="equipo" ${this.estadisticas.column === 'equipo' ? 'selected' : ''}>Equipo</option>
                        <option value="puntos" ${this.estadisticas.column === 'puntos' ? 'selected' : ''}>Puntos</option>
                        <option value="ensayos" ${this.estadisticas.column === 'ensayos' ? 'selected' : ''}>Ensayos</option>
                        <option value="ppie" ${this.estadisticas.column === 'ppie' ? 'selected' : ''}>Puntos Pie</option>
                        <option value="TA" ${this.estadisticas.column === 'TA' ? 'selected' : ''}>T.Amarillas</option>
                        <option value="TR" ${this.estadisticas.column === 'TR' ? 'selected' : ''}>T.Rojas</option>
                    </select>
                </label>
            </div>
            <table>
                <thead>
                    <tr>
                        <th id="sta-sort-jugador" class="th-cursor ${this.estadisticas.column === 'jugador' ? 'th-selected' : ''}" @click=${this._sortBy.bind(this, 'jugador')} >Jugador</th>
                        <th id="sta-sort-equipo" class="th-cursor ${this.estadisticas.column === 'equipo' ? 'th-selected' : ''}" @click=${this._sortBy.bind(this, 'equipo')} >Equipo</th>
                        <th id="sta-sort-puntos" class="th-cursor ${this.estadisticas.column === 'puntos' ? 'th-selected' : ''} ${this.estadisticas.column === 'jugador' || this.estadisticas.column === 'equipo' || this.estadisticas.column === 'puntos' ? '' : 'hidden'}" @click=${this._sortBy.bind(this, 'puntos')} >Puntos</th>
                        <th id="sta-sort-ensayos" class="th-cursor ${this.estadisticas.column === 'ensayos' ? 'th-selected' : 'hidden'}" @click=${this._sortBy.bind(this, 'ensayos')} >Ensayos</th>
                        <th id="sta-sort-ppie" class="th-cursor ${this.estadisticas.column === 'ppie' ? 'th-selected' : 'hidden'}" @click=${this._sortBy.bind(this, 'ppie')} >Puntos Pie</th>
                        <th id="sta-sort-ta" class="th-cursor ${this.estadisticas.column === 'TA' ? 'th-selected' : 'hidden'}" @click=${this._sortBy.bind(this, 'TA')} >T.Amarillas</th>
                        <th id="sta-sort-tr" class="th-cursor ${this.estadisticas.column === 'TR' ? 'th-selected' : 'hidden'}" @click=${this._sortBy.bind(this, 'TR')} >T.Rojas</th>
                    </tr>
                </thead>
                <tbody id="tbody-estadisticas">
                    ${this.estadisticas.data.map((estadistica) => this._rowContent(estadistica, this.estadisticas.column))}
                </tbody>
            </table>
        `;
    }

    /**
     * Dibuja una fila de la tabla de estadisticas de jugador con los datos
     * de una estadistica
     * @param {EstadisticaTable} estadistica La estadistica a dibujar
     * @param {string} column El campo por el que se ordena la tabla
     * @returns {import('lit').TemplateResult} La fila dibujada
     * @private
     */
    _rowContent(estadistica, column) {
        return html`
            <tr>
                <td>${estadistica.jugNombre} ${estadistica.jugApellidos}</td>
                <td >${estadistica.eqNombre}</td>
                <td class="${this.estadisticas.column === 'jugador' || this.estadisticas.column === 'equipo' || this.estadisticas.column === 'puntos' ? '' : 'hidden'}">${estadistica.puntos}</td>
                <td class="${column === 'ensayos' ? '' : 'hidden'}">${estadistica.ensayos}</td>
                <td class="${column === 'ppie' ? '' : 'hidden'}">${estadistica.puntosPie}</td>
                <td class="${column === 'TA' ? '' : 'hidden'}">${estadistica.tAmarillas}</td>
                <td class="${column === 'TR' ? '' : 'hidden'}">${estadistica.tRojas}</td>
            </tr>
        `
    }

    /**
     * Sorts the table by the given column and dispatches a "sort-estadistica-by-event" event to the parent
     * @param {string} column The column to sort by
     * @private
     */
    _sortBy(column) {
        const sortByEvent = new CustomEvent("sort-estadistica-by-event", {
            bubbles: true,
            detail: column
        })
        this.dispatchEvent(sortByEvent);
    }

    /**
     * Called when the user selects a column to sort the table by in the 
     * select element. It sorts the table by the given column and dispatches
     * a "sort-estadistica-by-event" event to the parent.
     * @param {Event} e The select element change event.
     * @private
     */
    _selectValue(e) {
        const column = e.target.value;
        this._sortBy(column);
    }
}   

customElements.define('estadisticas-table', EstadisticasTable);