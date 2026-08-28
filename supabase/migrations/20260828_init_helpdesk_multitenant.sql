-- ==============================================================================
-- MIGRACIÓN MAESTRA: SISTEMA HELPDESK MULTI-TENANT INTEPE S.A.S.
-- ==============================================================================

-- 1. EXTENSIONES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. SECUENCIAS PARA IDENTIFICADORES AMIGABLES
CREATE SEQUENCE IF NOT EXISTS client_code_seq START WITH 1;
CREATE SEQUENCE IF NOT EXISTS ticket_code_seq START WITH 1;

-- 3. TABLA: clients (EMPRESAS CLIENTE)
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    internal_code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    nit TEXT,
    email TEXT,
    phone TEXT,
    status TEXT NOT NULL DEFAULT 'ACTIVO' CHECK (status IN ('ACTIVO', 'INACTIVO')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. TABLA: profiles (PERFILES DE USUARIOS VINCULADOS A AUTH.USERS)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    client_id UUID REFERENCES public.clients(id) ON DELETE RESTRICT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'CLIENTE' CHECK (role IN ('ADMIN_INTEPE', 'TECNICO_INTEPE', 'CLIENTE')),
    status TEXT NOT NULL DEFAULT 'ACTIVO' CHECK (status IN ('ACTIVO', 'INACTIVO')),
    specialty TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. TABLA: ticket_categories (CATEGORÍAS DE SOPORTE)
CREATE TABLE IF NOT EXISTS public.ticket_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. TABLA: tickets (SOLICITUDES DE SOPORTE)
CREATE TABLE IF NOT EXISTS public.tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_number TEXT UNIQUE NOT NULL,
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE RESTRICT,
    created_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    category_id UUID NOT NULL REFERENCES public.ticket_categories(id) ON DELETE RESTRICT,
    priority TEXT NOT NULL DEFAULT 'MEDIA' CHECK (priority IN ('BAJA', 'MEDIA', 'ALTA', 'URGENTE')),
    status TEXT NOT NULL DEFAULT 'ABIERTO' CHECK (status IN ('ABIERTO', 'EN_REVISION', 'EN_PROCESO', 'ESPERANDO_CLIENTE', 'RESUELTO', 'CERRADO')),
    subject TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    closed_at TIMESTAMPTZ
);

