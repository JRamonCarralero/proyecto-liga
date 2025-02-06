import fs from 'fs';
import { paginable } from '../utils/utils.js';

export async function readShortPage(file, pageParams, callback) {
  let parsedData = []
  try {
    if (fs.existsSync(file)) {
      await fs.readFile(file, function (err, data) {
        parsedData = JSON.parse(data.toString());
        if (err) {
          console.log('read', err);
          return err;
        }
        if (callback && !err) {
          const respuesta = paginable(parsedData, pageParams, 6);
          return callback(respuesta);
        }
      });
    } else {
      console.log('read', 'El fichero no existe');
      if (callback) {
        return callback('El fichero no existe');
      }
    }
  } catch (err) {
    console.log('read', `Error: ${err}`);
    return err;
  }
}