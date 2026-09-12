import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';
import dotenv from 'dotenv';

const { Client } = pkg;
const rutaArchivoActual = fileURLToPath(import.meta.url);
const directorioActual = path.dirname(rutaArchivoActual);

dotenv.config({ path: path.resolve(directorioActual, '../../.env') });

const proveedores = [
  { ruc: '20100070970', razonSocial: 'Alicorp S.A.A.', representante: 'Manuel Romero Caro', correo: 'contacto@alicorp.com.pe', tipo: 'Crítico', esCritico: true, idUnidad: 1, idIndustria: 1 },
  { ruc: '20100119227', razonSocial: 'Gloria S.A.', representante: 'Claudio Rodríguez Huaco', correo: 'proveedores@gloria.com.pe', tipo: 'Crítico', esCritico: true, idUnidad: 1, idIndustria: 1 },
  { ruc: '20512345678', razonSocial: 'Distribuidora Alimentos del Norte S.A.C.', representante: 'Carlos Mendoza Alva', correo: 'contacto@proveedor.com.pe', tipo: 'Regular', esCritico: false, idUnidad: 1, idIndustria: 1 },
  { ruc: '20254053822', razonSocial: 'Aceros Arequipa S.A.', representante: 'Ricardo Cillóniz Champin', correo: 'sostenibilidad@acerosarequipa.pe', tipo: 'Crítico', esCritico: true, idUnidad: 2, idIndustria: 4 },
  { ruc: '20452398411', razonSocial: 'Cementos Pacasmayo S.A.A.', representante: 'Humberto Nadal del Carpio', correo: 'proveedor@pacasmayo.com.pe', tipo: 'Crítico', esCritico: true, idUnidad: 2, idIndustria: 4 },
  { ruc: '20338574921', razonSocial: 'Textiles Camones S.A.', representante: 'Carlos Camones Sánchez', correo: 'ventas@camones.com.pe', tipo: 'Crítico', esCritico: true, idUnidad: 3, idIndustria: 3 },
  { ruc: '20601248593', razonSocial: 'Confecciones Andinas del Sur E.I.R.L.', representante: 'María Luisa Quispe', correo: 'informes@andinasur.pe', tipo: 'Regular', esCritico: false, idUnidad: 3, idIndustria: 3 },
  { ruc: '20509823417', razonSocial: 'Operador Logístico Ransa Comercial S.A.', representante: 'Tomás Moro Belmont', correo: 'atencion@ransa.net', tipo: 'Crítico', esCritico: true, idUnidad: 4, idIndustria: 2 },
  { ruc: '20100142806', razonSocial: 'Laboratorios Farmindustria S.A.', representante: 'Jorge Arévalo Silva', correo: 'corporativo@farmindustria.com.pe', tipo: 'Crítico', esCritico: true, idUnidad: 5, idIndustria: 5 },
  { ruc: '20491823741', razonSocial: 'Droguería Médica del Pacífico S.A.C.', representante: 'Elena Villacorta Peña', correo: 'contacto@medpacc.pe', tipo: 'Regular', esCritico: false, idUnidad: 5, idIndustria: 5 },
  { ruc: '20556677889', razonSocial: 'Soluciones Inmobiliarias y Propiedades S.A. (SIP)', representante: 'Fernando Carrillo Otero', correo: 'operaciones@sipcorp.pe', tipo: 'Crítico', esCritico: true, idUnidad: 6, idIndustria: 4 },
  { ruc: '20609988771', razonSocial: 'Shanghai Global Sourcing Retail Ltd.', representante: 'Wei Zhang Lin', correo: 'asia-support@intercorpretail.pe', tipo: 'Crítico', esCritico: true, idUnidad: 7, idIndustria: 2 }
];

