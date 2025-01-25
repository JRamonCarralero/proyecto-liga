import { Equipo } from "../js/classes/Equipo.js";
import { Jugador } from "../js/classes/Jugador.js";
import { store } from "../js/store/redux.js";
function loadEquiposIntoLocalStorage() {
    let equipos = []
    fetch('../apis/equipos.json')
        .then(response => response.json()) 
        .then(data => {
            equipos = data
            equipos.forEach(equipo => {
                const jugadores = []
                equipo.jugadores.forEach(jugador => {
                    const jugadorClass = new Jugador(jugador.nombre, jugador.apellidos, jugador.nacionalidad, jugador.altura, jugador.peso, jugador.id)
                    store.jugador.create(jugadorClass)
                    jugadores.push(jugadorClass.id)
                })
                equipo.jugadores = jugadores
                const equipoClass = new Equipo(equipo.nombre, equipo.poblacion, equipo.direccion, equipo.estadio, equipo.jugadores)
                store.equipo.create(equipoClass)
            });

            store.saveState()
            //localStorage.setItem('storedData', JSON.stringify(store.getState()))
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
          });
}

//loadEquiposIntoLocalStorage()