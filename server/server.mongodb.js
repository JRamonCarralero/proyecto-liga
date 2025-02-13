import { MongoClient, ObjectId } from "mongodb";

const URI = process.env.MONGO_URI;
const database = 'rugbyLeague'

export const db = {
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