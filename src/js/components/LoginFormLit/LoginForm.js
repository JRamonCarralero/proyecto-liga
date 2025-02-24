// @ts-expect-error No reconoce bien el import
import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';
// @ts-expect-error No reconoce bien el css
import css from "../../../css/admin.css" with { type: 'css'};
import { importTemplate } from "../../lib/importTemplate.js";
import { getAPIData } from "../../utils/utils.js";


const TEMPLATE = {
  id: 'login-form-template',
  url: new URL('../LoginForm/LoginForm.html', import.meta.url).href
}
// Wait for template to load
await importTemplate(TEMPLATE.url);

/**
 * Login form Web Component
 * 
 * @class LoginForm
 * @emits 'login-form-submit'
 */
export class LoginForm extends LitElement {
    static properties = {
        email: {type: String},
        password: {type: String}
    }

    static styles = [css];

    /**
     * Constructor for the LoginForm class.
     * Calls the HTMLElement constructor.
     * @constructor
     */
    constructor() {
        super();
        this.email = '';
        this.password = '';
    }

    /**
     * Renders the login form HTML content.
     * 
     * @returns {import('lit').TemplateResult} The rendered HTML content.
     */
    render() {
        return html`
            <form id="form-login" @submit="${this._onFormSubmit}">
                <label for="email">Email: <input type="email" name="email" id="email" .value=${this.email} @input="${this._emailChanged}"  autocomplete="off"></label>
                <label for="pwd">Password: <input type="password" name="pwd" id="pwd"" .value=${this.password} @input="${this._passwordChanged}" ></label>
                <button id="login-btn">Login</button>
            </form> 
        `
    }

    // Private Methods

    /**
     * Handles the input event for the email input field.
     * Updates the component's email property with the new value.
     * @param {InputEvent} e - The input event.
     * @private
     */
    _emailChanged(e) {
        this.email = e.target.value
    }

    /**
     * Handles the input event for the password input field.
     * Updates the component's password property with the new value.
     * @param {InputEvent} e - The input event.
     * @private
     */
    _passwordChanged(e) {
        this.password = e.target.value
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
        const loginData = {
            email: this.email,
            password: this.password
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

// @ts-expect-error No reconoce bien la clase
customElements.define("login-form", LoginForm);