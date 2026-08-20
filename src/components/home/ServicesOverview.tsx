import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Headset, 
  Server, 
  Wrench, 
  Cloud, 
  Code2,
  Check,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const ServicesOverview: React.FC = () => {
  return (
    <section className="py-24 bg-[#FAF6EE] border-b border-[#E8E2D5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white border border-[#E8E2D5] text-stone-800 text-xs font-semibold shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B86B42]"></span>
            <span>Portafolio Corporativo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-950 tracking-tight">
            Soluciones tecnológicas para su empresa
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Un portafolio integral diseñado para mantener, proteger y hacer evolucionar la operación de su compañía.
          </p>
        </div>

        {/* Bento Grid Layout Moderno */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          
          {/* Bento Card 1: Outsourcing TI (Destacado - 8 cols en lg) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E2D5] shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#F5F0E6] border border-[#E8E2D5] flex items-center justify-center text-stone-800 group-hover:bg-[#1F2923] group-hover:text-white transition-colors">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#F5F0E6] text-stone-800 border border-[#E8E2D5]">
                  Servicio Principal
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-stone-950 tracking-tight group-hover:text-[#B86B42] transition-colors">
                  Outsourcing de TI Integral
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed max-w-xl">
                  Asumimos la gestión total del departamento de sistemas de su empresa. Mesa de ayuda a usuarios, mantenimiento preventivo, administración de servidores, redes y copias de seguridad continuas.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-[#F5F0E6]">
                <div className="flex items-center space-x-2 text-xs text-stone-800">
                  <Check className="w-3.5 h-3.5 text-[#B86B42] shrink-0" />
                  <span>Soporte remoto y presencial ilimitado</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-stone-800">
                  <Check className="w-3.5 h-3.5 text-[#B86B42] shrink-0" />
                  <span>Administración de servidores y redes</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-stone-800">
                  <Check className="w-3.5 h-3.5 text-[#B86B42] shrink-0" />
                  <span>Mantenimiento preventivo programado</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-stone-800">
                  <Check className="w-3.5 h-3.5 text-[#B86B42] shrink-0" />
                  <span>Tarifa mensual predecible sin pasivos laborales</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#F5F0E6] flex items-center justify-between">
              <Link
                to="/outsourcing-ti"
                className="inline-flex items-center text-xs font-bold text-stone-900 hover:text-[#B86B42] transition-colors"
              >
                <span>Conocer alcance del Outsourcing</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-[#B86B42]" />
              </Link>
              <Link
                to="/cotizador-outsourcing"
                className="text-xs font-bold text-[#B86B42] hover:underline"
              >
                Cotizar en tiempo real →
              </Link>
            </div>
          </div>

          {/* Bento Card 2: Mesa de Ayuda / Help Desk (4 cols en lg) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-8 border border-[#E8E2D5] shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-[#F5F0E6] border border-[#E8E2D5] flex items-center justify-center text-stone-800 group-hover:bg-[#1F2923] group-hover:text-white transition-colors">
                  <Headset className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F5F0E6] text-stone-700">
                  L1 / L2
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-stone-950 tracking-tight group-hover:text-[#B86B42] transition-colors">
                  Mesa de Ayuda (Help Desk)
                </h3>
                <p className="text-stone-600 text-xs leading-relaxed mt-1.5">
                  Atención ágil de incidentes, solicitudes de software, configuración de puestos de trabajo y asistencia remota para sus colaboradores.
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-[#F5F0E6]">
                <div className="flex items-center space-x-2 text-xs text-stone-800">
                  <Check className="w-3.5 h-3.5 text-[#B86B42] shrink-0" />
                  <span>Soporte Windows, Mac y Linux</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-stone-800">
                  <Check className="w-3.5 h-3.5 text-[#B86B42] shrink-0" />
                  <span>Gestión ordenada de tickets</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#F5F0E6]">
              <Link
                to="/help-desk"
                className="inline-flex items-center text-xs font-bold text-stone-900 hover:text-[#B86B42] transition-colors"
              >
                <span>Ver servicio de Help Desk</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#B86B42]" />
              </Link>
            </div>
          </div>

          {/* Bento Card 3: Infraestructura & Servidores (4 cols en lg) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-8 border border-[#E8E2D5] shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-2xl bg-[#F5F0E6] border border-[#E8E2D5] flex items-center justify-center text-stone-800 group-hover:bg-[#1F2923] group-hover:text-white transition-colors">
                <Server className="w-5 h-5" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-stone-950 tracking-tight group-hover:text-[#B86B42] transition-colors">
                  Infraestructura & Servidores
                </h3>
                <p className="text-stone-600 text-xs leading-relaxed mt-1.5">
                  Administración de Windows Server, Linux, redes estructuradas, Wi-Fi empresarial, virtualización y esquemas de copias de seguridad.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#F5F0E6]">
              <Link
                to="/infraestructura-tecnologica"
                className="inline-flex items-center text-xs font-bold text-stone-900 hover:text-[#B86B42] transition-colors"
              >
                <span>Conocer infraestructura</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#B86B42]" />
              </Link>
            </div>
          </div>

          {/* Bento Card 4: Desarrollo de Software a Medida (Destacado - 8 cols en lg) */}
          <div className="lg:col-span-8 bg-[#1F2923] text-white rounded-3xl p-8 sm:p-10 border border-stone-800 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                  <Code2 className="w-6 h-6 text-[#B86B42]" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-stone-200 border border-white/15 flex items-center">
                  <Sparkles className="w-3 h-3 text-[#B86B42] mr-1" />
                  Ingeniería & Software
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Desarrollo de Software & Sistemas ERP
                </h3>
                <p className="text-stone-300 text-sm leading-relaxed max-w-xl">
                  Construimos aplicaciones web, sistemas empresariales ERP a la medida y soluciones de control como <strong>GranjaWP</strong> e <strong>InvernaderoFM</strong>, adaptadas al 100% de los procesos de su empresa sin cobros por usuario.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-white/10">
                <div className="flex items-center space-x-2 text-xs text-stone-300">
                  <Check className="w-3.5 h-3.5 text-[#B86B42] shrink-0" />
                  <span>Sistemas ERP y facturación a medida</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-stone-300">
                  <Check className="w-3.5 h-3.5 text-[#B86B42] shrink-0" />
                  <span>Plataformas agropecuarias y de control</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <Link
                to="/desarrollo-software"
                className="inline-flex items-center text-xs font-bold text-white hover:text-[#B86B42] transition-colors"
              >
                <span>Explorar capacidades de software</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-[#B86B42]" />
              </Link>
              <Link
                to="/proyectos"
                className="text-xs font-bold text-[#B86B42] hover:underline"
              >
                Ver proyectos reales →
              </Link>
            </div>
          </div>

          {/* Bento Card 5: Mantenimiento Preventivo (6 cols en lg) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 border border-[#E8E2D5] shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-2xl bg-[#F5F0E6] border border-[#E8E2D5] flex items-center justify-center text-stone-800 group-hover:bg-[#1F2923] group-hover:text-white transition-colors">
                <Wrench className="w-5 h-5 text-[#B86B42]" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-stone-950 tracking-tight group-hover:text-[#B86B42] transition-colors">
                  Mantenimiento Preventivo & Correctivo
                </h3>
                <p className="text-stone-600 text-xs leading-relaxed mt-1.5">
                  Jornadas periódicas de limpieza física interna, cambio de pasta térmica, optimización de discos y seguridad para prolongar la vida útil de sus equipos.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#F5F0E6]">
              <Link
                to="/mantenimiento"
                className="inline-flex items-center text-xs font-bold text-stone-900 hover:text-[#B86B42] transition-colors"
              >
                <span>Ver detalles de mantenimiento</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#B86B42]" />
              </Link>
            </div>
          </div>

          {/* Bento Card 6: Google Workspace & Cloud (6 cols en lg) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 border border-[#E8E2D5] shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-2xl bg-[#F5F0E6] border border-[#E8E2D5] flex items-center justify-center text-stone-800 group-hover:bg-[#1F2923] group-hover:text-white transition-colors">
                <Cloud className="w-5 h-5" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-stone-950 tracking-tight group-hover:text-[#B86B42] transition-colors">
                  Google Workspace & Cloud
                </h3>
                <p className="text-stone-600 text-xs leading-relaxed mt-1.5">
                  Implementación, licenciamiento corporativo, migración de cuentas @suempresa.com, almacenamiento en Google Drive y políticas de seguridad.
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#F5F0E6]">
              <Link
                to="/google-workspace"
                className="inline-flex items-center text-xs font-bold text-stone-900 hover:text-[#B86B42] transition-colors"
              >
                <span>Ver servicios Cloud</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#B86B42]" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
