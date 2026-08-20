import React from 'react';
import { Link } from 'react-router-dom';
import { softwareCapabilities } from '../../data/softwareData';
import { 
  Globe, 
  Cpu, 
  Layers, 
  Smartphone, 
  Zap, 
  GitBranch, 
  ArrowRight, 
  Code2
} from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

interface SoftwareSectionProps {
  showHeader?: boolean;
  bgClass?: string;
}

export const SoftwareSection: React.FC<SoftwareSectionProps> = ({
  showHeader = true,
  bgClass = 'bg-[#FAF6EE]'
}) => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-5 h-5 text-stone-700" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-[#B86B42]" />;
      case 'Layers': return <Layers className="w-5 h-5 text-stone-700" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-[#B86B42]" />;
      case 'Zap': return <Zap className="w-5 h-5 text-[#B86B42]" />;
      case 'GitBranch': return <GitBranch className="w-5 h-5 text-stone-700" />;
      default: return <Code2 className="w-5 h-5 text-stone-700" />;
    }
  };

  return (
    <section className={`border-b border-[#E8E2D5] relative overflow-hidden ${bgClass} ${showHeader ? 'py-24' : 'py-16'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        {showHeader && (
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white border border-[#E8E2D5] text-stone-800 text-xs font-semibold shadow-2xs">
              <Code2 className="w-3.5 h-3.5 text-[#B86B42]" />
              <span>Desarrollo de Software a Medida</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-950 tracking-tight">
              {siteConfig.softwareHeadline}
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {siteConfig.softwareSubtitle}
            </p>
          </div>
        )}

        {/* 6 Capabilities Grid (White Cards on Warm Background) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {softwareCapabilities.map((cap) => (
            <div 
              key={cap.id}
              className="p-7 rounded-3xl bg-white border border-[#E8E2D5] hover:-translate-y-1 hover:shadow-md hover:border-[#B86B42]/50 transition-all duration-300 space-y-3 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-2xl bg-[#F5F0E6] border border-[#E8E2D5] flex items-center justify-center shadow-2xs group-hover:bg-[#1F2923] group-hover:text-white transition-colors">
                  {renderIcon(cap.icon)}
                </div>
                <h3 className="text-base font-bold text-stone-950 group-hover:text-[#B86B42] transition-colors">
                  {cap.title}
                </h3>
                <p className="text-stone-600 text-xs leading-relaxed">
                  {cap.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Banner in Warm Deep Forest */}
        <div className="rounded-3xl bg-[#1F2923] text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-stone-800">
          <div className="space-y-1.5 text-center md:text-left max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              ¿Tiene un proceso operativo que necesita digitalizar?
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Analizamos sus requerimientos para estructurar una propuesta técnica y económica adaptada a su empresa.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <Link
              to="/contacto"
              className="px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-center text-stone-900 bg-[#FDFBF7] hover:bg-[#FAF6EE] transition-all flex items-center justify-center space-x-2 shadow-sm"
            >
              <span>Solicitar proyecto de software</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B86B42]" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
