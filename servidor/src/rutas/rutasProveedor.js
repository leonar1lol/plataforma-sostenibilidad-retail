import { Router } from 'express';
import {
  solicitarCodigoAcceso,
  validarCodigoAcceso,
  obtenerDatosMaestros
} from '../controladores/controladorProveedor.js';

export const enrutadorProveedor = Router();

enrutadorProveedor.post('/solicitar-otp', solicitarCodigoAcceso);
enrutadorProveedor.post('/validar-otp', validarCodigoAcceso);
enrutadorProveedor.get('/datos-maestros', obtenerDatosMaestros);
