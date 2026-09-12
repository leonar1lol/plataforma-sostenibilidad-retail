import React, { useState } from 'react';
import { Plus, Filter, Sparkles, CheckCircle2, X } from 'lucide-react';

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
        <div className="toast-notificacion fixed top-20 right-6 z-50 px-5 py-3 rounded-full text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{mensajeExito}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-etiqueta text-plataformaSecundario block mb-1">
            Parametrización Corporativa
          </span>
          <h2 className="text-titulo-seccion">
            Banco de Preguntas por Dimensión e Industria
          </h2>
          <p className="text-cuerpo-pequeno text-plataformaSecundario mt-0.5">
            Configuración de enunciados, ponderaciones y reglas de ramificación condicional (Pantalla 3).
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMostrarModalNuevo(true)}
            className="boton-primario flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Crear nuevo ítem</span>
          </button>
        </div>
      </div>

      <div className="superficie-tarjeta rounded-lg-token p-4">
        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-plataformaSecundario" />
          <span className="text-cuerpo-pequeno font-semibold text-plataformaTexto">Filtrar por dimensión:</span>
          <div className="flex flex-wrap gap-2 ml-2">
            {['todas', 'Ambiental', 'Social', 'Ética y Gobernanza', 'Laboral'].map((dim) => (
              <button
                key={dim}
                onClick={() => setFiltroDimension(dim)}
                className={`px-3 py-1.5 rounded-full text-etiqueta transition-all cursor-pointer ${
                  filtroDimension === dim
                    ? 'bg-plataformaTexto text-white'
                    : 'bg-black/[0.04] text-plataformaSecundario hover:text-plataformaTexto'
                }`}
              >
                {dim === 'todas' ? 'Todas' : dim}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {itemsFiltrados.map((item) => (
          <div key={item.id_item} className="superficie-tarjeta rounded-lg-token p-6 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="insignia-info font-mono">
                    {item.codigo}
                  </span>
                  <span className="text-etiqueta font-medium text-plataformaTexto">
                    Dimensión {item.dimension}
                  </span>
                  {item.esCondicional && (
                    <span className="insignia-advertencia uppercase">
                      Condicional
                    </span>
                  )}
                </div>
                <h4 className="text-cuerpo font-medium text-plataformaTexto">
                  {item.enunciado}
                </h4>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="insignia-neutra font-mono">
                  Peso: {item.peso}%
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-black/[0.06]">
              <span className="text-etiqueta text-plataformaSecundario block">
                Alternativas de respuesta y escala de puntaje:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.alternativas.map((alt) => (
                  <div
                    key={alt.id_alternativa}
                    className="p-3 rounded-sm-token bg-superficie-secundaria text-cuerpo-pequeno flex items-center justify-between"
                  >
                    <span className="text-plataformaTexto">{alt.texto}</span>
                    <span className="text-plataformaAzul font-mono font-semibold shrink-0 ml-2">{alt.puntaje} pts</span>
                  </div>
                ))}
              </div>
            </div>

            {item.habilitaEvidencia && (
              <div className="mt-2 flex items-center gap-2 text-etiqueta insignia-exito w-fit">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Requiere adjuntar documento de sustento (PDF / Imagen) al responder afirmativamente.</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {mostrarModalNuevo && (
        <div className="overlay-modal flex items-center justify-center p-4">
          <form onSubmit={agregarNuevoItem} className="contenido-modal max-w-lg w-full p-8">
            <div className="flex items-start justify-between mb-5">
              <div>
                <span className="text-etiqueta text-plataformaAzul block uppercase">
                  Nuevo Ítem
                </span>
                <h3 className="text-titulo-seccion mt-1">
                  Crear pregunta de evaluación
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
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-etiqueta text-plataformaSecundario block mb-1">Código</label>
                  <input
                    type="text"
                    required
                    placeholder="ej. ETI-18"
                    value={nuevoCodigo}
                    onChange={(e) => setNuevoCodigo(e.target.value)}
                    className="campo-entrada w-full font-mono"
                  />
                </div>
                <div>
                  <label className="text-etiqueta text-plataformaSecundario block mb-1">Dimensión</label>
                  <select
                    value={nuevaDimension}
                    onChange={(e) => setNuevaDimension(e.target.value)}
                    className="campo-select w-full"
                  >
                    <option value="Ambiental">Ambiental</option>
                    <option value="Social">Social</option>
                    <option value="Ética y Gobernanza">Ética y Gobernanza</option>
                    <option value="Laboral">Laboral</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-etiqueta text-plataformaSecundario block mb-1">Enunciado de la pregunta</label>
                <textarea
                  required
                  rows={3}
                  value={nuevoEnunciado}
                  onChange={(e) => setNuevoEnunciado(e.target.value)}
                  placeholder="Redacte la pregunta de evaluación..."
                  className="campo-entrada w-full h-auto py-2"
                />
              </div>

              <div>
                <label className="text-etiqueta text-plataformaSecundario block mb-1">Ponderación (%)</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={nuevoPeso}
                  onChange={(e) => setNuevoPeso(e.target.value)}
                  className="campo-entrada w-full font-mono"
                />
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
                Guardar en banco
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
