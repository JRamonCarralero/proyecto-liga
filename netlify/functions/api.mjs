import { MongoClient, ObjectId } from "mongodb";
import express, { Router } from 'express';
import bodyParser from 'body-parser';
import serverless from 'serverless-http';

const URI = process.env.MONGO_ATLAS;
const database = 'rugbyLeague'
const api = express();
const router = Router();

// ------- EXPRESS ------- //

// Acciones //

router.post('/create/acciones', async (req, res) => {
    const campos = {
        ...req.body,
        partidoId: new ObjectId(String(req.body.partidoId)),
        ligaId: new ObjectId(String(req.body.ligaId)),
        jugadorId: new ObjectId(String(req.body.jugadorId)),
        equipoId: new ObjectId(String(req.body.equipoId))
    }
    res.json(await db.create(campos, 'acciones'))
})

router.get('/read/acciones', async (req, res) => {
    res.json(await db.get({}, 'acciones'))
})

router.put('/update/acciones/:id', async (req, res) => {
    res.json(await db.update(req.params.id, req.body, 'acciones'))
})

router.delete('/delete/acciones/:id', async (req, res) => {
    res.json(await db.delete(req.params.id, 'acciones'))
})

router.get('/findbyid/acciones/:id', async (req, res) => {
    res.json(await db.findById({ _id: new ObjectId(req.params.id) }, 'acciones'))
})

router.get('/filter/acciones/partidoid/:filter', async (req, res) => {
    res.json(await db.get({ partidoId: new ObjectId(req.params.filter) }, 'acciones'))
})

router.get('/read/acciones/table/:partidoid', async (req, res) => {
    res.json(await db.getAccionesTable(new ObjectId(req.params.partidoid)))
})

// Clasificaciones //

router.post('/create/clasificaciones', async (req, res) => {
    const campos = {
        ...req.body,
        ligaId: new ObjectId(String(req.body.ligaId)),
        equipoId: new ObjectId(String(req.body.equipoId))
    }
    res.json(await db.create(campos, 'clasificaciones'))
})

router.get('/read/clasificaciones', async (req, res) => {
    res.json(await db.get({}, 'clasificaciones'))
})

router.put('/update/clasificaciones/:id', async (req, res) => {
    console.log('body', req.body)
    res.json(await db.update(req.params.id, req.body, 'clasificaciones'))
})

router.delete('/delete/clasificaciones/:id', async (req, res) => {
    res.json(await db.delete(req.params.id, 'clasificaciones'))
})

router.get('/findbyid/clasificaciones/:id', async (req, res) => {
    res.json(await db.findById({ _id: new ObjectId(req.params.id) }, 'clasificaciones'))
})

router.get('/filter/clasificaciones/:ligaid', async (req, res) => {
    res.json(await db.get({ ligaId: new ObjectId(req.params.ligaid) }, 'clasificaciones'))
})

router.get('/filter/clasificaciones/:ligaid/:equipoid', async (req, res) => {
    res.json(await db.get({ ligaId: new ObjectId(req.params.ligaid), equipoId: new ObjectId(req.params.equipoid) }, 'clasificaciones'))
})

router.post('/create/clasificaciones/many', async (req, res) => {
    const  clasificaciones = [...req.body]
    clasificaciones.forEach(clasificacion => {
        clasificacion.ligaId = new ObjectId(String(clasificacion.ligaId))
        clasificacion.equipoId = new ObjectId(String(clasificacion.equipoId))
    })
    res.json(await db.createMany(clasificaciones, 'clasificaciones'))
})

router.delete('/delete/clasificaciones/many/liga/:ligaid', async (req, res) => {
    res.json(await db.deleteMany({ ligaId: new ObjectId(req.params.ligaid) }, 'clasificaciones'))
})


router.get('/read/clasificaciones/table/:ligaid', async (req, res) => {
    res.json(await db.getClasificacionTable(new ObjectId(req.params.ligaid)))
})


// Equipos //

router.post('/create/equipos', async (req, res) => {
    res.json(await db.create(req.body, 'equipos'))
})

router.get('/read/equipos', async (req, res) => {
    res.json(await db.get({}, 'equipos'))
})

router.put('/update/equipos/:id', async (req, res) => {
    res.json(await db.update(req.params.id, req.body, 'equipos'))
})

router.delete('/delete/equipos/:id', async (req, res) => {
    res.json(await db.delete(req.params.id, 'equipos'))
})

router.get('/findbyid/equipos/:id', async (req, res) => {
    res.json(await db.findById({ _id: new ObjectId(req.params.id) }, 'equipos'))
})

