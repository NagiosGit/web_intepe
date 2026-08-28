import { supabase } from './supabase';
import { storageService } from './storageService';
import type { 
  Ticket, 
  TicketCategory, 
  CreateTicketInput, 
  TicketFilters,
  TicketStatus,
  TicketPriority,
  Profile 
} from '../types/helpdesk';

export const ticketService = {
  async getCategories(): Promise<TicketCategory[]> {
    const { data, error } = await supabase
      .from('ticket_categories')
      .select('*')
      .eq('active', true)
      .order('name');

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    return (data || []) as TicketCategory[];
  },

  async getTickets(filters: TicketFilters = {}): Promise<{ tickets: Ticket[]; totalCount: number }> {
    let query = supabase
      .from('tickets')
      .select(`
        *,
        client:clients(id, internal_code, name, nit),
        created_by_profile:profiles!tickets_created_by_fkey(id, full_name, email, phone),
        assigned_to_profile:profiles!tickets_assigned_to_fkey(id, full_name, email, specialty),
        category:ticket_categories(id, name)
      `, { count: 'exact' });

    // Status filter
    if (filters.status && filters.status !== 'TODOS') {
      query = query.eq('status', filters.status);
    }

    // Priority filter
    if (filters.priority && filters.priority !== 'TODAS') {
      query = query.eq('priority', filters.priority);
    }

    // Category filter
    if (filters.category_id && filters.category_id !== 'TODAS') {
      query = query.eq('category_id', filters.category_id);
    }

    // Assigned to filter
    if (filters.assigned_to && filters.assigned_to !== 'TODOS') {
      query = query.eq('assigned_to', filters.assigned_to);
    }

    // Client ID filter
    if (filters.client_id && filters.client_id !== 'TODOS') {
      query = query.eq('client_id', filters.client_id);
    }

    // Search query in subject or ticket_number
    if (filters.search && filters.search.trim() !== '') {
      const term = `%${filters.search.trim()}%`;
      query = query.or(`subject.ilike.${term},ticket_number.ilike.${term},description.ilike.${term}`);
    }

    // Ordering: Recent first
    query = query.order('created_at', { ascending: false });

    // Pagination
    const page = filters.page || 1;
    const pageSize = filters.pageSize || 15;
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    query = query.range(from, to);

    const { data, count, error } = await query;

    if (error) {
      console.error('Error fetching tickets:', error);
      throw error;
    }

    return {
      tickets: (data || []) as Ticket[],
      totalCount: count || 0,
    };
  },

  async getTicketById(id: string): Promise<Ticket | null> {
    const { data, error } = await supabase
      .from('tickets')
      .select(`
        *,
        client:clients(*),
        created_by_profile:profiles!tickets_created_by_fkey(*),
        assigned_to_profile:profiles!tickets_assigned_to_fkey(*),
        category:ticket_categories(*),
        attachments:ticket_attachments(*, uploaded_by_profile:profiles(*)),
        comments:ticket_comments(*, author:profiles(*)),
        history:ticket_history(*, actor:profiles(*))
      `)
      .eq('id', id)
      .single();

    if (error || !data) {
      console.error('Error fetching ticket detail:', error);
      return null;
    }

    // Generate signed URLs for attachments
    const attachmentsWithUrls = await Promise.all(
      (data.attachments || []).map(async (att: any) => {
        const signedUrl = await storageService.getSignedUrl(att.file_path);
        return {
          ...att,
          signed_url: signedUrl || undefined,
        };
      })
    );

    // Sort comments and history chronologically
    const sortedComments = (data.comments || []).sort(
      (a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

    const sortedHistory = (data.history || []).sort(
      (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return {
      ...data,
      attachments: attachmentsWithUrls,
      comments: sortedComments,
      history: sortedHistory,
    } as Ticket;
  },

  async createTicket(input: CreateTicketInput, profile: Profile): Promise<Ticket> {
    if (!profile.client_id && profile.role === 'CLIENTE') {
      throw new Error('El usuario no tiene una empresa asociada para radicar tickets.');
    }

    // 1. Insert ticket record (assigned_to starts as NULL)
    const { data: newTicket, error } = await supabase
      .from('tickets')
      .insert([
        {
          client_id: profile.client_id,
          created_by: profile.id,
          assigned_to: null,
          category_id: input.category_id,
          priority: input.priority,
          status: 'ABIERTO',
          subject: input.subject.trim(),
          description: input.description.trim(),
        },
      ])
      .select('*, client:clients(*), category:ticket_categories(*)')
      .single();

    if (error || !newTicket) {
      console.error('Error inserting ticket:', error);
      throw new Error(error?.message || 'No fue posible crear la solicitud de soporte.');
    }

    // 2. Upload attachments if provided
    if (input.files && input.files.length > 0) {
      for (const file of input.files) {
        try {
          await storageService.uploadAttachment(newTicket.id, file, profile.id);
        } catch (uploadErr) {
          console.error(`Error uploading attachment "${file.name}":`, uploadErr);
        }
      }
    }

    return newTicket as Ticket;
  },

  async updateTicketStatus(ticketId: string, status: TicketStatus): Promise<void> {
    const updatePayload: any = { status };
    if (status === 'RESUELTO' || status === 'CERRADO') {
      updatePayload.closed_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('tickets')
      .update(updatePayload)
      .eq('id', ticketId);

    if (error) throw error;
  },

  async assignTechnician(ticketId: string, technicianId: string | null): Promise<void> {
    const { error } = await supabase
      .from('tickets')
      .update({ assigned_to: technicianId })
      .eq('id', ticketId);

    if (error) throw error;
  },

  async updateTicketPriority(ticketId: string, priority: TicketPriority): Promise<void> {
    const { error } = await supabase
      .from('tickets')
      .update({ priority })
      .eq('id', ticketId);

    if (error) throw error;
  },

  async getTicketStats(): Promise<{
    abiertos: number;
    enRevision: number;
    enProceso: number;
    esperandoCliente: number;
    resueltos: number;
    cerrados: number;
    urgentes: number;
    totales: number;
  }> {
    const { data, error } = await supabase
      .from('tickets')
      .select('status, priority');

    if (error || !data) {
      return {
        abiertos: 0,
        enRevision: 0,
        enProceso: 0,
        esperandoCliente: 0,
        resueltos: 0,
        cerrados: 0,
        urgentes: 0,
        totales: 0,
      };
    }

    const stats = {
      abiertos: data.filter(t => t.status === 'ABIERTO').length,
      enRevision: data.filter(t => t.status === 'EN_REVISION').length,
      enProceso: data.filter(t => t.status === 'EN_PROCESO').length,
      esperandoCliente: data.filter(t => t.status === 'ESPERANDO_CLIENTE').length,
      resueltos: data.filter(t => t.status === 'RESUELTO').length,
      cerrados: data.filter(t => t.status === 'CERRADO').length,
      urgentes: data.filter(t => t.priority === 'URGENTE' && !['RESUELTO', 'CERRADO'].includes(t.status)).length,
      totales: data.length,
    };

    return stats;
  },
};
