import React from 'react';
import { Search, FileCode2, Palette, Cpu, Rocket, ArrowRight, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MethodologySection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Descubrimiento',
      desc: 'Reunión inicial de entendimiento para relevar objetivos, usuarios y requerimientos del negocio.',
      icon: Search,
    },
    {
      number: '02',
      title: 'Análisis de Procesos',
      desc: 'Mapeo detallado de flujos operativos, arquitectura de datos y casos de uso del software.',
      icon: FileCode2,
    },
    {
      number: '03',
      title: 'Diseño & Prototipado',
      desc: 'Estructuración de interfaces intuitivas y validación temprana de la experiencia de usuario.',
      icon: Palette,
    },
    {
      number: '04',
      title: 'Desarrollo Ágil',
      desc: 'Programación modular, pruebas funcionales, seguridad e integración con bases de datos.',
      icon: Cpu,
    },
    {
      number: '05',
      title: 'Despliegue & Evolución',
      desc: 'Puesta en producción, capacitación, garantía técnica y acompañamiento continuo.',
      icon: Rocket,
    },
  ];

  return (
    <section className="py-24 bg-[#0F172A] border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="tech-badge">
            <Terminal className="w-3.5 h-3.5 text-[#FF7120]" />
            <span>CICLO DE VIDA DE SOFTWARE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Space_Grotesk']">
            Metodología de <span className="text-[#FF7120]">Desarrollo Ágil</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-sans">
            Un proceso estructurado y transparente para convertir necesidades operativas en herramientas tecnológicas de alto impacto.
          </p>
        </div>

        {/* 5 Steps Linear Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="cyber-card rounded-lg p-6 hud-box flex flex-col justify-between group space-y-4"
              >
                <div className="hud-corner-tl"></div>
                <div className="hud-corner-br"></div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-[#FF7120] tracking-tight">
                      {step.number}
                    </span>
                    <div className="w-9 h-9 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[#FF7120] group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-bold text-sm text-white font-['Space_Grotesk'] group-hover:text-[#FF853A] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Link
            to="/contacto"
            className="btn-cyber-outline text-xs"
          >
            <span>INICIAR CONSULTORÍA DE SOFTWARE</span>
            <ArrowRight className="w-4 h-4 text-[#FF7120]" />
          </Link>
        </div>

      </div>
    </section>
  );
};