router.get('/read/equipos/page/:page', async (req, res) => {
    const equipos = await db.getPaginable({}, Number(req.params.page), 20, { _id: 1 }, 'equipos')
    const numberEquipos = await db.count('noticias')
    const resp = crearPaginacion(equipos, numberEquipos, Number(req.params.page), 20)
    res.json(resp)
})

router.get('/filter/equipos/:ligaid', async (req, res) => {
    const liga = await db.findById({ _id: new ObjectId(req.params.ligaid) }, 'ligas')
    console.log('liga', liga)
    res.json(await db.get({ _id: { $in: liga.equipos } }, 'equipos'))
})

// Estadisticas //

router.post('/create/estadisticas', async (req, res) => {
    const campos = {
        ...req.body,
        jugadorId: new ObjectId(String(req.body.jugadorId)),
        equipoId: new ObjectId(String(req.body.equipoId)),
        ligaId: new ObjectId(String(req.body.ligaId))
    }
    console.log('campos crear estadisticas', campos)
    res.json(await db.create(campos, 'estadisticas'))
})

router.get('/read/estadisticas', async (req, res) => {
    res.json(await db.get({}, 'estadisticas'))
})

router.put('/update/estadisticas/:id', async (req, res) => {
    res.json(await db.update(req.params.id, req.body, 'estadisticas'))
})

router.delete('/delete/estadisticas/:id', async (req, res) => {
    res.json(await db.delete(req.params.id, 'estadisticas'))
})

router.get('/findbyid/estadisticas/:id', async (req, res) => {
    res.json(await db.findById({ _id: new ObjectId(req.params.id) }, 'estadisticas'))
})

router.get('/filter/estadisticas/estjugador/:ligaid/:equipoid/:jugadorid', async (req, res) => {
    res.json(await db.get({ 
        ligaId: new ObjectId(req.params.ligaid),
        equipoId: new ObjectId(req.params.equipoid),
        jugadorId: new ObjectId(req.params.jugadorid) 
    }, 'estadisticas'))
})

router.get('/read/estadisticas/table/:ligaid/:sortby/:page', async (req, res) => {
    const estadisticas = await db.getEstadisticasTable(new ObjectId(req.params.ligaid), req.params.sortby, Number(req.params.page))
    const numberEstadisticas = await db.countItemsWithFilter({ ligaId: new ObjectId(req.params.ligaid) }, 'estadisticas')
    const response = crearPaginacion(estadisticas, numberEstadisticas, Number(req.params.page), 20)
    res.json(response)
})

router.post('/create/estadisticas/liga', async (req, res) => {
    const body = req.body
    const equipos = body.equipos
    const ligaId = body.ligaId
    const estadisticas = []
    const jugadores = await db.get({ equipoId: { $in: equipos } }, 'jugadores')
    jugadores.forEach(jugador => {
        const newEstadistica = {
            ligaId: ligaId,
            equipoId: jugador.equipoId,
            jugadorId: jugador._id,
            ensayos: 0,
            puntosPie: 0,
            puntos: 0,
            tAmarillas: 0,
            tRojas: 0
        }
        estadisticas.push(newEstadistica)
    })
    res.json(await db.createMany(estadisticas, 'estadisticas'))
})

// Jornadas //

router.post('/create/jornadas', async (req, res) => {
    const campos = {
        ...req.body,
        ligaId: new ObjectId(String(req.body.ligaId))
    }
    res.json(await db.create(campos, 'jornadas'))
})

router.get('/read/jornadas', async (req, res) => {
    res.json(await db.get({}, 'jornadas'))
})

router.put('/update/jornadas/:id', async (req, res) => {
    res.json(await db.update(req.params.id, req.body, 'jornadas'))
})

router.delete('/delete/jornadas/:id', async (req, res) => {
    res.json(await db.delete(req.params.id, 'jornadas'))
})

router.get('/findbyid/jornadas/:id', async (req, res) => {
    res.json(await db.findById({ _id: new ObjectId(req.params.id) }, 'jornadas'))
})

router.get('/filter/jornadas/:ligaid', async (req, res) => {
    res.json(await db.getSortItems({ ligaId: new ObjectId(req.params.ligaid) }, { numero: 1}, 'jornadas'))
})

router.delete('/delete/jornadas/many/liga/:ligaid', async (req, res) => {
    res.json(await db.deleteMany({ ligaId: new ObjectId(req.params.ligaid) }, 'jornadas'))
})

// Jugadores //

router.post('/create/jugadores', async (req, res) => {
    const campos = {
        ...req.body,
        equipoId: new ObjectId(String(req.body.equipoId))
    }
    res.json(await db.create(campos, 'jugadores'))
})

