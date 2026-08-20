import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Server, 
  Headset, 
  Wifi, 
  Database,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const OutsourcingTIPage: React.FC = () => {
  const modules = [
    { name: 'Soporte técnico', desc: 'Atención especializada para resolver fallas en puestos de trabajo.', icon: Headset },
    { name: 'Help Desk', desc: 'Mesa de ayuda ágil con atención remota y presencial.', icon: Briefcase },
    { name: 'Administración de sistemas', desc: 'Gestión y control de sistemas operativos y cuentas de usuario.', icon: Server },
    { name: 'Servidores', desc: 'Administración de servidores Windows Server y Linux.', icon: Server },
    { name: 'Redes', desc: 'Configuración de conectividad LAN/WAN y Wi-Fi empresarial.', icon: Wifi },
    { name: 'Monitoreo', desc: 'Supervisión de salud de equipos, recursos y enlaces.', icon: Clock },
    { name: 'Seguridad', desc: 'Protección de endpoints, antivirus y políticas de acceso.', icon: ShieldCheck },
    { name: 'Backup', desc: 'Copias de seguridad automatizadas locales y en la nube.', icon: Database },
    { name: 'Infraestructura', desc: 'Mantenimiento preventivo y correctivo periódico.', icon: Server }
  ];

  return (
    <div>
      <PageHeader
        badge="Gestión Integral de TI"
        title="Outsourcing TI"
        subtitle="Su tecnología bajo control con atención rápida, ingenieros especializados y respaldo continuo."
        breadcrumbCurrent="Outsourcing TI"
      />

      {/* 1. Intro Section (Clean Ivory / White) */}
      <div className="bg-[#FDFBF7] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-950 tracking-tight">
                Gestión profesional de la tecnología de su empresa
              </h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                El servicio de <strong>Outsourcing de TI de INTEPE S.A.S.</strong> asume la responsabilidad integral de mantener, administrar y optimizar la infraestructura tecnológica de su organización, permitiendo que su equipo se concentre 100% en los objetivos del negocio.
              </p>
              <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">
                Combinamos atención rápida a usuarios finales (Help Desk L1/L2) con administración proactiva de servidores, redes, copias de seguridad y licenciamiento oficial.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/cotizador-outsourcing"
                  className="inline-flex items-center space-x-2 px-7 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-stone-100 bg-[#1F2923] hover:bg-[#141C17] shadow-md transition-all"
                >
                  <span>Cotizar Outsourcing TI</span>
                  <ArrowRight className="w-4 h-4 text-[#B86B42]" />
                </Link>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hola INTEPE S.A.S., deseo consultar sobre sus planes de Outsourcing TI.')}`}
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
                <Briefcase className="w-4 h-4 mr-2 text-[#B86B42]" />
                Beneficios Clave del Servicio
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-sm text-stone-700">
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#B86B42] shrink-0 mt-0.5" />
                  <span>Reducción de costos fijos y eliminación de pasivos laborales.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#B86B42] shrink-0 mt-0.5" />
                  <span>Equipo multidisciplinario con ingenieros especializados.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#B86B42] shrink-0 mt-0.5" />
                  <span>Tiempos de respuesta establecidos mediante acuerdos de servicio (SLA).</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#B86B42] shrink-0 mt-0.5" />
                  <span>Mayor estabilidad y seguridad en sus datos empresariales.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Modules Grid on Contrasting #FAF6EE Background */}
      <div className="bg-[#FAF6EE] border-t border-b border-[#E8E2D5] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-800 bg-white px-3.5 py-1 rounded-full border border-[#E8E2D5] shadow-2xs">
              Módulos Incluidos
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-950">
              Cobertura completa de su infraestructura
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm">
              Servicios integrados en una única tarifa mensual predecible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {modules.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div key={idx} className="p-7 rounded-3xl bg-white border border-[#E8E2D5] shadow-xs space-y-3 hover:border-[#B86B42]/50 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F0E6] flex items-center justify-center text-stone-800">
                    <Icon className="w-5 h-5 text-[#B86B42]" />
                  </div>
                  <h4 className="text-base font-bold text-stone-900">{m.name}</h4>
                  <p className="text-stone-600 text-xs leading-relaxed">{m.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Bottom CTA Section (Warm Deep Forest) */}
      <div className="bg-[#1F2923] text-white py-24 border-t border-stone-800">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
            Calcule el costo de su Outsourcing en tiempo real
          </h3>
          <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Utilice nuestro cotizador interactivo para obtener un estimado transparente según el número de puestos de trabajo y servidores de su empresa.
          </p>
          <div className="pt-2">
            <Link
              to="/cotizador-outsourcing"
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-stone-900 bg-[#FDFBF7] hover:bg-[#FAF6EE] shadow-lg transition-all"
            >
              <span>Abrir Cotizador Interactivo</span>
              <ArrowRight className="w-4 h-4 text-[#B86B42]" />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};
