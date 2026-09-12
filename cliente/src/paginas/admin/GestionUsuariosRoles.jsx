import React, { useState } from 'react';
import {
  Users,
  Shield,
  UserPlus,
  CheckCircle2,
  Lock,
  Mail,
  Building,
  X,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { listaUsuariosCorporativos } from '../../datos/datosIniciales.js';

export default function GestionUsuariosRoles({ alRegistrarAuditoria }) {
  const [vistaInterna, setVistaInterna] = useState('usuarios');
  const [usuarios, setUsuarios] = useState(listaUsuariosCorporativos);
  const [mostrarModalNuevo, setMostrarModalNuevo] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');

  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoCorreo, setNuevoCorreo] = useState('');
  const [nuevoRol, setNuevoRol] = useState('Gestor Unidad Negocio');
  const [nuevaUnidad, setNuevaUnidad] = useState('Supermercados Peruanos');

  const matrizPermisos = [
    { funcion: 'Acceso y visualización de dashboards ejecutivos', admin: true, gestor: true, auditor: true },
    { funcion: 'Marcado y edición de lista de proveedores críticos', admin: true, gestor: true, auditor: false },
    { funcion: 'Exportación de reportes a Excel / CSV', admin: true, gestor: true, auditor: true },
    { funcion: 'Creación y ponderación en el Banco de Preguntas', admin: true, gestor: false, auditor: false },
    { funcion: 'Gestión de usuarios y asignación de roles', admin: true, gestor: false, auditor: false },
    { funcion: 'Configuración de unidades de negocio e industrias', admin: true, gestor: false, auditor: false },
    { funcion: 'Consulta de bitácora de auditoría del sistema', admin: true, gestor: false, auditor: true }
  ];

  const alternarEstadoUsuario = (id) => {
    const actualizados = usuarios.map((u) => {
      if (u.id === id) {
        const nuevoEstado = u.estado === 'Activo' ? 'Inactivo' : 'Activo';
        if (alRegistrarAuditoria) {
          alRegistrarAuditoria({
            accion: 'Modificación de estado de usuario',
            modulo: 'Seguridad y Roles',
            detalles: `Usuario ${u.nombre} cambió su estado a ${nuevoEstado}`
          });
        }
        return { ...u, estado: nuevoEstado };
      }
      return u;
    });
    setUsuarios(actualizados);
    mostrarAviso('Estado de acceso de usuario modificado.');
  };

  const mostrarAviso = (texto) => {
    setMensajeExito(texto);
    setTimeout(() => setMensajeExito(''), 3000);
  };

  const agregarUsuario = (e) => {
    e.preventDefault();
    const nuevo = {
      id: Date.now(),
      nombre: nuevoNombre,
      correo: nuevoCorreo,
      rol: nuevoRol,
      unidad: nuevaUnidad,
      estado: 'Activo',
      ultimoAcceso: 'Pendiente de primer ingreso'
    };

    setUsuarios([...usuarios, nuevo]);
    setMostrarModalNuevo(false);
    if (alRegistrarAuditoria) {
      alRegistrarAuditoria({
        accion: 'Creación de nuevo usuario interno',
        modulo: 'Seguridad y Roles',
        detalles: `Se asignó el rol de ${nuevoRol} a ${nuevoNombre} (${nuevoCorreo})`
      });
    }

    setNuevoNombre('');
    setNuevoCorreo('');
    mostrarAviso('Usuario incorporado exitosamente.');
  };

  return (
    <div className="space-y-6">
      {mensajeExito && (
        <div className="toast-notificacion fixed top-20 right-6 z-50 px-5 py-3 rounded-full text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{mensajeExito}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-etiqueta text-plataformaSecundario block mb-1">
            Módulo de Seguridad y Accesos (RF02)
          </span>
          <h2 className="text-titulo-seccion">
            Gestión de Usuarios, Roles y Permisos
          </h2>
          <p className="text-cuerpo-pequeno text-plataformaSecundario mt-0.5">
            Administración de cuentas corporativas y matriz de privilegios granulares.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-black/[0.06] mb-4">
        <nav className="flex items-center gap-1 overflow-x-auto pb-1">
          <button
            onClick={() => setVistaInterna('usuarios')}
            className={`px-4 py-2 text-cuerpo-pequeno font-medium transition-all cursor-pointer ${
              vistaInterna === 'usuarios'
                ? 'border-b-2 border-plataformaAzul text-plataformaTexto'
                : 'text-plataformaSecundario hover:text-plataformaTexto'
            }`}
          >
            Usuarios ({usuarios.length})
          </button>
          <button
            onClick={() => setVistaInterna('permisos')}
            className={`px-4 py-2 text-cuerpo-pequeno font-medium transition-all cursor-pointer ${
              vistaInterna === 'permisos'
                ? 'border-b-2 border-plataformaAzul text-plataformaTexto'
                : 'text-plataformaSecundario hover:text-plataformaTexto'
            }`}
          >
            Matriz de Permisos
          </button>
        </nav>

        {vistaInterna === 'usuarios' && (
          <button
            onClick={() => setMostrarModalNuevo(true)}
            className="boton-primario h-9 px-4 text-xs flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Nuevo usuario</span>
          </button>
        )}
      </div>

      {vistaInterna === 'usuarios' ? (
        <div className="superficie-tarjeta rounded-lg-token overflow-hidden">
          <div className="overflow-x-auto">
            <table className="tabla-premium w-full text-left">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Correo Corporativo</th>
                  <th>Rol Asignado</th>
                  <th>Unidad de Negocio</th>
                  <th className="text-center">Estado</th>
                  <th>Último Acceso</th>
                  <th className="text-right">Acción</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => (
                  <tr key={u.id}>
                    <td className="py-3.5 px-4 font-medium text-plataformaTexto">
                      {u.nombre}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-cuerpo-pequeno text-plataformaSecundario">
                      {u.correo}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 ${
                        u.rol === 'Administrador Corporativo'
                          ? 'insignia-info'
                          : 'insignia-neutra'
                      }`}>
                        <Shield className="w-3 h-3" />
                        {u.rol}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-cuerpo-pequeno text-plataformaTexto">
                      {u.unidad}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 ${
                        u.estado === 'Activo'
                          ? 'insignia-exito'
                          : 'insignia-peligro'
                      }`}>
                        {u.estado}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-plataformaSecundario text-subtexto">
                      {u.ultimoAcceso}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => alternarEstadoUsuario(u.id)}
                        className={`text-subtexto font-medium px-3 py-1 rounded-full transition-all cursor-pointer ${
                          u.estado === 'Activo'
                            ? 'bg-red-50 hover:bg-red-100 text-red-600'
                            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {u.estado === 'Activo' ? 'Desactivar' : 'Activar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="superficie-tarjeta rounded-lg-token p-6">
          <h3 className="text-titulo-tarjeta mb-1">
            Matriz de Privilegios Granulares por Perfil
          </h3>
          <p className="text-cuerpo-pequeno text-plataformaSecundario mb-6">
            Definición de control de acceso basada en roles (RBAC) conforme a la directiva de seguridad corporativa.
          </p>

          <div className="overflow-x-auto">
            <table className="tabla-premium w-full text-left">
              <thead>
                <tr>
                  <th>Función / Módulo del Sistema</th>
                  <th className="text-center">Administrador Corporativo</th>
                  <th className="text-center">Gestor Unidad de Negocio</th>
                  <th className="text-center">Auditor de Sostenibilidad</th>
                </tr>
              </thead>
              <tbody>
                {matrizPermisos.map((permiso, idx) => (
                  <tr key={idx}>
                    <td className="py-3.5 px-4 text-cuerpo-pequeno font-medium text-plataformaTexto">
                      {permiso.funcion}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {permiso.admin ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-black/20 mx-auto" />
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {permiso.gestor ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-black/20 mx-auto" />
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {permiso.auditor ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-black/20 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {mostrarModalNuevo && (
        <div className="overlay-modal !m-0 flex items-center justify-center p-4">
          <form onSubmit={agregarUsuario} className="contenido-modal max-w-md w-full p-8">
            <div className="flex items-start justify-between mb-5">
              <div>
                <span className="text-etiqueta text-plataformaAzul block uppercase">
                  Seguridad
                </span>
                <h3 className="text-titulo-seccion mt-1">
                  Registrar Colaborador Interno
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setMostrarModalNuevo(false)}
                className="p-2 rounded-full hover:bg-black/[0.04] text-plataformaSecundario cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-etiqueta text-plataformaSecundario block mb-1">Nombre completo</label>
                <input
                  type="text"
                  required
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                  placeholder="ej. Ana Belén Flores"
                  className="campo-entrada w-full"
                />
              </div>

              <div>
                <label className="text-etiqueta text-plataformaSecundario block mb-1">Correo corporativo (@intercorpretail.pe)</label>
                <input
                  type="email"
                  required
                  value={nuevoCorreo}
                  onChange={(e) => setNuevoCorreo(e.target.value)}
                  placeholder="aflores@intercorpretail.pe"
                  className="campo-entrada w-full font-mono"
                />
              </div>

              <div>
                <label className="text-etiqueta text-plataformaSecundario block mb-1">Rol de seguridad</label>
                <select
                  value={nuevoRol}
                  onChange={(e) => setNuevoRol(e.target.value)}
                  className="campo-select w-full"
                >
                  <option value="Administrador Corporativo">Administrador Corporativo</option>
                  <option value="Gestor Unidad Negocio">Gestor Unidad Negocio</option>
                  <option value="Analista Funcional">Analista Funcional</option>
                  <option value="Auditor de Calidad">Auditor de Calidad</option>
                </select>
              </div>

              <div>
                <label className="text-etiqueta text-plataformaSecundario block mb-1">Unidad de Negocio asignada</label>
                <select
                  value={nuevaUnidad}
                  onChange={(e) => setNuevaUnidad(e.target.value)}
                  className="campo-select w-full"
                >
                  <option value="Corporativo Central">Corporativo Central</option>
                  <option value="Supermercados Peruanos">Supermercados Peruanos</option>
                  <option value="Promart">Promart</option>
                  <option value="Oechsle">Oechsle</option>
                  <option value="Real Plaza">Real Plaza</option>
                  <option value="Farmacias Peruanas">Farmacias Peruanas</option>
                  <option value="SIP">SIP</option>
                  <option value="Intercorp Retail Sucursal China">Sucursal China</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setMostrarModalNuevo(false)}
                className="boton-secundario"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="boton-primario"
              >
                Crear usuario
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
