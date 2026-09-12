CREATE TABLE IF NOT EXISTS rol (
    id_rol SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS permiso (
    id_permiso SERIAL PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS rol_permiso (
    fk_id_rol INT NOT NULL REFERENCES rol(id_rol) ON DELETE CASCADE,
    fk_id_permiso INT NOT NULL REFERENCES permiso(id_permiso) ON DELETE CASCADE,
    PRIMARY KEY (fk_id_rol, fk_id_permiso)
);

CREATE TABLE IF NOT EXISTS unidad_negocio (
    id_unidad SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    gerente VARCHAR(150) NOT NULL
);

CREATE TABLE IF NOT EXISTS usuario (
    id_usuario SERIAL PRIMARY KEY,
    correo VARCHAR(150) NOT NULL UNIQUE,
    nombre VARCHAR(150) NOT NULL,
    clave_hash VARCHAR(255) NOT NULL,
    estado BOOLEAN NOT NULL DEFAULT TRUE,
    fk_id_rol INT NOT NULL REFERENCES rol(id_rol),
    fk_id_unidad INT REFERENCES unidad_negocio(id_unidad),
    creado_en TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS industria (
    id_industria SERIAL PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(150) NOT NULL
);

CREATE TABLE IF NOT EXISTS proveedor (
    id_proveedor SERIAL PRIMARY KEY,
    ruc VARCHAR(11) NOT NULL UNIQUE,
    razon_social VARCHAR(200) NOT NULL,
    representante VARCHAR(150) NOT NULL,
    correo VARCHAR(150) NOT NULL,
    tipo VARCHAR(50) NOT NULL DEFAULT 'Regular',
    es_critico BOOLEAN NOT NULL DEFAULT FALSE,
    fk_id_unidad INT NOT NULL REFERENCES unidad_negocio(id_unidad),
    fk_id_industria INT NOT NULL REFERENCES industria(id_industria),
    creado_en TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS dimension (
    id_dimension SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    peso NUMERIC(5,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS item (
    id_item SERIAL PRIMARY KEY,
    codigo VARCHAR(30) NOT NULL UNIQUE,
    enunciado TEXT NOT NULL,
    peso NUMERIC(5,2) NOT NULL,
    fk_id_dimension INT NOT NULL REFERENCES dimension(id_dimension)
);

CREATE TABLE IF NOT EXISTS item_industria (
    id_item_industria SERIAL PRIMARY KEY,
    obligatorio BOOLEAN NOT NULL DEFAULT TRUE,
    fk_id_item INT NOT NULL REFERENCES item(id_item) ON DELETE CASCADE,
    fk_id_industria INT NOT NULL REFERENCES industria(id_industria) ON DELETE CASCADE,
    CONSTRAINT restriccion_item_industria UNIQUE (fk_id_item, fk_id_industria)
);

CREATE TABLE IF NOT EXISTS alternativa (
    id_alternativa SERIAL PRIMARY KEY,
    texto VARCHAR(255) NOT NULL,
    puntaje NUMERIC(5,2) NOT NULL,
    fk_id_item INT NOT NULL REFERENCES item(id_item) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS regla_condicional (
    id_regla SERIAL PRIMARY KEY,
    valor_disparador VARCHAR(100) NOT NULL,
    accion VARCHAR(50) NOT NULL,
    fk_id_item_origen INT NOT NULL REFERENCES item(id_item) ON DELETE CASCADE,
    fk_id_item_destino INT NOT NULL REFERENCES item(id_item) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS campania (
    id_campania SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    periodo VARCHAR(20) NOT NULL,
    estado VARCHAR(30) NOT NULL DEFAULT 'Borrador'
);

CREATE TABLE IF NOT EXISTS evaluacion (
    id_evaluacion SERIAL PRIMARY KEY,
    token VARCHAR(100) NOT NULL UNIQUE,
    estado VARCHAR(30) NOT NULL DEFAULT 'Pendiente',
    fecha_envio TIMESTAMP WITHOUT TIME ZONE,
    puntaje_total NUMERIC(5,2),
    fk_id_campania INT NOT NULL REFERENCES campania(id_campania),
    fk_id_proveedor INT NOT NULL REFERENCES proveedor(id_proveedor)
);

CREATE TABLE IF NOT EXISTS codigo_otp (
    id_codigo SERIAL PRIMARY KEY,
    valor VARCHAR(6) NOT NULL,
    expiracion TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    usado BOOLEAN NOT NULL DEFAULT FALSE,
    fk_id_proveedor INT NOT NULL REFERENCES proveedor(id_proveedor) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS respuesta (
    id_respuesta SERIAL PRIMARY KEY,
    fecha TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fk_id_evaluacion INT NOT NULL REFERENCES evaluacion(id_evaluacion) ON DELETE CASCADE,
    fk_id_alternativa INT NOT NULL REFERENCES alternativa(id_alternativa)
);

CREATE TABLE IF NOT EXISTS puntaje_dimension (
    id_puntaje SERIAL PRIMARY KEY,
    valor NUMERIC(5,2) NOT NULL,
    fk_id_evaluacion INT NOT NULL REFERENCES evaluacion(id_evaluacion) ON DELETE CASCADE,
    fk_id_dimension INT NOT NULL REFERENCES dimension(id_dimension),
    CONSTRAINT restriccion_evaluacion_dimension UNIQUE (fk_id_evaluacion, fk_id_dimension)
);

CREATE TABLE IF NOT EXISTS recomendacion (
    id_recomendacion SERIAL PRIMARY KEY,
    texto TEXT NOT NULL,
    umbral NUMERIC(5,2) NOT NULL,
    fk_id_dimension INT NOT NULL REFERENCES dimension(id_dimension)
);

CREATE TABLE IF NOT EXISTS auditoria (
    id_auditoria SERIAL PRIMARY KEY,
    accion VARCHAR(150) NOT NULL,
    fecha TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fk_id_usuario INT REFERENCES usuario(id_usuario),
    fk_id_evaluacion INT REFERENCES evaluacion(id_evaluacion)
);

INSERT INTO rol (nombre) VALUES
('Administrador Corporativo'),
('Gestor Unidad Negocio'),
('Evaluador'),
('Auditor')
ON CONFLICT (nombre) DO NOTHING;

INSERT INTO unidad_negocio (nombre, gerente) VALUES
('Supermercados Peruanos', 'Mariella Prado'),
('Promart', 'Juan Carlos Vallejo'),
('Oechsle', 'Edurne Benito'),
('Real Plaza', 'Misael Shimizu'),
('Farmacias Peruanas', 'Marcelo Ramos'),
('SIP', 'Trinidad Camarasa'),
('Intercorp Retail Sucursal China', 'Directorio Asia')
ON CONFLICT (nombre) DO NOTHING;

INSERT INTO dimension (nombre, peso) VALUES
('Ambiental', 25.00),
('Social', 25.00),
('Ética y Gobernanza', 25.00),
('Laboral', 25.00)
ON CONFLICT (nombre) DO NOTHING;

INSERT INTO industria (codigo, nombre) VALUES
('IND-ALIM', 'Alimentos y Bebidas Envasados'),
('IND-LOG', 'Transporte, Almacén y Logística'),
('IND-TEXT', 'Textil, Confecciones y Calzado'),
('IND-SERV', 'Servicios Generales y Mantenimiento'),
('IND-FARM', 'Productos Farmacéuticos y Cuidado Personal')
ON CONFLICT (codigo) DO NOTHING;

INSERT INTO campania (nombre, periodo, estado) VALUES
('Campaña Anual de Sostenibilidad 2026', '2026-I', 'Activa');

INSERT INTO recomendacion (texto, umbral, fk_id_dimension) VALUES
('Formalizar e implementar la política documentada de gestión integral de residuos y reciclaje.', 70.00, 1),
('Iniciar la medición y reporte anual auditado de la huella de carbono operacional.', 75.00, 1),
('Establecer un programa permanente de capacitación en seguridad y salud ocupacional.', 70.00, 2),
('Implementar un canal formalizado y anónimo de denuncias para colaboradores y terceros.', 80.00, 3),
('Garantizar la suscripción formal de contratos y el cumplimiento estricto de la jornada laboral legal.', 85.00, 4);
