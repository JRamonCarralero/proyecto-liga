// @ts-check
/** @import { Jugador, PrimeraLinea } from "../classes/Jugador.js"; */
/** @import { Equipo } from "../classes/Equipo.js"; */
/** @import { Partido } from "../classes/Partido.js"; */
/** @import { Jornada } from "../classes/Jornada.js"; */
/** @import { Liga } from "../classes/Liga.js";  */
/** @import { Clasificacion } from "../classes/Clasificacion.js"; */
/** @import { Noticia } from "../classes/Noticia.js"; */
/** @import { Usuario } from "../classes/Usuario.js"; */

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
            return state.equipos;
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
            console.log('update partido')
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
            console.log('update clasificacion')
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
 * @property {function} getAll
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
 * @property {function} getClasificacionesFromLigaId
 * @property {function} deleteJugadorFromEquipoId
 * @property {function} deleteClasificacionesFromLigaId
 * @property {function} getClasificacionByLigaAndEquipo
 * @property {function} getLigasByYear
 * @property {function} getNoticiasByTituloInclude
 * @property {function} loadState
 * @property {function} saveState
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
     * @param {function | undefined} [onEventDispatched]
     * @returns void
     */
    const createJugador = (jugador, onEventDispatched) => _dispatch({ type: ACTION_TYPES.CREATE_JUGADOR, jugador }, onEventDispatched);
    /**
     * Lee una lista de jugadores
     * @param {function | undefined} [onEventDispatched]
     * @returns void
     */
    const readListJugadores = (onEventDispatched) => _dispatch({ type: ACTION_TYPES.READ_LIST_JUGADORES }, onEventDispatched);
    /**
     * Actualiza un jugador de la Store
     * @param {Jugador | PrimeraLinea} jugador 
     * @param {function | undefined} [onEventDispatched]
     * @returns void
     */
    const updateJugador = (jugador, onEventDispatched) => _dispatch({ type: ACTION_TYPES.UPDATE_JUGADOR, jugador }, onEventDispatched);
    /**
     * Borra un jugador de la Store
     * @param {Jugador | PrimeraLinea} jugador 
     * @param {function | undefined} [onEventDispatched]
     * @returns void
     */
    const deleteJugador = (jugador, onEventDispatched) => _dispatch({ type: ACTION_TYPES.DELETE_JUGADOR, jugador }, onEventDispatched);
  
    /**
     * Crea un nuevo equipo en la Store
     * @param {Equipo} equipo 
     * @param {function | undefined} [onEventDispatched]
     * @returns void
     */
    const createEquipo = (equipo, onEventDispatched) => _dispatch({ type: ACTION_TYPES.CREATE_EQUIPO, equipo }, onEventDispatched);
    /**
     * Lee una lista de equipos
     * @param {function | undefined} [onEventDispatched]
     * @returns void
     */
    const readListEquipos = (onEventDispatched) => _dispatch({ type: ACTION_TYPES.READ_LIST_EQUIPOS }, onEventDispatched);
    /**
     * Actualiza un equipo de la Store
     * @param {Equipo} equipo 
     * @param {function | undefined} [onEventDispatched]
     * @returns void
     */
    const updateEquipo = (equipo, onEventDispatched) => _dispatch({ type: ACTION_TYPES.UPDATE_EQUIPO, equipo }, onEventDispatched);
    /**
     * Borra un equipo de la Store
     * @param {Equipo} equipo 
     * @param {function | undefined} [onEventDispatched]
     * @returns void
     */
    const deleteEquipo = (equipo, onEventDispatched) => _dispatch({ type: ACTION_TYPES.DELETE_EQUIPO, equipo }, onEventDispatched);
    
    /**
     * Crea un nuevo partido en la Store
     * @param {Partido} partido 
     * @param {function | undefined} [onEventDispatched]
     * @returns void
     */
    const createPartido = (partido, onEventDispatched) => _dispatch({ type: ACTION_TYPES.CREATE_PARTIDO, partido }, onEventDispatched);
    /**
     * Lee una lista de partidos
     * @param {function | undefined} [onEventDispatched]
     * @returns void
     */
    const readListPartidos = (onEventDispatched) => _dispatch({ type: ACTION_TYPES.READ_LIST_PARTIDOS }, onEventDispatched);    
    /**
     * Actualiza un partido de la Store
     * @param {Partido} partido 
     * @param {function | undefined} [onEventDispatched]
     * @returns void
     */
    const updatePartido = (partido, onEventDispatched) => _dispatch({ type: ACTION_TYPES.UPDATE_PARTIDO, partido }, onEventDispatched);
    /**
     * Borra un partido de la Store
     * @param {Partido} partido 
     * @param {function | undefined} [onEventDispatched]
     * @returns void
     */
    const deletePartido = (partido, onEventDispatched) => _dispatch({ type: ACTION_TYPES.DELETE_PARTIDO, partido }, onEventDispatched);  

    /**
     * Crea una nueva jornada en la Store
     * @param {Jornada} jornada 
     * @param {function | undefined} [onEventDispatched]
     * @returns void
     */
    const createJornada = (jornada, onEventDispatched) => _dispatch({ type: ACTION_TYPES.CREATE_JORNADA, jornada }, onEventDispatched);
    /**
     * Lee una lista de jornadas
     * @param {function | undefined} [onEventDispatched]
     * @returns void
     */
    const readListJornadas = (onEventDispatched) => _dispatch({ type: ACTION_TYPES.READ_LIST_JORNADAS }, onEventDispatched);    
    /**
     * Actualiza una jornada de la Store
     * @param {Jornada} jornada 
     * @param {function | undefined} [onEventDispatched]
     * @returns void
     */
    const updateJornada = (jornada, onEventDispatched) => _dispatch({ type: ACTION_TYPES.UPDATE_JORNADA, jornada }, onEventDispatched);
    /**
     * Borra una jornada de la Store
     * @param {Jornada} jornada 
     * @param {function | undefined} [onEventDispatched]
     * @returns void
     */
    const deleteJornada = (jornada, onEventDispatched) => _dispatch({ type: ACTION_TYPES.DELETE_JORNADA, jornada }, onEventDispatched);

    /**
     * Crea una nueva liga en la Store
     * @param {Liga} liga 
     * @param {function | undefined} [onEventDispatched]
     * @returns void
     */
    const createLiga = (liga, onEventDispatched) => _dispatch({ type: ACTION_TYPES.CREATE_LIGA, liga }, onEventDispatched);
    /**
     * Lee una lista de ligas
     * @param {function | undefined} [onEventDispatched]
     * @returns void
     */
    const readListLigas = (onEventDispatched) => _dispatch({ type: ACTION_TYPES.READ_LIST_LIGAS }, onEventDispatched);    
    /**
     * Actualiza una liga de la Store
     * @param {Liga} liga 
     * @param {function | undefined} [onEventDispatched]
     * @returns void
     */
    const updateLiga = (liga, onEventDispatched) => _dispatch({ type: ACTION_TYPES.UPDATE_LIGA, liga }, onEventDispatched);
    /**
     * Borra una liga de la Store
     * @param {Liga} liga 
     * @param {function | undefined} [onEventDispatched]
     * @returns void
     */
    const deleteLiga = (liga, onEventDispatched) => _dispatch({ type: ACTION_TYPES.DELETE_LIGA, liga }, onEventDispatched);

    /**
     * Crea una nueva clasificacion en la Store
     * @param {Clasificacion} clasificacion 
     * @param {function | undefined} [onEventDispatched]
     * @returns void
     */
    const createClasificacion = (clasificacion, onEventDispatched) => _dispatch({ type: ACTION_TYPES.CREATE_CLASIFICACION, clasificacion }, onEventDispatched);
    /**
     * Lee una lista de clasificaciones 
     * @param {function | undefined} [onEventDispatched]
     * @returns void
     */
    const readListClasificaciones = (onEventDispatched) => _dispatch({ type: ACTION_TYPES.READ_LIST_CLASIFICACIONES }, onEventDispatched);    
    /**
     * Actualiza una clasificacion de la Store
     * @param {Clasificacion} clasificacion 
     * @param {function | undefined} [onEventDispatched]
     * @returns void
     */
    const updateClasificacion = (clasificacion, onEventDispatched) => _dispatch({ type: ACTION_TYPES.UPDATE_CLASIFICACION, clasificacion }, onEventDispatched);
    /**
     * Borra una clasificacion de la Store
     * @param {Clasificacion} clasificacion 
     * @param {function | undefined} [onEventDispatched]
     * @returns void
     */
    const deleteClasificacion = (clasificacion, onEventDispatched) => _dispatch({ type: ACTION_TYPES.DELETE_CLASIFICACION, clasificacion }, onEventDispatched);

    /**
     * Crea una nueva noticia en la Store
     * @param {Noticia} noticia 
     * @param {function | undefined} [onEventDispatched]
     * @returns void
     */
    const createNoticia = (noticia, onEventDispatched) => _dispatch({ type: ACTION_TYPES.CREATE_NOTICIA, noticia }, onEventDispatched);
    /**
     * Lee una lista de noticias
     * @param {function | undefined} [onEventDispatched]
     * @returns void
     */
    const readListNoticias = (onEventDispatched) => _dispatch({ type: ACTION_TYPES.READ_LIST_NOTICIAS }, onEventDispatched);    
    /**
     * Actualiza una noticia de la Store
     * @param {Noticia} noticia 
     * @param {function | undefined} [onEventDispatched]
     * @returns void
     */
    const updateNoticia = (noticia, onEventDispatched) => _dispatch({ type: ACTION_TYPES.UPDATE_NOTICIA, noticia }, onEventDispatched);
    /**
     * Borra una noticia de la Store
     * @param {Noticia} noticia 
     * @param {function | undefined} [onEventDispatched]
     * @returns void
     */
    const deleteNoticia = (noticia, onEventDispatched) => _dispatch({ type: ACTION_TYPES.DELETE_NOTICIA, noticia }, onEventDispatched);

    /**
     * Crea un nuevo usuario en la Store
     * @param {Usuario} usuario 
     * @param {function | undefined} [onEventDispatched]
     * @returns void
     */
    const createUsuario = (usuario, onEventDispatched) => _dispatch({ type: ACTION_TYPES.CREATE_USUARIO, usuario }, onEventDispatched);
    /**
     * Lee una lista de usuarios
     * @param {function | undefined} [onEventDispatched]
     * @returns void
     */
    const readListUsuarios = (onEventDispatched) => _dispatch({ type: ACTION_TYPES.READ_LIST_USUARIOS }, onEventDispatched);    
    /**
     * Actualiza un usuario de la Store
     * @param {Usuario} usuario 
     * @param {function | undefined} [onEventDispatched]
     * @returns void
     */
    const updateUsuario = (usuario, onEventDispatched) => _dispatch({ type: ACTION_TYPES.UPDATE_USUARIO, usuario }, onEventDispatched);
    /**
     * Borra un usuario de la Store
     * @param {Usuario} usuario 
     * @param {function | undefined} [onEventDispatched]
     * @returns 
     */
    const deleteUsuario = (usuario, onEventDispatched) => _dispatch({ type: ACTION_TYPES.DELETE_USUARIO, usuario }, onEventDispatched);
  
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
     * Obtiene todas las clasificaciones de una liga por su id
     * @param {string} id El id de la liga a buscar
     * @returns {(Clasificacion | undefined) []} Las clasificaciones encontradas o un array vacio si no se encuetra
     */
    const getClasificacionesFromLigaId = (id) => {
        const clasificaciones = getAllClasificaciones().filter(/**@param {Clasificacion} clasificacion*/clasificacion => clasificacion.liga === id)
        const clasificacionesOrdenadas = clasificaciones.sort((a,b) => {
            const aClasificacion = /** @type {Clasificacion} */(a)
            const bClasificacion = /** @type {Clasificacion} */(b)
            if (aClasificacion.puntos != bClasificacion.puntos) {
                if (aClasificacion.puntos > bClasificacion.puntos) {
                    return -1
                } else {
                    return 1
                }
            } else {
                const puntosA = aClasificacion.puntosAnotados - aClasificacion.puntosRecibidos
                const puntosB = bClasificacion.puntosAnotados - bClasificacion.puntosRecibidos
                if (puntosA != puntosB) {
                    if (puntosA > puntosB) {
                        return -1
                    } else {
                        return 1
                    }
                } else return 0
            }
        })
        return clasificacionesOrdenadas
    }

    /**
     * Obtiene todos los jugadores en la store
     * @returns {Array<Jugador | PrimeraLinea>} Un array con todos los jugadores
     */
    const getAllJugadores = () => {
      return currentState.jugadores
    }

    /**
     * Obtiene todos los equipos en la store
     * @returns {Equipo[]} Un array con todos los equipos
     */
    const getAllEquipos = () => {
      return currentState.equipos
    }

    /**
     * Obtiene todos los partidos en la store
     * @returns {Partido[]} Un array con todos los partidos
     */
    const getAllPartidos = () => {
      return currentState.partidos
    }

    /**
     * Obtiene todas las jornadas en la store
     * @returns {Jornada[]} Un array con todas las jornadas
     */
    const getAllJornadas = () => {
      return currentState.jornadas
    }

    /**
     * Obtiene todas las ligas en la store
     * @returns {Liga[]} Un array con todas las ligas
     */
    const getAllLigas = () => {
      return currentState.ligas
    }   

    /**
     * Obtiene todas las clasificaciones en la store
     * @returns {Clasificacion[]} Un array con todas las clasificaciones
     */
    const getAllClasificaciones = () => {
      return currentState.clasificaciones
    }

    /**
     * Obtiene todas las noticias en la store
     * @returns {Noticia[]} Un array con todas las noticias
     */
    const getAllNoticias = () => {
      return currentState.noticias
    }

    /**
     * Obtiene todos los usuarios en la store
     * @returns {Usuario[]} Un array con todos los usuarios
     */
    const getAllUsuarios = () => {
      return currentState.usuarios
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

    /**
     * Borra un jugador de un equipo en la Store
     * @param {string} equipoId id del equipo del que se va a borrar el jugador
     * @param {string} jugadorId id del jugador que se va a borrar
     */
    const deleteJugadorFromEquipoId = (equipoId, jugadorId) => {
      const equipo = getEquipoById(equipoId)
      equipo?.jugadores.splice(equipo?.jugadores.indexOf(jugadorId), 1)
    }

    /**
     * Borra todas las clasificaciones asociadas con una liga específica.
     * @param {string} ligaId - El ID de la liga cuyas clasificaciones serán eliminadas.
     */
    const deleteClasificacionesFromLigaId = (ligaId) => {
        const clasificaciones = getAllClasificaciones()
        clasificaciones.forEach(/**@param {Clasificacion} clasificacion*/clasificacion => {
            if (clasificacion.liga === ligaId) {
                store.clasificacion.delete(clasificacion,() => store.saveState())
            }
        })
    }

    /**
     * Obtiene la clasificación asociada a una liga y un equipo determinados.
     * @param {string} ligaId - El ID de la liga de la clasificación que se va a obtener.
     * @param {string} equipoId - El ID del equipo de la clasificación que se va a obtener.
     * @returns {Clasificacion | undefined} La clasificación asociada a la liga y el equipo especificados, o undefined si no se encuentra.
     */
    const getClasificacionByLigaAndEquipo = (ligaId, equipoId) => {
        const clasificaciones = getAllClasificaciones()
        return clasificaciones.find(/**@param {Clasificacion} clasificacion*/clasificacion => clasificacion.liga === ligaId && clasificacion.equipo === equipoId)
    }

    /**
     * Obtiene todas las ligas que se celebraron en un determinado año
     * @param {string} year - El año de las ligas que se van a obtener
     * @returns {Liga[]} Un array con todas las ligas que se celebraron en el año especificado
     */
    const getLigasByYear = (year) => {
        if (year === 'all') return getAllLigas()
        const ligas = getAllLigas()
        return ligas.filter(/**@param {Liga} liga*/liga => liga.year === year)
    }

    /**
     * Obtiene todas las noticias que incluyen en su título la cadena dada.
     * @param {string} titulo - La cadena que se va a buscar en el título de las noticias.
     * @returns {Noticia[]} Un array con todas las noticias que incluyen la cadena dada en su título.
     */
    const getNoticiasByTituloInclude = (titulo) => {
        const noticias = getAllNoticias()
        return noticias.filter(/**@param {Noticia} noticia*/noticia => noticia.titulo.toLowerCase().includes(titulo.toLowerCase()))
    }

    /**
     * Obtiene la información cargada en localStorage y la guarda en la store
     */
    const loadState = () => {
        const state = localStorage.getItem('storedData');
        if (state) {
            currentState = JSON.parse(state);
        }
    }

    /**
     * Guarda la información de la store en localStorage
     */
    const saveState = () => {
        localStorage.setItem('storedData', JSON.stringify(currentState));
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
          console.log('onEventDispatched', onEventDispatched);
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
        getById: getJugadorById,
        getAll: getAllJugadores
    }
    const equipo = {    
        create: createEquipo,    
        read: readListEquipos,
        update: updateEquipo,
        delete: deleteEquipo,    
        getById: getEquipoById,
        getAll: getAllEquipos
    }
    const partido = {
        create: createPartido,
        read: readListPartidos,
        update: updatePartido,
        delete: deletePartido,
        getById: getPartidoById,
        getAll: getAllPartidos
    }
    const jornada = {
        create: createJornada,
        read: readListJornadas,
        update: updateJornada,
        delete: deleteJornada,
        getById: getJornadaById,
        getAll: getAllJornadas
    }
    const liga = {
        create: createLiga,    
        read: readListLigas,
        update: updateLiga,
        delete: deleteLiga,
        getById: getLigaById,
        getAll: getAllLigas
    }
    const clasificacion = {
        create: createClasificacion,
        read: readListClasificaciones,
        update: updateClasificacion,
        delete: deleteClasificacion,
        getById: getClasificacionById,
        getAll: getAllClasificaciones
    }
    const noticia = {
        create: createNoticia,
        read: readListNoticias,
        update: updateNoticia,
        delete: deleteNoticia,
        getById: getNoticiaById,
        getAll: getAllNoticias
    }
    const usuario = {
        create: createUsuario,
        read: readListUsuarios,
        update: updateUsuario,
        delete: deleteUsuario,
        getById: getUsuarioById,
        getAll: getAllUsuarios
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
        getJornadasFromLigaId,
        getClasificacionesFromLigaId,
        deleteJugadorFromEquipoId,
        deleteClasificacionesFromLigaId,
        getClasificacionByLigaAndEquipo,
        getLigasByYear,
        getNoticiasByTituloInclude,
        loadState,
        saveState
    }
  }
  
// Export store
export const store = createStore(appReducer)