// @ts-check
import { Jugador, PrimeraLinea } from "../classes/Jugador.js";
import { Equipo } from "../classes/Equipo.js";
import { Partido } from "../classes/Partido.js";
import { Jornada } from "../classes/Jornada.js";
import { Liga } from "../classes/Liga.js"; 
import { Clasificacion } from "../classes/Clasificacion.js";
import { Noticia } from "../classes/Noticia.js";
import { Usuario } from "../classes/Usuario.js";

/**
 * @typedef {Object} ActionTypeJugador
 * @property {string} type
 * @property {Jugador | PrimeraLinea} [jugador]
 */
/**
 * @typedef {Object} ActionTypeEquipo
 * @property {string} type
 * @property {Equipo} [equipo]
 */
/**
 * @typedef {Object} ActionTypePartido
 * @property {string} type
 * @property {Partido} [partido]
 */
/**
 * @typedef {Object} ActionTypeJornada
 * @property {string} type
 * @property {Jornada} [jornada]
 */
/**
 * @typedef {Object} ActionTypeLiga
 * @property {string} type
 * @property {Liga} [liga]
 */
/**
 * @typedef {Object} ActionTypeClasificacion
 * @property {string} type
 * @property {Clasificacion} [clasificacion]
 */
/**
 * @typedef {Object} ActionTypeNoticia
 * @property {string} type
 * @property {Noticia} [noticia]
 */
/**
 * @typedef {Object} ActionTypeUsuario
 * @property {string} type
 * @property {Usuario} [usuario]
 */
const ACTION_TYPES = {
    CREATE_JUGADOR: 'CREATE_JUGADOR',
    READ_LIST_JUGADORES: 'READ_LIST_JUGADORES',
    UPDATE_JUGADOR: 'UPDATE_JUGADOR',
    DELETE_JUGADOR: 'DELETE_JUGADOR',
    CREATE_EQUIPO: 'CREATE_EQUIPO',
    READ_LIST_EQUIPOS: 'READ_LIST_EQUIPOS', 
    UPDATE_EQUIPO: 'UPDATE_EQUIPO',
    DELETE_EQUIPO: 'DELETE_EQUIPO',
    CREATE_PARTIDO: 'CREATE_PARTIDO',
    READ_LIST_PARTIDOS: 'READ_LIST_PARTIDOS', 
    UPDATE_PARTIDO: 'UPDATE_PARTIDO',
    DELETE_PARTIDO: 'DELETE_PARTIDO',
    CREATE_JORNADA: 'CREATE_JORNADA',
    READ_LIST_JORNADAS: 'READ_LIST_JORNADAS',   
    UPDATE_JORNADA: 'UPDATE_JORNADA',
    DELETE_JORNADA: 'DELETE_JORNADA',
    CREATE_LIGA: 'CREATE_LIGA',
    READ_LIST_LIGAS: 'READ_LIST_LIGAS', 
    UPDATE_LIGA: 'UPDATE_LIGA', 
    DELETE_LIGA: 'DELETE_LIGA',
    CREATE_CLASIFICACION: 'CREATE_CLASIFICACION',
    READ_LIST_CLASIFICACIONES: 'READ_LIST_CLASIFICACIONES', 
    UPDATE_CLASIFICACION: 'UPDATE_CLASIFICACION',
    DELETE_CLASIFICACION: 'DELETE_CLASIFICACION',
    CREATE_NOTICIA: 'CREATE_NOTICIA',
    READ_LIST_NOTICIAS: 'READ_LIST_NOTICIAS',   
    UPDATE_NOTICIA: 'UPDATE_NOTICIA',
    DELETE_NOTICIA: 'DELETE_NOTICIA',
    CREATE_USUARIO: 'CREATE_USUARIO',
    READ_LIST_USUARIOS: 'READ_LIST_USUARIOS', 
    UPDATE_USUARIO: 'UPDATE_USUARIO',
    DELETE_USUARIO: 'DELETE_USUARIO'
  }

