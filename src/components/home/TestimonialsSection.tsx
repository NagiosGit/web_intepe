import React from 'react';
import { Star, CheckCircle2, TrendingUp, HeartHandshake } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      author: 'Carlos E. Mendoza',
      role: 'Gerente de Operaciones',
      company: 'Distribuciones & Logística Andina',
      sector: 'Comercial & Distribución',
      rating: 5,
      metric: '99.9% Disponibilidad',
      metricDesc: 'en servidores de facturación y puestos de trabajo',
      quote: 'Teníamos constantes caídas en los equipos de bodega y facturación. Con el Outsourcing TI de INTEPE centralizamos el soporte y el tiempo de respuesta a incidentes pasó de horas a menos de 30 minutos.',
      verified: true
    },
    {
      author: 'Alejandro P. Gómez',
      role: 'Director de Producción Avícola',
      company: 'Sector Agropecuario Cundinamarca',
      sector: 'Avicultura & Campo',
      rating: 5,
      metric: '100% Control Digital',
      metricDesc: 'de postura, concentrado y mortalidad en lotes',
      quote: 'El desarrollo de GranjaWP cambió por completo la administración de nuestros galpones. Dejamos de perder datos en libretas de papel y ahora tenemos reportes exactos de conversión alimenticia y costos diarios.',
      verified: true
    },
    {
      author: 'Patricia R. Beltrán',
      role: 'Directora Administrativa',
      company: 'Firma de Consultoría y Servicios SAS',
      sector: 'Consultoría & Servicios',
      rating: 5,
      metric: '0 Pérdidas de Datos',
      metricDesc: 'con backups cifrados y Google Workspace',
      quote: 'INTEPE estructuró todo nuestro ecosistema en Google Workspace y estableció copias de seguridad automáticas de los expedientes contables. La honestidad y calidez en el trato es lo que más valoramos.',
      verified: true
    }
  ];

  return (
    <section className="py-24 bg-[#FAF6EE] border-b border-[#E8E2D5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white border border-[#E8E2D5] text-stone-800 text-xs font-semibold shadow-2xs">
            <HeartHandshake className="w-3.5 h-3.5 text-[#B86B42]" />
            <span>Casos Reales & Prueba Social</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-950 tracking-tight">
            Resultados tangibles que respaldan nuestro servicio
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Conozca cómo empresas en Colombia optimizan su productividad y aseguran su información trabajando con INTEPE S.A.S.
          </p>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl p-8 border border-[#E8E2D5] shadow-xs flex flex-col justify-between space-y-6 hover:-translate-y-1 hover:shadow-md hover:border-[#B86B42]/50 transition-all duration-300 relative group"
            >
              <div className="space-y-4">
                {/* Metric Badge Header */}
                <div className="p-4 rounded-2xl bg-[#FAF6EE] border border-[#E8E2D5] space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#B86B42]">
                      Resultado Medible
                    </span>
                    <TrendingUp className="w-3.5 h-3.5 text-[#B86B42]" />
                  </div>
                  <strong className="text-base font-black text-stone-950 block">{rev.metric}</strong>
                  <span className="text-[11px] text-stone-500 block leading-tight">{rev.metricDesc}</span>
                </div>

                {/* Star Rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(rev.rating)].map((_, sIdx) => (
                    <Star key={sIdx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-stone-700 ml-1.5">5.0 / 5.0</span>
                </div>

                {/* Quote Body */}
                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-[#F5F0E6] flex items-center justify-between">
                <div className="space-y-0.5">
                  <strong className="text-xs font-bold text-stone-950 block">{rev.author}</strong>
                  <span className="text-[11px] text-stone-500 block">{rev.role}</span>
                  <span className="text-[10px] text-stone-400 font-medium block">{rev.company}</span>
                </div>
                {rev.verified && (
                  <div className="flex items-center space-x-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200" title="Cliente verificado">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Verificado</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Stat Bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-5 rounded-2xl bg-white border border-[#E8E2D5] shadow-2xs">
            <strong className="text-2xl font-black text-stone-950 block">99.8%</strong>
            <span className="text-xs text-stone-500">SLA de Disponibilidad</span>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-[#E8E2D5] shadow-2xs">
            <strong className="text-2xl font-black text-stone-950 block">&lt; 30 min</strong>
            <span className="text-xs text-stone-500">Tiempo de Respuesta L1</span>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-[#E8E2D5] shadow-2xs">
            <strong className="text-2xl font-black text-stone-950 block">100%</strong>
            <span className="text-xs text-stone-500">Contratos con NDA Legal</span>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-[#E8E2D5] shadow-2xs">
            <strong className="text-2xl font-black text-[#B86B42] block">0</strong>
            <span className="text-xs text-stone-500">Pasivos Laborales para el Cliente</span>
          </div>
        </div>

      </div>
    </section>
  );
};