router.get('/read/jugadores', async (req, res) => {
    res.json(await db.get({}, 'jugadores'))
})

router.put('/update/jugadores/:id', async (req, res) => {
    res.json(await db.update(req.params.id, req.body, 'jugadores'))
})

router.delete('/delete/jugadores/:id', async (req, res) => {
    res.json(await db.delete(req.params.id, 'jugadores'))
})

router.get('/findbyid/jugadores/:id', async (req, res) => {
    res.json(await db.findById({ _id: new ObjectId(req.params.id) }, 'jugadores'))
})

router.get('/filter/jugadores/:equipoid', async (req, res) => {
    res.json(await db.get({ equipoId: new ObjectId(req.params.equipoid) }, 'jugadores'))
})

router.put('/update/jugadores/many/equipo/:equipoid', async (req, res) => {
    res.json(await db.updateMany({ equipoId: new ObjectId(req.params.equipoid) }, req.body, 'jugadores'))
})


// Ligas //

router.post('/create/ligas', async (req, res) => {
    console.log('body', req.body)
    const liga = {...req.body}
    const equiposObject = []
    liga.equipos.forEach(equipo => equiposObject.push(new ObjectId(String(equipo))))
    liga.equipos = equiposObject
    res.json(await db.create(liga, 'ligas'))
})

router.get('/read/ligas', async (req, res) => {
    res.json(await db.get({}, 'ligas'))
})

router.put('/update/ligas/:id', async (req, res) => {
    res.json(await db.update(req.params.id, req.body, 'ligas'))
})

router.delete('/delete/ligas/:id', async (req, res) => {
    await db.deleteMany({ ligaId: new ObjectId(req.params.id) }, 'partidos')
    await db.deleteMany({ ligaId: new ObjectId(req.params.id) }, 'jornadas')
    await db.deleteMany({ ligaId: new ObjectId(req.params.id) }, 'clasificaciones')
    await db.deleteMany({ ligaId: new ObjectId(req.params.id) }, 'acciones')
    await db.deleteMany({ ligaId: new ObjectId(req.params.id) }, 'estadisticas')
    res.json(await db.delete(req.params.id, 'ligas'))
})

router.get('/findbyid/ligas/:id', async (req, res) => {
    res.json(await db.findById({ _id: new ObjectId(req.params.id) }, 'ligas'))
})

router.get('/read/ligas/page/:page', async (req, res) => {
    const ligas = await db.getPaginable({}, Number(req.params.page), 20, { _id: 1 }, 'ligas')
    const numberLigas = await db.count('ligas')
    const resp = crearPaginacion(ligas, numberLigas, Number(req.params.page), 20)
    res.json(resp)
})

router.get('/filter/ligas/:year', async (req, res) => {
    if (req.params.year === 'all') res.json(await db.get({}, 'ligas'))
    else res.json(await db.get({ year: req.params.year }, 'ligas'))
})

router.get('/read/liga/data/:id', async (req, res) => {
    const liga = await db.get( {_id: new ObjectId(req.params.id)}, 'ligas')
    const partidos = await db.get({ ligaId: new ObjectId(req.params.id) }, 'partidos')
    const jornadas = await db.get({ ligaId: new ObjectId(req.params.id) }, 'jornadas')
    const clasificaciones = await db.get({ ligaId: new ObjectId(req.params.id) }, 'clasificaciones')
    const estadisticas = await db.get({ ligaId: new ObjectId(req.params.id) }, 'estadisticas')
    const equipos = await db.get({ _id: { $in: liga[0].equipos } }, 'equipos')
    const jugadores = await db.get({ equipoId: { $in: liga[0].equipos }}, 'jugadores')

    const data = {
        partidos,
        jornadas,
        clasificaciones,
        equipos,
        estadisticas,
        jugadores
    }
    res.json(data)
})

// Noticias //

router.post('/create/noticias',async (req, res) => {
    const noticia = {...req.body}
    noticia.fecha = new Date()
    res.json(await db.create(noticia, 'noticias'))
})

router.get('/read/noticias', async (req, res) => {
    res.json(await db.get({}, 'noticias'))
})

router.put('/update/noticias/:id', async (req, res) => {
    res.json(await db.update(req.params.id, req.body, 'noticias'))
})

router.delete('/delete/noticias/:id', async (req, res) => {
    res.json(await db.delete(req.params.id, 'noticias'))
})

router.get('/findbyid/noticias/:id', async (req, res) => {
    res.json(await db.findById({ _id: new ObjectId(req.params.id) }, 'noticias'))
})

