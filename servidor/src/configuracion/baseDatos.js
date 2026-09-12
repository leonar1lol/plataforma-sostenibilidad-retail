import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';
import dotenv from 'dotenv';

const rutaArchivoActual = fileURLToPath(import.meta.url);
const directorioActual = path.dirname(rutaArchivoActual);
dotenv.config({ path: path.resolve(directorioActual, '../../.env') });

const { Pool } = pkg;

export const grupoConexiones = new Pool({
  connectionString: process.env.URL_BASE_DATOS,
  ssl: { rejectUnauthorized: false }
});

export const consultarBaseDatos = (textoConsulta, parametros) => {
  return grupoConexiones.query(textoConsulta, parametros);
};
