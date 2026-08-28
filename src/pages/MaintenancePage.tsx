import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Link } from 'react-router-dom';
import { Wrench, CheckCircle2, ArrowRight, MessageSquare, ShieldCheck, HardDrive, Cpu, Terminal } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const MaintenancePage: React.FC = () => {
  return (
    <div className="bg-[#0F172A] text-slate-100">
      <PageHeader
        badge="Cuidado y Rendimiento del Hardware"
        title="Mantenimiento Preventivo y Correctivo"
        subtitle="Jornadas técnicas programadas para prolongar la vida útil de computadores, portátiles y servidores."
        breadcrumbCurrent="Mantenimiento"
      />

      {/* Intro Section */}
      <div className="bg-[#0F172A] py-24 border-b border-white/10 cyber-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="tech-badge">
                <Terminal className="w-3.5 h-3.5 text-[#FF7120]" />
                <span>PUESTA A PUNTO & OPTIMIZACIÓN</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-['Space_Grotesk']">
                Prolongue la vida útil de sus equipos de cómputo
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                El polvo, la temperatura elevada y la falta de optimización lógica son las principales causas del deterioro prematuro de computadores y servidores. Nuestras jornadas de <strong className="text-white">mantenimiento preventivo periódico</strong> garantizan rendimiento óptimo y evitan paradas no programadas.
              </p>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
                Ejecutamos protocolos técnicos rigurosos de limpieza física interna, renovación de pasta térmica, diagnóstico de discos duros y desinfección de software.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/cotizador-outsourcing"
                  className="btn-cyber-primary text-xs"
                >
                  <span>INCLUIR EN PLAN OUTSOURCING</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hola INTEPE S.A.S., deseo cotizar una jornada de mantenimiento preventivo para los computadores de mi empresa.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cyber-outline text-xs"
                >
                  <MessageSquare className="w-4 h-4 text-[#FF7120]" />
                  <span>CONSULTAR POR WHATSAPP</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 cyber-card p-8 sm:p-10 rounded-lg hud-box border border-white/10 space-y-5">
              <div className="hud-corner-tl"></div>
              <div className="hud-corner-br"></div>
              
              <h3 className="font-bold text-white text-base flex items-center font-['Space_Grotesk']">
                <Wrench className="w-4 h-4 mr-2 text-[#FF7120]" />
                Beneficios del Mantenimiento Programado
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-300 font-sans">
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF7120] shrink-0 mt-0.5" />
                  <span>Reducción de hasta un 70% en fallas imprevistas de hardware.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF7120] shrink-0 mt-0.5" />
                  <span>Extensión de la vida útil de portátiles, PCs y servidores.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF7120] shrink-0 mt-0.5" />
                  <span>Optimización de velocidad y tiempos de arranque del sistema.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF7120] shrink-0 mt-0.5" />
                  <span>Inventario técnico detallado y hoja de vida de cada activo.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Protocolo de Mantenimiento */}
      <div className="bg-[#0F172A] py-24 border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="tech-badge">
              <span>PROTOCOLO TÉCNICO</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-['Space_Grotesk']">
              ¿Qué incluye la jornada preventiva?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Limpieza Física Interna', desc: 'Sopleteado con aire seco, desensamble de disipadores, limpieza de ventiladores y lubricación de rodamientos.', icon: Wrench },
              { title: 'Renovación de Pasta Térmica', desc: 'Aplicación de compuesto térmico de alto rendimiento en CPU y GPU para control de temperatura.', icon: Cpu },
              { title: 'Diagnóstico de Discos & SSD', desc: 'Análisis de sectores defectuosos, estado de salud S.M.A.R.T. y alerta temprana de desgaste.', icon: HardDrive },
              { title: 'Desinfección & Limpieza Lógica', desc: 'Eliminación de archivos temporales, malware, optimización del registro y gestión de programas de inicio.', icon: ShieldCheck },
              { title: 'Actualizaciones de Seguridad', desc: 'Instalación de parches del sistema operativo, controladores oficiales y firmas antivirus.', icon: CheckCircle2 },
              { title: 'Informe Técnico & Hoja de Vida', desc: 'Entrega de reporte pormenorizado del estado de cada computador con recomendaciones de mejora.', icon: HardDrive },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-7 rounded-lg cyber-card hud-box space-y-3">
                  <div className="hud-corner-tl"></div>
                  <div className="hud-corner-br"></div>
                  <div className="w-10 h-10 rounded bg-[#FF7120]/10 border border-[#FF7120]/30 flex items-center justify-center text-[#FF7120]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-white font-['Space_Grotesk']">{item.title}</h4>
                  <p className="text-xs text-slate-400 font-sans">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
