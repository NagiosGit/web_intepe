import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ticketService } from '../../services/ticketService';
import { commentService } from '../../services/commentService';
import { technicianService } from '../../services/technicianService';
import { HelpDeskLayout } from '../../components/helpdesk/HelpDeskLayout';
import { TicketStatusBadge } from '../../components/helpdesk/TicketStatusBadge';
import { TicketPriorityBadge } from '../../components/helpdesk/TicketPriorityBadge';
import { 
  ArrowLeft, 
  Send, 
  Lock, 
  Paperclip, 
  History, 
  Image as ImageIcon,
  MessageSquare,
  AlertCircle,
  Wrench,
  Eye
} from 'lucide-react';
import type { 
  Ticket, 
  Profile, 
  TicketStatus, 
  TicketPriority 
} from '../../types/helpdesk';

export const TicketDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { profile } = useAuth();

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [technicians, setTechnicians] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  // Comment Form state
  const [newComment, setNewComment] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);

  // Update Status / Assignment state
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [updatingAssign, setUpdatingAssign] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const loadTicket = async () => {
    if (!id) return;
    try {
      const data = await ticketService.getTicketById(id);
      setTicket(data);
    } catch (err) {
      console.error('Error fetching ticket detail:', err);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await loadTicket();

      // If admin, load technicians for assignment
      if (profile?.role === 'ADMIN_INTEPE') {
        try {
          const techs = await technicianService.getTechnicians(false);
          setTechnicians(techs);
        } catch (e) {
          console.error('Error loading technicians:', e);
        }
      }

      setLoading(false);
    };

    init();
  }, [id, profile]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticket || !profile || !newComment.trim()) return;

    setSubmittingComment(true);
    setCommentError(null);

    try {
      await commentService.addComment(
        ticket.id,
        newComment,
        isInternal,
        profile.id
      );

      setNewComment('');
      setIsInternal(false);
      await loadTicket();
    } catch (err: any) {
      setCommentError(err?.message || 'No fue posible enviar la respuesta.');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleStatusChange = async (newStatus: TicketStatus) => {
    if (!ticket) return;
    setUpdatingStatus(true);
    try {
      await ticketService.updateTicketStatus(ticket.id, newStatus);
      await loadTicket();
    } catch (err) {
      console.error('Error changing status:', err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handlePriorityChange = async (newPriority: TicketPriority) => {
    if (!ticket) return;
    try {
      await ticketService.updateTicketPriority(ticket.id, newPriority);
      await loadTicket();
    } catch (err) {
      console.error('Error changing priority:', err);
    }
  };

  const handleAssignTechnician = async (technicianId: string) => {
    if (!ticket) return;
    setUpdatingAssign(true);
    try {
      await ticketService.assignTechnician(
        ticket.id,
        technicianId === '' ? null : technicianId
      );
      await loadTicket();
    } catch (err) {
      console.error('Error assigning technician:', err);
    } finally {
      setUpdatingAssign(false);
    }
  };

  if (loading) {
    return (
      <HelpDeskLayout title="Cargando Solicitud...">
        <div className="py-24 text-center text-xs font-mono text-slate-400 space-y-3">
          <div className="w-8 h-8 border-2 border-[#FF7120] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <span>Cargando datos y conversación del ticket...</span>
        </div>
      </HelpDeskLayout>
    );
  }

  if (!ticket) {
    return (
      <HelpDeskLayout title="Solicitud No Encontrada">
        <div className="max-w-md mx-auto my-12 p-8 rounded-xl bg-[#0D1219] border border-white/10 text-center space-y-4">
          <AlertCircle className="w-10 h-10 text-red-400 mx-auto" />
          <h2 className="text-lg font-bold text-white font-['Space_Grotesk']">
            El ticket solicitado no existe o no tiene permisos para consultarlo
          </h2>
          <div className="pt-2">
            <Link
              to="/help-desk/tickets"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FF7120] text-black font-bold text-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a Solicitudes</span>
            </Link>
          </div>
        </div>
      </HelpDeskLayout>
    );
  }

  const isStaff = profile?.role === 'ADMIN_INTEPE' || profile?.role === 'TECNICO_INTEPE';

  return (
    <HelpDeskLayout
      title={`${ticket.ticket_number}: ${ticket.subject}`}
      subtitle={`Radicado el ${new Date(ticket.created_at).toLocaleString('es-CO')} • Categoría: ${ticket.category?.name || 'General'}`}
      actions={
        <div className="flex items-center gap-2">
          <Link
            to="/help-desk/tickets"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-slate-300 hover:text-white font-mono text-xs border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a la Bandeja</span>
          </Link>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT & CENTER COLUMN (2 Cols): Problem & Conversation Timeline */}
        <div className="lg:col-span-2 space-y-6">

          {/* 1. Main Problem Description Card */}
          <div className="p-6 rounded-xl bg-[#0D1219] border border-white/10 hud-box space-y-4">
            <div className="hud-corner-tl"></div>
            <div className="hud-corner-br"></div>

            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400">
                  REQUERIMIENTO INICIAL
                </span>
                <span className="text-slate-600 font-mono text-xs">•</span>
                <span className="text-xs font-mono text-slate-400">
                  Por: <strong className="text-white">{ticket.created_by_profile?.full_name}</strong>
                </span>
              </div>
              <TicketPriorityBadge priority={ticket.priority} size="sm" />
            </div>

            <div className="text-sm font-mono text-slate-200 leading-relaxed whitespace-pre-line bg-[#05070A]/80 p-4 rounded-lg border border-white/5">
              {ticket.description}
            </div>

            {/* Attachments Section */}
            {ticket.attachments && ticket.attachments.length > 0 && (
              <div className="pt-2 space-y-2">
                <span className="text-[11px] font-mono text-slate-400 font-bold uppercase flex items-center gap-1.5">
                  <Paperclip className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Archivos y Capturas Adjuntas ({ticket.attachments.length}):</span>
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {ticket.attachments.map((att) => (
                    <div
                      key={att.id}
                      onClick={() => att.signed_url && setPreviewImage(att.signed_url)}
                      className="cursor-pointer group relative rounded-lg overflow-hidden border border-white/10 bg-[#05070A] hover:border-cyan-400 transition-colors p-2 text-center"
                    >
                      {att.signed_url ? (
                        <div className="relative h-24 w-full bg-black/40 rounded overflow-hidden flex items-center justify-center mb-1.5">
                          <img
                            src={att.signed_url}
                            alt={att.file_name}
                            className="object-cover h-full w-full group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-cyan-400 transition-opacity">
                            <Eye className="w-5 h-5" />
                          </div>
                        </div>
                      ) : (
                        <div className="h-24 flex items-center justify-center text-slate-500">
                          <ImageIcon className="w-8 h-8" />
                        </div>
                      )}
                      <div className="text-[11px] font-mono text-slate-300 truncate text-left">
                        {att.file_name}
                      </div>
                      <div className="text-[9px] font-mono text-slate-500 text-left">
                        {(att.file_size / (1024 * 1024)).toFixed(2)} MB • Ver imagen
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 2. Conversation & Timeline Stream */}
          <div className="p-6 rounded-xl bg-[#0D1219] border border-white/10 hud-box space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white font-['Space_Grotesk'] flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#FF7120]" />
                <span>Historial de Respuestas & Seguimiento</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">
                {ticket.comments?.length || 0} mensaje(s)
              </span>
            </div>

            {/* Comment List */}
            <div className="space-y-4">
              {(!ticket.comments || ticket.comments.length === 0) ? (
                <div className="py-8 text-center text-xs font-mono text-slate-500">
                  No hay mensajes registrados aún en este caso. Escriba el primer mensaje a continuación.
                </div>
              ) : (
                ticket.comments.map((comm) => {
                  const isAuthorStaff = comm.author?.role === 'ADMIN_INTEPE' || comm.author?.role === 'TECNICO_INTEPE';

                  return (
                    <div
                      key={comm.id}
                      className={`p-4 rounded-xl border transition-all ${
                        comm.is_internal
                          ? 'bg-amber-500/10 border-amber-500/30'
                          : isAuthorStaff
                          ? 'bg-cyan-950/20 border-cyan-500/30 ml-2 sm:ml-6'
                          : 'bg-white/[0.02] border-white/10 mr-2 sm:mr-6'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white font-['Space_Grotesk']">
                            {comm.author?.full_name || 'Usuario'}
                          </span>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                            comm.author?.role === 'ADMIN_INTEPE'
                              ? 'bg-red-500/20 text-red-300'
                              : comm.author?.role === 'TECNICO_INTEPE'
                              ? 'bg-cyan-500/20 text-cyan-300'
                              : 'bg-emerald-500/20 text-emerald-300'
                          }`}>
                            {comm.author?.role === 'ADMIN_INTEPE' ? 'ADMIN INTEPE' : comm.author?.role === 'TECNICO_INTEPE' ? 'TÉCNICO INTEPE' : 'CLIENTE'}
                          </span>
                          {comm.is_internal && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                              <Lock className="w-2.5 h-2.5" />
                              NOTA INTERNA
                            </span>
                          )}
                        </div>

                        <span className="text-[10px] font-mono text-slate-500">
                          {new Date(comm.created_at).toLocaleString('es-CO', {
                            day: '2-digit',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>

                      <div className="text-xs font-mono text-slate-200 leading-relaxed whitespace-pre-line">
                        {comm.comment}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* New Comment Box */}
            <form onSubmit={handleAddComment} className="pt-4 border-t border-white/10 space-y-3">
              {commentError && (
                <div className="p-2.5 rounded bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono">
                  {commentError}
                </div>
              )}

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1.5">
                  Responder a la Solicitud
                </label>
                <textarea
                  required
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={
                    isInternal
                      ? "Escriba una nota interna (solo visible para personal de INTEPE)..."
                      : "Escriba su respuesta o actualización técnica..."
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs placeholder:text-slate-600 focus:outline-none focus:border-[#FF7120] focus:ring-1 focus:ring-[#FF7120]"
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                
                {/* Internal Comment Toggle for Staff */}
                {isStaff ? (
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-300 select-none">
                    <input
                      type="checkbox"
                      checked={isInternal}
                      onChange={(e) => setIsInternal(e.target.checked)}
                      className="rounded bg-[#05070A] border-white/20 text-[#FF7120] focus:ring-0 w-4 h-4 cursor-pointer"
                    />
                    <span className={isInternal ? 'text-amber-400 font-bold' : ''}>
                      🔒 Comentario Interno (Oculto para el cliente)
                    </span>
                  </label>
                ) : (
                  <div></div>
                )}

                <button
                  type="submit"
                  disabled={submittingComment}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#FF7120] text-black font-['Space_Grotesk'] font-bold text-xs hover:bg-[#FF853A] disabled:opacity-50 transition-all shadow-[0_0_15px_rgba(255,113,32,0.3)] cursor-pointer"
                >
                  {submittingComment ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                      <span>ENVIANDO...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>{isInternal ? 'GUARDAR NOTA INTERNA' : 'ENVIAR RESPUESTA'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>

          </div>

        </div>

        {/* RIGHT COLUMN (1 Col): Ticket Metadata & Admin Actions */}
        <div className="space-y-6">

          {/* 1. Status & Priority Controls Card */}
          <div className="p-5 rounded-xl bg-[#0D1219] border border-white/10 hud-box space-y-4">
            <h3 className="text-sm font-bold text-white font-['Space_Grotesk'] uppercase tracking-wider text-cyan-400">
              Estado & Gestión
            </h3>

            {/* Current Status */}
            <div>
              <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                Estado Actual
              </label>
              {isStaff ? (
                <select
                  value={ticket.status}
                  onChange={(e) => handleStatusChange(e.target.value as TicketStatus)}
                  disabled={updatingStatus}
                  className="w-full px-3 py-2 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                >
                  <option value="ABIERTO">ABIERTO</option>
                  <option value="EN_REVISION">EN REVISIÓN</option>
                  <option value="EN_PROCESO">EN PROCESO</option>
                  <option value="ESPERANDO_CLIENTE">ESPERANDO CLIENTE</option>
                  <option value="RESUELTO">RESUELTO</option>
                  <option value="CERRADO">CERRADO</option>
                </select>
              ) : (
                <div className="pt-0.5">
                  <TicketStatusBadge status={ticket.status} />
                </div>
              )}
            </div>

            {/* Current Priority */}
            <div>
              <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                Nivel de Prioridad
              </label>
              {profile?.role === 'ADMIN_INTEPE' ? (
                <select
                  value={ticket.priority}
                  onChange={(e) => handlePriorityChange(e.target.value as TicketPriority)}
                  className="w-full px-3 py-2 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#FF7120]"
                >
                  <option value="BAJA">BAJA</option>
                  <option value="MEDIA">MEDIA</option>
                  <option value="ALTA">ALTA</option>
                  <option value="URGENTE">URGENTE</option>
                </select>
              ) : (
                <div className="pt-0.5">
                  <TicketPriorityBadge priority={ticket.priority} />
                </div>
              )}
            </div>

            {/* Technician Assignment (ADMIN_INTEPE Only) */}
            <div>
              <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                Técnico Responsable
              </label>
              {profile?.role === 'ADMIN_INTEPE' ? (
                <select
                  value={ticket.assigned_to || ''}
                  onChange={(e) => handleAssignTechnician(e.target.value)}
                  disabled={updatingAssign}
                  className="w-full px-3 py-2 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#FF7120]"
                >
                  <option value="">-- Sin Asignar / En Cola --</option>
                  {technicians.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.full_name} ({t.specialty || 'Soporte General'}) {t.status === 'INACTIVO' ? '[INACTIVO]' : ''}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="text-xs font-mono text-slate-200 bg-[#05070A] p-2.5 rounded border border-white/5 flex items-center gap-2">
                  <Wrench className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{ticket.assigned_to_profile?.full_name || 'En espera de asignación'}</span>
                </div>
              )}
            </div>

          </div>

          {/* 2. Client & Contact Info Card */}
          <div className="p-5 rounded-xl bg-[#0D1219] border border-white/10 hud-box space-y-3 text-xs font-mono">
            <h3 className="text-sm font-bold text-white font-['Space_Grotesk'] uppercase tracking-wider text-slate-300">
              Datos del Cliente
            </h3>

            <div className="space-y-2 pt-1">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Empresa:</span>
                <span className="text-white font-bold">{ticket.client?.name || 'INTEPE S.A.S.'}</span>
              </div>
              {ticket.client?.nit && (
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">NIT:</span>
                  <span className="text-slate-300">{ticket.client.nit}</span>
                </div>
              )}
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Usuario Solicitante:</span>
                <span className="text-slate-200">{ticket.created_by_profile?.full_name}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Correo:</span>
                <span className="text-cyan-400">{ticket.created_by_profile?.email}</span>
              </div>
              {ticket.created_by_profile?.phone && (
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Teléfono:</span>
                  <span className="text-slate-300">{ticket.created_by_profile.phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* 3. Audit History Card */}
          <div className="p-5 rounded-xl bg-[#0D1219] border border-white/10 hud-box space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white font-['Space_Grotesk'] uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <History className="w-4 h-4 text-cyan-400" />
                <span>Auditoría del Caso</span>
              </h3>
            </div>

            <div className="space-y-3 pt-2 max-h-60 overflow-y-auto pr-1">
              {(!ticket.history || ticket.history.length === 0) ? (
                <div className="text-[11px] font-mono text-slate-500">
                  Sin registros de auditoría aún.
                </div>
              ) : (
                ticket.history.map((hist) => (
                  <div key={hist.id} className="text-[11px] font-mono border-l-2 border-cyan-500/40 pl-2.5 py-0.5 space-y-0.5">
                    <div className="flex items-center justify-between text-slate-400">
                      <span className="font-bold text-white uppercase">{hist.action.replace('_', ' ')}</span>
                      <span className="text-[9px] text-slate-500">
                        {new Date(hist.created_at).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    {hist.old_value && hist.new_value && (
                      <div className="text-[10px] text-slate-400">
                        <span className="text-slate-500">{hist.old_value}</span> → <span className="text-[#FF7120]">{hist.new_value}</span>
                      </div>
                    )}
                    {hist.new_value && !hist.old_value && (
                      <div className="text-[10px] text-slate-400">{hist.new_value}</div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Image Preview Lightbox Modal */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-xl border border-white/20">
            <img
              src={previewImage}
              alt="Adjunto"
              className="max-w-full max-h-[85vh] object-contain mx-auto"
            />
            <div className="p-2 bg-[#0D1219] text-center text-xs font-mono text-slate-400">
              Haga clic en cualquier lugar para cerrar la vista previa
            </div>
          </div>
        </div>
      )}
    </HelpDeskLayout>
  );
};
