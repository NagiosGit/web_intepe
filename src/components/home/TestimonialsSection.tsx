import React from 'react';
import { Star, Terminal } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      author: 'nn',
      role: 'Gerente de Operaciones',
      company: 'Dnn',
      sector: 'Comercial & Distribución',
      rating: 5,
      metric: '99.9% Disponibilidad',
      metricDesc: 'en servidores de facturación y puestos de trabajo',
      quote: 'Teníamos constantes caídas en los equipos de bodega y facturación. Con el Outsourcing TI de INTEPE centralizamos el soporte y el tiempo de respuesta a incidentes pasó de horas a menos de 30 minutos.',
      verified: true
    },
    {
      author: 'nn',
      role: 'Director dn',
      company: 'Sector Agropecuario Cundinamarca',
      sector: 'Invernaderos & Campo',
      rating: 5,
      metric: '100% Control Digital',
      metricDesc: 'de cosechas, bodega y punto de equilibrio por lote',
      quote: 'El desarrollo de GranjaWP cambió por completo la administración de nuestros invernaderos. Dejamos de perder datos en libretas de papel y ahora tenemos reportes exactos de cosecha diaria, costo base por kilo y control de insumos en tiempo real.',
      verified: true
    },
    {
      author: 'nn',
      role: 'Directora Administrativa',
      company: 'Firma n',
      sector: 'Consultoría & Servicios',
      rating: 5,
      metric: '0 Pérdidas de Datos',
      metricDesc: 'con backups cifrados y Google Workspace',
      quote: 'INTEPE estructuró todo nuestro ecosistema en Google Workspace y estableció copias de seguridad automáticas de los expedientes contables. La honestidad y calidez en el trato es lo que más valoramos.',
      verified: true
    }
  ];

  return (
    <section className="py-24 bg-[#080B0E] border-b border-white/10 relative overflow-hidden cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="tech-badge">
            <Terminal className="w-3.5 h-3.5 text-[#FF7120]" />
            <span>TESTIMONIOS & CASOS REALES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Space_Grotesk']">
            Resultados que <span className="text-[#FF7120]">Respaldan</span> Nuestro Trabajo
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-sans">
            Conozca cómo empresas en Colombia optimizan su productividad y aseguran su infraestructura con INTEPE S.A.S.
          </p>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div 
              key={idx}
              className="cyber-card rounded-lg p-7 sm:p-8 hud-box flex flex-col justify-between space-y-6 group"
            >
              <div className="hud-corner-tl"></div>
              <div className="hud-corner-br"></div>

              <div className="space-y-4">
                {/* Metric Badge */}
                <div className="p-3 rounded bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="text-xs font-mono font-bold text-[#FF853A]">
                    {rev.metric}
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans">
                    {rev.metricDesc}
                  </div>
                </div>

                {/* Rating stars */}
                <div className="flex items-center space-x-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-[#FF7120] fill-[#FF7120]" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans italic">
                  "{rev.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white font-['Space_Grotesk']">
                    {rev.author}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    {rev.role}
                  </div>
                  <div className="text-[10px] text-slate-500 font-sans">
                    {rev.company}
                  </div>
                </div>
                {rev.verified && (
                  <span className="text-[9px] font-mono text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 rounded">
                    VERIFICADO
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
