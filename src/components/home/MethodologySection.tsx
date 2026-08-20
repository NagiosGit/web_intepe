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
    <section className="py-24 bg-white border-b border-[#D8E1EA]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0077C8] bg-[#EAF5FC] px-3 py-1 rounded-full border border-[#D8E1EA]">
            Metodología Comprobada
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            De la idea al software en funcionamiento
          </h2>
          <p className="text-[#243447] text-sm sm:text-base">
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
                className="bg-[#F7F9FC] rounded-2xl p-6 border border-[#D8E1EA] hover:border-[#0077C8] hover:bg-white hover:shadow-md transition-all duration-200 flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-[#B86F4B] tracking-tight">
                      {step.number}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#D8E1EA] flex items-center justify-center text-[#0077C8] group-hover:bg-[#0077C8] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-bold text-sm text-[#0B1F3A] group-hover:text-[#0077C8] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/contacto"
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#0077C8] hover:text-[#0B1F3A] transition-colors"
          >
            <span>Iniciar consultoría de desarrollo</span>
            <ArrowRight className="w-4 h-4 text-[#B86F4B]" />
          </Link>
        </div>

      </div>
    </section>
  );
};