router.get('/read/noticias/page/:page', async (req, res) => {
    const noticias = await db.get({}, 'noticias')
    const pagNoticias = paginable(noticias, req.params.page, 20)
    res.json(pagNoticias)
})

router.get('/read/noticias/short/:page', async (req, res) => {
    const noticias = await db.get({}, 'noticias')
    const pagNoticias = paginable(noticias, req.params.page, 6)
    res.json(pagNoticias)
})

router.get('/filter/noticias/search/:page/:limit/:filter', async (req, res) => {
    let filter = {}
    if (req.params.filter != '_') {
        const regex = new RegExp(req.params.filter, 'i')
        filter = { titulo: { $regex: regex } }
    }
    const noticias = await db.getPaginable(filter, Number(req.params.page), Number(req.params.limit), { fecha: -1 }, 'noticias')
    const numberNoticias = await db.count('noticias')
    const resp = crearPaginacion(noticias, numberNoticias, Number(req.params.page), Number(req.params.limit))
    res.json(resp)
})

// Partidos //

router.post('/create/partidos', async (req, res) => {
    const partido = {
        ...req.body,
        jornadaId: new ObjectId(String(req.body.jornadaId)),
        ligaId: new ObjectId(String(req.body.ligaId)),
        local: new ObjectId(String(req.body.local)),
        visitante: new ObjectId(String(req.body.visitante))
    }
    res.json(await db.create(partido, 'partidos'))
})

router.get('/read/partidos', async (req, res) => {
    res.json(await db.get({}, 'partidos'))
})

router.put('/update/partidos/:id', async (req, res) => {
    res.json(await db.update(req.params.id, req.body, 'partidos'))
})

router.delete('/delete/partidos/:id', async (req, res) => {
    res.json(await db.delete(req.params.id, 'partidos'))
})

router.get('/findbyid/partidos/:id', async (req, res) => {
    res.json(await db.findById({ _id: new ObjectId(req.params.id) }, 'partidos'))
})

router.get('/filter/partidos/:jornadaid', async (req, res) => {
    res.json(await db.get({ jornadaId: new ObjectId(req.params.jornadaid) }, 'partidos'))
})

router.get('/filter/partidos/liga/:ligaid', async (req, res) => {
    res.json(await db.get({ ligaId: new ObjectId(req.params.ligaid) }, 'partidos'))
})

router.post('/create/partidos/many', async (req, res) => {
    const  partidos = [...req.body]
    partidos.forEach(partido => {
        partido.jornadaId = new ObjectId(String(partido.jornadaId))
        partido.ligaId = new ObjectId(String(partido.ligaId))
        partido.local = new ObjectId(String(partido.local))
        partido.visitante = new ObjectId(String(partido.visitante))
    })
    res.json(await db.createMany(partidos, 'partidos'))
})

router.delete('/delete/partidos/many/liga/:ligaid', async (req, res) => {
    res.json(await db.deleteMany({ ligaId: new ObjectId(req.params.ligaid) }, 'partidos'))
})

router.get('/read/partidos/table/:jornadaid', async (req, res) => {
    res.json(await db.getJornadaTable(new ObjectId(req.params.jornadaid)))
})

router.get('/find/partidos/equipos/:partidoId', async (req, res) => {
    res.json(await db.getPartidoWithEquipos(new ObjectId(req.params.partidoId)))
})

// Usuarios //

router.post('/create/usuarios', requireAuth, async (req, res) => {
    res.json(await db.create(req.body, 'usuarios'))
})

router.get('/read/usuarios', async (req, res) => {
    res.json(await db.get({}, 'usuarios'))
})

router.put('/update/usuarios/:id', async (req, res) => {
    res.json(await db.update(req.params.id, req.body, 'usuarios'))
})

router.delete('/delete/usuarios/:id', async (req, res) => {
    res.json(await db.delete(req.params.id, 'usuarios'))
})

router.get('/findbyid/usuarios/:id', async (req, res) => {
    res.json(await db.findById({ _id: new ObjectId(req.params.id) }, 'usuarios'))
})

router.post('/login', async (req, res) => {
    const user = await db.logInUser(req.body)
    if (user) {
      // TODO: use OAuth2
      // ...
      // Simulation of authentication (OAuth2)
      user.token = '123456'
      // Remove password
      delete user.password
      res.json(user)
    } else {
      // Unauthorized
      res.status(401).send('Unauthorized')
    }
  })


// for parsing application/json
api.use(bodyParser.json())
// for parsing application/x-www-form-urlencoded
api.use(bodyParser.urlencoded({ extended: true }))
api.use('/api/', router)

