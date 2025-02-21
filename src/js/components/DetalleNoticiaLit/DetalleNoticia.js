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
                <img class="img-detalle-noticia" src="./assets/img/foto1-800x395.jpg" alt="imagen noticia">
                <p class="texto-noticia">${this.noticia.cabecera}</p>
                <p class="texto-noticia">${this.noticia.contenido}</p>
            </div>
        `
    }
}

customElements.define('detalle-noticia-component', DetalleNoticia);
