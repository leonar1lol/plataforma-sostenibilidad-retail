import React, { useState } from 'react';
import {
  Building2,
  Factory,
  Plus,
  Edit2,
  CheckCircle2,
  X
} from 'lucide-react';
import TarjetaBento from '../../componentes/TarjetaBento.jsx';
import { listaUnidadesNegocio, listaIndustrias } from '../../datos/datosIniciales.js';

export default function ConfiguracionUnidadesIndustrias({ alRegistrarAuditoria }) {
  const [subPestana, setSubPestana] = useState('unidades');
  const [unidades, setUnidades] = useState(listaUnidadesNegocio);
  const [industrias, setIndustrias] = useState(listaIndustrias);

  const [unidadEdicion, setUnidadEdicion] = useState(null);
  const [mostrarModalNuevaIndustria, setMostrarModalNuevaIndustria] = useState(false);
  const [nuevoCodigoIndustria, setNuevoCodigoIndustria] = useState('');
  const [nuevoNombreIndustria, setNuevoNombreIndustria] = useState('');
  const [mensajeAviso, setMensajeAviso] = useState('');

  const guardarEdicionUnidad = (e) => {
    e.preventDefault();
    const actualizadas = unidades.map((u) =>
      u.id === unidadEdicion.id ? unidadEdicion : u
    );
    setUnidades(actualizadas);
    if (alRegistrarAuditoria) {
      alRegistrarAuditoria({
        accion: 'Actualización de unidad de negocio',
        modulo: 'Configuración Paramétrica',
        detalles: `Modificada unidad ${unidadEdicion.nombre} (Gerente: ${unidadEdicion.gerente})`
      });
    }
    setUnidadEdicion(null);
    mostrarAviso('Datos de la unidad de negocio actualizados.');
  };

  const agregarNuevaIndustria = (e) => {
    e.preventDefault();
    const nueva = {
      id: Date.now().toString(),
      codigo: nuevoCodigoIndustria,
      nombre: nuevoNombreIndustria,
      totalItems: 5,
      estado: 'Vigente'
    };

    setIndustrias([...industrias, nueva]);
    if (alRegistrarAuditoria) {
      alRegistrarAuditoria({
        accion: 'Registro de nueva industria',
        modulo: 'Configuración Paramétrica',
        detalles: `Incorporada industria ${nuevoNombreIndustria} (${nuevoCodigoIndustria})`
      });
    }
    setMostrarModalNuevaIndustria(false);
    setNuevoCodigoIndustria('');
    setNuevoNombreIndustria('');
    mostrarAviso('Nueva industria incorporada al catálogo corporativo.');
  };

  const mostrarAviso = (texto) => {
    setMensajeAviso(texto);
    setTimeout(() => setMensajeAviso(''), 3000);
  };

  return (
    <div className="space-y-6">
      {mensajeAviso && (
        <div className="fixed top-20 right-6 z-50 bg-[#1D1D1F] text-white px-5 py-3 rounded-full text-xs font-medium shadow-elevada flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{mensajeAviso}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-plataformaSecundario block mb-1">
            Configuración Paramétrica (RF03)
          </span>
          <h2 className="text-[26px] font-semibold tracking-[-0.03em] text-plataformaTexto leading-tight">
            Unidades de Negocio e Industrias
          </h2>
          <p className="text-[13px] text-plataformaSecundario mt-0.5">
            Mantenimiento del catálogo de las 7 divisiones minoristas y sectores industriales de Intercorp Retail.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center bg-[#E5E5EA]/60 p-1 rounded-full backdrop-blur-md border border-black/[0.03]">
            <button
              onClick={() => setSubPestana('unidades')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                subPestana === 'unidades'
                  ? 'bg-white text-plataformaTexto shadow-xs'
                  : 'text-plataformaSecundario hover:text-plataformaTexto'
              }`}
            >
              Unidades de Negocio (7)
            </button>
            <button
              onClick={() => setSubPestana('industrias')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                subPestana === 'industrias'
                  ? 'bg-white text-plataformaTexto shadow-xs'
                  : 'text-plataformaSecundario hover:text-plataformaTexto'
              }`}
            >
              Catálogo de Industrias ({industrias.length})
            </button>
          </div>

          {subPestana === 'industrias' && (
            <button
              onClick={() => setMostrarModalNuevaIndustria(true)}
              className="px-4 py-2.5 boton-pildora-primario text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2]" />
              <span>Nueva industria</span>
            </button>
          )}
        </div>
      </div>

      {subPestana === 'unidades' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {unidades.map((u) => (
            <TarjetaBento key={u.id} clasePersonalizada="p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-black/[0.05] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-[12px] bg-plataformaCorporativo text-white flex items-center justify-center font-bold text-xs">
                    {u.nombre.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    {u.estado}
                  </span>
                </div>

                <h4 className="text-base font-semibold text-plataformaTexto">
                  {u.nombre}
                </h4>
                <p className="text-xs text-plataformaSecundario mt-1">
                  Gerente responsable: <span className="font-medium text-plataformaTexto">{u.gerente}</span>
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-black/[0.04] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-plataformaSecundario block">Meta de evaluados</span>
                  <span className="font-mono text-sm font-bold text-[#0071E3]">{u.meta} proveedores</span>
                </div>
                <button
                  onClick={() => setUnidadEdicion(u)}
                  className="p-2 rounded-full hover:bg-black/[0.04] text-plataformaSecundario hover:text-plataformaTexto transition-colors cursor-pointer"
                >
                  <Edit2 className="w-4 h-4 stroke-[1.8]" />
                </button>
              </div>
            </TarjetaBento>
          ))}
        </div>
      ) : (
        <TarjetaBento clasePersonalizada="p-0 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-black/[0.02] border-b border-black/[0.05] text-[11px] font-semibold text-plataformaSecundario uppercase tracking-wider">
                  <th className="py-3.5 px-6">Código</th>
                  <th className="py-3.5 px-4">Sector / Industria</th>
                  <th className="py-3.5 px-4 text-center">Ítems Asignados</th>
                  <th className="py-3.5 px-4 text-center">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04]">
                {industrias.map((ind) => (
                  <tr key={ind.id} className="hover:bg-black/[0.015]">
                    <td className="py-4 px-6 font-mono font-bold text-[#0071E3]">
                      {ind.codigo}
                    </td>
                    <td className="py-4 px-4 font-semibold text-plataformaTexto">
                      {ind.nombre}
                    </td>
                    <td className="py-4 px-4 text-center font-mono font-medium">
                      {ind.totalItems} preguntas
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                        {ind.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TarjetaBento>
      )}

      {unidadEdicion && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={guardarEdicionUnidad} className="bg-white rounded-[28px] p-8 max-w-md w-full shadow-elevada border border-black/[0.06]">
            <div className="flex items-start justify-between mb-5">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#0071E3]">
                  Configuración
                </span>
                <h3 className="text-lg font-bold tracking-tight text-plataformaTexto mt-1">
                  Editar {unidadEdicion.nombre}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setUnidadEdicion(null)}
                className="p-2 rounded-full hover:bg-black/[0.05] text-plataformaSecundario cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 mb-6">
              <div>
                <label className="block text-[11px] font-medium text-plataformaSecundario mb-1">Gerente de Sostenibilidad</label>
                <input
                  type="text"
                  required
                  value={unidadEdicion.gerente}
                  onChange={(e) => setUnidadEdicion({ ...unidadEdicion, gerente: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-black/[0.025] border border-black/[0.06] rounded-[12px] text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-plataformaSecundario mb-1">Meta de Proveedores a Evaluar</label>
                <input
                  type="number"
                  required
                  value={unidadEdicion.meta}
                  onChange={(e) => setUnidadEdicion({ ...unidadEdicion, meta: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-black/[0.025] border border-black/[0.06] rounded-[12px] text-xs font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setUnidadEdicion(null)}
                className="px-4 py-2 boton-pildora-secundario text-xs cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 boton-pildora-primario text-xs cursor-pointer"
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      )}

      {mostrarModalNuevaIndustria && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={agregarNuevaIndustria} className="bg-white rounded-[28px] p-8 max-w-md w-full shadow-elevada border border-black/[0.06]">
            <div className="flex items-start justify-between mb-5">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#0071E3]">
                  Catálogo
                </span>
                <h3 className="text-lg font-bold tracking-tight text-plataformaTexto mt-1">
                  Nueva Industria
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setMostrarModalNuevaIndustria(false)}
                className="p-2 rounded-full hover:bg-black/[0.05] text-plataformaSecundario cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 mb-6">
              <div>
                <label className="block text-[11px] font-medium text-plataformaSecundario mb-1">Código de Sector</label>
                <input
                  type="text"
                  required
                  placeholder="ej. IND-ENER"
                  value={nuevoCodigoIndustria}
                  onChange={(e) => setNuevoCodigoIndustria(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black/[0.025] border border-black/[0.06] rounded-[12px] text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-plataformaSecundario mb-1">Nombre de la Industria</label>
                <input
                  type="text"
                  required
                  placeholder="ej. Energía, Petróleo y Minería"
                  value={nuevoNombreIndustria}
                  onChange={(e) => setNuevoNombreIndustria(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black/[0.025] border border-black/[0.06] rounded-[12px] text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setMostrarModalNuevaIndustria(false)}
                className="px-4 py-2 boton-pildora-secundario text-xs cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 boton-pildora-primario text-xs cursor-pointer"
              >
                Agregar industria
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
