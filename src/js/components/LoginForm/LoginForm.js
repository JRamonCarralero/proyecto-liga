// @ts-check

// @ts-expect-error No reconoce bien el css
import css from "../../../css/admin.css" with { type: 'css'};
import { getElementInputValue, getAPIData } from "../../utils/utils.js";
import { importTemplate } from "../../lib/importTemplate.js";

const TEMPLATE = {
  id: 'login-form-template',
  //url: '../js/components/LoginForm/LoginForm.html'
  url: new URL('./LoginForm.html', import.meta.url).href
}
// Wait for template to load
await importTemplate(TEMPLATE.url);

/**
 * Login form Web Component
 * 
 * @class LoginForm
 * @emits 'login-form-submit'
 */
export class LoginForm extends HTMLElement {

    /**
     * Get the template element.
     * @returns {HTMLTemplateElement | null} The template element.
     */
    get template(){
      const templateLogin = /** @type {HTMLTemplateElement} */(document.getElementById(TEMPLATE.id));
      return templateLogin;
    }

    /**
     * Constructor for the LoginForm class.
     * Calls the HTMLElement constructor.
     * @constructor
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
        shadow.adoptedStyleSheets.push(css);
        
        this._setUpContent()

        const form = shadow.getElementById("form-login");

        form?.addEventListener("submit", this._onFormSubmit.bind(this));
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
    }


     // Private Methods

    /**
     * Sets up the HTML content for the login form within the shadow root.
     * If the shadow root is present, sets the innerHTML to the form HTML.
     *
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
     * Handles the form submission event for the login form.
     * Prevents the default form submission behavior, retrieves the
     * email and password values, and sends a login request to the server.
     * If the login data is valid, dispatches a "login-form-submit"
     * event with the server response. If the login data is invalid,
     * dispatches the event with null detail.
     * 
     * @param {Event} e - The form submission event
     */
      async _onFormSubmit(e) {
        e.preventDefault();
        const API_PORT = location.port ? `:${location.port}` : ''
        const email = this.shadowRoot?.getElementById("email");
        const password = this.shadowRoot?.getElementById("pwd");
        const loginData = {
          email: getElementInputValue(email),
          password: getElementInputValue(password)
        }
        let onFormSubmitEvent
        console.log(`DESDE DENTRO DEL COMPONENTE Email: ${loginData.email}, Password: ${loginData.password}`);

        if (loginData.email !== '' && loginData.password !== '') {
          const payload = JSON.stringify(loginData)
          const apiData = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/login`, 'POST', payload)
          onFormSubmitEvent = new CustomEvent("login-form-submit", {
            bubbles: true,
            detail: apiData
          })
        } else {
          onFormSubmitEvent = new CustomEvent("login-form-submit", {
            bubbles: true,
            detail: null
          })
        }

        this.dispatchEvent(onFormSubmitEvent);
      }
}

customElements.define("login-form", LoginForm);