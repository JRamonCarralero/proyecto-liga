import fs from 'fs';
import { read } from './read.js';

export async function deleteData(file, data, callback) {
  console.log('delete', data, file);
  let parsedData = []
  await read(file, (readData) => {
    parsedData = [...readData];
    console.log('delete parsedData', parsedData);
    const index = parsedData.findIndex((item) => item.id === data.id);
    parsedData.splice(index, 1);

    fs.writeFile(file, JSON.stringify(parsedData), function (err) {
      if (err) {
        console.log('delete', err);
        return;
      }
      if (callback) {
        callback(data);
      }
    })
  });
}