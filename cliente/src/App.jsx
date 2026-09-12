import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CabeceraNavegacion from './componentes/CabeceraNavegacion.jsx';
import AccesoOtp from './paginas/portal/AccesoOtp.jsx';
import RegistroProveedor from './paginas/portal/RegistroProveedor.jsx';
import CuestionarioDinamico from './paginas/portal/CuestionarioDinamico.jsx';
import ResultadoBento from './paginas/portal/ResultadoBento.jsx';
import DashboardCorporativo from './paginas/admin/DashboardCorporativo.jsx';
import InicioSesionCorporativo from './paginas/admin/InicioSesionCorporativo.jsx';

const transicionPagina = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }
};

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
              {...transicionPagina}
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
              {...transicionPagina}
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

      <footer className="py-6 border-t border-black/[0.04] text-center">
        <p className="text-subtexto text-plataformaSecundario">
          Plataforma Centralizada de Evaluaciones de Sostenibilidad de Proveedores
        </p>
        <p className="text-subtexto text-plataformaSecundario mt-0.5">
          Intercorp Retail — 2026
        </p>
      </footer>
    </div>
  );
}