-- 7. TABLA: ticket_comments (CONVERSACIÓN & COMENTARIOS)
CREATE TABLE IF NOT EXISTS public.ticket_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id UUID NOT NULL REFERENCES public.tickets(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    comment TEXT NOT NULL,
    is_internal BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. TABLA: ticket_attachments (ADJUNTOS)
CREATE TABLE IF NOT EXISTS public.ticket_attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id UUID NOT NULL REFERENCES public.tickets(id) ON DELETE CASCADE,
    uploaded_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. TABLA: ticket_history (AUDITORÍA INMUTABLE)
CREATE TABLE IF NOT EXISTS public.ticket_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id UUID NOT NULL REFERENCES public.tickets(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    action TEXT NOT NULL,
    old_value TEXT,
    new_value TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- ÍNDICES DE RENDIMIENTO
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_profiles_client_id ON public.profiles(client_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_tickets_client_id ON public.tickets(client_id);
CREATE INDEX IF NOT EXISTS idx_tickets_created_by ON public.tickets(created_by);
CREATE INDEX IF NOT EXISTS idx_tickets_assigned_to ON public.tickets(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON public.tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_priority ON public.tickets(priority);
CREATE INDEX IF NOT EXISTS idx_tickets_category_id ON public.tickets(category_id);
CREATE INDEX IF NOT EXISTS idx_tickets_created_at ON public.tickets(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_ticket_id ON public.ticket_comments(ticket_id);
CREATE INDEX IF NOT EXISTS idx_attachments_ticket_id ON public.ticket_attachments(ticket_id);
CREATE INDEX IF NOT EXISTS idx_history_ticket_id ON public.ticket_history(ticket_id);

-- ==============================================================================
-- FUNCIONES AUXILIARES DE SEGURIDAD (SIN RECURSIÓN RLS)
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.get_auth_role()
RETURNS TEXT LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.get_auth_client_id()
RETURNS UUID LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT client_id FROM public.profiles WHERE id = auth.uid();
$$;

-- ==============================================================================
-- TRIGGERS PARA GENERACIÓN AUTOMÁTICA DE CÓDIGOS Y AUDITORÍA
-- ==============================================================================

-- Generador de Código de Cliente (CLI-0001)
CREATE OR REPLACE FUNCTION public.set_client_internal_code()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.internal_code IS NULL OR NEW.internal_code = '' THEN
        NEW.internal_code := 'CLI-' || lpad(nextval('client_code_seq')::text, 4, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_client_internal_code ON public.clients;
CREATE TRIGGER tr_client_internal_code
BEFORE INSERT ON public.clients
FOR EACH ROW EXECUTE FUNCTION public.set_client_internal_code();

-- Generador de Número de Ticket (INC-2026-000001)
CREATE OR REPLACE FUNCTION public.set_ticket_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.ticket_number IS NULL OR NEW.ticket_number = '' THEN
        NEW.ticket_number := 'INC-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('ticket_code_seq')::text, 6, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_ticket_number ON public.tickets;
CREATE TRIGGER tr_ticket_number
BEFORE INSERT ON public.tickets
FOR EACH ROW EXECUTE FUNCTION public.set_ticket_number();

-- Trigger de updated_at para todas las tablas
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_clients_updated_at ON public.clients;
CREATE TRIGGER tr_clients_updated_at BEFORE UPDATE ON public.clients FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS tr_profiles_updated_at ON public.profiles;
CREATE TRIGGER tr_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS tr_tickets_updated_at ON public.tickets;
CREATE TRIGGER tr_tickets_updated_at BEFORE UPDATE ON public.tickets FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Auditoría Automática de Cambios en Tickets
CREATE OR REPLACE FUNCTION public.audit_ticket_updates()
RETURNS TRIGGER AS $$
DECLARE
    current_user_id UUID;
    old_tech_name TEXT;
    new_tech_name TEXT;
BEGIN
    current_user_id := auth.uid();
    IF current_user_id IS NULL THEN
        current_user_id := NEW.created_by;
    END IF;

    -- Auditoría de Cambio de Estado
    IF (OLD.status IS DISTINCT FROM NEW.status) THEN
        INSERT INTO public.ticket_history (ticket_id, user_id, action, old_value, new_value)
        VALUES (NEW.id, current_user_id, 'CAMBIO_ESTADO', OLD.status, NEW.status);
        
        IF NEW.status = 'RESUELTO' OR NEW.status = 'CERRADO' THEN
            NEW.closed_at := now();
        END IF;
    END IF;

    -- Auditoría de Cambio de Prioridad
    IF (OLD.priority IS DISTINCT FROM NEW.priority) THEN
        INSERT INTO public.ticket_history (ticket_id, user_id, action, old_value, new_value)
        VALUES (NEW.id, current_user_id, 'CAMBIO_PRIORIDAD', OLD.priority, NEW.priority);
    END IF;

    -- Auditoría de Asignación / Reasignación de Técnico
    IF (OLD.assigned_to IS DISTINCT FROM NEW.assigned_to) THEN
        SELECT full_name INTO old_tech_name FROM public.profiles WHERE id = OLD.assigned_to;
        SELECT full_name INTO new_tech_name FROM public.profiles WHERE id = NEW.assigned_to;

        IF OLD.assigned_to IS NULL THEN
            INSERT INTO public.ticket_history (ticket_id, user_id, action, old_value, new_value)
            VALUES (NEW.id, current_user_id, 'TECNICO_ASIGNADO', 'Sin Asignar', COALESCE(new_tech_name, 'Técnico'));
        ELSE
            INSERT INTO public.ticket_history (ticket_id, user_id, action, old_value, new_value)
            VALUES (NEW.id, current_user_id, 'TECNICO_REASIGNADO', COALESCE(old_tech_name, 'Anterior'), COALESCE(new_tech_name, 'Sin Asignar'));
        END IF;

        IF NEW.status = 'ABIERTO' AND NEW.assigned_to IS NOT NULL THEN
            NEW.status := 'EN_REVISION';
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS tr_audit_ticket_updates ON public.tickets;
CREATE TRIGGER tr_audit_ticket_updates
BEFORE UPDATE ON public.tickets
FOR EACH ROW EXECUTE FUNCTION public.audit_ticket_updates();

-- Registro inicial de creación de ticket en historial
CREATE OR REPLACE FUNCTION public.audit_ticket_creation()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.ticket_history (ticket_id, user_id, action, old_value, new_value)
    VALUES (NEW.id, NEW.created_by, 'TICKET_CREADO', NULL, 'Ticket radicado en estado ABIERTO');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS tr_audit_ticket_creation ON public.tickets;
CREATE TRIGGER tr_audit_ticket_creation
AFTER INSERT ON public.tickets
FOR EACH ROW EXECUTE FUNCTION public.audit_ticket_creation();

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_history ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- POLÍTICAS: clients
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Clients select policy" ON public.clients;
CREATE POLICY "Clients select policy" ON public.clients
FOR SELECT TO authenticated USING (
    public.get_auth_role() IN ('ADMIN_INTEPE', 'TECNICO_INTEPE')
    OR id = public.get_auth_client_id()
);

DROP POLICY IF EXISTS "Clients admin insert policy" ON public.clients;
CREATE POLICY "Clients admin insert policy" ON public.clients
FOR INSERT TO authenticated WITH CHECK (
    public.get_auth_role() = 'ADMIN_INTEPE'
);

DROP POLICY IF EXISTS "Clients admin update policy" ON public.clients;
CREATE POLICY "Clients admin update policy" ON public.clients
FOR UPDATE TO authenticated USING (
    public.get_auth_role() = 'ADMIN_INTEPE'
);

-- ------------------------------------------------------------------------------
-- POLÍTICAS: profiles
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Profiles select policy" ON public.profiles;
CREATE POLICY "Profiles select policy" ON public.profiles
FOR SELECT TO authenticated USING (
    public.get_auth_role() IN ('ADMIN_INTEPE', 'TECNICO_INTEPE')
    OR id = auth.uid()
    OR (client_id IS NOT NULL AND client_id = public.get_auth_client_id())
    OR role IN ('ADMIN_INTEPE', 'TECNICO_INTEPE')
);

DROP POLICY IF EXISTS "Profiles admin insert policy" ON public.profiles;
CREATE POLICY "Profiles admin insert policy" ON public.profiles
FOR INSERT TO authenticated WITH CHECK (
    public.get_auth_role() = 'ADMIN_INTEPE'
    OR id = auth.uid()
);

DROP POLICY IF EXISTS "Profiles update policy" ON public.profiles;
CREATE POLICY "Profiles update policy" ON public.profiles
FOR UPDATE TO authenticated USING (
    public.get_auth_role() = 'ADMIN_INTEPE'
    OR id = auth.uid()
);

-- ------------------------------------------------------------------------------
-- POLÍTICAS: ticket_categories
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Categories select policy" ON public.ticket_categories;
CREATE POLICY "Categories select policy" ON public.ticket_categories
FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Categories admin manage policy" ON public.ticket_categories;
CREATE POLICY "Categories admin manage policy" ON public.ticket_categories
FOR ALL TO authenticated USING (
    public.get_auth_role() = 'ADMIN_INTEPE'
);

-- ------------------------------------------------------------------------------
-- POLÍTICAS: tickets
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Tickets select policy" ON public.tickets;
CREATE POLICY "Tickets select policy" ON public.tickets
FOR SELECT TO authenticated USING (
    public.get_auth_role() = 'ADMIN_INTEPE'
    OR (public.get_auth_role() = 'TECNICO_INTEPE' AND assigned_to = auth.uid())
    OR (public.get_auth_role() = 'CLIENTE' AND client_id = public.get_auth_client_id())
);

DROP POLICY IF EXISTS "Tickets insert policy" ON public.tickets;
CREATE POLICY "Tickets insert policy" ON public.tickets
FOR INSERT TO authenticated WITH CHECK (
    public.get_auth_role() = 'ADMIN_INTEPE'
    OR (
        public.get_auth_role() = 'CLIENTE'
        AND client_id = public.get_auth_client_id()
        AND created_by = auth.uid()
        AND assigned_to IS NULL
    )
);

DROP POLICY IF EXISTS "Tickets update policy" ON public.tickets;
CREATE POLICY "Tickets update policy" ON public.tickets
FOR UPDATE TO authenticated USING (
    public.get_auth_role() = 'ADMIN_INTEPE'
    OR (public.get_auth_role() = 'TECNICO_INTEPE' AND assigned_to = auth.uid())
    OR (public.get_auth_role() = 'CLIENTE' AND client_id = public.get_auth_client_id())
);

-- ------------------------------------------------------------------------------
-- POLÍTICAS: ticket_comments
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Comments select policy" ON public.ticket_comments;
CREATE POLICY "Comments select policy" ON public.ticket_comments
FOR SELECT TO authenticated USING (
    public.get_auth_role() = 'ADMIN_INTEPE'
    OR (
        public.get_auth_role() = 'TECNICO_INTEPE'
        AND EXISTS (SELECT 1 FROM public.tickets WHERE id = ticket_comments.ticket_id AND assigned_to = auth.uid())
    )
    OR (
        public.get_auth_role() = 'CLIENTE'
        AND is_internal = false
        AND EXISTS (SELECT 1 FROM public.tickets WHERE id = ticket_comments.ticket_id AND client_id = public.get_auth_client_id())
    )
);

DROP POLICY IF EXISTS "Comments insert policy" ON public.ticket_comments;
CREATE POLICY "Comments insert policy" ON public.ticket_comments
FOR INSERT TO authenticated WITH CHECK (
    user_id = auth.uid()
    AND (
        public.get_auth_role() IN ('ADMIN_INTEPE', 'TECNICO_INTEPE')
        OR (public.get_auth_role() = 'CLIENTE' AND is_internal = false)
    )
);

-- ------------------------------------------------------------------------------
-- POLÍTICAS: ticket_attachments
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Attachments select policy" ON public.ticket_attachments;
CREATE POLICY "Attachments select policy" ON public.ticket_attachments
FOR SELECT TO authenticated USING (
    public.get_auth_role() = 'ADMIN_INTEPE'
    OR (
        public.get_auth_role() = 'TECNICO_INTEPE'
        AND EXISTS (SELECT 1 FROM public.tickets WHERE id = ticket_attachments.ticket_id AND assigned_to = auth.uid())
    )
    OR (
        public.get_auth_role() = 'CLIENTE'
        AND EXISTS (SELECT 1 FROM public.tickets WHERE id = ticket_attachments.ticket_id AND client_id = public.get_auth_client_id())
    )
);

DROP POLICY IF EXISTS "Attachments insert policy" ON public.ticket_attachments;
CREATE POLICY "Attachments insert policy" ON public.ticket_attachments
FOR INSERT TO authenticated WITH CHECK (
    uploaded_by = auth.uid()
);

-- ------------------------------------------------------------------------------
-- POLÍTICAS: ticket_history
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "History select policy" ON public.ticket_history;
CREATE POLICY "History select policy" ON public.ticket_history
FOR SELECT TO authenticated USING (
    public.get_auth_role() = 'ADMIN_INTEPE'
    OR (
        public.get_auth_role() = 'TECNICO_INTEPE'
        AND EXISTS (SELECT 1 FROM public.tickets WHERE id = ticket_history.ticket_id AND assigned_to = auth.uid())
    )
    OR (
        public.get_auth_role() = 'CLIENTE'
        AND EXISTS (SELECT 1 FROM public.tickets WHERE id = ticket_history.ticket_id AND client_id = public.get_auth_client_id())
    )
);

-- ==============================================================================
-- SEED DATA INICIAL (CATEGORÍAS DE SERVICIO)
-- ==============================================================================
INSERT INTO public.ticket_categories (name, description, active)
VALUES 
    ('Hardware', 'Fallas en computadores, discos, memoria, fuentes y periféricos', true),
    ('Software', 'Problemas con sistemas operativos, programas corporativos y aplicativos', true),
    ('Redes & Conectividad', 'Fallas de internet, switches, routers, puntos de red y Wi-Fi', true),
    ('Servidores & Virtualización', 'Administración de servidores Windows, Linux y Proxmox VE', true),
    ('Google Workspace', 'Cuentas de correo, Gmail corporativo, Google Drive y permisos', true),
    ('Microsoft 365 / Correo', 'Cuentas Exchange, Outlook, Teams y licencias Office', true),
    ('Seguridad & Antivirus', 'Bloqueos de firewall, sospecha de virus, VPNs y accesos', true),
    ('Impresoras & Escáneres', 'Configuración de impresoras locales y en red', true),
    ('Otro Requerimiento', 'Solicitudes generales de soporte y asesoría técnica', true)
ON CONFLICT (name) DO NOTHING;

-- ==============================================================================
-- CONFIGURACIÓN DE STORAGE PRIVADO PARA ADJUNTOS
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'helpdesk-attachments',
    'helpdesk-attachments',
    false,
    5242880, -- 5 MB en bytes
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
)
ON CONFLICT (id) DO UPDATE SET 
    public = false,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

-- Políticas de Storage para el bucket helpdesk-attachments
DROP POLICY IF EXISTS "Authenticated users can upload attachments" ON storage.objects;
CREATE POLICY "Authenticated users can upload attachments" ON storage.objects
FOR INSERT TO authenticated WITH CHECK (
    bucket_id = 'helpdesk-attachments'
);

DROP POLICY IF EXISTS "Authorized users can read attachments" ON storage.objects;
CREATE POLICY "Authorized users can read attachments" ON storage.objects
FOR SELECT TO authenticated USING (
    bucket_id = 'helpdesk-attachments'
);
