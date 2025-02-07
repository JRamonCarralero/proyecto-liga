import express from 'express';
import bodyParser from 'body-parser'
import { crud } from "./server.crud.js";
import { db } from "./server.mongodb.js";
import { ObjectId } from "mongodb";

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

app.use(express.static('src'))
// for parsing application/json
app.use(bodyParser.json())
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Acciones //

app.post('/create/acciones', async (req, res) => {
    res.json(await db.create(req.body, 'acciones'))
    /* crud.create(ACCIONES_URL, req.body, (data) => {
        res.json(data)
      }); */
})

app.get('/read/acciones', async (req, res) => {
    res.json(await db.get({}, 'acciones'))
    /* crud.read(ACCIONES_URL, (data) => {
        res.json(data)
      }); */
})

app.put('/update/acciones/:id', async (req, res) => {
    res.json(await db.update(req.params.id, req.body, 'acciones'))
    /* crud.update(ACCIONES_URL, req.params.id, req.body, (data) => {
        res.json(data)
      }); */
})

app.delete('/delete/acciones/:id', async (req, res) => {
    res.json(await db.delete(req.params.id, 'acciones'))
    /* crud.deleteById(ACCIONES_URL, req.params.id, (data) => {
        res.json(data)
      }); */
})

app.get('/findbyid/acciones/:id', async (req, res) => {
    res.json(await db.articles.get({ _id: req.params.id }, 'acciones'))
    /* crud.findById(ACCIONES_URL, req.params.id, (data) => {
        res.json(data)
    }) */
})

app.get('/read/acciones/page/:page', (req, res) => {
    crud.readPage(ACCIONES_URL, req.params.page, (data) => {
        res.json(data)
    })
})

app.get('/filter/acciones/:filter', (req, res) => {
    crud.filter(ACCIONES_URL, req.params, (data) => {
        res.json(data)
    })
})

// Clasificaciones //

app.post('/create/clasificaciones', async (req, res) => {
    res.json(await db.create(req.body, 'clasificaciones'))
    /* crud.create(CLASIFICACIONES_URL, req.body, (data) => {
        res.json(data)
      }); */
})

app.get('/read/clasificaciones', async (req, res) => {
    res.json(await db.get({}, 'clasificaciones'))
    /* crud.read(CLASIFICACIONES_URL, (data) => {
        res.json(data)
      }); */
})

app.put('/update/clasificaciones/:id', async (req, res) => {
    res.json(await db.update(req.params.id, req.body, 'clasificaciones'))
    /* crud.update(CLASIFICACIONES_URL, req.params.id, req.body, (data) => {
        res.json(data)
      }); */
})

app.delete('/delete/clasificaciones/:id', async (req, res) => {
    res.json(await db.delete(req.params.id, 'clasificaciones'))
    /* crud.deleteById(CLASIFICACIONES_URL, req.params.id, (data) => {
        res.json(data)
      }); */
})

app.get('/findbyid/clasificaciones/:id', async (req, res) => {
    res.json(await db.articles.get({ _id: req.params.id }, 'clasificaciones'))
    /* crud.findById(CLASIFICACIONES_URL, req.params.id, (data) => {
        res.json(data)
    }) */
})

app.get('/read/clasificaciones/page/:page', (req, res) => {
    crud.readPage(CLASIFICACIONES_URL, req.params.page, (data) => {
        res.json(data)
    })
})

app.get('/filter/clasificaciones/:ligaid', async (req, res) => {
    res.json(await db.articles.get({ ligaid: req.params.ligaid }, 'acciones'))
    /* crud.filter(CLASIFICACIONES_URL, req.params, (data) => {
        res.json(data)
    }) */
})

app.get('/filter/clasificaciones/:ligaid/:equipoid', async (req, res) => {
    res.json(await db.articles.get({ ligaid: req.params.ligaid, equipoid: req.params.equipoid }, 'clasificaciones'))
    /* crud.filter(CLASIFICACIONES_URL, req.params, (data) => {
        res.json(data)
    }) */
})

// Equipos //

