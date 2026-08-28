# Mesa de Ayuda Corporativa B2B (Help Desk Multi-Tenant) — INTEPE S.A.S.

Sistema empresarial de gestión de tickets y soporte técnico corporativo desarrollado con **React 19**, **TypeScript**, **Tailwind CSS**, **PostgreSQL**, **Supabase Auth**, **Row Level Security (RLS)** y **Supabase Storage**.

---

## 🏛️ 1. Arquitectura del Sistema

```
INTEPE S.A.S. (ADMIN_INTEPE / TECNICO_INTEPE)
│
├── EMPRESA CLIENTE A (CLI-0001)
│     ├── Usuario A1 (CLIENTE)
│     ├── Usuario A2 (CLIENTE)
│     └── Solicitudes (INC-2026-000001, INC-2026-000002...)
│
├── EMPRESA CLIENTE B (CLI-0002)
│     ├── Usuario B1 (CLIENTE)
│     └── Solicitudes aisladas mediante RLS
```

---

## 🔐 2. Roles y Privilegios

| Rol | Alcance | Acciones Permitidas |
| :--- | :--- | :--- |
| **`ADMIN_INTEPE`** | Acceso Global | Crear empresas, gestionar usuarios, crear/editar técnicos, reasignar tickets, cambiar prioridades/estados, notas internas y auditoría. |
| **`TECNICO_INTEPE`** | Tickets Asignados | Ver tickets asignados a su UUID, diagnosticar, responder a clientes, subir adjuntos, agregar notas internas y marcar como resuelto. |
| **`CLIENTE`** | Su Empresa Exclusiva | Radicar tickets, consultar estado de su empresa, responder a técnicos y adjuntar imágenes (JPG, PNG, WEBP). |

---

## 🗄️ 3. Pasos de Instalación en Supabase

### Paso 1: Ejecutar la Migración SQL
1. Abre tu proyecto en [Supabase Dashboard](https://supabase.com/dashboard/project/xpbtcakvdhujepsfkwve).
2. Ve a la pestaña **`SQL Editor`** (icono de terminal a la izquierda).
3. Haz clic en **`New query`**.
4. Copia el contenido del archivo [`supabase/migrations/20260828_init_helpdesk_multitenant.sql`](file:///c:/Users/WINTEPE/Desktop/PROYECTOS_IA/Web_Intepe/supabase/migrations/20260828_init_helpdesk_multitenant.sql).
5. Pégalo en el editor y presiona **`Run`** (botón verde).

### Paso 2: Crear el Primer Administrador de INTEPE
1. En Supabase, ve a **`Authentication`** > **`Users`** > **`Add user`** > **`Create user`**.
2. Ingresa tu correo (ejemplo: `soporte@intepe.net`) y tu contraseña.
3. Copia el **User UID** generado (un código tipo `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`).
4. Ve al **SQL Editor** y ejecuta:
```sql
INSERT INTO public.profiles (id, full_name, email, phone, role, status, specialty)
VALUES (
    'PEGA_AQUÍ_EL_USER_UID',
    'Ing. William Penagos',
    'soporte@intepe.net',
    '(+57) 313 386 2656',
    'ADMIN_INTEPE',
    'ACTIVO',
    'Dirección TI & Arquitectura'
)
ON CONFLICT (id) DO UPDATE SET role = 'ADMIN_INTEPE';
```

---

## 🌐 4. Rutas del Sistema

* `/help-desk/login` — Acceso exclusivo para clientes y personal de INTEPE.
* `/help-desk` — Dashboard del cliente con métricas de solicitudes.
* `/help-desk/tickets` — Listado de solicitudes con buscador y filtros avanzados.
* `/help-desk/tickets/nuevo` — Formulario de radicación de incidentes con carga de adjuntos.
* `/help-desk/tickets/:id` — Detalle del caso, conversación timeline y visualizador de imágenes.
* `/tecnico` — Panel del técnico asignado con semáforo de prioridades.
* `/admin/help-desk` — Centro de mando administrativo global.
* `/admin/clientes` — Administración de empresas clientes (`/admin/clientes/:id` para usuarios).
* `/admin/tecnicos` — Administración de técnicos y especialidades.

---

## 🔒 5. Políticas de Seguridad (RLS) Implementadas

1. **Aislamiento Multi-Tenant:** `CLIENTE` solo puede ejecutar `SELECT`, `INSERT` o `UPDATE` en tickets cuyo `client_id` coincida con su perfil autenticado.
2. **Notas Internas Ocultas:** Las consultas en `ticket_comments` bloquean cualquier registro donde `is_internal = true` para usuarios de rol `CLIENTE`.
3. **Storage Privado:** El bucket `helpdesk-attachments` es 100% privado y restringe la visualización exclusivamente mediante **Signed URLs** de duración temporal limitada.
