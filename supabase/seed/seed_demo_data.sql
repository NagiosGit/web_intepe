-- ==============================================================================
-- SCRIPT DE SEMILLA / DEMO Y CREACIÓN DEL PRIMER ADMINISTRADOR
-- ==============================================================================

-- 1. CREACIÓN DE UNA EMPRESA CLIENTE DEMO
INSERT INTO public.clients (internal_code, name, nit, email, phone, status)
VALUES (
    'CLI-0001',
    'Empresa Demo S.A.S.',
    '900.123.456-7',
    'contacto@empresademo.com',
    '(+57) 300 123 4567',
    'ACTIVO'
)
ON CONFLICT (internal_code) DO NOTHING;

-- 2. NOTA PARA CREAR EL PRIMER ADMINISTRADOR DE INTEPE:
-- Una vez que crees tu usuario en Authentication > Users con tu correo (ej: soporte@intepe.net o tu correo personal):
-- Ejecutas la siguiente consulta reemplazando 'TU_AUTH_USER_UUID' por el ID de tu usuario creado:
/*
INSERT INTO public.profiles (id, full_name, email, phone, role, status, specialty)
VALUES (
    'TU_AUTH_USER_UUID',
    'Ing. William Penagos',
    'soporte@intepe.net',
    '(+57) 313 386 2656',
    'ADMIN_INTEPE',
    'ACTIVO',
    'Dirección General & Arquitectura TI'
)
ON CONFLICT (id) DO UPDATE SET role = 'ADMIN_INTEPE';
*/
