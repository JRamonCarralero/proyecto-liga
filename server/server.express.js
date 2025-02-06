import express from 'express';
import * as qs from "node:querystring";
import { crud } from "./server.crud.js";

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

const app = express();
const port = process.env.PORT;

let chunks = [];

app.use(express.static('src'))

app.get('/hello/:nombre', (req, res) => {
        res.send(`Hola ${req.params.nombre}`)	
    })

// Acciones //

app.get('/create/acciones', (req, res) => {
    req.on('data', (chunk) => {
        chunks.push(chunk)
    })
    req.on('end', () => {
        let body = Buffer.concat(chunks)
        console.log('create accion - body BUFFER', body)
        let parsedData = qs.parse(body.toString())
        console.log('create accion - body', parsedData)
        crud.create(ACCIONES_URL, parsedData, (data) => {
            console.log(`server create accion ${data.id} creado`, data)
            const responseData = data

            res.write(JSON.stringify(responseData));
            res.end();
        });
    })
})

app.get('/read/acciones', (req, res) => {
    crud.read(ACCIONES_URL, (data) => {
        console.log('server read acciones', data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    });
})

app.get('/update/acciones/:id', (req, res) => {
    req.on('data', (chunk) => {
        chunks.push(chunk)
    })
    req.on('end', () => {
        let body = Buffer.concat(chunks)
        let parsedData = qs.parse(body.toString())
        crud.update(ACCIONES_URL, req.params.id, parsedData, (data) => {
        console.log(`server update accion ${req.params.id} modificado`, data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
        });
    })
})

app.get('/delete/acciones/:id', (req, res) => {
    crud.deleteById(ACCIONES_URL, req.params.id, (data) => {
        console.log('server delete accion', data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

app.get('/findbyid/acciones/:id', (req, res) => {
    crud.findById(ACCIONES_URL, req.params.id, (data) => {
        console.log('server read accion', req.params.id, data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

app.get('/read/acciones/page/:page', (req, res) => {
    crud.readPage(ACCIONES_URL, req.params.page, (data) => {
        console.log('server read acciones page', req.params.page, data)
        const responseData = data    

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

app.get('/filter/acciones', (req, res) => {
    crud.filter(ACCIONES_URL, req.params, (data) => {
        console.log('server filter acciones', data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

// Clasificaciones //

app.get('/create/clasificaciones', (req, res) => {
    req.on('data', (chunk) => {
        chunks.push(chunk)
    })
    req.on('end', () => {
        let body = Buffer.concat(chunks)
        console.log('create clasificacion - body BUFFER', body)
        let parsedData = qs.parse(body.toString())
        console.log('create clasificacion - body', parsedData)
        crud.create(CLASIFICACIONES_URL, parsedData, (data) => {
            console.log(`server create clasificacion ${data.name} creado`, data)
            const responseData = data

            res.write(JSON.stringify(responseData));
            res.end();
        });
    })
})

app.get('/read/clasificaciones', (req, res) => {
    crud.read(CLASIFICACIONES_URL, (data) => {
        console.log('server read clasificaciones', data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    });
})

app.get('/update/clasificaciones/:id', (req, res) => {
    req.on('data', (chunk) => {
        chunks.push(chunk)
    })
    req.on('end', () => {
        let body = Buffer.concat(chunks)
        let parsedData = qs.parse(body.toString())
        crud.update(CLASIFICACIONES_URL, req.params.id, parsedData, (data) => {
        console.log(`server update clasificacion ${req.params.id} modificado`, data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
        });
    })
})

app.get('/delete/clasificaciones/:id', (req, res) => {
    crud.deleteById(CLASIFICACIONES_URL, req.params.id, (data) => {
        console.log('server delete clasificacion', data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

app.get('/findbyid/clasificaciones/:id', (req, res) => {
    crud.findById(CLASIFICACIONES_URL, req.params.id, (data) => {
        console.log('server read clasificacion', req.params.id, data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

app.get('/read/clasificaciones/page/:page', (req, res) => {
    crud.readPage(CLASIFICACIONES_URL, req.params.page, (data) => {
        console.log('server read clasificaciones page', req.params.page, data)
        const responseData = data    

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

app.get('/filter/clasificaciones/:tipo/:filter', (req, res) => {
    crud.filter(CLASIFICACIONES_URL, req.params, (data) => {
        console.log('server filter clasificaciones', data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

// Equipos //

app.get('/create/equipos', (req, res) => {
    req.on('data', (chunk) => {
        chunks.push(chunk)
    })
    req.on('end', () => {
        let body = Buffer.concat(chunks)
        console.log('create equipo - body BUFFER', body)
        let parsedData = qs.parse(body.toString())
        console.log('create equipo - body', parsedData)
        crud.create(EQUIPOS_URL, parsedData, (data) => {
            console.log(`server create equipo ${data.name} creado`, data)
            const responseData = data

            res.write(JSON.stringify(responseData));
            res.end();
        });
    })
})

app.get('/read/equipos', (req, res) => {
    crud.read(EQUIPOS_URL, (data) => {
        console.log('server read equipos', data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    });
})

app.get('/update/equipos/:id', (req, res) => {
    req.on('data', (chunk) => {
        chunks.push(chunk)
    })
    req.on('end', () => {
        let body = Buffer.concat(chunks)
        let parsedData = qs.parse(body.toString())
        crud.update(EQUIPOS_URL, req.params.id, parsedData, (data) => {
        console.log(`server update equipo ${req.params.id} modificado`, data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
        });
    })
})

app.get('/delete/equipos/:id', (req, res) => {
    crud.deleteById(EQUIPOS_URL, req.params.id, (data) => {
        console.log('server delete equipo', data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

app.get('/findbyid/equipos/:id', (req, res) => {
    crud.findById(EQUIPOS_URL, req.params.id, (data) => {
        console.log('server read equipo', req.params.id, data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

app.get('/read/equipos/page/:page', (req, res) => {
    crud.readPage(EQUIPOS_URL, req.params.page, (data) => {
        console.log('server read equipos page', req.params.page, data)
        const responseData = data    

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

app.get('/filter/equipos', (req, res) => {
    crud.filter(EQUIPOS_URL, req.params, (data) => {
        console.log('server filter equipos', data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

// Estadisticas //

app.get('/create/estadisticas', (req, res) => {
    req.on('data', (chunk) => {
        chunks.push(chunk)
    })
    req.on('end', () => {
        let body = Buffer.concat(chunks)
        console.log('create estadistica - body BUFFER', body)
        let parsedData = qs.parse(body.toString())
        console.log('create estadistica - body', parsedData)
        crud.create(ESTADISTICAS_URL, parsedData, (data) => {
            console.log(`server create estadistica ${data.name} creado`, data)
            const responseData = data

            res.write(JSON.stringify(responseData));
            res.end();
        });
    })
})

app.get('/read/estadisticas', (req, res) => {
    crud.read(ESTADISTICAS_URL, (data) => {
        console.log('server read estadisticas', data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    });
})

app.get('/update/estadisticas/:id', (req, res) => {
    req.on('data', (chunk) => {
        chunks.push(chunk)
    })
    req.on('end', () => {
        let body = Buffer.concat(chunks)
        let parsedData = qs.parse(body.toString())
        crud.update(ESTADISTICAS_URL, req.params.id, parsedData, (data) => {
        console.log(`server update estadistica ${req.params.id} modificado`, data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
        });
    })
})

app.get('/delete/estadisticas/:id', (req, res) => {
    crud.deleteById(ESTADISTICAS_URL, req.params.id, (data) => {
        console.log('server delete estadistica', data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

app.get('/findbyid/estadisticas/:id', (req, res) => {
    crud.findById(ESTADISTICAS_URL, req.params.id, (data) => {
        console.log('server read estadistica', req.params.id, data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

app.get('/read/estadisticas/page/:page', (req, res) => {
    crud.readPage(ESTADISTICAS_URL, req.params.page, (data) => {
        console.log('server read estadisticas page', req.params.page, data)
        const responseData = data    

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

app.get('/filter/estadisticas', (req, res) => {
    crud.filter(ESTADISTICAS_URL, req.params, (data) => {
        console.log('server filter estadisticas', data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

// Jornadas //

app.get('/create/jornadas', (req, res) => {
    req.on('data', (chunk) => {
        chunks.push(chunk)
    })
    req.on('end', () => {
        let body = Buffer.concat(chunks)
        console.log('create jornada - body BUFFER', body)
        let parsedData = qs.parse(body.toString())
        console.log('create jornada - body', parsedData)
        crud.create(JORNADAS_URL, parsedData, (data) => {
            console.log(`server create jornada ${data.name} creado`, data)
            const responseData = data

            res.write(JSON.stringify(responseData));
            res.end();
        });
    })
})

app.get('/read/jornadas', (req, res) => {
    crud.read(JORNADAS_URL, (data) => {
        console.log('server read jornada', data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    });
})

app.get('/update/jornadas/:id', (req, res) => {
    req.on('data', (chunk) => {
        chunks.push(chunk)
    })
    req.on('end', () => {
        let body = Buffer.concat(chunks)
        let parsedData = qs.parse(body.toString())
        crud.update(JORNADAS_URL, req.params.id, parsedData, (data) => {
        console.log(`server update jornada ${req.params.id} modificado`, data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
        });
    })
})

app.get('/delete/jornadas/:id', (req, res) => {
    crud.deleteById(JORNADAS_URL, req.params.id, (data) => {
        console.log('server delete jornada', data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

app.get('/findbyid/jornadas/:id', (req, res) => {
    crud.findById(JORNADAS_URL, req.params.id, (data) => {
        console.log('server read jornada', req.params.id, data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

app.get('/read/jornadas/page/:page', (req, res) => {
    crud.readPage(JORNADAS_URL, req.params.page, (data) => {
        console.log('server read jornadas page', req.params.page, data)
        const responseData = data    

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

app.get('/filter/jornadas/:tipo/:filter', (req, res) => {
    crud.filter(JORNADAS_URL, req.params, (data) => {
        console.log('server filter jornadas', data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

// Jugadores //

app.get('/create/jugadores', (req, res) => {
    req.on('data', (chunk) => {
        chunks.push(chunk)
    })
    req.on('end', () => {
        let body = Buffer.concat(chunks)
        console.log('create jugador - body BUFFER', body)
        let parsedData = qs.parse(body.toString())
        console.log('create jugador - body', parsedData)
        crud.create(JUGADORES_URL, parsedData, (data) => {
            console.log(`server create jugador ${data.name} creado`, data)
            const responseData = data

            res.write(JSON.stringify(responseData));
            res.end();
        });
    })
})

app.get('/read/jugadores', (req, res) => {
    crud.read(JUGADORES_URL, (data) => {
        console.log('server read jugador', data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    });
})

app.get('/update/jugadores/:id', (req, res) => {
    req.on('data', (chunk) => {
        chunks.push(chunk)
    })
    req.on('end', () => {
        let body = Buffer.concat(chunks)
        let parsedData = qs.parse(body.toString())
        crud.update(JUGADORES_URL, req.params.id, parsedData, (data) => {
        console.log(`server update jugador ${req.params.id} modificado`, data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
        });
    })
})

app.get('/delete/jugadores/:id', (req, res) => {
    crud.deleteById(JUGADORES_URL, req.params.id, (data) => {
        console.log('server delete jugador', data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

app.get('/findbyid/jugadores/:id', (req, res) => {
    crud.findById(JUGADORES_URL, req.params.id, (data) => {
        console.log('server read jugador', req.params.id, data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

app.get('/read/jugadores/page/:page', (req, res) => {
    crud.readPage(JUGADORES_URL, req.params.page, (data) => {
        console.log('server read jugadores page', req.params.page, data)
        const responseData = data    

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

app.get('/filter/jugadores/:tipo/:filter', (req, res) => {
    crud.filter(JUGADORES_URL, req.params, (data) => {
        console.log('server filter jugadores', data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

// Ligas //

app.get('/create/ligas', (req, res) => {
    req.on('data', (chunk) => {
        chunks.push(chunk)
    })
    req.on('end', () => {
        let body = Buffer.concat(chunks)
        console.log('create liga - body BUFFER', body)
        let parsedData = qs.parse(body.toString())
        console.log('create liga - body', parsedData)
        const equipos = parsedData.equipos.split(',')
        parsedData.equipos = equipos
        crud.create(LIGAS_URL, parsedData, (data) => {
            console.log(`server create liga ${data.name} creado`, data)
            const responseData = data

            res.write(JSON.stringify(responseData));
            res.end();
        });
    })
})

app.get('/read/ligas', (req, res) => {
    crud.read(LIGAS_URL, (data) => {
        console.log('server read liga', data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    });
})

app.get('/update/ligas/:id', (req, res) => {
    req.on('data', (chunk) => {
        chunks.push(chunk)
    })
    req.on('end', () => {
        let body = Buffer.concat(chunks)
        let parsedData = qs.parse(body.toString())
        crud.update(LIGAS_URL, req.params.id, parsedData, (data) => {
        console.log(`server update liga ${req.params.id} modificado`, data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
        });
    })
})

app.get('/delete/ligas/:id', (req, res) => {
    crud.deleteById(LIGAS_URL, req.params.id, (data) => {
        console.log('server delete liga', data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

app.get('/findbyid/ligas/:id', (req, res) => {
    crud.findById(LIGAS_URL, req.params.id, (data) => {
        console.log('server read liga', req.params.id, data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

app.get('/read/ligas/page/:page', (req, res) => {
    crud.readPage(LIGAS_URL, req.params.page, (data) => {
        console.log('server read ligas page', req.params.page, data)
        const responseData = data    

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

app.get('/filter/ligas/:tipo/:filter', (req, res) => {
    crud.filter(LIGAS_URL, req.params, (data) => {
        console.log('server filter ligas', data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

// Noticias //

app.get('/create/noticias', (req, res) => {
    req.on('data', (chunk) => {
        chunks.push(chunk)
    })
    req.on('end', () => {
        let body = Buffer.concat(chunks)
        console.log('create noticia - body BUFFER', body)
        let parsedData = qs.parse(body.toString())
        console.log('create noticia - body', parsedData)
        crud.create(NOTICIAS_URL, parsedData, (data) => {
            console.log(`server create noticia ${data.name} creado`, data)
            const responseData = data

            res.write(JSON.stringify(responseData));
            res.end();
        });
    })
})

app.get('/read/noticias', (req, res) => {
    crud.read(NOTICIAS_URL, (data) => {
        console.log('server read noticias', data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    });
})

app.get('/update/noticias/:id', (req, res) => {
    req.on('data', (chunk) => {
        chunks.push(chunk)
    })
    req.on('end', () => {
        let body = Buffer.concat(chunks)
        let parsedData = qs.parse(body.toString())
        crud.update(NOTICIAS_URL, req.params.id, parsedData, (data) => {
        console.log(`server update noticia ${req.params.id} modificado`, data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
        });
    })
})

app.get('/delete/noticias/:id', (req, res) => {
    crud.deleteById(NOTICIAS_URL, req.params.id, (data) => {
        console.log('server delete noticia', data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

app.get('/findbyid/noticias/:id', (req, res) => {
    crud.findById(NOTICIAS_URL, req.params.id, (data) => {
        console.log('server read noticia', req.params.id, data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

app.get('/read/noticias/page/:page', (req, res) => {
    crud.readPage(NOTICIAS_URL, req.params.page, (data) => {
        console.log('server read noticias page', req.params.page, data)
        const responseData = data    

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

app.get('/read/noticias/short/:page', (req, res) => {
    crud.readShortPage(NOTICIAS_URL, req.params.page, (data) => {
        console.log('server read noticias page', req.params.page, data)
        const responseData = data    

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

app.get('/filter/noticias/:page/:tipo/:filter', (req, res) => {
    console.log('req.params',req.params)
    crud.filter(NOTICIAS_URL, req.params, (data) => {
        console.log('server filter noticias', data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

// Partidos //

app.get('/create/partidos', (req, res) => {
    req.on('data', (chunk) => {
        chunks.push(chunk)
    })
    req.on('end', () => {
        let body = Buffer.concat(chunks)
        console.log('create partido - body BUFFER', body)
        let parsedData = qs.parse(body.toString())
        console.log('create partido - body', parsedData)
        crud.create(PARTIDOS_URL, parsedData, (data) => {
            console.log(`server create partido ${data.name} creado`, data)
            const responseData = data

            res.write(JSON.stringify(responseData));
            res.end();
        });
    })
})

app.get('/read/partidos', (req, res) => {
    crud.read(PARTIDOS_URL, (data) => {
        console.log('server read partidos', data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    });
})

app.get('/update/partidos/:id', (req, res) => {
    req.on('data', (chunk) => {
        chunks.push(chunk)
    })
    req.on('end', () => {
        let body = Buffer.concat(chunks)
        let parsedData = qs.parse(body.toString())
        crud.update(PARTIDOS_URL, req.params.id, parsedData, (data) => {
        console.log(`server update partido ${req.params.id} modificado`, data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
        });
    })
})

app.get('/delete/partidos/:id', (req, res) => {
    crud.deleteById(PARTIDOS_URL, req.params.id, (data) => {
        console.log('server delete partido', data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

app.get('/findbyid/partidos/:id', (req, res) => {
    crud.findById(PARTIDOS_URL, req.params.id, (data) => {
        console.log('server read partido', req.params.id, data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

app.get('/read/partidos/page/:page', (req, res) => {
    crud.readPage(PARTIDOS_URL, req.params.page, (data) => {
        console.log('server read partidos page', req.params.page, data)
        const responseData = data    

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

app.get('/filter/partidos/:tipo/:filter', (req, res) => {
    crud.filter(PARTIDOS_URL, req.params, (data) => {
        console.log('server filter partidos', data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

// Usuarios //

app.get('/create/usuarios', (req, res) => {
    req.on('data', (chunk) => {
        chunks.push(chunk)
    })
    req.on('end', () => {
        let body = Buffer.concat(chunks)
        console.log('create usuario - body BUFFER', body)
        let parsedData = qs.parse(body.toString())
        console.log('create usuario - body', parsedData)
        crud.create(USUARIOS_URL, parsedData, (data) => {
            console.log(`server create usuario ${data.name} creado`, data)
            const responseData = data

            res.write(JSON.stringify(responseData));
            res.end();
        });
    })
})

app.get('/read/usuarios', (req, res) => {
    crud.read(USUARIOS_URL, (data) => {
        console.log('server read usuarios', data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    });
})

app.get('/update/usuarios/:id', (req, res) => {
    req.on('data', (chunk) => {
        chunks.push(chunk)
    })
    req.on('end', () => {
        let body = Buffer.concat(chunks)
        let parsedData = qs.parse(body.toString())
        crud.update(USUARIOS_URL, req.params.id, parsedData, (data) => {
        console.log(`server update usuario ${req.params.id} modificado`, data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
        });
    })
})

app.get('/delete/usuarios/:id', (req, res) => {
    crud.deleteById(USUARIOS_URL, req.params.id, (data) => {
        console.log('server delete usuario', data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

app.get('/findbyid/usuarios/:id', (req, res) => {
    crud.findById(USUARIOS_URL, req.params.id, (data) => {
        console.log('server read usuario', req.params.id, data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

app.get('/read/usuarios/page/:page', (req, res) => {
    crud.readPage(USUARIOS_URL, req.params.page, (data) => {
        console.log('server read usuarios page', req.params.page, data)
        const responseData = data    

        res.write(JSON.stringify(responseData));
        res.end();
    })
})

app.get('/filter/usuarios', (req, res) => {
    crud.filter(USUARIOS_URL, req.params, (data) => {
        console.log('server filter usuarios', data)
        const responseData = data

        res.write(JSON.stringify(responseData));
        res.end();
    })
})
  
app.listen(port, () => {
        console.log(`My Rugby League listening on port ${port}`)
    })