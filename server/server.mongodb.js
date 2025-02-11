import { MongoClient, ObjectId } from "mongodb";

const URI = process.env.MONGO_URI;
const database = 'rugbyLeague'

export const db = {
    get: getItems,
    create: createItem,
    count: countItems,
    update: updateItem,
    delete: deleteItem,
    createMany: createMany,
    updateMany: updateMany,
    deleteMany: deleteMany,
    logInUser: logInUser
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