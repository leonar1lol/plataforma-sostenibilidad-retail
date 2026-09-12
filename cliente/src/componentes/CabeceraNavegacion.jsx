import React from 'react';
import { LayoutDashboard, UserCheck, LogOut, Shield } from 'lucide-react';

export default function CabeceraNavegacion({
  entornoActual,
  alCambiarEntorno,
  sesionCorporativa,
  alCerrarSesionCorporativa
}) {
  return (
    <header className="sticky top-0 z-50 w-full superficie-cristal">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-[10px] bg-plataformaCorporativo flex items-center justify-center text-white font-semibold text-xs tracking-wider shadow-sm">
            IR
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-semibold tracking-[-0.01em] text-plataformaTexto leading-tight">
                Intercorp Retail
              </span>
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                entornoActual === 'corporativo'
                  ? 'bg-blue-500/10 text-[#0071E3]'
                  : 'bg-emerald-500/10 text-emerald-700'
              }`}>
                {entornoActual === 'corporativo' ? 'Acceso Interno' : 'Portal Externo'}
              </span>
            </div>
            <span className="text-[11px] text-plataformaSecundario tracking-normal block leading-tight">
              {entornoActual === 'corporativo'
                ? 'Consola Corporativa de Sostenibilidad'
                : 'Portal del Proveedor de la Cadena de Valor'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <nav className="flex items-center bg-[#E5E5EA]/60 p-1 rounded-full backdrop-blur-md border border-black/[0.03]">
            <button
              onClick={() => alCambiarEntorno('proveedor')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition-all duration-200 cursor-pointer ${
                entornoActual === 'proveedor'
                  ? 'bg-white text-plataformaTexto font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.1)]'
                  : 'text-plataformaSecundario hover:text-plataformaTexto font-medium'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Portal Proveedor</span>
            </button>
            <button
              onClick={() => alCambiarEntorno('corporativo')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition-all duration-200 cursor-pointer ${
                entornoActual === 'corporativo'
                  ? 'bg-white text-plataformaTexto font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.1)]'
                  : 'text-plataformaSecundario hover:text-plataformaTexto font-medium'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Corporativo</span>
            </button>
          </nav>

          {entornoActual === 'corporativo' && sesionCorporativa && (
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-black/[0.06]">
              <div className="text-right">
                <span className="text-xs font-semibold text-plataformaTexto block leading-tight">
                  {sesionCorporativa.nombre}
                </span>
                <span className="text-[10px] text-plataformaSecundario block leading-tight">
                  {sesionCorporativa.rol}
                </span>
              </div>
              <button
                onClick={alCerrarSesionCorporativa}
                title="Cerrar sesión"
                className="p-2 hover:bg-black/[0.04] rounded-full text-plataformaSecundario hover:text-red-600 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4 stroke-[1.8]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
