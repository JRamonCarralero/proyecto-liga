import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';
import css from "../../../css/admin.css" with { type: 'css'};
import { StoreContext } from './StoreContext.js';


export class TablaUsuariosConsume extends LitElement {
    static contextTypes = {
        store: StoreContext,
    }

    static styles = [css];

    render() {
        const users = this.context.store.state.users;

        return html`
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Nickname</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="tbody-usuarios">
                    ${users.map((user) => this._rowContent(user))}
                </tbody>
            </table>
        `;
    }

    // Private Methods

    
    /**
     * Dibuja una fila de la tabla de usuarios
     * @param {Usuario} user El usuario a dibujar
     * @returns {HTMLTableRowElement} La fila dibujada
     * @private
     */
    _rowContent(user) {
        return html`
            <tr>
                <td>${user._id}</td>
                <td>${user.nombre}</td>
                <td>${user.apellidos}</td>    
                <td>${user.nickname}</td>
                <td>${user.email}</td>
                <td>${user.rol}</td>
                <td>
                    <button class="btn-table" @click="${this._editarUsuario.bind(this,user._id)}">✎</button>
                    <button class="btn-table" @click="${this._borrarUsuario.bind(this,user._id)}">🗑</button>
                </td>
            </tr>
        `
    }

    _editarUsuario(id) {
        console.log('editar usuario', id)
    }

    _borrarUsuario(id) {
        this.context.store.dispatch({ type: 'DELETE_USER', payload: id });
    }
}

customElements.define('tabla-usuarios-consume', TablaUsuariosConsume);