import React from 'react';
import type { TicketPriority } from '../../types/helpdesk';
import { AlertCircle, AlertTriangle, ArrowDown, Flame } from 'lucide-react';

interface Props {
  priority: TicketPriority;
  size?: 'sm' | 'md';
}

export const TicketPriorityBadge: React.FC<Props> = ({ priority, size = 'md' }) => {
  const getStyle = () => {
    switch (priority) {
      case 'URGENTE':
        return {
          css: 'bg-red-500/15 text-red-400 border-red-500/40 font-black animate-pulse',
          icon: Flame,
          label: 'Urgente',
        };
      case 'ALTA':
        return {
          css: 'bg-[#FF7120]/15 text-[#FF853A] border-[#FF7120]/40 font-bold',
          icon: AlertCircle,
          label: 'Alta',
        };
      case 'MEDIA':
        return {
          css: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 font-semibold',
          icon: AlertTriangle,
          label: 'Media',
        };
      case 'BAJA':
        return {
          css: 'bg-slate-500/10 text-slate-400 border-slate-500/30 font-normal',
          icon: ArrowDown,
          label: 'Baja',
        };
      default:
        return {
          css: 'bg-white/10 text-white border-white/20',
          icon: AlertCircle,
          label: priority,
        };
    }
  };

  const { css, icon: Icon, label } = getStyle();
  const padClass = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1 font-mono rounded border uppercase tracking-wider ${padClass} ${css}`}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      {label}
    </span>
  );
};
