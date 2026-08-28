import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ticketService } from '../../services/ticketService';
import { HelpDeskLayout } from '../../components/helpdesk/HelpDeskLayout';
import { TicketStatusBadge } from '../../components/helpdesk/TicketStatusBadge';
import { TicketPriorityBadge } from '../../components/helpdesk/TicketPriorityBadge';
import { 
  Wrench, 
  Clock, 
  CheckCircle2, 
  Flame, 
  Headset, 
  Search, 
  RefreshCw
} from 'lucide-react';
import type { Ticket, TicketStatus } from '../../types/helpdesk';

export const TechnicianDashboardPage: React.FC = () => {
  const { profile } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'TODOS'>('TODOS');
  const [search, setSearch] = useState('');

  const loadTechTickets = async () => {
    if (!profile) return;
    setLoading(true);
    try {
      const res = await ticketService.getTickets({
        assigned_to: profile.id,
        status: statusFilter,
        search,
        pageSize: 50,
      });
      setTickets(res.tickets);
    } catch (err) {
      console.error('Error fetching technician tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTechTickets();
  }, [profile, statusFilter, search]);

  const urgentes = tickets.filter(t => t.priority === 'URGENTE' && !['RESUELTO', 'CERRADO'].includes(t.status)).length;
  const enProceso = tickets.filter(t => ['EN_PROCESO', 'EN_REVISION'].includes(t.status)).length;
  const esperando = tickets.filter(t => t.status === 'ESPERANDO_CLIENTE').length;
  const resueltos = tickets.filter(t => t.status === 'RESUELTO').length;

  return (
    <HelpDeskLayout
      title={`Panel Técnico: ${profile?.full_name}`}
      subtitle={`Especialidad: ${profile?.specialty || 'Soporte General'} • Bandeja de Solicitudes Asignadas`}
    >
      {/* 1. Technician Key Performance Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        {/* Urgentes */}
        <div className="p-4 rounded-xl bg-[#0D1219] border border-red-500/30 hud-box">
          <div className="flex items-center justify-between text-red-400 mb-2">
            <span className="text-[11px] font-mono font-bold uppercase">Casos Urgentes</span>
            <Flame className="w-4 h-4" />
          </div>
          <div className="text-3xl font-black text-white font-['Space_Grotesk']">
            {loading ? '...' : urgentes}
          </div>
          <span className="text-[10px] font-mono text-slate-400 mt-1 block">
            Atención prioritaria inmediata
          </span>
        </div>

        {/* En Proceso */}
        <div className="p-4 rounded-xl bg-[#0D1219] border border-cyan-500/30 hud-box">
          <div className="flex items-center justify-between text-cyan-400 mb-2">
            <span className="text-[11px] font-mono font-bold uppercase">En Diagnóstico / Proceso</span>
            <Wrench className="w-4 h-4" />
          </div>
          <div className="text-3xl font-black text-white font-['Space_Grotesk']">
            {loading ? '...' : enProceso}
          </div>
          <span className="text-[10px] font-mono text-slate-400 mt-1 block">
            Bajo su gestión actual
          </span>
        </div>

        {/* Esperando Cliente */}
        <div className="p-4 rounded-xl bg-[#0D1219] border border-purple-500/30 hud-box">
          <div className="flex items-center justify-between text-purple-400 mb-2">
            <span className="text-[11px] font-mono font-bold uppercase">Esperando al Cliente</span>
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-3xl font-black text-white font-['Space_Grotesk']">
            {loading ? '...' : esperando}
          </div>
          <span className="text-[10px] font-mono text-slate-400 mt-1 block">
            Mensaje enviado al usuario
          </span>
        </div>

        {/* Resueltos */}
        <div className="p-4 rounded-xl bg-[#0D1219] border border-emerald-500/30 hud-box">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-[11px] font-mono font-bold uppercase">Casos Resueltos</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-3xl font-black text-white font-['Space_Grotesk']">
            {loading ? '...' : resueltos}
          </div>
          <span className="text-[10px] font-mono text-slate-400 mt-1 block">
            Historial de soluciones
          </span>
        </div>

      </div>

      {/* 2. Filter Strip */}
      <div className="bg-[#0D1219] border border-white/10 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 hud-box">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por código, asunto, cliente..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-1.5 rounded-lg bg-[#05070A] border border-white/10 text-slate-300 font-mono text-xs focus:outline-none focus:border-cyan-400"
          >
            <option value="TODOS">Todos los Estados</option>
            <option value="EN_REVISION">En Revisión</option>
            <option value="EN_PROCESO">En Proceso</option>
            <option value="ESPERANDO_CLIENTE">Esperando Cliente</option>
            <option value="RESUELTO">Resueltos</option>
          </select>
        </div>

        <button
          onClick={loadTechTickets}
          className="text-xs font-mono text-slate-400 hover:text-cyan-400 flex items-center gap-1 self-end sm:self-auto cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Actualizar Lista</span>
        </button>
      </div>

      {/* 3. Assigned Tickets Table */}
      <div className="bg-[#0D1219] border border-white/10 rounded-xl overflow-hidden hud-box">
        {loading ? (
          <div className="py-20 text-center text-xs font-mono text-slate-400 space-y-3">
            <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <span>Cargando tickets asignados...</span>
          </div>
        ) : tickets.length === 0 ? (
          <div className="py-16 text-center space-y-3 p-4">
            <Headset className="w-10 h-10 text-slate-600 mx-auto" />
            <div className="text-sm font-bold text-white font-['Space_Grotesk']">
              No tiene tickets asignados pendientes
            </div>
            <p className="text-xs font-mono text-slate-400 max-w-sm mx-auto">
              Cuando el administrador de INTEPE le asigne una solicitud de soporte, aparecerá listada en esta sección.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 uppercase text-[10px]">
                  <th className="py-3 px-4">Ticket</th>
                  <th className="py-3 px-4">Empresa Cliente</th>
                  <th className="py-3 px-4">Solicitante</th>
                  <th className="py-3 px-4">Asunto</th>
                  <th className="py-3 px-4">Prioridad</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4">Fecha</th>
                  <th className="py-3 px-4 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-cyan-400 whitespace-nowrap">
                      {ticket.ticket_number}
                    </td>
                    <td className="py-3.5 px-4 text-white font-semibold whitespace-nowrap">
                      {ticket.client?.name || 'Cliente'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">
                      {ticket.created_by_profile?.full_name}
                    </td>
                    <td className="py-3.5 px-4 font-sans font-medium text-white max-w-xs truncate">
                      {ticket.subject}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <TicketPriorityBadge priority={ticket.priority} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <TicketStatusBadge status={ticket.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {new Date(ticket.created_at).toLocaleDateString('es-CO', {
                        day: '2-digit',
                        month: 'short',
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <Link
                        to={`/help-desk/tickets/${ticket.id}`}
                        className="px-3 py-1 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-black font-bold transition-all text-[11px]"
                      >
                        Atender Caso
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </HelpDeskLayout>
  );
};
