export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        plataformaFondo: '#F5F5F7',
        plataformaTexto: '#1D1D1F',
        plataformaSecundario: '#86868B',
        plataformaBorde: '#E5E5EA',
        plataformaAzul: '#0071E3',
        plataformaCorporativo: '#003882',
        plataformaExito: '#34C759',
        plataformaAdvertencia: '#FF9500'
      },
      fontFamily: {
        sans: [
          'system-ui',
          'BlinkMacSystemFont',
          '"SF Pro Text"',
          '"Inter"',
          'sans-serif'
        ]
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px'
      },
      boxShadow: {
        'suave': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'elevada': '0 12px 32px rgba(0, 0, 0, 0.08)'
      }
    }
  },
  plugins: []
};
