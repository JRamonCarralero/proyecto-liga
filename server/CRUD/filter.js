import fs from 'fs';
import { paginable } from '../utils/utils.js';

export async function filter(file, filterParams, callback) {
  try {
    if (fs.existsSync(file)) {
      await fs.readFile(file, function (err, data) {
        const parsedData = JSON.parse(data.toString());
        let filteredData = [];
        // Filter by filterParams
        switch (filterParams.tipo) {
            case 'titulo':
                filteredData = parsedData.filter((item) => {
                    return item.titulo.toLowerCase().includes(filterParams.filter)
                });
                break;
            case 'year':
                if (filterParams.filter === 'all') {
                    filteredData = parsedData;
                } else {
                  filteredData = parsedData.filter((item) => {
                    return item.year === filterParams.filter
                  });
                }
                break;
            case 'ligaid':
                filteredData = parsedData.filter((item) => {
                    return item.ligaId === filterParams.filter
                });
                break;
            case 'jornadaid':
                filteredData = parsedData.filter((item) => {
                    return item.jornadaId === filterParams.filter
                });
                break;
            case 'equipoid':
                filteredData = parsedData.filter((item) => {
                    return item.equipoId === filterParams.filter
                });
                break;
            case 'partidoid':
                filteredData = parsedData.filter((item) => {
                    return item.partidoId === filterParams.filter
                });
                break;
            case 'estjugador':
                filteredData = parsedData.filter((item) => {
                    return item.ligaId === filterParams.ligaid && item.equipoId === filterParams.equipoid && item.jugadorId === filterParams.jugadorid
                });
                break;
            case 'ligaequipo':
                filteredData = parsedData.filter((item) => {
                    return item.ligaId === filterParams.ligaid && item.equipoId === filterParams.equipoid
                });
                break;
            default:
                console.log('read', 'No se encontraron resultados');
                break
        }
        
        if (filteredData.length === 0) {
          console.log('read', 'No se encontraron resultados');
          if (callback) {
            callback('No se encontraron resultados');
          }
          return;
        }
        // Return filtered data
        if (err) {
          console.log('read', err);
          return;
        }
        if (callback && !err) {
            if (filterParams.page) {
                if (filterParams.tipo === 'titulo') {
                    const respuesta = paginable(filteredData, filterParams.page, 6);
                    callback(respuesta);
                    return;
                } else {
                    const respuesta = paginable(filteredData, filterParams.page, 20);
                    callback(respuesta);
                    return;
                }  
            } 
            callback(filteredData);
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