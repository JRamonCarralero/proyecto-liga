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
     */
    constructor(titulo, cabecera, imagen, contenido) {
        const timestamp = new Date()
        this.id = String(timestamp.getTime())
        this.fecha = timestamp.getDate()
        this.titulo = titulo
        this.cabecera = cabecera
        this.imagen = imagen
        this.contenido = contenido
    }
}