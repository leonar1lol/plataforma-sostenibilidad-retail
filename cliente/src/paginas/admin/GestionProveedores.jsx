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
        <div className="toast-notificacion fixed top-20 right-6 z-50 px-5 py-3 rounded-full text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{mensajeNotificacion}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-etiqueta text-plataformaSecundario block mb-1">
            Gestión de Padrón Corporativo
          </span>
          <h2 className="text-titulo-seccion">
            Directorio de Proveedores
          </h2>
          <p className="text-cuerpo-pequeno text-plataformaSecundario mt-0.5">
            Administración unificada de proveedores críticos y regulares de las 7 unidades de negocio.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => exportarProveedoresAExcel(proveedoresFiltrados)}
            className="boton-secundario flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Exportar lista ({proveedoresFiltrados.length})</span>
          </button>
          <button
            onClick={() => setMostrarModalNuevo(true)}
            className="boton-primario flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Incorporar proveedor</span>
          </button>
        </div>
      </div>

      <div className="superficie-tarjeta rounded-lg-token p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 text-plataformaSecundario absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por razón social o RUC..."
              value={terminoBusqueda}
              onChange={(e) => setTerminoBusqueda(e.target.value)}
              className="campo-entrada campo-entrada-icono w-full"
            />
          </div>

          <div>
            <select
              value={filtroUnidad}
              onChange={(e) => setFiltroUnidad(e.target.value)}
              className="campo-select w-full"
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
              className="campo-select flex-1"
            >
              <option value="todos">Todos los estados</option>
              <option value="Evaluado">Evaluado</option>
              <option value="En Progreso">En Progreso</option>
              <option value="Pendiente">Pendiente</option>
            </select>

            <button
              onClick={() => setFiltroSoloCriticos(!filtroSoloCriticos)}
              className={`flex items-center gap-1.5 transition-all cursor-pointer ${
                filtroSoloCriticos
                  ? 'bg-amber-500/15 text-amber-700 border border-amber-500/30 px-4 h-11 rounded-md-token text-cuerpo-pequeno font-medium'
                  : 'boton-secundario h-11'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Críticos</span>
            </button>
          </div>
        </div>
      </div>

      <div className="superficie-tarjeta rounded-lg-token overflow-hidden">
        <div className="overflow-x-auto">
          <table className="tabla-premium w-full text-left">
            <thead>
              <tr>
                <th>Proveedor</th>
                <th>RUC</th>
                <th>Unidad de Negocio</th>
                <th>Industria</th>
                <th className="text-center">Crítico</th>
                <th className="text-center">Estado</th>
                <th className="text-center">Puntaje</th>
                <th className="text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedoresFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={8}>
                    <div className="estado-vacio py-12 text-center text-plataformaSecundario flex flex-col items-center">
                      <Search className="w-8 h-8 mb-3 opacity-50" />
                      <span>No se encontraron proveedores que coincidan con los criterios de búsqueda.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                proveedoresFiltrados.map((prov) => (
                  <tr key={prov.id}>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-plataformaTexto">{prov.razonSocial}</div>
                      <div className="text-subtexto text-plataformaSecundario">{prov.representante}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-cuerpo-pequeno text-plataformaSecundario">
                      {prov.ruc}
                    </td>
                    <td className="py-3.5 px-4 text-cuerpo-pequeno text-plataformaTexto">
                      {prov.unidad}
                    </td>
                    <td className="py-3.5 px-4 text-cuerpo-pequeno text-plataformaSecundario">
                      {prov.industria}
                    </td>
                    <td className="py-3.5 px-4 text-center">
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
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 ${
                          prov.estado === 'Evaluado'
                            ? 'insignia-exito'
                            : prov.estado === 'En Progreso'
                            ? 'insignia-info'
                            : 'insignia-neutra'
                        }`}
                      >
                        {prov.estado === 'Evaluado' && <CheckCircle2 className="w-3 h-3" />}
                        {prov.estado === 'Pendiente' && <Clock className="w-3 h-3" />}
                        {prov.estado}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-semibold">
                      {prov.puntajeTotal !== null ? (
                        <span
                          className={
                            prov.puntajeTotal >= 80
                              ? 'text-emerald-600'
                              : prov.puntajeTotal >= 60
                              ? 'text-plataformaAzul'
                              : 'text-amber-600'
                          }
                        >
                          {prov.puntajeTotal}/100
                        </span>
                      ) : (
                        <span className="text-black/30 font-normal">-</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => enviarRecordatorio(prov.correo)}
                          title="Enviar recordatorio y OTP"
                          className="p-2 rounded-full hover:bg-black/[0.04] text-plataformaSecundario hover:text-plataformaAzul transition-colors cursor-pointer"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setProveedorSeleccionado(prov)}
                          title="Ver ficha de evaluación"
                          className="p-2 rounded-full hover:bg-black/[0.04] text-plataformaSecundario hover:text-plataformaTexto transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {proveedorSeleccionado && (
        <div className="overlay-modal flex items-center justify-center p-4">
          <div className="contenido-modal max-w-lg w-full p-8">
            <div className="flex items-start justify-between mb-5">
              <div>
                <span className="text-etiqueta text-plataformaAzul block uppercase">
                  Ficha de Sostenibilidad
                </span>
                <h3 className="text-titulo-seccion mt-1">
                  {proveedorSeleccionado.razonSocial}
                </h3>
                <p className="text-cuerpo-pequeno text-plataformaSecundario">
                  RUC {proveedorSeleccionado.ruc} • {proveedorSeleccionado.unidad}
                </p>
              </div>
              <button
                onClick={() => setProveedorSeleccionado(null)}
                className="p-2 rounded-full hover:bg-black/[0.04] text-plataformaSecundario cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 my-6">
              <div className="p-4 rounded-md-token bg-black/[0.02] border border-black/[0.04] flex items-center justify-between">
                <span className="text-cuerpo-pequeno font-medium text-plataformaSecundario">
                  Puntaje General
                </span>
                <span className="text-[24px] font-bold font-mono text-plataformaTexto">
                  {proveedorSeleccionado.puntajeTotal !== null ? `${proveedorSeleccionado.puntajeTotal}/100` : 'Sin evaluar'}
                </span>
              </div>

              {proveedorSeleccionado.dimensiones && (
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-cuerpo-pequeno mb-1">
                      <span className="text-plataformaSecundario">Ambiental</span>
                      <span className="font-mono font-semibold">{proveedorSeleccionado.dimensiones.ambiental}%</span>
                    </div>
                    <BarraProgreso porcentaje={proveedorSeleccionado.dimensiones.ambiental} color="bg-emerald-500" />
                  </div>

                  <div>
                    <div className="flex justify-between text-cuerpo-pequeno mb-1">
                      <span className="text-plataformaSecundario">Social</span>
                      <span className="font-mono font-semibold">{proveedorSeleccionado.dimensiones.social}%</span>
                    </div>
                    <BarraProgreso porcentaje={proveedorSeleccionado.dimensiones.social} color="bg-blue-500" />
                  </div>

                  <div>
                    <div className="flex justify-between text-cuerpo-pequeno mb-1">
                      <span className="text-plataformaSecundario">Ética y Gobernanza</span>
                      <span className="font-mono font-semibold">{proveedorSeleccionado.dimensiones.etica}%</span>
                    </div>
                    <BarraProgreso porcentaje={proveedorSeleccionado.dimensiones.etica} color="bg-indigo-500" />
                  </div>

                  <div>
                    <div className="flex justify-between text-cuerpo-pequeno mb-1">
                      <span className="text-plataformaSecundario">Laboral</span>
                      <span className="font-mono font-semibold">{proveedorSeleccionado.dimensiones.laboral}%</span>
                    </div>
                    <BarraProgreso porcentaje={proveedorSeleccionado.dimensiones.laboral} color="bg-amber-500" />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setProveedorSeleccionado(null)}
                className="boton-primario"
              >
                Cerrar ficha
              </button>
            </div>
          </div>
        </div>
      )}

      {mostrarModalNuevo && (
        <div className="overlay-modal flex items-center justify-center p-4">
          <form onSubmit={registrarNuevoProveedor} className="contenido-modal max-w-md w-full p-8">
            <div className="flex items-start justify-between mb-5">
              <div>
                <span className="text-etiqueta text-plataformaAzul block uppercase">
                  Nuevo Registro
                </span>
                <h3 className="text-titulo-seccion mt-1">
                  Incorporar Proveedor
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
                <label className="text-etiqueta text-plataformaSecundario block mb-1">RUC (11 dígitos)</label>
                <input
                  type="text"
                  required
                  maxLength={11}
                  value={nuevoRuc}
                  onChange={(e) => setNuevoRuc(e.target.value)}
                  className="campo-entrada w-full font-mono"
                />
              </div>

              <div>
                <label className="text-etiqueta text-plataformaSecundario block mb-1">Razón Social</label>
                <input
                  type="text"
                  required
                  value={nuevaRazon}
                  onChange={(e) => setNuevaRazon(e.target.value)}
                  className="campo-entrada w-full"
                />
              </div>

              <div>
                <label className="text-etiqueta text-plataformaSecundario block mb-1">Representante</label>
                <input
                  type="text"
                  required
                  value={nuevoRepresentante}
                  onChange={(e) => setNuevoRepresentante(e.target.value)}
                  className="campo-entrada w-full"
                />
              </div>

              <div>
                <label className="text-etiqueta text-plataformaSecundario block mb-1">Correo</label>
                <input
                  type="email"
                  required
                  value={nuevoCorreo}
                  onChange={(e) => setNuevoCorreo(e.target.value)}
                  className="campo-entrada w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-etiqueta text-plataformaSecundario block mb-1">Unidad</label>
                  <select
                    value={nuevaUnidad}
                    onChange={(e) => setNuevaUnidad(e.target.value)}
                    className="campo-select w-full"
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
                  <label className="text-etiqueta text-plataformaSecundario block mb-1">Industria</label>
                  <select
                    value={nuevaIndustria}
                    onChange={(e) => setNuevaIndustria(e.target.value)}
                    className="campo-select w-full"
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
                  className="rounded text-plataformaAzul w-4 h-4"
                />
                <label htmlFor="chkCritico" className="text-cuerpo-pequeno text-plataformaTexto font-medium cursor-pointer">
                  Marcar como proveedor crítico de seguimiento
                </label>
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
                Guardar en padrón
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
