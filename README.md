# Plataforma Centralizada de Evaluaciones de Sostenibilidad de Proveedores de Intercorp Retail

**Universidad Tecnológica del Perú (UTP)**  
**Facultad de Ingeniería - Ingeniería de Sistemas**  
**Curso:** Curso Integrador II. Sistemas  
**Año:** 2026  

---

## 👥 Equipo de Desarrollo e Ingeniería

| Estudiante | Código UTP | Rol en el Proyecto |
| :--- | :--- | :--- |
| **Leonardo Raul Solano Pio Huaman** | U22210128 | Jefe de proyecto y arquitecto |
| **Carloman Coronel Cruz** | U22234047 | Analista funcional |
| **Carlos Juniors Chiroque Silva** | U21322900 | Desarrollador backend |
| **Frank Alex Beltran Ponce** | U22238182 | Desarrollador frontend |
| **Gianfranco Daniel Navarro Flores** | U21304958 | Calidad y despliegue |

**Docente:** Denny John Fuentes Adrianzen  

---

## 📌 Descripción del Proyecto
Plataforma web centralizada orientada a sustituir la circulación y consolidación manual de archivos Excel por un entorno automatizado para la evaluación, calificación y retroalimentación de la sostenibilidad de proveedores de las siete unidades de negocio de Intercorp Retail:
- Supermercados Peruanos
- Promart
- Oechsle
- Real Plaza
- Farmacias Peruanas
- SIP
- Intercorp Retail Sucursal China

---

## 🏗️ Arquitectura Tecnológica
* **Frontend:** React + Vite (Despliegue: Cloudflare Pages)
* **Backend:** API REST en contenedor sin servidor (Google Cloud Run)
* **Base de Datos:** Neon PostgreSQL
* **Almacenamiento de Evidencias:** Cloudflare R2
* **Notificaciones transaccionales:** Resend

---

## 🌿 Flujo de Trabajo con Git y GitHub
Para trabajar de forma colaborativa sin pisar el trabajo de los compañeros:

1. **Actualizar la rama principal:**
   ```bash
   git checkout main
   git pull origin main
   ```
2. **Crear una rama para tu tarea:**
   ```bash
   git checkout -b feature/nombre-tarea
   ```
3. **Guardar cambios y subir:**
   ```bash
   git add .
   git commit -m "feat: detalle de los cambios"
   git push -u origin feature/nombre-tarea
   ```
4. **Abrir Pull Request en GitHub** para revisión y mezcla a `main`.
