import React, { useState } from 'react';
import { Plus, Filter, Sparkles, CheckCircle2, X } from 'lucide-react';
import TarjetaBento from '../../componentes/TarjetaBento.jsx';

export default function BancoPreguntas({ catalogoItems, alActualizarCatalogo }) {
  const [filtroDimension, setFiltroDimension] = useState('todas');
  const [mostrarModalNuevo, setMostrarModalNuevo] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');

  const [nuevoCodigo, setNuevoCodigo] = useState('');
  const [nuevaDimension, setNuevaDimension] = useState('Ambiental');
  const [nuevoEnunciado, setNuevoEnunciado] = useState('');
  const [nuevoPeso, setNuevoPeso] = useState('25');

  const itemsFiltrados = catalogoItems.filter(
    (item) => filtroDimension === 'todas' || item.dimension === filtroDimension
  );

  const agregarNuevoItem = (e) => {
    e.preventDefault();
    const nuevo = {
      id_item: Date.now(),
      codigo: nuevoCodigo || `ITEM-${catalogoItems.length + 1}`,
      dimension: nuevaDimension,
      peso: Number(nuevoPeso),
      industrias: ['1', '2', '3', '4', '5'],
      enunciado: nuevoEnunciado,
      habilitaEvidencia: true,
      alternativas: [
        { id_alternativa: Date.now() + 1, texto: 'Sí, formalizado y certificado', puntaje: 100 },
        { id_alternativa: Date.now() + 2, texto: 'En proceso de implementación', puntaje: 50 },
        { id_alternativa: Date.now() + 3, texto: 'No cuenta con el estándar', puntaje: 0 }
      ]
    };

    alActualizarCatalogo([...catalogoItems, nuevo]);
    setMostrarModalNuevo(false);
    setNuevoCodigo('');
    setNuevoEnunciado('');
    setMensajeExito('Ítem incorporado exitosamente al banco de preguntas.');
    setTimeout(() => setMensajeExito(''), 3000);
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
            Parametrización Corporativa
          </span>
          <h2 className="text-[26px] font-semibold tracking-[-0.03em] text-plataformaTexto leading-tight">
            Banco de Preguntas por Dimensión e Industria
          </h2>
          <p className="text-[13px] text-plataformaSecundario mt-0.5">
            Configuración de enunciados, ponderaciones y reglas de ramificación condicional (Pantalla 3).
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMostrarModalNuevo(true)}
            className="px-4 py-2.5 boton-pildora-primario text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2]" />
            <span>Crear nuevo ítem</span>
          </button>
        </div>
      </div>

      <TarjetaBento clasePersonalizada="p-6 shadow-xs border-black/[0.04]">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-plataformaSecundario" />
          <span className="text-xs font-semibold text-plataformaTexto">Filtrar por dimensión:</span>
          <div className="flex flex-wrap gap-1.5 ml-2">
            {['todas', 'Ambiental', 'Social', 'Ética y Gobernanza', 'Laboral'].map((dim) => (
              <button
                key={dim}
                onClick={() => setFiltroDimension(dim)}
                className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                  filtroDimension === dim
                    ? 'bg-plataformaTexto text-white font-medium shadow-xs'
                    : 'bg-black/[0.03] text-plataformaSecundario hover:text-plataformaTexto'
                }`}
              >
                {dim === 'todas' ? 'Todas' : dim}
              </button>
            ))}
          </div>
        </div>
      </TarjetaBento>

      <div className="grid grid-cols-1 gap-4">
        {itemsFiltrados.map((item) => (
          <TarjetaBento key={item.id_item} clasePersonalizada="p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-black/[0.05]">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#0071E3] bg-[#0071E3]/[0.08] px-2.5 py-0.5 rounded-full">
                    {item.codigo}
                  </span>
                  <span className="text-xs font-semibold text-plataformaTexto">
                    Dimensión {item.dimension}
                  </span>
                  {item.esCondicional && (
                    <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-500/10 px-2 py-0.5 rounded-full">
                      Condicional
                    </span>
                  )}
                </div>
                <h4 className="text-base font-semibold text-plataformaTexto leading-snug">
                  {item.enunciado}
                </h4>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-mono font-bold bg-black/[0.04] px-3 py-1 rounded-full">
                  Peso: {item.peso}%
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-black/[0.04]">
              <span className="text-[11px] font-semibold text-plataformaSecundario uppercase tracking-wider block">
                Alternativas de respuesta y escala de puntaje:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.alternativas.map((alt) => (
                  <div
                    key={alt.id_alternativa}
                    className="p-2.5 rounded-[12px] bg-black/[0.015] border border-black/[0.03] flex items-center justify-between text-xs"
                  >
                    <span className="text-plataformaTexto font-normal">{alt.texto}</span>
                    <span className="font-mono font-bold text-[#0071E3] ml-2 shrink-0">{alt.puntaje} pts</span>
                  </div>
                ))}
              </div>
            </div>

            {item.habilitaEvidencia && (
              <div className="mt-3 flex items-center gap-2 text-[11px] text-emerald-700 bg-emerald-500/10 px-3 py-1.5 rounded-[10px] w-fit">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Requiere adjuntar documento de sustento (PDF / Imagen) al responder afirmativamente.</span>
              </div>
            )}
          </TarjetaBento>
        ))}
      </div>

      {mostrarModalNuevo && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={agregarNuevoItem} className="bg-white rounded-[28px] p-8 max-w-lg w-full shadow-elevada border border-black/[0.06]">
            <div className="flex items-start justify-between mb-5">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#0071E3]">
                  Nuevo Ítem
                </span>
                <h3 className="text-lg font-bold tracking-tight text-plataformaTexto mt-1">
                  Crear pregunta de evaluación
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
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-plataformaSecundario mb-1">Código</label>
                  <input
                    type="text"
                    required
                    placeholder="ej. ETI-18"
                    value={nuevoCodigo}
                    onChange={(e) => setNuevoCodigo(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-black/[0.025] border border-black/[0.06] rounded-[12px] text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-plataformaSecundario mb-1">Dimensión</label>
                  <select
                    value={nuevaDimension}
                    onChange={(e) => setNuevaDimension(e.target.value)}
                    className="w-full px-3 py-2.5 bg-black/[0.025] border border-black/[0.06] rounded-[12px] text-xs"
                  >
                    <option value="Ambiental">Ambiental</option>
                    <option value="Social">Social</option>
                    <option value="Ética y Gobernanza">Ética y Gobernanza</option>
                    <option value="Laboral">Laboral</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-plataformaSecundario mb-1">Enunciado de la pregunta</label>
                <textarea
                  required
                  rows={3}
                  value={nuevoEnunciado}
                  onChange={(e) => setNuevoEnunciado(e.target.value)}
                  placeholder="Redacte la pregunta de evaluación..."
                  className="w-full px-3.5 py-2.5 bg-black/[0.025] border border-black/[0.06] rounded-[12px] text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-plataformaSecundario mb-1">Ponderación (%)</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={nuevoPeso}
                  onChange={(e) => setNuevoPeso(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black/[0.025] border border-black/[0.06] rounded-[12px] text-xs font-mono"
                />
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
                Guardar en banco
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
