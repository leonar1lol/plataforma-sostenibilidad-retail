import React, { useState } from 'react';
import {
  History,
  Search,
  Filter,
  ShieldCheck,
  Download,
  Clock,
  User,
  Activity
} from 'lucide-react';
import TarjetaBento from '../../componentes/TarjetaBento.jsx';

export default function BitacoraAuditoria({ registrosAuditoria }) {
  const [busqueda, setBusqueda] = useState('');
  const [moduloFiltro, setModuloFiltro] = useState('todos');

  const registrosFiltrados = registrosAuditoria.filter((r) => {
    const coincideTexto =
      r.usuario.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.accion.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.detalles.toLowerCase().includes(busqueda.toLowerCase());
    const coincideModulo = moduloFiltro === 'todos' || r.modulo === moduloFiltro;
    return coincideTexto && coincideModulo;
  });

  const exportarAuditoria = () => {
    const encabezados = ['ID', 'Fecha y Hora', 'Usuario', 'Rol', 'Módulo', 'Acción', 'Detalles', 'Estado'];
    const filas = registrosFiltrados.map((r) => [
      r.id,
      `"${r.fechaHora}"`,
      `"${r.usuario}"`,
      `"${r.rol}"`,
      `"${r.modulo}"`,
      `"${r.accion}"`,
      `"${r.detalles}"`,
      `"${r.estado}"`
    ]);

    const contenido = '\uFEFF' + [encabezados.join(';'), ...filas.map((f) => f.join(';'))].join('\r\n');
    const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' });
    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(blob);
    enlace.download = `Bitacora_Auditoria_Intercorp_${new Date().toISOString().slice(0, 10)}.csv`;
    enlace.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-plataformaSecundario block mb-1">
            Trazabilidad y Seguridad (RF16 • RNF08)
          </span>
          <h2 className="text-[26px] font-semibold tracking-[-0.03em] text-plataformaTexto leading-tight">
            Registro de Auditoría del Sistema
          </h2>
          <p className="text-[13px] text-plataformaSecundario mt-0.5">
            Bitácora inmutable de operaciones, autenticaciones, evaluaciones y cambios paramétricos.
          </p>
        </div>

        <button
          onClick={exportarAuditoria}
          className="px-4 py-2.5 bg-white border border-black/[0.06] hover:bg-black/[0.02] text-plataformaTexto text-xs font-medium rounded-full flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
        >
          <Download className="w-3.5 h-3.5 stroke-[1.8]" />
          <span>Exportar bitácora ({registrosFiltrados.length})</span>
        </button>
      </div>

      <TarjetaBento clasePersonalizada="p-6 shadow-xs border-black/[0.04]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 text-plataformaSecundario absolute left-3.5 top-3 stroke-[1.8]" />
            <input
              type="text"
              placeholder="Buscar por usuario, acción o detalle..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-black/[0.025] border border-black/[0.06] rounded-[14px] text-xs text-plataformaTexto focus:outline-none focus:bg-white focus:border-[#0071E3] transition-all"
            />
          </div>

          <div>
            <select
              value={moduloFiltro}
              onChange={(e) => setModuloFiltro(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-black/[0.025] border border-black/[0.06] rounded-[14px] text-xs text-plataformaTexto focus:outline-none focus:bg-white focus:border-[#0071E3] transition-all"
            >
              <option value="todos">Todos los módulos</option>
              <option value="Autenticación">Autenticación</option>
              <option value="Portal del Proveedor">Portal del Proveedor</option>
              <option value="Evaluación Dinámica">Evaluación Dinámica</option>
              <option value="Directorio">Directorio</option>
              <option value="Banco de Preguntas">Banco de Preguntas</option>
              <option value="Seguridad y Roles">Seguridad y Roles</option>
              <option value="Configuración Paramétrica">Configuración Paramétrica</option>
            </select>
          </div>
        </div>
      </TarjetaBento>

      <TarjetaBento clasePersonalizada="p-0 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-black/[0.02] border-b border-black/[0.05] text-[11px] font-semibold text-plataformaSecundario uppercase tracking-wider">
                <th className="py-3.5 px-6">Marca Temporal</th>
                <th className="py-3.5 px-4">Usuario</th>
                <th className="py-3.5 px-4">Módulo</th>
                <th className="py-3.5 px-4">Acción Realizada</th>
                <th className="py-3.5 px-6">Detalles Operativos</th>
                <th className="py-3.5 px-4 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04]">
              {registrosFiltrados.map((item) => (
                <tr key={item.id} className="hover:bg-black/[0.015]">
                  <td className="py-3.5 px-6 font-mono text-plataformaSecundario text-[11px] whitespace-nowrap">
                    {item.fechaHora}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-plataformaTexto block leading-tight">
                      {item.usuario}
                    </span>
                    <span className="text-[10px] text-plataformaSecundario">
                      {item.rol}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-black/[0.04] text-plataformaTexto">
                      {item.modulo}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-plataformaTexto">
                    {item.accion}
                  </td>
                  <td className="py-3.5 px-6 text-plataformaSecundario text-[11px]">
                    {item.detalles}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                      {item.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TarjetaBento>
    </div>
  );
}
