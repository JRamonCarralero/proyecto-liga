import fs from 'fs';

export async function read(file, callback) {
  try {
    if (fs.existsSync(file)) {
      console.log('read', file);
      await fs.readFile(file, function (err, data) {
        const parsedData = JSON.parse(data.toString());
        console.log(parsedData)
        if (err) {
          console.log('read', err);
          return;
        }
        if (callback && !err) {
          callback(parsedData);
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