import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { ProjectsOverview } from '../components/home/ProjectsOverview';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, Terminal } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const ProjectsPage: React.FC = () => {
  return (
    <div className="bg-[#0F172A] text-slate-100">
      <PageHeader
        badge="Experiencia & Capacidad"
        title="Tecnología desarrollada por INTEPE"
        subtitle="Conozca algunos de los proyectos y soluciones desarrollados por INTEPE para optimizar operaciones y digitalizar procesos."
        breadcrumbCurrent="Proyectos"
      />

      {/* Projects Showcase */}
      <ProjectsOverview showHeader={false} isFullPage={true} />

      {/* Bottom Cyber CTA Banner */}
      <div className="py-24 bg-[#0F172A] text-white border-t border-white/10 cyber-grid relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#FF7120]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
          <div className="tech-badge">
            <Terminal className="w-3.5 h-3.5 text-[#FF7120]" />
            <span>DESARROLLO DE SOFTWARE A LA MEDIDA</span>
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-['Space_Grotesk']">
            ¿Requiere una solución tecnológica a la medida de su empresa?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-sans">
            Diseñamos plataformas personalizadas sin cobros de licenciamiento por usuario, integradas con bases de datos seguras y soporte continuo.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <Link
              to="/contacto"
              className="btn-cyber-primary text-xs"
            >
              <span>PRESENTAR REQUERIMIENTO</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hola INTEPE S.A.S., me gustaría cotizar un desarrollo de software para mi empresa.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cyber-outline text-xs"
            >
              <MessageSquare className="w-4 h-4 text-[#FF7120]" />
              <span>CONSULTAR EN WHATSAPP</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
