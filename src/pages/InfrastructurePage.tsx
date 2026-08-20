import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Link } from 'react-router-dom';
import { Server, Wifi, Database, ShieldCheck, CheckCircle2, ArrowRight, MessageSquare } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const InfrastructurePage: React.FC = () => {
  return (
    <div>
      <PageHeader
        badge="Servidores, Redes y Virtualización"
        title="Infraestructura Tecnológica"
        subtitle="Diseño, configuración, administración y monitoreo de entornos empresariales de alta disponibilidad."
        breadcrumbCurrent="Infraestructura"
      />

      {/* 1. Intro Section */}
      <div className="bg-[#FDFBF7] py-24 border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-950 tracking-tight">
                Bases sólidas para la operación continua de su negocio
              </h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                Diseñamos y administramos la infraestructura física y virtual que soporta las aplicaciones críticas de su empresa: servidores locales y en la nube, cableado estructurado, switches, routers, puntos de acceso Wi-Fi y sistemas de almacenamiento NAS.
              </p>
              <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">
                Priorizamos la redundancia, la velocidad de transferencia y la seguridad perimetral para proteger su información institucional.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/cotizador-outsourcing"
                  className="inline-flex items-center space-x-2 px-7 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-stone-100 bg-[#1F2923] hover:bg-[#141C17] shadow-md transition-all"
                >
                  <span>Cotizar Infraestructura TI</span>
                  <ArrowRight className="w-4 h-4 text-[#B86B42]" />
                </Link>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hola INTEPE S.A.S., deseo consultar sobre administración de servidores e infraestructura.')}`}
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
                <Server className="w-4 h-4 mr-2 text-[#B86B42]" />
                Capacidades de Infraestructura
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-sm text-stone-700">
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#B86B42] shrink-0 mt-0.5" />
                  <span>Windows Server (Active Directory, DNS, DHCP, File Server).</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#B86B42] shrink-0 mt-0.5" />
                  <span>Servidores Linux (Ubuntu, Debian, CentOS, bases de datos).</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#B86B42] shrink-0 mt-0.5" />
                  <span>Virtualización de entornos (VMware, Hyper-V, Proxmox).</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#B86B42] shrink-0 mt-0.5" />
                  <span>Redes corporativas, VLANs, VPNs y Wi-Fi empresarial de alta densidad.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Arquitectura de Red */}
      <div className="bg-[#FAF6EE] py-24 border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-800 bg-white px-3.5 py-1 rounded-full border border-[#E8E2D5] shadow-2xs">
              Servicios Especializados
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-950">
              Pilares de Infraestructura
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Administración de Servidores', desc: 'Monitoreo de recursos (CPU, RAM, Disco), aplicación de parches de seguridad y balanceo de carga.', icon: Server },
              { title: 'Redes & Conectividad', desc: 'Configuración de routers, switches administrables, segmentación por VLANs y enlaces VPN seguros.', icon: Wifi },
              { title: 'Copias de Seguridad (Backup)', desc: 'Esquemas 3-2-1 con copias locales en NAS y replicación en la nube para recuperación rápida ante desastres.', icon: Database },
              { title: 'Seguridad Perimetral', desc: 'Configuración de Firewalls, filtrado de contenido y políticas de navegación segura.', icon: ShieldCheck },
              { title: 'Migración a Servidores Cloud', desc: 'Traslado seguro de cargas de trabajo a entornos Cloud escalables.', icon: Server },
              { title: 'Monitoreo de Salud 24/7', desc: 'Alertas automáticas ante caídas de servicio, saturación de enlaces o intentos no autorizados.', icon: CheckCircle2 },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-7 rounded-3xl bg-white border border-[#E8E2D5] shadow-xs space-y-3 hover:border-[#B86B42]/50 hover:-translate-y-1 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F0E6] flex items-center justify-center text-stone-800">
                    <Icon className="w-5 h-5 text-[#B86B42]" />
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
