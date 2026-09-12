import React, { useState } from 'react';
import {
  Building2,
  Factory,
  Plus,
  Edit2,
  CheckCircle2,
  X
} from 'lucide-react';
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
        <div className="toast-notificacion fixed top-20 right-6 z-50 px-5 py-3 rounded-full text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{mensajeAviso}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-etiqueta text-plataformaSecundario block mb-1">
            Configuración Paramétrica (RF03)
          </span>
          <h2 className="text-titulo-seccion">
            Unidades de Negocio e Industrias
          </h2>
          <p className="text-cuerpo-pequeno text-plataformaSecundario mt-0.5">
            Mantenimiento del catálogo de las 7 divisiones minoristas y sectores industriales de Intercorp Retail.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-black/[0.06] mb-4">
        <nav className="flex items-center gap-1 overflow-x-auto pb-1">
          <button
            onClick={() => setSubPestana('unidades')}
            className={`px-4 py-2 text-cuerpo-pequeno font-medium transition-all cursor-pointer ${
              subPestana === 'unidades'
                ? 'border-b-2 border-plataformaAzul text-plataformaTexto'
                : 'text-plataformaSecundario hover:text-plataformaTexto'
            }`}
          >
            Unidades de Negocio (7)
          </button>
          <button
            onClick={() => setSubPestana('industrias')}
            className={`px-4 py-2 text-cuerpo-pequeno font-medium transition-all cursor-pointer ${
              subPestana === 'industrias'
                ? 'border-b-2 border-plataformaAzul text-plataformaTexto'
                : 'text-plataformaSecundario hover:text-plataformaTexto'
            }`}
          >
            Catálogo de Industrias ({industrias.length})
          </button>
        </nav>

        {subPestana === 'industrias' && (
          <button
            onClick={() => setMostrarModalNuevaIndustria(true)}
            className="boton-primario h-9 px-4 text-xs flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nueva industria</span>
          </button>
        )}
      </div>

      {subPestana === 'unidades' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {unidades.map((u) => (
            <div key={u.id} className="superficie-tarjeta superficie-tarjeta-hover rounded-lg-token p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 rounded-sm-token bg-plataformaCorporativo text-white flex items-center justify-center font-bold text-xs">
                    {u.nombre.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="insignia-exito">
                    {u.estado}
                  </span>
                </div>

                <h4 className="text-titulo-tarjeta">
                  {u.nombre}
                </h4>
                <p className="text-cuerpo-pequeno text-plataformaSecundario mt-1">
                  Gerente responsable: <span className="font-medium text-plataformaTexto">{u.gerente}</span>
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-black/[0.04] flex items-center justify-between">
                <div>
                  <span className="text-subtexto text-plataformaSecundario block">Meta de evaluados</span>
                  <span className="text-etiqueta font-mono text-plataformaAzul font-semibold">{u.meta} proveedores</span>
                </div>
                <button
                  onClick={() => setUnidadEdicion(u)}
                  className="p-2 rounded-full hover:bg-black/[0.04] text-plataformaSecundario hover:text-plataformaTexto transition-colors cursor-pointer"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="superficie-tarjeta rounded-lg-token overflow-hidden">
          <div className="overflow-x-auto">
            <table className="tabla-premium w-full text-left">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Sector / Industria</th>
                  <th className="text-center">Ítems Asignados</th>
                  <th className="text-center">Estado</th>
                </tr>
              </thead>
              <tbody>
                {industrias.map((ind) => (
                  <tr key={ind.id}>
                    <td className="py-3.5 px-4 font-mono font-medium text-plataformaAzul">
                      {ind.codigo}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-plataformaTexto">
                      {ind.nombre}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-cuerpo-pequeno">
                      {ind.totalItems} preguntas
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="insignia-exito">
                        {ind.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {unidadEdicion && (
        <div className="overlay-modal !m-0 flex items-center justify-center p-4">
          <form onSubmit={guardarEdicionUnidad} className="contenido-modal max-w-md w-full p-8">
            <div className="flex items-start justify-between mb-5">
              <div>
                <span className="text-etiqueta text-plataformaAzul block uppercase">
                  Configuración
                </span>
                <h3 className="text-titulo-seccion mt-1">
                  Editar {unidadEdicion.nombre}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setUnidadEdicion(null)}
                className="p-2 rounded-full hover:bg-black/[0.04] text-plataformaSecundario cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-etiqueta text-plataformaSecundario block mb-1">Gerente de Sostenibilidad</label>
                <input
                  type="text"
                  required
                  value={unidadEdicion.gerente}
                  onChange={(e) => setUnidadEdicion({ ...unidadEdicion, gerente: e.target.value })}
                  className="campo-entrada w-full"
                />
              </div>

              <div>
                <label className="text-etiqueta text-plataformaSecundario block mb-1">Meta de Proveedores a Evaluar</label>
                <input
                  type="number"
                  required
                  value={unidadEdicion.meta}
                  onChange={(e) => setUnidadEdicion({ ...unidadEdicion, meta: Number(e.target.value) })}
                  className="campo-entrada w-full font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setUnidadEdicion(null)}
                className="boton-secundario"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="boton-primario"
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      )}

      {mostrarModalNuevaIndustria && (
        <div className="overlay-modal !m-0 flex items-center justify-center p-4">
          <form onSubmit={agregarNuevaIndustria} className="contenido-modal max-w-md w-full p-8">
            <div className="flex items-start justify-between mb-5">
              <div>
                <span className="text-etiqueta text-plataformaAzul block uppercase">
                  Catálogo
                </span>
                <h3 className="text-titulo-seccion mt-1">
                  Nueva Industria
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setMostrarModalNuevaIndustria(false)}
                className="p-2 rounded-full hover:bg-black/[0.04] text-plataformaSecundario cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-etiqueta text-plataformaSecundario block mb-1">Código de Sector</label>
                <input
                  type="text"
                  required
                  placeholder="ej. IND-ENER"
                  value={nuevoCodigoIndustria}
                  onChange={(e) => setNuevoCodigoIndustria(e.target.value)}
                  className="campo-entrada w-full font-mono"
                />
              </div>

              <div>
                <label className="text-etiqueta text-plataformaSecundario block mb-1">Nombre de la Industria</label>
                <input
                  type="text"
                  required
                  placeholder="ej. Energía, Petróleo y Minería"
                  value={nuevoNombreIndustria}
                  onChange={(e) => setNuevoNombreIndustria(e.target.value)}
                  className="campo-entrada w-full"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setMostrarModalNuevaIndustria(false)}
                className="boton-secundario"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="boton-primario"
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
