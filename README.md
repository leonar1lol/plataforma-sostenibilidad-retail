# Plataforma de Evaluación de Sostenibilidad de Proveedores - Intercorp Retail

Proyecto desarrollado para el curso **Curso Integrador II. Sistemas** en la **Universidad Tecnológica del Perú (UTP)**, ciclo 2026.

## 👥 Integrantes

* **Leonardo Raul Solano Pio Huaman** (U22210128)
* **Carloman Coronel Cruz** (U22234047)
* **Carlos Juniors Chiroque Silva** (U21322900)
* **Frank Alex Beltran Ponce** (U22238182)
* **Gianfranco Daniel Navarro Flores** (U21304958)

**Docente:** Denny John Fuentes Adrianzen

---

## 📌 Descripción

Este sistema web permite centralizar y automatizar el proceso de evaluación de sostenibilidad (criterios ambientales, sociales y de gobernanza - ESG) para los proveedores de las empresas del grupo Intercorp Retail:

* Supermercados Peruanos (Plaza Vea, Vivanda)
* Promart Homecenter
* Oechsle
* Real Plaza
* InRetail Pharma (Inkafarma, Mifarma)
* Financiera Oh!
* Makro Supermayorista

La plataforma cuenta con dos accesos:
1. **Portal del Proveedor:** Registro societario, autenticación por código OTP y llenado del cuestionario con carga de evidencias documentales y cálculo de puntaje.
2. **Portal Corporativo (Administrador):** Dashboard con indicadores clave, gestión y filtro de proveedores por estado y nivel de riesgo, mantenimiento de preguntas por dimensión y exportación de reportes a Excel.

---

## 🛠️ Tecnologías

* **Frontend:** React 18, Vite, Tailwind CSS, Lucide React
* **Backend:** Node.js, Express, PostgreSQL (`pg`)
* **Base de datos:** PostgreSQL en la nube (Neon)

---

## 🚀 Instalación y Ejecución

### Prerrequisitos
* Node.js v18 o superior
* npm

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd plataforma-sostenibilidad-retail
```

### 2. Instalar dependencias
```bash
npm install
npm --prefix cliente install
npm --prefix servidor install
```

### 3. Iniciar el sistema

* **Para iniciar el Frontend (Cliente):**
```bash
npm run cliente:desarrollo
```
Abre en tu navegador: `http://localhost:5173`

* **Para iniciar el Backend (Servidor):** *(Opcional si se conecta a la base de datos)*
```bash
# Copiar las variables de entorno de ejemplo y colocar la URL de conexion si se tiene
copy servidor\.env.ejemplo servidor\.env

npm run servidor:desarrollo
```
El servidor API corre en: `http://localhost:4000`

> **Nota:** La aplicación frontend cuenta con datos precargados para que cualquier evaluador pueda navegar y probar todas las vistas y funciones inmediatamente sin necesidad de configurar una base de datos local.

---

## 🔑 Credenciales de Prueba

* **Portal Corporativo (Administrador):**
  * Correo: `admin@intercorpretail.pe`
  * Contraseña: Cualquier contraseña (ejemplo: `Admin2026`)
* **Portal del Proveedor:**
  * Correo: `contacto@agroindustria.pe`
  * Código OTP: `123456`
  * RUC: `20100047218`

---

## 📁 Estructura del Proyecto

* `cliente/`: Aplicación frontend en React (vistas del portal de proveedores, dashboard corporativo, componentes y estilos).
* `servidor/`: API REST en Node.js y Express (rutas, controladores y conexión a PostgreSQL).
* `base-datos/`: Scripts SQL con el esquema inicial de las tablas de la base de datos.
