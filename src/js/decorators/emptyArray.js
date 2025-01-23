// @ts-nocheck
// Patron Decorador

/**
 * 
 * @param {Array<any>} array 
 * @returns {Array<any>}
 */
export function emptyArray(array) {
    array.empty = function() {
        while (this.length > 0) {
            this.pop()
        }
    }
    return array
}