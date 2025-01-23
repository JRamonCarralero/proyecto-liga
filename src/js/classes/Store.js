// Patron Singleton (IIFE)
const dataStore = (function() {
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
