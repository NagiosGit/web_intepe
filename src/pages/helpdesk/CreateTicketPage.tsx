import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ticketService } from '../../services/ticketService';
import { storageService } from '../../services/storageService';
import { HelpDeskLayout } from '../../components/helpdesk/HelpDeskLayout';
import { 
  Send, 
  UploadCloud, 
  X, 
  Image as ImageIcon, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowLeft,
  Building2,
  User,
  Mail
} from 'lucide-react';
import type { TicketCategory, TicketPriority, Ticket } from '../../types/helpdesk';

export const CreateTicketPage: React.FC = () => {
  const { profile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [categories, setCategories] = useState<TicketCategory[]>([]);
  const [subject, setSubject] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [priority, setPriority] = useState<TicketPriority>('MEDIA');
  const [description, setDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [createdTicket, setCreatedTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    const fetchCats = async () => {
      setLoadingCategories(true);
      try {
        const cats = await ticketService.getCategories();
        setCategories(cats);
        if (cats.length > 0) {
          setCategoryId(cats[0].id);
        }
      } catch (err) {
        console.error('Error loading categories:', err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCats();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const validFiles: File[] = [];

      for (const file of filesArray) {
        const validation = storageService.validateFile(file);
        if (!validation.valid) {
          setErrorMsg(validation.error || 'Archivo no válido.');
          return;
        }
        validFiles.push(file);
      }

      setSelectedFiles(prev => [...prev, ...validFiles]);
      setErrorMsg(null);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    if (!subject.trim() || !description.trim() || !categoryId) {
      setErrorMsg('Por favor complete todos los campos obligatorios.');
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);

    try {
      const newTicket = await ticketService.createTicket(
        {
          subject,
          category_id: categoryId,
          priority,
          description,
          files: selectedFiles,
        },
        profile
      );

      setCreatedTicket(newTicket);
    } catch (err: any) {
      console.error('Error creating ticket:', err);
      setErrorMsg(err?.message || 'No fue posible crear la solicitud. Intente nuevamente.');
    } finally {
      setSubmitting(false);
    }
  };

  // Confirmation View After Success
  if (createdTicket) {
    return (
      <HelpDeskLayout
        title="Solicitud Radicada con Éxito"
        subtitle={`Ticket N° ${createdTicket.ticket_number}`}
      >
        <div className="max-w-2xl mx-auto my-8 p-8 rounded-2xl bg-[#0D1219] border border-emerald-500/30 text-center space-y-6 hud-box shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
          <div className="hud-corner-tl"></div>
          <div className="hud-corner-br"></div>

          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30">
              RADICADO: {createdTicket.ticket_number}
            </span>
            <h2 className="text-2xl font-bold text-white font-['Space_Grotesk']">
              Su solicitud fue registrada correctamente
            </h2>
            <p className="text-xs sm:text-sm font-mono text-slate-300 max-w-md mx-auto leading-relaxed">
              Nuestro equipo de Mesa de Ayuda revisará su requerimiento y le asignará un técnico especialista a la brevedad posible.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-left text-xs font-mono space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Asunto:</span>
              <span className="text-white font-bold">{createdTicket.subject}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Prioridad:</span>
              <span className="text-[#FF7120] font-bold">{createdTicket.priority}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Estado Inicial:</span>
              <span className="text-amber-400 font-bold">ABIERTO (En cola de revisión)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to={`/help-desk/tickets/${createdTicket.id}`}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#FF7120] text-black font-['Space_Grotesk'] font-bold text-xs hover:bg-[#FF853A] transition-all shadow-[0_0_20px_rgba(255,113,32,0.4)]"
            >
              VER SOLICITUD & SEGUIMIENTO
            </Link>
            <Link
              to="/help-desk/tickets"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-mono text-xs hover:bg-white/10"
            >
              VOLVER A MIS TICKETS
            </Link>
          </div>
        </div>
      </HelpDeskLayout>
    );
  }

  return (
    <HelpDeskLayout
      title="Nueva Solicitud de Soporte"
      subtitle="Complete los detalles técnicos del requerimiento para que el equipo de INTEPE le atienda."
      actions={
        <Link
          to="/help-desk/tickets"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-slate-300 hover:text-white font-mono text-xs border border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al Listado</span>
        </Link>
      }
    >
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* 1. Verified User Info Strip */}
          <div className="p-4 rounded-xl bg-[#0D1219] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-300">
              <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Empresa: <strong className="text-white">{profile?.client?.name || 'INTEPE S.A.S.'}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <User className="w-4 h-4 text-[#FF7120] shrink-0" />
              <span>Solicitante: <strong className="text-white">{profile?.full_name}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{profile?.email}</span>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-red-300 text-xs font-mono">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 2. Main Form Fields */}
          <div className="p-6 rounded-xl bg-[#0D1219] border border-white/10 space-y-5 hud-box">
            <div className="hud-corner-tl"></div>
            <div className="hud-corner-br"></div>

            {/* Asunto */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1.5">
                Asunto o Título del Requerimiento <span className="text-[#FF7120]">*</span>
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Ej: Equipo portátil no conecta a la red Wi-Fi o impresora bloqueada"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#FF7120] focus:ring-1 focus:ring-[#FF7120]"
              />
            </div>

            {/* Category and Priority Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Category */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1.5">
                  Categoría del Servicio <span className="text-[#FF7120]">*</span>
                </label>
                {loadingCategories ? (
                  <div className="text-xs font-mono text-slate-500 py-2.5">Cargando categorías...</div>
                ) : (
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Priority */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1.5">
                  Nivel de Prioridad <span className="text-[#FF7120]">*</span>
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as TicketPriority)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#FF7120]"
                >
                  <option value="BAJA">Baja — Consulta o requerimiento no urgente</option>
                  <option value="MEDIA">Media — Falla parcial que no detiene la operación</option>
                  <option value="ALTA">Alta — Afectación a varios puestos de trabajo</option>
                  <option value="URGENTE">Urgente — Caída crítica de servidor o facturación</option>
                </select>
              </div>

            </div>

            {/* Descripción */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1.5">
                Descripción Detallada del Problema <span className="text-[#FF7120]">*</span>
              </label>
              <textarea
                required
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describa el comportamiento que presenta el equipo o aplicativo, mensajes de error en pantalla y usuarios afectados..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs placeholder:text-slate-600 focus:outline-none focus:border-[#FF7120] focus:ring-1 focus:ring-[#FF7120] leading-relaxed"
              ></textarea>
            </div>

            {/* Adjuntos */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1.5">
                Capturas de Pantalla o Fotografías (Opcional - Máx. 5 MB c/u)
              </label>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp,image/jpg"
                onChange={handleFileChange}
                className="hidden"
              />

              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/15 hover:border-cyan-500/50 rounded-xl p-6 text-center cursor-pointer bg-white/[0.01] hover:bg-cyan-500/[0.02] transition-colors group"
              >
                <UploadCloud className="w-8 h-8 text-slate-500 group-hover:text-cyan-400 mx-auto mb-2 transition-colors" />
                <span className="text-xs font-mono text-slate-300 block font-bold">
                  Haga clic para adjuntar imágenes o capturas de error
                </span>
                <span className="text-[10px] font-mono text-slate-500 mt-0.5 block">
                  Formatos admitidos: JPG, PNG, WEBP (Almacenamiento privado y seguro)
                </span>
              </div>

              {/* Selected Files List */}
              {selectedFiles.length > 0 && (
                <div className="mt-3 space-y-2">
                  <span className="text-[11px] font-mono text-cyan-400 font-bold block">
                    Archivos listos para adjuntar ({selectedFiles.length}):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedFiles.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono">
                        <div className="flex items-center gap-2 truncate">
                          <ImageIcon className="w-4 h-4 text-cyan-400 shrink-0" />
                          <span className="truncate text-slate-300">{file.name}</span>
                          <span className="text-[10px] text-slate-500 shrink-0">
                            ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="p-1 text-slate-500 hover:text-red-400 transition-colors ml-2"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Link
              to="/help-desk/tickets"
              className="px-5 py-2.5 rounded-lg bg-white/5 text-slate-400 font-mono text-xs hover:text-white"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#FF7120] text-black font-['Space_Grotesk'] font-bold text-xs hover:bg-[#FF853A] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(255,113,32,0.4)] cursor-pointer"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                  <span>RADICANDO SOLICITUD...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>RADICAR SOLICITUD</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </HelpDeskLayout>
  );
};
