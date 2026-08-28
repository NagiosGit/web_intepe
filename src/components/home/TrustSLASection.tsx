import React from 'react';
import { Clock, ShieldCheck, FileCheck, Users, Terminal } from 'lucide-react';

export const TrustSLASection: React.FC = () => {
  const guarantees = [
    {
      title: 'SLA < 15 Minutos en L1',
      subtitle: 'Respuesta rápida a emergencias',
      desc: 'Acuerdo de nivel de servicio (SLA) contractual para incidentes críticos en servidores, red y puestos de trabajo.',
      icon: Clock,
      highlight: 'SLA Contractual'
    },
    {
      title: 'Diagnóstico Inicial Sin Costo',
      subtitle: 'Evaluación técnica previa',
      desc: 'Revisamos el estado actual de su infraestructura, licencias y equipos sin compromiso comercial.',
      icon: FileCheck,
      highlight: '100% Gratuito'
    },
    {
      title: 'Seguridad & Confidencialidad',
      subtitle: 'Protección bajo Ley 1581',
      desc: 'Firma formal de acuerdos de confidencialidad (NDA) y cumplimiento legal de Habeas Data en Colombia.',
      icon: ShieldCheck,
      highlight: 'Acuerdo NDA'
    },
    {
      title: 'Sin Pasivos Laborales',
      subtitle: 'Tarifas mensuales fijas',
      desc: 'Acceda a un equipo multidisciplinario de ingenieros con costo fijo mensual y cero riesgos laborales.',
      icon: Users,
      highlight: 'Cero Riesgos'
    }
  ];

  return (
    <section className="py-20 bg-[#0F172A] border-b border-white/10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-[#FF7120]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="tech-badge">
            <Terminal className="w-3.5 h-3.5 text-[#FF7120]" />
            <span>TRANQUILIDAD COMERCIAL & TÉCNICA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Space_Grotesk']">
            Garantías de <span className="text-[#FF7120]">Servicio y SLAs</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-sans">
            Eliminamos la incertidumbre en la tercerización de servicios tecnológicos mediante compromisos formales y transparentes.
          </p>
        </div>

        {/* 4 Trust Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((g, idx) => {
            const Icon = g.icon;
            return (
              <div 
                key={idx}
                className="cyber-card rounded-lg p-7 hud-box flex flex-col justify-between space-y-4 group"
              >
                <div className="hud-corner-tl"></div>
                <div className="hud-corner-br"></div>

                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded bg-[#FF7120]/10 border border-[#FF7120]/30 flex items-center justify-center text-[#FF7120] group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-white/5 text-[#FF853A] border border-[#FF7120]/30">
                      {g.highlight}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-white font-['Space_Grotesk'] group-hover:text-[#FF853A] transition-colors leading-snug">
                      {g.title}
                    </h3>
                    <span className="text-xs text-slate-400 font-mono block mt-0.5">
                      {g.subtitle}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans pt-1 border-t border-white/5">
                    {g.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
