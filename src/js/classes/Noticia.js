// @ts-check

export class Noticia {
    _id
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
     * @param {string} _id
     */
    constructor(_id, titulo, cabecera, imagen, contenido) {
        const timestamp = new Date()
        this._id = _id
        this.fecha = `${timestamp.getFullYear()}-${(timestamp.getMonth() + 1).toString().padStart(2, '0')}-${timestamp.getDate().toString().padStart(2, '0')}`
        this.titulo = titulo
        this.cabecera = cabecera
        this.imagen = imagen
        this.contenido = contenido
    }
}