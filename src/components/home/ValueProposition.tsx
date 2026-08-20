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
      title: 'Soporte TI',
      description: 'Atención remota y presencial para mantener a sus colaboradores y sistemas siempre productivos.',
      icon: Headset,
      link: '/help-desk',
    },
    {
      title: 'Infraestructura',
      description: 'Servidores, redes, virtualización y soluciones cloud configuradas para alta disponibilidad.',
      icon: Server,
      link: '/infraestructura-tecnologica',
    },
    {
      title: 'Desarrollo de Software',
      description: 'Sistemas personalizados y aplicaciones adaptadas a los flujos y procesos de cada organización.',
      icon: Code2,
      link: '/desarrollo-software',
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-[#D8E1EA]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0077C8] bg-[#EAF5FC] px-3 py-1 rounded-full border border-[#D8E1EA]">
            Propuesta de Valor Integral
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            Un solo aliado para toda su tecnología
          </h2>
          <p className="text-[#243447] text-sm sm:text-base leading-relaxed">
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
                className="p-6 rounded-2xl bg-[#F7F9FC] border border-[#D8E1EA] hover:border-[#0077C8] hover:bg-white hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#D8E1EA] flex items-center justify-center text-[#0077C8] group-hover:bg-[#0077C8] group-hover:text-white transition-colors shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#0B1F3A] tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-[#64748B] text-xs leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="pt-4 mt-2">
                  <Link
                    to={card.link}
                    className="inline-flex items-center text-xs font-bold text-[#0077C8] hover:text-[#0B1F3A] group-hover:translate-x-0.5 transition-all"
                  >
                    <span>Conocer más</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
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
