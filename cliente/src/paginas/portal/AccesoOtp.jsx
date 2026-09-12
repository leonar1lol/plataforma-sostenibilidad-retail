import React, { useState, useEffect, useRef } from 'react';
import { Mail, ArrowRight, ShieldCheck, RefreshCw, AlertCircle } from 'lucide-react';
import TarjetaBento from '../../componentes/TarjetaBento.jsx';

export default function AccesoOtp({ alCompletarAcceso, alCompletar }) {
  const [correo, setCorreo] = useState('contacto@proveedor.com.pe');
  const [casillasOtp, setCasillasOtp] = useState(['', '', '', '', '', '']);
  const [segundosRestantes, setSegundosRestantes] = useState(600);
  const [codigoGenerado, setCodigoGenerado] = useState('847291');
  const [mensajeError, setMensajeError] = useState('');
  const [cargando, setCargando] = useState(false);
  const referenciasCasillas = useRef([]);

  useEffect(() => {
    if (segundosRestantes <= 0) return;
    const temporizador = setInterval(() => {
      setSegundosRestantes((previo) => (previo > 0 ? previo - 1 : 0));
    }, 1000);
    return () => clearInterval(temporizador);
  }, [segundosRestantes]);

  const formatearTiempo = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosResto = segundos % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundosResto.toString().padStart(2, '0')}`;
  };

  const alCambiarCasilla = (indice, valor) => {
    if (!/^\d*$/.test(valor)) return;

    const nuevasCasillas = [...casillasOtp];
    nuevasCasillas[indice] = valor.slice(-1);
    setCasillasOtp(nuevasCasillas);
    setMensajeError('');

    if (valor && indice < 5) {
      referenciasCasillas.current[indice + 1]?.focus();
    }
  };

  const alPresionarTecla = (indice, evento) => {
    if (evento.key === 'Backspace' && !casillasOtp[indice] && indice > 0) {
      referenciasCasillas.current[indice - 1]?.focus();
    }
  };

  const alPegarTexto = (evento) => {
    evento.preventDefault();
    const datosPegados = evento.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(datosPegados)) {
      const digitos = datosPegados.split('');
      setCasillasOtp(digitos);
      referenciasCasillas.current[5]?.focus();
    }
  };

  const reenviarCodigo = () => {
    const nuevoCodigo = Math.floor(100000 + Math.random() * 900000).toString();
    setCodigoGenerado(nuevoCodigo);
    setCasillasOtp(['', '', '', '', '', '']);
    setSegundosRestantes(600);
    setMensajeError('');
    referenciasCasillas.current[0]?.focus();
  };

  const validarAcceso = (evento) => {
    evento?.preventDefault();
    const codigoIngresado = casillasOtp.join('');

    if (codigoIngresado.length < 6) {
      setMensajeError('Por favor ingrese los 6 dígitos del código de seguridad.');
      return;
    }

    if (segundosRestantes === 0) {
      setMensajeError('El código ha caducado. Solicite un nuevo código.');
      return;
    }

    setCargando(true);
    setMensajeError('');

    setTimeout(() => {
      try {
        if (codigoIngresado === codigoGenerado || codigoIngresado === '123456') {
          const funcionCompletar = alCompletarAcceso || alCompletar;
          if (funcionCompletar) {
            funcionCompletar({ correo });
          }
        } else {
          setMensajeError('El código ingresado no es válido. Puede usar el código de prueba 123456.');
        }
      } catch (err) {
        setMensajeError('Ocurrió un inconveniente al validar el acceso.');
      } finally {
        setCargando(false);
      }
    }, 400);
  };

  const rellenarCodigoDemostracion = () => {
    const digitos = ['1', '2', '3', '4', '5', '6'];
    setCasillasOtp(digitos);
    setMensajeError('');
    if (referenciasCasillas.current[5]) {
      referenciasCasillas.current[5].focus();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-140px)] px-4 py-8">
      <TarjetaBento clasePersonalizada="max-w-[440px] w-full p-8 shadow-sm-token">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-md-token bg-plataformaAzul/[0.08] text-plataformaAzul flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-6 h-6 stroke-[1.8]" />
          </div>
          <span className="insignia-info mb-2">Acceso Seguro</span>
          <h2 className="text-titulo-seccion text-plataformaTexto mt-1">
            Validación de identidad
          </h2>
          <p className="text-cuerpo-pequeno text-plataformaSecundario mt-2">
            Ingrese el código único de un solo uso remitido a su correo institucional.
          </p>
        </div>

        <form onSubmit={validarAcceso} className="space-y-5">
          <div>
            <label className="text-etiqueta text-plataformaSecundario mb-2 block">
              Correo del representante
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-plataformaSecundario absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[1.8]" />
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
                className="campo-entrada campo-entrada-icono w-full"
                placeholder="ejemplo@proveedor.com.pe"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-etiqueta text-plataformaSecundario">
                Código de seguridad (6 dígitos)
              </label>
              <span className={`font-mono text-subtexto font-medium px-2 py-0.5 rounded-full ${
                segundosRestantes < 60 ? 'insignia-peligro' : 'insignia-neutra'
              }`}>
                {formatearTiempo(segundosRestantes)}
              </span>
            </div>

            <div className="flex justify-between gap-2" onPaste={alPegarTexto}>
              {casillasOtp.map((digito, indice) => (
                <input
                  key={indice}
                  ref={(elemento) => (referenciasCasillas.current[indice] = elemento)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digito}
                  onChange={(e) => alCambiarCasilla(indice, e.target.value)}
                  onKeyDown={(e) => alPresionarTecla(indice, e)}
                  className="w-12 h-14 text-center text-xl font-semibold bg-black/[0.025] border border-black/[0.08] rounded-md-token focus:bg-white focus:border-plataformaAzul focus:shadow-[0_0_0_3px_rgba(0,113,227,0.12)] transition-all duration-180"
                />
              ))}
            </div>

            <div className="mt-3 flex items-center justify-center">
              <button
                type="button"
                onClick={rellenarCodigoDemostracion}
                className="text-subtexto text-plataformaAzul hover:underline font-medium cursor-pointer"
              >
                Usar código de prueba: <span className="font-mono font-semibold">123456</span>
              </button>
            </div>
          </div>

          {mensajeError && (
            <div className="p-3 bg-red-50 border border-red-200/60 rounded-md-token flex items-center gap-2.5 text-cuerpo-pequeno text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{mensajeError}</span>
            </div>
          )}

          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={cargando}
              className="boton-primario w-full flex items-center justify-center gap-2"
            >
              <span>{cargando ? 'Verificando...' : 'Verificar e Ingresar'}</span>
              {!cargando && <ArrowRight className="w-4 h-4 stroke-[2]" />}
            </button>

            <button
              type="button"
              onClick={reenviarCodigo}
              className="boton-secundario w-full flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5 stroke-[1.8]" />
              <span>Solicitar nuevo código</span>
            </button>
          </div>

          <p className="text-subtexto text-center text-plataformaSecundario leading-normal pt-1">
            El código tiene vigencia de diez minutos y un solo uso.
          </p>
        </form>
      </TarjetaBento>
    </div>
  );
}
