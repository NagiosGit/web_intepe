import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { ProjectsOverview } from '../components/home/ProjectsOverview';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const ProjectsPage: React.FC = () => {
  return (
    <div>
      <PageHeader
        badge="Experiencia & Capacidad"
        title="Tecnología desarrollada por INTEPE"
        subtitle="Conozca algunos de los proyectos y soluciones desarrollados por INTEPE para optimizar operaciones y digitalizar procesos."
        breadcrumbCurrent="Proyectos"
      />

      {/* Projects Showcase on warm sand contrast */}
      <ProjectsOverview showHeader={false} isFullPage={true} />

      {/* Bottom CTA Banner with warm deep forest contrast */}
      <div className="py-24 bg-[#1F2923] text-white border-t border-stone-800">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#FAF6EE] text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B86B42]"></span>
            <span>Desarrollo de Software a Medida</span>
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
            ¿Requiere una solución tecnológica a la medida de su empresa?
          </h3>
          <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Diseñamos plataformas personalizadas sin cobros de licenciamiento por usuario, integradas con bases de datos seguras y soporte continuo.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <Link
              to="/contacto"
              className="px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-stone-900 bg-[#FDFBF7] hover:bg-[#FAF6EE] transition-all flex items-center justify-center space-x-2 shadow-md"
            >
              <span>Presentar mi requerimiento</span>
              <ArrowRight className="w-4 h-4 text-[#B86B42]" />
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hola INTEPE S.A.S., me gustaría cotizar un desarrollo de software para mi empresa.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl font-semibold text-xs text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all flex items-center justify-center space-x-2"
            >
              <MessageSquare className="w-4 h-4 text-[#B86B42]" />
              <span>Consultar en WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
