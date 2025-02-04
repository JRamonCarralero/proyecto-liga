import fs from 'fs';

export async function findById(file, findParams, callback) {
  try {
    if (fs.existsSync(file)) {
      await fs.readFile(file, function (err, data) {
        const parsedData = JSON.parse(data.toString());
        // Filter by filterParams
        const findData = parsedData.find((item) => item.id === findParams.id);
        if (!findData) {
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
          callback(findData);
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