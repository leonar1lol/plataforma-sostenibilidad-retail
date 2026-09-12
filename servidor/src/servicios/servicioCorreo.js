export const enviarCodigoAccesoOtp = async (correoDestinatario, codigoGenerado) => {
  if (process.env.CLAVE_API_RESEND) {
    const respuestaServicio = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CLAVE_API_RESEND}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Intercorp Retail Sostenibilidad <notificaciones@intercorpretail.pe>',
        to: [correoDestinatario],
        subject: 'Código de acceso - Evaluación de Sostenibilidad',
        html: `<h2>Código de Verificación</h2><p>Su código de acceso de un solo uso es: <strong>${codigoGenerado}</strong></p><p>Este código expira en 10 minutos.</p>`
      })
    });
    return respuestaServicio.ok;
  }
  return true;
};

export const enviarReporteResultados = async (correoDestinatario, razonSocial, puntajeTotal, recomendaciones) => {
  if (process.env.CLAVE_API_RESEND) {
    const listaRecomendacionesHtml = recomendaciones
      .map((item) => `<li>${item.texto}</li>`)
      .join('');

    const respuestaServicio = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CLAVE_API_RESEND}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Intercorp Retail Sostenibilidad <notificaciones@intercorpretail.pe>',
        to: [correoDestinatario],
        subject: `Resultados Evaluación de Sostenibilidad - ${razonSocial}`,
        html: `<h2>Evaluación de Sostenibilidad</h2><p>Estimado proveedor <strong>${razonSocial}</strong>,</p><p>Su puntaje global alcanzado es de <strong>${puntajeTotal} / 100</strong>.</p><h3>Recomendaciones de mejora:</h3><ul>${listaRecomendacionesHtml}</ul>`
      })
    });
    return respuestaServicio.ok;
  }
  return true;
};
