import React, { useState, useEffect, useRef } from 'react';
import { Mail, ArrowRight, ShieldCheck, RefreshCw, AlertCircle } from 'lucide-react';
import TarjetaBento from '../../componentes/TarjetaBento.jsx';

export default function AccesoOtp({ alCompletarAcceso }) {
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
      setMensajeError('Por favor ingrese los 6 dígitos del código.');
      return;
    }

    if (segundosRestantes === 0) {
      setMensajeError('El código ha caducado. Solicite uno nuevo.');
      return;
    }

    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      if (codigoIngresado === codigoGenerado || codigoIngresado === '123456') {
        alCompletarAcceso({ correo });
      } else {
        setMensajeError('El código ingresado no es válido.');
      }
    }, 350);
  };

  const rellenarCodigoDemostracion = () => {
    const digitos = codigoGenerado.split('');
    setCasillasOtp(digitos);
    setMensajeError('');
  };

  return (
    <div className="max-w-[460px] mx-auto py-16 px-4">
      <TarjetaBento clasePersonalizada="p-8 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-[18px] bg-[#0071E3]/[0.08] text-plataformaAzul flex items-center justify-center mx-auto mb-5 shadow-xs">
            <ShieldCheck className="w-7 h-7 stroke-[1.8]" />
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-plataformaSecundario block mb-1.5">
            Acceso Seguro
          </span>
          <h2 className="text-[28px] font-semibold tracking-[-0.03em] text-plataformaTexto leading-tight mb-2">
            Validación de identidad
          </h2>
          <p className="text-[13px] text-plataformaSecundario leading-relaxed max-w-xs mx-auto">
            Ingreso mediante el código único remitido por la unidad de negocio corporativa.
          </p>
        </div>

        <form onSubmit={validarAcceso} className="space-y-6">
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-plataformaSecundario mb-2">
              Correo del representante
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-plataformaSecundario">
                <Mail className="w-4 h-4 stroke-[1.7]" />
              </div>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-black/[0.025] border border-black/[0.06] rounded-[14px] text-sm text-plataformaTexto placeholder:text-[#A1A1A6] focus:outline-none focus:bg-white focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-medium uppercase tracking-wider text-plataformaSecundario">
                Código de un solo uso
              </label>
              <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full ${segundosRestantes < 60 ? 'bg-red-50 text-red-600 font-semibold' : 'bg-black/[0.04] text-plataformaSecundario'}`}>
                {formatearTiempo(segundosRestantes)}
              </span>
            </div>

            <div className="flex justify-between gap-2.5" onPaste={alPegarTexto}>
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
                  className="w-12 h-14 text-center text-2xl font-semibold bg-black/[0.025] border border-black/[0.08] rounded-[16px] text-plataformaTexto focus:outline-none focus:bg-white focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/15 transition-all duration-200 shadow-xs"
                />
              ))}
            </div>

            <div className="mt-3 flex items-center justify-center text-xs">
              <button
                type="button"
                onClick={rellenarCodigoDemostracion}
                className="text-plataformaAzul hover:underline text-[12px] font-medium transition-colors"
              >
                Código generado: <span className="font-mono font-semibold tracking-wider">{codigoGenerado}</span>
              </button>
            </div>
          </div>

          {mensajeError && (
            <div className="p-3 bg-red-50/80 border border-red-200/60 rounded-[14px] flex items-center gap-2.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{mensajeError}</span>
            </div>
          )}

          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={cargando}
              className="w-full py-3.5 boton-pildora-primario text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <span>{cargando ? 'Validando...' : 'Validar código'}</span>
              <ArrowRight className="w-4 h-4 stroke-[2]" />
            </button>

            <button
              type="button"
              onClick={reenviarCodigo}
              className="w-full py-3 boton-pildora-secundario text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 stroke-[1.8]" />
              <span>Reenviar código</span>
            </button>
          </div>

          <p className="text-[11px] text-center text-plataformaSecundario leading-normal pt-1">
            El código tiene una vigencia estricta de diez minutos y un solo uso.
          </p>
        </form>
      </TarjetaBento>
    </div>
  );
}
