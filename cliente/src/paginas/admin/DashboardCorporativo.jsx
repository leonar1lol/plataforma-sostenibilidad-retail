import React, { useState } from 'react';
import {
  Users,
  ShieldAlert,
  CheckCircle2,
  TrendingUp,
  Filter,
  FileSpreadsheet,
  ChevronRight,
  Database,
  Layers,
  BarChart3,
  Sliders,
  History,
  Shield
} from 'lucide-react';
import TarjetaBento from '../../componentes/TarjetaBento.jsx';
import BarraProgreso from '../../componentes/BarraProgreso.jsx';
import GestionProveedores from './GestionProveedores.jsx';
import BancoPreguntas from './BancoPreguntas.jsx';
import GestionUsuariosRoles from './GestionUsuariosRoles.jsx';
import ConfiguracionUnidadesIndustrias from './ConfiguracionUnidadesIndustrias.jsx';
import BitacoraAuditoria from './BitacoraAuditoria.jsx';
import { exportarProveedoresAExcel } from '../../utilidades/exportadorExcel.js';
import {
  listaProveedoresIniciales,
  catalogoPreguntasCompleto,
  listaUnidadesNegocio,
  listaRegistrosAuditoria
} from '../../datos/datosIniciales.js';

export default function DashboardCorporativo() {
  const [pestanaActiva, setPestanaActiva] = useState('resumen');
  const [proveedores, setProveedores] = useState(listaProveedoresIniciales);
  const [catalogoItems, setCatalogoItems] = useState(catalogoPreguntasCompleto);
  const [registrosAuditoria, setRegistrosAuditoria] = useState(listaRegistrosAuditoria);
  const [unidadSeleccionada, setUnidadSeleccionada] = useState('todas');
  const [soloCriticosActivo, setSoloCriticosActivo] = useState(false);

  const registrarEventoAuditoria = ({ accion, modulo, detalles }) => {
    const nuevoRegistro = {
      id: Date.now(),
      fechaHora: new Date().toISOString().replace('T', ' ').slice(0, 19),
      usuario: 'Leonardo Solano',
      rol: 'Administrador Corporativo',
      accion,
      modulo,
      detalles,
      estado: 'Exitoso'
    };
    setRegistrosAuditoria([nuevoRegistro, ...registrosAuditoria]);
  };

  const proveedoresParaMetricas = proveedores.filter((p) => {
    const coincideUnidad = unidadSeleccionada === 'todas' || p.unidad === unidadSeleccionada;
    const coincideCritico = !soloCriticosActivo || p.esCritico;
    return coincideUnidad && coincideCritico;
  });

  const totalProveedores = proveedoresParaMetricas.length;
  const criticosTotales = proveedoresParaMetricas.filter((p) => p.esCritico).length;
  const encuestasCompletadas = proveedoresParaMetricas.filter((p) => p.estado === 'Evaluado').length;
  const sumaPuntajes = proveedoresParaMetricas.reduce((acc, p) => acc + (p.puntajeTotal || 0), 0);
  const promedioAvance = encuestasCompletadas > 0 ? Math.round(sumaPuntajes / encuestasCompletadas) : 70;

  const unidadesConMetricas = listaUnidadesNegocio.map((u) => {
    const proveedoresDeEstaUnidad = proveedores.filter((p) => p.unidad === u.nombre);
    const evaluados = proveedoresDeEstaUnidad.filter((p) => p.estado === 'Evaluado').length;
    const porcentaje = u.meta > 0 ? Math.round((evaluados / u.meta) * 100) : 0;
    return {
      ...u,
      evaluados,
      porcentaje
    };
  });

  const descargarReporteExcel = () => {
    exportarProveedoresAExcel(proveedoresParaMetricas);
    registrarEventoAuditoria({
      accion: 'Exportación a Excel',
      modulo: 'Dashboard Resumen',
      detalles: `Descarga de reporte con ${proveedoresParaMetricas.length} registros para ${unidadSeleccionada}`
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-[11px] font-semibold text-plataformaSecundario uppercase tracking-widest block mb-1">
            Corporativo • Jefatura de Sostenibilidad Intercorp Retail
          </span>
          <h2 className="text-[28px] font-semibold tracking-[-0.03em] text-plataformaTexto leading-tight">
            Gestión Integral de Sostenibilidad de Proveedores
          </h2>
          <p className="text-[13px] text-plataformaSecundario mt-0.5">
            Plataforma centralizada con cobertura completa de requerimientos funcionales (RF01 a RF16).
          </p>
        </div>

        <nav className="flex flex-wrap items-center bg-[#E5E5EA]/60 p-1 rounded-full backdrop-blur-md border border-black/[0.03]">
          <button
            onClick={() => setPestanaActiva('resumen')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
              pestanaActiva === 'resumen'
                ? 'bg-white text-plataformaTexto font-semibold shadow-xs'
                : 'text-plataformaSecundario hover:text-plataformaTexto font-medium'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Resumen</span>
          </button>
          <button
            onClick={() => setPestanaActiva('proveedores')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
              pestanaActiva === 'proveedores'
                ? 'bg-white text-plataformaTexto font-semibold shadow-xs'
                : 'text-plataformaSecundario hover:text-plataformaTexto font-medium'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Directorio ({proveedores.length})</span>
          </button>
          <button
            onClick={() => setPestanaActiva('banco')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
              pestanaActiva === 'banco'
                ? 'bg-white text-plataformaTexto font-semibold shadow-xs'
                : 'text-plataformaSecundario hover:text-plataformaTexto font-medium'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Banco de Ítems</span>
          </button>
          <button
            onClick={() => setPestanaActiva('usuarios')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
              pestanaActiva === 'usuarios'
                ? 'bg-white text-plataformaTexto font-semibold shadow-xs'
                : 'text-plataformaSecundario hover:text-plataformaTexto font-medium'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Usuarios y Roles</span>
          </button>
          <button
            onClick={() => setPestanaActiva('configuracion')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
              pestanaActiva === 'configuracion'
                ? 'bg-white text-plataformaTexto font-semibold shadow-xs'
                : 'text-plataformaSecundario hover:text-plataformaTexto font-medium'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Configuración</span>
          </button>
          <button
            onClick={() => setPestanaActiva('auditoria')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
              pestanaActiva === 'auditoria'
                ? 'bg-white text-plataformaTexto font-semibold shadow-xs'
                : 'text-plataformaSecundario hover:text-plataformaTexto font-medium'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Auditoría</span>
          </button>
        </nav>
      </div>

      {pestanaActiva === 'resumen' && (
        <div className="space-y-7">
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-[22px] bg-white/70 border border-black/[0.05] shadow-xs">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-plataformaSecundario" />
              <span className="text-xs font-semibold text-plataformaTexto">Filtrar tablero:</span>
              <select
                value={unidadSeleccionada}
                onChange={(e) => setUnidadSeleccionada(e.target.value)}
                className="px-3 py-1.5 bg-black/[0.03] border border-black/[0.06] rounded-full text-xs font-medium text-plataformaTexto focus:outline-none"
              >
                <option value="todas">Todas las 7 unidades</option>
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
              <button
                onClick={() => setSoloCriticosActivo(!soloCriticosActivo)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium border flex items-center gap-1.5 transition-all cursor-pointer ${
                  soloCriticosActivo
                    ? 'bg-amber-500/15 text-amber-700 border-amber-500/30 font-semibold'
                    : 'bg-black/[0.03] border-black/[0.06] text-plataformaSecundario hover:text-plataformaTexto'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{soloCriticosActivo ? 'Solo Críticos Activado' : 'Ver solo críticos'}</span>
              </button>

              <button
                onClick={descargarReporteExcel}
                className="px-3.5 py-1.5 bg-emerald-600/10 hover:bg-emerald-600/15 text-emerald-700 text-xs font-medium rounded-full flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Descargar Excel</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <TarjetaBento clasePersonalizada="p-6 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-plataformaSecundario block mb-2">
                Padrón Activo
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-semibold tracking-[-0.03em] text-plataformaTexto">
                  {totalProveedores}
                </span>
                <div className="p-2 rounded-xl bg-blue-500/10 text-[#0071E3]">
                  <Users className="w-4 h-4 stroke-[1.8]" />
                </div>
              </div>
              <span className="text-[11px] text-plataformaSecundario mt-3 block">
                {unidadSeleccionada === 'todas' ? 'Consolidado corporativo' : unidadSeleccionada}
              </span>
            </TarjetaBento>

            <TarjetaBento clasePersonalizada="p-6 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-plataformaSecundario block mb-2">
                Críticos
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-semibold tracking-[-0.03em] text-amber-600">
                  {criticosTotales}
                </span>
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
                  <ShieldAlert className="w-4 h-4 stroke-[1.8]" />
                </div>
              </div>
              <span className="text-[11px] text-plataformaSecundario mt-3 block">
                Sujetos a debida diligencia
              </span>
            </TarjetaBento>

            <TarjetaBento clasePersonalizada="p-6 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-plataformaSecundario block mb-2">
                Evaluados
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-semibold tracking-[-0.03em] text-emerald-600">
                  {encuestasCompletadas}
                </span>
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
                  <CheckCircle2 className="w-4 h-4 stroke-[1.8]" />
                </div>
              </div>
              <span className="text-[11px] text-plataformaSecundario mt-3 block">
                Con reporte y cálculo cerrado
              </span>
            </TarjetaBento>

            <TarjetaBento clasePersonalizada="p-6 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-plataformaSecundario block mb-2">
                Promedio ESG
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-semibold tracking-[-0.03em] text-[#0071E3]">
                  {promedioAvance}%
                </span>
                <div className="p-2 rounded-xl bg-blue-500/10 text-[#0071E3]">
                  <TrendingUp className="w-4 h-4 stroke-[1.8]" />
                </div>
              </div>
              <div className="mt-3.5">
                <BarraProgreso porcentaje={promedioAvance} altura="h-1.5" />
              </div>
            </TarjetaBento>
          </div>

          <TarjetaBento clasePersonalizada="p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/[0.05]">
              <div>
                <h3 className="text-base font-semibold text-plataformaTexto tracking-[-0.02em]">
                  Cumplimiento por Unidad de Negocio
                </h3>
                <p className="text-[12px] text-plataformaSecundario">
                  Haga clic en "Ver proveedores" para auditar la cartera de cada gerencia
                </p>
              </div>
              <span className="text-xs font-mono text-plataformaSecundario">
                7 Gerencias
              </span>
            </div>

            <div className="space-y-3">
              {unidadesConMetricas.map((unidad) => (
                <div
                  key={unidad.id}
                  className="p-4 rounded-[18px] bg-black/[0.015] border border-black/[0.035] hover:bg-black/[0.03] transition-all flex flex-col md:flex-row md:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3.5 md:w-1/3">
                    <div className="w-9 h-9 rounded-[12px] bg-white border border-black/[0.06] flex items-center justify-center text-plataformaCorporativo font-bold text-xs shadow-2xs">
                      {unidad.nombre.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <span className="text-[13px] font-semibold text-plataformaTexto block leading-tight">
                        {unidad.nombre}
                      </span>
                      <span className="text-[11px] text-plataformaSecundario">
                        Gerente: {unidad.gerente} • {unidad.evaluados} de {unidad.meta} evaluados
                      </span>
                    </div>
                  </div>

                  <div className="md:w-1/2 flex items-center gap-3.5">
                    <div className="flex-1">
                      <BarraProgreso
                        porcentaje={unidad.porcentaje}
                        color={
                          unidad.porcentaje >= 70
                            ? 'bg-emerald-500'
                            : unidad.porcentaje >= 50
                            ? 'bg-[#0071E3]'
                            : 'bg-amber-500'
                        }
                        altura="h-1.5"
                      />
                    </div>
                    <span className="text-xs font-mono font-semibold text-plataformaTexto w-10 text-right">
                      {unidad.porcentaje}%
                    </span>
                  </div>

                  <div className="md:w-28 text-right">
                    <button
                      onClick={() => {
                        setUnidadSeleccionada(unidad.nombre);
                        setPestanaActiva('proveedores');
                      }}
                      className="text-[12px] text-[#0071E3] hover:underline font-medium inline-flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>Ver proveedores</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TarjetaBento>
        </div>
      )}

      {pestanaActiva === 'proveedores' && (
        <GestionProveedores
          proveedores={proveedores}
          alActualizarProveedores={(nuevos) => {
            setProveedores(nuevos);
            registrarEventoAuditoria({
              accion: 'Modificación en Directorio de Proveedores',
              modulo: 'Directorio',
              detalles: `Actualizado el padrón corporativo (Total: ${nuevos.length} proveedores)`
            });
          }}
        />
      )}

      {pestanaActiva === 'banco' && (
        <BancoPreguntas
          catalogoItems={catalogoItems}
          alActualizarCatalogo={(nuevos) => {
            setCatalogoItems(nuevos);
            registrarEventoAuditoria({
              accion: 'Actualización en Banco de Preguntas',
              modulo: 'Banco de Preguntas',
              detalles: `Modificada la parametrización de ítems (Total: ${nuevos.length} preguntas)`
            });
          }}
        />
      )}

      {pestanaActiva === 'usuarios' && (
        <GestionUsuariosRoles
          alRegistrarAuditoria={registrarEventoAuditoria}
        />
      )}

      {pestanaActiva === 'configuracion' && (
        <ConfiguracionUnidadesIndustrias
          alRegistrarAuditoria={registrarEventoAuditoria}
        />
      )}

      {pestanaActiva === 'auditoria' && (
        <BitacoraAuditoria
          registrosAuditoria={registrosAuditoria}
        />
      )}
    </div>
  );
}
