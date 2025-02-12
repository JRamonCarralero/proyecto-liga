export function paginable(data, page, limit) {
    const respuesta = {
        siguiente: true,
        anterior: false,
        data: data.slice((page - 1) * limit, page * limit)
    }
    if (data.length <= page * limit) respuesta.siguiente = false
    if (page > 1) respuesta.anterior = true
    return respuesta
}

export function crearPaginacion(data, long, page, limit) {
    const respuesta = {
        siguiente: true,
        anterior: false,        
        data
    }
    if (long <= page * limit) respuesta.siguiente = false
    if (page > 1) respuesta.anterior = true
    return respuesta
}
