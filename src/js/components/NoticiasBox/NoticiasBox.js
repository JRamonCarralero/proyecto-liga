// @ts-check

// @ts-expect-error No reconoce bien el css
import AppCss from "../../../css/admin.css" with { type: 'css'};
// @ts-expect-error No reconoce bien el css
import NoticiasCss from "./NoticiasBox.css" with { type: 'css' };
import { importTemplate } from "../../lib/importTemplate.js";
/** @import { Noticia } from '../../classes/Noticia.js' */

const TEMPLATE = {
  id: 'noticias-box-template',
  url: new URL('./NoticiasBox.html', import.meta.url).href
}
// Wait for template to load
await importTemplate(TEMPLATE.url);

/**
 * Noticias Box Web Component
 * 
 * @class NoticiasBox
 */
export class NoticiasBox extends HTMLElement{
    static observedAttributes = ["noticias"];

    /**
     * @typedef {Object} NoticiaObject
     * @property {string} origin
     * @property {Noticia[]} noticias
     */

    /**
     * The origin of the noticias to render in the component.
     * @type {NoticiaObject | null}
     */
    get data() {
        const data = this.getAttribute("noticias");
        if (data) return JSON.parse(data);
        else return null;
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
     */
    connectedCallback() {
        console.log("Custom element added to page");
        const shadow = this.attachShadow({ mode: "open" });
        shadow.adoptedStyleSheets = [AppCss, NoticiasCss];

        this._setUpContent()
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
        
        if(name === 'noticias' && this.data) {
            const listBox = this.shadowRoot?.getElementById('noticias-box-list')
            if (this.data.origin === 'main') listBox?.classList.add('noticias-box-main')
            else listBox?.classList.add('noticias-box-list')
            if (listBox) listBox.innerHTML = ''
            if(this.data.noticias) {
                this.data.noticias.forEach(noticia => {
                    const mainDiv = document.createElement('div')
                    const imgBox = document.createElement('div')
                    const textBox = document.createElement('div')
                    const img = document.createElement('img')
                    const h3 = document.createElement('h3')
                    const p = document.createElement('p')
                    const a = document.createElement('a')
    
                    listBox?.appendChild(mainDiv)
                    mainDiv.classList.add(`box-noticia-${this.data?.origin}`)
                    mainDiv.appendChild(imgBox)
                    imgBox.classList.add('img-box')
                    imgBox.appendChild(img)
                    mainDiv.appendChild(textBox)
                    textBox.classList.add('text-box')
                    img.src = "./assets/img/foto1-800x395.jpg"
                    img.alt = noticia.titulo
                    img.classList.add('noticia-img')
                    if (this.data?.origin === 'list') imgBox.appendChild(h3)
                    else textBox.appendChild(h3)
                    h3.classList.add('noticia-title')
                    h3.appendChild(a)
                    a.href = `./noticias.html?id=${noticia._id}`
                    a.innerText = noticia.titulo
                    a.classList.add('noticia-link')
                    textBox.appendChild(p)
                    p.innerText = noticia.cabecera
                    p.classList.add('noticia-text')
                })
            }
            
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
}

customElements.define("noticia-box", NoticiasBox);