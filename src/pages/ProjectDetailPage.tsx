import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import { PageHeader } from '../components/common/PageHeader';
import { 
  CheckCircle2, 
  Layers, 
  ArrowRight, 
  Sparkles,
  Sprout,
  Building2,
  ExternalLink,
  Cpu
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return <Navigate to="/proyectos" replace />;
  }

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sprout': return <Sprout className="w-8 h-8 text-[#B86B42]" />;
      case 'Layers': return <Layers className="w-8 h-8 text-stone-700" />;
      case 'Building2': return <Building2 className="w-8 h-8 text-stone-900" />;
      default: return <Layers className="w-8 h-8 text-stone-700" />;
    }
  };

  return (
    <div>
      <PageHeader
        badge={project.category}
        title={project.title}
        subtitle={project.tagline}
        breadcrumbCurrent={`Proyectos / ${project.title}`}
      />

      {/* 1. Main Project Details (Clean Ivory / Cream Background) */}
      <div className="bg-[#FDFBF7] py-24 border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Description, Modules & Highlights */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-[#E8E2D5] inline-block shadow-2xs">
                    {renderIcon(project.icon)}
                  </div>

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold text-stone-900 bg-[#FAF6EE] hover:bg-[#F5F0E6] border border-[#E8E2D5] shadow-2xs transition-all"
                    >
                      <span>Probar App en Vivo</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#B86B42]" />
                    </a>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-950 tracking-tight">
                  Descripción y Alcance de la Solución
                </h2>

                {project.image && (
                  <div className="rounded-3xl overflow-hidden border border-[#E8E2D5] shadow-xs relative h-64 sm:h-72 w-full bg-stone-900 my-4">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[11px] font-bold uppercase tracking-wider bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20">
                        {project.category}
                      </span>
                    </div>
                  </div>
                )}

                <p className="text-stone-700 text-base leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>

              {/* Modules Grid if available */}
              {project.modules && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-stone-950 flex items-center">
                    <Cpu className="w-5 h-5 mr-2 text-[#B86B42]" />
                    Módulos de la Plataforma
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.modules.map((mod, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-white border border-[#E8E2D5] space-y-1 shadow-2xs">
                        <h4 className="font-bold text-xs text-stone-900">{mod.name}</h4>
                        <p className="text-[11px] text-stone-600 leading-relaxed">{mod.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights */}
              <div className="p-7 rounded-3xl bg-[#FAF6EE] border border-[#E8E2D5] space-y-3">
                <h3 className="font-bold text-stone-950 text-base flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-[#B86B42]" />
                  Impacto y Resultados Clave:
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-700">
                  {project.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-[#B86B42] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Target Audience */}
              <div className="p-6 rounded-2xl bg-white border border-[#E8E2D5] space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Sector o Perfil de Aplicación:
                </h4>
                <p className="text-stone-900 text-sm font-medium">
                  {project.targetAudience}
                </p>
              </div>
            </div>

            {/* Right Column: Features Checklist & Action */}
            <div className="lg:col-span-5 bg-[#FAF6EE] p-8 rounded-3xl border border-[#E8E2D5] shadow-xs space-y-6 sticky top-28">
              <h3 className="font-bold text-stone-950 text-lg">
                Capacidades Implementadas
              </h3>

              <div className="space-y-3">
                {project.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 text-xs text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-[#B86B42] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-[#E8E2D5] space-y-3">
                <span className="text-xs text-stone-600 block">
                  ¿Le gustaría implementar un sistema similar o adaptado a su empresa?
                </span>

                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-center text-stone-900 bg-white hover:bg-[#F5F0E6] border border-[#E8E2D5] flex items-center justify-center space-x-2 transition-all shadow-2xs"
                  >
                    <ExternalLink className="w-4 h-4 text-[#B86B42]" />
                    <span>Abrir Demo en Vivo</span>
                  </a>
                )}

                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hola INTEPE S.A.S., me interesa una solución similar a ${project.title} para mi empresa.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-center text-[#FDFBF7] bg-[#1F2923] hover:bg-[#141C17] shadow-md flex items-center justify-center space-x-2 transition-all"
                >
                  <span>Cotizar Proyecto Similar</span>
                  <ArrowRight className="w-4 h-4 text-[#B86B42]" />
                </a>

                <Link
                  to="/contacto"
                  className="w-full py-3 px-4 rounded-xl font-semibold text-xs text-center text-stone-800 bg-white hover:bg-[#F5F0E6] border border-[#E8E2D5] block transition-all"
                >
                  Solicitar Diagnóstico por Formulario
                </Link>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* 2. Other Projects Banner (Warm Sand Background) */}
      <div className="bg-[#F5F0E6] py-16 border-b border-[#E8E2D5]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-stone-950">
            Explore más proyectos y soluciones desarrolladas por INTEPE
          </h3>
          <p className="text-stone-600 text-xs sm:text-sm">
            Contamos con experiencia en desarrollo de plataformas web, software pecuario, control agronómico y sistemas ERP.
          </p>
          <div className="pt-2">
            <Link
              to="/proyectos"
              className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-stone-900 hover:text-[#B86B42]"
            >
              <span>Ver todos los proyectos</span>
              <ArrowRight className="w-4 h-4 text-[#B86B42]" />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};
