// @ts-check

/**
 * Devuelve el valor de un elemento input cuyo id es idElement
 * Si no existe el elemento, devuelve cadena vacia
 * @param {String} idElement 
 * @returns {String}
 */
export function getInputValue(idElement) {
    const element = document.getElementById(idElement)
    if (element) {
        return /** @type {HTMLInputElement} */(element).value
    } else {
        return ''
    }
}

/**
 * Setea el valor de un elemento input cuyo id es idElement
 * Si no existe el elemento, no hace nada
 * @param {String} idElement 
 * @param {String} value       valor a setear
 */
export function setInputValue(idElement, value) {
    const element = document.getElementById(idElement)
    if (element) {
        /** @type {HTMLInputElement} */(element).value = value
    }
}

/**
 * Devuelve el valor seleccionado en un elemento select cuyo id es idElement
 * Si no existe el elemento, devuelve cadena vacia
 * @param {String} idElement 
 * @returns {String}
 */
export function getSelectValue(idElement) {
    const element = document.getElementById(idElement)
    if (element) {
        return /** @type {HTMLSelectElement} */(element).value
    } else {
        return ''
    }
}

/**
 * Setea el valor seleccionado en un elemento select cuyo id es idElement
 * Si no existe el elemento, no hace nada
 * @param {String} idElement 
 * @param {String} value       valor a setear
 */
export function setSelectValue(idElement, value) {
    const element = document.getElementById(idElement)
    if (element) {
        /** @type {HTMLSelectElement} */(element).value = value
    }
}

/**
 * Devuelve el valor del checked de un elemento input de tipo checkbox
 * Si no existe el elemento, devuelve false
 * @param {String} idElement    
 * @returns {Boolean}
 */
export function getInputChecked(idElement) {
    const element = document.getElementById(idElement)
    if (element) {
        return /** @type {HTMLInputElement} */(element).checked
    } else {
        return false
    }
}

/**
 * Setea el valor del checked de un elemento input de tipo checkbox
 * @param {String} idElement    id del elemento
 * @param {Boolean} value       valor a setear
 */
export function setInputChecked(idElement, value) {
    const element = document.getElementById(idElement)
    if (element) {
        /** @type {HTMLInputElement} */(element).checked = value
    }
}

/**
 * Devuelve el valor de un elemento input de tipo file cuyo id es idElement
 * Si no existe el elemento, devuelve null
 * @param {String} idElement 
 * @returns {FileList|null}
 */
export function getInputFile(idElement) {
    const element = document.getElementById(idElement)
    if (element) {
        return /** @type {HTMLInputElement} */(element).files
    } else {
        return null
    }
}

/**
 * Setea el valor de un elemento input de tipo file cuyo id es idElement
 * @param {String} idElement    id del elemento
 * @param {FileList} value       valor a setear
 */
export function setInputFile(idElement, value) {
    const element = document.getElementById(idElement)
    if (element) {
        /** @type {HTMLInputElement} */(element).files = value
    }
}

/**
 * Simula un click en el boton con id = idButton
 * @param {string} idButton
 */
export function replyButtonClick(idButton) {
    const button = document.getElementById(idButton)
    const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
    button?.dispatchEvent(clickEvent)
}


