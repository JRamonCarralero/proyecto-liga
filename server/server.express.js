import express from 'express';
import bodyParser from 'body-parser'
//import { crud } from "./server.crud.js";
import { db } from "./server.mongodb.js";
import { ObjectId } from "mongodb";
import { paginable, crearPaginacion } from './utils/utils.js';

const app = express();
const port = process.env.PORT;

app.use(express.static('src'))
// for parsing application/json
app.use(bodyParser.json())
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Acciones //

app.post('/create/acciones', async (req, res) => {
    const campos = {
        ...req.body,
        partidoId: new ObjectId(String(req.body.partidoId)),
        ligaId: new ObjectId(String(req.body.ligaId)),
        jugadorId: new ObjectId(String(req.body.jugadorId)),
        equipoId: new ObjectId(String(req.body.equipoId))
    }
    res.json(await db.create(campos, 'acciones'))
})

app.get('/read/acciones', async (req, res) => {
    res.json(await db.get({}, 'acciones'))
})

app.put('/update/acciones/:id', async (req, res) => {
    res.json(await db.update(req.params.id, req.body, 'acciones'))
})

app.delete('/delete/acciones/:id', async (req, res) => {
    res.json(await db.delete(req.params.id, 'acciones'))
})

app.get('/findbyid/acciones/:id', async (req, res) => {
    res.json(await db.findById({ _id: new ObjectId(req.params.id) }, 'acciones'))
})

app.get('/filter/acciones/partidoid/:filter', async (req, res) => {
    res.json(await db.get({ partidoId: new ObjectId(req.params.filter) }, 'acciones'))
})

app.get('/read/acciones/table/:partidoid', async (req, res) => {
    res.json(await db.getAccionesTable(new ObjectId(req.params.partidoid)))
})

// Clasificaciones //

app.post('/create/clasificaciones', async (req, res) => {
    const campos = {
        ...req.body,
        ligaId: new ObjectId(String(req.body.ligaId)),
        equipoId: new ObjectId(String(req.body.equipoId))
    }
    res.json(await db.create(campos, 'clasificaciones'))
})

app.get('/read/clasificaciones', async (req, res) => {
    res.json(await db.get({}, 'clasificaciones'))
})

app.put('/update/clasificaciones/:id', async (req, res) => {
    console.log('body', req.body)
    res.json(await db.update(req.params.id, req.body, 'clasificaciones'))
})

app.delete('/delete/clasificaciones/:id', async (req, res) => {
    res.json(await db.delete(req.params.id, 'clasificaciones'))
})

app.get('/findbyid/clasificaciones/:id', async (req, res) => {
    res.json(await db.findById({ _id: new ObjectId(req.params.id) }, 'clasificaciones'))
})

app.get('/filter/clasificaciones/:ligaid', async (req, res) => {
    res.json(await db.get({ ligaId: new ObjectId(req.params.ligaid) }, 'clasificaciones'))
})

app.get('/filter/clasificaciones/:ligaid/:equipoid', async (req, res) => {
    res.json(await db.get({ ligaId: new ObjectId(req.params.ligaid), equipoId: new ObjectId(req.params.equipoid) }, 'clasificaciones'))
})

app.post('/create/clasificaciones/many', async (req, res) => {
    const  clasificaciones = [...req.body]
    clasificaciones.forEach(clasificacion => {
        clasificacion.ligaId = new ObjectId(String(clasificacion.ligaId))
        clasificacion.equipoId = new ObjectId(String(clasificacion.equipoId))
    })
    res.json(await db.createMany(clasificaciones, 'clasificaciones'))
})

app.delete('/delete/clasificaciones/many/liga/:ligaid', async (req, res) => {
    res.json(await db.deleteMany({ ligaId: new ObjectId(req.params.ligaid) }, 'clasificaciones'))
})


app.get('/read/clasificaciones/table/:ligaid', async (req, res) => {
    res.json(await db.getClasificacionTable(new ObjectId(req.params.ligaid)))
})


