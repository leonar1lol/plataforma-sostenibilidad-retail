import React, { useState, useEffect, useRef } from 'react';
import { Mail, ShieldCheck, AlertCircle, ArrowRight, RefreshCw } from 'lucide-react';

const AccesoOtp = ({ alCompletar }) => {
  const [paso, setPaso] = useState('correo');
  const [correo, setCorreo] = useState('');
  const [codigo, setCodigo] = useState(['', '', '', '', '', '']);
  const [tiempoRestante, setTiempoRestante] = useState(300);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  
  const entradasRef = useRef([]);

  useEffect(() => {
    let temporizador;
    if (paso === 'otp' && tiempoRestante > 0) {
      temporizador = setInterval(() => {
        setTiempoRestante((previo) => previo - 1);
      }, 1000);
    } else if (tiempoRestante === 0) {
      setError('El código ha expirado. Por favor, solicita uno nuevo.');
    }
    return () => clearInterval(temporizador);
  }, [paso, tiempoRestante]);

  const formatearTiempo = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos}:${segundosRestantes < 10 ? '0' : ''}${segundosRestantes}`;
  };

  const manejarEnvioCorreo = (e) => {
    e.preventDefault();
    if (!correo || !correo.includes('@')) {
      setError('Por favor, ingresa un correo electrónico válido');
      return;
    }
    setCargando(true);
    setError(null);
    setTimeout(() => {
      setCargando(false);
      setPaso('otp');
      setTiempoRestante(300);
    }, 1000);
  };

  const manejarCambioCodigo = (indice, valor) => {
    if (isNaN(valor)) return;
    
    const nuevoCodigo = [...codigo];
    nuevoCodigo[indice] = valor;
    setCodigo(nuevoCodigo);

    if (valor !== '' && indice < 5) {
      entradasRef.current[indice + 1].focus();
    }
  };

  const manejarTeclaPresionada = (indice, e) => {
    if (e.key === 'Backspace' && codigo[indice] === '' && indice > 0) {
      entradasRef.current[indice - 1].focus();
    }
  };

  const manejarPegado = (e) => {
    e.preventDefault();
    const datosPegados = e.clipboardData.getData('text').slice(0, 6).split('');
    if (datosPegados.some(isNaN)) return;
    
    const nuevoCodigo = [...codigo];
    datosPegados.forEach((valor, i) => {
      if (i < 6) nuevoCodigo[i] = valor;
    });
    setCodigo(nuevoCodigo);
    
    const siguienteIndice = Math.min(datosPegados.length, 5);
    entradasRef.current[siguienteIndice].focus();
  };

  const manejarVerificacion = () => {
    const codigoCompleto = codigo.join('');
    if (codigoCompleto.length < 6) {
      setError('Por favor, ingresa el código completo de 6 dígitos');
      return;
    }
    
    setCargando(true);
    setError(null);
    
    setTimeout(() => {
      if (codigoCompleto === '123456') {
        alCompletar({ id: 'prov-001', nombre: 'EcoPack Solutions', correo });
      } else {
        setCargando(false);
        setError('El código ingresado es incorrecto');
        setCodigo(['', '', '', '', '', '']);
        entradasRef.current[0].focus();
      }
    }, 1200);
  };

  const reeenviarCodigo = () => {
    setCargando(true);
    setError(null);
    setTimeout(() => {
      setCargando(false);
      setTiempoRestante(300);
      setCodigo(['', '', '', '', '', '']);
      entradasRef.current[0].focus();
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
      <div className="max-w-[420px] w-full superficie-tarjeta rounded-lg-token p-8">
        <div className="w-10 h-10 rounded-md-token bg-plataformaAzul/[0.08] text-plataformaAzul flex items-center justify-center mx-auto mb-5">
          <ShieldCheck className="w-5 h-5" />
        </div>
        
        <h2 className="text-titulo-seccion text-center">
          {paso === 'correo' ? 'Acceso Proveedores' : 'Verificación de Identidad'}
        </h2>
        
        <p className="text-cuerpo-pequeno text-plataformaSecundario text-center mt-2 mb-8">
          {paso === 'correo' 
            ? 'Ingresa tu correo institucional para recibir un código de acceso único.'
            : `Hemos enviado un código de 6 dígitos a ${correo}`
          }
        </p>

        {error && (
          <div className="rounded-md-token bg-red-50 border border-red-200/60 p-3 flex items-center gap-2 text-cuerpo-pequeno text-red-700 mb-6">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {paso === 'correo' ? (
          <form onSubmit={manejarEnvioCorreo}>
            <div className="mb-6">
              <label className="text-etiqueta text-plataformaSecundario mb-2 block">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-plataformaSecundario absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  className="campo-entrada campo-entrada-icono w-full"
                  placeholder="ejemplo@empresa.com"
                  autoFocus
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="boton-primario w-full flex items-center justify-center gap-2"
              disabled={cargando}
            >
              {cargando ? 'Enviando...' : 'Continuar'}
              {!cargando && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-etiqueta text-plataformaSecundario">
                Código de seguridad
              </label>
              <span className={`px-2 py-0.5 text-xs font-mono font-medium rounded-full ${tiempoRestante < 60 ? 'insignia-peligro' : 'insignia-neutra'}`}>
                {formatearTiempo(tiempoRestante)}
              </span>
            </div>
            
            <div className="flex justify-between gap-2 mb-6" onPaste={manejarPegado}>
              {codigo.map((digito, indice) => (
                <input
                  key={indice}
                  ref={(el) => (entradasRef.current[indice] = el)}
                  type="text"
                  maxLength={1}
                  value={digito}
                  onChange={(e) => manejarCambioCodigo(indice, e.target.value)}
                  onKeyDown={(e) => manejarTeclaPresionada(indice, e)}
                  className="w-11 h-14 text-center text-xl font-semibold bg-black/[0.025] border border-black/[0.08] rounded-md-token focus:bg-white focus:border-plataformaAzul focus:shadow-[0_0_0_3px_rgba(0,113,227,0.12)] transition-all duration-180"
                  disabled={tiempoRestante === 0 || cargando}
                />
              ))}
            </div>
            
            <div className="flex justify-center mb-8">
              <button 
                type="button"
                onClick={() => setCodigo(['1', '2', '3', '4', '5', '6'])}
                className="text-subtexto text-plataformaAzul hover:underline cursor-pointer"
              >
                Usar código de prueba (123456)
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={manejarVerificacion}
                className="boton-primario w-full"
                disabled={cargando || tiempoRestante === 0}
              >
                {cargando ? 'Verificando...' : 'Verificar e Ingresar'}
              </button>
              
              <button 
                onClick={reeenviarCodigo}
                className="boton-secundario w-full flex items-center justify-center gap-2"
                disabled={cargando || tiempoRestante > 240}
              >
                <RefreshCw className="w-4 h-4" />
                Reenviar código
              </button>
            </div>
          </div>
        )}
        
        <p className="text-subtexto text-plataformaSecundario text-center mt-4">
          Sistema de acceso seguro con autenticación temporal
        </p>
      </div>
    </div>
  );
};

export default AccesoOtp;
