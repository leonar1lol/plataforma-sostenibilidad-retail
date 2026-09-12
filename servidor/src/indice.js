import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { enrutadorProveedor } from './rutas/rutasProveedor.js';
import { enrutadorEvaluacion } from './rutas/rutasEvaluacion.js';

dotenv.config();

const aplicacionServidor = express();
const puertoServicio = process.env.PUERTO || 4000;

aplicacionServidor.use(cors());
aplicacionServidor.use(express.json());

aplicacionServidor.use('/api/proveedores', enrutadorProveedor);
aplicacionServidor.use('/api/evaluaciones', enrutadorEvaluacion);

aplicacionServidor.get('/api/salud', (peticion, respuesta) => {
  return respuesta.status(200).json({
    estado: 'Operativo',
    plataforma: 'Evaluaciones de Sostenibilidad Intercorp Retail',
    version: '1.0.0'
  });
});

aplicacionServidor.listen(puertoServicio, () => {
  console.log(`Servidor de API iniciado en el puerto ${puertoServicio}`);
});
