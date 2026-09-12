import React from 'react';
import { Download, ArrowLeft, Leaf, Shield, Users, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import BarraProgreso from '../../componentes/BarraProgreso';

const ResultadoBento = ({ volverAlInicio }) => {
  const puntajeGlobal = 78;
  const nivel = 'Avanzado';
  
  const dimensiones = [
    { id: 'amb', nombre: 'Desempeño Ambiental', puntaje: 82, icono: Leaf, color: 'bg-emerald-50 text-emerald-600', barra: 'bg-emerald-500' },
    { id: 'soc', nombre: 'Impacto Social', puntaje: 75, icono: Users, color: 'bg-blue-50 text-blue-600', barra: 'bg-blue-500' },
    { id: 'gob', nombre: 'Gobernanza y Ética', puntaje: 90, icono: Shield, color: 'bg-indigo-50 text-indigo-600', barra: 'bg-indigo-500' },
    { id: 'eco', nombre: 'Resiliencia Económica', puntaje: 65, icono: TrendingUp, color: 'bg-amber-50 text-amber-600', barra: 'bg-amber-500' },
  ];

  const recomendaciones = [
    { id: 1, texto: 'Formalizar la política de diversidad e inclusión para todos los procesos de contratación.' },
    { id: 2, texto: 'Establecer metas cuantificables de reducción de huella de carbono para el próximo trimestre.' },
    { id: 3, texto: 'Implementar un sistema de auditoría externa para el canal de denuncias.' }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <span className="text-etiqueta text-plataformaSecundario block mb-1">Reporte de Evaluación ESG</span>
          <h1 className="text-titulo-pagina mb-1">Resultados 2024</h1>
          <p className="text-cuerpo-pequeno text-plataformaSecundario">EcoPack Solutions S.A.C.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={volverAlInicio}
            className="boton-fantasma flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </button>
          <button className="boton-secundario flex items-center gap-2">
            <Download className="w-4 h-4" />
            Descargar PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
        <div className="col-span-1 superficie-tarjeta rounded-lg-token p-8 flex flex-col justify-center items-center text-center">
          <span className="text-etiqueta text-plataformaSecundario mb-2">Puntaje Global ESG</span>
          
          <div className="flex items-baseline gap-1 my-2">
            <span className="text-[64px] font-semibold tracking-[-0.04em] text-plataformaTexto leading-none">{puntajeGlobal}</span>
            <span className="text-titulo-seccion text-plataformaSecundario">/100</span>
          </div>
          
          <span className="insignia-exito mt-2 mb-4">
            Nivel {nivel}
          </span>
          
          <p className="text-subtexto text-plataformaSecundario mt-3 border-t border-black/[0.06] pt-4 w-full">
            Su empresa se encuentra en el 20% superior de proveedores de su sector.
          </p>
        </div>

        <div className="col-span-1 md:col-span-2 superficie-tarjeta rounded-lg-token p-8">
          <h3 className="text-etiqueta font-semibold text-plataformaTexto mb-5 uppercase tracking-wider">Desglose por Dimensiones</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dimensiones.map(dim => {
              const Icono = dim.icono;
              return (
                <div key={dim.id} className="p-4 rounded-md-token bg-black/[0.015] border border-black/[0.04]">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-md-token flex items-center justify-center ${dim.color}`}>
                        <Icono className="w-4 h-4" />
                      </div>
                      <span className="text-cuerpo-pequeno font-medium text-plataformaTexto">{dim.nombre}</span>
                    </div>
                    <span className="text-etiqueta font-semibold font-mono text-plataformaTexto">{dim.puntaje}</span>
                  </div>
                  <BarraProgreso porcentaje={dim.puntaje} color={dim.barra} altura="h-1.5" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="superficie-tarjeta rounded-lg-token p-8 mt-5">
        <div className="flex items-center gap-2 mb-6">
          <AlertCircle className="w-5 h-5 text-plataformaAzul" />
          <h3 className="text-titulo-seccion">Oportunidades de Mejora</h3>
        </div>
        
        <ul className="divide-y divide-black/[0.06]">
          {recomendaciones.map((rec, idx) => (
            <li key={rec.id} className="py-4 flex gap-4 items-start first:pt-0 last:pb-0">
              <span className="w-6 h-6 rounded-full bg-plataformaAzul/[0.08] text-plataformaAzul text-subtexto font-semibold flex-shrink-0 flex items-center justify-center mt-0.5">
                {idx + 1}
              </span>
              <span className="text-cuerpo-pequeno text-plataformaTexto leading-relaxed">
                {rec.texto}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResultadoBento;
