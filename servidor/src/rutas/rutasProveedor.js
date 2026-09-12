import { Router } from 'express';
import {
  solicitarCodigoAcceso,
  validarCodigoAcceso,
  obtenerDatosMaestros,
  obtenerListaProveedores,
  incorporarNuevoProveedor
} from '../controladores/controladorProveedor.js';

export const enrutadorProveedor = Router();

enrutadorProveedor.get('/', obtenerListaProveedores);
enrutadorProveedor.post('/', incorporarNuevoProveedor);
enrutadorProveedor.post('/solicitar-otp', solicitarCodigoAcceso);
enrutadorProveedor.post('/validar-otp', validarCodigoAcceso);
enrutadorProveedor.get('/datos-maestros', obtenerDatosMaestros);