export const handler = serverless(api);

// ------- FUNCIONES ------- //

/**
 * Middleware that checks if the Authorization header is present and valid.
 * If the header is present and valid, the request is allowed to proceed.
 * If the header is not present or invalid, an Unauthorized response is sent.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Express next middleware function
 */
function requireAuth(req, res, next) {
    // Simulation of authentication (OAuth2)
    console.log('req.headers.authorization', req.headers.authorization)
    if (req.headers.authorization === 'Bearer 123456') {
        next()
    } else {
        // Unauthorized
        res.status(401).send('Unauthorized')
    }
}

/**
 * Devuelve una respuesta paginada.
 *
 * @param {Array} data - El array con los datos a paginar.
 * @param {number} page - El número de la página actual.
 * @param {number} limit - El límite de elementos por página.
 *
 * @returns {Object} Un objeto con la página actual de datos y booleanos
 *                  indicando si hay página siguiente y anterior.
 */
export function paginable(data, page, limit) {
    const respuesta = {
        siguiente: true,
        anterior: false,
        data: data.slice((page - 1) * limit, page * limit)
    }
    if (data.length <= page * limit) respuesta.siguiente = false
    if (page > 1) respuesta.anterior = true
    return respuesta
}

/**
 * Crea una estructura de respuesta para paginación.
 *
 * @param {Array} data - El conjunto de datos de la página actual.
 * @param {number} long - La longitud total de los datos.
 * @param {number} page - El número de la página actual.
 * @param {number} limit - El número máximo de elementos por página.
 *
 * @returns {Object} Un objeto que contiene la página actual de datos y 
 *                   indicadores booleanos para determinar si hay una 
 *                   página siguiente o anterior.
 */
export function crearPaginacion(data, long, page, limit) {
    const respuesta = {
        siguiente: true,
        anterior: false,        
        data
    }
    if (long <= page * limit) respuesta.siguiente = false
    if (page > 1) respuesta.anterior = true
    return respuesta
}

// ------- MONGODB ------- //

const db = {
    get: getItems,
    getSortItems: getSortItems,
    getPaginable: getPaginable,
    findById: findById,
    create: createItem,
    count: countItems,
    update: updateItem,
    delete: deleteItem,
    createMany: createMany,
    updateMany: updateMany,
    deleteMany: deleteMany,
    logInUser: logInUser,
    getClasificacionTable: getClasificacionTable,
    getJornadaTable: getJornadaTable,
    getPartidoWithEquipos: getPartidoWithEquipos,
    getEstadisticasTable: getEstadisticasTable,
    getAccionesTable: getAccionesTable,
    countItemsWithFilter: countItemsWithFilter,
}

/**
 * Creates a new item in the selected collection in the 'rugbyLeague' database.
 *
 * @param {object} item - The item to be created.
 * @returns {Promise<object>} The created article.
 */
async function createItem(item, collection) {
  const client = new MongoClient(URI);
  const rugbyleagueDB = client.db(database);
  const itemsCollection = rugbyleagueDB.collection(collection);
  const returnValue = await itemsCollection.insertOne(item);
  console.log('db createItem', returnValue, item._id)
  return item
}

/**
 * Inserts multiple items into the specified collection in the 'rugbyLeague' database.
 *
 * @param {Array<object>} items - The array of items to be inserted.
 * @param {string} collection - The name of the collection where the items will be inserted.
 * @returns {Promise<InsertManyResult>} The result of the insertMany operation.
 */
async function createMany(items, collection) {
  const client = new MongoClient(URI);
  const rugbyleagueDB = client.db(database);
  const itemsCollection = rugbyleagueDB.collection(collection);
  return await itemsCollection.insertMany(items);
}

/**
 * Gets an array of items from the 'selected' collection in the 'rugbyLeague' database.
 * The items are filtered by the given filter.
 *
 * @param {object} [filter] - The filter to apply to the items.
 * @param {string} collection - The collection of the item
 * @returns {Promise<Array<object>>} - The array of items.
 */
async function getItems(filter, collection) {
  const client = new MongoClient(URI);
  const rugbyleagueDB = client.db(database);
  const itemsCollection = rugbyleagueDB.collection(collection);
  console.log('filter, ', filter)
  const response = await itemsCollection.find(filter).toArray()
  return response;
}

/**
 * Gets an array of items from the 'selected' collection in the 'rugbyLeague' database,
 * sorted by the given sortElement.
 *
 * @param {object} [filter] - The filter to apply to the items.
 * @param {object} sortElement - The element to sort the items by.
 * @param {string} collection - The collection of the item
 * @returns {Promise<Array<object>>} - The array of items.
 */
