import React from 'react';

export default function TarjetaBento({ children, clasePersonalizada = '', alHacerClic }) {
  return (
    <div
      onClick={alHacerClic}
      className={`tarjeta-bento-superficie rounded-[28px] p-7 transition-all duration-300 ${clasePersonalizada}`}
    >
      {children}
    </div>
  );
}