app.post('/create/equipos', async (req, res) => {
    res.json(await db.create(req.body, 'equipos'))
    /* crud.create(EQUIPOS_URL, req.body, (data) => {
        res.json(data)
      }); */
})

app.get('/read/equipos', async (req, res) => {
    res.json(await db.get({}, 'equipos'))
    /* crud.read(EQUIPOS_URL, (data) => {
        res.json(data)
      }); */
})

app.put('/update/equipos/:id', async (req, res) => {
    res.json(await db.update(req.params.id, req.body, 'equipos'))
    /* crud.update(EQUIPOS_URL, req.params.id, req.body, (data) => {
        res.json(data)
      }); */
})

app.delete('/delete/equipos/:id', async (req, res) => {
    res.json(await db.delete(req.params.id, 'equipos'))
    /* crud.deleteById(EQUIPOS_URL, req.params.id, (data) => {
        res.json(data)
      }); */
})

app.get('/findbyid/equipos/:id', async (req, res) => {
    res.json(await db.articles.get({ _id: req.params.id }, 'equipos'))
    /* crud.findById(EQUIPOS_URL, req.params.id, (data) => {
        res.json(data)
    }) */
})

app.get('/read/equipos/page/:page', (req, res) => {
    crud.readPage(EQUIPOS_URL, req.params.page, (data) => {
        res.json(data)
    })
})

app.get('/filter/equipos', (req, res) => {
    crud.filter(EQUIPOS_URL, req.params, (data) => {
        res.json(data)
    })
})

// Estadisticas //

app.post('/create/estadisticas', async (req, res) => {
    res.json(await db.create(req.body, 'estadisticas'))
    /* crud.create(ESTADISTICAS_URL, req.body, (data) => {
        res.json(data)
      }); */
})

app.get('/read/estadisticas', async (req, res) => {
    res.json(await db.get({}, 'estadisticas'))
    /* crud.read(ESTADISTICAS_URL, (data) => {
        res.json(data)
      }); */
})

app.put('/update/estadisticas/:id', async (req, res) => {
    res.json(await db.update(req.params.id, req.body, 'estadisticas'))
    /* crud.update(ESTADISTICAS_URL, req.params.id, req.body, (data) => {
        res.json(data)
      }); */
})

app.delete('/delete/estadisticas/:id', async (req, res) => {
    res.json(await db.delete(req.params.id, 'estadisticas'))
    /* crud.deleteById(ESTADISTICAS_URL, req.params.id, (data) => {
        res.json(data)
      }); */
})

app.get('/findbyid/estadisticas/:id', async (req, res) => {
    res.json(await db.articles.get({ _id: req.params.id }, 'estadisticas'))
    /* crud.findById(ESTADISTICAS_URL, req.params.id, (data) => {
        res.json(data)
    }) */
})

app.get('/read/estadisticas/page/:page', (req, res) => {
    crud.readPage(ESTADISTICAS_URL, req.params.page, (data) => {
        res.json(data)
    })
})

app.get('/filter/estadisticas/:ligaig/equipoid/:jugadorid', async (req, res) => {
    res.json(await db.articles.get({ ligaid: req.params.ligaig, equipoid: req.params.equipoid, jugadorid: req.params.jugadorid }, 'estadisticas'))
    /* crud.filter(ESTADISTICAS_URL, req.params, (data) => {
        res.json(data)
    }) */
})

// Jornadas //

app.post('/create/jornadas', async (req, res) => {
    res.json(await db.create(req.body, 'jornadas'))
    /* crud.create(JORNADAS_URL, req.body, (data) => {
        res.json(data)
      }); */
})

app.get('/read/jornadas', async (req, res) => {
    res.json(await db.get({}, 'jornadas'))
    /* crud.read(JORNADAS_URL, (data) => {
        res.json(data)
      }); */
})

app.put('/update/jornadas/:id', async (req, res) => {
    res.json(await db.update(req.params.id, req.body, 'jornadas'))
    /* crud.update(JORNADAS_URL, req.params.id, req.body, (data) => {
        res.json(data)
      }); */
})

app.delete('/delete/jornadas/:id', async (req, res) => {
    res.json(await db.delete(req.params.id, 'jornadas'))
    /* crud.deleteById(JORNADAS_URL, req.params.id, (data) => {
        res.json(data)
      }); */
})

