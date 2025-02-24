
import { getAPIData } from './utils/utils.js'

const API_PORT = location.port ? `:${location.port}` : ''

document.addEventListener('DOMContentLoaded', onDOMcontentLoaded)

async function onDOMcontentLoaded() {
    const usuarios = await getAPIData(`${location.protocol}//${location.hostname}${API_PORT}/api/read/usuarios`)
    
    const provider = document.querySelector('store-provider')
    provider.initialUsers = usuarios
}