import fs from 'fs';
import { paginable } from '../utils/utils.js';

export async function readShortPage(file, pageParams, callback) {
  try {
    if (fs.existsSync(file)) {
      await fs.readFile(file, function (err, data) {
        const parsedData = JSON.parse(data.toString());
        /*const respuesta = {
          siguiente: true,
          anterior: false,
          data: parsedData.slice((Number(pageParams.page) - 1) * 6, Number(pageParams.page) * 6)
        }
        if (parsedData.length <= pageParams.page * 6) respuesta.siguiente = false
        if (pageParams.page > 1) respuesta.anterior = true*/
        if (!parsedData) {
          console.log('read', 'No se encontraron resultados');
          if (callback) {
            callback('No se encontraron resultados');
          }
          return;
        }
        // Return find data
        if (err) {
          console.log('read', err);
          return;
        }
        if (callback && !err) {
          const respuesta = paginable(parsedData, pageParams.page, 6);
          callback(respuesta);
          return;
        }
      });
    } else {
      console.log('read', 'El fichero no existe');
      if (callback) {
        callback('El fichero no existe');
      }
    }
  } catch (err) {
    console.log('read', `Error: ${err}`);
  }
}