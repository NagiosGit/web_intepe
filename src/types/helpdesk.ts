export type UserRole = 'ADMIN_INTEPE' | 'TECNICO_INTEPE' | 'CLIENTE';

export type UserStatus = 'ACTIVO' | 'INACTIVO';

export type ClientStatus = 'ACTIVO' | 'INACTIVO';

export type TicketPriority = 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE';

export type TicketStatus = 
  | 'ABIERTO' 
  | 'EN_REVISION' 
  | 'EN_PROCESO' 
  | 'ESPERANDO_CLIENTE' 
  | 'RESUELTO' 
  | 'CERRADO';

export interface Client {
  id: string;
  internal_code: string;
  name: string;
  nit?: string | null;
  email?: string | null;
  phone?: string | null;
  status: ClientStatus;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  client_id?: string | null;
  full_name: string;
  email: string;
  phone?: string | null;
  role: UserRole;
  status: UserStatus;
  specialty?: string | null;
  created_at: string;
  updated_at: string;
  client?: Client | null;
}

export interface TicketCategory {
  id: string;
  name: string;
  description?: string | null;
  active: boolean;
  created_at: string;
}

export interface TicketAttachment {
  id: string;
  ticket_id: string;
  uploaded_by: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  created_at: string;
  signed_url?: string;
  uploaded_by_profile?: Profile;
}

export interface TicketComment {
  id: string;
  ticket_id: string;
  user_id: string;
  comment: string;
  is_internal: boolean;
  created_at: string;
  author?: Profile;
}

export interface TicketHistory {
  id: string;
  ticket_id: string;
  user_id: string;
  action: string;
  old_value?: string | null;
  new_value?: string | null;
  created_at: string;
  actor?: Profile;
}

export interface Ticket {
  id: string;
  ticket_number: string;
  client_id: string;
  created_by: string;
  assigned_to?: string | null;
  category_id: string;
  priority: TicketPriority;
  status: TicketStatus;
  subject: string;
  description: string;
  created_at: string;
  updated_at: string;
  closed_at?: string | null;
  // Joins
  client?: Client;
  created_by_profile?: Profile;
  assigned_to_profile?: Profile | null;
  category?: TicketCategory;
  attachments?: TicketAttachment[];
  comments?: TicketComment[];
  history?: TicketHistory[];
  comments_count?: number;
  attachments_count?: number;
}

export interface CreateTicketInput {
  category_id: string;
  priority: TicketPriority;
  subject: string;
  description: string;
  files?: File[];
}

export interface CreateClientInput {
  name: string;
  nit?: string;
  email?: string;
  phone?: string;
  internal_code?: string;
}

export interface CreateTechnicianInput {
  full_name: string;
  email: string;
  password?: string;
  phone?: string;
  specialty?: string;
}

export interface CreateClientUserInput {
  client_id: string;
  full_name: string;
  email: string;
  password?: string;
  phone?: string;
}

export interface TicketFilters {
  search?: string;
  status?: TicketStatus | 'TODOS';
  priority?: TicketPriority | 'TODAS';
  category_id?: string | 'TODAS';
  assigned_to?: string | 'TODOS';
  client_id?: string | 'TODOS';
  page?: number;
  pageSize?: number;
}
