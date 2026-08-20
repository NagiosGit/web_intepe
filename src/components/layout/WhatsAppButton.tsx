import React from 'react';
import { MessageSquare } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const WhatsAppButton: React.FC = () => {
  const defaultMessage = encodeURIComponent('Hola INTEPE, estoy interesado en conocer sus soluciones tecnológicas.');

  return (
    <a
      href={`https://wa.me/${siteConfig.whatsappNumber}?text=${defaultMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 p-3.5 sm:p-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center group"
      aria-label="Contactar por WhatsApp a INTEPE S.A.S."
      title="Escríbanos por WhatsApp"
    >
      <MessageSquare className="w-6 h-6" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-2">
        WhatsApp INTEPE
      </span>
    </a>
  );
};
