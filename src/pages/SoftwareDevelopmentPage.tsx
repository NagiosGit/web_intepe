import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Link } from 'react-router-dom';
import { SoftwareSection } from '../components/home/SoftwareSection';
import { MethodologySection } from '../components/home/MethodologySection';
import { ProjectsOverview } from '../components/home/ProjectsOverview';
import { SoftwareEstimator } from '../components/calculator/SoftwareEstimator';
import { ArrowRight, MessageSquare, Terminal } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const SoftwareDevelopmentPage: React.FC = () => {
  return (
    <div className="bg-[#0F172A] text-slate-100">
      <PageHeader
        badge="Software & Sistemas a Medida"
        title="Su proceso. Su software. Su solución."
        subtitle="Desarrollamos soluciones de software a medida para empresas que necesitan digitalizar procesos, automatizar tareas y convertir sus necesidades operativas en herramientas tecnológicas."
        breadcrumbCurrent="Desarrollo de Software"
      />

      {/* Main Capabilities Grid */}
      <SoftwareSection showHeader={false} bgClass="bg-[#0F172A]" />

      {/* Estimator Tool */}
      <SoftwareEstimator />

      {/* Methodology: 5 Stages */}
      <MethodologySection />

      {/* Real Projects Showcase */}
      <ProjectsOverview showHeader={true} />

      {/* Final Action Banner */}
      <div className="py-24 bg-[#0F172A] text-white border-t border-white/10 cyber-grid relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#FF7120]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
          <div className="tech-badge">
            <Terminal className="w-3.5 h-3.5 text-[#FF7120]" />
            <span>INICIAR PROYECTO DE INGENIERÍA</span>
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-['Space_Grotesk']">
            ¿Listo para digitalizar su operación con software propio?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-sans">
            Cuéntenos su proceso y estructuraremos una propuesta técnica y económica personalizada sin ataduras de licenciamiento por usuario.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <Link
              to="/contacto"
              className="btn-cyber-primary text-xs"
            >
              <span>SOLICITAR PROYECTO DE SOFTWARE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hola INTEPE S.A.S., deseo cotizar un desarrollo de software para mi empresa.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cyber-outline text-xs"
            >
              <MessageSquare className="w-4 h-4 text-[#FF7120]" />
              <span>CHATEAR POR WHATSAPP</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
