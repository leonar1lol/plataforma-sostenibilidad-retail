import React from 'react';
import {
  CheckCircle2,
  TrendingUp,
  Leaf,
  Users,
  Shield,
  Briefcase,
  FileDown,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import TarjetaBento from '../../componentes/TarjetaBento.jsx';
import BarraProgreso from '../../componentes/BarraProgreso.jsx';

export default function ResultadoBento({ resultado, datosProveedor, alReiniciar }) {
  const puntajeGlobal = resultado?.puntajeTotal ?? 72;
  const dimensiones = resultado?.dimensiones ?? [
    { dimension: 'Ambiental', puntaje: 65, icono: Leaf, color: 'text-emerald-600', barra: 'bg-emerald-500' },
    { dimension: 'Social', puntaje: 78, icono: Users, color: 'text-blue-600', barra: 'bg-blue-500' },
    { dimension: 'Ética y Gobernanza', puntaje: 81, icono: Shield, color: 'text-indigo-600', barra: 'bg-indigo-500' },
    { dimension: 'Laboral', puntaje: 60, icono: Briefcase, color: 'text-amber-600', barra: 'bg-amber-500' }
  ];

  const recomendaciones = resultado?.recomendaciones ?? [
    'Formalizar el procedimiento del canal de denuncias y difundirlo ampliamente entre los colaboradores.',
    'Iniciar la medición anual de la huella de carbono de la operación (Alcance 1 y 2).',
    'Documentar la política de gestión integral de residuos sólidos con registro de disposición.',
    'Implementar un plan anual de formación y capacitación en seguridad y salud ocupacional.'
  ];

  const determinarNivel = (puntaje) => {
    if (puntaje >= 80) return { etiqueta: 'Nivel Avanzado', clase: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20' };
    if (puntaje >= 60) return { etiqueta: 'Nivel Intermedio', clase: 'bg-blue-500/10 text-[#0071E3] border-blue-500/20' };
    return { etiqueta: 'En Desarrollo', clase: 'bg-amber-500/10 text-amber-700 border-amber-500/20' };
  };

  const nivelDesempeno = determinarNivel(puntajeGlobal);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold text-plataformaSecundario uppercase tracking-widest block mb-1">
            Resultados Oficiales
          </span>
          <h2 className="text-[28px] font-semibold tracking-[-0.03em] text-plataformaTexto leading-tight">
            Desempeño y recomendaciones
          </h2>
          <p className="text-[13px] text-plataformaSecundario mt-0.5">
            {datosProveedor?.razonSocial || 'Distribuidora Alimentos del Norte S.A.C.'} • RUC {datosProveedor?.ruc || '20512345678'}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 boton-pildora-secundario text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5 stroke-[1.8]" />
            <span>Descargar informe</span>
          </button>
          <button
            onClick={alReiniciar}
            className="px-4 py-2.5 bg-black/[0.03] hover:bg-black/[0.06] text-plataformaTexto text-xs font-medium rounded-full flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[1.8]" />
            <span>Nuevo intento</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        <TarjetaBento clasePersonalizada="md:col-span-1 flex flex-col justify-between p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-plataformaSecundario block">
              Puntaje Global
            </span>
            <div className="mt-4 flex items-baseline gap-1.5">
              <span className="text-7xl font-semibold tracking-[-0.05em] text-plataformaTexto font-sans">
                {puntajeGlobal}
              </span>
              <span className="text-xl font-medium text-plataformaSecundario">
                / 100
              </span>
            </div>
          </div>

          <div className="mt-8">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${nivelDesempeno.clase}`}>
              <CheckCircle2 className="w-3.5 h-3.5 stroke-[2]" />
              {nivelDesempeno.etiqueta}
            </span>
            <p className="text-[12px] text-plataformaSecundario mt-2.5 leading-relaxed">
              El certificado formal ha sido remitido al correo corporativo del representante registrado.
            </p>
          </div>
        </TarjetaBento>

        <TarjetaBento clasePersonalizada="md:col-span-2 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-5">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-plataformaSecundario">
              Dimensiones de Sostenibilidad
            </span>
            <span className="text-[11px] text-plataformaSecundario">
              Ponderación equitativa (25% c/u)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {dimensiones.map((item, indice) => {
              const Icono = item.icono || TrendingUp;
              const colorTexto = item.color || 'text-[#0071E3]';
              const colorBarra = item.barra || 'bg-[#0071E3]';

              return (
                <div
                  key={indice}
                  className="p-4 rounded-[20px] bg-black/[0.02] border border-black/[0.04] flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-[10px] bg-white shadow-xs ${colorTexto}`}>
                        <Icono className="w-4 h-4 stroke-[1.8]" />
                      </div>
                      <span className="text-xs font-medium text-plataformaTexto">
                        {item.dimension}
                      </span>
                    </div>
                    <span className="text-sm font-semibold font-mono text-plataformaTexto">
                      {item.puntaje}%
                    </span>
                  </div>
                  <BarraProgreso porcentaje={item.puntaje} color={colorBarra} altura="h-1.5" />
                </div>
              );
            })}
          </div>
        </TarjetaBento>
      </div>

      <TarjetaBento clasePersonalizada="p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-[12px] bg-[#0071E3]/[0.08] text-[#0071E3]">
            <Sparkles className="w-4 h-4 stroke-[1.8]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-plataformaTexto tracking-[-0.01em]">
              Planes de acción recomendados
            </h3>
            <p className="text-[12px] text-plataformaSecundario">
              Acciones sugeridas por el sistema para el cierre de brechas antes de la siguiente campaña.
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          {recomendaciones.map((texto, indice) => (
            <div
              key={indice}
              className="p-4 rounded-[18px] bg-black/[0.015] border border-black/[0.035] flex items-start gap-3.5"
            >
              <span className="w-5 h-5 rounded-full bg-[#0071E3]/[0.08] text-[#0071E3] text-[11px] font-semibold flex items-center justify-center shrink-0 mt-0.5">
                {indice + 1}
              </span>
              <p className="text-[13px] text-plataformaTexto leading-relaxed">
                {typeof texto === 'string' ? texto : texto.texto}
              </p>
            </div>
          ))}
        </div>
      </TarjetaBento>
    </div>
  );
}
