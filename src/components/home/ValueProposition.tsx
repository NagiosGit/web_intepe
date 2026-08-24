import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Headset, Server, Code2, ArrowRight, Terminal } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const ValueProposition: React.FC = () => {
  const cards = [
    {
      title: 'Outsourcing TI',
      description: 'Gestión integral de sistemas para garantizar continuidad y máxima productividad en su empresa.',
      icon: Briefcase,
      link: '/outsourcing-ti',
      tag: 'GESTIÓN TOTAL'
    },
    {
      title: 'Help Desk & Soporte',
      description: 'Atención remota y presencial oportuna para mantener a sus colaboradores siempre operativos.',
      icon: Headset,
      link: '/help-desk',
      tag: 'NIVELES L1-L3'
    },
    {
      title: 'Infraestructura & Redes',
      description: 'Servidores, switches, virtualización y soluciones cloud configuradas para alta disponibilidad.',
      icon: Server,
      link: '/infraestructura-tecnologica',
      tag: 'SEGURIDAD & NUBE'
    },
    {
      title: 'Desarrollo de Software',
      description: 'Sistemas web, plataformas ERP y aplicaciones a medida adaptadas a sus procesos.',
      icon: Code2,
      link: '/desarrollo-software',
      tag: '100% A MEDIDA'
    }
  ];

  return (
    <section className="py-24 bg-[#080B0E] border-b border-white/10 relative overflow-hidden cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="tech-badge">
            <Terminal className="w-3.5 h-3.5 text-[#FF7120]" />
            <span>INTEGRACIÓN TECNOLÓGICA END-TO-END</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Space_Grotesk']">
            Un Solo Aliado para <span className="text-[#FF7120]">Toda su Tecnología</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-sans">
            {siteConfig.valueProposition}
          </p>
        </div>

        {/* 4 Concise Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link
                key={idx}
                to={card.link}
                className="p-7 rounded-lg cyber-card hud-box flex flex-col justify-between group space-y-4"
              >
                <div className="hud-corner-tl"></div>
                <div className="hud-corner-br"></div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded bg-[#FF7120]/10 border border-[#FF7120]/30 flex items-center justify-center text-[#FF7120] group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-mono font-bold text-[#FF853A] border border-[#FF7120]/20 bg-white/5 px-2 py-0.5 rounded">
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-white font-['Space_Grotesk'] group-hover:text-[#FF853A] transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {card.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono font-bold text-[#FF7120] group-hover:translate-x-1 transition-transform">
                  <span>EXPLORAR SERVICIO</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};