async function getSortItems(filter, sortElement, collection) {
  const client = new MongoClient(URI);
  const rugbyleagueDB = client.db(database);
  const itemsCollection = rugbyleagueDB.collection(collection);
  const response = await itemsCollection.find(filter).sort(sortElement).toArray()
  return response;
}

/**
 * Gets an array of items from the 'selected' collection in the 'rugbyLeague' database.
 * The items are filtered by the given filter, sorted by the given sortElement and
 * paginated with the given page and limit.
 *
 * @param {object} [filter] - The filter to apply to the items.
 * @param {number} page - The page number to get.
 * @param {number} limit - The number of items per page.
 * @param {object} sortElement - The element to sort the items by.
 * @param {string} collection - The collection of the item
 * @returns {Promise<Array<object>>} - The array of items.
 */
async function getPaginable(filter, page, limit, sortElement, collection) {
  const client = new MongoClient(URI);
  const rugbyleagueDB = client.db(database);
  const itemsCollection = rugbyleagueDB.collection(collection);
  const response = await itemsCollection.find(filter).skip((page - 1) * limit).limit(limit).sort(sortElement).toArray()
  return response;
}

/**
 * Finds a single item from the specified collection in the 'rugbyLeague' database
 * that matches the given filter.
 *
 * @param {object} filter - The filter to apply to find the item.
 * @param {string} collection - The collection to search the item in.
 * @returns {Promise<object | null>} The found item object, or null if no item matches the filter.
 */
async function findById(filter, collection) {
  const client = new MongoClient(URI);
  const rugbyleagueDB = client.db(database);
  const itemsCollection = rugbyleagueDB.collection(collection);
  const response = await itemsCollection.findOne(filter)
  return response;
}

/**
 * Returns the number of items in the 'selected' collection in the 'rugbyLeague' database.
 *
 * @param {string} collection - The collection of the item
 * @returns {Promise<number>} The number of items in the collection.
 */
async function countItems(collection) {
  const client = new MongoClient(URI);
  const rugbyleagueDB = client.db(database);
  const itemsCollection = rugbyleagueDB.collection(collection);
  return await itemsCollection.countDocuments();
}

/**
 * Returns the number of items in the 'selected' collection in the 'rugbyLeague' database
 * that match the given filter.
 *
 * @param {object} filter - The filter to apply to the items.
 * @param {string} collection - The collection of the item
 * @returns {Promise<number>} The number of items in the collection that match the filter.
 */
async function countItemsWithFilter(filter, collection) {
  const client = new MongoClient(URI);
  const rugbyleagueDB = client.db(database);
  const itemsCollection = rugbyleagueDB.collection(collection);
  return await itemsCollection.countDocuments(filter);
}

/**
 * Updates an item in the 'selected' collection in the 'rugbyLeague' database.
 *
 * @param {string} id - The ID of the item to be updated.
 * @param {object} updates - The fields and new values to update the item with.
 * @param {string} collection - The collection of the item
 * @returns {Promise<UpdateResult>} The result of the update operation.
 */
async function updateItem(id, updates, collection) {
  const client = new MongoClient(URI);
  const rugbyleagueDB = client.db(database);
  const itemsCollection = rugbyleagueDB.collection(collection);
  const returnValue = await itemsCollection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
  console.log('db updateItem', returnValue, updates)
  return returnValue
}

/**
 * Updates all items in the 'selected' collection in the 'rugbyLeague' database
 * that match the given filter.
 *
 * @param {object} filter - The filter to apply to the items.
 * @param {object} updates - The fields and new values to update the items with.
 * @param {string} collection - The collection of the item
 * @returns {Promise<UpdateResult>} The result of the update operation.
 */
async function updateMany(filter, updates, collection) {
  const client = new MongoClient(URI);
  const rugbyleagueDB = client.db(database);
  const itemsCollection = rugbyleagueDB.collection(collection);
  const returnValue = await itemsCollection.updateMany(filter, { $set: updates });
  console.log('db updateItem', returnValue, updates)
  return returnValue
}

/**
 * Deletes an item from the 'selected' collection in the 'rugbyLeague' database.
 *
 * @param {string} id - The ID of the item to be deleted.
 * @param {string} collection - The collection of the item
 * @returns {Promise<string>} The ID of the deleted item.
 */
async function deleteItem(id, collection) {
  const client = new MongoClient(URI);
  const rugbyleagueDB = client.db(database);
  const itemsCollection = rugbyleagueDB.collection(collection);
  const returnValue = await itemsCollection.deleteOne({ _id: new ObjectId(id) });
  console.log('db deleteItem', returnValue, id)
  return id
}

