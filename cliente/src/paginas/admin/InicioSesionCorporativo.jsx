import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Building2, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function InicioSesionCorporativo({ alIniciarSesion }) {
  const [correo, setCorreo] = useState('sostenibilidad@intercorpretail.pe');
  const [clave, setClave] = useState('••••••••••••');
  const [cargando, setCargando] = useState(false);
  const [mensajeError, setMensajeError] = useState('');
  const [mensajeRecuperacion, setMensajeRecuperacion] = useState('');

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    if (!correo.endsWith('@intercorpretail.pe') && !correo.includes('@')) {
      setMensajeError('Debe ingresar un correo corporativo válido (@intercorpretail.pe).');
      return;
    }

    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      alIniciarSesion({
        nombre: 'Leonardo Solano',
        rol: 'Administrador Corporativo',
        correo,
        unidad: 'Corporativo Central'
      });
    }, 400);
  };

  const recuperarClave = () => {
    setMensajeRecuperacion('Instrucciones de restablecimiento enviadas a su buzón corporativo.');
    setTimeout(() => setMensajeRecuperacion(''), 3500);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
      <div className="max-w-[420px] w-full superficie-tarjeta rounded-lg-token p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-md-token bg-plataformaCorporativo text-white flex items-center justify-center mx-auto mb-5 text-lg font-bold">
            IR
          </div>
          <h2 className="text-titulo-seccion text-center">
            Inicio de sesión corporativo
          </h2>
          <p className="text-cuerpo-pequeno text-plataformaSecundario text-center mt-2 mb-8">
            Acceso restringido para personal del Corporativo y de las unidades de negocio de Intercorp Retail.
          </p>
        </div>

        {mensajeRecuperacion && (
          <div className="mb-5 rounded-md-token bg-emerald-50 border border-emerald-200/60 p-3 flex items-center gap-2.5 text-xs text-emerald-800">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{mensajeRecuperacion}</span>
          </div>
        )}

        <form onSubmit={manejarEnvio} className="space-y-5">
          <div>
            <label className="text-etiqueta text-plataformaSecundario mb-2 block">
              Correo corporativo
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-plataformaSecundario absolute left-3 top-1/2 -translate-y-1/2 stroke-[1.7]" />
              <input
                type="email"
                required
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="usuario@intercorpretail.pe"
                className="campo-entrada campo-entrada-icono w-full"
              />
            </div>
          </div>

          <div>
            <label className="text-etiqueta text-plataformaSecundario mb-2 block">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-plataformaSecundario absolute left-3 top-1/2 -translate-y-1/2 stroke-[1.7]" />
              <input
                type="password"
                required
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                className="campo-entrada campo-entrada-icono w-full"
              />
            </div>
          </div>

          {mensajeError && (
            <div className="rounded-md-token bg-red-50 border border-red-200/60 p-3 flex items-center gap-2.5 text-xs text-red-700">
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
              <span>{cargando ? 'Ingresando...' : 'Ingresar'}</span>
              <ArrowRight className="w-4 h-4 stroke-[2]" />
            </button>

            <button
              type="button"
              onClick={recuperarClave}
              className="boton-fantasma w-full"
            >
              Recuperar contraseña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
