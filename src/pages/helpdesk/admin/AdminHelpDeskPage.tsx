import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ticketService } from '../../../services/ticketService';
import { clientService } from '../../../services/clientService';
import { technicianService } from '../../../services/technicianService';
import { HelpDeskLayout } from '../../../components/helpdesk/HelpDeskLayout';
import { TicketStatusBadge } from '../../../components/helpdesk/TicketStatusBadge';
import { TicketPriorityBadge } from '../../../components/helpdesk/TicketPriorityBadge';
import { 
  Search, 
  Building2, 
  Wrench, 
  RefreshCw
} from 'lucide-react';
import type { Ticket, Client, Profile, TicketStatus, TicketPriority } from '../../../types/helpdesk';

export const AdminHelpDeskPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [technicians, setTechnicians] = useState<Profile[]>([]);
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

  // Filters
  const [search, setSearch] = useState('');
  const [clientId, setClientId] = useState<string | 'TODOS'>('TODOS');
  const [technicianId, setTechnicianId] = useState<string | 'TODOS'>('TODOS');
  const [status, setStatus] = useState<TicketStatus | 'TODOS'>('TODOS');
  const [priority, setPriority] = useState<TicketPriority | 'TODAS'>('TODAS');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const loadData = async () => {
    setLoading(true);
    try {
      const [ticketsRes, statsRes, clientsRes, techsRes] = await Promise.all([
        ticketService.getTickets({
          search,
          client_id: clientId,
          assigned_to: technicianId,
          status,
          priority,
          page,
          pageSize: 20,
        }),
        ticketService.getTicketStats(),
        clientService.getClients(),
        technicianService.getTechnicians(false),
      ]);

      setTickets(ticketsRes.tickets);
      setTotalCount(ticketsRes.totalCount);
      setStats(statsRes);
      setClients(clientsRes);
      setTechnicians(techsRes);
    } catch (err) {
      console.error('Error loading admin helpdesk data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [search, clientId, technicianId, status, priority, page]);

  return (
    <HelpDeskLayout
      title="Centro de Control & Mesa de Ayuda"
      subtitle="Supervisión general, asignación técnica y gestión multi-empresa de INTEPE S.A.S."
      actions={
        <div className="flex items-center gap-2">
          <Link
            to="/admin/clientes"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-mono text-xs hover:bg-white/10"
          >
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Empresas ({clients.length})</span>
          </Link>
          <Link
            to="/admin/tecnicos"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-mono text-xs hover:bg-white/10"
          >
            <Wrench className="w-3.5 h-3.5 text-[#FF7120]" />
            <span>Técnicos ({technicians.length})</span>
          </Link>
        </div>
      }
    >
      {/* 1. Global KPI Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        
        {/* Abiertos */}
        <div className="p-3.5 rounded-xl bg-[#0D1219]/90 backdrop-blur-xl border border-amber-500/30 hud-box shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
          <div className="hud-corner-tl"></div>
          <div className="text-[10px] font-mono text-amber-400 font-bold uppercase mb-1">
            Abiertos
          </div>
          <div className="text-2xl font-black text-white font-['Space_Grotesk']">
            {stats.abiertos}
          </div>
        </div>

        {/* En Revisión */}
        <div className="p-3.5 rounded-xl bg-[#0D1219]/90 backdrop-blur-xl border border-cyan-500/30 hud-box shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
          <div className="hud-corner-tl"></div>
          <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase mb-1">
            En Revisión
          </div>
          <div className="text-2xl font-black text-white font-['Space_Grotesk']">
            {stats.enRevision}
          </div>
        </div>

        {/* En Proceso */}
        <div className="p-3.5 rounded-xl bg-[#0D1219]/90 backdrop-blur-xl border border-blue-500/30 hud-box shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
          <div className="hud-corner-tl"></div>
          <div className="text-[10px] font-mono text-blue-400 font-bold uppercase mb-1">
            En Proceso
          </div>
          <div className="text-2xl font-black text-white font-['Space_Grotesk']">
            {stats.enProceso}
          </div>
        </div>

        {/* Esperando Cliente */}
        <div className="p-3.5 rounded-xl bg-[#0D1219]/90 backdrop-blur-xl border border-purple-500/30 hud-box shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
          <div className="hud-corner-tl"></div>
          <div className="text-[10px] font-mono text-purple-400 font-bold uppercase mb-1">
            Esperando Cliente
          </div>
          <div className="text-2xl font-black text-white font-['Space_Grotesk']">
            {stats.esperandoCliente}
          </div>
        </div>

        {/* Urgentes */}
        <div className="p-3.5 rounded-xl bg-[#0D1219]/90 backdrop-blur-xl border border-red-500/30 hud-box shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
          <div className="hud-corner-tl"></div>
          <div className="text-[10px] font-mono text-red-400 font-bold uppercase mb-1">
            Urgentes
          </div>
          <div className="text-2xl font-black text-white font-['Space_Grotesk']">
            {stats.urgentes}
          </div>
        </div>

        {/* Resueltos / Total */}
        <div className="p-3.5 rounded-xl bg-[#0D1219]/90 backdrop-blur-xl border border-emerald-500/30 hud-box shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
          <div className="hud-corner-tl"></div>
          <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase mb-1">
            Resueltos / Total
          </div>
          <div className="text-2xl font-black text-white font-['Space_Grotesk']">
            {stats.resueltos} <span className="text-xs text-slate-500">/ {stats.totales}</span>
          </div>
        </div>

      </div>

      {/* 2. Global Filter Controls */}
      <div className="bg-[#0D1219]/90 backdrop-blur-xl border border-white/10 rounded-xl p-4 mb-6 hud-box space-y-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="hud-corner-tl"></div>
        <div className="hud-corner-br"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Buscar N° ticket, asunto..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#05070A]/80 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Client Filter */}
          <div>
            <select
              value={clientId}
              onChange={(e) => {
                setClientId(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-1.5 rounded-lg bg-[#05070A]/80 border border-white/10 text-slate-300 font-mono text-xs focus:outline-none focus:border-cyan-400"
            >
              <option value="TODOS">Todas las Empresas</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Technician Filter */}
          <div>
            <select
              value={technicianId}
              onChange={(e) => {
                setTechnicianId(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-1.5 rounded-lg bg-[#05070A]/80 border border-white/10 text-slate-300 font-mono text-xs focus:outline-none focus:border-[#FF7120]"
            >
              <option value="TODOS">Todos los Técnicos</option>
              {technicians.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.full_name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value as any);
                setPage(1);
              }}
              className="w-full px-3 py-1.5 rounded-lg bg-[#05070A]/80 border border-white/10 text-slate-300 font-mono text-xs focus:outline-none focus:border-cyan-400"
            >
              <option value="TODOS">Todos los Estados</option>
              <option value="ABIERTO">Abiertos</option>
              <option value="EN_REVISION">En Revisión</option>
              <option value="EN_PROCESO">En Proceso</option>
              <option value="ESPERANDO_CLIENTE">Esperando Cliente</option>
              <option value="RESUELTO">Resueltos</option>
              <option value="CERRADO">Cerrados</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <select
              value={priority}
              onChange={(e) => {
                setPriority(e.target.value as any);
                setPage(1);
              }}
              className="w-full px-3 py-1.5 rounded-lg bg-[#05070A]/80 border border-white/10 text-slate-300 font-mono text-xs focus:outline-none focus:border-[#FF7120]"
            >
              <option value="TODAS">Todas las Prioridades</option>
              <option value="URGENTE">Urgente</option>
              <option value="ALTA">Alta</option>
              <option value="MEDIA">Media</option>
              <option value="BAJA">Baja</option>
            </select>
          </div>

        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] font-mono text-slate-400">
          <div>
            Total filtrados: <strong className="text-white">{tickets.length}</strong> de <strong className="text-white">{totalCount}</strong>
          </div>
          <button
            onClick={loadData}
            className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
            <span>Actualizar</span>
          </button>
        </div>
      </div>

      {/* 3. Global Tickets Table */}
      <div className="bg-[#0D1219]/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hud-box shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
        <div className="hud-corner-tl"></div>
        <div className="hud-corner-br"></div>
        {loading ? (
          <div className="py-20 text-center text-xs font-mono text-slate-400 space-y-3">
            <div className="w-8 h-8 border-2 border-[#FF7120] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <span>Cargando tickets de todas las empresas...</span>
          </div>
        ) : tickets.length === 0 ? (
          <div className="py-16 text-center text-xs font-mono text-slate-500">
            No se encontraron tickets con los criterios seleccionados.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 uppercase text-[10px]">
                  <th className="py-3 px-4">Ticket</th>
                  <th className="py-3 px-4">Empresa</th>
                  <th className="py-3 px-4">Solicitante</th>
                  <th className="py-3 px-4">Asunto</th>
                  <th className="py-3 px-4">Prioridad</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4">Técnico Asignado</th>
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
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {ticket.assigned_to_profile ? (
                        <span className="text-slate-200 font-sans font-medium">
                          {ticket.assigned_to_profile.full_name}
                        </span>
                      ) : (
                        <span className="text-amber-400/80 italic font-mono text-[11px]">
                          [Por asignar]
                        </span>
                      )}
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
                        className="px-3 py-1 rounded bg-[#FF7120] text-black font-bold hover:bg-[#FF853A] transition-all text-[11px]"
                      >
                        Gestionar
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