/**
 * Deletes all items in the 'selected' collection in the 'rugbyLeague' database that
 * match the given filter.
 *
 * @param {object} filter - The filter to apply to the items.
 * @param {string} collection - The collection of the item
 * @returns {Promise<DeleteResult>} The result of the delete operation.
 */
async function deleteMany(filter, collection) {
  const client = new MongoClient(URI);
  const rugbyleagueDB = client.db(database);
  const itemsCollection = rugbyleagueDB.collection(collection);
  const returnValue = await itemsCollection.deleteMany(filter);
  console.log('db deleteItem', returnValue, filter)
  return returnValue
}

/**
 * Finds a user in the 'users' collection in the 'shoppingList' database given
 * an email and password.
 *
 * @param {{email: string, password: string}} data - The data to query the user.
 * @returns {Promise<object>} The user object if found, null otherwise.
 */
async function logInUser({email, password}) {
  const client = new MongoClient(URI);
  const shoppinglistDB = client.db(database);
  const usersCollection = shoppinglistDB.collection('usuarios');
  return await usersCollection.findOne({ email, password })
}

async function getClasificacionTable(ligaId) {
  const client = new MongoClient(URI);
  const aggDB = client.db(database);
  const clasificacionesColl = aggDB.collection('clasificaciones')
  const pipeline = []
  pipeline.push({ $match: { ligaId: ligaId } })
  pipeline.push({
      $lookup: {
          from: 'equipos',
          localField: 'equipoId',
          foreignField: '_id',
          as: 'equipo'
      }
  })
  pipeline.push(
      {
          $set: {
              equipo: { $first: '$equipo.nombre' }
          }
      },
  )
  pipeline.push({ $unset: ["_id", "ligaId", "equipoId"] })
  pipeline.push({ $sort: { puntos: -1, puntosAnotados: -1 } })

  const aggregationResult = await clasificacionesColl.aggregate(pipeline).toArray();
  return aggregationResult
}


/**
 * Retrieves a table of matches for a specific jornada from the 'partidos' collection
 * in the 'rugbyLeague' database.
 *
 * @param {ObjectId} jornadaId - The ID of the jornada to retrieve matches for.
 * @returns {Promise<Array<Object>>} An array of match objects with details including
 *                                   equipoLocal and equipoVisitante names.
 */
async function getJornadaTable(jornadaId) {
  const client = new MongoClient(URI);
  const aggDB = client.db(database);
  const partidosColl = aggDB.collection('partidos')
  const pipeline = []
  pipeline.push({ $match: { jornadaId: jornadaId } })
  pipeline.push({
    $lookup: {
        from: 'equipos',
        localField: 'local',
        foreignField: '_id',
        as: 'equipoLocal'
      }
    },{
      $lookup: {
          from: 'equipos',
          localField: 'visitante',
          foreignField: '_id',
          as: 'equipoVisitante'
        }
      }
  )      
  pipeline.push(
      {
        $set: {
          eqLocal: { $first: '$equipoLocal' },
          equipoVisitante: { $first: '$equipoVisitante.nombre' }
        }
      },
    {
      $set: {
        equipoLocal: "$eqLocal.nombre",
        estadio: "$eqLocal.estadio"
      }
    }
  )
  pipeline.push({ $unset: ["jornadaId", "ligaId", "local", "visitante", "jugadoresLocal", "jugadoresVisitante", "eqLocal"] }) 


  const aggregationResult = await partidosColl.aggregate(pipeline).toArray();
  return aggregationResult
}

/**
 * Retrieves a single match from the 'partidos' collection with the given ID,
 * and enriches it with the names and estadios of the local and visitante equipos.
 *
 * @param {ObjectId} partidoId - The ID of the match to retrieve.
 * @returns {Promise<Object>} The match with the equipoLocal and equipoVisitante
 *                            names and estadios.
 */
async function getPartidoWithEquipos(partidoId) {
  const client = new MongoClient(URI);
  const aggDB = client.db(database);
  const partidosColl = aggDB.collection('partidos')
  const pipeline = []
  pipeline.push({ $match: { _id: partidoId } })
  pipeline.push({
    $lookup: {
        from: 'equipos',
        localField: 'local',
        foreignField: '_id',
        as: 'equipoLocal'
      }
    },{
      $lookup: {
          from: 'equipos',
          localField: 'visitante',
          foreignField: '_id',
          as: 'equipoVisitante'
        }
      }
  )      
  pipeline.push(
      {
        $set: {
          eqLocal: { $first: '$equipoLocal' },
          equipoVisitante: { $first: '$equipoVisitante.nombre' }
        }
      },
    {
      $set: {
        equipoLocal: "$eqLocal.nombre",
        estadio: "$eqLocal.estadio"
      }
    }
  )
  pipeline.push({ $unset: ["jornadaId", "ligaId", "jugadoresLocal", "jugadoresVisitante", "eqLocal"] }) 

  const aggregationResult = await partidosColl.aggregate(pipeline).toArray();
  return aggregationResult
}

