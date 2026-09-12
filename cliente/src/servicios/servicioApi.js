const URL_BASE_API = 'http://localhost:4000/api';

export async function consultarProveedoresApi() {
  try {
    const respuesta = await fetch(`${URL_BASE_API}/proveedores`);
    if (!respuesta.ok) return null;
    const datos = await respuesta.json();
    return datos.exito ? datos.proveedores : null;
  } catch {
    return null;
  }
}

export async function registrarProveedorApi(datosProveedor) {
  try {
    const respuesta = await fetch(`${URL_BASE_API}/proveedores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosProveedor)
    });
    if (!respuesta.ok) return null;
    const datos = await respuesta.json();
    return datos.exito ? datos.proveedor : null;
  } catch {
    return null;
  }
}

export async function verificarSaludApi() {
  try {
    const respuesta = await fetch(`${URL_BASE_API}/salud`);
    return respuesta.ok;
  } catch {
    return false;
  }
}
