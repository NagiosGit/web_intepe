import React from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../../data/projectsData';
import type { Project } from '../../types';
import { Sprout, Layers, Building2, ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react';
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
      case 'Sprout': return <Sprout className="w-5 h-5 text-[#B86B42]" />;
      case 'Layers': return <Layers className="w-5 h-5 text-stone-700" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-stone-900" />;
      default: return <Layers className="w-5 h-5 text-stone-700" />;
    }
  };

  return (
    <section className={`bg-[#F5F0E6] border-b border-[#E8E2D5] relative ${showHeader ? 'py-24' : 'py-16'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        {showHeader && (
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white border border-[#E8E2D5] text-stone-800 text-xs font-semibold shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B86B42]"></span>
              <span>Experiencia & Soluciones Comprobadas</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-950 tracking-tight">
              {siteConfig.projectsHeadline}
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {siteConfig.projectsSubtitle}
            </p>
          </div>
        )}

        {/* 3 Real Projects Cards con Imagen Superior */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projectsData.map((proj: Project) => (
            <div 
              key={proj.id}
              className="bg-white rounded-3xl border border-[#E8E2D5] shadow-xs hover:-translate-y-1 hover:shadow-lg hover:border-[#B86B42]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Image Preview Header */}
              {proj.image && (
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-900">
                  <img 
                    src={proj.image} 
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center shadow-md">
                      {getProjectIcon(proj.icon)}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/95 text-[#B86B42] shadow-sm backdrop-blur-md">
                      {proj.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-xl font-black text-white drop-shadow-md">
                      {proj.title}
                    </h3>
                  </div>
                </div>
              )}

              {/* Card Body */}
              <div className="p-7 flex flex-col justify-between flex-1 space-y-5">
                <div className="space-y-4">
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Key Real Features */}
                  <div className="space-y-2 pt-3 border-t border-[#F5F0E6]">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block">
                      Capacidades implementadas:
                    </span>
                    {proj.features.slice(0, 3).map((feat: string, idx: number) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-stone-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#B86B42] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div className="pt-5 border-t border-[#F5F0E6] flex items-center justify-between">
                  <Link
                    to={`/proyectos/${proj.slug}`}
                    className="inline-flex items-center text-xs font-bold text-stone-900 hover:text-[#B86B42] group-hover:translate-x-1 transition-all"
                  >
                    <span>Ver ficha técnica</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-[#B86B42]" />
                  </Link>

                  {proj.demoUrl && (
                    <a
                      href={proj.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-[11px] font-semibold text-stone-700 hover:text-[#B86B42] bg-[#FAF6EE] px-2.5 py-1 rounded-lg border border-[#E8E2D5]"
                    >
                      <span>Demo en vivo</span>
                      <ExternalLink className="w-3 h-3 text-[#B86B42]" />
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
              className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-stone-900 hover:text-[#B86B42] transition-colors"
            >
              <span>Conozca todos los proyectos desarrollados por INTEPE</span>
              <ArrowRight className="w-4 h-4 text-[#B86B42]" />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
};
