import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Building2, AlertCircle, CheckCircle2 } from 'lucide-react';
import TarjetaBento from '../../componentes/TarjetaBento.jsx';

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
    <div className="max-w-[460px] mx-auto py-16 px-4">
      <TarjetaBento clasePersonalizada="p-8 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-[18px] bg-plataformaCorporativo text-white flex items-center justify-center mx-auto mb-5 shadow-xs font-bold text-lg">
            IR
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-plataformaSecundario block mb-1.5">
            Portal Administrativo
          </span>
          <h2 className="text-[28px] font-semibold tracking-[-0.03em] text-plataformaTexto leading-tight mb-2">
            Inicio de sesión corporativo
          </h2>
          <p className="text-[13px] text-plataformaSecundario leading-relaxed max-w-xs mx-auto">
            Acceso restringido para personal del Corporativo y de las unidades de negocio de Intercorp Retail.
          </p>
        </div>

        {mensajeRecuperacion && (
          <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200/60 rounded-[14px] flex items-center gap-2.5 text-xs text-emerald-800">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{mensajeRecuperacion}</span>
          </div>
        )}

        <form onSubmit={manejarEnvio} className="space-y-5">
          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-plataformaSecundario mb-1.5">
              Correo corporativo
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-plataformaSecundario absolute left-3.5 top-3.5 stroke-[1.7]" />
              <input
                type="email"
                required
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="usuario@intercorpretail.pe"
                className="w-full pl-10 pr-4 py-3 bg-black/[0.025] border border-black/[0.06] rounded-[14px] text-sm text-plataformaTexto placeholder:text-[#A1A1A6] focus:outline-none focus:bg-white focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-medium uppercase tracking-wider text-plataformaSecundario mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-plataformaSecundario absolute left-3.5 top-3.5 stroke-[1.7]" />
              <input
                type="password"
                required
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/[0.025] border border-black/[0.06] rounded-[14px] text-sm text-plataformaTexto focus:outline-none focus:bg-white focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/10 transition-all duration-200"
              />
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
              className="w-full py-3.5 boton-pildora-primario text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>{cargando ? 'Ingresando...' : 'Ingresar'}</span>
              <ArrowRight className="w-4 h-4 stroke-[2]" />
            </button>

            <button
              type="button"
              onClick={recuperarClave}
              className="w-full py-2.5 text-xs text-plataformaSecundario hover:text-plataformaTexto font-medium transition-colors cursor-pointer"
            >
              Recuperar contraseña
            </button>
          </div>

          <p className="text-[11px] text-center text-plataformaSecundario leading-normal pt-2 border-t border-black/[0.04]">
            El perfil del usuario determina la unidad de negocio y los permisos disponibles (Pantalla 1).
          </p>
        </form>
      </TarjetaBento>
    </div>
  );
}
