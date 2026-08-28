import { supabase } from './supabase';
import type { Client, Profile, CreateClientInput, CreateClientUserInput } from '../types/helpdesk';

export const clientService = {
  async getClients(): Promise<(Client & { users_count?: number; active_tickets_count?: number })[]> {
    const { data: clients, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching clients:', error);
      throw error;
    }

    // Fetch counts for each client
    const enriched = await Promise.all(
      (clients || []).map(async (cli) => {
        const { count: usersCount } = await supabase
          .from('profiles')
          .select('id', { count: 'exact', head: true })
          .eq('client_id', cli.id);

        const { count: ticketsCount } = await supabase
          .from('tickets')
          .select('id', { count: 'exact', head: true })
          .eq('client_id', cli.id)
          .not('status', 'in', '("RESUELTO","CERRADO")');

        return {
          ...cli,
          users_count: usersCount || 0,
          active_tickets_count: ticketsCount || 0,
        };
      })
    );

    return enriched;
  },

  async getClientById(id: string): Promise<(Client & { users: Profile[] }) | null> {
    const { data: client, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !client) {
      console.error('Error fetching client detail:', error);
      return null;
    }

    const { data: users } = await supabase
      .from('profiles')
      .select('*')
      .eq('client_id', id)
      .order('full_name');

    return {
      ...client,
      users: (users || []) as Profile[],
    };
  },

  async createClient(input: CreateClientInput): Promise<Client> {
    const { data, error } = await supabase
      .from('clients')
      .insert([
        {
          name: input.name.trim(),
          nit: input.nit?.trim() || null,
          email: input.email?.trim() || null,
          phone: input.phone?.trim() || null,
          status: 'ACTIVO',
        },
      ])
      .select()
      .single();

    if (error || !data) {
      console.error('Error creating client:', error);
      throw new Error(error?.message || 'No fue posible crear la empresa cliente.');
    }

    return data as Client;
  },

  async updateClient(id: string, input: Partial<CreateClientInput & { status: 'ACTIVO' | 'INACTIVO' }>): Promise<Client> {
    const { data, error } = await supabase
      .from('clients')
      .update(input)
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      console.error('Error updating client:', error);
      throw new Error(error?.message || 'No fue posible actualizar la empresa cliente.');
    }

    return data as Client;
  },

  async getClientUsers(clientId: string): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('client_id', clientId)
      .order('full_name');

    if (error) {
      console.error('Error fetching client users:', error);
      throw error;
    }

    return (data || []) as Profile[];
  },

  async createClientUser(input: CreateClientUserInput): Promise<Profile> {
    const tempPassword = input.password || 'Intepe' + Math.floor(1000 + Math.random() * 9000) + '!';

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: input.email.trim().toLowerCase(),
      password: tempPassword,
      options: {
        data: {
          full_name: input.full_name.trim(),
          role: 'CLIENTE',
          client_id: input.client_id,
        },
      },
    });

    if (authError || !authData.user) {
      console.error('Error in auth signUp for client user:', authError);
      throw new Error(authError?.message || 'No fue posible registrar las credenciales del usuario.');
    }

    // Ensure profile row is present
    const { data: profile, error: profError } = await supabase
      .from('profiles')
      .upsert([
        {
          id: authData.user.id,
          client_id: input.client_id,
          full_name: input.full_name.trim(),
          email: input.email.trim().toLowerCase(),
          phone: input.phone?.trim() || null,
          role: 'CLIENTE',
          status: 'ACTIVO',
        },
      ])
      .select('*, client:clients(*)')
      .single();

    if (profError) {
      console.error('Error creating profile for user:', profError);
      throw new Error(profError.message);
    }

    return profile as Profile;
  },

  async updateClientUser(userId: string, input: Partial<{ full_name: string; email: string; phone: string; status: 'ACTIVO' | 'INACTIVO'; client_id: string }>): Promise<Profile> {
    const payload: any = { ...input };
    if (payload.email) {
      payload.email = payload.email.trim().toLowerCase();
    }
    const { data, error } = await supabase
      .from('profiles')
      .update(payload)
      .eq('id', userId)
      .select('*, client:clients(*)')
      .single();

    if (error || !data) {
      console.error('Error updating user profile:', error);
      throw new Error(error?.message || 'No fue posible actualizar el perfil del usuario.');
    }

    return data as Profile;
  },
};