// Equipos //

app.post('/create/equipos', async (req, res) => {
    res.json(await db.create(req.body, 'equipos'))
})

app.get('/read/equipos', async (req, res) => {
    res.json(await db.get({}, 'equipos'))
})

app.put('/update/equipos/:id', async (req, res) => {
    res.json(await db.update(req.params.id, req.body, 'equipos'))
})

app.delete('/delete/equipos/:id', async (req, res) => {
    res.json(await db.delete(req.params.id, 'equipos'))
})

app.get('/findbyid/equipos/:id', async (req, res) => {
    res.json(await db.findById({ _id: new ObjectId(req.params.id) }, 'equipos'))
})

app.get('/read/equipos/page/:page', async (req, res) => {
    const equipos = await db.getPaginable({}, Number(req.params.page), 20, { _id: 1 }, 'equipos')
    const numberEquipos = await db.count('noticias')
    const resp = crearPaginacion(equipos, numberEquipos, Number(req.params.page), 20)
    res.json(resp)
})

app.get('/filter/equipos/:ligaid', async (req, res) => {
    const liga = await db.findById({ _id: new ObjectId(req.params.ligaid) }, 'ligas')
    console.log('liga', liga)
    res.json(await db.get({ _id: { $in: liga.equipos } }, 'equipos'))
})

// Estadisticas //

app.post('/create/estadisticas', async (req, res) => {
    const campos = {
        ...req.body,
        jugadorId: new ObjectId(String(req.body.jugadorId)),
        equipoId: new ObjectId(String(req.body.equipoId)),
        ligaId: new ObjectId(String(req.body.ligaId))
    }
    console.log('campos crear estadisticas', campos)
    res.json(await db.create(campos, 'estadisticas'))
})

app.get('/read/estadisticas', async (req, res) => {
    res.json(await db.get({}, 'estadisticas'))
})

app.put('/update/estadisticas/:id', async (req, res) => {
    res.json(await db.update(req.params.id, req.body, 'estadisticas'))
})

app.delete('/delete/estadisticas/:id', async (req, res) => {
    res.json(await db.delete(req.params.id, 'estadisticas'))
})

app.get('/findbyid/estadisticas/:id', async (req, res) => {
    res.json(await db.findById({ _id: new ObjectId(req.params.id) }, 'estadisticas'))
})

app.get('/filter/estadisticas/estjugador/:ligaid/:equipoid/:jugadorid', async (req, res) => {
    res.json(await db.get({ 
        ligaId: new ObjectId(req.params.ligaid),
        equipoId: new ObjectId(req.params.equipoid),
        jugadorId: new ObjectId(req.params.jugadorid) 
    }, 'estadisticas'))
})

app.get('/read/estadisticas/table/:ligaid/:sortby/:page', async (req, res) => {
    const estadisticas = await db.getEstadisticasTable(new ObjectId(req.params.ligaid), req.params.sortby, Number(req.params.page))
    const numberEstadisticas = await db.countItemsWithFilter({ ligaId: new ObjectId(req.params.ligaid) }, 'estadisticas')
    const response = crearPaginacion(estadisticas, numberEstadisticas, Number(req.params.page), 20)
    res.json(response)
})

app.post('/create/estadisticas/liga', async (req, res) => {
    const body = req.body
    const equipos = body.equipos
    const ligaId = body.ligaId
    const estadisticas = []
    const jugadores = await db.get({ equipoId: { $in: equipos } }, 'jugadores')
    jugadores.forEach(jugador => {
        const newEstadistica = {
            ligaId: ligaId,
            equipoId: jugador.equipoId,
            jugadorId: jugador._id,
            ensayos: 0,
            puntosPie: 0,
            puntos: 0,
            tAmarillas: 0,
            tRojas: 0
        }
        estadisticas.push(newEstadistica)
    })
    res.json(await db.createMany(estadisticas, 'estadisticas'))
})

