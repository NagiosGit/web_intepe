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
      case 'Sprout': return <Sprout className="w-8 h-8 text-[#B86F4B]" />;
      case 'Layers': return <Layers className="w-8 h-8 text-[#0077C8]" />;
      case 'Building2': return <Building2 className="w-8 h-8 text-[#0B1F3A]" />;
      default: return <Layers className="w-8 h-8 text-[#0077C8]" />;
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

      {/* 1. Main Project Details (Clean White Background) */}
      <div className="bg-white py-20 border-b border-[#D8E1EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Description, Modules & Highlights */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-4 rounded-2xl bg-[#F7F9FC] border border-[#D8E1EA] inline-block shadow-xs">
                    {renderIcon(project.icon)}
                  </div>

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0077C8] hover:bg-[#0062a6] shadow-sm transition-all"
                    >
                      <span>Probar App en Vivo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
                  Descripción y Alcance de la Solución
                </h2>
                <p className="text-[#243447] text-base leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>

              {/* Modules Grid if available */}
              {project.modules && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-[#0B1F3A] flex items-center">
                    <Cpu className="w-5 h-5 mr-2 text-[#0077C8]" />
                    Módulos de la Plataforma
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.modules.map((mod, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-[#F7F9FC] border border-[#D8E1EA] space-y-1 shadow-2xs">
                        <h4 className="font-bold text-xs text-[#0B1F3A]">{mod.name}</h4>
                        <p className="text-[11px] text-[#64748B] leading-relaxed">{mod.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights */}
              <div className="p-6 rounded-2xl bg-[#EAF5FC] border border-[#D8E1EA] space-y-3">
                <h3 className="font-bold text-[#0B1F3A] text-base flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-[#0077C8]" />
                  Impacto y Resultados Clave:
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-[#243447]">
                  {project.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0077C8] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Target Audience */}
              <div className="p-6 rounded-2xl bg-[#F7F9FC] border border-[#D8E1EA] space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                  Sector o Perfil de Aplicación:
                </h4>
                <p className="text-[#0B1F3A] text-sm font-medium">
                  {project.targetAudience}
                </p>
              </div>
            </div>

            {/* Right Column: Features Checklist & Action */}
            <div className="lg:col-span-5 bg-[#F7F9FC] p-8 rounded-3xl border border-[#D8E1EA] shadow-sm space-y-6 sticky top-28">
              <h3 className="font-bold text-[#0B1F3A] text-lg">
                Capacidades Implementadas
              </h3>

              <div className="space-y-3">
                {project.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 text-xs text-[#243447]">
                    <CheckCircle2 className="w-4 h-4 text-[#0077C8] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-[#D8E1EA] space-y-3">
                <span className="text-xs text-[#64748B] block">
                  ¿Le gustaría implementar un sistema similar o adaptado a su empresa?
                </span>

                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-center text-[#0B1F3A] bg-white hover:bg-[#EAF5FC] border border-[#D8E1EA] flex items-center justify-center space-x-2 transition-all shadow-2xs"
                  >
                    <ExternalLink className="w-4 h-4 text-[#0077C8]" />
                    <span>Abrir Demo en Vivo</span>
                  </a>
                )}

                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hola INTEPE S.A.S., me interesa una solución similar a ${project.title} para mi empresa.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-center text-white bg-[#0077C8] hover:bg-[#0062a6] shadow-md shadow-[#0077C8]/20 flex items-center justify-center space-x-2 transition-all"
                >
                  <span>Cotizar Proyecto Similar</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <Link
                  to="/contacto"
                  className="w-full py-3 px-4 rounded-xl font-semibold text-xs text-center text-[#0B1F3A] bg-white hover:bg-[#EAF5FC] border border-[#D8E1EA] block transition-all"
                >
                  Solicitar Diagnóstico por Formulario
                </Link>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* 2. Other Projects Banner (Warm Arena Background) */}
      <div className="bg-[#FAF7F2] py-16 border-b border-[#E8DCCB]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-[#0B1F3A]">
            Explore más proyectos y soluciones desarrolladas por INTEPE
          </h3>
          <p className="text-[#64748B] text-xs sm:text-sm">
            Contamos con experiencia en desarrollo de plataformas web, software pecuario, control agronómico y sistemas ERP.
          </p>
          <div className="pt-2">
            <Link
              to="/proyectos"
              className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#0077C8] hover:text-[#0B1F3A]"
            >
              <span>Ver todos los proyectos</span>
              <ArrowRight className="w-4 h-4 text-[#B86F4B]" />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};
