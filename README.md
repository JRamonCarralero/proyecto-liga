# proyecto-liga

Vamos a realizar una web con información de ligas de rugby.

## Funcionalidad

Una página pública que contará con 3 apartados

* Página de inicio
* Página de noticias, con buscador, paginación y detalle de noticias
* Página de competición, con la información de las distintas ligas (equipos, jugadores, jornadas, partidos, clasificaciones, estadísticas)

La parte de administración, que constará de:

* Gestión de usuarios
* Gestión de noticias
* Creación y gestión de Equipos y Jugadores
* Creación y edición de Ligas y lo relativo a estas (Jornadas, Partidos, Clasificación y Estadísticas)

## Metodología

* Front: HTML, CSS y JavaScript
* Back: Servidor nodeJS con ExpressJS
* BBDD: MongoDB
* Principios SOLID
* Se ha utilizado una store de Redux para gestionar información y reducir el número de peticiones al servidor
* TypeScript para el tipado del código
* JSdocs para la documentación
* GitHub para gestión de repositorios
* GitHooks y Linters para comprobación de errores en el código

## Datos

AccionesPartido = {
    _id
    partidoId
    minuto
    jugadorId
    equipoId
    accion
}

Clasificacion = {
    _id
    ligaId
    equipoId
    puntos
    partidosJugados
    partidosGanados
    partidosEmpatados
    partidosPerdidos
    puntosAnotados
    puntosRecibidos
}

Equipo = {
    _id
    nombre
    poblacion
    direccion
    estadio
}

EstadisticaJugador = {
    _id
    ligaId
    equipoId
    jugadorId
    ensayos
    puntosPie
    puntos
    tAmarillas
    tRojas
}

Jornada = {
    _id
    fecha
    numero
    ligaId
}

Jugador = {
    _id
    nombre
    apellidos
    nacionalidad
    altura
    peso
    equipoId
}

Liga = {
    _id
    nombre
    year
    equipos
    main
}

Noticia = {
    _id
    fecha
    titulo
    cabecera
    imagen
    contenido
}

Partido = {
    _id
    jornadaId
    ligaId
    local
    visitante
    puntosLocal
    puntosVisitante
    puntosCLocal
    puntosCVisitante
    jugadoresLocal
    jugadoresVisitante
    fecha
    jugado
}

Usuario = {
    _id
    nombre
    apellidos
    nickname
    email
    rol
    password
}
