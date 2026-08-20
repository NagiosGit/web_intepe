import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Link } from 'react-router-dom';
import { SoftwareSection } from '../components/home/SoftwareSection';
import { MethodologySection } from '../components/home/MethodologySection';
import { ProjectsOverview } from '../components/home/ProjectsOverview';
import { SoftwareEstimator } from '../components/calculator/SoftwareEstimator';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const SoftwareDevelopmentPage: React.FC = () => {
  return (
    <div>
      <PageHeader
        badge="Software & Sistemas a Medida"
        title="Su proceso. Su software. Su solución."
        subtitle="Desarrollamos soluciones de software a medida para empresas que necesitan digitalizar procesos, automatizar tareas y convertir sus necesidades operativas en herramientas tecnológicas."
        breadcrumbCurrent="Desarrollo de Software"
      />

      {/* 1. Main Capabilities Grid (White Cards on Contrasting #F7F9FC Background) */}
      <SoftwareSection showHeader={false} bgClass="bg-[#F7F9FC]" />

      {/* 2. Estimator Tool (White Background) */}
      <div className="bg-white border-b border-[#D8E1EA]">
        <SoftwareEstimator />
      </div>

      {/* 3. Methodology: 5 Stages (Contrasting #F7F9FC) */}
      <MethodologySection />

      {/* 4. Real Projects Showcase (Warm Arena #FAF7F2 Background) */}
      <ProjectsOverview showHeader={true} />

      {/* 5. Final Action (Clean White) */}
      <div className="py-20 bg-white border-t border-[#D8E1EA]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#EAF5FC] border border-[#D8E1EA] text-[#0077C8] text-xs font-semibold">
            <span>Iniciar Proyecto</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">
            ¿Listo para digitalizar su operación con software propio?
          </h3>
          <p className="text-[#243447] text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Cuéntenos su proceso y estructuraremos una propuesta técnica y económica personalizada sin ataduras de licenciamiento por usuario.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <Link
              to="/contacto"
              className="px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#0077C8] hover:bg-[#0062a6] transition-all flex items-center justify-center space-x-2 shadow-md shadow-[#0077C8]/20"
            >
              <span>Solicitar proyecto de software</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hola INTEPE S.A.S., deseo cotizar un desarrollo de software para mi empresa.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-xl font-semibold text-xs text-[#0B1F3A] bg-[#F7F9FC] border border-[#D8E1EA] hover:bg-[#EAF5FC] transition-all flex items-center justify-center space-x-2"
            >
              <MessageSquare className="w-4 h-4 text-[#0077C8]" />
              <span>Chatear por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
