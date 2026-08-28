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
  Cpu,
  ShieldCheck,
  ChevronRight
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
      case 'Sprout': return <Sprout className="w-7 h-7 text-emerald-400" />;
      case 'Layers': return <Layers className="w-7 h-7 text-cyan-400" />;
      case 'Building2': return <Building2 className="w-7 h-7 text-[#FF7120]" />;
      default: return <Layers className="w-7 h-7 text-[#FF7120]" />;
    }
  };

  return (
    <div className="bg-[#0F172A] text-slate-100 min-h-screen">
      <PageHeader
        badge={project.category}
        title={project.title}
        subtitle={project.tagline}
        breadcrumbCurrent={`Proyectos / ${project.title}`}
      />

      {/* Main Project Details */}
      <div className="bg-[#0F172A] py-16 sm:py-24 border-b border-white/10 cyber-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Description, Main Image & Functional Modules */}
            <div className="lg:col-span-7 space-y-10">
              
              {/* Header Title & Icon */}
              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 inline-block">
                    {renderIcon(project.icon)}
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FF7120] block">
                      // DESARROLLO DE SOFTWARE ESPECIALIZADO
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-['Space_Grotesk']">
                      {project.title} — {project.category}
                    </h2>
                  </div>
                </div>

                {/* Main Hero Image */}
                {project.image && (
                  <div className="rounded-xl overflow-hidden border border-white/15 relative h-64 sm:h-84 w-full bg-slate-950 my-5 shadow-2xl group">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover opacity-85 group-hover:scale-103 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded border border-white/20 text-[#FF853A]">
                        {project.category}
                      </span>
                      <span className="text-[11px] font-mono text-slate-300 bg-black/70 backdrop-blur-md px-3 py-1 rounded border border-white/10 hidden sm:inline">
                        Arquitectura Web & Cloud
                      </span>
                    </div>
                  </div>
                )}

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans pt-2">
                  {project.fullDescription}
                </p>
              </div>

              {/* Modules Grid */}
              {project.modules && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white font-['Space_Grotesk'] flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-[#FF7120]" />
                      <span>Módulos Funcionales Implementados</span>
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400">
                      {project.modules.length} Módulos Activos
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {project.modules.map((mod, idx) => (
                      <div key={idx} className="p-4 rounded-lg cyber-card hud-box space-y-1.5 border border-white/10 hover:border-[#FF7120]/40 transition-all">
                        <div className="hud-corner-tl"></div>
                        <div className="hud-corner-br"></div>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#FF7120]"></div>
                          <h4 className="font-bold text-xs text-white font-['Space_Grotesk']">{mod.name}</h4>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{mod.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights */}
              <div className="p-7 rounded-lg cyber-card hud-box space-y-4 border border-[#FF7120]/30 bg-[#FF7120]/5">
                <div className="hud-corner-tl !border-[#FF7120]"></div>
                <div className="hud-corner-br !border-[#FF7120]"></div>

                <h3 className="font-bold text-white text-base flex items-center font-['Space_Grotesk'] gap-2">
                  <Sparkles className="w-4 h-4 text-[#FF7120]" />
                  <span>Impacto Operativo & Resultados Comprobados:</span>
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-sans">
                  {project.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#FF7120] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Target Audience */}
              <div className="p-6 rounded-lg cyber-card space-y-2 border border-white/10">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF7120]">
                  // SECTOR O PERFIL DE APLICACIÓN:
                </h4>
                <p className="text-white text-sm font-medium font-sans">
                  {project.targetAudience}
                </p>
              </div>

            </div>

            {/* Right Column: Features Checklist & Action Cockpit */}
            <div className="lg:col-span-5 cyber-card p-8 rounded-lg hud-box space-y-6 sticky top-28 border border-white/10">
              <div className="hud-corner-tl"></div>
              <div className="hud-corner-tr"></div>
              <div className="hud-corner-bl"></div>
              <div className="hud-corner-br"></div>

              <div>
                <span className="text-xs font-mono font-bold text-[#FF7120] uppercase tracking-wider block">
                  // CAPACIDADES TÉCNICAS
                </span>
                <h3 className="font-bold text-white text-lg font-['Space_Grotesk'] mt-1">
                  Especificaciones del Sistema
                </h3>
              </div>

              <div className="space-y-3">
                {project.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-300 font-sans">
                    <CheckCircle2 className="w-4 h-4 text-[#FF7120] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/10 space-y-3">
                <span className="text-xs text-slate-400 font-mono block">
                  ¿Desea estructurar un sistema adaptado a su cultivo o empresa?
                </span>

                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hola INTEPE S.A.S., me interesa una solución similar a ${project.title} para mi empresa.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-cyber-primary text-xs py-3.5 flex items-center justify-center space-x-2"
                >
                  <span>COTIZAR PROYECTO SIMILAR</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <Link
                  to="/contacto"
                  className="w-full btn-cyber-outline text-xs py-3 block text-center"
                >
                  SOLICITAR DIAGNÓSTICO
                </Link>
              </div>

              <div className="p-4 rounded bg-white/5 border border-white/5 space-y-2">
                <div className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>VENTAJA EXCLUSIVA INTEPE:</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Desarrollos sin cobros de suscripción por usuario adicional. Código propietario y base de datos con respaldo continuo.
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Other Projects Banner */}
      <div className="bg-[#0F172A] py-16 border-b border-white/10 text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-white font-['Space_Grotesk']">
          Explore más soluciones desarrolladas por INTEPE
        </h3>
        <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto font-sans">
          Experiencia comprobada en desarrollo web, control agronómico, plataformas ERP y software de misión crítica.
        </p>
        <div className="pt-2">
          <Link
            to="/proyectos"
            className="btn-cyber-outline text-xs inline-flex items-center gap-2"
          >
            <span>VER TODOS LOS PROYECTOS</span>
            <ChevronRight className="w-4 h-4 text-[#FF7120]" />
          </Link>
        </div>
      </div>

    </div>
  );
};
