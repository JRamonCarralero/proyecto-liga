/**
 * Devuelve una respuesta paginada.
 *
 * @param {Array} data - El array con los datos a paginar.
 * @param {number} page - El número de la página actual.
 * @param {number} limit - El límite de elementos por página.
 *
 * @returns {Object} Un objeto con la página actual de datos y booleanos
 *                  indicando si hay página siguiente y anterior.
 */
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

/**
 * Crea una estructura de respuesta para paginación.
 *
 * @param {Array} data - El conjunto de datos de la página actual.
 * @param {number} long - La longitud total de los datos.
 * @param {number} page - El número de la página actual.
 * @param {number} limit - El número máximo de elementos por página.
 *
 * @returns {Object} Un objeto que contiene la página actual de datos y 
 *                   indicadores booleanos para determinar si hay una 
 *                   página siguiente o anterior.
 */
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
