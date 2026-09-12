import React from 'react';
import { LayoutDashboard, UserCheck, LogOut } from 'lucide-react';

const CabeceraNavegacion = ({ entornoActual, alCambiarEntorno, sesionCorporativa, alCerrarSesionCorporativa }) => {
  return (
    <header className="superficie-cristal sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md-token bg-plataformaCorporativo flex items-center justify-center text-white text-xs font-semibold">
            RC
          </div>
          <span className="text-cuerpo font-semibold text-plataformaTexto">
            Retail Connect
          </span>
        </div>

        <div className="flex items-center bg-black/[0.04] p-0.5 rounded-full">
          <button
            onClick={() => alCambiarEntorno('portal')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all duration-200 ${
              entornoActual === 'portal'
                ? 'bg-white shadow-xs-token text-plataformaTexto'
                : 'text-plataformaSecundario hover:text-plataformaTexto'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span className="text-etiqueta font-medium">Portal Proveedores</span>
          </button>
          
          <button
            onClick={() => alCambiarEntorno('corporativo')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all duration-200 ${
              entornoActual === 'corporativo'
                ? 'bg-white shadow-xs-token text-plataformaTexto'
                : 'text-plataformaSecundario hover:text-plataformaTexto'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="text-etiqueta font-medium">Panel Corporativo</span>
          </button>
        </div>

        <div className="flex items-center">
          {entornoActual === 'corporativo' && sesionCorporativa ? (
            <div className="flex items-center gap-4">
              <div className="h-4 w-px bg-black/[0.08]"></div>
              <div className="flex flex-col items-end">
                <span className="text-etiqueta font-medium text-plataformaTexto">{sesionCorporativa.nombre}</span>
                <span className="text-subtexto text-plataformaSecundario">{sesionCorporativa.rol}</span>
              </div>
              <button 
                onClick={alCerrarSesionCorporativa}
                className="p-2 rounded-full hover:bg-black/[0.04] text-plataformaSecundario hover:text-plataformaTexto transition-colors"
                title="Cerrar sesión"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="w-8"></div>
          )}
        </div>
      </div>
    </header>
  );
};

export default CabeceraNavegacion;
