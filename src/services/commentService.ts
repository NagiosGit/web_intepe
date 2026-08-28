import { supabase } from './supabase';
import type { TicketComment } from '../types/helpdesk';

export const commentService = {
  async getComments(ticketId: string): Promise<TicketComment[]> {
    const { data, error } = await supabase
      .from('ticket_comments')
      .select('*, author:profiles(*)')
      .eq('ticket_id', ticketId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }

    return (data || []) as TicketComment[];
  },

  async addComment(
    ticketId: string,
    commentText: string,
    isInternal: boolean,
    userId: string
  ): Promise<TicketComment> {
    const { data, error } = await supabase
      .from('ticket_comments')
      .insert([
        {
          ticket_id: ticketId,
          user_id: userId,
          comment: commentText.trim(),
          is_internal: isInternal,
        },
      ])
      .select('*, author:profiles(*)')
      .single();

    if (error || !data) {
      console.error('Error adding comment:', error);
      throw new Error(error?.message || 'No fue posible agregar el comentario.');
    }

    // Auto-update ticket status if client replies or tech replies
    try {
      // Check author role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

      if (profile?.role === 'CLIENTE') {
        await supabase
          .from('tickets')
          .update({ status: 'EN_PROCESO' })
          .eq('id', ticketId)
          .eq('status', 'ESPERANDO_CLIENTE');
      } else if (profile?.role === 'TECNICO_INTEPE' && !isInternal) {
        // If technician replies publicly, set status to ESPERANDO_CLIENTE if currently in process
        await supabase
          .from('tickets')
          .update({ status: 'ESPERANDO_CLIENTE' })
          .eq('id', ticketId)
          .eq('status', 'EN_PROCESO');
      }
    } catch (e) {
      console.warn('Could not auto-advance ticket status:', e);
    }

    return data as TicketComment;
  },
};
