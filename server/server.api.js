// server.api.js
import * as http from "node:http";
import * as qs from "node:querystring";
import { crud } from "./server.crud.js";

const MIME_TYPES = {
  default: "application/octet-stream",
  html: "text/html; charset=UTF-8",
  js: "application/javascript",
  json: "application/json",
  css: "text/css",
  png: "image/png",
  jpg: "image/jpg",
  gif: "image/gif",
  ico: "image/x-icon",
  svg: "image/svg+xml",
};

const ACCIONES_URL = './server/BBDD/acciones.data.json' 
const CLASIFICACIONES_URL = './server/BBDD/clasificaciones.data.json'
const EQUIPOS_URL = './server/BBDD/equipos.data.json'
const ESTADISTICAS_URL = './server/BBDD/estadisticas.data.json'
const JORNADAS_URL = './server/BBDD/jornadas.data.json'
const JUGADORES_URL = './server/BBDD/jugadores.data.json'
const LIGAS_URL = './server/BBDD/ligas.data.json'
const NOTICIAS_URL = './server/BBDD/noticias.data.json'
const PARTIDOS_URL = './server/BBDD/partidos.data.json'
const USUARIOS_URL = './server/BBDD/usuarios.data.json'

/**
 * Returns an object with the action name and id from the given pathname.
 * For example, for "/create/articles/:id", it will return { name: "/create/articles", id: ":id" }
 * @param {string} pathname
 * @returns {{name: string, id: string}}
 */
function getAction(pathname) {
  // /create/articles/:id
  const actionParts = pathname.split('/');
  return {
    name: `/${actionParts[1]}/${actionParts[2]}`,
    id: actionParts[3]
   }
}

