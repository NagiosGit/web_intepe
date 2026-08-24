import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, ArrowRight, CheckCircle2, Terminal } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const DifferentialSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#080B0E] text-white relative overflow-hidden border-b border-white/10 cyber-grid">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-[#FF7120]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="cyber-card rounded-lg p-8 sm:p-12 hud-box border border-[#FF7120]/30 shadow-[0_0_35px_rgba(255,113,32,0.12)]">
          <div className="hud-corner-tl !border-[#FF7120]"></div>
          <div className="hud-corner-tr !border-[#FF7120]"></div>
          <div className="hud-corner-bl !border-[#FF7120]"></div>
          <div className="hud-corner-br !border-[#FF7120]"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column (8 cols) */}
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              
              <div className="tech-badge">
                <Terminal className="w-3.5 h-3.5 text-[#FF7120]" />
                <span>DESARROLLO PROPIO & FLEXIBILIDAD</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight font-['Space_Grotesk']">
                {siteConfig.differentialHeadline}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
                {siteConfig.differentialText}
              </p>

              <div className="flex flex-wrap gap-4 pt-2 justify-center lg:justify-start text-xs text-slate-300 font-mono">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF7120]" />
                  <span>Sin cobros de licencias recurrentes por usuario</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF7120]" />
                  <span>Software 100% propiedad de su empresa</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF7120]" />
                  <span>Integración con bases de datos y APIs</span>
                </div>
              </div>

            </div>

            {/* Right Column (4 cols: Action Button) */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center items-center lg:items-end">
              <Link
                to="/contacto"
                className="w-full sm:w-auto lg:w-full btn-cyber-primary text-xs"
              >
                <span>CUÉNTENOS SU PROYECTO</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/desarrollo-software"
                className="w-full sm:w-auto lg:w-full btn-cyber-outline text-xs"
              >
                <Code2 className="w-4 h-4 text-[#FF7120]" />
                <span>VER SOFTWARE A MEDIDA</span>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
