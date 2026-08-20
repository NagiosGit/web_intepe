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

      {/* Projects Showcase without duplicated title and on warm arena contrast */}
      <ProjectsOverview showHeader={false} isFullPage={true} />

      {/* Bottom CTA Banner with strong clean contrast */}
      <div className="py-20 bg-white border-t border-[#D8E1EA]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#EAF5FC] border border-[#D8E1EA] text-[#0077C8] text-xs font-semibold">
            <span>Desarrollo de Software a Medida</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">
            ¿Requiere una solución tecnológica a la medida de su empresa?
          </h3>
          <p className="text-[#243447] text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Diseñamos plataformas personalizadas sin cobros abusivos de licenciamiento por usuario, integradas con bases de datos seguras y soporte continuo.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <Link
              to="/contacto"
              className="px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#0077C8] hover:bg-[#0062a6] transition-all flex items-center justify-center space-x-2 shadow-md shadow-[#0077C8]/20"
            >
              <span>Presentar mi requerimiento</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hola INTEPE S.A.S., me gustaría cotizar un desarrollo de software para mi empresa.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-xl font-semibold text-xs text-[#0B1F3A] bg-[#F7F9FC] border border-[#D8E1EA] hover:bg-[#EAF5FC] transition-all flex items-center justify-center space-x-2"
            >
              <MessageSquare className="w-4 h-4 text-[#0077C8]" />
              <span>Consultar en WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
