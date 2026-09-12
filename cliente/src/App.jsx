import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CabeceraNavegacion from './componentes/CabeceraNavegacion.jsx';
import AccesoOtp from './paginas/portal/AccesoOtp.jsx';
import RegistroProveedor from './paginas/portal/RegistroProveedor.jsx';
import CuestionarioDinamico from './paginas/portal/CuestionarioDinamico.jsx';
import ResultadoBento from './paginas/portal/ResultadoBento.jsx';
import DashboardCorporativo from './paginas/admin/DashboardCorporativo.jsx';
import InicioSesionCorporativo from './paginas/admin/InicioSesionCorporativo.jsx';

export default function AplicacionPrincipal() {
  const [entornoActual, setEntornoActual] = useState('proveedor');
  const [pasoPortal, setPasoPortal] = useState('acceso_otp');
  const [sesionCorporativa, setSesionCorporativa] = useState(null);

  const [datosProveedor, setDatosProveedor] = useState({
    correo: 'contacto@proveedor.com.pe',
    ruc: '20512345678',
    razonSocial: 'Distribuidora Alimentos del Norte S.A.C.',
    representante: 'Carlos Mendoza Alva',
    idIndustria: '1',
    idUnidad: '1'
  });
  const [resultadoEvaluacion, setResultadoEvaluacion] = useState(null);

  const alCompletarAccesoOtp = ({ correo }) => {
    setDatosProveedor((previo) => ({ ...previo, correo }));
    setPasoPortal('registro');
  };

  const alCompletarRegistro = (datosNuevos) => {
    setDatosProveedor((previo) => ({ ...previo, ...datosNuevos }));
    setPasoPortal('cuestionario');
  };

  const alFinalizarCuestionario = (respuestas) => {
    const mapaDimensiones = {
      'Ambiental': { acumulado: 0, conteo: 0, color: 'text-emerald-600', barra: 'bg-emerald-500' },
      'Social': { acumulado: 0, conteo: 0, color: 'text-blue-600', barra: 'bg-blue-500' },
      'Ética y Gobernanza': { acumulado: 0, conteo: 0, color: 'text-indigo-600', barra: 'bg-indigo-500' },
      'Laboral': { acumulado: 0, conteo: 0, color: 'text-amber-600', barra: 'bg-amber-500' }
    };

    respuestas.forEach((resp) => {
      if (mapaDimensiones[resp.dimension]) {
        mapaDimensiones[resp.dimension].acumulado += resp.puntaje;
        mapaDimensiones[resp.dimension].conteo += 1;
      }
    });

    const dimensionesCalculadas = Object.entries(mapaDimensiones).map(([nombre, info]) => {
      const puntaje = info.conteo > 0 ? Math.round(info.acumulado / info.conteo) : 75;
      return {
        dimension: nombre,
        puntaje,
        color: info.color,
        barra: info.barra
      };
    });

    const sumaTotal = dimensionesCalculadas.reduce((acc, dim) => acc + dim.puntaje, 0);
    const puntajeTotal = Math.round(sumaTotal / dimensionesCalculadas.length);

    const recomendaciones = [
      'Formalizar el procedimiento del canal de denuncias y difundirlo ampliamente entre los colaboradores.',
      'Iniciar la medición anual auditada de la huella de carbono operacional con certificación de alcance.',
      'Implementar un plan anual formal de capacitación preventiva en seguridad y salud ocupacional.'
    ];

    setResultadoEvaluacion({
      puntajeTotal,
      dimensiones: dimensionesCalculadas,
      recomendaciones
    });

    setPasoPortal('resultado');
  };

  const reiniciarFlujoProveedor = () => {
    setPasoPortal('acceso_otp');
    setResultadoEvaluacion(null);
  };

  const cerrarSesionCorporativa = () => {
    setSesionCorporativa(null);
  };

  return (
    <div className="min-h-screen bg-plataformaFondo flex flex-col font-sans">
      <CabeceraNavegacion
        entornoActual={entornoActual}
        alCambiarEntorno={setEntornoActual}
        sesionCorporativa={sesionCorporativa}
        alCerrarSesionCorporativa={cerrarSesionCorporativa}
      />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {entornoActual === 'corporativo' ? (
            <motion.div
              key={sesionCorporativa ? 'dashboard' : 'login'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {sesionCorporativa ? (
                <DashboardCorporativo />
              ) : (
                <InicioSesionCorporativo alIniciarSesion={setSesionCorporativa} />
              )}
            </motion.div>
          ) : (
            <motion.div
              key={pasoPortal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {pasoPortal === 'acceso_otp' && (
                <AccesoOtp alCompletarAcceso={alCompletarAccesoOtp} />
              )}
              {pasoPortal === 'registro' && (
                <RegistroProveedor
                  correoInicial={datosProveedor.correo}
                  alCompletarRegistro={alCompletarRegistro}
                />
              )}
              {pasoPortal === 'cuestionario' && (
                <CuestionarioDinamico
                  datosProveedor={datosProveedor}
                  alFinalizarCuestionario={alFinalizarCuestionario}
                />
              )}
              {pasoPortal === 'resultado' && (
                <ResultadoBento
                  resultado={resultadoEvaluacion}
                  datosProveedor={datosProveedor}
                  alReiniciar={reiniciarFlujoProveedor}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-6 border-t border-black/[0.04] text-center text-xs text-plataformaSecundario flex flex-col items-center gap-1.5">
        <span>Plataforma Centralizada de Evaluaciones de Sostenibilidad de Proveedores • Intercorp Retail 2026</span>
        {entornoActual === 'proveedor' ? (
          <button
            onClick={() => setEntornoActual('corporativo')}
            className="text-[11px] text-[#0071E3] hover:underline font-medium cursor-pointer"
          >
            ¿Es colaborador de Intercorp Retail? Ingrese a la consola corporativa aquí
          </button>
        ) : (
          <button
            onClick={() => setEntornoActual('proveedor')}
            className="text-[11px] text-[#0071E3] hover:underline font-medium cursor-pointer"
          >
            Ir al Portal de Acceso de Proveedores
          </button>
        )}
      </footer>
    </div>
  );
}
