import React from 'react';
import { Search, FileCode2, Palette, Cpu, Rocket, ArrowRight } from 'lucide-react';
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
    <section className="py-24 bg-[#FAF6EE] border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white border border-[#E8E2D5] text-stone-800 text-xs font-semibold shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B86B42]"></span>
            <span>Metodología Comprobada</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-950 tracking-tight">
            De la idea al software en funcionamiento
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Un proceso estructurado y transparente para convertir necesidades operativas en herramientas de software de alto impacto.
          </p>
        </div>

        {/* 5 Steps Linear Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 border border-[#E8E2D5] shadow-xs hover:-translate-y-1 hover:shadow-md hover:border-[#B86B42]/50 transition-all duration-300 flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-[#B86B42] tracking-tight">
                      {step.number}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-[#F5F0E6] border border-[#E8E2D5] flex items-center justify-center text-stone-800 group-hover:bg-[#1F2923] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-bold text-sm text-stone-950 group-hover:text-[#B86B42] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed">
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
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-stone-900 hover:text-[#B86B42] transition-colors"
          >
            <span>Iniciar consultoría de desarrollo</span>
            <ArrowRight className="w-4 h-4 text-[#B86B42]" />
          </Link>
        </div>

      </div>
    </section>
  );
};
