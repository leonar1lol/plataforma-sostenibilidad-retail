export const exportarProveedoresAExcel = (proveedores) => {
  const encabezados = [
    'RUC',
    'Razón Social',
    'Representante',
    'Correo',
    'Unidad de Negocio',
    'Industria',
    'Crítico',
    'Estado',
    'Puntaje General',
    'Ambiental',
    'Social',
    'Ética y Gobernanza',
    'Laboral',
    'Fecha Evaluación'
  ];

  const filas = proveedores.map((prov) => [
    `"${prov.ruc}"`,
    `"${prov.razonSocial}"`,
    `"${prov.representante}"`,
    `"${prov.correo}"`,
    `"${prov.unidad}"`,
    `"${prov.industria}"`,
    prov.esCritico ? '"SÍ"' : '"NO"',
    `"${prov.estado}"`,
    prov.puntajeTotal !== null ? prov.puntajeTotal : '""',
    prov.dimensiones ? prov.dimensiones.ambiental : '""',
    prov.dimensiones ? prov.dimensiones.social : '""',
    prov.dimensiones ? prov.dimensiones.etica : '""',
    prov.dimensiones ? prov.dimensiones.laboral : '""',
    `"${prov.fechaEvaluacion || '-'}"`
  ]);

  const contenidoCsv = '\uFEFF' + [
    encabezados.join(';'),
    ...filas.map((fila) => fila.join(';'))
  ].join('\r\n');

  const archivoBlob = new Blob([contenidoCsv], { type: 'text/csv;charset=utf-8;' });
  const enlaceDescarga = document.createElement('a');
  const urlBlob = URL.createObjectURL(archivoBlob);

  enlaceDescarga.setAttribute('href', urlBlob);
  enlaceDescarga.setAttribute('download', `Reporte_Proveedores_Sostenibilidad_Intercorp_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(enlaceDescarga);
  enlaceDescarga.click();
  document.body.removeChild(enlaceDescarga);
};
