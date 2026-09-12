import React, { useState } from 'react';
import { Building2, Save, FileText, CheckCircle2 } from 'lucide-react';

const RegistroProveedor = ({ alCompletar }) => {
  const [datos, setDatos] = useState({
    razonSocial: '',
    ruc: '',
    sector: '',
    tamaño: '',
    pais: 'Perú',
    representante: '',
    cargo: '',
    telefono: '',
    aceptaTerminos: false
  });

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    setDatos(previo => ({
      ...previo,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    alCompletar(datos);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-4 py-8">
      <div className="max-w-xl w-full superficie-tarjeta rounded-lg-token p-8">
        <span className="insignia-info">Paso 1 de 2</span>
        
        <h2 className="text-titulo-seccion mt-4 mb-1">
          Registro de Empresa Proveedora
        </h2>
        
        <p className="text-cuerpo-pequeno text-plataformaSecundario mb-8">
          Complete los datos básicos de su organización para iniciar el proceso de evaluación de sostenibilidad.
        </p>

        <form onSubmit={manejarEnvio} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="text-etiqueta text-plataformaSecundario mb-2 block">
                Razón Social
              </label>
              <div className="relative">
                <Building2 className="w-5 h-5 text-plataformaSecundario absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="razonSocial"
                  value={datos.razonSocial}
                  onChange={manejarCambio}
                  required
                  className="campo-entrada campo-entrada-icono w-full"
                  placeholder="Nombre legal de la empresa"
                />
              </div>
            </div>

            <div>
              <label className="text-etiqueta text-plataformaSecundario mb-2 block">
                RUC / Identificador Fiscal
              </label>
              <input
                type="text"
                name="ruc"
                value={datos.ruc}
                onChange={manejarCambio}
                required
                className="campo-entrada w-full"
                placeholder="11 dígitos"
              />
            </div>

            <div>
              <label className="text-etiqueta text-plataformaSecundario mb-2 block">
                Sector Comercial
              </label>
              <select
                name="sector"
                value={datos.sector}
                onChange={manejarCambio}
                required
                className="campo-select w-full"
              >
                <option value="">Seleccione un sector</option>
                <option value="manufactura">Manufactura</option>
                <option value="logistica">Logística y Transporte</option>
                <option value="agricultura">Agricultura y Alimentos</option>
                <option value="servicios">Servicios</option>
                <option value="tecnologia">Tecnología</option>
              </select>
            </div>

            <div>
              <label className="text-etiqueta text-plataformaSecundario mb-2 block">
                Tamaño de Empresa
              </label>
              <select
                name="tamaño"
                value={datos.tamaño}
                onChange={manejarCambio}
                required
                className="campo-select w-full"
              >
                <option value="">Seleccione tamaño</option>
                <option value="micro">Micro (1-10 emp.)</option>
                <option value="pequena">Pequeña (11-50 emp.)</option>
                <option value="mediana">Mediana (51-200 emp.)</option>
                <option value="grande">Grande (+200 emp.)</option>
              </select>
            </div>

            <div>
              <label className="text-etiqueta text-plataformaSecundario mb-2 block">
                País de Operación
              </label>
              <select
                name="pais"
                value={datos.pais}
                onChange={manejarCambio}
                required
                className="campo-select w-full"
              >
                <option value="Perú">Perú</option>
                <option value="Colombia">Colombia</option>
                <option value="Chile">Chile</option>
                <option value="Ecuador">Ecuador</option>
                <option value="México">México</option>
              </select>
            </div>

            <div className="md:col-span-2 pt-4 border-t border-black/[0.06]">
              <h3 className="text-etiqueta font-medium mb-4 text-plataformaTexto">
                Contacto Principal
              </h3>
            </div>

            <div>
              <label className="text-etiqueta text-plataformaSecundario mb-2 block">
                Nombre Completo
              </label>
              <input
                type="text"
                name="representante"
                value={datos.representante}
                onChange={manejarCambio}
                required
                className="campo-entrada w-full"
                placeholder="Nombres y apellidos"
              />
            </div>

            <div>
              <label className="text-etiqueta text-plataformaSecundario mb-2 block">
                Cargo
              </label>
              <input
                type="text"
                name="cargo"
                value={datos.cargo}
                onChange={manejarCambio}
                required
                className="campo-entrada w-full"
                placeholder="Ej. Gerente Comercial"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="text-etiqueta text-plataformaSecundario mb-2 block">
                Teléfono
              </label>
              <input
                type="tel"
                name="telefono"
                value={datos.telefono}
                onChange={manejarCambio}
                required
                className="campo-entrada w-full"
                placeholder="+51 999 999 999"
              />
            </div>
          </div>

          <div className="border-l-2 border-plataformaAzul pl-4 py-3 bg-black/[0.015] rounded-r-md-token mt-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="aceptaTerminos"
                checked={datos.aceptaTerminos}
                onChange={manejarCambio}
                required
                className="w-4 h-4 rounded accent-plataformaAzul mt-1"
              />
              <span className="text-cuerpo-pequeno text-plataformaTexto leading-relaxed">
                Declaro que la información proporcionada es veraz y acepto los términos de evaluación de sostenibilidad corporativa.
              </span>
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="boton-primario w-full flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Guardar y Continuar a Evaluación
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistroProveedor;
