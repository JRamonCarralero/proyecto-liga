// Patron Singleton (IIFE)
const dataStore = (function() {
    let dataStoreInstance
    return {
        get: () => {
            if (!dataStoreInstance) {
                dataStoreInstance = {
                    equipos: [],
                    usuarios: [],
                    noticias: []
                }
            }
            return dataStoreInstance
        }
    }
})()

export { dataStore }