// Jornadas //

app.post('/create/jornadas', async (req, res) => {
    const campos = {
        ...req.body,
        ligaId: new ObjectId(String(req.body.ligaId))
    }
    res.json(await db.create(campos, 'jornadas'))
})

app.get('/read/jornadas', async (req, res) => {
    res.json(await db.get({}, 'jornadas'))
})

app.put('/update/jornadas/:id', async (req, res) => {
    res.json(await db.update(req.params.id, req.body, 'jornadas'))
})

app.delete('/delete/jornadas/:id', async (req, res) => {
    res.json(await db.delete(req.params.id, 'jornadas'))
})

app.get('/findbyid/jornadas/:id', async (req, res) => {
    res.json(await db.findById({ _id: new ObjectId(req.params.id) }, 'jornadas'))
})

app.get('/filter/jornadas/:ligaid', async (req, res) => {
    res.json(await db.getSortItems({ ligaId: new ObjectId(req.params.ligaid) }, { numero: 1}, 'jornadas'))
})

app.delete('/delete/jornadas/many/liga/:ligaid', async (req, res) => {
    res.json(await db.deleteMany({ ligaId: new ObjectId(req.params.ligaid) }, 'jornadas'))
})

// Jugadores //

app.post('/create/jugadores', async (req, res) => {
    const campos = {
        ...req.body,
        equipoId: new ObjectId(String(req.body.equipoId))
    }
    res.json(await db.create(campos, 'jugadores'))
})

app.get('/read/jugadores', async (req, res) => {
    res.json(await db.get({}, 'jugadores'))
})

app.put('/update/jugadores/:id', async (req, res) => {
    res.json(await db.update(req.params.id, req.body, 'jugadores'))
})

app.delete('/delete/jugadores/:id', async (req, res) => {
    res.json(await db.delete(req.params.id, 'jugadores'))
})

app.get('/findbyid/jugadores/:id', async (req, res) => {
    res.json(await db.findById({ _id: new ObjectId(req.params.id) }, 'jugadores'))
})

app.get('/filter/jugadores/:equipoid', async (req, res) => {
    res.json(await db.get({ equipoId: new ObjectId(req.params.equipoid) }, 'jugadores'))
})

app.put('/update/jugadores/many/equipo/:equipoid', async (req, res) => {
    res.json(await db.updateMany({ equipoId: new ObjectId(req.params.equipoid) }, req.body, 'jugadores'))
})


// Ligas //

app.post('/create/ligas', async (req, res) => {
    console.log('body', req.body)
    const liga = {...req.body}
    const equiposObject = []
    liga.equipos.forEach(equipo => equiposObject.push(new ObjectId(String(equipo))))
    liga.equipos = equiposObject
    res.json(await db.create(liga, 'ligas'))
})

app.get('/read/ligas', async (req, res) => {
    res.json(await db.get({}, 'ligas'))
})

app.put('/update/ligas/:id', async (req, res) => {
    res.json(await db.update(req.params.id, req.body, 'ligas'))
})

app.delete('/delete/ligas/:id', async (req, res) => {
    await db.deleteMany({ ligaId: new ObjectId(req.params.id) }, 'partidos')
    await db.deleteMany({ ligaId: new ObjectId(req.params.id) }, 'jornadas')
    await db.deleteMany({ ligaId: new ObjectId(req.params.id) }, 'clasificaciones')
    await db.deleteMany({ ligaId: new ObjectId(req.params.id) }, 'acciones')
    await db.deleteMany({ ligaId: new ObjectId(req.params.id) }, 'estadisticas')
    res.json(await db.delete(req.params.id, 'ligas'))
})

app.get('/findbyid/ligas/:id', async (req, res) => {
    res.json(await db.findById({ _id: new ObjectId(req.params.id) }, 'ligas'))
})

