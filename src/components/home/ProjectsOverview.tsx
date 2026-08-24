import React from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../../data/projectsData';
import type { Project } from '../../types';
import { Sprout, Layers, Building2, ArrowRight, CheckCircle2, ExternalLink, Terminal } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

interface ProjectsOverviewProps {
  showHeader?: boolean;
  isFullPage?: boolean;
}

export const ProjectsOverview: React.FC<ProjectsOverviewProps> = ({
  showHeader = true,
  isFullPage = false
}) => {
  const getProjectIcon = (iconType: string) => {
    switch (iconType) {
      case 'Sprout': return <Sprout className="w-5 h-5 text-emerald-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-cyan-400" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-[#FF7120]" />;
      default: return <Layers className="w-5 h-5 text-[#FF7120]" />;
    }
  };

  return (
    <section className={`bg-[#080B0E] border-b border-white/10 relative overflow-hidden cyber-grid ${showHeader ? 'py-24' : 'py-16'}`}>
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[400px] bg-[#FF7120]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        {showHeader && (
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="tech-badge">
              <Terminal className="w-3.5 h-3.5 text-[#FF7120]" />
              <span>CASOS DE ESTUDIO & SOFTWARE PROPIO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Space_Grotesk']">
              {siteConfig.projectsHeadline}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-sans">
              {siteConfig.projectsSubtitle}
            </p>
          </div>
        )}

        {/* Real Projects Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projectsData.map((proj: Project) => (
            <div 
              key={proj.id}
              className="cyber-card rounded-lg hud-box flex flex-col justify-between overflow-hidden group"
            >
              <div className="hud-corner-tl"></div>
              <div className="hud-corner-tr"></div>
              <div className="hud-corner-bl"></div>
              <div className="hud-corner-br"></div>

              {/* Image Preview Header */}
              {proj.image && (
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950 border-b border-white/10">
                  <img 
                    src={proj.image} 
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1219] via-[#0D1219]/40 to-transparent"></div>
                  
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="w-9 h-9 rounded bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-md">
                      {getProjectIcon(proj.icon)}
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-black/75 text-[#FF853A] border border-[#FF7120]/40 backdrop-blur-md">
                      {proj.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-xl font-black text-white font-['Space_Grotesk'] drop-shadow-md">
                      {proj.title}
                    </h3>
                  </div>
                </div>
              )}

              {/* Card Body */}
              <div className="p-7 flex flex-col justify-between flex-1 space-y-5">
                <div className="space-y-4">
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                    {proj.description}
                  </p>

                  {/* Key Features */}
                  <div className="space-y-2 pt-3 border-t border-white/10">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FF7120] block">
                      // Capacidades Clave:
                    </span>
                    {proj.features.slice(0, 3).map((feat: string, idx: number) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300 font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FF7120] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div className="pt-5 border-t border-white/10 flex items-center justify-between">
                  <Link
                    to={`/proyectos/${proj.slug}`}
                    className="inline-flex items-center text-xs font-mono font-bold text-white hover:text-[#FF853A] group-hover:translate-x-1 transition-all"
                  >
                    <span>FICHA TÉCNICA</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-[#FF7120]" />
                  </Link>

                  {proj.demoUrl && (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-[11px] font-mono font-bold text-slate-300 hover:text-[#FF7120] bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded border border-white/10 transition-colors"
                    >
                      <span>DEMO EN VIVO</span>
                      <ExternalLink className="w-3 h-3 text-[#FF7120]" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        {!isFullPage && (
          <div className="mt-14 text-center">
            <Link
              to="/proyectos"
              className="btn-cyber-outline text-xs"
            >
              <span>VER CATÁLOGO COMPLETO DE PROYECTOS</span>
              <ArrowRight className="w-4 h-4 text-[#FF7120]" />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
};
