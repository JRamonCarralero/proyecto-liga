// @ts-check

/**
 * @typedef {Object} dataStoreType
 * @property {import("./Equipo").Equipo[]=} equipos 
 * @property {import("./Usuario").Usuario[]=} usuarios 
 * @property {import("./Noticia").Noticia[]=} noticias 
 * @property {import("./Liga").Liga[]=} ligas
 */

// Patron Singleton (IIFE)
const dataStore = (function() {
    /**
     * @type {dataStoreType} dataStoreInstance
     */
    let dataStoreInstance
    return {
        get: () => {
            if (!dataStoreInstance) {
                dataStoreInstance = {
                    equipos: [],
                    usuarios: [],
                    noticias: [],
                    ligas: []
                }
            }
            return dataStoreInstance
        }
    }
})()

export { dataStore } 
