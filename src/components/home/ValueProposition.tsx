import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Headset, Server, Code2, ArrowRight } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const ValueProposition: React.FC = () => {
  const cards = [
    {
      title: 'Outsourcing TI',
      description: 'Gestión integral de tecnología para garantizar continuidad y productividad en su empresa.',
      icon: Briefcase,
      link: '/outsourcing-ti',
    },
    {
      title: 'Soporte TI & Help Desk',
      description: 'Atención remota y presencial oportuna para mantener a sus colaboradores y sistemas siempre operativos.',
      icon: Headset,
      link: '/help-desk',
    },
    {
      title: 'Infraestructura & Redes',
      description: 'Servidores, redes, virtualización y soluciones cloud configuradas para alta disponibilidad y seguridad.',
      icon: Server,
      link: '/infraestructura-tecnologica',
    },
    {
      title: 'Desarrollo de Software',
      description: 'Sistemas ERP y aplicaciones a la medida adaptadas exactamente a los flujos y procesos de su empresa.',
      icon: Code2,
      link: '/desarrollo-software',
    }
  ];

  return (
    <section className="py-24 bg-[#FDFBF7] border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#F5F0E6] border border-[#E8E2D5] text-stone-800 text-xs font-semibold shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B86B42]"></span>
            <span>Propuesta de Valor Integral</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-950 tracking-tight">
            Un solo aliado para toda su tecnología
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {siteConfig.valueProposition}
          </p>
        </div>

        {/* 4 Concise Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div 
                key={idx}
                className="p-7 rounded-3xl bg-white border border-[#E8E2D5] shadow-xs hover:-translate-y-1 hover:shadow-md hover:border-[#B86B42]/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F5F0E6] border border-[#E8E2D5] flex items-center justify-center text-stone-800 group-hover:bg-[#1F2923] group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-950 tracking-tight group-hover:text-[#B86B42] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-[#F5F0E6]">
                  <Link
                    to={card.link}
                    className="inline-flex items-center text-xs font-bold text-stone-900 hover:text-[#B86B42] group-hover:translate-x-1 transition-all"
                  >
                    <span>Conocer más</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#B86B42]" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
