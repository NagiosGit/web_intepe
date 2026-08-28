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
  MessageSquare,
  Terminal,
  RefreshCw,
  TrendingDown
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { TrustSLASection } from '../components/home/TrustSLASection';

export const OutsourcingTIPage: React.FC = () => {
  const modules = [
    { name: 'Mesa de Ayuda (Help Desk)', desc: 'Atención multicanal L1, L2 y L3 para incidentes en puestos de trabajo.', icon: Headset },
    { name: 'Servidores & Virtualización', desc: 'Administración de servidores Windows Server, Linux y entornos Proxmox.', icon: Server },
    { name: 'Redes & Ciberseguridad', desc: 'Configuración de Firewalls (Fortinet, MikroTik), switches y Wi-Fi empresarial.', icon: Wifi },
    { name: 'Servicios IMAC', desc: 'Instalaciones, traslados, movimientos y alistamiento de nuevos puestos de trabajo.', icon: RefreshCw },
    { name: 'Mantenimiento Preventivo', desc: 'Limpieza física periódica, cambio de pasta térmica y diagnóstico de discos SSD.', icon: Server },
    { name: 'Backup & Recuperación (DRP)', desc: 'Copias de seguridad automatizadas locales y en la nube con pruebas periódicas.', icon: Database },
    { name: 'Monitoreo Proactivo 24/7', desc: 'Supervisión de salud de servidores, almacenamiento, enlaces y servicios críticos.', icon: Clock },
    { name: 'Licenciamiento & Cumplimiento', desc: 'Gestión y legalización de licencias Microsoft 365, Google Workspace y antivirus.', icon: ShieldCheck },
    { name: 'Dirección Técnica & Asesoría', desc: 'Acompañamiento estratégico en compra de equipos, proyectos y presupuestos de TI.', icon: Briefcase }
  ];

  return (
    <div className="bg-[#0F172A] text-slate-100 min-h-screen">
      <PageHeader
        badge="Gestión Integral de TI para Empresas"
        title="Outsourcing de TI Integral"
        subtitle="Su departamento de tecnología bajo control con ingenieros certificados, mesa de ayuda dedicada y acuerdos de nivel de servicio (SLA)."
        breadcrumbCurrent="Outsourcing TI"
      />

      {/* Intro Section */}
      <div className="bg-[#0F172A] py-20 cyber-grid border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="tech-badge">
                <Terminal className="w-3.5 h-3.5 text-[#FF7120]" />
                <span>DEPARTAMENTO TI TERCERIZADO</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-['Space_Grotesk']">
                Administre, proteja y optimice su tecnología sin costos laborales fijos
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                El servicio de <strong className="text-white">Outsourcing de TI de INTEPE S.A.S.</strong> asume la responsabilidad integral del área de sistemas de su organización. Centralizamos la Mesa de Ayuda para usuarios finales, el mantenimiento preventivo de computadores y la administración experta de servidores y redes.
              </p>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
                A diferencia de contratar un técnico interno aislado, con INTEPE su empresa accede a un <strong className="text-slate-200">equipo multidisciplinario de ingenieros</strong> especializados en soporte, cloud, ciberseguridad y desarrollo.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/cotizador-outsourcing"
                  className="btn-cyber-primary text-xs"
                >
                  <span>CALCULAR TARIFA OUTSOURCING</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/help-desk"
                  className="btn-cyber-outline text-xs"
                >
                  <Headset className="w-4 h-4 text-cyan-400" />
                  <span>VER MESA DE AYUDA (HELP DESK)</span>
                </Link>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hola INTEPE S.A.S., deseo cotizar el Outsourcing TI para mi empresa.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cyber-outline text-xs"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>CONSULTAR POR WHATSAPP</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 cyber-card p-8 sm:p-10 rounded-lg hud-box border border-white/10 space-y-5">
              <div className="hud-corner-tl"></div>
              <div className="hud-corner-br"></div>
              
              <h3 className="font-bold text-white text-base flex items-center font-['Space_Grotesk']">
                <Briefcase className="w-4 h-4 mr-2 text-[#FF7120]" />
                ¿Por qué elegir Outsourcing con INTEPE?
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-300 font-sans">
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF7120] shrink-0 mt-0.5" />
                  <span><strong>Cero pasivos laborales:</strong> Factura de servicio 100% deducible de impuestos.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF7120] shrink-0 mt-0.5" />
                  <span><strong>Continuidad sin vacaciones ni bajas:</strong> Equipo siempre disponible.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF7120] shrink-0 mt-0.5" />
                  <span><strong>Mesa de Ayuda dedicada:</strong> Atención en &lt; 15 min para todos sus usuarios.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF7120] shrink-0 mt-0.5" />
                  <span><strong>Ingenieros L1, L2 y L3:</strong> Soporte desde ofimática hasta servidores y firewalls.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* 9 Modules Grid */}
      <div className="bg-[#0F172A] py-24 border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="tech-badge">
              <span>ALCANCE INTEGRAL 360°</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-['Space_Grotesk']">
              Pilares de Cobertura del Servicio de Outsourcing
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Un modelo integral que abarca desde la atención diaria al usuario final hasta la infraestructura crítica de servidores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {modules.map((mod, idx) => {
              const Icon = mod.icon;
              return (
                <div key={idx} className="cyber-card p-6 rounded-lg hud-box space-y-3 group hover:border-[#FF7120]/40 transition-colors">
                  <div className="hud-corner-tl"></div>
                  <div className="hud-corner-br"></div>
                  <div className="w-9 h-9 rounded bg-[#FF7120]/10 border border-[#FF7120]/30 flex items-center justify-center text-[#FF7120] group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-white font-['Space_Grotesk'] group-hover:text-[#FF7120] transition-colors">{mod.name}</h4>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">{mod.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Financial Comparison: In-House vs Outsourcing */}
      <section className="py-20 bg-[#0F172A] border-b border-white/10 cyber-grid relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <div className="tech-badge">
              <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
              <span>OPTIMIZACIÓN DE COSTOS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-['Space_Grotesk']">
              Comparativa: Técnico Interno vs Outsourcing con INTEPE
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contratación Interna */}
            <div className="cyber-card p-8 rounded-lg border border-red-500/20 space-y-4 bg-red-500/[0.02]">
              <div className="flex items-center justify-between border-b border-red-500/20 pb-3">
                <span className="font-mono text-xs font-bold text-red-400 uppercase">// CONTRATACIÓN DIRECTA</span>
                <span className="text-xs text-red-400">Riesgoso & Costoso</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 font-sans">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Salario fijo + prestaciones + cesantías + seguridad social (+50% sobrecosto).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Conocimiento limitado a una sola persona (si se enferma o renuncia, la empresa queda sin soporte).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>No cuenta con herramientas corporativas de monitoreo ni mesa de tickets.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold">✕</span>
                  <span>Responsabilidad legal y pasivo laboral permanente.</span>
                </li>
              </ul>
            </div>

            {/* Outsourcing con INTEPE */}
            <div className="cyber-card p-8 rounded-lg border border-emerald-500/40 space-y-4 bg-emerald-500/[0.02] shadow-[0_0_30px_rgba(16,185,129,0.1)]">
              <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3">
                <span className="font-mono text-xs font-bold text-emerald-400 uppercase">// OUTSOURCING CON INTEPE</span>
                <span className="text-xs text-emerald-400 font-semibold">Eficiente & Seguro</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 font-sans">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Tarifa mensual fija y predecible, 100% deducible como gasto operativo.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Equipo multidisciplinario completo (L1, L2, L3, Cloud, Redes y Ciberseguridad).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Plataforma de tickets en línea y tiempos de respuesta garantizados por contrato SLA.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Continuidad operacional los 365 días del año sin interrupciones por vacaciones.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <TrustSLASection />
    </div>
  );
};

