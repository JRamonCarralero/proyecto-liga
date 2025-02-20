// @ts-check

// @ts-expect-error No reconoce bien el css
import AppCss from "../../../css/styles.css" with { type: 'css'};
import { importTemplate } from "../../lib/importTemplate.js";

const TEMPLATE = {
  id: 'clasificacion-table-template',
  //url: './js/components/ClasificacionTable/ClasificacionTable.html'
  url: new URL('./ClasificacionTable.html', import.meta.url).href
}
// Wait for template to load
await importTemplate(TEMPLATE.url);

/**
 * @typedef {Object} ClasificacionTabla
 * @property {string} equipo
 * @property {number} puntos
 * @property {number} partidosJugados
 * @property {number} partidosGanados
 * @property {number} partidosPerdidos
 * @property {number} partidosEmpatados
 * @property {number} puntosAnotados
 * @property {number} puntosRecibidos
 */

/**
 * Clasificacion Table Web Component
 * 
 * @class ClasificacionTable
 * @property {ClasificacionTabla[]} data
 */
export class ClasificacionTable extends HTMLElement {
    static observedAttributes = ["data"];

    /**
     * The data attribute of the element. This is an array of objects, where each object
     * represents a row in the clasificacion table. The object should have the following
     * properties:
     * - equipo: the name of the team
     * - puntos: the points of the team
     * - partidosJugados: the number of matches played by the team
     * - partidosGanados: the number of matches won by the team
     * - partidosPerdidos: the number of matches lost by the team
     * - partidosEmpatados: the number of matches drawn by the team
     * - puntosAnotados: the number of goals scored by the team
     * - puntosRecibidos: the number of goals conceded by the team
     * @type {ClasificacionTabla[]}
     */
    get data() {
        const data = this.getAttribute("data");
        if (data) return JSON.parse(data);
        else return [];
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
        //this._setUpContent()    
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
        if (name === "data") {
            console.log(`Attribute ${name} has changed.`, oldValue, newValue);
            this._setUpContent();
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
        this._drawClasificacion() 
    }

    
    /**
     * Dibuja la tabla de clasificacion para la liga principal
     * 
     * @private
     */
    async _drawClasificacion() {
        const tbody = this.shadowRoot?.getElementById('tbody-clasificacion')
        const clasificaciones = this.data
        let contador = 0
        if (tbody) tbody.innerHTML = ''
        clasificaciones.forEach(/** @param {ClasificacionTabla} clasificacion */clasificacion => {
            if (tbody) tbody.innerHTML += `
                <tr>
                    <td>${++contador}</td>
                    <td>${clasificacion.equipo}</td>
                    <td>${clasificacion.puntos}</td>
                    <td>${clasificacion.partidosJugados}</td>
                    <td>${clasificacion.partidosGanados}</td>
                    <td>${clasificacion.partidosPerdidos}</td>
                    <td>${clasificacion.partidosEmpatados}</td>
                    <td>${clasificacion.puntosAnotados}</td>
                    <td>${clasificacion.puntosRecibidos}</td>
                </tr>
            `
        })   
    }
}

customElements.define("clasificacion-table", ClasificacionTable);