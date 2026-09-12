import React from 'react';

export default function BarraProgreso({ porcentaje, color = 'bg-plataformaAzul', altura = 'h-1.5' }) {
  const valorSeguro = Math.min(Math.max(porcentaje || 0, 0), 100);

  return (
    <div className={`w-full bg-black/[0.06] rounded-full overflow-hidden ${altura}`}>
      <div
        className={`h-full ${color} rounded-full transition-all duration-500 ease-out`}
        style={{ width: `${valorSeguro}%` }}
      />
    </div>
  );
}
