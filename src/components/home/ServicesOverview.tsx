import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Headset, 
  Server, 
  Wrench, 
  Cloud, 
  Check, 
  ArrowRight, 
  Terminal
} from 'lucide-react';

export const ServicesOverview: React.FC = () => {
  return (
    <section className="py-24 bg-[#080B0E] border-b border-white/10 relative overflow-hidden cyber-grid">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#FF7120]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="tech-badge">
            <Terminal className="w-3.5 h-3.5 text-[#FF7120]" />
            <span>PORTAFOLIO DE SERVICIOS TI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Space_Grotesk']">
            Soluciones <span className="text-[#FF7120]">Tecnológicas</span> Integrales
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-sans">
            Arquitectura de servicios corporativos diseñada para blindar, acelerar y escalar la operación de su compañía.
          </p>
        </div>

        {/* Bento Grid Layout Cyber Dark */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          
          {/* Bento Card 1: Outsourcing TI (Destacado - 8 cols en lg) */}
          <div className="lg:col-span-8 cyber-card rounded-lg p-8 sm:p-10 hud-box flex flex-col justify-between group">
            <div className="hud-corner-tl"></div>
            <div className="hud-corner-tr"></div>
            <div className="hud-corner-bl"></div>
            <div className="hud-corner-br"></div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-[#FF7120]/10 border border-[#FF7120]/30 flex items-center justify-center text-[#FF7120] group-hover:scale-105 transition-transform">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-bold text-[#FF7120] uppercase tracking-wider block">
                      [01 // CORE SERVICE]
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      DEPARTAMENTO DE TI COMPLETO
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded bg-[#FF7120]/10 text-[#FF7120] border border-[#FF7120]/30">
                  FLAGSHIP
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-['Space_Grotesk'] group-hover:text-[#FF853A] transition-colors">
                  Outsourcing de TI Integral
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed max-w-2xl font-sans">
                  Asumimos la gestión total del departamento de sistemas de su empresa. Mesa de ayuda a usuarios, mantenimiento preventivo, administración de servidores, redes y copias de seguridad continuas.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/10">
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
                  <Check className="w-4 h-4 text-[#FF7120] shrink-0" />
                  <span>Soporte remoto y presencial ilimitado</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
                  <Check className="w-4 h-4 text-[#FF7120] shrink-0" />
                  <span>Administración de servidores y redes</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
                  <Check className="w-4 h-4 text-[#FF7120] shrink-0" />
                  <span>Mantenimiento preventivo programado</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
                  <Check className="w-4 h-4 text-[#FF7120] shrink-0" />
                  <span>Tarifa mensual fija sin pasivos laborales</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <Link
                to="/outsourcing-ti"
                className="btn-cyber-outline text-xs py-2 px-4"
              >
                <span>VER DETALLE DE OUTSOURCING</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FF7120]" />
              </Link>
              <Link
                to="/cotizador-outsourcing"
                className="btn-cyber-primary text-xs py-2 px-4"
              >
                <span>CALCULAR COSTO MENSUAL →</span>
              </Link>
            </div>
          </div>

          {/* Bento Card 2: Mesa de Ayuda / Help Desk (4 cols en lg) */}
          <div className="lg:col-span-4 cyber-card rounded-lg p-8 hud-box flex flex-col justify-between group hover:border-cyan-500/50 transition-colors">
            <div className="hud-corner-tl"></div>
            <div className="hud-corner-tr"></div>
            <div className="hud-corner-bl"></div>
            <div className="hud-corner-br"></div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <Headset className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    SLA &lt; 15 MIN
                  </span>
                  <span className="text-xs font-mono font-bold text-cyan-400">[02]</span>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white tracking-tight font-['Space_Grotesk'] group-hover:text-cyan-400 transition-colors">
                  Mesa de Ayuda (Help Desk)
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Asistencia técnica inmediata multicanal para usuarios con escalamiento L1, L2 y L3 vía WhatsApp, tickets y acceso remoto.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10 text-xs font-mono text-slate-300">
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>WhatsApp Corporativo + Tickets</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Soporte remoto y visitas en Bogotá</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Resolución de ofimática, SO y redes</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10">
              <Link
                to="/help-desk"
                className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center justify-between group-hover:translate-x-1 transition-all"
              >
                <span>VER DETALLE MESA DE AYUDA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Bento Card 3: Infraestructura & Servidores (4 cols) */}
          <div className="lg:col-span-4 cyber-card rounded-lg p-8 hud-box flex flex-col justify-between group">
            <div className="hud-corner-tl"></div>
            <div className="hud-corner-tr"></div>
            <div className="hud-corner-bl"></div>
            <div className="hud-corner-br"></div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                  <Server className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-bold text-amber-400">[03]</span>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white tracking-tight font-['Space_Grotesk'] group-hover:text-amber-400 transition-colors">
                  Infraestructura & Redes
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Diseño, configuración y administración de servidores Windows/Linux, virtualización Proxmox, redes Wi-Fi y cableado estructurado.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10 text-xs font-mono text-slate-300">
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Servidores Windows / Linux</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Firewall, VPN y Switches</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Copias de seguridad en nube</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10">
              <Link
                to="/infraestructura-tecnologica"
                className="text-xs font-mono font-bold text-amber-400 hover:text-amber-300 flex items-center justify-between group-hover:translate-x-1 transition-all"
              >
                <span>VER INFRAESTRUCTURA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Bento Card 4: Mantenimiento Preventivo (4 cols) */}
          <div className="lg:col-span-4 cyber-card rounded-lg p-8 hud-box flex flex-col justify-between group">
            <div className="hud-corner-tl"></div>
            <div className="hud-corner-tr"></div>
            <div className="hud-corner-bl"></div>
            <div className="hud-corner-br"></div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <Wrench className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400">[04]</span>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white tracking-tight font-['Space_Grotesk'] group-hover:text-emerald-400 transition-colors">
                  Mantenimiento Preventivo
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Limpieza física de hardware, optimización de sistema operativo, eliminación de malware y diagnósticos periódicos.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10 text-xs font-mono text-slate-300">
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Extensión de vida útil de equipos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Hojas de vida e inventario técnico</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Prevención de fallas críticas</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10">
              <Link
                to="/mantenimiento"
                className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 flex items-center justify-between group-hover:translate-x-1 transition-all"
              >
                <span>VER MANTENIMIENTO</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Bento Card 5: Google Workspace & Cloud (4 cols) */}
          <div className="lg:col-span-4 cyber-card rounded-lg p-8 hud-box flex flex-col justify-between group">
            <div className="hud-corner-tl"></div>
            <div className="hud-corner-tr"></div>
            <div className="hud-corner-bl"></div>
            <div className="hud-corner-br"></div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                  <Cloud className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-bold text-blue-400">[05]</span>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white tracking-tight font-['Space_Grotesk'] group-hover:text-blue-400 transition-colors">
                  Google Workspace & Cloud
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Implementación de correo corporativo, almacenamiento en Drive, seguridad 2FA y migración fluida de servidores a la nube.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10 text-xs font-mono text-slate-300">
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Correo institucional @suempresa</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Administración de licencias</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Migración sin pérdida de correos</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10">
              <Link
                to="/google-workspace"
                className="text-xs font-mono font-bold text-blue-400 hover:text-blue-300 flex items-center justify-between group-hover:translate-x-1 transition-all"
              >
                <span>VER GOOGLE WORKSPACE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
