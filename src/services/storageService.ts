import { supabase } from './supabase';
import type { TicketAttachment } from '../types/helpdesk';

const BUCKET_NAME = 'helpdesk-attachments';
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

export const storageService = {
  validateFile(file: File): { valid: boolean; error?: string } {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return {
        valid: false,
        error: `El archivo "${file.name}" supera el tamaño máximo permitido de 5 MB.`,
      };
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
      return {
        valid: false,
        error: `Formato no permitido para "${file.name}". Solo se admiten imágenes JPG, PNG o WEBP.`,
      };
    }

    return { valid: true };
  },

  async uploadAttachment(
    ticketId: string,
    file: File,
    uploadedBy: string
  ): Promise<TicketAttachment> {
    const validation = this.validateFile(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    // Sanitize file name and create unique path
    const fileExt = file.name.split('.').pop();
    const sanitizedBase = file.name
      .substring(0, file.name.lastIndexOf('.'))
      .replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueFileName = `${Date.now()}_${sanitizedBase}.${fileExt}`;
    const filePath = `${ticketId}/${uniqueFileName}`;

    // 1. Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      throw new Error(`Error al subir archivo a almacenamiento: ${uploadError.message}`);
    }

    // 2. Insert record in ticket_attachments table
    const { data: record, error: dbError } = await supabase
      .from('ticket_attachments')
      .insert([
        {
          ticket_id: ticketId,
          uploaded_by: uploadedBy,
          file_name: file.name,
          file_path: filePath,
          file_type: file.type,
          file_size: file.size,
        },
      ])
      .select('*, uploaded_by_profile:profiles(*)')
      .single();

    if (dbError) {
      console.error('DB Attachment record error:', dbError);
      throw new Error(`Error al registrar archivo en la base de datos: ${dbError.message}`);
    }

    // 3. Generate Signed URL for immediate display
    const signedUrl = await this.getSignedUrl(filePath);

    return {
      ...(record as TicketAttachment),
      signed_url: signedUrl || undefined,
    };
  },

  async getSignedUrl(filePath: string, expiresInSeconds: number = 3600): Promise<string | null> {
    try {
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .createSignedUrl(filePath, expiresInSeconds);

      if (error || !data?.signedUrl) {
        console.error('Error creating signed URL:', error);
        return null;
      }

      return data.signedUrl;
    } catch (err) {
      console.error('Exception creating signed URL:', err);
      return null;
    }
  },
};
