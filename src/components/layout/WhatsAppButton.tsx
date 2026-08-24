import React from 'react';
import { MessageSquare } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const WhatsAppButton: React.FC = () => {
  const defaultMessage = encodeURIComponent('Hola INTEPE S.A.S., solicito asesoría técnica para mi empresa.');

  return (
    <a
      href={`https://wa.me/${siteConfig.whatsappNumber}?text=${defaultMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 p-3.5 sm:p-4 rounded-lg bg-[#0D131B] border border-emerald-500/40 text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:border-emerald-400 hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center group"
      aria-label="Contactar por WhatsApp a INTEPE S.A.S."
      title="Escríbanos por WhatsApp"
    >
      <div className="hud-corner-tl !border-emerald-400"></div>
      <div className="hud-corner-br !border-emerald-400"></div>
      
      <div className="relative">
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
        <MessageSquare className="w-5 h-5 text-emerald-400" />
      </div>

      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-mono font-bold pl-0 group-hover:pl-2 text-white">
        CHAT DIRECTO
      </span>
    </a>
  );
};
