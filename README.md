# Plataforma Centralizada de Evaluaciones de Sostenibilidad de Proveedores de Intercorp Retail

**Universidad Tecnológica del Perú (UTP)**  
**Facultad de Ingeniería - Carrera de Ingeniería de Sistemas e Informática**  
**Asignatura:** Curso Integrador II. Sistemas  
**Ciclo:** 2026  

---

## 👥 Equipo de Desarrollo e Ingeniería

| Estudiante | Código UTP | Rol en el Proyecto |
| :--- | :--- | :--- |
| **Leonardo Raul Solano Pio Huaman** | U22210128 | Jefe de proyecto y arquitecto de software |
| **Carloman Coronel Cruz** | U22234047 | Analista funcional y modelador de procesos |
| **Carlos Juniors Chiroque Silva** | U21322900 | Desarrollador backend y base de datos |
| **Frank Alex Beltran Ponce** | U22238182 | Desarrollador frontend y experiencia de usuario |
| **Gianfranco Daniel Navarro Flores** | U21304958 | Ingeniero de calidad, pruebas y despliegue |

**Docente:** Denny John Fuentes Adrianzen  

---

## 📌 Descripción del Proyecto

Solución tecnológica corporativa orientada a sustituir la circulación y consolidación manual de hojas de cálculo por un entorno web integral, seguro y automatizado para la evaluación, calificación algorítmica y retroalimentación de la sostenibilidad de los proveedores de las **siete unidades de negocio de Intercorp Retail**:

1. Supermercados Peruanos (Plaza Vea, Vivanda)
2. Promart Homecenter
3. Oechsle
4. Real Plaza
5. InRetail Pharma (Inkafarma, Mifarma)
6. Financiera Oh!
7. Makro Supermayorista

---

## 🏗️ Arquitectura de la Solución

