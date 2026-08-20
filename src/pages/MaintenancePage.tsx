import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Link } from 'react-router-dom';
import { Wrench, CheckCircle2, ArrowRight, MessageSquare, ShieldCheck, HardDrive, Cpu } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const MaintenancePage: React.FC = () => {
  return (
    <div>
      <PageHeader
        badge="Cuidado y Rendimiento del Hardware"
        title="Mantenimiento Preventivo y Correctivo"
        subtitle="Jornadas técnicas programadas para prolongar la vida útil de computadores, portátiles y servidores."
        breadcrumbCurrent="Mantenimiento"
      />

      {/* 1. Intro Section */}
      <div className="bg-[#FDFBF7] py-24 border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-950 tracking-tight">
                Prolongue la vida útil de sus equipos de cómputo
              </h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                El polvo, la temperatura elevada y la falta de optimización lógica son las principales causas del deterioro prematuro de computadores y servidores. Nuestras jornadas de <strong>mantenimiento preventivo periódico</strong> garantizan rendimiento óptimo y evitan paradas no programadas.
              </p>
              <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">
                Ejecutamos protocolos técnicos rigurosos de limpieza física interna, renovación de pasta térmica, diagnóstico de discos duros y desinfección de software.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/cotizador-outsourcing"
                  className="inline-flex items-center space-x-2 px-7 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-stone-100 bg-[#1F2923] hover:bg-[#141C17] shadow-md transition-all"
                >
                  <span>Incluir en Plan Outsourcing</span>
                  <ArrowRight className="w-4 h-4 text-[#B86B42]" />
                </Link>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hola INTEPE S.A.S., deseo cotizar una jornada de mantenimiento preventivo para los computadores de mi empresa.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-4 rounded-xl font-semibold text-xs text-stone-800 bg-white border border-[#E8E2D5] hover:bg-[#F5F0E6] transition-all flex items-center space-x-2 shadow-2xs"
                >
                  <MessageSquare className="w-4 h-4 text-[#B86B42]" />
                  <span>Consultar por WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#FAF6EE] p-8 sm:p-10 rounded-3xl border border-[#E8E2D5] space-y-5 shadow-xs">
              <h3 className="font-bold text-stone-900 text-base flex items-center">
                <Wrench className="w-4 h-4 mr-2 text-[#B86B42]" />
                Beneficios del Mantenimiento Programado
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-sm text-stone-700">
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#B86B42] shrink-0 mt-0.5" />
                  <span>Reducción de hasta un 80% en fallas imprevistas de hardware.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#B86B42] shrink-0 mt-0.5" />
                  <span>Menor temperatura de operación en procesadores y fuentes de poder.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#B86B42] shrink-0 mt-0.5" />
                  <span>Detección temprana de discos duros con sectores defectuosos.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#B86B42] shrink-0 mt-0.5" />
                  <span>Informe técnico detallado del estado de cada equipo evaluado.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Protocolo de Mantenimiento */}
      <div className="bg-[#FAF6EE] py-24 border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-800 bg-white px-3.5 py-1 rounded-full border border-[#E8E2D5] shadow-2xs">
              Protocolo Técnico
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-950">
              Mantenimiento Físico & Lógico Integral
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Limpieza Física Interna', desc: 'Soplado con aire seco, desensamble de ventiladores, disipadores y limpieza de conectores.', icon: Cpu },
              { step: '02', title: 'Pasta Térmica', desc: 'Retiro de pasta seca y aplicación de pasta térmica de alta conductividad en CPU y GPU.', icon: Wrench },
              { step: '03', title: 'Diagnóstico de Hardware', desc: 'Pruebas de salud a memorias RAM, estado S.M.A.R.T. de discos y voltajes de fuente.', icon: HardDrive },
              { step: '04', title: 'Optimización Lógica', desc: 'Limpieza de temporales, optimización del arranque, parches de seguridad y antivirus.', icon: ShieldCheck },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-7 rounded-3xl bg-white border border-[#E8E2D5] shadow-xs space-y-3 hover:border-[#B86B42]/50 hover:-translate-y-1 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#B86B42] bg-[#F5F0E6] px-2 py-0.5 rounded-md">
                      Paso {item.step}
                    </span>
                    <Icon className="w-5 h-5 text-stone-700" />
                  </div>
                  <h4 className="text-base font-bold text-stone-900">{item.title}</h4>
                  <p className="text-stone-600 text-xs leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
};