/**
 * @typedef {Object.<(string), any>} State
 * @property {Array<Jugador | PrimeraLinea>} jugadores
 * @property {Array<Equipo>} equipos
 * @property {Array<Partido>} partidos
 * @property {Array<Jornada>} jornadas
 * @property {Array<Liga>} ligas
 * @property {Array<Clasificacion>} clasificaciones
 * @property {Array<Noticia>} noticias
 * @property {Array<Usuario>} usuarios
 * @property {{mainLiga: string, mainNoticia: string}} mainInfo
 * @property {boolean} isLoading
 * @property {boolean} error
 */
  
/**
 * @type {State}
 */
const INITIAL_STATE = {
    jugadores: [],
    equipos: [],
    partidos: [],
    jornadas: [],
    ligas: [],
    clasificaciones: [],
    noticias: [],
    usuarios: [],
    mainInfo: {
        mainLiga: '',
        mainNoticia: ''
    },
    isLoading: false,
    error: false
}
  
/**
 * appReducer evalua el tipo de acción y actua de acuerdo
 * @param {State} state 
 * @param {ActionTypeJugador | ActionTypeEquipo | ActionTypePartido | ActionTypeJornada | ActionTypeLiga | ActionTypeClasificacion | ActionTypeNoticia | ActionTypeUsuario} action 
 * @returns {State}
 */
