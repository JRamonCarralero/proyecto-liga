import fs from 'fs';
import { read } from './read.js';

export async function update(file, data, callback) {
  console.log('update', data, file);
  let parsedData = []
  await read(file, (readData) => {
    parsedData = [...readData];
    console.log('update parsedData', parsedData);
    const index = parsedData.findIndex((item) => item.id === data.id);
    parsedData[index] = data;

    fs.writeFile(file, JSON.stringify(parsedData), function (err) {
      if (err) {
        console.log('update', err);
        return;
      }
      if (callback) {
        callback(data);
      }
    })
  });
}