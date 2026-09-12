import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Save, CheckCircle2, Circle, Upload, AlertCircle, Info, FileText } from 'lucide-react';
import BarraProgreso from '../../componentes/BarraProgreso';

const preguntasDemo = [
  {
    id: 'q1',
    codigo: 'AMB-01',
    dimension: 'Ambiental',
    peso: 'Alto',
    pregunta: '¿La empresa cuenta con una política formal y documentada de gestión ambiental?',
    alternativas: [
      { id: 'a', texto: 'Sí, documentada y comunicada a toda la empresa', puntaje: 100 },
      { id: 'b', texto: 'Sí, pero en proceso de implementación', puntaje: 50 },
      { id: 'c', texto: 'No, pero se planea implementar este año', puntaje: 20 },
      { id: 'd', texto: 'No contamos con una política ambiental', puntaje: 0 }
    ],
    requiereEvidencia: true
  },
  {
    id: 'q2',
    codigo: 'SOC-05',
    dimension: 'Social',
    peso: 'Crítico',
    pregunta: '¿Qué porcentaje de sus trabajadores cuenta con contrato formal y beneficios de ley?',
    alternativas: [
      { id: 'a', texto: '100% de los trabajadores', puntaje: 100 },
      { id: 'b', texto: 'Entre 80% y 99%', puntaje: 75 },
      { id: 'c', texto: 'Entre 50% y 79%', puntaje: 40 },
      { id: 'd', texto: 'Menos del 50%', puntaje: 0 }
    ],
    requiereEvidencia: true
  },
  {
    id: 'q3',
    codigo: 'GOB-02',
    dimension: 'Gobernanza',
    peso: 'Medio',
    pregunta: '¿Tienen establecido un canal de denuncias anónimo y accesible?',
    alternativas: [
      { id: 'a', texto: 'Sí, operado por un tercero independiente', puntaje: 100 },
      { id: 'b', texto: 'Sí, operado internamente', puntaje: 70 },
      { id: 'c', texto: 'En desarrollo', puntaje: 30 },
      { id: 'd', texto: 'No contamos con canal de denuncias', puntaje: 0 }
    ],
    requiereEvidencia: false
  }
];