const appReducer = (state = INITIAL_STATE, action) => {
    const actionWithJugador = /** @type {ActionTypeJugador} */(action)
    const actionWithEquipo = /** @type {ActionTypeEquipo} */(action)
    const actionWithPartido = /** @type {ActionTypePartido} */(action)
    const actionWithJornada = /** @type {ActionTypeJornada} */(action)
    const actionWithLiga = /** @type {ActionTypeLiga} */(action)
    const actionWithClasificacion = /** @type {ActionTypeClasificacion} */(action)
    const actionWithNoticia = /** @type {ActionTypeNoticia} */(action)
    const actionWithUsuario = /** @type {ActionTypeUsuario} */(action)
    switch (action.type) {
        case ACTION_TYPES.CREATE_JUGADOR:
            return {
                ...state,
                jugadores: [
                    ...state.jugadores,
                    actionWithJugador.jugador
                ]
            };
        case ACTION_TYPES.READ_LIST_JUGADORES:
            return state;
        case ACTION_TYPES.UPDATE_JUGADOR:
            return {
                ...state,
                jugadores: state.jugadores.map((/** @type {Jugador | PrimeraLinea} */jugador) => jugador.id === actionWithJugador.jugador?.id ? actionWithJugador.jugador : jugador)
            };
        case ACTION_TYPES.DELETE_JUGADOR:
            return {
                ...state,
                jugadores: state.jugadores.filter((/** @type {Jugador | PrimeraLinea} */jugador) => jugador.id !== actionWithJugador.jugador?.id)
            };
        case ACTION_TYPES.CREATE_EQUIPO:
            return {
                ...state,
                equipos: [
                    ...state.equipos,
                    actionWithEquipo.equipo
                ]
            };
        case ACTION_TYPES.READ_LIST_EQUIPOS:
            return state;            
        case ACTION_TYPES.UPDATE_EQUIPO:    
            return {
                ...state,
                equipos: state.equipos.map((/** @type {Equipo} */ equipo) => equipo.id === actionWithEquipo.equipo?.id ? actionWithEquipo.equipo : equipo)
            };
        case ACTION_TYPES.DELETE_EQUIPO:
            return {
                ...state,
                equipos: state.equipos.filter((/** @type {Equipo} */ equipo) => equipo.id !== actionWithEquipo.equipo?.id)
            };
        case ACTION_TYPES.CREATE_PARTIDO:
            return {
                ...state,
                partidos: [
                    ...state.partidos,
                    actionWithPartido.partido
                ]
            };
        case ACTION_TYPES.READ_LIST_PARTIDOS:
            return state;
        case ACTION_TYPES.UPDATE_PARTIDO:
            return {
                ...state,
                partidos: state.partidos.map((/** @type {Partido} */partido) => partido.id === actionWithPartido.partido?.id ? actionWithPartido.partido : partido)
            };
        case ACTION_TYPES.DELETE_PARTIDO:
            return {
                ...state,
                partidos: state.partidos.filter((/** @type {Partido} */partido) => partido.id !== actionWithPartido.partido?.id)
            };
        case ACTION_TYPES.CREATE_JORNADA:
            return {
                ...state,
                jornadas: [
                    ...state.jornadas,
                    actionWithJornada.jornada
                ]
            };
        case ACTION_TYPES.READ_LIST_JORNADAS:
            return state;            
        case ACTION_TYPES.UPDATE_JORNADA:
            return {
                ...state,
                jornadas: state.jornadas.map((/** @type {Jornada} */jornada) => jornada.id === actionWithJornada.jornada?.id ? actionWithJornada.jornada : jornada)
            };
        case ACTION_TYPES.DELETE_JORNADA:
            return {
                ...state,
                jornadas: state.jornadas.filter((/** @type {Jornada} */jornada) => jornada.id !== actionWithJornada.jornada?.id)
            };
        case ACTION_TYPES.CREATE_LIGA:
            return {
                ...state,
                ligas: [
                    ...state.ligas,
                    actionWithLiga.liga
                ]
            };
        case ACTION_TYPES.READ_LIST_LIGAS:
            return state;            
        case ACTION_TYPES.UPDATE_LIGA:
            return {
                ...state,
                ligas: state.ligas.map((/** @type {Liga} */liga) => liga.id === actionWithLiga.liga?.id ? actionWithLiga.liga : liga)
            };
        case ACTION_TYPES.DELETE_LIGA:
            return {
                ...state,
                ligas: state.ligas.filter((/** @type {Liga} */liga) => liga.id !== actionWithLiga.liga?.id)
            };
        case ACTION_TYPES.CREATE_CLASIFICACION:
            return {
                ...state,
                clasificaciones: [
                    ...state.clasificaciones,
                    actionWithClasificacion.clasificacion
                ]
            };
        case ACTION_TYPES.READ_LIST_CLASIFICACIONES:
            return state;            
        case ACTION_TYPES.UPDATE_CLASIFICACION:
            return {
                ...state,
                clasificaciones: state.clasificaciones.map((/** @type {Clasificacion} */clasificacion) => clasificacion.id === actionWithClasificacion.clasificacion?.id ? actionWithClasificacion.clasificacion : clasificacion)
            };
        case ACTION_TYPES.DELETE_CLASIFICACION:
            return {
                ...state,
                clasificaciones: state.clasificaciones.filter((/** @type {Clasificacion} */clasificacion) => clasificacion.id !== actionWithClasificacion.clasificacion?.id)
            };
        case ACTION_TYPES.CREATE_NOTICIA:
            return {
                ...state,
                noticias: [
                    ...state.noticias,
                    actionWithNoticia.noticia
                ]
            };
        case ACTION_TYPES.READ_LIST_NOTICIAS:
            return state;            
        case ACTION_TYPES.UPDATE_NOTICIA:
            return {
                ...state,
                noticias: state.noticias.map((/** @type {Noticia} */noticia) => noticia.id === actionWithNoticia.noticia?.id ? actionWithNoticia.noticia : noticia)
            };
        case ACTION_TYPES.DELETE_NOTICIA:
            return {
                ...state,
                noticias: state.noticias.filter((/** @type {Noticia} */noticia) => noticia.id !== actionWithNoticia.noticia?.id)
            };
        case ACTION_TYPES.CREATE_USUARIO:
            return {
                ...state,
                usuarios: [
                    ...state.usuarios,
                    actionWithUsuario.usuario
                ]
            };
        case ACTION_TYPES.READ_LIST_USUARIOS:
            return state;            
        case ACTION_TYPES.UPDATE_USUARIO:
            return {
                ...state,
                usuarios: state.usuarios.map((/** @type {Usuario} */usuario) => usuario.id === actionWithUsuario.usuario?.id ? actionWithUsuario.usuario : usuario)
            };
        case ACTION_TYPES.DELETE_USUARIO:
            return {
                ...state,
                usuarios: state.usuarios.filter((/** @type {Usuario} */usuario) => usuario.id !== actionWithUsuario.usuario?.id)                    
            };
        default:
            return state;
    }
  }

