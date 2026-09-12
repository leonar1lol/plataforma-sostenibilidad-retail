import { Router } from 'express';
import {
  obtenerPreguntasCuestionario,
  procesarCalificacionEvaluacion,
  obtenerMetricasDashboard
} from '../controladores/controladorEvaluacion.js';

export const enrutadorEvaluacion = Router();

enrutadorEvaluacion.get('/preguntas', obtenerPreguntasCuestionario);
enrutadorEvaluacion.post('/calificar', procesarCalificacionEvaluacion);
enrutadorEvaluacion.get('/dashboard', obtenerMetricasDashboard);
