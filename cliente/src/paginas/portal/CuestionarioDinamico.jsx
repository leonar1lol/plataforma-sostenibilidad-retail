import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Circle,
  Save,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  UploadCloud,
  FileCheck,
  Trash2,
  HelpCircle
} from 'lucide-react';
import TarjetaBento from '../../componentes/TarjetaBento.jsx';
import BarraProgreso from '../../componentes/BarraProgreso.jsx';
import { catalogoPreguntasCompleto } from '../../datos/datosIniciales.js';

export default function CuestionarioDinamico({ datosProveedor, alFinalizarCuestionario }) {
  const [preguntas, setPreguntas] = useState(catalogoPreguntasCompleto);
  const [indiceActual, setIndiceActual] = useState(0);
  const [respuestasSeleccionadas, setRespuestasSeleccionadas] = useState({});
  const [evidenciasArchivos, setEvidenciasArchivos] = useState({});
  const [mensajeBorrador, setMensajeBorrador] = useState('');

  useEffect(() => {
    const borradorGuardado = localStorage.getItem(`borrador_${datosProveedor?.ruc || 'demo'}`);
    if (borradorGuardado) {
      try {
        const datos = JSON.parse(borradorGuardado);
        if (datos.respuestas) setRespuestasSeleccionadas(datos.respuestas);
        if (datos.indice) setIndiceActual(datos.indice);
      } catch (e) {}
    }
  }, [datosProveedor]);

  const preguntaActual = preguntas[indiceActual];
  const respuestaElegida = respuestasSeleccionadas[preguntaActual.id_item];
  const archivoAdjunto = evidenciasArchivos[preguntaActual.id_item];

  const porcentajeAvance = Math.round(
    (Object.keys(respuestasSeleccionadas).length / preguntas.length) * 100
  );

  const alSeleccionarAlternativa = (alternativa) => {
    setRespuestasSeleccionadas((previas) => ({
      ...previas,
      [preguntaActual.id_item]: {
        id_item: preguntaActual.id_item,
        dimension: preguntaActual.dimension,
        id_alternativa: alternativa.id_alternativa,
        puntaje: alternativa.puntaje,
        texto: alternativa.texto
      }
    }));
  };

  const alAdjuntarArchivo = (evento) => {
    const archivo = evento.target.files[0];
    if (!archivo) return;

    setEvidenciasArchivos((previas) => ({
      ...previas,
      [preguntaActual.id_item]: {
        nombre: archivo.name,
        tamanio: `${(archivo.size / 1024).toFixed(1)} KB`,
        fecha: new Date().toLocaleTimeString()
      }
    }));
  };

  const eliminarArchivo = () => {
    setEvidenciasArchivos((previas) => {
      const copia = { ...previas };
      delete copia[preguntaActual.id_item];
      return copia;
    });
  };

  const guardarBorrador = () => {
    localStorage.setItem(
      `borrador_${datosProveedor?.ruc || 'demo'}`,
      JSON.stringify({
        respuestas: respuestasSeleccionadas,
        indice: indiceActual,
        fecha: new Date().toISOString()
      })
    );
    setMensajeBorrador('Borrador guardado localmente');
    setTimeout(() => setMensajeBorrador(''), 2500);
  };

  const avanzar = () => {
    if (!respuestaElegida) return;

    if (indiceActual < preguntas.length - 1) {
      setIndiceActual((previo) => previo + 1);
    } else {
      localStorage.removeItem(`borrador_${datosProveedor?.ruc || 'demo'}`);
      const listaRespuestas = Object.values(respuestasSeleccionadas);
      alFinalizarCuestionario(listaRespuestas);
    }
  };

  const retroceder = () => {
    if (indiceActual > 0) {
      setIndiceActual((previo) => previo - 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      {mensajeBorrador && (
        <div className="fixed top-20 right-6 z-50 bg-[#1D1D1F] text-white px-5 py-3 rounded-full text-xs font-medium shadow-elevada flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{mensajeBorrador}</span>
        </div>
      )}

      <TarjetaBento clasePersonalizada="p-6 mb-6 shadow-xs border-black/[0.04]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <span className="text-[11px] font-semibold text-plataformaSecundario uppercase tracking-widest block">
              {datosProveedor?.razonSocial || 'Alimentos del Norte S.A.C.'} • RUC {datosProveedor?.ruc || '20512345678'}
            </span>
            <h2 className="text-xl font-semibold tracking-[-0.02em] text-plataformaTexto mt-0.5">
              Cuestionario de Sostenibilidad de Proveedores
            </h2>
          </div>
          <div className="sm:text-right">
            <span className="text-xs font-mono font-semibold text-plataformaTexto">
              {porcentajeAvance}% completado
            </span>
            <span className="text-[11px] text-plataformaSecundario block">
              Pregunta {indiceActual + 1} de {preguntas.length}
            </span>
          </div>
        </div>

        <BarraProgreso porcentaje={porcentajeAvance} altura="h-1.5" />

        <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-black/[0.04] overflow-x-auto pb-1">
          {preguntas.map((p, idx) => {
            const respondida = !!respuestasSeleccionadas[p.id_item];
            const esActual = idx === indiceActual;

            return (
              <button
                key={p.id_item}
                onClick={() => setIndiceActual(idx)}
                className={`w-7 h-7 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer flex items-center justify-center shrink-0 ${
                  esActual
                    ? 'bg-[#0071E3] text-white shadow-xs'
                    : respondida
                    ? 'bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25'
                    : 'bg-black/[0.04] text-plataformaSecundario hover:bg-black/[0.08]'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </TarjetaBento>

      <TarjetaBento clasePersonalizada="p-8 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-black/[0.035] text-[11px] font-medium text-plataformaSecundario">
              Dimensión {preguntaActual.dimension}
            </span>
            <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-[#0071E3]/10 text-[#0071E3] font-bold">
              {preguntaActual.codigo}
            </span>
            <span className="text-[11px] text-plataformaSecundario">
              Ponderación: {preguntaActual.peso}%
            </span>
          </div>

          <h3 className="text-[22px] font-semibold text-plataformaTexto leading-snug tracking-[-0.02em]">
            {preguntaActual.enunciado}
          </h3>
        </div>

        <div className="space-y-3 mb-6">
          {preguntaActual.alternativas.map((alternativa) => {
            const estaSeleccionada = respuestaElegida?.id_alternativa === alternativa.id_alternativa;

            return (
              <div
                key={alternativa.id_alternativa}
                onClick={() => alSeleccionarAlternativa(alternativa)}
                className={`p-4 rounded-[18px] border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                  estaSeleccionada
                    ? 'border-[#0071E3] bg-[#0071E3]/[0.05] shadow-xs ring-1 ring-[#0071E3]'
                    : 'border-black/[0.06] bg-black/[0.01] hover:border-black/[0.12] hover:bg-black/[0.02]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  {estaSeleccionada ? (
                    <CheckCircle2 className="w-5 h-5 text-[#0071E3] shrink-0 stroke-[2]" />
                  ) : (
                    <Circle className="w-5 h-5 text-plataformaSecundario/40 shrink-0 stroke-[1.5]" />
                  )}
                  <span className={`text-[14px] leading-relaxed ${estaSeleccionada ? 'font-semibold text-plataformaTexto' : 'text-plataformaTexto'}`}>
                    {alternativa.texto}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {preguntaActual.habilitaEvidencia && (
          <div className="mb-6 p-4 rounded-[18px] bg-black/[0.015] border border-dashed border-black/[0.1]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <UploadCloud className="w-4 h-4 text-[#0071E3]" />
                <span className="text-xs font-semibold text-plataformaTexto">
                  Sustento documental requerido
                </span>
              </div>
              <span className="text-[11px] text-plataformaSecundario">
                PDF, JPG o PNG hasta 10 MB
              </span>
            </div>

            {archivoAdjunto ? (
              <div className="p-3 bg-white rounded-[12px] border border-black/[0.06] flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  <div>
                    <span className="text-xs font-medium text-plataformaTexto block">{archivoAdjunto.nombre}</span>
                    <span className="text-[10px] text-plataformaSecundario">{archivoAdjunto.tamanio} • Subido hoy</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={eliminarArchivo}
                  className="p-1.5 hover:bg-red-50 text-red-600 rounded-full transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <label className="block p-4 border border-dashed border-black/[0.12] rounded-[14px] text-center hover:bg-white transition-colors cursor-pointer">
                <span className="text-xs font-medium text-[#0071E3] block">
                  Haga clic para adjuntar archivo de evidencia
                </span>
                <span className="text-[11px] text-plataformaSecundario mt-0.5 block">
                  Certificados, auditorías o políticas vigentes
                </span>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={alAdjuntarArchivo}
                  className="hidden"
                />
              </label>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-5 border-t border-black/[0.05]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={indiceActual === 0}
              onClick={retroceder}
              className={`px-4 py-2.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
                indiceActual === 0
                  ? 'opacity-25 cursor-not-allowed text-plataformaSecundario'
                  : 'hover:bg-black/[0.05] text-plataformaTexto cursor-pointer'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5 stroke-[1.8]" />
              <span>Anterior</span>
            </button>

            <button
              type="button"
              onClick={guardarBorrador}
              className="px-4 py-2.5 boton-pildora-secundario text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5 stroke-[1.8]" />
              <span>Guardar borrador</span>
            </button>
          </div>

          <button
            type="button"
            disabled={!respuestaElegida}
            onClick={avanzar}
            className={`px-6 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              respuestaElegida
                ? 'boton-pildora-primario'
                : 'bg-black/[0.06] text-black/30 cursor-not-allowed'
            }`}
          >
            <span>{indiceActual === preguntas.length - 1 ? 'Finalizar evaluación' : 'Continuar'}</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
          </button>
        </div>
      </TarjetaBento>
    </div>
  );
}
