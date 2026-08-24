import React, { useState } from 'react';
import { 
  Building2, 
  Sprout, 
  Briefcase, 
  Factory, 
  Check, 
  ArrowRight, 
  Terminal
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const IndustrySolutions: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const industries = [
    {
      id: 'comercial',
      name: 'Pymes Comerciales & Distribución',
      shortName: 'Pymes & Comercio',
      icon: Building2,
      tag: 'Optimización Operativa',
      title: 'Continuidad tecnológica y soporte ágil para empresas en crecimiento',
      description: 'Garantizamos que sus puestos de trabajo, puntos de venta, facturación electrónica y copias de seguridad funcionen 24/7 sin interrupciones.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
      benefits: [
        'Mesa de ayuda directa a colaboradores para resolver fallas en minutos.',
        'Administración de Google Workspace y Microsoft 365 con correo institucional.',
        'Backups automatizados en la nube de bases de datos contables y ERPs.',
        'Mantenimiento preventivo programado sin interrumpir la jornada laboral.'
      ],
      serviceLink: '/outsourcing-ti',
      ctaText: 'Cotizar Outsourcing TI'
    },
    {
      id: 'agropecuario',
      name: 'Sector Agropecuario & Cultivos Protegidos',
      shortName: 'Agropecuario & Invernaderos',
      icon: Sprout,
      tag: 'Software Especializado',
      title: 'Control agronómico, bodega de insumos y gestión financiera de cultivos en campo y web',
      description: 'Desarrollamos plataformas web a la medida para monitoreo de invernaderos, cosechas diarias, punto de equilibrio por lote, inventario de insumos químicos y liquidación de jornales.',
      image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1000&q=80',
      benefits: [
        'Plataforma GranjaWP: gestión integral de invernaderos, cálculo de costo base y control de bodega.',
        'Sistema InvernaderoFM: monitoreo de cosechas, aplicaciones fitosanitarias y despachos.',
        'Acceso desde computadores, tablets y celulares sin requerir instalaciones complejas.',
        'Reportes de rentabilidad en tiempo real, control de cartera y exportación a Excel y PDF.'
      ],
      serviceLink: '/desarrollo-software',
      ctaText: 'Ver Software Agrícola'
    },
    {
      id: 'servicios',
      name: 'Firmas Profesionales & Consultoría',
      shortName: 'Servicios & Consultoría',
      icon: Briefcase,
      tag: 'Seguridad & Cloud',
      title: 'Protección de datos confidenciales y trabajo remoto sin fricciones',
      description: 'Estructuramos carpetas compartidas seguras, permisos por roles, VPNs cifradas y copias de seguridad inmutables para bufetes y firmas consultoras.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
      benefits: [
        'Almacenamiento centralizado en la nube o NAS con permisos estrictos por usuario.',
        'Configuración de redes privadas virtuales (VPN) para teletrabajo seguro.',
        'Políticas de seguridad informática y respaldo continuo ante ransomware.',
        'Asesoría técnica para renovación de portátiles y periféricos de trabajo.'
      ],
      serviceLink: '/infraestructura-tecnologica',
      ctaText: 'Consultar Soluciones Cloud'
    },
    {
      id: 'manufactura',
      name: 'Industria & Logística',
      shortName: 'Industria & Plantas',
      icon: Factory,
      tag: 'Redes & Conectividad',
      title: 'Conectividad industrial, servidores locales y digitalización en planta',
      description: 'Infraestructura robusta para bodegas, plantas de producción y centros de distribución con cableado estructurado, Wi-Fi industrial y servidores locales.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
      benefits: [
        'Redes Wi-Fi industriales de alta cobertura para terminales y lectores de código.',
        'Servidores locales con redundancia y virtualización Proxmox.',
        'Conexión segura entre sedes remotas y oficinas principales.',
        'Soporte presencial prioritario ante contingencias operativas.'
      ],
      serviceLink: '/infraestructura-tecnologica',
      ctaText: 'Ver Soluciones de Red'
    }
  ];

  const current = industries[activeTab];

  return (
    <section className="py-24 bg-[#080B0E] border-b border-white/10 relative overflow-hidden cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="tech-badge">
            <Terminal className="w-3.5 h-3.5 text-[#FF7120]" />
            <span>SOLUCIONES POR SECTOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Space_Grotesk']">
            Especialización por <span className="text-[#FF7120]">Industria</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-sans">
            Comprendemos la dinámica particular de cada sector para diseñar respuestas tecnológicas exactas.
          </p>
        </div>

        {/* Tab Selector Pills */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={ind.id}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded text-xs font-mono font-bold transition-all ${
                  isActive
                    ? 'bg-[#FF7120] text-black shadow-[0_0_20px_rgba(255,113,32,0.4)]'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{ind.shortName}</span>
              </button>
            );
          })}
        </div>

        {/* Active Industry Showcase Card */}
        <div className="cyber-card rounded-lg p-8 sm:p-10 hud-box border border-white/10">
          <div className="hud-corner-tl"></div>
          <div className="hud-corner-tr"></div>
          <div className="hud-corner-bl"></div>
          <div className="hud-corner-br"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded bg-[#FF7120]/10 text-[#FF853A] border border-[#FF7120]/30 inline-block">
                  {current.tag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-['Space_Grotesk']">
                  {current.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-sans">
                  {current.description}
                </p>
              </div>

              {/* Benefits Checklist */}
              <div className="space-y-3 pt-2 border-t border-white/10">
                {current.benefits.map((b, bIdx) => (
                  <div key={bIdx} className="flex items-start space-x-2.5 text-xs text-slate-300 font-sans">
                    <Check className="w-4 h-4 text-[#FF7120] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  to={current.serviceLink}
                  className="btn-cyber-primary text-xs"
                >
                  <span>{current.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Image (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-lg overflow-hidden border border-white/10 shadow-2xl h-64 sm:h-80">
                <img 
                  src={current.image} 
                  alt={current.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080B0E] via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-xs font-mono font-bold text-white uppercase tracking-wider bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 inline-block">
                    {current.name}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
