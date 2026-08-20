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

      {/* 1. Main Capabilities Grid (White Cards on Contrasting #FAF6EE Background) */}
      <SoftwareSection showHeader={false} bgClass="bg-[#FAF6EE]" />

      {/* 2. Estimator Tool (Ivory Background) */}
      <div className="bg-[#FDFBF7] border-b border-[#E8E2D5]">
        <SoftwareEstimator />
      </div>

      {/* 3. Methodology: 5 Stages (Contrasting #FAF6EE) */}
      <MethodologySection />

      {/* 4. Real Projects Showcase (Warm Sand #F5F0E6 Background) */}
      <ProjectsOverview showHeader={true} />

      {/* 5. Final Action (Warm Deep Forest) */}
      <div className="py-24 bg-[#1F2923] text-white border-t border-stone-800">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#FAF6EE] text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B86B42]"></span>
            <span>Iniciar Proyecto</span>
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
            ¿Listo para digitalizar su operación con software propio?
          </h3>
          <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Cuéntenos su proceso y estructuraremos una propuesta técnica y económica personalizada sin ataduras de licenciamiento por usuario.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <Link
              to="/contacto"
              className="px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-stone-900 bg-[#FDFBF7] hover:bg-[#FAF6EE] transition-all flex items-center justify-center space-x-2 shadow-md"
            >
              <span>Solicitar proyecto de software</span>
              <ArrowRight className="w-4 h-4 text-[#B86B42]" />
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hola INTEPE S.A.S., deseo cotizar un desarrollo de software para mi empresa.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl font-semibold text-xs text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all flex items-center justify-center space-x-2"
            >
              <MessageSquare className="w-4 h-4 text-[#B86B42]" />
              <span>Chatear por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
