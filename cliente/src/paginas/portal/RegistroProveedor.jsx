import React, { useState } from 'react';
import { Building2, User, FileText, ChevronRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import TarjetaBento from '../../componentes/TarjetaBento.jsx';

export default function RegistroProveedor({ correoInicial, alCompletarRegistro, alCompletar }) {
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

    const funcionCompletar = alCompletarRegistro || alCompletar;
    if (funcionCompletar) {
      funcionCompletar({
        ruc,
        razonSocial,
        representante,
        correo: correoInicial || 'contacto@proveedor.com.pe',
        idIndustria,
        idUnidad
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-140px)] px-4 py-8">
      <TarjetaBento clasePersonalizada="max-w-xl w-full p-8 shadow-sm-token">
        <div className="mb-6">
          <span className="insignia-info mb-2">Paso 1 de 2 • Identificación</span>
          <h2 className="text-titulo-seccion text-plataformaTexto mt-1">
            Registro corporativo del proveedor
          </h2>
          <p className="text-cuerpo-pequeno text-plataformaSecundario mt-1">
            Valide los datos fiscales de su entidad antes de iniciar el cuestionario de evaluación.
          </p>
        </div>

        <form onSubmit={manejarEnvio} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-etiqueta text-plataformaSecundario mb-1.5 block">
                Número de RUC (11 dígitos)
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 text-plataformaSecundario absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[1.8]" />
                <input
                  type="text"
                  maxLength={11}
                  required
                  value={ruc}
                  onChange={(e) => setRuc(e.target.value)}
                  className="campo-entrada campo-entrada-icono w-full font-mono text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-etiqueta text-plataformaSecundario mb-1.5 block">
                Unidad de Negocio
              </label>
              <select
                value={idUnidad}
                onChange={(e) => setIdUnidad(e.target.value)}
                className="campo-select w-full text-xs"
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
            <label className="text-etiqueta text-plataformaSecundario mb-1.5 block">
              Razón Social
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-plataformaSecundario absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[1.8]" />
              <input
                type="text"
                required
                value={razonSocial}
                onChange={(e) => setRazonSocial(e.target.value)}
                className="campo-entrada campo-entrada-icono w-full text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-etiqueta text-plataformaSecundario mb-1.5 block">
              Representante de contacto
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-plataformaSecundario absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[1.8]" />
              <input
                type="text"
                required
                value={representante}
                onChange={(e) => setRepresentante(e.target.value)}
                className="campo-entrada campo-entrada-icono w-full text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-etiqueta text-plataformaSecundario mb-1.5 block">
              Industria o Sector
            </label>
            <select
              value={idIndustria}
              onChange={(e) => setIdIndustria(e.target.value)}
              className="campo-select w-full text-xs"
            >
              <option value="1">Alimentos y Bebidas Envasados</option>
              <option value="2">Transporte, Almacén y Logística</option>
              <option value="3">Textil, Confecciones y Calzado</option>
              <option value="4">Servicios Generales y Mantenimiento</option>
              <option value="5">Productos Farmacéuticos y Cuidado Personal</option>
            </select>
          </div>

          <div className="border-l-2 border-plataformaAzul pl-4 py-3 bg-black/[0.015] rounded-r-md-token">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="chkConsentimiento"
                checked={aceptaDatosPersonales}
                onChange={(e) => {
                  setAceptaDatosPersonales(e.target.checked);
                  setErrorConsentimiento('');
                }}
                className="mt-0.5 rounded text-plataformaAzul cursor-pointer"
              />
              <label htmlFor="chkConsentimiento" className="text-cuerpo-pequeno text-plataformaTexto leading-relaxed cursor-pointer">
                Autorizo el tratamiento de mis datos personales de contacto conforme a la <strong>Ley N° 29733 (Ley de Protección de Datos Personales de la República del Perú)</strong> con el fin exclusivo de registrar la evaluación de sostenibilidad de Intercorp Retail (RNF03).
              </label>
            </div>
            {errorConsentimiento && (
              <span className="text-subtexto text-red-600 block pt-1.5 pl-6">
                {errorConsentimiento}
              </span>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="boton-primario w-full flex items-center justify-center gap-2 cursor-pointer"
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
