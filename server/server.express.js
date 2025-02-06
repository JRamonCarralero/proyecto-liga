import express from 'express';
import bodyParser from 'body-parser'
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

app.use(express.static('src'))
// for parsing application/json
app.use(bodyParser.json())
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Acciones //

app.post('/create/acciones', (req, res) => {
    crud.create(ACCIONES_URL, req.body, (data) => {
        res.json(data)
      });
})

app.get('/read/acciones', (req, res) => {
    crud.read(ACCIONES_URL, (data) => {
        res.json(data)
      });
})

app.put('/update/acciones/:id', (req, res) => {
    crud.update(ACCIONES_URL, req.params.id, req.body, (data) => {
        res.json(data)
      });
})

app.delete('/delete/acciones/:id', (req, res) => {
    crud.deleteById(ACCIONES_URL, req.params.id, (data) => {
        res.json(data)
      });
})

app.get('/findbyid/acciones/:id', (req, res) => {
    crud.findById(ACCIONES_URL, req.params.id, (data) => {
        res.json(data)
    })
})

app.get('/read/acciones/page/:page', (req, res) => {
    crud.readPage(ACCIONES_URL, req.params.page, (data) => {
        res.json(data)
    })
})

app.get('/filter/acciones', (req, res) => {
    crud.filter(ACCIONES_URL, req.params, (data) => {
        res.json(data)
    })
})

// Clasificaciones //

app.post('/create/clasificaciones', (req, res) => {
    crud.create(CLASIFICACIONES_URL, req.body, (data) => {
        res.json(data)
      });
})

app.get('/read/clasificaciones', (req, res) => {
    crud.read(CLASIFICACIONES_URL, (data) => {
        res.json(data)
      });
})

app.put('/update/clasificaciones/:id', (req, res) => {
    crud.update(CLASIFICACIONES_URL, req.params.id, req.body, (data) => {
        res.json(data)
      });
})

app.delete('/delete/clasificaciones/:id', (req, res) => {
    crud.deleteById(CLASIFICACIONES_URL, req.params.id, (data) => {
        res.json(data)
      });
})

app.get('/findbyid/clasificaciones/:id', (req, res) => {
    crud.findById(CLASIFICACIONES_URL, req.params.id, (data) => {
        res.json(data)
    })
})

app.get('/read/clasificaciones/page/:page', (req, res) => {
    crud.readPage(CLASIFICACIONES_URL, req.params.page, (data) => {
        res.json(data)
    })
})

app.get('/filter/clasificaciones/:tipo/:filter', (req, res) => {
    crud.filter(CLASIFICACIONES_URL, req.params, (data) => {
        res.json(data)
    })
})

app.get('/filter/clasificaciones/:tipo/:ligaid/:equipoid', (req, res) => {
    crud.filter(CLASIFICACIONES_URL, req.params, (data) => {
        res.json(data)
    })
})

// Equipos //

app.post('/create/equipos', (req, res) => {
    crud.create(EQUIPOS_URL, req.body, (data) => {
        res.json(data)
      });
})

app.get('/read/equipos', (req, res) => {
    crud.read(EQUIPOS_URL, (data) => {
        res.json(data)
      });
})

app.put('/update/equipos/:id', (req, res) => {
    crud.update(EQUIPOS_URL, req.params.id, req.body, (data) => {
        res.json(data)
      });
})

app.delete('/delete/equipos/:id', (req, res) => {
    crud.deleteById(EQUIPOS_URL, req.params.id, (data) => {
        res.json(data)
      });
})

