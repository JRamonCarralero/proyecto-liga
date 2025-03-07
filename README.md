# Trabajo Fin de Curso para el Bootcamp Fullstack de Neoland

[![Netlify Status](https://api.netlify.com/api/v1/badges/525a50f6-1e28-45d5-86db-7022ede0c749/deploy-status)](https://app.netlify.com/sites/myrugbyleague/deploys)

Repositorio de José Ramón Carralero para el trabajo de fin de curso para el Bootcamp de Fullstack de Neoland.

## Descripción

La aplicación consiste en una web para la visualización de noticias e información sobre distintas ligas de rugby, y en la gestión de esta información por medio de un apartado de administración. Como base de datos usamos MongoDB, ubicada en Mongo Atlas.

El acceso a la parte pública se hace desde la raiz (carga el archivo index.hmtl), mientras que para la administración se hará desde /admin/admin.html. Para la administración se requiere de usuario y contraseña, y este deberá estar creado previamente en la base de datos, puesto que los usuarios se crean desde administración y no hay un registro de ellos.

Puedes visitar la aplicación desplegada en: [My Rugby League](https://myrugbyleague.netlify.app/)

![captura de pantalla](./public/myrugbyleague.png)

En la parte pública podremos encontrar 3 apartados

* Página de inicio, que muestra las 3 últimas noticias y la tabla de clasificación de la liga marcada como principal
* Página de noticias, con buscador, paginación y detalle de noticias
* Página de competición, con la información de las distintas ligas (equipos, jugadores, jornadas, partidos, clasificaciones, estadísticas)

La parte de administración, que constará de:

* Página de login
* Gestión de usuarios
* Gestión de noticias
* Creación y gestión de Equipos y Jugadores
* Creación y edición de Ligas y lo relativo a estas (Jornadas, Partidos, Clasificación y Estadísticas)

El código front está realizado en javascript con componentes web en javascript nativo y componentes web desarrollados con [Lit Element], estos ultimos con Lit en su nombre de carpeta y archivo

En este repositorio se aplican los conocimientos adquiridos durante el curso:

* HTML
* CSS (Responsive)
* JavaScript: programación funcional, principios Solid, patrones de diseño
* REDUX: se creó una REDUX para la gestión de datos antes de entrar en materia con servidores, la cual aún se usa en la gestión de usuarios, pero permanece entera
* Javascript nativo y Lit Element para la creación de Web Components
* Servidores node.js
  * Servidor de estaticos como primer ejercicio (actualemente no se usa)
  * Servidor de apis para leer de ficheros JSON (actualmente no se usa)
  * Servidor CRUD con funciones para trabajar con los distintos JSON que simulan una BBDD (actualmente no se usa)
  * Servidor Express.js que es el servidor con el cual funciona la aplicación
* Base de datos MongoDB ubicada en Mongo Atlas, comunicación con el servidor por medio del archivo server.mongodb.js
* TypeScript para el tipado del código
* JSdocs para la documentación
* GitHub para gestión de repositorios
* GitHooks y Linters para comprobación de errores en el código
* Jest como herramienta de testeo. En la carpeta /js/__test__ hay varios ejemplos de testing
* Archivo api.mjs en la carpeta netlify/functions para poder desplegar el servidor en netlify, y netlify.toml en la raiz para su configuración

## Dependencias de la aplicación

* Node >= 20.0.0
* Express
* MongoDB
* JSDoc
* Typescript
* Jest
* ESLint
* Lint-Staged
* StyleLint
* Netlify (sólo si se va a desplegar en netlify)

## Plugings de VS Code recomendados

* [commitlint](https://marketplace.visualstudio.com/items?itemName=joshbolduc.commitlint)
* [Conventional Commits](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits)
* [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [GitHub Pull Requests](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)
* [Live Preview](https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server)
* [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)
* [Postman](https://marketplace.visualstudio.com/items?itemName=Postman.postman-for-vscode)
* [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)

## Instalación y ejecución

```bash
npm install
```

Ejecutar en el terminal el servidor del backend.

```bash
npm run server:express:start
```

Una vez en ejecución, podemos acceder al front end de la aplicación en: [http://127.0.0.1:3333](http://localhost:3333)

La configuración de los puertos está definida en el archivo .env, no incluído en el repositorio de git.

La aplicación gestiona los datos por medio de MongoDB, salvo la gestión de usuarios que también utiliza REDUX. Para acceder a la administración se realiza un login que simula un OAuth que genera un token para identificar al usuario. El usuario deberá estar creado previamente en base de datos, puesto que no existe el registro

En lo relativo al interfaz, para la parte pública se aplican estilos responsive en función del tamaño de la pantalla para su uso en distintos dispositivos, con elementos Grid y Flex para esta funcionalidad. En la parte de administración, al mostrarse mucha información por medio de tablas, no se aplican estos estilos responsives, esta preparada para la gestión desde pc.

Cada función/componente se ha creado intentando cumplir con los estándares de SOLID.

Existe la validación de tipados por medio de JSDoc en los comentarios, y ESLint tanto en los Git Hooks como apoyo por medio del plugin de VS Code.

## Documentación

Para generar la documentación de la aplicación se usa [JSDoc](https://jsdoc.app) y se guarda en la carpeta ```out```. Para verla puedes ejecutar el comando ```npm run build:docs```.

## Modelo de Datos

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

## Relacion entre componentes

Para las diversas páginas, tenemos un archivos bundle que importa los componentes utilizados en esa página. Están identificados como bundleNombrePagina.js y en ellos consta la importación del componente y su exportación para ser utilizado en el HTML.

Las carpetas acabadas en Lit, son los componentes creados con [Lit Element](https://lit.dev)

### pre-commit

Integramos [lint-staged] para ejecutar las validaciones antes de  ejecutar el commit.

```bash
#!/usr/bin/env sh

echo PRE-COMMIT GIT HOOK
npx lint-staged
```

### pre-push

Integramos el testeo unitario con [Jest](https://jestjs.io) antes de ejecutar el push.

```bash
#!/usr/bin/env sh

echo PRE-PUSH GIT HOOK
npm run test
```

## Testeo

Utilizamos [Jest] como herramienta de testeo. Para poder ejecutar los test los hacemos por medio del comando:

```bash
npm run test:watch
```

El fichero de configuración de jest es jest.config.js