* **Frontend SPA:** React 18, Tailwind CSS, Framer Motion, Lucide Icons, Vite.
* **Backend REST API:** Node.js, Express, PostgreSQL Pool (`pg`).
* **Base de Datos Relacional:** PostgreSQL normalizado en 19 tablas (Sección 5.5).
* **Seguridad y Privacidad:** OTP de 6 dígitos con expiración de 10 min (RNF02) y consentimiento expreso según Ley N° 29733 (RNF03).
* **Diseño y Experiencia:** Glassmorfismo (`backdrop-blur-2xl`), paleta neutra sobria (#F5F5F7, #1D1D1F) con azul corporativo (#0071E3), curvatura continua de 28px y Bento Grid interactivo.

---

## 📋 Matriz de Cumplimiento de Requerimientos (100%)

### Requerimientos Funcionales (RF01 a RF16)
| Código | Requerimiento Funcional | Estado | Módulo / Componente |
| :--- | :--- | :---: | :--- |
| **RF01** | Autenticación de un solo uso (OTP) por correo institucional | 100% | `AccesoOtp.jsx`, `servicioCorreo.js` |
| **RF02** | Gestión de usuarios y perfiles de rol corporativo (RBAC) | 100% | `GestionUsuariosRoles.jsx` |
| **RF03** | Configuración de unidades de negocio e industrias con umbrales | 100% | `ConfiguracionUnidadesIndustrias.jsx` |
| **RF04** | Registro y actualización del perfil societario del proveedor | 100% | `RegistroProveedor.jsx` |
| **RF05** | Formulación y mantenimiento del banco central de preguntas ESG | 100% | `BancoPreguntas.jsx` |
| **RF06** | Autoevaluación guiada dinámica con ramificación condicional | 100% | `CuestionarioDinamico.jsx` |
| **RF07** | Carga y verificación de evidencias documentales (PDF/JPG/PNG) | 100% | `CuestionarioDinamico.jsx` |
| **RF08** | Algoritmo automatizado de calificación ponderada y categorización | 100% | `servicioCalificacion.js` |
| **RF09** | Reporte ejecutivo con desglose multidimensional en Bento Grid | 100% | `ResultadoBento.jsx` |
| **RF10** | Dashboard analítico corporativo con filtrado en cascada | 100% | `DashboardCorporativo.jsx` |
| **RF11** | Directorio maestro de proveedores con búsqueda instantánea | 100% | `GestionProveedores.jsx` |
| **RF12** | Identificación y alerta de proveedores con riesgo crítico (<50 pts) | 100% | `GestionProveedores.jsx` |
| **RF13** | Exportación de datos analíticos a formato Excel (.csv UTF-8 BOM) | 100% | `exportadorExcel.js` |
| **RF14** | Despacho de notificaciones automáticas por correo electrónico | 100% | `servicioCorreo.js` |
| **RF15** | Recomendaciones y oportunidades de mejora automáticas | 100% | `ResultadoBento.jsx` |
| **RF16** | Bitácora cronológica inmutable de auditoría y trazabilidad | 100% | `BitacoraAuditoria.jsx` |

### Requerimientos No Funcionales (RNF01 a RNF11)
* **RNF01 (Rendimiento):** Tiempos de respuesta menores a 200 ms en frontend reactivo y bundle comprimido.
* **RNF02 (Seguridad OTP):** Clave numérica de 6 dígitos, ventana de validez de 10:00 minutos y revocación inmediata post-uso.
* **RNF03 (Protección de Datos):** Cláusula de consentimiento expreso conforme a la Ley Peruana N° 29733.
* **RNF04 (Disponibilidad):** Arquitectura cliente-servidor desacoplada lista para entornos serverless y contenedores.
* **RNF05 (Usabilidad y Estética):** Glassmorfismo, Bento Grid y microinteracciones fluidas con Framer Motion.
* **RNF06 (Escalabilidad Modular):** Estructura desacoplada en controladores, rutas, servicios y componentes.
* **RNF07 (Responsividad):** Diseño adaptativo compatible con pantallas de escritorio y tabletas.
* **RNF08 (Trazabilidad y Auditoría):** Módulo de bitácora con registro de IP, fecha, hora, usuario, módulo y acción.
* **RNF09 (Integridad de Datos):** Esquema relacional DDL de 19 tablas normalizadas con restricciones e integridad referencial.
* **RNF10 (Accesibilidad e Idioma):** Interfaz completa en español y contrastes óptimos.
* **RNF11 (Mantenibilidad y Código Limpio):** Nomenclatura semántica en español y cero comentarios en el código fuente.

---

## 🚀 Guía de Instalación y Ejecución Local

### Prerrequisitos
* Node.js v18 o superior.
* Gestor de paquetes npm v9 o superior.

### 1. Instalación de Dependencias
```bash
npm install
npm --prefix cliente install
npm --prefix servidor install
```

### 2. Ejecución en Modo Desarrollo
* **Frontend:**
  ```bash
  npm run cliente:desarrollo
  ```
  Acceso en: `http://localhost:5173/`

* **Backend:**
  ```bash
  npm run servidor:desarrollo
  ```
  Acceso API en: `http://localhost:4000/api/salud`

### 3. Compilación para Producción
```bash
npm run cliente:construir
```

---

## 🔑 Credenciales y Datos de Demostración para Evaluación

* **Portal Corporativo:**
  * Usuario: `admin@intercorpretail.pe`
  * Contraseña: Cualquier contraseña de acceso corporativo (ej. `Admin2026*`).
* **Portal del Proveedor:**
  * Correo: `contacto@agroindustria.pe`
  * Código OTP: `123456`
  * RUC de ejemplo: `20100047218`

---

## 🌿 Flujo Colaborativo de Ramas (Git Workflow)

1. Actualizar rama principal:
   ```bash
   git checkout main
   git pull origin main
   ```
2. Crear rama para nueva funcionalidad:
   ```bash
   git checkout -b feature/nombre-modulo
   ```
3. Confirmar cambios y enviar a GitHub:
   ```bash
   git add .
   git commit -m "feat: descripcion concisa del cambio"
   git push -u origin feature/nombre-modulo
   ```