http
    .createServer(async (request, response) => {
        const url = new URL(`http://${request.headers.host}${request.url}`);
        const statusCode = 200
        const urlParams = Object.fromEntries(url.searchParams)
        const action = getAction(url.pathname);
        let responseData = []
        let chunks = []
        console.log(url.pathname, url.searchParams);
        // Set Up CORS
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Content-Type', MIME_TYPES.json);
        response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, DELETE, POST');
        response.setHeader("Access-Control-Allow-Headers", "*");
        response.setHeader('Access-Control-Max-Age', 2592000); // 30 days
        response.writeHead(statusCode);

        if (request.method === 'OPTIONS') {
            response.end()
            return
        }

        switch (action.name) {
            case '/create/acciones':
                request.on('data', (chunk) => {
                    chunks.push(chunk)
                  })
                  request.on('end', () => {
                    let body = Buffer.concat(chunks)
                    console.log('create article - body BUFFER', body)
                    let parsedData = qs.parse(body.toString())
                    console.log('create article - body', parsedData)
                    crud.create(ACCIONES_URL, parsedData, (data) => {
                      console.log(`server create article ${data.name} creado`, data)
                      responseData = data
          
                      response.write(JSON.stringify(responseData));
                      response.end();
                    });
                  })
                break;
            case '/update/acciones':
                request.on('data', (chunk) => {
                    chunks.push(chunk)
                })
                request.on('end', () => {
                    let body = Buffer.concat(chunks)
                    let parsedData = qs.parse(body.toString())
                    crud.update(ACCIONES_URL, action.id, parsedData, (data) => {
                    console.log(`server update accion ${action.id} modificado`, data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                    });
                })
                break;
            case '/delete/acciones':
                crud.deleteById(ACCIONES_URL, action.id, (data) => {
                    console.log('server delete accion', action.id, data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/read/acciones':
                crud.read(ACCIONES_URL, (data) => {
                console.log('server read acciones', data)
                responseData = data

                response.write(JSON.stringify(responseData));
                response.end();
                });
                break;
            case '/findbyid/acciones':
                crud.findById(ACCIONES_URL, urlParams, (data) => {
                console.log('server find acciones', data)
                responseData = data

                response.write(JSON.stringify(responseData));
                response.end();
                })
                break;
            case '/readpage/acciones':
                crud.readPage(ACCIONES_URL, urlParams, (data) => {
                    console.log('server readpage acciones', data)
                    responseData = data

                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/filter/acciones':
                crud.filter(ACCIONES_URL, urlParams, (data) => {
                    console.log('server filter acciones', data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/create/clasificaciones':
                request.on('data', (chunk) => {
                    chunks.push(chunk)
                  })
                  request.on('end', () => {
                    let body = Buffer.concat(chunks)
                    console.log('create clasificaciones - body BUFFER', body)
                    let parsedData = qs.parse(body.toString())
                    console.log('create clasificaciones - body', parsedData)
                    crud.create(CLASIFICACIONES_URL, parsedData, (data) => {
                      console.log(`server create clasificaciones ${data.name} creado`, data)
                      responseData = data
          
                      response.write(JSON.stringify(responseData));
                      response.end();
                    });
                  })
                break;
            case '/update/clasificaciones':
                request.on('data', (chunk) => {
                    chunks.push(chunk)
                })
                request.on('end', () => {
                    let body = Buffer.concat(chunks)
                    let parsedData = qs.parse(body.toString())
                    crud.update(CLASIFICACIONES_URL, action.id, parsedData, (data) => {
                    console.log(`server update clasificacion ${action.id} modificado`, data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                    });
                })
                break;
            case '/delete/clasificaciones':
                crud.deleteById(CLASIFICACIONES_URL, action.id, (data) => {
                    console.log('server delete clasificacion', action.id, data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/read/clasificaciones':
                crud.read(CLASIFICACIONES_URL, (data) => {
                    console.log('server read clasificaciones', data)
                    responseData = data

                    response.write(JSON.stringify(responseData));
                    response.end();
                    });
                break;
            case '/findbyid/clasificaciones':
                crud.findById(CLASIFICACIONES_URL, urlParams, (data) => {
                    console.log('server find clasificaciones', data)
                    responseData = data

                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/readpage/clasificaciones':
                crud.readPage(CLASIFICACIONES_URL, urlParams, (data) => {
                    console.log('server readpage clasificaciones', data)
                    responseData = data

                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/filter/clasificaciones':
                crud.filter(CLASIFICACIONES_URL, urlParams, (data) => {
                    console.log('server filter clasificaciones', data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/create/equipos':
                request.on('data', (chunk) => {
                    chunks.push(chunk)
                })
                request.on('end', () => {
                    let body = Buffer.concat(chunks)
                    console.log('create equipo - body BUFFER', body)
                    let parsedData = qs.parse(body.toString())
                    console.log('create equipo - body', parsedData)
                    crud.create(EQUIPOS_URL, parsedData, (data) => {
                    console.log(`server create equipo ${data.name} creado`, data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                    });
                })
                break;
            case '/update/equipos':
                request.on('data', (chunk) => {
                    chunks.push(chunk)
                })
                request.on('end', () => {
                    let body = Buffer.concat(chunks)
                    let parsedData = qs.parse(body.toString())
                    crud.update(EQUIPOS_URL, action.id, parsedData, (data) => {
                    console.log(`server update equipo ${action.id} modificado`, data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                    });
                })
                break;
            case '/delete/equipos':
                crud.deleteById(EQUIPOS_URL, action.id, (data) => {
                    console.log('server delete equipo', action.id, data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/read/equipos':
                crud.read(EQUIPOS_URL, (data) => {
                console.log('server read equipos', data)
                responseData = data

                response.write(JSON.stringify(responseData));
                response.end();
                });
                break;
            case '/findbyid/equipos':
                crud.findById(EQUIPOS_URL, urlParams, (data) => {
                console.log('server find equipos', data)
                responseData = data

                console.log('data', responseData)
                response.write(JSON.stringify(responseData));
                response.end();
                })
                break;
            case '/readpage/equipos':
                crud.readPage(EQUIPOS_URL, urlParams, (data) => {
                    console.log('server readpage equipos', data)
                    responseData = data

                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/filter/equipos':
                crud.filter(EQUIPOS_URL, urlParams, (data) => {
                    console.log('server filter equipos', data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));    
                    response.end();
                })
                break;
            case '/create/estadisticas':
                request.on('data', (chunk) => {
                    chunks.push(chunk)
                })
                request.on('end', () => {
                    let body = Buffer.concat(chunks)
                    console.log('create estadisticas - body BUFFER', body)
                    let parsedData = qs.parse(body.toString())
                    console.log('create estadisticas - body', parsedData)
                    crud.create(ESTADISTICAS_URL, parsedData, (data) => {
                    console.log(`server create estadisticas ${data.name} creado`, data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                    });
                })
                break;
            case '/update/estadisticas':
                request.on('data', (chunk) => {
                    chunks.push(chunk)
                })
                request.on('end', () => {
                    let body = Buffer.concat(chunks)
                    let parsedData = qs.parse(body.toString())
                    crud.update(ESTADISTICAS_URL, action.id, parsedData, (data) => {
                    console.log(`server update estadistica ${action.id} modificado`, data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                    });
                })
                break;
            case '/delete/estadisticas':
                crud.deleteById(ESTADISTICAS_URL, action.id, (data) => {
                    console.log('server delete estadistica', action.id, data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/read/estadisticas':
                crud.read(ESTADISTICAS_URL, (data) => {
                    console.log('server read estadisticas', data)
                    responseData = data
            
                    response.write(JSON.stringify(responseData));
                    response.end();
                });
                break;
            case '/findbyid/estadisticas':
                crud.findById(ESTADISTICAS_URL, urlParams, (data) => {
                    console.log('server find estadisticas', data)
                    responseData = data
            
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/readpage/estadisticas':
                crud.readPage(ESTADISTICAS_URL, urlParams, (data) => {
                    console.log('server readpage estadisticas', data)
                    responseData = data
            
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/filter/estadisticas':
                crud.filter(ESTADISTICAS_URL, urlParams, (data) => {
                    console.log('server filter estadisticas', data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/create/jornadas':
                request.on('data', (chunk) => {
                    chunks.push(chunk)
                  })
                  request.on('end', () => {
                    let body = Buffer.concat(chunks)
                    console.log('create jornada - body BUFFER', body)
                    let parsedData = qs.parse(body.toString())
                    console.log('create jornada - body', parsedData)
                    crud.create(JORNADAS_URL, parsedData, (data) => {
                      console.log(`server create jornada ${data.name} creado`, data)
                      responseData = data
          
                      response.write(JSON.stringify(responseData));
                      response.end();
                    });
                  })
                break;
            case '/update/jornadas':
                request.on('data', (chunk) => {
                    chunks.push(chunk)
                })
                request.on('end', () => {
                    let body = Buffer.concat(chunks)
                    let parsedData = qs.parse(body.toString())
                    crud.update(JORNADAS_URL, action.id, parsedData, (data) => {
                    console.log(`server update jornada ${action.id} modificado`, data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                    });
                })
                break;
            case '/delete/jornadas':
                crud.deleteById(JORNADAS_URL, action.id, (data) => {
                    console.log('server delete jornada', action.id, data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/read/jornadas':
                crud.read(JORNADAS_URL, (data) => {
                    console.log('server read jornadas', data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                });
                break;
            case '/findbyid/jornadas':
                crud.findById(JORNADAS_URL, urlParams, (data) => {
                    console.log('server find jornadas', data)
                    responseData = data

                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/readpage/jornadas':        
                crud.readPage(JORNADAS_URL, urlParams, (data) => {
                    console.log('server readpage jornadas', data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break; 
            case '/filter/jornadas':
                crud.filter(JORNADAS_URL, urlParams, (data) => {
                    console.log('server filter jornadas', data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/create/jugadores':
                request.on('data', (chunk) => {
                    chunks.push(chunk)
                })
                request.on('end', () => {
                    let body = Buffer.concat(chunks)
                    console.log('create jugador - body BUFFER', body)
                    let parsedData = qs.parse(body.toString())
                    console.log('create jugador - body', parsedData)
                    crud.create(JUGADORES_URL, parsedData, (data) => {
                    console.log(`server create jugador ${data.name} creado`, data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                    });
                })
                break;
            case '/update/jugadores':
                request.on('data', (chunk) => {
                    chunks.push(chunk)
                })
                request.on('end', () => {
                    let body = Buffer.concat(chunks)
                    let parsedData = qs.parse(body.toString())
                    crud.update(JUGADORES_URL, action.id, parsedData, (data) => {
                    console.log(`server update jugador ${action.id} modificado`, data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                    });
                })
                break;
            case '/delete/jugadores':
                crud.deleteById(JUGADORES_URL, action.id, (data) => {
                    console.log('server delete jugador', action.id, data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/read/jugadores':
                crud.read(JUGADORES_URL, (data) => {
                    console.log('server read jugadores', data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                });
                break;
            case '/findbyid/jugadores':
                crud.findById(JUGADORES_URL, urlParams, (data) => {
                    console.log('server find jugadores', data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/readpage/jugadores':
                crud.readPage(JUGADORES_URL, urlParams, (data) => {
                    console.log('server readpage jugadores', data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/filter/jugadores':
                crud.filter(JUGADORES_URL, urlParams, (data) => {
                    console.log('server filter jugadores', data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/create/ligas':
                request.on('data', (chunk) => {
                    chunks.push(chunk)
                  })
                  request.on('end', () => {
                    let body = Buffer.concat(chunks)
                    console.log('create liga - body BUFFER', body)
                    let parsedData = qs.parse(body.toString())
                    console.log('create liga - body', parsedData)
                    const equipos = parsedData.equipos.split(',')
                    parsedData.equipos = equipos
                    crud.create(LIGAS_URL, parsedData, (data) => {
                      console.log(`server create liga ${data.name} creado`, data)
                      responseData = data
          
                      response.write(JSON.stringify(responseData));
                      response.end();
                    });
                  })
                break;
            case '/update/ligas':
                request.on('data', (chunk) => {
                    chunks.push(chunk)
                })
                request.on('end', () => {
                    let body = Buffer.concat(chunks)
                    let parsedData = qs.parse(body.toString())
                    crud.update(LIGAS_URL, action.id, parsedData, (data) => {
                    console.log(`server update liga ${action.id} modificado`, data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                    });
                })
                break;
            case '/delete/ligas':
                crud.deleteById(LIGAS_URL, action.id, (data) => {
                    console.log('server delete liga', action.id, data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/read/ligas':
                crud.read(LIGAS_URL, (data) => {
                    console.log('server read ligas', data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                });
                break;
            case '/findbyid/ligas':
                crud.findById(LIGAS_URL, urlParams, (data) => {
                    console.log('server find ligas', data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/readpage/ligas':
                crud.readPage(LIGAS_URL, urlParams, (data) => {
                    console.log('server readpage ligas', data)
                    responseData = data
                    console.log(responseData)
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/filter/ligas':
                crud.filter(LIGAS_URL, urlParams, (data) => {
                    console.log('server filter ligas', data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/create/noticias':
                console.log('create noticia')
                request.on('data', (chunk) => {
                    chunks.push(chunk)
                  })
                  request.on('end', () => {
                    let body = Buffer.concat(chunks)
                    console.log('create noticia - body BUFFER', body)
                    let parsedData = qs.parse(body.toString())
                    console.log('create noticia - body', parsedData)
                    crud.create(NOTICIAS_URL, parsedData, (data) => {
                      console.log(`server create noticia ${data.titulo} creado`, data)
                      responseData = data
          
                      response.write(JSON.stringify(responseData));
                      response.end();
                    });
                  })
                break;
            case '/update/noticias':
                request.on('data', (chunk) => {
                    chunks.push(chunk)
                })
                request.on('end', () => {
                    let body = Buffer.concat(chunks)
                    let parsedData = qs.parse(body.toString())
                    crud.update(NOTICIAS_URL, action.id, parsedData, (data) => {
                    console.log(`server update noticia ${action.id} modificado`, data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                    });
                })
                break;
            case '/delete/noticias':
                crud.deleteById(NOTICIAS_URL, action.id, (data) => {
                    console.log('server delete noticia', action.id, data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/read/noticias':
                crud.read(NOTICIAS_URL, (data) => {
                    console.log('server read noticias', data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                });
                break;
            case '/findbyid/noticias':
                crud.findById(NOTICIAS_URL, urlParams, (data) => {
                    console.log('server find noticias', data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/readpage/noticias':
                crud.readPage(NOTICIAS_URL, urlParams, (data) => {
                    console.log('server readpage noticias', data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/readshortpage/noticias':
                crud.readShortPage(NOTICIAS_URL, urlParams, (data) => {
                    console.log('server readshortpage noticias', data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/filter/noticias':
                crud.filter(NOTICIAS_URL, urlParams, (data) => {
                    console.log('server filter noticias', data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break
            case '/create/partidos':
                request.on('data', (chunk) => {
                    chunks.push(chunk)
                  })
                  request.on('end', () => {
                    let body = Buffer.concat(chunks)
                    console.log('create partido - body BUFFER', body)
                    let parsedData = qs.parse(body.toString())
                    console.log('create partido - body', parsedData)
                    crud.create(PARTIDOS_URL, parsedData, (data) => {
                      console.log(`server create partido ${data.name} creado`, data)
                      responseData = data
          
                      response.write(JSON.stringify(responseData));
                      response.end();
                    });
                  })
                break;
            case '/update/paridos':
                request.on('data', (chunk) => {
                    chunks.push(chunk)
                })
                request.on('end', () => {
                    let body = Buffer.concat(chunks)
                    let parsedData = qs.parse(body.toString())
                    crud.update(PARTIDOS_URL, action.id, parsedData, (data) => {
                    console.log(`server update partido ${action.id} modificado`, data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                    });
                })
                break;
            case '/delete/partidos':
                crud.deleteById(PARTIDOS_URL, action.id, (data) => {
                    console.log('server delete partido', action.id, data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/read/partidos':
                crud.read(PARTIDOS_URL, (data) => {
                    console.log('server read partidos', data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                });
                break;
            case '/findbyid/partidos':
                crud.findById(PARTIDOS_URL, urlParams, (data) => {
                    console.log('server find partidos', data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/readpage/partidos':
                crud.readPage(PARTIDOS_URL, urlParams, (data) => {
                    console.log('server readpage partidos', data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/filter/partidos':
                crud.filter(PARTIDOS_URL, urlParams, (data) => {
                    console.log('server filter partidos', data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/create/usuarios':
                request.on('data', (chunk) => {
                    chunks.push(chunk)
                  })
                  request.on('end', () => {
                    let body = Buffer.concat(chunks)
                    console.log('create usuario - body BUFFER', body)
                    let parsedData = qs.parse(body.toString())
                    console.log('create usuario - body', parsedData)
                    crud.create(USUARIOS_URL, parsedData, (data) => {
                      console.log(`server create usuario ${data.name} creado`, data)
                      responseData = data
          
                      response.write(JSON.stringify(responseData));
                      response.end();
                    });
                  })
                break;
            case '/update/usuarios':
                request.on('data', (chunk) => {
                    chunks.push(chunk)
                })
                request.on('end', () => {
                    let body = Buffer.concat(chunks)
                    let parsedData = qs.parse(body.toString())
                    crud.update(USUARIOS_URL, action.id, parsedData, (data) => {
                    console.log(`server update usuario ${action.id} modificado`, data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                    });
                })
                break;
            case '/delete/usuarios':
                crud.deleteById(USUARIOS_URL, action.id, (data) => {
                    console.log('server delete usuario', action.id, data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/read/usuarios':
                crud.read(USUARIOS_URL, (data) => {
                    console.log('server read usuarios', data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                });
                break;
            case '/findbyid/usuarios':
                crud.findById(USUARIOS_URL, urlParams, (data) => {
                    console.log('server find usuarios', data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/readpage/usuarios':
                crud.readPage(USUARIOS_URL, urlParams, (data) => {
                    console.log('server readpage usuarios', data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/filter/usuarios':
                crud.filter(USUARIOS_URL, urlParams, (data) => {
                    console.log('server filter usuarios', data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            default:
                console.log('no se encontro el endpoint');

                response.write(JSON.stringify('no se encontro el endpoint'));
                response.end();
                break;
            }
    })
    .listen(process.env.API_PORT, process.env.IP);

console.log('Server running at http://' + process.env.IP + ':' + process.env.API_PORT + '/');