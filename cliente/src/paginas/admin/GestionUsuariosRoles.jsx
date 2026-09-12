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
import TarjetaBento from '../../componentes/TarjetaBento.jsx';
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
        <div className="fixed top-20 right-6 z-50 bg-[#1D1D1F] text-white px-5 py-3 rounded-full text-xs font-medium shadow-elevada flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{mensajeExito}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-plataformaSecundario block mb-1">
            Módulo de Seguridad y Accesos (RF02)
          </span>
          <h2 className="text-[26px] font-semibold tracking-[-0.03em] text-plataformaTexto leading-tight">
            Gestión de Usuarios, Roles y Permisos
          </h2>
          <p className="text-[13px] text-plataformaSecundario mt-0.5">
            Administración de cuentas corporativas y matriz de privilegios granulares.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center bg-[#E5E5EA]/60 p-1 rounded-full backdrop-blur-md border border-black/[0.03]">
            <button
              onClick={() => setVistaInterna('usuarios')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                vistaInterna === 'usuarios'
                  ? 'bg-white text-plataformaTexto shadow-xs'
                  : 'text-plataformaSecundario hover:text-plataformaTexto'
              }`}
            >
              Usuarios ({usuarios.length})
            </button>
            <button
              onClick={() => setVistaInterna('permisos')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                vistaInterna === 'permisos'
                  ? 'bg-white text-plataformaTexto shadow-xs'
                  : 'text-plataformaSecundario hover:text-plataformaTexto'
              }`}
            >
              Matriz de Permisos
            </button>
          </div>

          {vistaInterna === 'usuarios' && (
            <button
              onClick={() => setMostrarModalNuevo(true)}
              className="px-4 py-2.5 boton-pildora-primario text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <UserPlus className="w-3.5 h-3.5 stroke-[2]" />
              <span>Nuevo usuario</span>
            </button>
          )}
        </div>
      </div>

      {vistaInterna === 'usuarios' ? (
        <TarjetaBento clasePersonalizada="p-0 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-black/[0.02] border-b border-black/[0.05] text-[11px] font-semibold text-plataformaSecundario uppercase tracking-wider">
                  <th className="py-3.5 px-6">Usuario</th>
                  <th className="py-3.5 px-4">Correo Corporativo</th>
                  <th className="py-3.5 px-4">Rol Asignado</th>
                  <th className="py-3.5 px-4">Unidad de Negocio</th>
                  <th className="py-3.5 px-4 text-center">Estado</th>
                  <th className="py-3.5 px-4">Último Acceso</th>
                  <th className="py-3.5 px-6 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04]">
                {usuarios.map((u) => (
                  <tr key={u.id} className="hover:bg-black/[0.015] transition-colors">
                    <td className="py-4 px-6 font-semibold text-plataformaTexto">
                      {u.nombre}
                    </td>
                    <td className="py-4 px-4 font-mono text-plataformaSecundario">
                      {u.correo}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                        u.rol === 'Administrador Corporativo'
                          ? 'bg-purple-500/10 text-purple-700 border-purple-500/20 font-semibold'
                          : u.rol === 'Gestor Unidad Negocio'
                          ? 'bg-blue-500/10 text-[#0071E3] border-blue-500/20'
                          : 'bg-black/[0.04] text-plataformaSecundario border-black/[0.06]'
                      }`}>
                        <Shield className="w-3 h-3" />
                        {u.rol}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-plataformaTexto">
                      {u.unidad}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                        u.estado === 'Activo'
                          ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20'
                          : 'bg-red-500/10 text-red-600 border-red-500/20'
                      }`}>
                        {u.estado}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-mono text-plataformaSecundario text-[11px]">
                      {u.ultimoAcceso}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => alternarEstadoUsuario(u.id)}
                        className={`text-[11px] font-medium px-3 py-1 rounded-full border transition-all cursor-pointer ${
                          u.estado === 'Activo'
                            ? 'bg-red-50 hover:bg-red-100 text-red-600 border-red-200'
                            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
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
        </TarjetaBento>
      ) : (
        <TarjetaBento clasePersonalizada="p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
          <h3 className="text-base font-semibold text-plataformaTexto mb-1">
            Matriz de Privilegios Granulares por Perfil
          </h3>
          <p className="text-xs text-plataformaSecundario mb-6">
            Definición de control de acceso basada en roles (RBAC) conforme a la directiva de seguridad corporativa.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-black/[0.02] border-b border-black/[0.05] text-[11px] font-semibold text-plataformaSecundario uppercase tracking-wider">
                  <th className="py-3 px-4">Función / Módulo del Sistema</th>
                  <th className="py-3 px-4 text-center">Administrador Corporativo</th>
                  <th className="py-3 px-4 text-center">Gestor Unidad de Negocio</th>
                  <th className="py-3 px-4 text-center">Auditor de Sostenibilidad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04]">
                {matrizPermisos.map((permiso, idx) => (
                  <tr key={idx} className="hover:bg-black/[0.015]">
                    <td className="py-3.5 px-4 font-medium text-plataformaTexto">
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
        </TarjetaBento>
      )}

      {mostrarModalNuevo && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={agregarUsuario} className="bg-white rounded-[28px] p-8 max-w-md w-full shadow-elevada border border-black/[0.06]">
            <div className="flex items-start justify-between mb-5">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#0071E3]">
                  Seguridad
                </span>
                <h3 className="text-lg font-bold tracking-tight text-plataformaTexto mt-1">
                  Registrar Colaborador Interno
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setMostrarModalNuevo(false)}
                className="p-2 rounded-full hover:bg-black/[0.05] text-plataformaSecundario cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 mb-6">
              <div>
                <label className="block text-[11px] font-medium text-plataformaSecundario mb-1">Nombre completo</label>
                <input
                  type="text"
                  required
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                  placeholder="ej. Ana Belén Flores"
                  className="w-full px-3.5 py-2.5 bg-black/[0.025] border border-black/[0.06] rounded-[12px] text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-plataformaSecundario mb-1">Correo corporativo (@intercorpretail.pe)</label>
                <input
                  type="email"
                  required
                  value={nuevoCorreo}
                  onChange={(e) => setNuevoCorreo(e.target.value)}
                  placeholder="aflores@intercorpretail.pe"
                  className="w-full px-3.5 py-2.5 bg-black/[0.025] border border-black/[0.06] rounded-[12px] text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-plataformaSecundario mb-1">Rol de seguridad</label>
                <select
                  value={nuevoRol}
                  onChange={(e) => setNuevoRol(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black/[0.025] border border-black/[0.06] rounded-[12px] text-xs"
                >
                  <option value="Administrador Corporativo">Administrador Corporativo</option>
                  <option value="Gestor Unidad Negocio">Gestor Unidad Negocio</option>
                  <option value="Analista Funcional">Analista Funcional</option>
                  <option value="Auditor de Calidad">Auditor de Calidad</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-plataformaSecundario mb-1">Unidad de Negocio asignada</label>
                <select
                  value={nuevaUnidad}
                  onChange={(e) => setNuevaUnidad(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black/[0.025] border border-black/[0.06] rounded-[12px] text-xs"
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

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setMostrarModalNuevo(false)}
                className="px-4 py-2 boton-pildora-secundario text-xs cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 boton-pildora-primario text-xs cursor-pointer"
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
