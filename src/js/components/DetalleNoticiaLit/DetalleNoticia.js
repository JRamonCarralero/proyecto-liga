import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';
import css from "../../../css/styles.css" with { type: 'css'};


export class DetalleNoticia extends LitElement {
    static properties = {
        noticia: {type: Object}
    }

    static styles = [css]

    constructor() {
        super();
    }

    render() {
        if (!this.noticia) return
        return html`
            <div class="detalle-noticia">
                <h2>${this.noticia.titulo}</h2>
                <p class="texto-noticia">${this.noticia.cabecera}</p>
                <img class="img-detalle-noticia" src="./assets/img/foto1-800x395.jpg" alt="imagen noticia">
                ${this.noticia.contenido.split('\n').map(p => html`
                    <p class="texto-noticia">${p}</p>
                `)}
            </div>
        `
    }
}

customElements.define('detalle-noticia-component', DetalleNoticia);
