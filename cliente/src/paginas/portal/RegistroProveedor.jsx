import React, { useState } from 'react';
import { Building2, User, FileText, ChevronRight, ShieldCheck } from 'lucide-react';
import TarjetaBento from '../../componentes/TarjetaBento.jsx';

export default function RegistroProveedor({ correoInicial, alCompletarRegistro }) {
  const [ruc, setRuc] = useState('20512345678');
  const [razonSocial, setRazonSocial] = useState('Distribuidora Alimentos del Norte S.A.C.');
  const [representante, setRepresentante] = useState('Carlos Mendoza Alva');
  const [idIndustria, setIdIndustria] = useState('1');
  const [idUnidad, setIdUnidad] = useState('1');
  const [aceptaDatosPersonales, setAceptaDatosPersonales] = useState(true);
  const [errorConsentimiento, setErrorConsentimiento] = useState('');

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    if (!aceptaDatosPersonales) {
      setErrorConsentimiento('Debe autorizar el tratamiento de datos personales para continuar.');
      return;
    }

    alCompletarRegistro({
      ruc,
      razonSocial,
      representante,
      correo: correoInicial,
      idIndustria,
      idUnidad
    });
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <TarjetaBento clasePersonalizada="p-8 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
        <div className="mb-8">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#0071E3] bg-[#0071E3]/[0.08] px-3 py-1 rounded-full inline-block">
            Paso 1 de 2 • Identificación
          </span>
          <h2 className="text-[26px] font-semibold tracking-[-0.03em] text-plataformaTexto mt-3 mb-1.5 leading-tight">
            Registro corporativo del proveedor
          </h2>
          <p className="text-[13px] text-plataformaSecundario leading-relaxed">
            Valide los datos fiscales de su entidad antes de iniciar el cuestionario de evaluación.
          </p>
        </div>

        <form onSubmit={manejarEnvio} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-plataformaSecundario mb-1.5">
                Número de RUC
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 text-plataformaSecundario absolute left-3.5 top-3.5 stroke-[1.7]" />
                <input
                  type="text"
                  maxLength={11}
                  required
                  value={ruc}
                  onChange={(e) => setRuc(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 bg-black/[0.025] border border-black/[0.06] rounded-[14px] text-sm font-mono text-plataformaTexto focus:outline-none focus:bg-white focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-plataformaSecundario mb-1.5">
                Unidad de Negocio
              </label>
              <select
                value={idUnidad}
                onChange={(e) => setIdUnidad(e.target.value)}
                className="w-full px-3.5 py-3 bg-black/[0.025] border border-black/[0.06] rounded-[14px] text-sm text-plataformaTexto focus:outline-none focus:bg-white focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 transition-all duration-200"
              >
                <option value="1">Supermercados Peruanos</option>
                <option value="2">Promart</option>
                <option value="3">Oechsle</option>
                <option value="4">Real Plaza</option>
                <option value="5">Farmacias Peruanas</option>
                <option value="6">SIP</option>
                <option value="7">Intercorp Retail Sucursal China</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-plataformaSecundario mb-1.5">
              Razón Social
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-plataformaSecundario absolute left-3.5 top-3.5 stroke-[1.7]" />
              <input
                type="text"
                required
                value={razonSocial}
                onChange={(e) => setRazonSocial(e.target.value)}
                className="w-full pl-10 pr-3 py-3 bg-black/[0.025] border border-black/[0.06] rounded-[14px] text-sm text-plataformaTexto focus:outline-none focus:bg-white focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-plataformaSecundario mb-1.5">
              Representante de contacto
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-plataformaSecundario absolute left-3.5 top-3.5 stroke-[1.7]" />
              <input
                type="text"
                required
                value={representante}
                onChange={(e) => setRepresentante(e.target.value)}
                className="w-full pl-10 pr-3 py-3 bg-black/[0.025] border border-black/[0.06] rounded-[14px] text-sm text-plataformaTexto focus:outline-none focus:bg-white focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-plataformaSecundario mb-1.5">
              Industria o Sector
            </label>
            <select
              value={idIndustria}
              onChange={(e) => setIdIndustria(e.target.value)}
              className="w-full px-3.5 py-3 bg-black/[0.025] border border-black/[0.06] rounded-[14px] text-sm text-plataformaTexto focus:outline-none focus:bg-white focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 transition-all duration-200"
            >
              <option value="1">Alimentos y Bebidas Envasados</option>
              <option value="2">Transporte, Almacén y Logística</option>
              <option value="3">Textil, Confecciones y Calzado</option>
              <option value="4">Servicios Generales y Mantenimiento</option>
              <option value="5">Productos Farmacéuticos y Cuidado Personal</option>
            </select>
          </div>

          <div className="p-4 rounded-[18px] bg-black/[0.02] border border-black/[0.04] space-y-2">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="chkDatosPersonales"
                checked={aceptaDatosPersonales}
                onChange={(e) => {
                  setAceptaDatosPersonales(e.target.checked);
                  setErrorConsentimiento('');
                }}
                className="mt-0.5 rounded text-[#0071E3] cursor-pointer"
              />
              <label htmlFor="chkDatosPersonales" className="text-xs text-plataformaTexto leading-relaxed cursor-pointer">
                Autorizo el tratamiento de mis datos personales de contacto conforme a la <strong>Ley N° 29733 (Ley de Protección de Datos Personales de la República del Perú)</strong> con el fin exclusivo de registrar la evaluación de sostenibilidad de Intercorp Retail (RNF03).
              </label>
            </div>
            {errorConsentimiento && (
              <span className="text-[11px] text-red-600 block pl-6">
                {errorConsentimiento}
              </span>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 boton-pildora-primario text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Confirmar y comenzar evaluación</span>
              <ChevronRight className="w-4 h-4 stroke-[2]" />
            </button>
          </div>
        </form>
      </TarjetaBento>
    </div>
  );
}
