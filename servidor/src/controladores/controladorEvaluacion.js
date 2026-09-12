import { calcularPuntajeEvaluacion, determinarRecomendaciones } from '../servicios/servicioCalificacion.js';
import { enviarReporteResultados } from '../servicios/servicioCorreo.js';

const catalogoPreguntas = [
  {
    id_item: 1,
    codigo: 'AMB-01',
    nombre_dimension: 'Ambiental',
    enunciado: '¿La empresa cuenta con una política formalizada y documentada de gestión de residuos y reciclaje?',
    peso: 25,
    alternativas: [
      { id_alternativa: 1, texto: 'Sí, formalizada, documentada y auditada anualmente', puntaje: 100 },
      { id_alternativa: 2, texto: 'Sí, formalizada pero sin auditoría externa', puntaje: 70 },
      { id_alternativa: 3, texto: 'En proceso de elaboración e implementación', puntaje: 40 },
      { id_alternativa: 4, texto: 'No cuenta con política formal de residuos', puntaje: 0 }
    ]
  },
  {
    id_item: 2,
    codigo: 'AMB-02',
    nombre_dimension: 'Ambiental',
    enunciado: '¿La empresa mide anualmente sus emisiones de gases de efecto invernadero (huella de carbono)?',
    peso: 25,
    alternativas: [
      { id_alternativa: 5, texto: 'Sí, con medición y certificación de Alcance 1, 2 y 3', puntaje: 100 },
      { id_alternativa: 6, texto: 'Sí, medición de Alcance 1 y 2 sin certificación', puntaje: 70 },
      { id_alternativa: 7, texto: 'En proceso de cálculo inicial', puntaje: 30 },
      { id_alternativa: 8, texto: 'No realiza medición de emisiones', puntaje: 0 }
    ]
  },
  {
    id_item: 3,
    codigo: 'SOC-01',
    nombre_dimension: 'Social',
    enunciado: '¿Cuenta con un programa anual de desarrollo y apoyo a comunidades locales de su zona de influencia?',
    peso: 25,
    alternativas: [
      { id_alternativa: 9, texto: 'Sí, con presupuesto asignado e indicadores de impacto medidos', puntaje: 100 },
      { id_alternativa: 10, texto: 'Sí, con actividades periódicas sin indicadores formales', puntaje: 65 },
      { id_alternativa: 11, texto: 'Participaciones esporádicas no planificadas', puntaje: 35 },
      { id_alternativa: 12, texto: 'No cuenta con programas comunitarios', puntaje: 0 }
    ]
  },
  {
    id_item: 4,
    codigo: 'ETI-01',
    nombre_dimension: 'Ética y Gobernanza',
    enunciado: '¿La empresa cuenta con un canal formalizado de denuncias anónimas para faltas éticas o fraude?',
    peso: 25,
    alternativas: [
      { id_alternativa: 13, texto: 'Sí, canal gestionado por un tercero independiente con protección al denunciante', puntaje: 100 },
      { id_alternativa: 14, texto: 'Sí, canal interno formalizado y publicado', puntaje: 75 },
      { id_alternativa: 15, texto: 'Buzón de sugerencias o correo sin garantía de anonimato', puntaje: 30 },
      { id_alternativa: 16, texto: 'No dispone de canal de denuncias formal', puntaje: 0 }
    ]
  },
  {
    id_item: 5,
    codigo: 'LAB-01',
    nombre_dimension: 'Laboral',
    enunciado: '¿Todos los colaboradores cuentan con contrato laboral registrado y beneficios conforme a la ley peruana?',
    peso: 25,
    alternativas: [
      { id_alternativa: 17, texto: '100% formalizados en planilla electrónica con auditorías de cumplimiento', puntaje: 100 },
      { id_alternativa: 18, texto: '100% formalizados en planilla sin auditorías periódicas', puntaje: 80 },
      { id_alternativa: 19, texto: 'Mayoría en planilla con personal bajo modalidades pendientes de regularización', puntaje: 40 },
      { id_alternativa: 20, texto: 'No se tiene registro formal unificado', puntaje: 0 }
    ]
  }
];

const listaRecomendacionesMaestras = [
  { id_recomendacion: 1, texto: 'Formalizar e implementar la política documentada de gestión integral de residuos y reciclaje.', umbral: 70, nombre_dimension: 'Ambiental' },
  { id_recomendacion: 2, texto: 'Iniciar la medición y reporte anual auditado de la huella de carbono operacional.', umbral: 75, nombre_dimension: 'Ambiental' },
  { id_recomendacion: 3, texto: 'Establecer un programa permanente con presupuesto e indicadores de impacto comunitario.', umbral: 70, nombre_dimension: 'Social' },
  { id_recomendacion: 4, texto: 'Implementar un canal formalizado y anónimo de denuncias gestionado de forma independiente.', umbral: 80, nombre_dimension: 'Ética y Gobernanza' },
  { id_recomendacion: 5, texto: 'Asegurar la plena formalización laboral y un sistema de control de jornadas seguras.', umbral: 85, nombre_dimension: 'Laboral' }
];

export const obtenerPreguntasCuestionario = async (peticion, respuesta) => {
  return respuesta.status(200).json({
    exito: true,
    preguntas: catalogoPreguntas
  });
};

export const procesarCalificacionEvaluacion = async (peticion, respuesta) => {
  const { respuestas, datosProveedor } = peticion.body;

  if (!respuestas || !Array.isArray(respuestas)) {
    return respuesta.status(400).json({ exito: false, mensaje: 'Las respuestas son requeridas.' });
  }

  const resultadoPuntaje = calcularPuntajeEvaluacion(respuestas, catalogoPreguntas);
  const recomendaciones = determinarRecomendaciones(resultadoPuntaje.dimensiones, listaRecomendacionesMaestras);

  if (datosProveedor?.correo) {
    await enviarReporteResultados(
      datosProveedor.correo,
      datosProveedor.razonSocial || 'Proveedor Registrado',
      resultadoPuntaje.puntajeTotal,
      recomendaciones
    );
  }

  return respuesta.status(200).json({
    exito: true,
    puntajeTotal: resultadoPuntaje.puntajeTotal,
    dimensiones: resultadoPuntaje.dimensiones,
    recomendaciones
  });
};

export const obtenerMetricasDashboard = async (peticion, respuesta) => {
  const unidadesAvance = [
    { nombre: 'Supermercados Peruanos', porcentaje: 78, criticosEvaluados: 94, meta: 120 },
    { nombre: 'Promart', porcentaje: 64, criticosEvaluados: 48, meta: 75 },
    { nombre: 'Oechsle', porcentaje: 55, criticosEvaluados: 33, meta: 60 },
    { nombre: 'Real Plaza', porcentaje: 41, criticosEvaluados: 25, meta: 61 },
    { nombre: 'Farmacias Peruanas', porcentaje: 72, criticosEvaluados: 86, meta: 119 },
    { nombre: 'SIP', porcentaje: 50, criticosEvaluados: 12, meta: 24 },
    { nombre: 'Intercorp Retail Sucursal China', porcentaje: 60, criticosEvaluados: 9, meta: 15 }
  ];

  return respuesta.status(200).json({
    exito: true,
    resumenGlobal: {
      proveedoresRegistrados: 1240,
      criticosEvaluados: 286,
      encuestasCompletadas: 874,
      avanceGeneralPorcentaje: 70
    },
    unidadesAvance
  });
};
