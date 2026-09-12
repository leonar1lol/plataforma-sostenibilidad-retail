import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

export const grupoConexiones = new Pool({
  connectionString: process.env.URL_BASE_DATOS,
  ssl: process.env.MODO_PRODUCCION === 'true' ? { rejectUnauthorized: false } : false
});

export const consultarBaseDatos = (textoConsulta, parametros) => {
  return grupoConexiones.query(textoConsulta, parametros);
};