app.get('/findbyid/equipos/:id', (req, res) => {
    crud.findById(EQUIPOS_URL, req.params.id, (data) => {
        res.json(data)
    })
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

app.post('/create/estadisticas', (req, res) => {
    crud.create(ESTADISTICAS_URL, req.body, (data) => {
        res.json(data)
      });
})

app.get('/read/estadisticas', (req, res) => {
    crud.read(ESTADISTICAS_URL, (data) => {
        res.json(data)
      });
})

app.put('/update/estadisticas/:id', (req, res) => {
    crud.update(ESTADISTICAS_URL, req.params.id, req.body, (data) => {
        res.json(data)
      });
})

app.delete('/delete/estadisticas/:id', (req, res) => {
    crud.deleteById(ESTADISTICAS_URL, req.params.id, (data) => {
        res.json(data)
      });
})

app.get('/findbyid/estadisticas/:id', (req, res) => {
    crud.findById(ESTADISTICAS_URL, req.params.id, (data) => {
        res.json(data)
    })
})

app.get('/read/estadisticas/page/:page', (req, res) => {
    crud.readPage(ESTADISTICAS_URL, req.params.page, (data) => {
        res.json(data)
    })
})

app.get('/filter/estadisticas/:tipo/:ligaig/equipoid/:jugadorid', (req, res) => {
    crud.filter(ESTADISTICAS_URL, req.params, (data) => {
        res.json(data)
    })
})

// Jornadas //

app.post('/create/jornadas', (req, res) => {
    crud.create(JORNADAS_URL, req.body, (data) => {
        res.json(data)
      });
})

app.get('/read/jornadas', (req, res) => {
    crud.read(JORNADAS_URL, (data) => {
        res.json(data)
      });
})

app.put('/update/jornadas/:id', (req, res) => {
    crud.update(JORNADAS_URL, req.params.id, req.body, (data) => {
        res.json(data)
      });
})

app.delete('/delete/jornadas/:id', (req, res) => {
    crud.deleteById(JORNADAS_URL, req.params.id, (data) => {
        res.json(data)
      });
})

app.get('/findbyid/jornadas/:id', (req, res) => {
    crud.findById(JORNADAS_URL, req.params.id, (data) => {
        res.json(data)
    })
})

app.get('/read/jornadas/page/:page', (req, res) => {
    crud.readPage(JORNADAS_URL, req.params.page, (data) => {
        res.json(data)
    })
})

app.get('/filter/jornadas/:tipo/:filter', (req, res) => {
    crud.filter(JORNADAS_URL, req.params, (data) => {
        res.json(data)
    })
})

// Jugadores //

app.post('/create/jugadores', (req, res) => {
    crud.create(JUGADORES_URL, req.body, (data) => {
        res.json(data)
      });
})

app.get('/read/jugadores', (req, res) => {
    crud.read(JUGADORES_URL, (data) => {
        res.json(data)
      });
})

app.put('/update/jugadores/:id', (req, res) => {
    crud.update(JUGADORES_URL, req.params.id, req.body, (data) => {
        res.json(data)
      });
})

app.delete('/delete/jugadores/:id', (req, res) => {
    crud.deleteById(JUGADORES_URL, req.params.id, (data) => {
        res.json(data)
      });
})

app.get('/findbyid/jugadores/:id', (req, res) => {
    crud.findById(JUGADORES_URL, req.params.id, (data) => {
        res.json(data)
    })
})

app.get('/read/jugadores/page/:page', (req, res) => {
    crud.readPage(JUGADORES_URL, req.params.page, (data) => {
        res.json(data)
    })
})

app.get('/filter/jugadores/:tipo/:filter', (req, res) => {
    crud.filter(JUGADORES_URL, req.params, (data) => {
        res.json(data)
    })
})

// Ligas //

app.post('/create/ligas', (req, res) => {
    crud.create(LIGAS_URL, req.body, (data) => {
        res.json(data)
      });
})

app.get('/read/ligas', (req, res) => {
    crud.read(LIGAS_URL, (data) => {
        res.json(data)
      });
})

app.put('/update/ligas/:id', (req, res) => {
    crud.update(LIGAS_URL, req.params.id, req.body, (data) => {
        res.json(data)
      });
})

app.delete('/delete/ligas/:id', (req, res) => {
    crud.deleteById(LIGAS_URL, req.params.id, (data) => {
        res.json(data)
      });
})

app.get('/findbyid/ligas/:id', (req, res) => {
    crud.findById(LIGAS_URL, req.params.id, (data) => {
        res.json(data)
    })
})

app.get('/read/ligas/page/:page', (req, res) => {
    crud.readPage(LIGAS_URL, req.params.page, (data) => {
        res.json(data)
    })
})

app.get('/filter/ligas/:tipo/:filter', (req, res) => {
    crud.filter(LIGAS_URL, req.params, (data) => {
        res.json(data)
    })
})

// Noticias //

app.post('/create/noticias', (req, res) => {
    console.log(req.body)
    crud.create(NOTICIAS_URL, req.body, (data) => {
        res.json(data)
      });
})

app.get('/read/noticias', (req, res) => {
    crud.read(NOTICIAS_URL, (data) => {
        res.json(data)
      });
})

app.put('/update/noticias/:id', (req, res) => {
    crud.update(NOTICIAS_URL, req.params.id, req.body, (data) => {
        res.json(data)
      });
})

app.delete('/delete/noticias/:id', (req, res) => {
    crud.deleteById(NOTICIAS_URL, req.params.id, (data) => {
        res.json(data)
      });
})

app.get('/findbyid/noticias/:id', (req, res) => {
    crud.findById(NOTICIAS_URL, req.params.id, (data) => {
        res.json(data)
    })
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

app.get('/filter/noticias/:page/:tipo/:filter', (req, res) => {
    console.log('req.params',req.params)
    crud.filter(NOTICIAS_URL, req.params, (data) => {
        res.json(data)
    })
})

// Partidos //

app.post('/create/partidos', (req, res) => {
    crud.create(PARTIDOS_URL, req.body, (data) => {
        res.json(data)
      });
})

app.get('/read/partidos', (req, res) => {
    crud.read(PARTIDOS_URL, (data) => {
        res.json(data)
      });
})

app.put('/update/partidos/:id', (req, res) => {
    crud.update(PARTIDOS_URL, req.params.id, req.body, (data) => {
        res.json(data)
      });
})

app.delete('/delete/partidos/:id', (req, res) => {
    crud.deleteById(PARTIDOS_URL, req.params.id, (data) => {
        res.json(data)
      });
})

app.get('/findbyid/partidos/:id', (req, res) => {
    crud.findById(PARTIDOS_URL, req.params.id, (data) => {
        res.json(data)
    })
})

app.get('/read/partidos/page/:page', (req, res) => {
    crud.readPage(PARTIDOS_URL, req.params.page, (data) => {
        res.json(data)
    })
})

app.get('/filter/partidos/:tipo/:filter', (req, res) => {
    crud.filter(PARTIDOS_URL, req.params, (data) => {
        res.json(data)
    })
})

// Usuarios //

app.post('/create/usuarios', (req, res) => {
    crud.create(USUARIOS_URL, req.body, (data) => {
        res.json(data)
      });
})

app.get('/read/usuarios', (req, res) => {
    crud.read(USUARIOS_URL, (data) => {
        res.json(data)
      });
})

app.put('/update/usuarios/:id', (req, res) => {
    crud.update(USUARIOS_URL, req.params.id, req.body, (data) => {
        res.json(data)
      });
})

app.delete('/delete/usuarios/:id', (req, res) => {
    crud.deleteById(USUARIOS_URL, req.params.id, (data) => {
        res.json(data)
      });
})

app.get('/findbyid/usuarios/:id', (req, res) => {
    crud.findById(USUARIOS_URL, req.params.id, (data) => {
        res.json(data)
    })
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