app.get('/findbyid/jornadas/:id', async (req, res) => {
    res.json(await db.articles.get({ _id: req.params.id }, 'jornadas'))
    /* crud.findById(JORNADAS_URL, req.params.id, (data) => {
        res.json(data)
    }) */
})

app.get('/read/jornadas/page/:page', (req, res) => {
    crud.readPage(JORNADAS_URL, req.params.page, (data) => {
        res.json(data)
    })
})

app.get('/filter/jornadas/:ligaid', async (req, res) => {
    res.json(await db.articles.get({ ligaid: req.params.ligaid }, 'jornadas'))
    /* crud.filter(JORNADAS_URL, req.params, (data) => {
        res.json(data)
    }) */
})

// Jugadores //

app.post('/create/jugadores', async (req, res) => {
    res.json(await db.create(req.body, 'jugadores'))
    /* crud.create(JUGADORES_URL, req.body, (data) => {
        res.json(data)
      }); */
})

app.get('/read/jugadores', async (req, res) => {
    res.json(await db.get({}, 'jugadores'))
    /* crud.read(JUGADORES_URL, (data) => {
        res.json(data)
      }); */
})

app.put('/update/jugadores/:id', async (req, res) => {
    res.json(await db.update(req.params.id, req.body, 'jugadores'))
    /* crud.update(JUGADORES_URL, req.params.id, req.body, (data) => {
        res.json(data)
      }); */
})

app.delete('/delete/jugadores/:id', async (req, res) => {
    res.json(await db.delete(req.params.id, 'jugadores'))
    /* crud.deleteById(JUGADORES_URL, req.params.id, (data) => {
        res.json(data)
      }); */
})

app.get('/findbyid/jugadores/:id', async (req, res) => {
    res.json(await db.articles.get({ _id: req.params.id }, 'acciones'))
    /* crud.findById(JUGADORES_URL, req.params.id, (data) => {
        res.json(data)
    }) */
})

app.get('/read/jugadores/page/:page', (req, res) => {
    crud.readPage(JUGADORES_URL, req.params.page, (data) => {
        res.json(data)
    })
})

app.get('/filter/jugadores/:equipoid', async (req, res) => {
    res.json(await db.articles.get({ equipoid: req.params.equipoid }, 'jugadores'))
    /* crud.filter(JUGADORES_URL, req.params, (data) => {
        res.json(data)
    }) */
})

// Ligas //

app.post('/create/ligas', async (req, res) => {
    res.json(await db.create(req.body, 'ligas'))
    /* crud.create(LIGAS_URL, req.body, (data) => {
        res.json(data)
      }); */
})

app.get('/read/ligas', async (req, res) => {
    res.json(await db.get({}, 'ligas'))
    /* crud.read(LIGAS_URL, (data) => {
        res.json(data)
      }); */
})

app.put('/update/ligas/:id', async (req, res) => {
    res.json(await db.update(req.params.id, req.body, 'ligas'))
    /* crud.update(LIGAS_URL, req.params.id, req.body, (data) => {
        res.json(data)
      }); */
})

app.delete('/delete/ligas/:id', async (req, res) => {
    res.json(await db.delete(req.params.id, 'ligas'))
    /* crud.deleteById(LIGAS_URL, req.params.id, (data) => {
        res.json(data)
      }); */
})

app.get('/findbyid/ligas/:id', async (req, res) => {
    res.json(await db.articles.get({ _id: req.params.id }, 'ligas'))
    /* crud.findById(LIGAS_URL, req.params.id, (data) => {
        res.json(data)
    }) */
})

app.get('/read/ligas/page/:page', (req, res) => {
    crud.readPage(LIGAS_URL, req.params.page, (data) => {
        res.json(data)
    })
})

app.get('/filter/ligas/:year', async (req, res) => {
    res.json(await db.articles.get({ year: req.params.year }, 'acciones'))
    /* crud.filter(LIGAS_URL, req.params, (data) => {
        res.json(data)
    }) */
})

// Noticias //