/**
 * Retrieves a table of statistics for players in a specific league from the 'estadisticas' collection
 * in the 'rugbyLeague' database. The statistics are enriched with the names of the associated
 * 'equipo' and 'jugador'.
 *
 * @param {string} ligaId - The ID of the league for which to retrieve the statistics.
 * @param {string} sortBy - The field to sort the statistics by.
 * @param {number} pag - The page number to retrieve.
 * @returns {Promise<Array<Object>>} An array of player statistics, including the equipo and jugador names.
 */
async function getEstadisticasTable(ligaId, sortBy, page) {
  const client = new MongoClient(URI);
  const aggDB = client.db(database);
  const estadisticasColl = aggDB.collection('estadisticas')
  const pipeline = []
  pipeline.push({ $match: { ligaId: ligaId } })
  pipeline.push({
    $lookup: {
        from: 'equipos',
        localField: 'equipoId',
        foreignField: '_id',
        as: 'equipo'
      }
    },{
      $lookup: {
          from: 'jugadores',
          localField: 'jugadorId',
          foreignField: '_id',
          as: 'jugador'
        }
      }
  )      
  pipeline.push(
      {
        $set: {
          eqNombre: { $first: '$equipo.nombre' },
          jugItem: { $first: '$jugador' }
        }
      },{
        $set: {
          jugNombre: "$jugItem.nombre",
          jugApellidos: "$jugItem.apellidos"
        }
      }
  )
  pipeline.push({ $unset: ["_id", "ligaId", "equipoId", "jugadorId", "jugItem"] }) 
  
  switch (sortBy) {
    case 'jugador':
      pipeline.push({ $sort: { jugApellidos: 1, jugNombre: 1 } })
      break
    case 'equipo':
      pipeline.push({ $sort: { eqNombre: 1 } })
      break
    case 'ensayos':
      pipeline.push({ $sort: { ensayos: -1, puntos: -1 } })
      break
    case 'ppie':
      pipeline.push({ $sort: { puntosPie: -1, puntos: -1 } })
      break
    case 'TA':
      pipeline.push({ $sort: { tAmarillas: -1 } })
      break
    case 'TR':
      pipeline.push({ $sort: { tRojas: -1 } })
      break
    default:
      pipeline.push({ $sort: { puntos: -1 } })
  }

  pipeline.push({ $skip: (page - 1) * 20 })
  pipeline.push({ $limit: 20 })

  const aggregationResult = await estadisticasColl.aggregate(pipeline).toArray();
  return aggregationResult
}

/**
 * Retrieves a table of actions for a specific match from the 'acciones' collection
 * in the 'rugbyLeague' database. The actions are enriched with the names of the
 * associated 'equipo' and 'jugador'.
 *
 * @param {ObjectId} partidoId - The ID of the match for which to retrieve the actions.
 * @returns {Promise<Array<Object>>} An array of actions, including the equipo and jugador names.
 */
async function getAccionesTable(partidoId) {
  const client = new MongoClient(URI);
  const aggDB = client.db(database);
  const accionesColl = aggDB.collection('acciones')
  const pipeline = []
  pipeline.push({ $match: { partidoId: partidoId } })
  pipeline.push({
    $lookup: {
        from: 'equipos',
        localField: 'equipoId',
        foreignField: '_id',
        as: 'equipo'
      }
    },{
      $lookup: {
          from: 'jugadores',
          localField: 'jugadorId',
          foreignField: '_id',
          as: 'jugador'
        }
      }
  )      
  pipeline.push(
      {
        $set: {
          eqNombre: { $first: '$equipo.nombre' },
          jugItem: { $first: '$jugador' }
        }
      },{
        $set: {
          jugNombre: "$jugItem.nombre",
          jugApellidos: "$jugItem.apellidos"
        }
      }
  )
  pipeline.push({ $unset: ["partidoId", "jugItem", "equipo", "jugador"] }) 
  
  pipeline.push({ $sort: { minuto: 1, _id: 1 } })

  const aggregationResult = await accionesColl.aggregate(pipeline).toArray();
  return aggregationResult
}