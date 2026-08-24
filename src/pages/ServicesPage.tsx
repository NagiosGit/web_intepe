import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { DifferentialSection } from '../components/home/DifferentialSection';
import { TrustSLASection } from '../components/home/TrustSLASection';
import { TechEcosystem } from '../components/home/TechEcosystem';
import { servicesData } from '../data/servicesData';
import { Link } from 'react-router-dom';
import { Check, Briefcase, Headset, Server, Wrench, ShieldCheck, Cloud, ArrowRight } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const ServicesPage: React.FC = () => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-[#FF7120]" />;
      case 'Headset': return <Headset className="w-6 h-6 text-cyan-400" />;
      case 'Server': return <Server className="w-6 h-6 text-amber-400" />;
      case 'Wrench': return <Wrench className="w-6 h-6 text-emerald-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-purple-400" />;
      case 'Cloud': return <Cloud className="w-6 h-6 text-blue-400" />;
      default: return <Server className="w-6 h-6 text-[#FF7120]" />;
    }
  };

  return (
    <div className="bg-[#080B0E] text-slate-100">
      <PageHeader
        badge="Portafolio de Servicios"
        title="Soluciones Tecnológicas para su Empresa"
        subtitle="Un portafolio integral de servicios tecnológicos diseñado para mantener, proteger y hacer evolucionar su operación."
        breadcrumbCurrent="Servicios"
      />

      {/* Services Grid */}
      <div className="bg-[#080B0E] border-b border-white/10 py-24 cyber-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, idx) => (
              <div
                key={service.id}
                className="cyber-card rounded-lg p-8 hud-box flex flex-col justify-between group"
              >
                <div className="hud-corner-tl"></div>
                <div className="hud-corner-br"></div>

                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="p-3.5 rounded bg-white/5 border border-white/10 group-hover:scale-105 transition-transform">
                      {renderIcon(service.icon)}
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-white/5 text-[#FF853A] border border-[#FF7120]/30">
                      [0{idx + 1}]
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight font-['Space_Grotesk'] group-hover:text-[#FF853A] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed mt-2 font-sans">
                      {service.fullDescription}
                    </p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-white/10">
                    <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FF7120]">
                      // Alcance Principal:
                    </h4>
                    {service.features.slice(0, 4).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start space-x-2 text-xs text-slate-300 font-sans">
                        <Check className="w-3.5 h-3.5 text-[#FF7120] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <Link
                    to={service.ctaLink}
                    className="btn-cyber-outline text-xs py-2 px-3"
                  >
                    <span>{service.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#FF7120]" />
                  </Link>

                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hola INTEPE S.A.S., deseo cotizar el servicio de ${service.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-slate-400 hover:text-[#FF7120] transition-colors"
                  >
                    WhatsApp →
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <TrustSLASection />
      <DifferentialSection />
      <TechEcosystem />
    </div>
  );
};