app.post('/create/noticias',async (req, res) => {
    res.json(await db.create(req.body, 'noticias'))
    /* crud.create(NOTICIAS_URL, req.body, (data) => {
        res.json(data)
      }); */
})

app.get('/read/noticias', async (req, res) => {
    res.json(await db.get({}, 'noticias'))
    /* crud.read(NOTICIAS_URL, (data) => {
        res.json(data)
      }); */
})

app.put('/update/noticias/:id', async (req, res) => {
    res.json(await db.update(req.params.id, req.body, 'noticias'))
    /* crud.update(NOTICIAS_URL, req.params.id, req.body, (data) => {
        res.json(data)
      }); */
})

app.delete('/delete/noticias/:id', async (req, res) => {
    res.json(await db.delete(req.params.id, 'noticias'))
    /* crud.deleteById(NOTICIAS_URL, req.params.id, (data) => {
        res.json(data)
      }); */
})

app.get('/findbyid/noticias/:id', async (req, res) => {
    res.json(await db.get({ _id: new ObjectId(req.params.id) }, 'noticias'))
    /* crud.findById(NOTICIAS_URL, req.params.id, (data) => {
        res.json(data)
    }) */
})

app.get('/read/noticias/page/:page', (req, res) => {
    crud.readPage(NOTICIAS_URL, req.params.page, (data) => {
        res.json(data)
    })
})

app.get('/read/noticias/short/:page', (req, res) => {
    crud.readShortPage(NOTICIAS_URL, req.params.page, (data) => {
        res.json(data)
    })
})

app.get('/filter/noticias/:page/:filter', async (req, res) => {
    res.json(await db.get({ titulo: req.params.filter }, 'noticias'))
    /* console.log('req.params',req.params)
    crud.filter(NOTICIAS_URL, req.params, (data) => {
        res.json(data)
    }) */
})

// Partidos //

app.post('/create/partidos', async (req, res) => {
    res.json(await db.create(req.body, 'partidos'))
    /* crud.create(PARTIDOS_URL, req.body, (data) => {
        res.json(data)
      }); */
})

app.get('/read/partidos', async (req, res) => {
    res.json(await db.get({}, 'partidos'))
    /* crud.read(PARTIDOS_URL, (data) => {
        res.json(data)
      }); */
})

app.put('/update/partidos/:id', async (req, res) => {
    res.json(await db.update(req.params.id, req.body, 'partidos'))
    /* crud.update(PARTIDOS_URL, req.params.id, req.body, (data) => {
        res.json(data)
      }); */
})

app.delete('/delete/partidos/:id', async (req, res) => {
    res.json(await db.delete(req.params.id, 'partidos'))
    /* crud.deleteById(PARTIDOS_URL, req.params.id, (data) => {
        res.json(data)
      }); */
})

app.get('/findbyid/partidos/:id', async (req, res) => {
    res.json(await db.articles.get({ _id: req.params.id }, 'acciones'))
    /* crud.findById(PARTIDOS_URL, req.params.id, (data) => {
        res.json(data)
    }) */
})

app.get('/read/partidos/page/:page', (req, res) => {
    crud.readPage(PARTIDOS_URL, req.params.page, (data) => {
        res.json(data)
    })
})

app.get('/filter/partidos/:jornadaid', async (req, res) => {
    res.json(await db.articles.get({ jornadaid: req.params.jornadaid }, 'acciones'))
    /* crud.filter(PARTIDOS_URL, req.params, (data) => {
        res.json(data)
    }) */
})

// Usuarios //

app.post('/create/usuarios', async (req, res) => {
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
    res.json(await db.articles.get({ _id: req.params.id }, 'acciones'))
    /* crud.findById(USUARIOS_URL, req.params.id, (data) => {
        res.json(data)
    }) */
})

app.get('/read/usuarios/page/:page', (req, res) => {
    crud.readPage(USUARIOS_URL, req.params.page, (data) => {
        res.json(data)
    })
})

app.get('/filter/usuarios', (req, res) => {
    crud.filter(USUARIOS_URL, req.params, (data) => {
        res.json(data)
    })
})
  
app.listen(port, () => {
        console.log(`My Rugby League listening on port ${port}`)
    })