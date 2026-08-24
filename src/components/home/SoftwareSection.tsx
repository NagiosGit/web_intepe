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
  Code2,
  Terminal
} from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

interface SoftwareSectionProps {
  showHeader?: boolean;
  bgClass?: string;
}

export const SoftwareSection: React.FC<SoftwareSectionProps> = ({
  showHeader = true,
  bgClass = 'bg-[#080B0E]'
}) => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-5 h-5 text-cyan-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-[#FF7120]" />;
      case 'Layers': return <Layers className="w-5 h-5 text-purple-400" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-emerald-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'GitBranch': return <GitBranch className="w-5 h-5 text-[#FF7120]" />;
      default: return <Code2 className="w-5 h-5 text-[#FF7120]" />;
    }
  };

  return (
    <section className={`border-b border-white/10 relative overflow-hidden ${bgClass} ${showHeader ? 'py-24' : 'py-16'}`}>
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#FF7120]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        {showHeader && (
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="tech-badge">
              <Terminal className="w-3.5 h-3.5 text-[#FF7120]" />
              <span>INGENIERÍA & DESARROLLO IN-HOUSE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Space_Grotesk']">
              {siteConfig.softwareHeadline}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-sans">
              {siteConfig.softwareSubtitle}
            </p>
          </div>
        )}

        {/* 6 Capabilities Grid Cyber Dark */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {softwareCapabilities.map((cap, idx) => (
            <div 
              key={cap.id}
              className="p-7 rounded-lg cyber-card hud-box space-y-4 flex flex-col justify-between group"
            >
              <div className="hud-corner-tl"></div>
              <div className="hud-corner-br"></div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {renderIcon(cap.icon)}
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-500">
                    [0{idx + 1}]
                  </span>
                </div>
                <h3 className="text-base font-bold text-white font-['Space_Grotesk'] group-hover:text-[#FF853A] transition-colors">
                  {cap.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed font-sans">
                  {cap.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Cyber Action Banner */}
        <div className="rounded-lg cyber-card p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 hud-box border border-[#FF7120]/30 shadow-[0_0_30px_rgba(255,113,32,0.15)]">
          <div className="hud-corner-tl !border-[#FF7120]"></div>
          <div className="hud-corner-tr !border-[#FF7120]"></div>
          <div className="hud-corner-bl !border-[#FF7120]"></div>
          <div className="hud-corner-br !border-[#FF7120]"></div>

          <div className="space-y-2 text-center md:text-left max-w-xl">
            <span className="text-xs font-mono font-bold text-[#FF7120] uppercase tracking-wider block">
              // CONSULTORÍA DE DIGITALIZACIÓN
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight font-['Space_Grotesk']">
              ¿Tiene un proceso operativo que necesita sistematizar?
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
              Estructuramos la arquitectura técnica, base de datos y roadmap para desarrollar su herramienta a la medida.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <Link
              to="/contacto"
              className="btn-cyber-primary text-xs"
            >
              <span>SOLICITAR PROYECTO</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
