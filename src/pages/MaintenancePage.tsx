import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Link } from 'react-router-dom';
import { Wrench, CheckCircle2, ArrowRight, MessageSquare, ShieldCheck, HardDrive, Cpu } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const MaintenancePage: React.FC = () => {
  const steps = [
    { title: 'Limpieza Física Interna', desc: 'Desensamble y remoción profunda de polvo y residuos en disipadores y ventiladores.', icon: Wrench },
    { title: 'Cambio de Pasta Térmica', desc: 'Aplicación de compuesto térmico de alta conductividad para evitar recalentamientos.', icon: Cpu },
    { title: 'Diagnóstico de Almacenamiento', desc: 'Pruebas SMART de salud a discos duros y unidades de estado sólido (SSD).', icon: HardDrive },
    { title: 'Optimización de Software', desc: 'Desinfección de malware, eliminación de temporales y actualización de seguridad.', icon: ShieldCheck }
  ];

  return (
    <div>
      <PageHeader
        badge="Cuidado & Rendimiento"
        title="Mantenimiento Preventivo y Correctivo"
        subtitle="Pólizas periódicas de mantenimiento de equipos de cómputo y servidores para prevenir paradas imprevistas."
        breadcrumbCurrent="Mantenimiento"
      />

      {/* 1. Main 2-Column Overview (Clean White) */}
      <div className="bg-white py-20 border-b border-[#D8E1EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
                Prolongue la vida útil de sus computadores y evite fallas
              </h2>
              <p className="text-[#243447] text-base leading-relaxed">
                El polvo, las altas temperaturas y la acumulación de software innecesario degradan el rendimiento de los equipos de cómputo corporativos. En <strong>INTEPE S.A.S.</strong> brindamos servicios programados de mantenimiento preventivo y atención correctiva inmediata ante fallas de hardware o software.
              </p>
              <p className="text-[#64748B] text-sm leading-relaxed">
                Realizamos diagnósticos completos del estado de salud de discos, memorias, fuentes y ventilación, emitiendo un informe técnico de cada máquina.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  to="/contacto"
                  className="px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#0077C8] hover:bg-[#0062a6] shadow-md shadow-[#0077C8]/20 transition-all flex items-center space-x-2"
                >
                  <span>Solicitar Jornada de Mantenimiento</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hola INTEPE S.A.S., deseo cotizar mantenimiento preventivo para los computadores de mi empresa.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl font-semibold text-xs text-[#0B1F3A] bg-[#F7F9FC] border border-[#D8E1EA] hover:bg-[#EAF5FC] transition-all flex items-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#0077C8]" />
                  <span>Consultar por WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#F7F9FC] p-8 rounded-3xl border border-[#D8E1EA] space-y-4 shadow-sm">
              <h3 className="font-bold text-[#0B1F3A] text-lg flex items-center">
                <Wrench className="w-5 h-5 mr-2 text-[#B86F4B]" />
                Alcance del Mantenimiento:
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#243447]">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0077C8] shrink-0 mt-0.5" />
                  <span>Limpieza interna física de componentes y disipadores.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0077C8] shrink-0 mt-0.5" />
                  <span>Cambio de pasta térmica de alto rendimiento.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0077C8] shrink-0 mt-0.5" />
                  <span>Pruebas de diagnóstico a discos duros / SSD y memoria RAM.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0077C8] shrink-0 mt-0.5" />
                  <span>Optimización del sistema operativo y arranque del equipo.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0077C8] shrink-0 mt-0.5" />
                  <span>Desinfección de virus, malware y software no deseado.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B86F4B] shrink-0 mt-0.5" />
                  <span>Actualización de parches críticos de seguridad.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Step by Step Highlights (Contrasting #F7F9FC Background) */}
      <div className="bg-[#F7F9FC] py-20 border-b border-[#D8E1EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0077C8] bg-white px-3.5 py-1 rounded-full border border-[#D8E1EA] shadow-2xs">
              Protocolo Técnico
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">
              Procedimiento en cada equipo de cómputo
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, idx) => {
              const Icon = st.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-[#D8E1EA] shadow-sm space-y-3 hover:border-[#0077C8] transition-all">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF5FC] flex items-center justify-center text-[#0077C8] shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-[#0B1F3A]">{st.title}</h4>
                  <p className="text-[#64748B] text-xs leading-relaxed">{st.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Bottom Action Section (Clean White) */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">
            ¿Cuándo fue el último mantenimiento de sus computadores?
          </h3>
          <p className="text-[#243447] text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Programe una jornada preventiva para su oficina o adquiera una póliza de atención periódica.
          </p>
          <div className="pt-2">
            <Link
              to="/contacto"
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#0077C8] hover:bg-[#0062a6] shadow-lg shadow-[#0077C8]/20 transition-all"
            >
              <span>Solicitar Cotización de Jornada</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};
