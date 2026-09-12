import React, { useState } from 'react';
import {
  Search,
  Filter,
  ShieldAlert,
  Send,
  Eye,
  Plus,
  CheckCircle2,
  Clock,
  Building2,
  X,
  FileSpreadsheet
} from 'lucide-react';
import TarjetaBento from '../../componentes/TarjetaBento.jsx';
import BarraProgreso from '../../componentes/BarraProgreso.jsx';
import { exportarProveedoresAExcel } from '../../utilidades/exportadorExcel.js';

export default function GestionProveedores({ proveedores, alActualizarProveedores }) {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [filtroUnidad, setFiltroUnidad] = useState('todas');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [filtroSoloCriticos, setFiltroSoloCriticos] = useState(false);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);
  const [mostrarModalNuevo, setMostrarModalNuevo] = useState(false);
  const [mensajeNotificacion, setMensajeNotificacion] = useState('');

  const [nuevoRuc, setNuevoRuc] = useState('');
  const [nuevaRazon, setNuevaRazon] = useState('');
  const [nuevoRepresentante, setNuevoRepresentante] = useState('');
  const [nuevoCorreo, setNuevoCorreo] = useState('');
  const [nuevaUnidad, setNuevaUnidad] = useState('Supermercados Peruanos');
  const [nuevaIndustria, setNuevaIndustria] = useState('Alimentos y Bebidas Envasados');
  const [nuevoEsCritico, setNuevoEsCritico] = useState(false);

  const proveedoresFiltrados = proveedores.filter((item) => {
    const coincideTexto =
      item.razonSocial.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
      item.ruc.includes(terminoBusqueda);
    const coincideUnidad = filtroUnidad === 'todas' || item.unidad === filtroUnidad;
    const coincideEstado = filtroEstado === 'todos' || item.estado === filtroEstado;
    const coincideCritico = !filtroSoloCriticos || item.esCritico;
    return coincideTexto && coincideUnidad && coincideEstado && coincideCritico;
  });

  const alternarCritico = (id) => {
    const actualizados = proveedores.map((p) =>
      p.id === id ? { ...p, esCritico: !p.esCritico } : p
    );
    alActualizarProveedores(actualizados);
    mostrarAviso('Estado de criticidad actualizado.');
  };

  const enviarRecordatorio = (correo) => {
    mostrarAviso(`Notificación y enlace OTP remitido con éxito a ${correo}`);
  };

  const mostrarAviso = (texto) => {
    setMensajeNotificacion(texto);
    setTimeout(() => setMensajeNotificacion(''), 3000);
  };

  const registrarNuevoProveedor = (e) => {
    e.preventDefault();
    const nuevo = {
      id: Date.now(),
      ruc: nuevoRuc,
      razonSocial: nuevaRazon,
      representante: nuevoRepresentante,
      correo: nuevoCorreo,
      unidad: nuevaUnidad,
      idUnidad: '1',
      industria: nuevaIndustria,
      idIndustria: '1',
      esCritico: nuevoEsCritico,
      estado: 'Pendiente',
      puntajeTotal: null,
      fechaEvaluacion: null,
      dimensiones: null
    };

    alActualizarProveedores([nuevo, ...proveedores]);
    setMostrarModalNuevo(false);
    setNuevoRuc('');
    setNuevaRazon('');
    setNuevoRepresentante('');
    setNuevoCorreo('');
    mostrarAviso('Proveedor incorporado exitosamente al padrón corporativo.');
  };

  return (
    <div className="space-y-6">
      {mensajeNotificacion && (
        <div className="fixed top-20 right-6 z-50 bg-[#1D1D1F] text-white px-5 py-3 rounded-full text-xs font-medium shadow-elevada flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{mensajeNotificacion}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-plataformaSecundario block mb-1">
            Gestión de Padrón Corporativo
          </span>
          <h2 className="text-[26px] font-semibold tracking-[-0.03em] text-plataformaTexto leading-tight">
            Directorio de Proveedores
          </h2>
          <p className="text-[13px] text-plataformaSecundario mt-0.5">
            Administración unificada de proveedores críticos y regulares de las 7 unidades de negocio.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => exportarProveedoresAExcel(proveedoresFiltrados)}
            className="px-4 py-2.5 bg-white border border-black/[0.06] hover:bg-black/[0.02] text-emerald-700 text-xs font-medium rounded-full flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 stroke-[1.8]" />
            <span>Exportar lista ({proveedoresFiltrados.length})</span>
          </button>
          <button
            onClick={() => setMostrarModalNuevo(true)}
            className="px-4 py-2.5 boton-pildora-primario text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2]" />
            <span>Incorporar proveedor</span>
          </button>
        </div>
      </div>

      <TarjetaBento clasePersonalizada="p-6 shadow-xs border-black/[0.04]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 text-plataformaSecundario absolute left-3.5 top-3 stroke-[1.8]" />
            <input
              type="text"
              placeholder="Buscar por razón social o RUC..."
              value={terminoBusqueda}
              onChange={(e) => setTerminoBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-black/[0.025] border border-black/[0.06] rounded-[14px] text-xs text-plataformaTexto focus:outline-none focus:bg-white focus:border-[#0071E3] transition-all"
            />
          </div>

          <div>
            <select
              value={filtroUnidad}
              onChange={(e) => setFiltroUnidad(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-black/[0.025] border border-black/[0.06] rounded-[14px] text-xs text-plataformaTexto focus:outline-none focus:bg-white focus:border-[#0071E3] transition-all"
            >
              <option value="todas">Todas las unidades</option>
              <option value="Supermercados Peruanos">Supermercados Peruanos</option>
              <option value="Promart">Promart</option>
              <option value="Oechsle">Oechsle</option>
              <option value="Real Plaza">Real Plaza</option>
              <option value="Farmacias Peruanas">Farmacias Peruanas</option>
              <option value="SIP">SIP</option>
              <option value="Intercorp Retail Sucursal China">Sucursal China</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="flex-1 px-3.5 py-2.5 bg-black/[0.025] border border-black/[0.06] rounded-[14px] text-xs text-plataformaTexto focus:outline-none focus:bg-white focus:border-[#0071E3] transition-all"
            >
              <option value="todos">Todos los estados</option>
              <option value="Evaluado">Evaluado</option>
              <option value="En Progreso">En Progreso</option>
              <option value="Pendiente">Pendiente</option>
            </select>

            <button
              onClick={() => setFiltroSoloCriticos(!filtroSoloCriticos)}
              className={`px-3.5 py-2.5 rounded-[14px] text-xs font-medium border flex items-center gap-1.5 transition-all cursor-pointer ${
                filtroSoloCriticos
                  ? 'bg-amber-500/15 text-amber-700 border-amber-500/30'
                  : 'bg-black/[0.025] border-black/[0.06] text-plataformaSecundario hover:text-plataformaTexto'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Críticos</span>
            </button>
          </div>
        </div>
      </TarjetaBento>

      <TarjetaBento clasePersonalizada="p-0 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-black/[0.02] border-b border-black/[0.05] text-[11px] font-semibold text-plataformaSecundario uppercase tracking-wider">
                <th className="py-3.5 px-6">Proveedor</th>
                <th className="py-3.5 px-4">RUC</th>
                <th className="py-3.5 px-4">Unidad de Negocio</th>
                <th className="py-3.5 px-4">Industria</th>
                <th className="py-3.5 px-3 text-center">Crítico</th>
                <th className="py-3.5 px-4 text-center">Estado</th>
                <th className="py-3.5 px-4 text-center">Puntaje</th>
                <th className="py-3.5 px-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04]">
              {proveedoresFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-plataformaSecundario">
                    No se encontraron proveedores que coincidan con los criterios de búsqueda.
                  </td>
                </tr>
              ) : (
                proveedoresFiltrados.map((prov) => (
                  <tr key={prov.id} className="hover:bg-black/[0.015] transition-colors">
                    <td className="py-4 px-6 font-semibold text-plataformaTexto">
                      <div>
                        <span>{prov.razonSocial}</span>
                        <span className="block text-[11px] font-normal text-plataformaSecundario">
                          {prov.representante}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-mono text-plataformaSecundario">
                      {prov.ruc}
                    </td>
                    <td className="py-4 px-4 text-plataformaTexto">
                      {prov.unidad}
                    </td>
                    <td className="py-4 px-4 text-plataformaSecundario">
                      {prov.industria}
                    </td>
                    <td className="py-4 px-3 text-center">
                      <button
                        onClick={() => alternarCritico(prov.id)}
                        className={`p-1.5 rounded-full transition-all cursor-pointer ${
                          prov.esCritico
                            ? 'bg-amber-500/10 text-amber-600 hover:bg-amber-500/20'
                            : 'text-black/20 hover:text-amber-500'
                        }`}
                      >
                        <ShieldAlert className="w-4 h-4" />
                      </button>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                          prov.estado === 'Evaluado'
                            ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20'
                            : prov.estado === 'En Progreso'
                            ? 'bg-blue-500/10 text-[#0071E3] border-blue-500/20'
                            : 'bg-black/[0.04] text-plataformaSecundario border-black/[0.06]'
                        }`}
                      >
                        {prov.estado === 'Evaluado' && <CheckCircle2 className="w-3 h-3" />}
                        {prov.estado === 'Pendiente' && <Clock className="w-3 h-3" />}
                        {prov.estado}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center font-mono font-bold">
                      {prov.puntajeTotal !== null ? (
                        <span
                          className={
                            prov.puntajeTotal >= 80
                              ? 'text-emerald-600'
                              : prov.puntajeTotal >= 60
                              ? 'text-[#0071E3]'
                              : 'text-amber-600'
                          }
                        >
                          {prov.puntajeTotal}/100
                        </span>
                      ) : (
                        <span className="text-black/30 font-normal">-</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => enviarRecordatorio(prov.correo)}
                          title="Enviar recordatorio y OTP"
                          className="p-2 hover:bg-black/[0.04] rounded-full text-plataformaSecundario hover:text-[#0071E3] transition-colors cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5 stroke-[1.8]" />
                        </button>
                        <button
                          onClick={() => setProveedorSeleccionado(prov)}
                          title="Ver ficha de evaluación"
                          className="p-2 hover:bg-black/[0.04] rounded-full text-plataformaSecundario hover:text-plataformaTexto transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 stroke-[1.8]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </TarjetaBento>

      {proveedorSeleccionado && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] p-8 max-w-lg w-full shadow-elevada border border-black/[0.06]">
            <div className="flex items-start justify-between mb-5">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#0071E3]">
                  Ficha de Sostenibilidad
                </span>
                <h3 className="text-xl font-bold tracking-tight text-plataformaTexto mt-1">
                  {proveedorSeleccionado.razonSocial}
                </h3>
                <p className="text-xs text-plataformaSecundario">
                  RUC {proveedorSeleccionado.ruc} • {proveedorSeleccionado.unidad}
                </p>
              </div>
              <button
                onClick={() => setProveedorSeleccionado(null)}
                className="p-2 rounded-full hover:bg-black/[0.05] text-plataformaSecundario cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 my-6">
              <div className="p-4 rounded-[18px] bg-black/[0.02] border border-black/[0.04] flex items-center justify-between">
                <span className="text-xs font-medium text-plataformaSecundario">
                  Puntaje General
                </span>
                <span className="text-2xl font-bold font-mono text-plataformaTexto">
                  {proveedorSeleccionado.puntajeTotal !== null ? `${proveedorSeleccionado.puntajeTotal}/100` : 'Sin evaluar'}
                </span>
              </div>

              {proveedorSeleccionado.dimensiones && (
                <div className="space-y-2.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-plataformaSecundario">Ambiental</span>
                    <span className="font-mono font-semibold">{proveedorSeleccionado.dimensiones.ambiental}%</span>
                  </div>
                  <BarraProgreso porcentaje={proveedorSeleccionado.dimensiones.ambiental} color="bg-emerald-500" />

                  <div className="flex justify-between text-xs pt-1">
                    <span className="text-plataformaSecundario">Social</span>
                    <span className="font-mono font-semibold">{proveedorSeleccionado.dimensiones.social}%</span>
                  </div>
                  <BarraProgreso porcentaje={proveedorSeleccionado.dimensiones.social} color="bg-blue-500" />

                  <div className="flex justify-between text-xs pt-1">
                    <span className="text-plataformaSecundario">Ética y Gobernanza</span>
                    <span className="font-mono font-semibold">{proveedorSeleccionado.dimensiones.etica}%</span>
                  </div>
                  <BarraProgreso porcentaje={proveedorSeleccionado.dimensiones.etica} color="bg-indigo-500" />

                  <div className="flex justify-between text-xs pt-1">
                    <span className="text-plataformaSecundario">Laboral</span>
                    <span className="font-mono font-semibold">{proveedorSeleccionado.dimensiones.laboral}%</span>
                  </div>
                  <BarraProgreso porcentaje={proveedorSeleccionado.dimensiones.laboral} color="bg-amber-500" />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setProveedorSeleccionado(null)}
                className="px-5 py-2.5 boton-pildora-primario text-xs cursor-pointer"
              >
                Cerrar ficha
              </button>
            </div>
          </div>
        </div>
      )}

      {mostrarModalNuevo && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={registrarNuevoProveedor} className="bg-white rounded-[28px] p-8 max-w-md w-full shadow-elevada border border-black/[0.06]">
            <div className="flex items-start justify-between mb-5">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#0071E3]">
                  Nuevo Registro
                </span>
                <h3 className="text-lg font-bold tracking-tight text-plataformaTexto mt-1">
                  Incorporar Proveedor
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

            <div className="space-y-3 mb-6">
              <div>
                <label className="block text-[11px] font-medium text-plataformaSecundario mb-1">RUC (11 dígitos)</label>
                <input
                  type="text"
                  required
                  maxLength={11}
                  value={nuevoRuc}
                  onChange={(e) => setNuevoRuc(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black/[0.025] border border-black/[0.06] rounded-[12px] text-xs font-mono text-plataformaTexto focus:outline-none focus:border-[#0071E3]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-plataformaSecundario mb-1">Razón Social</label>
                <input
                  type="text"
                  required
                  value={nuevaRazon}
                  onChange={(e) => setNuevaRazon(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black/[0.025] border border-black/[0.06] rounded-[12px] text-xs text-plataformaTexto focus:outline-none focus:border-[#0071E3]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-plataformaSecundario mb-1">Representante</label>
                <input
                  type="text"
                  required
                  value={nuevoRepresentante}
                  onChange={(e) => setNuevoRepresentante(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black/[0.025] border border-black/[0.06] rounded-[12px] text-xs text-plataformaTexto focus:outline-none focus:border-[#0071E3]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-plataformaSecundario mb-1">Correo</label>
                <input
                  type="email"
                  required
                  value={nuevoCorreo}
                  onChange={(e) => setNuevoCorreo(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black/[0.025] border border-black/[0.06] rounded-[12px] text-xs text-plataformaTexto focus:outline-none focus:border-[#0071E3]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-medium text-plataformaSecundario mb-1">Unidad</label>
                  <select
                    value={nuevaUnidad}
                    onChange={(e) => setNuevaUnidad(e.target.value)}
                    className="w-full px-2.5 py-2 bg-black/[0.025] border border-black/[0.06] rounded-[12px] text-xs"
                  >
                    <option value="Supermercados Peruanos">Supermercados</option>
                    <option value="Promart">Promart</option>
                    <option value="Oechsle">Oechsle</option>
                    <option value="Real Plaza">Real Plaza</option>
                    <option value="Farmacias Peruanas">Farmacias</option>
                    <option value="SIP">SIP</option>
                    <option value="Intercorp Retail Sucursal China">China</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-plataformaSecundario mb-1">Industria</label>
                  <select
                    value={nuevaIndustria}
                    onChange={(e) => setNuevaIndustria(e.target.value)}
                    className="w-full px-2.5 py-2 bg-black/[0.025] border border-black/[0.06] rounded-[12px] text-xs"
                  >
                    <option value="Alimentos y Bebidas Envasados">Alimentos</option>
                    <option value="Transporte, Almacén y Logística">Logística</option>
                    <option value="Textil, Confecciones y Calzado">Textil</option>
                    <option value="Servicios Generales y Mantenimiento">Servicios</option>
                    <option value="Productos Farmacéuticos y Cuidado Personal">Farmacéutica</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="chkCritico"
                  checked={nuevoEsCritico}
                  onChange={(e) => setNuevoEsCritico(e.target.checked)}
                  className="rounded text-[#0071E3]"
                />
                <label htmlFor="chkCritico" className="text-xs text-plataformaTexto font-medium cursor-pointer">
                  Marcar como proveedor crítico de seguimiento
                </label>
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
                Guardar en padrón
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
