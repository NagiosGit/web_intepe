import React from 'react';
import { 
  Layers, 
  UserCheck, 
  Code2, 
  Briefcase, 
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const WhyChooseUs: React.FC = () => {
  const cards = [
    {
      title: 'Soluciones integrales',
      desc: 'Centralice soporte, servidores, redes y software en un solo proveedor de confianza.',
      icon: Layers,
    },
    {
      title: 'Atención personalizada',
      desc: 'Soporte técnico cercano y tiempos de respuesta ágiles para su tranquilidad.',
      icon: UserCheck,
    },
    {
      title: 'Software a medida',
      desc: 'Desarrollamos soluciones que se adaptan exactamente a sus procesos, no al revés.',
      icon: Code2,
    },
    {
      title: 'Enfoque empresarial',
      desc: 'Diseñamos tecnología orientada a mejorar la productividad y seguridad de su negocio.',
      icon: Briefcase,
    },
    {
      title: 'Evolución constante',
      desc: 'Acompañamos el crecimiento de su empresa con infraestructura escalable.',
      icon: TrendingUp,
    }
  ];

  return (
    <section className="py-24 bg-[#FDFBF7] border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#F5F0E6] border border-[#E8E2D5] text-stone-800 text-xs font-semibold shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B86B42]"></span>
            <span>Diferencial Competitivo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-950 tracking-tight">
            {siteConfig.whyChooseHeadline}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {siteConfig.whyChooseSubtitle}
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div 
                key={idx}
                className="p-7 rounded-3xl bg-white border border-[#E8E2D5] shadow-xs hover:-translate-y-1 hover:shadow-md hover:border-[#B86B42]/50 transition-all duration-300 space-y-3.5 group"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#F5F0E6] border border-[#E8E2D5] flex items-center justify-center text-stone-800 group-hover:bg-[#1F2923] group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="font-bold text-base text-stone-950 group-hover:text-[#B86B42] transition-colors">
                  {card.title}
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {card.desc}
                </p>

                <div className="pt-2 flex items-center space-x-1.5 text-[11px] text-[#B86B42] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Compromiso garantizado</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
