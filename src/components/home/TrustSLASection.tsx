import React from 'react';
import { Clock, ShieldCheck, FileCheck, CheckCircle2, Award, Users } from 'lucide-react';

export const TrustSLASection: React.FC = () => {
  const guarantees = [
    {
      title: 'SLA < 2 Horas Garantizado',
      subtitle: 'Respuesta rápida a emergencias',
      desc: 'Acuerdo de nivel de servicio (SLA) formal para atender incidentes críticos en servidores, red y puestos clave.',
      icon: Clock,
      highlight: 'SLA por Contrato'
    },
    {
      title: 'Diagnóstico Inicial Sin Costo',
      subtitle: 'Evaluación técnica previa',
      desc: 'Revisamos el estado actual de su infraestructura, licencias y equipos sin compromiso comercial previo.',
      icon: FileCheck,
      highlight: '100% Gratuito'
    },
    {
      title: 'Seguridad & Confidencialidad',
      subtitle: 'Protección bajo Ley 1581',
      desc: 'Firma de acuerdos de confidencialidad (NDA) y cumplimiento legal estricto de Habeas Data en Colombia.',
      icon: ShieldCheck,
      highlight: 'Acuerdo NDA'
    },
    {
      title: 'Sin Pasivos Laborales',
      subtitle: 'Tarifas mensuales predecibles',
      desc: 'Acceda a un equipo multidisciplinario de ingenieros con costo fijo mensual y cero pasivos laborales.',
      icon: Users,
      highlight: 'Cero Riesgos'
    }
  ];

  return (
    <section className="py-20 bg-[#FAF6EE] border-b border-[#E8E2D5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white border border-[#E8E2D5] text-stone-800 text-xs font-semibold shadow-2xs">
            <Award className="w-3.5 h-3.5 text-[#B86B42]" />
            <span>Tranquilidad Comercial & Técnica</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-950 tracking-tight">
            Garantías claras para proteger su operación
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Eliminamos la incertidumbre en la contratación de servicios tecnológicos mediante compromisos formales y transparentes.
          </p>
        </div>

        {/* 4 Trust Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((g, idx) => {
            const Icon = g.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-7 border border-[#E8E2D5] shadow-xs hover:-translate-y-1 hover:shadow-md hover:border-[#B86B42]/50 transition-all duration-300 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-[#F5F0E6] border border-[#E8E2D5] flex items-center justify-center text-stone-800 group-hover:bg-[#1F2923] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF6EE] text-[#B86B42] border border-[#E8DFD0]">
                      {g.highlight}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-stone-950 group-hover:text-[#B86B42] transition-colors leading-snug">
                      {g.title}
                    </h3>
                    <span className="text-xs text-stone-400 font-medium block mt-0.5">
                      {g.subtitle}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {g.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F5F0E6] flex items-center space-x-1.5 text-[11px] text-[#B86B42] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Compromiso INTEPE S.A.S.</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
