// @ts-check

// @ts-expect-error No reconoce bien el css
import AppCss from "../../../css/styles.css" with { type: 'css'};
// @ts-expect-error No reconoce bien el css
import SelectedLigaTitleCss from "./SelectedLigaTitleCss.css" with { type: 'css'};
import { importTemplate } from "../../lib/importTemplate.js";

/** @import { Liga } from '../../classes/Liga.js' */

const TEMPLATE = {
    id: 'selected-liga-title-template',
    //url: './js/components/SelectedLigaTitle/SelectedLigaTitle.html'
    url: new URL('./SelectedLigaTitle.html', import.meta.url).href
  }
  // Wait for template to load
  await importTemplate(TEMPLATE.url);

/**
 * Main Clasificacion Web Component
 * 
 * @class SelectedLigaTitle
 * @emits 'selected-liga-title'
 */
export class SelectedLigaTitle extends HTMLElement {
    static observedAttributes = ["liga"];

    /**
     * Retrieves the 'liga' attribute and parses it as JSON.
     * If the attribute is not present, returns an empty object.
     * 
     * @returns {Liga | Object} The parsed JSON object from the 'liga' attribute.
     */
    get liga() {
        const data = this.getAttribute("liga");
        if (data) return JSON.parse(data);
        else return {};
      }
    
    /**
     * Get the template element.
     * @returns {HTMLTemplateElement | null} The template element.
     */
    get template(){
        const templateTitle = /** @type {HTMLTemplateElement} */(document.getElementById(TEMPLATE.id));
        return templateTitle;
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
        shadow.adoptedStyleSheets = [AppCss, SelectedLigaTitleCss]; 
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
        console.log(`Attribute ${name} has changed.`, oldValue, newValue);
        this._setUpContent();
    }

    // Private Methods

    
    /**
     * Sets up the HTML content for the selected liga title within the shadow root.
     * Clears any existing content and appends the template content if both the 
     * shadow root and template are available.
     * 
     * @private
     */
    _setUpContent() {
        // Prevent render when disconnected or the template is not loaded
        if (this.shadowRoot && this.template) {
            // Replace previous content
            this.shadowRoot.innerHTML = '';
            this.shadowRoot.appendChild(this.template.content.cloneNode(true));

            this._setTitle()
        }
    }

    _setTitle() {
        const liga = /** @type {Liga} */(this.liga)
        const tituloLiga = this.shadowRoot?.getElementById('titulo-liga')
        if(tituloLiga) tituloLiga.innerText = `${liga.nombre}, Temporada ${liga.year}`
    }
}

customElements.define("selected-liga-title", SelectedLigaTitle);