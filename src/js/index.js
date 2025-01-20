document.addEventListener('DOMContentLoaded', onDOMContentLoaded)

function onDOMContentLoaded() {
  const calendario = new Array(equipos.length-1).fill(null).map(() => new Array(equipos.length-1))
  for (let i = 0; i < equipos.length; i++) {
    calendario[0][i] = i + 1;
  }
  for (let i = 1; i < equipos.length - 1; i++) {
    calendario[i] = [...calendario[i - 1]];
    const removed = calendario[i].splice(1, 1)
    calendario[i].push(removed[0]);
  }

  const jornadas = []
  const jornadasVuelta = []
  let local = true
  for (let i = 0; i < equipos.length-1; i++) {
    const jornada = []
    const vuelta = []
    for (let j = 0; j < equipos.length / 2; j++) {
      if (local) {
        jornada.push([`equipo ${calendario[i][j]}`, `equipo ${calendario[i][equipos.length - j - 1]}`])
        vuelta.push([`equipo ${calendario[i][equipos.length - j - 1]}`, `equipo ${calendario[i][j]}`])
      } else {
        jornada.push([`equipo ${calendario[i][equipos.length - j - 1]}`, `equipo ${calendario[i][j]}`])
        vuelta.push([`equipo ${calendario[i][j]}`, `equipo ${calendario[i][equipos.length - j - 1]}`])
      }
    }
    jornadas.push(jornada)
    jornadasVuelta.push(vuelta)
    local = !local
  }
  const liga = jornadas.concat(jornadasVuelta)

  console.log(liga)
}

  