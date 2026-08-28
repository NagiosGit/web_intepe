import { supabase } from './supabase';
import type { Profile, CreateTechnicianInput } from '../types/helpdesk';

export const technicianService = {
  async getTechnicians(onlyActive: boolean = false): Promise<(Profile & { assigned_tickets_count?: number })[]> {
    let query = supabase
      .from('profiles')
      .select('*')
      .eq('role', 'TECNICO_INTEPE')
      .order('full_name');

    if (onlyActive) {
      query = query.eq('status', 'ACTIVO');
    }

    const { data: techs, error } = await query;

    if (error) {
      console.error('Error fetching technicians:', error);
      throw error;
    }

    // Enrich with count of currently active assigned tickets
    const enriched = await Promise.all(
      (techs || []).map(async (tech) => {
        const { count } = await supabase
          .from('tickets')
          .select('id', { count: 'exact', head: true })
          .eq('assigned_to', tech.id)
          .not('status', 'in', '("RESUELTO","CERRADO")');

        return {
          ...tech,
          assigned_tickets_count: count || 0,
        };
      })
    );

    return enriched;
  },

  async createTechnician(input: CreateTechnicianInput): Promise<Profile> {
    const tempPassword = input.password || 'IntepeTech' + Math.floor(1000 + Math.random() * 9000) + '!';

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: input.email.trim().toLowerCase(),
      password: tempPassword,
      options: {
        data: {
          full_name: input.full_name.trim(),
          role: 'TECNICO_INTEPE',
        },
      },
    });

    if (authError || !authData.user) {
      console.error('Error in auth signUp for technician:', authError);
      throw new Error(authError?.message || 'No fue posible registrar las credenciales del técnico.');
    }

    // Ensure profile row
    const { data: profile, error: profError } = await supabase
      .from('profiles')
      .upsert([
        {
          id: authData.user.id,
          client_id: null,
          full_name: input.full_name.trim(),
          email: input.email.trim().toLowerCase(),
          phone: input.phone?.trim() || null,
          role: 'TECNICO_INTEPE',
          status: 'ACTIVO',
          specialty: input.specialty?.trim() || 'Soporte General & Redes',
        },
      ])
      .select()
      .single();

    if (profError) {
      console.error('Error creating profile for technician:', profError);
      throw new Error(profError.message);
    }

    return profile as Profile;
  },

  async updateTechnician(
    id: string,
    input: Partial<{ full_name: string; email: string; phone: string; specialty: string; status: 'ACTIVO' | 'INACTIVO' }>
  ): Promise<Profile> {
    const payload: any = { ...input };
    if (payload.email) {
      payload.email = payload.email.trim().toLowerCase();
    }
    const { data, error } = await supabase
      .from('profiles')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      console.error('Error updating technician:', error);
      throw new Error(error?.message || 'No fue posible actualizar el técnico.');
    }

    return data as Profile;
  },

  async toggleTechnicianStatus(id: string, newStatus: 'ACTIVO' | 'INACTIVO'): Promise<Profile> {
    return this.updateTechnician(id, { status: newStatus });
  },
};
