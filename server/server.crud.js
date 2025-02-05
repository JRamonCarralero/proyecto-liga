// INFO: https://www.freecodecamp.org/espanol/news/como-crear-una-aplicacion-crud-de-linea-de-comandos-con-node-js/
import { read } from './CRUD/read.js';
import { create } from './CRUD/create.js';
import { findById } from './CRUD/findbyid.js'
import { readPage } from './CRUD/readpage.js'
import { readShortPage } from './CRUD/readshortpage.js'
import { filter } from './CRUD/filter.js';  
import { update } from './CRUD/update.js';
import { deleteById } from './CRUD/delete.js';


const USERS_URL = './server/BBDD/users.json'
// const ARTICLES = './server/BBDD/articles.json'

// READ:
// read(USERS, (data) => console.log('server', data));
// read(ARTICLES, (data) => console.log('server', data));

// CREATE:
// create(USERS, { name: 'pepe', age: 12 }, (data) => console.log(`server ${data.name} creado`, data));

export const crud = {
  read: (file = USERS_URL, callback) => read(file, callback),
  create: (file = USERS_URL, data, callback) => create(file, data, callback),
  findById: (file = USERS_URL, filterParams, callback) => findById(file, filterParams, callback),
  readPage: (file = USERS_URL, pageParams, callback) => readPage(file, pageParams, callback),
  readShortPage: (file = USERS_URL, pageParams, callback) => readShortPage(file, pageParams, callback),
  filter: (file = USERS_URL, filterParams, callback) => filter(file, filterParams, callback),
  update: (file = USERS_URL, id, modifiedData, callback) => update(file, id, modifiedData, callback),
  deleteById: (file = USERS_URL, id, callback) => deleteById(file, id, callback),
}