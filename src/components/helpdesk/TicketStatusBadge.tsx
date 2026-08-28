import React from 'react';
import type { TicketStatus } from '../../types/helpdesk';

interface Props {
  status: TicketStatus;
  size?: 'sm' | 'md';
}

export const TicketStatusBadge: React.FC<Props> = ({ status, size = 'md' }) => {
  const getStyle = () => {
    switch (status) {
      case 'ABIERTO':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'EN_REVISION':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'EN_PROCESO':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'ESPERANDO_CLIENTE':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'RESUELTO':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'CERRADO':
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
      default:
        return 'bg-white/10 text-white border-white/20';
    }
  };

  const getLabel = () => {
    switch (status) {
      case 'ABIERTO':
        return 'Abierto';
      case 'EN_REVISION':
        return 'En Revisión';
      case 'EN_PROCESO':
        return 'En Proceso';
      case 'ESPERANDO_CLIENTE':
        return 'Esperando Respuesta';
      case 'RESUELTO':
        return 'Resuelto';
      case 'CERRADO':
        return 'Cerrado';
      default:
        return status;
    }
  };

  const padClass = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono font-bold rounded border uppercase tracking-wider ${padClass} ${getStyle()}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {getLabel()}
    </span>
  );
};
