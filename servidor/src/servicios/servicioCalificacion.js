export const calcularPuntajeEvaluacion = (respuestas, itemsConDimension) => {
  const acumuladoPorDimension = {
    'Ambiental': { sumaPuntajes: 0, cantidad: 0, peso: 25 },
    'Social': { sumaPuntajes: 0, cantidad: 0, peso: 25 },
    'Ética y Gobernanza': { sumaPuntajes: 0, cantidad: 0, peso: 25 },
    'Laboral': { sumaPuntajes: 0, cantidad: 0, peso: 25 }
  };

  for (const respuesta of respuestas) {
    const itemEncontrado = itemsConDimension.find(
      (item) => item.id_item === respuesta.id_item
    );
    if (itemEncontrado && acumuladoPorDimension[itemEncontrado.nombre_dimension]) {
      acumuladoPorDimension[itemEncontrado.nombre_dimension].sumaPuntajes += Number(respuesta.puntaje_obtenido);
      acumuladoPorDimension[itemEncontrado.nombre_dimension].cantidad += 1;
    }
  }

  const puntajesPorDimension = [];
  let puntajeGlobalCalculado = 0;

  for (const [nombreDimension, datos] of Object.entries(acumuladoPorDimension)) {
    const promedio = datos.cantidad > 0 ? Math.round(datos.sumaPuntajes / datos.cantidad) : 0;
    puntajesPorDimension.push({
      dimension: nombreDimension,
      puntaje: promedio,
      porcentajeTexto: `${promedio}%`
    });
    puntajeGlobalCalculado += promedio * (datos.peso / 100);
  }

  return {
    puntajeTotal: Math.round(puntajeGlobalCalculado),
    dimensiones: puntajesPorDimension
  };
};

export const determinarRecomendaciones = (puntajesPorDimension, catalogoRecomendaciones) => {
  const recomendacionesFiltradas = [];

  for (const dimensionPuntaje of puntajesPorDimension) {
    const recomendacionesAplicables = catalogoRecomendaciones.filter(
      (recomendacion) =>
        recomendacion.nombre_dimension === dimensionPuntaje.dimension &&
        dimensionPuntaje.puntaje < Number(recomendacion.umbral)
    );
    recomendacionesFiltradas.push(...recomendacionesAplicables);
  }

  return recomendacionesFiltradas;
};
