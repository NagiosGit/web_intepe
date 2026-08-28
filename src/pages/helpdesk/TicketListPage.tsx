import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ticketService } from '../../services/ticketService';
import { HelpDeskLayout } from '../../components/helpdesk/HelpDeskLayout';
import { TicketStatusBadge } from '../../components/helpdesk/TicketStatusBadge';
import { TicketPriorityBadge } from '../../components/helpdesk/TicketPriorityBadge';
import { 
  Search, 
  PlusCircle, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  RefreshCw
} from 'lucide-react';
import type { Ticket, TicketCategory, TicketStatus, TicketPriority } from '../../types/helpdesk';

export const TicketListPage: React.FC = () => {
  const { profile } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [categories, setCategories] = useState<TicketCategory[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<TicketStatus | 'TODOS'>('TODOS');
  const [priority, setPriority] = useState<TicketPriority | 'TODAS'>('TODAS');
  const [categoryId, setCategoryId] = useState<string | 'TODAS'>('TODAS');
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const loadTickets = async () => {
    setLoading(true);
    try {
      const [ticketsRes, catsRes] = await Promise.all([
        ticketService.getTickets({
          search,
          status,
          priority,
          category_id: categoryId,
          page,
          pageSize,
        }),
        ticketService.getCategories(),
      ]);

      setTickets(ticketsRes.tickets);
      setTotalCount(ticketsRes.totalCount);
      setCategories(catsRes);
    } catch (err) {
      console.error('Error loading tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, [search, status, priority, categoryId, page]);

  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  return (
    <HelpDeskLayout
      title="Bandeja de Solicitudes de Soporte"
      subtitle={profile?.role === 'ADMIN_INTEPE' ? 'Gestión global de todos los tickets empresariales' : `Empresa: ${profile?.client?.name || 'INTEPE S.A.S.'}`}
      actions={
        profile?.role === 'CLIENTE' ? (
          <Link
            to="/help-desk/tickets/nuevo"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#FF7120] text-black font-['Space_Grotesk'] font-bold text-xs hover:bg-[#FF853A] transition-all shadow-[0_0_20px_rgba(255,113,32,0.4)]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ NUEVA SOLICITUD</span>
          </Link>
        ) : null
      }
    >
      {/* 1. Filter Bar */}
      <div className="bg-[#0D1219]/90 backdrop-blur-xl border border-white/10 rounded-xl p-4 mb-6 hud-box space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="hud-corner-tl"></div>
        <div className="hud-corner-br"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Buscar por N° ticket, asunto..."
              className="w-full pl-10 pr-3.5 py-2 rounded-lg bg-[#05070A]/80 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400 placeholder:text-slate-600"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value as any);
                setPage(1);
              }}
              className="w-full px-3 py-2 rounded-lg bg-[#05070A]/80 border border-white/10 text-slate-300 font-mono text-xs focus:outline-none focus:border-cyan-400"
            >
              <option value="TODOS">Todos los Estados</option>
              <option value="ABIERTO">Abiertos</option>
              <option value="EN_REVISION">En Revisión</option>
              <option value="EN_PROCESO">En Proceso</option>
              <option value="ESPERANDO_CLIENTE">Esperando Respuesta</option>
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
              className="w-full px-3 py-2 rounded-lg bg-[#05070A]/80 border border-white/10 text-slate-300 font-mono text-xs focus:outline-none focus:border-[#FF7120]"
            >
              <option value="TODAS">Todas las Prioridades</option>
              <option value="URGENTE">Urgente</option>
              <option value="ALTA">Alta</option>
              <option value="MEDIA">Media</option>
              <option value="BAJA">Baja</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryId}
              onChange={(e) => {
                setCategoryId(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 rounded-lg bg-[#05070A]/80 border border-white/10 text-slate-300 font-mono text-xs focus:outline-none focus:border-cyan-400"
            >
              <option value="TODAS">Todas las Categorías</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Results Counter & Refresh */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] font-mono text-slate-400">
          <div>
            Mostrando <strong className="text-white">{tickets.length}</strong> de <strong className="text-white">{totalCount}</strong> solicitudes
          </div>
          <button
            onClick={loadTickets}
            className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
            <span>Actualizar</span>
          </button>
        </div>
      </div>

      {/* 2. Tickets Table / Card List */}
      <div className="bg-[#0D1219]/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hud-box shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
        <div className="hud-corner-tl"></div>
        <div className="hud-corner-br"></div>
        {loading ? (
          <div className="py-20 text-center text-xs font-mono text-slate-400 space-y-3">
            <div className="w-8 h-8 border-2 border-[#FF7120] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <span>Consultando base de datos segura...</span>
          </div>
        ) : tickets.length === 0 ? (
          <div className="py-16 text-center space-y-3 p-4">
            <FileText className="w-10 h-10 text-slate-600 mx-auto" />
            <div className="text-sm font-bold text-white font-['Space_Grotesk']">
              No se encontraron solicitudes con los filtros aplicados
            </div>
            <p className="text-xs font-mono text-slate-400 max-w-sm mx-auto">
              Intente ajustar los términos de búsqueda o cambiar los filtros de estado y prioridad.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 uppercase text-[10px]">
                  <th className="py-3 px-4">Ticket</th>
                  {profile?.role === 'ADMIN_INTEPE' && <th className="py-3 px-4">Empresa</th>}
                  <th className="py-3 px-4">Asunto / Título</th>
                  <th className="py-3 px-4">Categoría</th>
                  <th className="py-3 px-4">Prioridad</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4">Técnico Responsable</th>
                  <th className="py-3 px-4">Fecha Radicado</th>
                  <th className="py-3 px-4 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-cyan-400 whitespace-nowrap">
                      {ticket.ticket_number}
                    </td>

                    {profile?.role === 'ADMIN_INTEPE' && (
                      <td className="py-3.5 px-4 text-white font-semibold whitespace-nowrap">
                        {ticket.client?.name || 'Cliente'}
                      </td>
                    )}

                    <td className="py-3.5 px-4 font-sans font-medium text-white max-w-xs truncate">
                      {ticket.subject}
                    </td>

                    <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">
                      {ticket.category?.name || 'General'}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <TicketPriorityBadge priority={ticket.priority} size="sm" />
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <TicketStatusBadge status={ticket.status} size="sm" />
                    </td>

                    <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                      {ticket.assigned_to_profile?.full_name ? (
                        <span className="text-slate-200 font-sans font-medium">
                          {ticket.assigned_to_profile.full_name}
                        </span>
                      ) : (
                        <span className="text-amber-400/80 italic font-mono text-[11px]">
                          [Por asignar]
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                      {new Date(ticket.created_at).toLocaleDateString('es-CO', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <Link
                        to={`/help-desk/tickets/${ticket.id}`}
                        className="px-3 py-1 rounded bg-white/5 hover:bg-[#FF7120] hover:text-black text-slate-300 font-bold transition-all text-[11px]"
                      >
                        Abrir Caso
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 3. Pagination Controls */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
            <div>
              Página <strong className="text-white">{page}</strong> de <strong className="text-white">{totalPages}</strong>
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Anterior</span>
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 flex items-center gap-1 cursor-pointer"
              >
                <span>Siguiente</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </HelpDeskLayout>
  );
};
