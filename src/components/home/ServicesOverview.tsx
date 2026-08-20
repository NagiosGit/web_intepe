import React from 'react';
import { Link } from 'react-router-dom';
import { servicesData } from '../../data/servicesData';
import { 
  Briefcase, 
  Headset, 
  Server, 
  Wrench, 
  ShieldCheck, 
  Cloud, 
  Check,
  ArrowRight
} from 'lucide-react';

export const ServicesOverview: React.FC = () => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-[#0077C8]" />;
      case 'Headset': return <Headset className="w-5 h-5 text-[#0077C8]" />;
      case 'Server': return <Server className="w-5 h-5 text-[#0077C8]" />;
      case 'Wrench': return <Wrench className="w-5 h-5 text-[#B86F4B]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-[#0077C8]" />;
      case 'Cloud': return <Cloud className="w-5 h-5 text-[#0077C8]" />;
      default: return <Server className="w-5 h-5 text-[#0077C8]" />;
    }
  };

  return (
    <section className="py-24 bg-[#F7F9FC] border-b border-[#D8E1EA]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0077C8] bg-[#EAF5FC] px-3 py-1 rounded-full border border-[#D8E1EA]">
            Portafolio Corporativo
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            Soluciones tecnológicas para su empresa
          </h2>
          <p className="text-[#243447] text-sm sm:text-base">
            Un portafolio integral de servicios tecnológicos diseñado para mantener, proteger y hacer evolucionar su operación.
          </p>
        </div>

        {/* Services Grid (6 cards with subtle terracotta microinteraction on hover) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => (
            <div 
              key={service.id}
              className="bg-white rounded-2xl p-7 border border-[#D8E1EA] hover:border-[#0077C8] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle top indicator on hover: transitions to terracotta */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-gradient-to-r group-hover:from-[#0077C8] group-hover:to-[#B86F4B] transition-all"></div>

              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="p-2.5 rounded-xl bg-[#F7F9FC] border border-[#D8E1EA] group-hover:bg-[#EAF5FC] group-hover:border-[#0077C8]/40 transition-colors">
                    {renderIcon(service.icon)}
                  </div>
                  {service.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#EAF5FC] text-[#0077C8] border border-[#D8E1EA]">
                      {service.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#0B1F3A] tracking-tight group-hover:text-[#0077C8] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[#64748B] text-xs leading-relaxed mt-1.5">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Concise features list */}
                <div className="space-y-1.5 pt-2 border-t border-[#EAF5FC]">
                  {service.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-[#243447]">
                      <Check className="w-3.5 h-3.5 text-[#0077C8] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-[#EAF5FC]">
                <Link
                  to={service.ctaLink}
                  className="inline-flex items-center text-xs font-bold text-[#0077C8] hover:text-[#0B1F3A] group-hover:translate-x-0.5 transition-all"
                >
                  <span>{service.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#0077C8] group-hover:text-[#B86F4B] transition-colors" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
