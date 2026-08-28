import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ticketService } from '../../services/ticketService';
import { HelpDeskLayout } from '../../components/helpdesk/HelpDeskLayout';
import { TicketStatusBadge } from '../../components/helpdesk/TicketStatusBadge';
import { TicketPriorityBadge } from '../../components/helpdesk/TicketPriorityBadge';
import { 
  PlusCircle, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Headset,
  FileText
} from 'lucide-react';
import type { Ticket } from '../../types/helpdesk';

export const ClientDashboardPage: React.FC = () => {
  const { profile } = useAuth();
  const [recentTickets, setRecentTickets] = useState<Ticket[]>([]);
  const [stats, setStats] = useState({
    abiertos: 0,
    enRevision: 0,
    enProceso: 0,
    esperandoCliente: 0,
    resueltos: 0,
    cerrados: 0,
    urgentes: 0,
    totales: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        const [ticketsRes, statsRes] = await Promise.all([
          ticketService.getTickets({ pageSize: 5 }),
          ticketService.getTicketStats(),
        ]);
        setRecentTickets(ticketsRes.tickets);
        setStats(statsRes);
      } catch (err) {
        console.error('Error loading client dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <HelpDeskLayout
      title={`Bienvenido, ${profile?.full_name}`}
      subtitle={`Empresa: ${profile?.client?.name || 'Cliente Autorizado'} • Portal de Soporte Técnico`}
      actions={
        <Link
          to="/help-desk/tickets/nuevo"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#FF7120] text-black font-['Space_Grotesk'] font-bold text-xs hover:bg-[#FF853A] transition-all shadow-[0_0_20px_rgba(255,113,32,0.4)]"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ NUEVA SOLICITUD</span>
        </Link>
      }
    >
      {/* 1. Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        {/* Abiertos */}
        <div className="p-4 rounded-xl bg-[#0D1219]/90 backdrop-blur-xl border border-amber-500/30 hud-box shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
          <div className="hud-corner-tl"></div>
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <span className="text-[11px] font-mono font-bold uppercase">Abiertos / Por Asignar</span>
            <AlertCircle className="w-4 h-4" />
          </div>
          <div className="text-3xl font-black text-white font-['Space_Grotesk']">
            {loading ? '...' : stats.abiertos}
          </div>
          <span className="text-[10px] font-mono text-slate-400 mt-1 block">
            En cola de revisión por INTEPE
          </span>
        </div>

        {/* En Proceso */}
        <div className="p-4 rounded-xl bg-[#0D1219]/90 backdrop-blur-xl border border-cyan-500/30 hud-box shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
          <div className="hud-corner-tl"></div>
          <div className="flex items-center justify-between text-cyan-400 mb-2">
            <span className="text-[11px] font-mono font-bold uppercase">En Atención Activa</span>
            <Headset className="w-4 h-4" />
          </div>
          <div className="text-3xl font-black text-white font-['Space_Grotesk']">
            {loading ? '...' : stats.enProceso + stats.enRevision}
          </div>
          <span className="text-[10px] font-mono text-slate-400 mt-1 block">
            Con técnico asignado
          </span>
        </div>

        {/* Esperando Respuesta */}
        <div className="p-4 rounded-xl bg-[#0D1219]/90 backdrop-blur-xl border border-purple-500/30 hud-box shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
          <div className="hud-corner-tl"></div>
          <div className="flex items-center justify-between text-purple-400 mb-2">
            <span className="text-[11px] font-mono font-bold uppercase">Esperando su Respuesta</span>
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-3xl font-black text-white font-['Space_Grotesk']">
            {loading ? '...' : stats.esperandoCliente}
          </div>
          <span className="text-[10px] font-mono text-slate-400 mt-1 block">
            Requiere feedback del usuario
          </span>
        </div>

        {/* Resueltos */}
        <div className="p-4 rounded-xl bg-[#0D1219]/90 backdrop-blur-xl border border-emerald-500/30 hud-box shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
          <div className="hud-corner-tl"></div>
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-[11px] font-mono font-bold uppercase">Resueltos / Cerrados</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-3xl font-black text-white font-['Space_Grotesk']">
            {loading ? '...' : stats.resueltos + stats.cerrados}
          </div>
          <span className="text-[10px] font-mono text-slate-400 mt-1 block">
            Casos solucionados
          </span>
        </div>

      </div>

      {/* 2. Recent Tickets Section */}
      <div className="bg-[#0D1219]/90 backdrop-blur-xl border border-white/10 rounded-xl p-5 sm:p-6 mb-8 hud-box shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
        <div className="hud-corner-tl"></div>
        <div className="hud-corner-br"></div>
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
          <div>
            <h2 className="text-lg font-bold text-white font-['Space_Grotesk']">
              Mis Solicitudes Recientes
            </h2>
            <p className="text-xs font-mono text-slate-400">
              Historial de casos radicados por su empresa
            </p>
          </div>
          <Link
            to="/help-desk/tickets"
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>Ver todos los tickets</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs font-mono text-slate-400 space-y-2">
            <div className="w-6 h-6 border-2 border-[#FF7120] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <span>Cargando solicitudes...</span>
          </div>
        ) : recentTickets.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 text-slate-500 mx-auto flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div className="text-sm font-bold text-white font-['Space_Grotesk']">
              No tiene solicitudes de soporte activas
            </div>
            <p className="text-xs font-mono text-slate-400 max-w-sm mx-auto">
              Si presenta alguna novedad o requerimiento técnico en su empresa, puede radicar una nueva solicitud en cualquier momento.
            </p>
            <div className="pt-2">
              <Link
                to="/help-desk/tickets/nuevo"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FF7120] text-black font-bold text-xs hover:bg-[#FF853A]"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Crear Primera Solicitud</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase text-[10px]">
                  <th className="pb-3">Ticket</th>
                  <th className="pb-3">Asunto</th>
                  <th className="pb-3">Categoría</th>
                  <th className="pb-3">Prioridad</th>
                  <th className="pb-3">Estado</th>
                  <th className="pb-3">Técnico</th>
                  <th className="pb-3 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 font-bold text-cyan-400">
                      {ticket.ticket_number}
                    </td>
                    <td className="py-3.5 font-sans font-medium text-white max-w-xs truncate">
                      {ticket.subject}
                    </td>
                    <td className="py-3.5 text-slate-300">
                      {ticket.category?.name || 'General'}
                    </td>
                    <td className="py-3.5">
                      <TicketPriorityBadge priority={ticket.priority} size="sm" />
                    </td>
                    <td className="py-3.5">
                      <TicketStatusBadge status={ticket.status} size="sm" />
                    </td>
                    <td className="py-3.5 text-slate-400">
                      {ticket.assigned_to_profile?.full_name || 'En asignación'}
                    </td>
                    <td className="py-3.5 text-right">
                      <Link
                        to={`/help-desk/tickets/${ticket.id}`}
                        className="px-2.5 py-1 rounded bg-white/5 hover:bg-[#FF7120] hover:text-black text-slate-300 transition-colors text-[11px] font-bold"
                      >
                        Ver Detalle
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 3. Support Policy Banner */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-[#FF7120]/10 via-[#0D1219] to-cyan-500/10 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-sm font-bold text-white font-['Space_Grotesk'] flex items-center gap-2">
            <Headset className="w-4 h-4 text-[#FF7120]" />
            <span>Mesa de Ayuda Empresarial INTEPE</span>
          </div>
          <p className="text-xs font-mono text-slate-400">
            Nivel 1 & 2 disponible de Lunes a Viernes 8:00 AM a 6:00 PM. Casos críticos con escalamiento prioritario.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-cyan-400 font-bold">Línea Directa: (+57) 313 386 2656</span>
        </div>
      </div>

    </HelpDeskLayout>
  );
};
