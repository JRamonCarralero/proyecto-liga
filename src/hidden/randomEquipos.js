const fs = require('fs');

// Función para generar un ID aleatorio
function generarId() {
  return Math.random().toString(36).substring(2, 9);
}

// Función para generar un nombre aleatorio (puedes personalizar con más nombres)
function generarNombre() {
  const nombres = ['Juan', 'Javier', 'Pedro', 'Alberto', 'Luis', 'Roberto', 'Carlos', 'Daniel', 'Esteban', 'Federico', 'Ignacio'];
  return nombres[Math.floor(Math.random() * nombres.length)];
}

function generarNombreEquipo() {
    const nombres = ['Aguilas', 'Osos', 'Linces', 'Pumas', 'Gorilas', 'Toros', 'Leones', 'Dragones', 'Tiburones', 'Rinos'];
    return nombres[Math.floor(Math.random() * nombres.length)];
  }

// Función para generar un apellido aleatorio (puedes personalizar con más apellidos)
function generarApellido() {
  const apellidos = ['Pérez', 'García', 'González', 'Rodríguez', 'Fernández'];
  return apellidos[Math.floor(Math.random() * apellidos.length)];
}

// Función para generar una ciudad aleatoria (puedes personalizar con más ciudades)
function generarCiudad() {
  const ciudades = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao', 'Coruña', 'Jaen', 'Valladolid'];
  return ciudades[Math.floor(Math.random() * ciudades.length)];
}

// Función para crear un jugador
function crearJugador() {
  return {
    id: generarId(),
    nombre: generarNombre(),
    apellidos: generarApellido(),
    nacionalidad: 'España', // Puedes personalizar las nacionalidades
    altura: Math.floor(Math.random() * (200 - 160 + 1)) + 160,
    peso: Math.floor(Math.random() * (100 - 60 + 1)) + 60
  };
}

// Función para crear un equipo
function crearEquipo() {
    const ciudad = generarCiudad()
  return {
    id: generarId(),
    nombre: `${generarNombreEquipo()} de ${ciudad} RC`, // Ejemplo de nombre de equipo
    poblacion: ciudad,
    direccion: ciudad + ' Stadium', // Ejemplo de dirección
    estadio: ciudad + ' Arena', // Ejemplo de estadio
    jugadores: Array.from({ length: 20 }, crearJugador)
  };
}

// Crear un array de 15 equipos
const equipos = Array.from({ length: 15 }, crearEquipo);

// Escribir los datos en un archivo JSON
fs.writeFileSync('equipos.json', JSON.stringify(equipos, null, 2));