const CuestionarioDinamico = ({ alFinalizar, datosProveedor }) => {
  const [indiceActual, setIndiceActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [evidencias, setEvidencias] = useState({});
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const preguntaActual = preguntasDemo[indiceActual];
  const progreso = (Object.keys(respuestas).length / preguntasDemo.length) * 100;
  const estaRespondida = respuestas[preguntaActual.id] !== undefined;

  const manejarSeleccion = (idAlternativa) => {
    setRespuestas({
      ...respuestas,
      [preguntaActual.id]: idAlternativa
    });
  };

  const simularSubidaEvidencia = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      setEvidencias({
        ...evidencias,
        [preguntaActual.id]: archivo.name
      });
      mostrarMensaje('Evidencia adjuntada correctamente', 'exito');
    }
  };

  const mostrarMensaje = (texto, tipo = 'info') => {
    setMensaje({ texto, tipo });
    setTimeout(() => setMensaje(null), 3000);
  };

  const guardarBorrador = () => {
    setGuardando(true);
    setTimeout(() => {
      setGuardando(false);
      mostrarMensaje('Borrador guardado exitosamente', 'exito');
    }, 800);
  };

  const avanzar = () => {
    if (indiceActual < preguntasDemo.length - 1) {
      setIndiceActual(indiceActual + 1);
    } else {
      finalizar();
    }
  };

  const retroceder = () => {
    if (indiceActual > 0) {
      setIndiceActual(indiceActual - 1);
    }
  };

  const finalizar = () => {
    const faltantes = preguntasDemo.filter(p => !respuestas[p.id]);
    
    if (faltantes.length > 0) {
      mostrarMensaje(`Faltan responder ${faltantes.length} preguntas`, 'error');
      return;
    }
    
    alFinalizar(respuestas);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      {mensaje && (
        <div className={`toast-notificacion fixed top-6 right-6 z-50 p-4 rounded-md-token shadow-lg-token flex items-center gap-3 ${
          mensaje.tipo === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-white text-plataformaTexto border border-black/[0.06]'
        }`}>
          {mensaje.tipo === 'error' ? <AlertCircle className="w-5 h-5 text-red-500" /> : <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
          <span className="text-cuerpo-pequeno font-medium">{mensaje.texto}</span>
        </div>
      )}

      <div className="superficie-tarjeta rounded-lg-token p-6 mb-5">
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="text-etiqueta text-plataformaSecundario">
              {datosProveedor?.razonSocial || 'EcoPack Solutions'}
            </div>
            <h1 className="text-titulo-seccion mt-1">
              Evaluación ESG 2024
            </h1>
          </div>
          <div className="text-right">
            <div className="text-etiqueta font-semibold text-plataformaTexto">
              {Math.round(progreso)}%
            </div>
            <div className="text-subtexto text-plataformaSecundario">
              {Object.keys(respuestas).length} de {preguntasDemo.length} respondidas
            </div>
          </div>
        </div>
        
        <BarraProgreso porcentaje={progreso} altura="h-1.5" />
        
        <div className="flex gap-1 mt-4 pt-4 border-t border-black/[0.06] flex-wrap">
          {preguntasDemo.map((p, index) => {
            let clasePildora = 'bg-black/[0.04] text-plataformaSecundario';
            if (index === indiceActual) clasePildora = 'bg-plataformaAzul text-white';
            else if (respuestas[p.id]) clasePildora = 'bg-emerald-500/15 text-emerald-700';
            
            return (
              <button
                key={p.id}
                onClick={() => setIndiceActual(index)}
                className={`w-6 h-6 rounded-full text-subtexto font-mono font-semibold transition-colors ${clasePildora}`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>

      <div className="superficie-tarjeta rounded-lg-token p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="insignia-neutra">
            {preguntaActual.dimension}
          </span>
          <span className="insignia-info font-mono">
            {preguntaActual.codigo}
          </span>
          <span className="text-subtexto text-plataformaSecundario ml-auto">
            Peso: {preguntaActual.peso}
          </span>
        </div>

        <h2 className="text-titulo-seccion mt-4 mb-6 leading-tight">
          {preguntaActual.pregunta}
        </h2>

        <div className="space-y-3 mb-8">
          {preguntaActual.alternativas.map((alt) => {
            const estaSeleccionada = respuestas[preguntaActual.id] === alt.id;
            
            return (
              <div
                key={alt.id}
                onClick={() => manejarSeleccion(alt.id)}
                className={`p-4 rounded-md-token border transition-all duration-180 cursor-pointer flex items-start gap-3 ${
                  estaSeleccionada 
                    ? 'border-plataformaAzul bg-plataformaAzul/[0.04]' 
                    : 'border-black/[0.06] hover:border-black/[0.12] hover:bg-black/[0.01]'
                }`}
              >
                <div className={`mt-0.5 flex-shrink-0 ${estaSeleccionada ? 'text-plataformaAzul' : 'text-plataformaSecundario'}`}>
                  {estaSeleccionada ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </div>
                <span className="text-cuerpo text-plataformaTexto pt-0.5">{alt.texto}</span>
              </div>
            );
          })}
        </div>

        {preguntaActual.requiereEvidencia && (
          <div className="p-5 rounded-md-token bg-black/[0.015] border border-dashed border-black/[0.1] mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-black/[0.04] flex items-center justify-center flex-shrink-0 text-plataformaSecundario">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-grow">
                <h4 className="text-cuerpo-pequeno font-medium text-plataformaTexto mb-1">
                  Respaldo Documentario Requerido
                </h4>
                <p className="text-subtexto text-plataformaSecundario mb-3">
                  Esta pregunta requiere evidencia para validar su respuesta.
                </p>
                
                {evidencias[preguntaActual.id] ? (
                  <div className="flex items-center gap-2 p-2 bg-white rounded border border-black/[0.06] text-cuerpo-pequeno">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="truncate max-w-[200px]">{evidencias[preguntaActual.id]}</span>
                    <label className="ml-auto text-plataformaAzul hover:underline cursor-pointer text-etiqueta">
                      Cambiar
                      <input type="file" className="hidden" onChange={simularSubidaEvidencia} />
                    </label>
                  </div>
                ) : (
                  <label className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-black/[0.1] rounded-md-token text-etiqueta font-medium cursor-pointer hover:bg-black/[0.02] transition-colors">
                    <Upload className="w-4 h-4" />
                    Subir documento
                    <input type="file" className="hidden" onChange={simularSubidaEvidencia} />
                  </label>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-black/[0.06] flex items-center justify-between">
          <button
            onClick={retroceder}
            disabled={indiceActual === 0}
            className="boton-fantasma flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </button>
          
          <button
            onClick={guardarBorrador}
            disabled={guardando}
            className="boton-secundario flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {guardando ? 'Guardando...' : 'Guardar borrador'}
          </button>
          
          <button
            onClick={avanzar}
            disabled={!estaRespondida}
            className={`boton-primario flex items-center gap-1 ${!estaRespondida ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {indiceActual === preguntasDemo.length - 1 ? 'Finalizar' : 'Siguiente'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CuestionarioDinamico;