/**
 * @typedef {Object} PublicMethods
 * @property {function} create
 * @property {function} read
 * @property {function} update
 * @property {function} delete
 * @property {function} getById
 */
/**
 * @typedef {Object} Store
 * @property {function} getState
 * @property {PublicMethods} jugador
 * @property {PublicMethods} equipo
 * @property {PublicMethods} partido
 * @property {PublicMethods} jornada
 * @property {PublicMethods} liga
 * @property {PublicMethods} clasificacion
 * @property {PublicMethods} noticia
 * @property {PublicMethods} usuario
 * @property {function} getJugadoresFromEquipoId
 * @property {function} getPartidosFromJornadaId
 * @property {function} getEquiposFromLigaId
 * @property {function} getJornadasFromLigaId
 */
 
/**
 * crea el singleton del store
 * @param {appReducer} reducer 
 * @returns {Store}
 */
const createStore = (reducer) => {
    let currentState = INITIAL_STATE
    let currentReducer = reducer
  
    // Actions
    /**
     * Crea un nuevo jugador en la Store
     * @param {Jugador | PrimeraLinea} jugador 
     * @returns 
     */
    const createJugador = (/** @type {Jugador} */jugador) => _dispatch({ type: ACTION_TYPES.CREATE_JUGADOR, jugador });
    /**
     * Lee una lista de jugadores
     * @returns
     */
    const readListJugadores = () => _dispatch({ type: ACTION_TYPES.READ_LIST_JUGADORES });
    /**
     * Actualiza un jugador de la Store
     * @param {Jugador | PrimeraLinea} jugador 
     * @returns 
     */
    const updateJugador = (/** @type {Jugador} */jugador) => _dispatch({ type: ACTION_TYPES.UPDATE_JUGADOR, jugador });
    /**
     * Borra un jugador de la Store
     * @param {Jugador | PrimeraLinea} jugador 
     * @returns 
     */
    const deleteJugador = (/** @type {Jugador} */jugador) => _dispatch({ type: ACTION_TYPES.DELETE_JUGADOR, jugador });
  
    /**
     * Crea un nuevo equipo en la Store
     * @param {Equipo} equipo 
     * @returns 
     */
    const createEquipo = (/** @type {Equipo} */equipo) => _dispatch({ type: ACTION_TYPES.CREATE_EQUIPO, equipo });
    /**
     * Lee una lista de equipos
     * @returns 
     */
    const readListEquipos = () => _dispatch({ type: ACTION_TYPES.READ_LIST_EQUIPOS });
    /**
     * Actualiza un equipo de la Store
     * @param {Equipo} equipo 
     * @returns
     */
    const updateEquipo = (/** @type {Equipo} */equipo) => _dispatch({ type: ACTION_TYPES.UPDATE_EQUIPO, equipo });
    /**
     * Borra un equipo de la Store
     * @param {Equipo} equipo 
     * @returns 
     */
    const deleteEquipo = (/** @type {Equipo} */equipo) => _dispatch({ type: ACTION_TYPES.DELETE_EQUIPO, equipo });
    
    /**
     * Crea un nuevo partido en la Store
     * @param {Partido} partido 
     * @returns 
     */
    const createPartido = (/** @type {Partido} */partido) => _dispatch({ type: ACTION_TYPES.CREATE_PARTIDO, partido });
    /**
     * Lee una lista de partidos
     * @returns 
     */
    const readListPartidos = () => _dispatch({ type: ACTION_TYPES.READ_LIST_PARTIDOS });    
    /**
     * Actualiza un partido de la Store
     * @param {Partido} partido 
     * @returns 
     */
    const updatePartido = (/** @type {Partido} */partido) => _dispatch({ type: ACTION_TYPES.UPDATE_PARTIDO, partido });
    /**
     * Borra un partido de la Store
     * @param {Partido} partido 
     * @returns 
     */
    const deletePartido = (/** @type {Partido} */partido) => _dispatch({ type: ACTION_TYPES.DELETE_PARTIDO, partido });  

    /**
     * Crea una nueva jornada en la Store
     * @param {Jornada} jornada 
     * @returns 
     */
    const createJornada = (/** @type {Jornada} */jornada) => _dispatch({ type: ACTION_TYPES.CREATE_JORNADA, jornada });
    /**
     * Lee una lista de jornadas
     * @returns 
     */
    const readListJornadas = () => _dispatch({ type: ACTION_TYPES.READ_LIST_JORNADAS });    
    /**
     * Actualiza una jornada de la Store
     * @param {Jornada} jornada 
     * @returns 
     */
    const updateJornada = (/** @type {Jornada} */jornada) => _dispatch({ type: ACTION_TYPES.UPDATE_JORNADA, jornada });
    /**
     * Borra una jornada de la Store
     * @param {Jornada} jornada 
     * @returns 
     */
    const deleteJornada = (/** @type {Jornada} */jornada) => _dispatch({ type: ACTION_TYPES.DELETE_JORNADA, jornada });

    /**
     * Crea una nueva liga en la Store
     * @param {Liga} liga 
     * @returns 
     */
    const createLiga = (/** @type {Liga} */liga) => _dispatch({ type: ACTION_TYPES.CREATE_LIGA, liga });
    /**
     * Lee una lista de ligas
     * @returns 
     */
    const readListLigas = () => _dispatch({ type: ACTION_TYPES.READ_LIST_LIGAS });    
    /**
     * Actualiza una liga de la Store
     * @param {Liga} liga 
     * @returns 
     */
    const updateLiga = (/** @type {Liga} */liga) => _dispatch({ type: ACTION_TYPES.UPDATE_LIGA, liga });
    /**
     * Borra una liga de la Store
     * @param {Liga} liga 
     * @returns 
     */
    const deleteLiga = (/** @type {Liga} */liga) => _dispatch({ type: ACTION_TYPES.DELETE_LIGA, liga });

    /**
     * Crea una nueva clasificacion en la Store
     * @param {Clasificacion} clasificacion 
     * @returns 
     */
    const createClasificacion = (/** @type {Clasificacion} */clasificacion) => _dispatch({ type: ACTION_TYPES.CREATE_CLASIFICACION, clasificacion });
    /**
     * Lee una lista de clasificaciones 
     * @returns 
     */
    const readListClasificaciones = () => _dispatch({ type: ACTION_TYPES.READ_LIST_CLASIFICACIONES });    
    /**
     * Actualiza una clasificacion de la Store
     * @param {Clasificacion} clasificacion 
     * @returns 
     */
    const updateClasificacion = (/** @type {Clasificacion} */clasificacion) => _dispatch({ type: ACTION_TYPES.UPDATE_CLASIFICACION, clasificacion });
    /**
     * Borra una clasificacion de la Store
     * @param {Clasificacion} clasificacion 
     * @returns 
     */
    const deleteClasificacion = (/** @type {Clasificacion} */clasificacion) => _dispatch({ type: ACTION_TYPES.DELETE_CLASIFICACION, clasificacion });

    /**
     * Crea una nueva noticia en la Store
     * @param {Noticia} noticia 
     * @returns 
     */
    const createNoticia = (/** @type {Noticia} */noticia) => _dispatch({ type: ACTION_TYPES.CREATE_NOTICIA, noticia });
    /**
     * Lee una lista de noticias
     * @returns 
     */
    const readListNoticias = () => _dispatch({ type: ACTION_TYPES.READ_LIST_NOTICIAS });    
    /**
     * Actualiza una noticia de la Store
     * @param {Noticia} noticia 
     * @returns 
     */
    const updateNoticia = (/** @type {Noticia} */noticia) => _dispatch({ type: ACTION_TYPES.UPDATE_NOTICIA, noticia });
    /**
     * Borra una noticia de la Store
     * @param {Noticia} noticia 
     * @returns 
     */
    const deleteNoticia = (/** @type {Noticia} */noticia) => _dispatch({ type: ACTION_TYPES.DELETE_NOTICIA, noticia });

    /**
     * Crea un nuevo usuario en la Store
     * @param {Usuario} usuario 
     * @returns 
     */
    const createUsuario = (/** @type {Usuario} */usuario) => _dispatch({ type: ACTION_TYPES.CREATE_USUARIO, usuario });
    /**
     * Lee una lista de usuarios
     * @returns 
     */
    const readListUsuarios = () => _dispatch({ type: ACTION_TYPES.READ_LIST_USUARIOS });    
    /**
     * Actualiza un usuario de la Store
     * @param {Usuario} usuario 
     * @returns 
     */
    const updateUsuario = (/** @type {Usuario} */usuario) => _dispatch({ type: ACTION_TYPES.UPDATE_USUARIO, usuario });
    /**
     * Borra un usuario de la Store
     * @param {Usuario} usuario 
     * @returns 
     */
    const deleteUsuario = (/** @type {Usuario} */usuario) => _dispatch({ type: ACTION_TYPES.DELETE_USUARIO, usuario });
  
    // Public methods
    const getState = () => { return currentState };

    /**
     * Obtiene un jugador por su id
     * @param {string} id 
     * @returns {Jugador |PrimeraLinea | undefined}
     */
    const getJugadorById = (id) => {
        return currentState.jugadores.find(/**@param {Jugador} jugador*/jugador => jugador.id === id)
    }

    /**
     * Obtiene un equipo por su id
     * @param {string} id El id del equipo a buscar
     * @returns {Equipo | undefined} El equipo encontrado o undefined si no se encuentra
     */
    const getEquipoById = (id) => {
        return currentState.equipos.find(/**@param {Equipo} equipo*/equipo => equipo.id === id)
    }

    /**
     * Obtenemos todos los jugadores de un equipo
     * @param {string} id 
     * @returns 
     */
    const getJugadoresFromEquipoId = (id) => {
        const equipo = getEquipoById(id)
        /** @type {(Jugador | PrimeraLinea)[]} */
        const jugadores = []
        equipo?.jugadores.forEach(jugadorId => {
            const selectedJugador = getJugadorById(jugadorId)
            if (selectedJugador) (jugadores.push(selectedJugador))
        })
        return jugadores
    }

    /**
     * Obtiene un partido por su id
     * @param {string} id El id del partido a buscar
     * @returns {Partido | undefined} El partido encontrado o undefined si no se encuentra
     */
    const getPartidoById = (id) => {
      return currentState.partidos.find(/**@param {Partido} partido*/partido => partido.id === id)
    }

    /**
     * Obtiene una jornada por su id
     * @param {string} id 
     * @returns 
     */
    const getJornadaById = (id) => {
      return currentState.jornadas.find(/**@param {Jornada} jornada*/jornada => jornada.id === id)
    }

    /**
     * Obtenemos todos los partidos de una jornada
     * @param {string} id 
     * @returns {Partido[]}
     */
    const getPartidosFromJornadaId = (id) => {
      const jornada = getJornadaById(id)
      /** @type {Partido[]} */
      const partidos = []
      jornada?.partidos.forEach(/**@param {string} partidoId*/partidoId => {
        const partido = getPartidoById(partidoId)
        if (partido) (partidos.push(partido))
      })
      return partidos
    }

    /**
     * Obtiene una liga por su id
     * @param {string} id 
     * @returns 
     */
    const getLigaById = (id) => {
      return currentState.ligas.find(/**@param {Liga} liga*/liga => liga.id === id)
    }

    /**
     * Obtiene las jornadas de una liga por su id
     * @param {string} id El id de la liga a buscar
     * @returns {Jornada[]} Las jornadas encontradas o un array vacio si no se encuetra
     */
    const getJornadasFromLigaId = (id) => {
      const liga = getLigaById(id)
      /** @type {Jornada[]} */
      const jornadas = []
      liga?.jornadas.forEach(/**@param {string} jornadaId*/jornadaId => {
        const jornada = getJornadaById(jornadaId)
        if (jornada) (jornadas.push(jornada))
      })
      return jornadas
    }

    /**
     * Obtiene los equipos de una liga por su id
     * @param {string} id El id de la liga a buscar
     * @returns {Equipo[]} Los equipos encontrados o un array vacio si no se encuetra
     */
    const getEquiposFromLigaId = (id) => {
      const liga = getLigaById(id)
      /** @type {Equipo[]} */
      const equipos = []
      liga?.equipos.forEach(/**@param {string} equipoId*/equipoId => {
        const equipo = getEquipoById(equipoId)
        if (equipo) (equipos.push(equipo))
      })
      return equipos
    }

    /**
     * Obtiene una clasificacion por su id
     * @param {string} id 
     * @returns 
     */
    const getClasificacionById = (id) => {
      return currentState.clasificaciones.find(/**@param {Clasificacion} clasificacion*/clasificacion => clasificacion.id === id)
    }


    /**
     * Obtiene una noticia por su id
     * @param {string} id 
     * @returns 
     */
    const getNoticiaById = (id) => {
      return currentState.noticias.find(/**@param {Noticia} noticia*/noticia => noticia.id === id)
    }   

    /**
     * Obtiene un usuario por su id
     * @param {string} id 
     * @returns 
     */
    const getUsuarioById = (id) => {
      return currentState.usuarios.find(/**@param {Usuario} usuario*/usuario => usuario.id === id)    
    }

  
    // Private methods
    /**
     * 
     * @param {ActionTypeJugador | ActionTypeEquipo | ActionTypePartido | ActionTypeJornada | ActionTypeLiga | ActionTypeClasificacion | ActionTypeNoticia | ActionTypeUsuario} action 
     * @param {function | undefined} [onEventDispatched]
     */
    const _dispatch = (action, onEventDispatched) => {
      let previousValue = currentState;
      let currentValue = currentReducer(currentState, action);
      currentState = currentValue;
      // TODO: CHECK IF IS MORE ADDECUATE TO SWITCH TO EventTarget: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
      window.dispatchEvent(new CustomEvent('stateChanged', {
          detail: {
              changes: _getDifferences(previousValue, currentValue)
          },
          cancelable: true,
          composed: true,
          bubbles: true
      }));
      if (onEventDispatched) {
          onEventDispatched();
      }
    }

    /**
     * Returns a new object with the differences between the `previousValue` and
     * `currentValue` objects. It's used to create a payload for the "stateChanged"
     * event, which is dispatched by the store every time it changes.
     *
     * @param {State} previousValue - The old state of the store.
     * @param {State} currentValue - The new state of the store.
     * @returns {Object} - A new object with the differences between the two
     *     arguments.
     * @private
     */
    const _getDifferences = (previousValue, currentValue) => {
      return Object.keys(currentValue).reduce((diff, key) => {
          if (previousValue[key] === currentValue[key]) return diff
          return {
              ...diff,
              [key]: currentValue[key]
          };
      }, {});
    }
    
    // namespaces actions
    const jugador ={
        create: createJugador,
        read: readListJugadores,
        update: updateJugador,
        delete: deleteJugador,
        getById: getJugadorById
    }
    const equipo = {    
        create: createEquipo,    
        read: readListEquipos,
        update: updateEquipo,
        delete: deleteEquipo,    
        getById: getEquipoById
    }
    const partido = {
        create: createPartido,
        read: readListPartidos,
        update: updatePartido,
        delete: deletePartido,
        getById: getPartidoById
    }
    const jornada = {
        create: createJornada,
        read: readListJornadas,
        update: updateJornada,
        delete: deleteJornada,
        getById: getJornadaById
    }
    const liga = {
        create: createLiga,    
        read: readListLigas,
        update: updateLiga,
        delete: deleteLiga,
        getById: getLigaById
    }
    const clasificacion = {
        create: createClasificacion,
        read: readListClasificaciones,
        update: updateClasificacion,
        delete: deleteClasificacion,
        getById: getClasificacionById
    }
    const noticia = {
        create: createNoticia,
        read: readListNoticias,
        update: updateNoticia,
        delete: deleteNoticia,
        getById: getNoticiaById
    }
    const usuario = {
        create: createUsuario,
        read: readListUsuarios,
        update: updateUsuario,
        delete: deleteUsuario,
        getById: getUsuarioById
    }

    return {
        getState,
        jugador,
        equipo,
        partido,
        jornada,
        liga,
        clasificacion,
        noticia,
        usuario,
        getJugadoresFromEquipoId,
        getPartidosFromJornadaId,
        getEquiposFromLigaId,
        getJornadasFromLigaId
    }
  }
  
// Export store
export const store = createStore(appReducer)