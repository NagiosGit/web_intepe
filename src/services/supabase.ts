import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://xpbtcakvdhujepsfkwve.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwYnRjYWt2ZGh1amVwc2Zrd3ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5MjYxMDEsImV4cCI6MjEwMzUwMjEwMX0.VfAER4rz1EPOIQRwOGOH63BSYcM_wo90iL-dcyRrwZ8';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

