import { LitElement, html, createContext } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';

// 1. Crear el contexto
export const StoreContext = createContext({
  state: { users: [] },
  dispatch: () => {},
});

// 2. Crear el Provider
class StoreProvider extends LitElement {
  static properties = {
    initialUsers: { type: Array, reflect: true },
    state: { type: Object },
  };

  constructor() {
    super();
    this.state = { users: [] }; // Estado inicial con un array de usuarios vacío
    this.dispatch = this.dispatch.bind(this);
    this.getUserById = this.getUserById.bind(this);
  }

  dispatch(action) {
    let currentState = { ...this.state }; // Crea una copia del estado actual

    switch (action.type) {
      case 'CREATE_USER':
        currentState.users = [...currentState.users, action.payload];
        break;
      case 'UPDATE_USER':
        currentState.users = currentState.users.map(user =>
          user._id === action.payload._id ? action.payload : user
        );
        break;
      case 'DELETE_USER':
        currentState.users = currentState.users.filter(user => user.id !== action.payload);
        break;
      case 'UPDATE_ALL_USERS':
        currentState.users = action.payload;
        break;
    }
    this.state = currentState; // Actualiza el estado con la copia modificada
    this.requestUpdate(); // Fuerza la actualización de los componentes que consumen el contexto
  }

  getUserById(id) {
    return this.state.users.find(user => user.id === id);
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('initialUsers') && this.initialUsers) {
      this.dispatch({ type: 'UPDATE_ALL_USERS', payload: this.initialUsers });
    }
  }

  render() {
    return html`
      <StoreContext.Provider value=${{ state: this.state, dispatch: this.dispatch, getUserById: this.getUserById }}>
        <slot></slot>
      </StoreContext.Provider>
    `;
  }
}

customElements.define('store-provider', StoreProvider);


