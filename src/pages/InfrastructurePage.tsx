import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Link } from 'react-router-dom';
import { Server, Wifi, Database, ShieldCheck, CheckCircle2, ArrowRight, MessageSquare, Terminal } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const InfrastructurePage: React.FC = () => {
  return (
    <div className="bg-[#080B0E] text-slate-100">
      <PageHeader
        badge="Servidores, Redes y Virtualización"
        title="Infraestructura Tecnológica"
        subtitle="Diseño, configuración, administración y monitoreo de entornos empresariales de alta disponibilidad."
        breadcrumbCurrent="Infraestructura"
      />

      {/* Intro Section */}
      <div className="bg-[#080B0E] py-24 border-b border-white/10 cyber-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="tech-badge">
                <Terminal className="w-3.5 h-3.5 text-[#FF7120]" />
                <span>ALTA DISPONIBILIDAD & SEGURIDAD</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-['Space_Grotesk']">
                Bases sólidas para la operación continua de su negocio
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                Diseñamos y administramos la infraestructura física y virtual que soporta las aplicaciones críticas de su empresa: servidores locales y en la nube, cableado estructurado, switches, routers, puntos de acceso Wi-Fi y sistemas de almacenamiento NAS.
              </p>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
                Priorizamos la redundancia, la velocidad de transferencia y la seguridad perimetral para proteger su información institucional.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/cotizador-outsourcing"
                  className="btn-cyber-primary text-xs"
                >
                  <span>COTIZAR INFRAESTRUCTURA TI</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hola INTEPE S.A.S., deseo consultar sobre administración de servidores e infraestructura.')}`}
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
                <Server className="w-4 h-4 mr-2 text-[#FF7120]" />
                Capacidades de Infraestructura
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-300 font-sans">
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF7120] shrink-0 mt-0.5" />
                  <span>Windows Server (Active Directory, DNS, DHCP, File Server).</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF7120] shrink-0 mt-0.5" />
                  <span>Servidores Linux (Ubuntu, Debian, Rocky, PostgreSQL).</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF7120] shrink-0 mt-0.5" />
                  <span>Virtualización de entornos (VMware, Hyper-V, Proxmox VE).</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF7120] shrink-0 mt-0.5" />
                  <span>Redes corporativas, VLANs, VPNs y Wi-Fi de alta densidad.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Pilares de Infraestructura */}
      <div className="bg-[#080B0E] py-24 border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="tech-badge">
              <span>SERVICIOS ESPECIALIZADOS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-['Space_Grotesk']">
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
              { title: 'Virtualización Proxmox & VMware', desc: 'Consolidación de múltiples servidores físicos en clústeres virtuales de alta disponibilidad.', icon: Server },
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
