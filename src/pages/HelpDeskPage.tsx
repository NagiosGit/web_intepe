import React, { useState } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Link } from 'react-router-dom';
import { 
  Headset, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  Terminal, 
  PhoneCall, 
  FileText, 
  Laptop, 
  Users, 
  Check, 
  Activity,
  ChevronDown
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const HelpDeskPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'l1' | 'l2' | 'l3'>('l1');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const channels = [
    {
      icon: MessageSquare,
      title: 'WhatsApp Corporativo',
      desc: 'Canal ágil y directo para que sus colaboradores reporten fallas desde su celular o PC.',
      badge: '< 5 min'
    },
    {
      icon: FileText,
      title: 'Portal de Tickets',
      desc: 'Seguimiento, trazabilidad y tipificación formal de cada solicitud en tiempo real.',
      badge: '24/7'
    },
    {
      icon: Laptop,
      title: 'Soporte Remoto Asistido',
      desc: 'Conexión segura e instantánea mediante herramientas corporativas de escritorio remoto.',
      badge: '< 15 min'
    },
    {
      icon: Users,
      title: 'Asistencia Presencial en Sitio',
      desc: 'Despacho de técnicos e ingenieros para mantenimiento físico y contingencias en Bogotá.',
      badge: 'Programado / Urgente'
    },
    {
      icon: PhoneCall,
      title: 'Atención Telefónica Directa',
      desc: 'Línea de soporte para atención prioritaria a gerencia y usuarios clave.',
      badge: 'Directo'
    }
  ];

  const levels = {
    l1: {
      tag: 'NIVEL 1 // HELP DESK INMEDIATO',
      title: 'Soporte a Usuarios y Ofimática',
      subtitle: 'Primer punto de contacto. Resolución ágil de incidencias comunes en menos de 15 minutos.',
      items: [
        'Configuración de cuentas de correo (Google Workspace, Microsoft 365, Outlook)',
        'Desbloqueo de contraseñas y gestión de accesos de usuarios',
        'Soporte remoto instantáneo para aplicaciones ofimáticas (Office, navegadores, PDF)',
        'Instalación y actualización de software corporativo autorizado',
        'Configuración de impresoras locales, escáneres e impresoras en red',
        'Conexión y configuración de redes Wi-Fi y accesos VPN para teletrabajo'
      ],
      sla: 'Respuesta < 15 min | Resolución 80% en primer contacto'
    },
    l2: {
      tag: 'NIVEL 2 // SOPORTE ESPECIALIZADO',
      title: 'Diagnóstico Avanzado y Hardware',
      subtitle: 'Atención técnica intermedia para problemas de sistema operativo, hardware y red local.',
      items: [
        'Diagnóstico profundo de lentitud y fallas de hardware en computadores y portátiles',
        'Formateo, reinstalación y clonación a unidades de estado sólido (SSD)',
        'Limpieza y desinfección de virus, troyanos, ransomware y malware persistente',
        'Mantenimiento preventivo físico de componentes y cambio de pasta térmica',
        'Resolución de conflictos de red local (IPs, DHCP, switches y puntos de red)',
        'Visitas técnicas presenciales para reemplazo de piezas o contingencias'
      ],
      sla: 'Respuesta < 30 min | Visita presencial según requerimiento'
    },
    l3: {
      tag: 'NIVEL 3 // INFRAESTRUCTURA CRÍTICA',
      title: 'Servidores, Redes y Seguridad Perimetral',
      subtitle: 'Ingenieros seniors para la administración de servidores, plataformas cloud y contingencias críticas.',
      items: [
        'Administración de Servidores Windows Server (Active Directory, DNS, File Server)',
        'Virtualización de servidores sobre Proxmox VE, VMware ESXi e Hyper-V',
        'Configuración y gestión de Firewalls perimetrales (Fortinet, MikroTik, pfSense)',
        'Estrategias de copias de seguridad automatizadas y recuperación ante desastres (DRP)',
        'Administración de servidores Linux (Ubuntu Server, Debian, Rocky Linux)',
        'Mantenimiento y contingencia de bases de datos empresariales y ERPs'
      ],
      sla: 'Atención de emergencias críticas con escalamiento inmediato'
    }
  };

  const steps = [
    {
      num: '01',
      title: 'Reporte del Incidente',
      desc: 'El usuario se comunica vía WhatsApp, portal web de tickets, llamada o correo describiendo el requerimiento.'
    },
    {
      num: '02',
      title: 'Tipificación & Asignación',
      desc: 'El sistema registra el ticket, asigna prioridad y notifica al técnico especialista disponible en menos de 15 minutos.'
    },
    {
      num: '03',
      title: 'Diagnóstico & Soporte',
      desc: 'Se ejecuta la asistencia remota segura o se programa la visita técnica en sitio según la complejidad.'
    },
    {
      num: '04',
      title: 'Validación & Cierre',
      desc: 'El usuario valida que su problema quedó 100% resuelto antes de formalizar el cierre del ticket.'
    },
    {
      num: '05',
      title: 'Reporte de Gestión Mensual',
      desc: 'Entregamos a gerencia métricas claras de incidentes atendidos, tiempos de respuesta e indicadores de mejora.'
    }
  ];

  const modalities = [
    {
      title: 'Mesa de Ayuda 100% Remota',
      badge: 'Ideal Empresas Ligeras',
      desc: 'Atención ilimitada para empresas donde los colaboradores trabajan en modalidad remota o requieren soporte digital continuo.',
      features: [
        'Soporte remoto ilimitado L1/L2',
        'Atención por WhatsApp y portal de tickets',
        'SLA garantizado < 15 min',
        'Gestión de cuentas y correos corporativos',
        'Informes mensuales de incidentes'
      ],
      recommended: false
    },
    {
      title: 'Mesa de Ayuda Híbrida',
      badge: 'MÁS POPULAR // RECOMENDADO',
      desc: 'La combinación perfecta: soporte remoto ilimitado para el día a día + visitas técnicas presenciales programadas y de emergencia.',
      features: [
        'Soporte remoto ilimitado para todos los usuarios',
        'Visitas presenciales periódicas en Bogotá y Sabana',
        'Mantenimiento preventivo físico de computadores',
        'Soporte especializado a servidores y redes',
        'Atención de contingencias en sitio garantizada'
      ],
      recommended: true
    },
    {
      title: 'Ingeniero Residente en Sitio',
      badge: 'Para Medianas & Grandes',
      desc: 'Un profesional técnico dedicado de tiempo completo o medio tiempo dentro de las instalaciones de su compañía.',
      features: [
        'Técnico de sistemas en sus oficinas (L-V)',
        'Atención presencial inmediata a cualquier colaborador',
        'Mantenimiento constante de la infraestructura',
        'Respaldado por el equipo de ingeniería L3 de INTEPE',
        'Cero pasivos laborales ni cargas prestacionales'
      ],
      recommended: false
    },
    {
      title: 'Bolsa de Horas / Por Demanda',
      badge: 'Puntual & Flexible',
      desc: 'Paquete de horas de soporte técnico prepagadas para atender necesidades puntuales o proyectos específicos.',
      features: [
        'Consumo por demanda según necesidad',
        'Vigencia extendida sin vencimiento mensual',
        'Acceso a técnicos e ingenieros especializados',
        'Soporte remoto y presencial según requerimiento',
        'Ideal para picos de trabajo o proyectos temporales'
      ],
      recommended: false
    }
  ];

  const faqs = [
    {
      q: '¿Cómo reportan los empleados de mi empresa un problema a la Mesa de Ayuda?',
      a: 'Ponemos a disposición de su empresa múltiples canales: WhatsApp corporativo dedicado, portal web de tickets, correo electrónico de soporte y línea telefónica directa. Cada solicitud genera automáticamente un número de ticket con seguimiento en tiempo real.'
    },
    {
      q: '¿Cuál es el tiempo de respuesta garantizado (SLA)?',
      a: 'Para incidentes críticos o de primer nivel (L1), nuestro tiempo de primera respuesta es menor a 15 minutos. En incidentes de nivel 2 y 3, el tiempo de diagnóstico y resolución depende de la complejidad, manteniendo siempre comunicación constante con el usuario.'
    },
    {
      q: '¿Qué pasa si el problema no se puede solucionar de forma remota?',
      a: 'Si un incidente de hardware, conectividad física o falla crítica de sistema no puede resolverse vía remota, coordinamos el despacho de un técnico presencial a las instalaciones de su empresa en Bogotá y municipios aledaños de la Sabana.'
    },
    {
      q: '¿Qué plataformas y sistemas operativos cubre el servicio?',
      a: 'Brindamos soporte integral a estaciones de trabajo con Windows (11, 10, 8), macOS (Apple) y distribuciones Linux (Ubuntu, Debian, Fedora), así como dispositivos móviles iOS y Android vinculados al correo corporativo.'
    },
    {
      q: '¿Recibo informes de los incidentes atendidos en mi empresa?',
      a: 'Sí. Mensualmente entregamos a la gerencia un informe consolidado que incluye: cantidad de tickets atendidos, tiempos promedio de respuesta y resolución, clasificación de fallas recurrentes y recomendaciones técnicas de mejora preventiva.'
    }
  ];

  return (
    <div className="bg-[#0F172A] text-slate-100 min-h-screen">
      {/* Page Header */}
      <PageHeader
        badge="Mesa de Ayuda & Asistencia Técnica L1 / L2 / L3"
        title="Mesa de Ayuda (Help Desk Outsourcing)"
        subtitle="Asistencia técnica inmediata multicanal para mantener a sus colaboradores siempre productivos, reduciendo tiempos muertos por fallas informáticas."
        breadcrumbCurrent="Mesa de Ayuda"
      />

      {/* 1. Value Proposition & SLA Telemetry */}
      <section className="py-16 bg-[#0F172A] border-b border-white/10 cyber-grid relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="tech-badge">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>HELPDESK MULTICANAL PARA EMPRESAS</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-['Space_Grotesk'] leading-tight">
                Canalice, resuelva y controle todos los requerimientos TI de su organización
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                La <strong className="text-white">Mesa de Ayuda de INTEPE S.A.S.</strong> actúa como el centro neurálgico de soporte técnico para su empresa. Resolvemos incidentes cotidianos en puestos de trabajo, correos, impresoras, sistemas operativos y redes mediante atención remota inmediata y asistencia presencial en sitio.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded cyber-card border border-white/10">
                  <span className="font-mono text-xl font-bold text-cyan-400 block">&lt; 15 min</span>
                  <span className="text-[11px] text-slate-400 font-sans">Tiempo de respuesta L1</span>
                </div>
                <div className="p-3 rounded cyber-card border border-white/10">
                  <span className="font-mono text-xl font-bold text-emerald-400 block">98.5%</span>
                  <span className="text-[11px] text-slate-400 font-sans">Resolución en primer nivel</span>
                </div>
                <div className="p-3 rounded cyber-card border border-white/10 col-span-2 sm:col-span-1">
                  <span className="font-mono text-xl font-bold text-[#FF7120] block">Multicanal</span>
                  <span className="text-[11px] text-slate-400 font-sans">WhatsApp + Tickets + Remoto</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap gap-3">
                <Link
                  to="/cotizador-outsourcing"
                  className="btn-cyber-primary text-xs py-2.5 px-5"
                >
                  <span>COTIZAR MESA DE AYUDA ONLINE</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hola INTEPE S.A.S., deseo información sobre el servicio de Mesa de Ayuda Outsourcing para mi empresa.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cyber-outline text-xs py-2.5 px-5"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>CONSULTAR POR WHATSAPP</span>
                </a>
              </div>
            </div>

            {/* Micro HUD Live Telemetry Card */}
            <div className="lg:col-span-5 cyber-card p-6 sm:p-8 rounded-lg hud-box border border-white/10 space-y-5">
              <div className="hud-corner-tl"></div>
              <div className="hud-corner-tr"></div>
              <div className="hud-corner-bl"></div>
              <div className="hud-corner-br"></div>

              <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs text-slate-400">
                <span className="text-cyan-400 font-bold flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                  SISTEMA DE GESTIÓN HELPDESK
                </span>
                <span className="text-emerald-400 font-semibold">[EN LÍNEA]</span>
              </div>

              <div className="space-y-3 font-sans text-xs">
                <div className="p-3 rounded bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-white font-semibold">Trazabilidad Total de Tickets</span>
                    <span className="text-[#FF7120]">ITIL Compatible</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Cada usuario cuenta con número de radicado, historial de intervenciones y encuestas de satisfacción al cierre.
                  </p>
                </div>

                <div className="p-3 rounded bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-white font-semibold">Conexión Remota Cifrada</span>
                    <span className="text-cyan-400">TLS 256-bit</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Acceso remoto seguro con consentimiento explícito del colaborador para resolver fallas al instante.
                  </p>
                </div>

                <div className="p-3 rounded bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-white font-semibold">Cobertura Geográfica</span>
                    <span className="text-emerald-400">Bogotá & Sabana</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Atención remota a nivel nacional y visitas presenciales en Bogotá, Chía, Cota, Funza, Mosquera y alrededores.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Multichannel Support */}
      <section className="py-20 bg-[#0F172A] border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="tech-badge">
              <span>CANALES DE ATENCIÓN DIRECTA</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-['Space_Grotesk']">
              Múltiples vías para que su equipo nunca se detenga
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Facilitamos el acceso al soporte técnico para que sus colaboradores no pierdan tiempo buscando a quién acudir.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {channels.map((ch, idx) => {
              const Icon = ch.icon;
              return (
                <div key={idx} className="cyber-card p-5 rounded-lg hud-box flex flex-col justify-between space-y-3 group hover:border-cyan-500/40 transition-colors">
                  <div className="hud-corner-tl"></div>
                  <div className="hud-corner-br"></div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/5 text-cyan-300 border border-white/10">
                        {ch.badge}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-white font-['Space_Grotesk'] group-hover:text-cyan-400 transition-colors">
                      {ch.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed">
                      {ch.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Interactive Escallation Levels (L1, L2, L3) */}
      <section className="py-20 bg-[#0F172A] border-b border-white/10 cyber-grid relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="tech-badge">
              <span>ESTRUCTURA DE ESCALAMIENTO TÉCNICO</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-['Space_Grotesk']">
              Niveles de Atención Especializados L1, L2 y L3
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Cada requerimiento es atendido por el perfil técnico adecuado, garantizando diagnósticos certeros y soluciones definitivas.
            </p>
          </div>

          {/* Level Switcher Tabs */}
          <div className="flex justify-center">
            <div className="inline-flex p-1.5 rounded-lg cyber-card border border-white/10 gap-2">
              <button
                onClick={() => setActiveTab('l1')}
                className={`px-4 sm:px-6 py-2 rounded text-xs font-mono font-bold transition-all ${
                  activeTab === 'l1' 
                    ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(0,229,255,0.4)]' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                [L1] USUARIOS & OFIMÁTICA
              </button>
              <button
                onClick={() => setActiveTab('l2')}
                className={`px-4 sm:px-6 py-2 rounded text-xs font-mono font-bold transition-all ${
                  activeTab === 'l2' 
                    ? 'bg-[#FF7120] text-black shadow-[0_0_20px_rgba(255,113,32,0.4)]' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                [L2] HARDWARE & REDES
              </button>
              <button
                onClick={() => setActiveTab('l3')}
                className={`px-4 sm:px-6 py-2 rounded text-xs font-mono font-bold transition-all ${
                  activeTab === 'l3' 
                    ? 'bg-amber-400 text-black shadow-[0_0_20px_rgba(251,191,36,0.4)]' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                [L3] SERVIDORES & CLOUD
              </button>
            </div>
          </div>

          {/* Level Details Box */}
          <div className="cyber-card p-8 sm:p-10 rounded-lg hud-box border border-white/10 max-w-4xl mx-auto space-y-6">
            <div className="hud-corner-tl"></div>
            <div className="hud-corner-tr"></div>
            <div className="hud-corner-bl"></div>
            <div className="hud-corner-br"></div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#FF7120] tracking-wider block">
                  {levels[activeTab].tag}
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk']">
                  {levels[activeTab].title}
                </h4>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded bg-white/5 text-emerald-400 border border-white/10">
                {levels[activeTab].sla}
              </span>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm font-sans leading-relaxed">
              {levels[activeTab].subtitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {levels[activeTab].items.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Incident Management Workflow */}
      <section className="py-20 bg-[#0F172A] border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="tech-badge">
              <span>METODOLOGÍA DE GESTIÓN</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-['Space_Grotesk']">
              Ciclo de Vida de Atención de Tickets
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Proceso estructurado que garantiza orden, velocidad de resolución y trazabilidad para auditorías.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((st, idx) => (
              <div key={idx} className="cyber-card p-6 rounded-lg hud-box flex flex-col justify-between space-y-3 relative group">
                <div className="hud-corner-tl"></div>
                <div className="hud-corner-br"></div>
                
                <div className="space-y-2">
                  <span className="font-mono text-2xl font-black text-cyan-400/40 group-hover:text-cyan-400 transition-colors block">
                    {st.num}
                  </span>
                  <h4 className="font-bold text-sm text-white font-['Space_Grotesk']">
                    {st.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Modalities Table */}
      <section className="py-20 bg-[#0F172A] border-b border-white/10 cyber-grid relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="tech-badge">
              <span>MODELOS DE CONTRATACIÓN</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-['Space_Grotesk']">
              Modalidades Flexibles según su Operación
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Escoja el esquema que mejor se adapte al tamaño de su equipo y su presupuesto mensual.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modalities.map((mod, idx) => (
              <div 
                key={idx} 
                className={`cyber-card p-7 rounded-lg hud-box flex flex-col justify-between space-y-6 ${
                  mod.recommended ? 'border-cyan-500/60 shadow-[0_0_30px_rgba(0,229,255,0.15)] bg-white/[0.03]' : ''
                }`}
              >
                <div className="hud-corner-tl"></div>
                <div className="hud-corner-tr"></div>
                <div className="hud-corner-bl"></div>
                <div className="hud-corner-br"></div>

                <div className="space-y-4">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded inline-block ${
                    mod.recommended 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' 
                      : 'bg-white/5 text-slate-400 border border-white/10'
                  }`}>
                    {mod.badge}
                  </span>

                  <h4 className="text-lg font-black text-white font-['Space_Grotesk']">
                    {mod.title}
                  </h4>

                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    {mod.desc}
                  </p>

                  <div className="space-y-2.5 pt-3 border-t border-white/10">
                    {mod.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start space-x-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <Link
                    to="/cotizador-outsourcing"
                    className={`w-full text-xs py-2 px-3 flex items-center justify-center gap-1.5 font-bold font-['Space_Grotesk'] rounded transition-all ${
                      mod.recommended 
                        ? 'bg-cyan-500 text-black hover:bg-cyan-400' 
                        : 'bg-white/5 text-slate-200 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <span>COTIZAR ESTE PLAN</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Supported Technologies and Brands */}
      <section className="py-16 bg-[#0F172A] border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
              // COBERTURA MULTIPLATAFORMA & MARCAS
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk']">
              Especialistas en las plataformas que impulsan su empresa
            </h3>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
            {[
              'Microsoft Windows 11/10',
              'Windows Server',
              'macOS / Apple',
              'Linux (Ubuntu, Debian)',
              'Google Workspace',
              'Microsoft 365',
              'Proxmox VE',
              'Servidores Dell PowerEdge',
              'Servidores HP ProLiant',
              'Servidores Lenovo',
              'Fortinet FortiGate',
              'MikroTik RouterOS',
              'Ubiquiti UniFi',
              'Antivirus Corporativo'
            ].map((tech, idx) => (
              <span 
                key={idx}
                className="px-3.5 py-1.5 rounded-full cyber-card border border-white/10 text-xs font-mono text-slate-300 hover:border-cyan-500/50 hover:text-white transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section className="py-20 bg-[#0F172A] border-b border-white/10 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <div className="tech-badge">
              <span>PREGUNTAS FRECUENTES</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-['Space_Grotesk']">
              Dudas comunes sobre la Mesa de Ayuda
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="cyber-card rounded-lg border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-bold text-white hover:text-cyan-400 transition-colors"
                >
                  <span className="font-['Space_Grotesk'] pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-cyan-400 shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-slate-400 leading-relaxed font-sans border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Call to Action Banner */}
      <section className="py-20 bg-[#0F172A] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="cyber-card p-10 sm:p-12 rounded-lg hud-box border border-cyan-500/40 shadow-[0_0_50px_rgba(0,229,255,0.1)] text-center space-y-6">
            <div className="hud-corner-tl"></div>
            <div className="hud-corner-tr"></div>
            <div className="hud-corner-bl"></div>
            <div className="hud-corner-br"></div>

            <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto">
              <Headset className="w-6 h-6" />
            </div>

            <div className="space-y-2 max-w-2xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-black text-white font-['Space_Grotesk']">
                ¿Listo para transformar el soporte técnico de su empresa?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm">
                Obtenga una estimación exacta en segundos con nuestro cotizador o hable directamente con uno de nuestros consultores de TI.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                to="/cotizador-outsourcing"
                className="btn-cyber-primary text-xs py-3 px-6"
              >
                <span>CALCULAR TARIFA MENSUAL</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hola INTEPE S.A.S., deseo cotizar la Mesa de Ayuda para mi empresa.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cyber-outline text-xs py-3 px-6"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>HABLAR CON UN INGENIERO</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

