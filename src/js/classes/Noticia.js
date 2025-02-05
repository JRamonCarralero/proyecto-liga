// @ts-check

export class Noticia {
    id
    fecha
    titulo
    cabecera
    imagen
    contenido
    /**
     * 
     * @param {string} titulo 
     * @param {string} cabecera 
     * @param {string} imagen 
     * @param {string} contenido 
     * @param {string} id
     */
    constructor(titulo, cabecera, imagen, contenido, id = '') {
        const timestamp = new Date()
        this.id = id===''? String(timestamp.getTime()): id
        this.fecha = `${timestamp.getFullYear()}-${(timestamp.getMonth() + 1).toString().padStart(2, '0')}-${timestamp.getDate().toString().padStart(2, '0')}`
        this.titulo = titulo
        this.cabecera = cabecera
        this.imagen = imagen
        this.contenido = contenido
    }
}