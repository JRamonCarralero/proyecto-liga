// server.api.js
import * as http from "node:http";
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
const ESTADISTICAS_URL = './server/BBDD/estadisticas.data.json'
const JORNADAS_URL = './server/BBDD/jornadas.data.json'
const JUGADORES_URL = './server/BBDD/jugadores.data.json'
const LIGAS_URL = './server/BBDD/ligas.data.json'
const NOTICIAS_URL = './server/BBDD/noticias.data.json'
const PARTIDOS_URL = './server/BBDD/partidos.data.json'
const USUARIOS_URL = './server/BBDD/usuarios.data.json'

http
    .createServer(async (request, response) => {
        const url = new URL(`http://${request.headers.host}${request.url}`);
        const statusCode = 200
        const params = Object.fromEntries(url.searchParams)
        let responseData = []
        console.log(url.pathname, url.searchParams);
        // Set Up CORS
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Content-Type', MIME_TYPES.json);
        response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
        response.setHeader("Access-Control-Allow-Headers", "*");
        response.setHeader('Access-Control-Max-Age', 2592000); // 30 days
        response.writeHead(statusCode);

        if (request.method === 'OPTIONS') {
            response.end()
            return
        }

        switch (url.pathname) {
            case '/create/acciones':
                crud.create(ACCIONES_URL, params, (data) => {
                    console.log(`server ${data.id} creado`, data)
                    responseData = data

                    response.write(JSON.stringify(responseData));
                    response.end();
                });
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
                crud.findById(ACCIONES_URL, params, (data) => {
                console.log('server find acciones', data)
                responseData = data

                response.write(JSON.stringify(responseData));
                response.end();
                })
                break;
            case '/create/clasificaciones':
                crud.create(CLASIFICACIONES_URL, params, (data) => {
                    console.log(`server ${data.id} creado`, data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                });
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
                crud.findById(CLASIFICACIONES_URL, params, (data) => {
                    console.log('server find clasificaciones', data)
                    responseData = data

                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/create/estadisticas':
                crud.create(ESTADISTICAS_URL, params, (data) => {
                    console.log(`server ${data.id} creado`, data)
                    responseData = data
            
                    response.write(JSON.stringify(responseData));
                    response.end();
                });
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
                crud.findById(ESTADISTICAS_URL, params, (data) => {
                    console.log('server find estadisticas', data)
                    responseData = data
            
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/create/jornadas':
                crud.create(JORNADAS_URL, params, (data) => {
                    console.log(`server ${data.id} creado`, data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                });
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
                crud.findById(JORNADAS_URL, params, (data) => {
                    console.log('server find jornadas', data)
                    responseData = data

                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/create/jugadores':
                crud.create(JUGADORES_URL, params, (data) => {
                    console.log(`server ${data.id} creado`, data)
                    responseData = data
                    
                    response.write(JSON.stringify(responseData));
                    response.end();
                });
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
                crud.findById(JUGADORES_URL, params, (data) => {
                    console.log('server find jugadores', data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/create/ligas':
                crud.create(LIGAS_URL, params, (data) => {
                    console.log(`server ${data.id} creado`, data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                });
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
                crud.findById(LIGAS_URL, params, (data) => {
                    console.log('server find ligas', data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/create/noticias':
                crud.create(NOTICIAS_URL, params, (data) => {
                    console.log(`server ${data.id} creado`, data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                });
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
                crud.findById(NOTICIAS_URL, params, (data) => {
                    console.log('server find noticias', data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/create/partidos':
                crud.create(PARTIDOS_URL, params, (data) => {
                    console.log(`server ${data.id} creado`, data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                });
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
                crud.findById(PARTIDOS_URL, params, (data) => {
                    console.log('server find partidos', data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                })
                break;
            case '/create/usuarios':
                crud.create(USUARIOS_URL, params, (data) => {
                    console.log(`server ${data.id} creado`, data)
                    responseData = data
        
                    response.write(JSON.stringify(responseData));
                    response.end();
                });
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
                crud.findById(USUARIOS_URL, params, (data) => {
                    console.log('server find usuarios', data)
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