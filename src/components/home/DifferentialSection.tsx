import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const DifferentialSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#0B1F3A] to-[#122847] text-white relative overflow-hidden">
      
      {/* Decorative subtle ambient circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0077C8]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#B86F4B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column (8 cols) */}
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#EAF5FC] text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#B86F4B]"></span>
                <span>Flexibilidad Operativa</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {siteConfig.differentialHeadline}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                {siteConfig.differentialText}
              </p>

              <div className="flex flex-wrap gap-4 pt-2 justify-center lg:justify-start text-xs text-slate-300">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0077C8]" />
                  <span>Sin licencias mensuales abusivas</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0077C8]" />
                  <span>Software 100% de su propiedad</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#B86F4B]" />
                  <span>Integración con sus sistemas actuales</span>
                </div>
              </div>

            </div>

            {/* Right Column (4 cols: Action Button) */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center items-center lg:items-end">
              <Link
                to="/contacto"
                className="w-full sm:w-auto lg:w-full px-7 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-center text-white bg-[#0077C8] hover:bg-[#0062a6] shadow-lg shadow-[#0077C8]/25 hover:shadow-xl transition-all flex items-center justify-center space-x-2"
              >
                <span>Cuéntenos su idea</span>
                <ArrowRight className="w-4 h-4 text-[#EAF5FC]" />
              </Link>

              <Link
                to="/desarrollo-software"
                className="w-full sm:w-auto lg:w-full px-7 py-4 rounded-xl font-semibold text-xs text-center text-white/90 bg-white/10 hover:bg-white/15 border border-white/20 transition-all flex items-center justify-center space-x-2"
              >
                <Code2 className="w-4 h-4 text-[#0077C8]" />
                <span>Ver desarrollo de software</span>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
