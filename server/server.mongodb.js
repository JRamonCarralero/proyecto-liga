import { MongoClient, ObjectId } from "mongodb";

const URI = process.env.MONGO_URI;
const database = 'rugbyLeague'

export const db = {
    get: getItems,
    create: createItem,
    count: countItems,
    update: updateItem,
    delete: deleteItem,
    createMany: createMany
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
  console.log(item)
  const returnValue = await itemsCollection.insertOne(item);
  console.log('db createItem', returnValue, item._id)
  return item
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
  return await itemsCollection.find(filter).toArray();
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