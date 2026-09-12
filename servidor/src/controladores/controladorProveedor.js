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

export const obtenerDatosMaestros = async (peticion, respuesta) => {
  const industrias = [
    { id_industria: 1, codigo: 'IND-ALIM', nombre: 'Alimentos y Bebidas Envasados' },
    { id_industria: 2, codigo: 'IND-LOG', nombre: 'Transporte, Almacén y Logística' },
    { id_industria: 3, codigo: 'IND-TEXT', nombre: 'Textil, Confecciones y Calzado' },
    { id_industria: 4, codigo: 'IND-SERV', nombre: 'Servicios Generales y Mantenimiento' },
    { id_industria: 5, codigo: 'IND-FARM', nombre: 'Productos Farmacéuticos y Cuidado Personal' }
  ];

  const unidadesNegocio = [
    { id_unidad: 1, nombre: 'Supermercados Peruanos' },
    { id_unidad: 2, nombre: 'Promart' },
    { id_unidad: 3, nombre: 'Oechsle' },
    { id_unidad: 4, nombre: 'Real Plaza' },
    { id_unidad: 5, nombre: 'Farmacias Peruanas' },
    { id_unidad: 6, nombre: 'SIP' },
    { id_unidad: 7, nombre: 'Intercorp Retail Sucursal China' }
  ];

  return respuesta.status(200).json({
    exito: true,
    industrias,
    unidadesNegocio
  });
};
