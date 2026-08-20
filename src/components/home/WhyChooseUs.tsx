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
      accent: '#0077C8'
    },
    {
      title: 'Atención personalizada',
      desc: 'Soporte técnico cercano y tiempos de respuesta ágiles para su tranquilidad.',
      icon: UserCheck,
      accent: '#0077C8'
    },
    {
      title: 'Software a medida',
      desc: 'Desarrollamos soluciones que se adaptan exactamente a sus procesos, no al revés.',
      icon: Code2,
      accent: '#B86F4B'
    },
    {
      title: 'Enfoque empresarial',
      desc: 'Diseñamos tecnología orientada a mejorar la productividad y seguridad de su negocio.',
      icon: Briefcase,
      accent: '#0077C8'
    },
    {
      title: 'Evolución constante',
      desc: 'Acompañamos el crecimiento de su empresa con infraestructura escalable.',
      icon: TrendingUp,
      accent: '#B86F4B'
    }
  ];

  return (
    <section className="py-24 bg-[#F7F9FC] border-b border-[#D8E1EA]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0077C8] bg-[#EAF5FC] px-3 py-1 rounded-full border border-[#D8E1EA]">
            Diferencial Competitivo
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            {siteConfig.whyChooseHeadline}
          </h2>
          <p className="text-[#243447] text-sm sm:text-base">
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
                className="p-7 rounded-2xl bg-white border border-[#D8E1EA] hover:border-[#0077C8] hover:shadow-md transition-all duration-200 space-y-3.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F7F9FC] border border-[#D8E1EA] flex items-center justify-center group-hover:bg-[#EAF5FC] transition-colors">
                  <Icon className="w-5 h-5" style={{ color: card.accent }} />
                </div>

                <h3 className="font-bold text-base text-[#0B1F3A] group-hover:text-[#0077C8] transition-colors">
                  {card.title}
                </h3>

                <p className="text-xs text-[#64748B] leading-relaxed">
                  {card.desc}
                </p>

                <div className="pt-2 flex items-center space-x-1.5 text-[11px] text-[#0077C8] font-semibold">
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