app.get('/read/ligas/page/:page', async (req, res) => {
    const ligas = await db.getPaginable({}, Number(req.params.page), 20, { _id: 1 }, 'ligas')
    const numberLigas = await db.count('ligas')
    const resp = crearPaginacion(ligas, numberLigas, Number(req.params.page), 20)
    res.json(resp)
})

app.get('/filter/ligas/:year', async (req, res) => {
    if (req.params.year === 'all') res.json(await db.get({}, 'ligas'))
    else res.json(await db.get({ year: req.params.year }, 'ligas'))
})

app.get('/read/liga/data/:id', async (req, res) => {
    const liga = await db.get( {_id: new ObjectId(req.params.id)}, 'ligas')
    const partidos = await db.get({ ligaId: new ObjectId(req.params.id) }, 'partidos')
    const jornadas = await db.get({ ligaId: new ObjectId(req.params.id) }, 'jornadas')
    const clasificaciones = await db.get({ ligaId: new ObjectId(req.params.id) }, 'clasificaciones')
    const estadisticas = await db.get({ ligaId: new ObjectId(req.params.id) }, 'estadisticas')
    const equipos = await db.get({ _id: { $in: liga[0].equipos } }, 'equipos')
    const jugadores = await db.get({ equipoId: { $in: liga[0].equipos }}, 'jugadores')

    const data = {
        partidos,
        jornadas,
        clasificaciones,
        equipos,
        estadisticas,
        jugadores
    }
    res.json(data)
})

// Noticias //

app.post('/create/noticias',async (req, res) => {
    const noticia = {...req.body}
    noticia.fecha = new Date()
    res.json(await db.create(noticia, 'noticias'))
})

app.get('/read/noticias', async (req, res) => {
    res.json(await db.get({}, 'noticias'))
})

app.put('/update/noticias/:id', async (req, res) => {
    res.json(await db.update(req.params.id, req.body, 'noticias'))
})

app.delete('/delete/noticias/:id', async (req, res) => {
    res.json(await db.delete(req.params.id, 'noticias'))
})

app.get('/findbyid/noticias/:id', async (req, res) => {
    res.json(await db.findById({ _id: new ObjectId(req.params.id) }, 'noticias'))
})

app.get('/read/noticias/page/:page', async (req, res) => {
    const noticias = await db.get({}, 'noticias')
    const pagNoticias = paginable(noticias, req.params.page, 20)
    res.json(pagNoticias)
})

app.get('/read/noticias/short/:page', async (req, res) => {
    const noticias = await db.get({}, 'noticias')
    const pagNoticias = paginable(noticias, req.params.page, 6)
    res.json(pagNoticias)
})

app.get('/filter/noticias/search/:page/:limit/:filter', async (req, res) => {
    let filter = {}
    if (req.params.filter != '_') {
        const regex = new RegExp(req.params.filter, 'i')
        filter = { titulo: { $regex: regex } }
    }
    const noticias = await db.getPaginable(filter, Number(req.params.page), Number(req.params.limit), { fecha: -1 }, 'noticias')
    const numberNoticias = await db.count('noticias')
    const resp = crearPaginacion(noticias, numberNoticias, Number(req.params.page), Number(req.params.limit))
    res.json(resp)
})

// Partidos //

app.post('/create/partidos', async (req, res) => {
    const partido = {
        ...req.body,
        jornadaId: new ObjectId(String(req.body.jornadaId)),
        ligaId: new ObjectId(String(req.body.ligaId)),
        local: new ObjectId(String(req.body.local)),
        visitante: new ObjectId(String(req.body.visitante))
    }
    res.json(await db.create(partido, 'partidos'))
})

app.get('/read/partidos', async (req, res) => {
    res.json(await db.get({}, 'partidos'))
})

app.put('/update/partidos/:id', async (req, res) => {
    res.json(await db.update(req.params.id, req.body, 'partidos'))
})

