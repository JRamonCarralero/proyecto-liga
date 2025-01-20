# proyecto-liga

Vamos a realizar una web con información de una liga de rugby.

Página principal:

1. menu de navegacion
    1. home
    2. noticias
    3. competición
2. leer cabecera noticias principales
3. mostrar cabeceras noticias principales en pantalla
    1. acceso a la noticia completa
4. valorar que más contenido mostrar al inicio

Pagina de noticias:

1. menu de navegacion
    1. home
    2. noticias
    3. competición
2. buscador de noticias
    1. titulo contiene palabras
3. mostrar noticia elegida en pantalla

Página competición:

1. menu de navegación
    1. home
    2. noticias
    3. competición
2. menu navegación competición
    1. calendario
    2. clasificacion
    3. jornadas
    4. equipos
3. leer calendario actual
4. mostrar calendario
5. clasificación actual
6. mostrar clasificación
7. leer jornadas
8. mostrar la jornada actual
9. mostrar la jornada elegida
10. leer partidos
11. mostrar informacion de partidos
12. leer equipos
13. mostrar información de equipos
14. leer jugadores
15. mostrar información de jugadores

Administración:

1. menu de navegación
    1. login
        1. registro de usuario
        2. login de usuario
        3. logout de usuario
    2. noticias
    3. jugadores
    4. equipos
    5. partidos
    6. jornadas
    7. calendario
    8. clasificación
    9. usuarios
2. crear, leer, editar, borrar noticias
3. crear, leer, editar, borrar jugadores
4. crear, leer, editar, borrar equipos
5. crear, leer, editar, borrar partidos
6. crear, leer, editar, borrar jornadas
7. crear, leer, editar, borrar calendario
8. crear, leer, editar, borrar clasificación
9. crear, leer, editar, borrar usuarios

La primera parte en la que vamos a trabajar es en la creación de las jornadas de liga.

## Datos

usuario = {
    id,
    nombre,
    apellidos,
    nickname,
    email,
    rol,
    contraseña
}

noticia = {
    id,
    fecha,
    titulo,
    cabecera,
    imagen,
    contenido
}

jugador = {
    id,
    nombre,
    apellidos,
    nacionalidad,
    altura,
    peso,
    equipo
}

equipo = {
    id,
    nombre,
    poblacion,
    escudo,
    estadio,
    dirección
}

partido = {
    id,
    equipo1,
    equipo2,
    puntos-equipo1,
    puntos-equipo2,
    array jugadores-equipo1,
    array jugadores-equipo2,
    jornada
}

jornada = {
    id,
    fecha,
    número,
    liga
}

liga = {
    id,
    nombre,
    año,
    array equipos,
}

clasificacion = {
    id
    equipo
    puntos,
    partidos jugados,
    partidos ganados,
    partidos empatados,
    partidos perdidos,
    puntos anotados,
    puntos recibidos
}
