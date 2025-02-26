import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';
import css from "../../../css/styles.css" with { type: 'css'};

export class JugadorTable extends LitElement {
    static properties = {
        jugadores: {type: Array}
    }

    static styles = [css]

    constructor() {
        super();
        this.jugadores = [];
    }

    render() {
        if (!this.jugadores) return null;        
        return html`
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th class="hidden">Nacionalidad</th>
                        <th class="hidden">Altura</th>
                        <th class="hidden">Peso</th>
                    </tr>
                </thead>
                <tbody id="tbody-jugadores">
                    ${this.jugadores.map(jugador => this._rowContent(jugador))}
                </tbody>
            </table>
        `;
    }

    _rowContent(jugador) {
        return html`
            <tr>
                <td>${jugador.nombre}</td>
                <td>${jugador.apellidos}</td>
                <td class="hidden">${jugador.nacionalidad}</td>
                <td class="hidden">${jugador.altura}</td>
                <td class="hidden">${jugador.peso}</td>
            </tr>
        `;
    }
}

customElements.define('jugador-table', JugadorTable);