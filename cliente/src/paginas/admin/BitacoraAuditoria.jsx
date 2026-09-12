import React, { useState } from 'react';
import {
  History,
  Search,
  Filter,
  ShieldCheck,
  Download,
  Clock,
  User,
  Activity
} from 'lucide-react';

export default function BitacoraAuditoria({ registrosAuditoria }) {
  const [busqueda, setBusqueda] = useState('');
  const [moduloFiltro, setModuloFiltro] = useState('todos');

  const registrosFiltrados = registrosAuditoria.filter((r) => {
    const coincideTexto =
      r.usuario.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.accion.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.detalles.toLowerCase().includes(busqueda.toLowerCase());
    const coincideModulo = moduloFiltro === 'todos' || r.modulo === moduloFiltro;
    return coincideTexto && coincideModulo;
  });

  const exportarAuditoria = () => {
    const encabezados = ['ID', 'Fecha y Hora', 'Usuario', 'Rol', 'Módulo', 'Acción', 'Detalles', 'Estado'];
    const filas = registrosFiltrados.map((r) => [
      r.id,
      `"${r.fechaHora}"`,
      `"${r.usuario}"`,
      `"${r.rol}"`,
      `"${r.modulo}"`,
      `"${r.accion}"`,
      `"${r.detalles}"`,
      `"${r.estado}"`
    ]);

    const contenido = '\uFEFF' + [encabezados.join(';'), ...filas.map((f) => f.join(';'))].join('\r\n');
    const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' });
    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(blob);
    enlace.download = `Bitacora_Auditoria_Intercorp_${new Date().toISOString().slice(0, 10)}.csv`;
    enlace.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-etiqueta text-plataformaSecundario block mb-1">
            Trazabilidad y Seguridad (RF16 • RNF08)
          </span>
          <h2 className="text-titulo-seccion">
            Registro de Auditoría del Sistema
          </h2>
          <p className="text-cuerpo-pequeno text-plataformaSecundario mt-0.5">
            Bitácora inmutable de operaciones, autenticaciones, evaluaciones y cambios paramétricos.
          </p>
        </div>

        <button
          onClick={exportarAuditoria}
          className="boton-secundario flex items-center gap-1.5"
        >
          <Download className="w-4 h-4" />
          <span>Exportar bitácora ({registrosFiltrados.length})</span>
        </button>
      </div>

      <div className="superficie-tarjeta rounded-lg-token p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 text-plataformaSecundario absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por usuario, acción o detalle..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="campo-entrada campo-entrada-icono w-full"
            />
          </div>

          <div>
            <select
              value={moduloFiltro}
              onChange={(e) => setModuloFiltro(e.target.value)}
              className="campo-select w-full"
            >
              <option value="todos">Todos los módulos</option>
              <option value="Autenticación">Autenticación</option>
              <option value="Portal del Proveedor">Portal del Proveedor</option>
              <option value="Evaluación Dinámica">Evaluación Dinámica</option>
              <option value="Directorio">Directorio</option>
              <option value="Banco de Preguntas">Banco de Preguntas</option>
              <option value="Seguridad y Roles">Seguridad y Roles</option>
              <option value="Configuración Paramétrica">Configuración Paramétrica</option>
            </select>
          </div>
        </div>
      </div>

      <div className="superficie-tarjeta rounded-lg-token overflow-hidden">
        <div className="overflow-x-auto">
          <table className="tabla-premium w-full text-left">
            <thead>
              <tr>
                <th>Marca Temporal</th>
                <th>Usuario</th>
                <th>Módulo</th>
                <th>Acción Realizada</th>
                <th>Detalles Operativos</th>
                <th className="text-center">Estado</th>
              </tr>
            </thead>
            <tbody>
              {registrosFiltrados.map((item) => (
                <tr key={item.id}>
                  <td className="py-3.5 px-4 font-mono text-subtexto text-plataformaSecundario whitespace-nowrap">
                    {item.fechaHora}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-cuerpo-pequeno font-medium text-plataformaTexto block">
                      {item.usuario}
                    </span>
                    <span className="text-subtexto text-plataformaSecundario block">
                      {item.rol}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="insignia-neutra">
                      {item.modulo}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-cuerpo-pequeno font-medium text-plataformaTexto">
                    {item.accion}
                  </td>
                  <td className="py-3.5 px-4 text-subtexto text-plataformaSecundario">
                    {item.detalles}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="insignia-exito">
                      {item.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
