import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { DifferentialSection } from '../components/home/DifferentialSection';
import { servicesData } from '../data/servicesData';
import { Link } from 'react-router-dom';
import { Check, Briefcase, Headset, Server, Wrench, ShieldCheck, Cloud, ArrowRight } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const ServicesPage: React.FC = () => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-stone-700" />;
      case 'Headset': return <Headset className="w-6 h-6 text-stone-700" />;
      case 'Server': return <Server className="w-6 h-6 text-stone-700" />;
      case 'Wrench': return <Wrench className="w-6 h-6 text-[#B86B42]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-stone-700" />;
      case 'Cloud': return <Cloud className="w-6 h-6 text-stone-700" />;
      default: return <Server className="w-6 h-6 text-stone-700" />;
    }
  };

  return (
    <div>
      <PageHeader
        badge="Portafolio de Servicios"
        title="Soluciones tecnológicas para su empresa"
        subtitle="Un portafolio integral de servicios tecnológicos diseñado para mantener, proteger y hacer evolucionar su operación."
        breadcrumbCurrent="Servicios"
      />

      {/* Services Grid on Contrasting #FAF6EE Background */}
      <div className="bg-[#FAF6EE] border-b border-[#E8E2D5] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-3xl p-8 border border-[#E8E2D5] shadow-xs hover:border-[#B86B42]/60 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="p-3.5 rounded-2xl bg-[#F5F0E6] border border-[#E8E2D5] group-hover:bg-[#1F2923] group-hover:text-white transition-colors">
                      {renderIcon(service.icon)}
                    </div>
                    {service.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F5F0E6] text-stone-800 border border-[#E8E2D5]">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-stone-950 tracking-tight group-hover:text-[#B86B42] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-stone-600 text-xs leading-relaxed mt-2">
                      {service.fullDescription}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-[#F5F0E6]">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-700">
                      Alcance principal:
                    </h4>
                    {service.features.slice(0, 4).map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-stone-800">
                        <Check className="w-3.5 h-3.5 text-[#B86B42] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#F5F0E6] flex items-center justify-between">
                  <Link
                    to={service.ctaLink}
                    className="inline-flex items-center text-xs font-bold text-stone-900 hover:text-[#B86B42] transition-colors"
                  >
                    <span>{service.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#B86B42]" />
                  </Link>

                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hola INTEPE S.A.S., deseo cotizar el servicio de ${service.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-stone-500 hover:text-stone-900 underline"
                  >
                    Cotizar por WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Differential Section (Deep Forest Contrast) */}
      <DifferentialSection />
    </div>
  );
};
