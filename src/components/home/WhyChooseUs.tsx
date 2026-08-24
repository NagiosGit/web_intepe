import React from 'react';
import { 
  Layers, 
  UserCheck, 
  Code2, 
  Briefcase, 
  TrendingUp,
  CheckCircle2,
  Terminal
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
      desc: 'Desarrollamos herramientas que se adaptan exactamente a sus flujos de trabajo.',
      icon: Code2,
    },
    {
      title: 'Visión empresarial',
      desc: 'Diseñamos tecnología orientada a mejorar la rentabilidad, productividad y seguridad.',
      icon: Briefcase,
    },
    {
      title: 'Evolución constante',
      desc: 'Acompañamos el crecimiento de su empresa con arquitectura tecnológica escalable.',
      icon: TrendingUp,
    }
  ];

  return (
    <section className="py-24 bg-[#080B0E] border-b border-white/10 relative overflow-hidden cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="tech-badge">
            <Terminal className="w-3.5 h-3.5 text-[#FF7120]" />
            <span>PROPUESTA DE VALOR CORPORATIVO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Space_Grotesk']">
            {siteConfig.whyChooseHeadline}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-sans">
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
                className="p-7 rounded-lg cyber-card hud-box space-y-4 group"
              >
                <div className="hud-corner-tl"></div>
                <div className="hud-corner-br"></div>

                <div className="w-10 h-10 rounded bg-[#FF7120]/10 border border-[#FF7120]/30 flex items-center justify-center text-[#FF7120] group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="font-bold text-base text-white font-['Space_Grotesk'] group-hover:text-[#FF853A] transition-colors">
                  {card.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {card.desc}
                </p>

                <div className="pt-2 flex items-center space-x-1.5 text-[11px] text-[#FF853A] font-mono font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7120]" />
                  <span>GARANTÍA INTEPE S.A.S.</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