const itemsPreguntas = [
  { codigo: 'AMB-01', enunciado: '¿La empresa cuenta con una política formalizada y documentada de gestión de residuos y reciclaje?', peso: 25.00, idDimension: 1 },
  { codigo: 'AMB-02', enunciado: '¿La empresa mide anualmente sus emisiones de gases de efecto invernadero (huella de carbono)?', peso: 25.00, idDimension: 1 },
  { codigo: 'SOC-01', enunciado: '¿Cuenta con un programa anual estructurado de desarrollo comunitario y apoyo local?', peso: 25.00, idDimension: 2 },
  { codigo: 'ETI-15', enunciado: '¿La empresa cuenta con un canal formalizado de denuncias anónimas para faltas éticas o fraude?', peso: 25.00, idDimension: 3 },
  { codigo: 'ETI-16', enunciado: '¿El canal de denuncias es administrado por una firma independiente que garantiza confidencialidad absoluta?', peso: 15.00, idDimension: 3 },
  { codigo: 'LAB-01', enunciado: '¿Todos los colaboradores se encuentran registrados en planilla electrónica conforme a la legislación peruana?', peso: 25.00, idDimension: 4 }
];

const usuarios = [
  { nombre: 'Leonardo Raul Solano Pio Huaman', correo: 'lsolano@intercorpretail.pe', claveHash: 'hash_demo_123', idRol: 1, idUnidad: 1 },
  { nombre: 'Carloman Coronel Cruz', correo: 'ccoronel@intercorpretail.pe', claveHash: 'hash_demo_123', idRol: 2, idUnidad: 1 },
  { nombre: 'Carlos Juniors Chiroque Silva', correo: 'cchiroque@intercorpretail.pe', claveHash: 'hash_demo_123', idRol: 2, idUnidad: 1 },
  { nombre: 'Frank Alex Beltran Ponce', correo: 'fbeltran@intercorpretail.pe', claveHash: 'hash_demo_123', idRol: 2, idUnidad: 2 },
  { nombre: 'Gianfranco Daniel Navarro Flores', correo: 'gnavarro@intercorpretail.pe', claveHash: 'hash_demo_123', idRol: 4, idUnidad: 4 },
  { nombre: 'Mariella Prado', correo: 'mprado@intercorpretail.pe', claveHash: 'hash_demo_123', idRol: 1, idUnidad: 1 }
];

async function poblar() {
  const cliente = new Client({
    connectionString: process.env.URL_BASE_DATOS,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await cliente.connect();
    console.log('Conectado a Neon PostgreSQL para poblar datos...');

    for (const p of proveedores) {
      await cliente.query(`
        INSERT INTO proveedor (ruc, razon_social, representante, correo, tipo, es_critico, fk_id_unidad, fk_id_industria)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (ruc) DO UPDATE SET
          razon_social = EXCLUDED.razon_social,
          representante = EXCLUDED.representante,
          correo = EXCLUDED.correo,
          tipo = EXCLUDED.tipo,
          es_critico = EXCLUDED.es_critico;
      `, [p.ruc, p.razonSocial, p.representante, p.correo, p.tipo, p.esCritico, p.idUnidad, p.idIndustria]);
    }
    console.log('Proveedores registrados correctamente.');

    for (const item of itemsPreguntas) {
      await cliente.query(`
        INSERT INTO item (codigo, enunciado, peso, fk_id_dimension)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (codigo) DO UPDATE SET
          enunciado = EXCLUDED.enunciado,
          peso = EXCLUDED.peso;
      `, [item.codigo, item.enunciado, item.peso, item.idDimension]);
    }
    console.log('Ítems de evaluación registrados correctamente.');

    for (const u of usuarios) {
      await cliente.query(`
        INSERT INTO usuario (nombre, correo, clave_hash, estado, fk_id_rol, fk_id_unidad)
        VALUES ($1, $2, $3, true, $4, $5)
        ON CONFLICT (correo) DO UPDATE SET
          nombre = EXCLUDED.nombre,
          fk_id_rol = EXCLUDED.fk_id_rol;
      `, [u.nombre, u.correo, u.claveHash, u.idRol, u.idUnidad]);
    }
    console.log('Usuarios corporativos registrados correctamente.');

    const resProveedores = await cliente.query('SELECT COUNT(*) FROM proveedor;');
    const resItems = await cliente.query('SELECT COUNT(*) FROM item;');
    const resUsuarios = await cliente.query('SELECT COUNT(*) FROM usuario;');

    console.log('Total en base de datos:');
    console.log(` - Proveedores: ${resProveedores.rows[0].count}`);
    console.log(` - Ítems: ${resItems.rows[0].count}`);
    console.log(` - Usuarios: ${resUsuarios.rows[0].count}`);

    await cliente.end();
  } catch (error) {
    console.error('Error al poblar:', error);
    await cliente.end();
    process.exit(1);
  }
}

poblar();