app.delete('/delete/partidos/:id', async (req, res) => {
    res.json(await db.delete(req.params.id, 'partidos'))
})

app.get('/findbyid/partidos/:id', async (req, res) => {
    res.json(await db.findById({ _id: new ObjectId(req.params.id) }, 'partidos'))
})

app.get('/filter/partidos/:jornadaid', async (req, res) => {
    res.json(await db.get({ jornadaId: new ObjectId(req.params.jornadaid) }, 'partidos'))
})

app.get('/filter/partidos/liga/:ligaid', async (req, res) => {
    res.json(await db.get({ ligaId: new ObjectId(req.params.ligaid) }, 'partidos'))
})

app.post('/create/partidos/many', async (req, res) => {
    const  partidos = [...req.body]
    partidos.forEach(partido => {
        partido.jornadaId = new ObjectId(String(partido.jornadaId))
        partido.ligaId = new ObjectId(String(partido.ligaId))
        partido.local = new ObjectId(String(partido.local))
        partido.visitante = new ObjectId(String(partido.visitante))
    })
    res.json(await db.createMany(partidos, 'partidos'))
})

app.delete('/delete/partidos/many/liga/:ligaid', async (req, res) => {
    res.json(await db.deleteMany({ ligaId: new ObjectId(req.params.ligaid) }, 'partidos'))
})

app.get('/read/partidos/table/:jornadaid', async (req, res) => {
    res.json(await db.getJornadaTable(new ObjectId(req.params.jornadaid)))
})

app.get('/find/partidos/equipos/:partidoId', async (req, res) => {
    res.json(await db.getPartidoWithEquipos(new ObjectId(req.params.partidoId)))
})

// Usuarios //

app.post('/create/usuarios', requireAuth, async (req, res) => {
    res.json(await db.create(req.body, 'usuarios'))
    /* crud.create(USUARIOS_URL, req.body, (data) => {
        res.json(data)
      }); */
})

app.get('/read/usuarios', async (req, res) => {
    res.json(await db.get({}, 'usuarios'))
    /* crud.read(USUARIOS_URL, (data) => {
        res.json(data)
      }); */
})

app.put('/update/usuarios/:id', async (req, res) => {
    res.json(await db.update(req.params.id, req.body, 'usuarios'))
    /* crud.update(USUARIOS_URL, req.params.id, req.body, (data) => {
        res.json(data)
      }); */
})

app.delete('/delete/usuarios/:id', async (req, res) => {
    res.json(await db.delete(req.params.id, 'usuarios'))
    /* crud.deleteById(USUARIOS_URL, req.params.id, (data) => {
        res.json(data)
      }); */
})

app.get('/findbyid/usuarios/:id', async (req, res) => {
    res.json(await db.findById({ _id: new ObjectId(req.params.id) }, 'usuarios'))
    /* crud.findById(USUARIOS_URL, req.params.id, (data) => {
        res.json(data)
    }) */
})

app.post('/login', async (req, res) => {
    const user = await db.logInUser(req.body)
    if (user) {
      // TODO: use OAuth2
      // ...
      // Simulation of authentication (OAuth2)
      user.token = '123456'
      // Remove password
      delete user.password
      res.json(user)
    } else {
      // Unauthorized
      res.status(401).send('Unauthorized')
    }
  })

  
app.listen(port, () => {
        console.log(`My Rugby League listening on port ${port}`)
    })


/**
 * Middleware that checks if the Authorization header is present and valid.
 * If the header is present and valid, the request is allowed to proceed.
 * If the header is not present or invalid, an Unauthorized response is sent.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Express next middleware function
 */
function requireAuth(req, res, next) {
    // Simulation of authentication (OAuth2)
    console.log('req.headers.authorization', req.headers.authorization)
    if (req.headers.authorization === 'Bearer 123456') {
        next()
    } else {
        // Unauthorized
        res.status(401).send('Unauthorized')
    }
}