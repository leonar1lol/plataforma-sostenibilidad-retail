import { consultarBaseDatos } from '../configuracion/baseDatos.js';
import { enviarCodigoAccesoOtp } from '../servicios/servicioCorreo.js';

const almacenesCodigosMemoria = new Map();

export const solicitarCodigoAcceso = async (peticion, respuesta) => {
  const { correo } = peticion.body;

  if (!correo) {
    return respuesta.status(400).json({ exito: false, mensaje: 'El correo electrónico es requerido.' });
  }

  const codigoNumerico = Math.floor(100000 + Math.random() * 900000).toString();
  const tiempoExpiracion = Date.now() + 10 * 60 * 1000;

  almacenesCodigosMemoria.set(correo.toLowerCase(), {
    codigo: codigoNumerico,
    expiracion: tiempoExpiracion
  });

  await enviarCodigoAccesoOtp(correo, codigoNumerico);

  return respuesta.status(200).json({
    exito: true,
    mensaje: 'Código generado y enviado exitosamente.',
    codigoDemostracion: codigoNumerico
  });
};

export const validarCodigoAcceso = async (peticion, respuesta) => {
  const { correo, codigo } = peticion.body;

  if (!correo || !codigo) {
    return respuesta.status(400).json({ exito: false, mensaje: 'Correo y código son obligatorios.' });
  }

  const registroEncontrado = almacenesCodigosMemoria.get(correo.toLowerCase());

  if (!registroEncontrado) {
    return respuesta.status(400).json({ exito: false, mensaje: 'No existe solicitud de código vigente para este correo.' });
  }

  if (Date.now() > registroEncontrado.expiracion) {
    almacenesCodigosMemoria.delete(correo.toLowerCase());
    return respuesta.status(400).json({ exito: false, mensaje: 'El código ha expirado. Solicite uno nuevo.' });
  }

  if (registroEncontrado.codigo !== codigo) {
    return respuesta.status(400).json({ exito: false, mensaje: 'El código ingresado es incorrecto.' });
  }

  almacenesCodigosMemoria.delete(correo.toLowerCase());

  return respuesta.status(200).json({
    exito: true,
    mensaje: 'Autenticación exitosa.',
    tokenAcceso: `token-${Date.now()}`
  });
};

export const obtenerListaProveedores = async (peticion, respuesta) => {
  try {
    const consulta = `
      SELECT 
        p.id_proveedor AS id,
        p.ruc,
        p.razon_social AS "razonSocial",
        p.representante,
        p.correo,
        p.tipo,
        p.es_critico AS "esCritico",
        COALESCE(u.nombre, 'Sin Asignar') AS unidad,
        COALESCE(i.nombre, 'Sin Asignar') AS industria
      FROM proveedor p
      LEFT JOIN unidad_negocio u ON p.fk_id_unidad = u.id_unidad
      LEFT JOIN industria i ON p.fk_id_industria = i.id_industria
      ORDER BY p.id_proveedor ASC;
    `;
    const resultado = await consultarBaseDatos(consulta);
    return respuesta.status(200).json({
      exito: true,
      proveedores: resultado.rows
    });
  } catch (error) {
    return respuesta.status(500).json({ exito: false, mensaje: 'Error al consultar proveedores en base de datos.' });
  }
};

export const incorporarNuevoProveedor = async (peticion, respuesta) => {
  const { ruc, razonSocial, representante, correo, idUnidad, idIndustria, esCritico } = peticion.body;

  if (!ruc || !razonSocial || !representante || !correo) {
    return respuesta.status(400).json({ exito: false, mensaje: 'Faltan campos obligatorios para el registro.' });
  }

  try {
    const tipo = esCritico ? 'Crítico' : 'Regular';
    const consulta = `
      INSERT INTO proveedor (ruc, razon_social, representante, correo, tipo, es_critico, fk_id_unidad, fk_id_industria)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id_proveedor AS id, ruc, razon_social AS "razonSocial", representante, correo, tipo, es_critico AS "esCritico";
    `;
    const valores = [ruc, razonSocial, representante, correo, tipo, !!esCritico, idUnidad || 1, idIndustria || 1];
    const resultado = await consultarBaseDatos(consulta, valores);

    return respuesta.status(201).json({
      exito: true,
      mensaje: 'Proveedor incorporado con éxito en la base de datos.',
      proveedor: resultado.rows[0]
    });
  } catch (error) {
    return respuesta.status(500).json({ exito: false, mensaje: 'Error al insertar proveedor en base de datos.' });
  }
};

export const obtenerDatosMaestros = async (peticion, respuesta) => {
  try {
    const resIndustrias = await consultarBaseDatos('SELECT id_industria, codigo, nombre FROM industria ORDER BY id_industria ASC;');
    const resUnidades = await consultarBaseDatos('SELECT id_unidad, nombre, gerente FROM unidad_negocio ORDER BY id_unidad ASC;');

    return respuesta.status(200).json({
      exito: true,
      industrias: resIndustrias.rows,
      unidadesNegocio: resUnidades.rows
    });
  } catch (error) {
    return respuesta.status(500).json({ exito: false, mensaje: 'Error al consultar datos maestros.' });
  }
};
