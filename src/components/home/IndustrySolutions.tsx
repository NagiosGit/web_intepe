import React, { useState } from 'react';
import { 
  Building2, 
  Sprout, 
  Briefcase, 
  Factory, 
  Check, 
  ArrowRight, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';

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
      imageAlt: 'Oficina corporativa moderna y tecnología empresarial',
      benefits: [
        'Mesa de ayuda directa a colaboradores para resolver fallas en minutos.',
        'Administración de Google Workspace y Microsoft 365 con correo institucional.',
        'Backups automatizados en la nube de bases de datos contables y ERPs.',
        'Mantenimiento preventivo programado sin interrumpir la jornada laboral.'
      ],
      recommendedService: 'Outsourcing TI Integral',
      serviceLink: '/servicios/outsourcing-ti',
      ctaText: 'Cotizar Outsourcing TI'
    },
    {
      id: 'agropecuario',
      name: 'Sector Agropecuario & Avícola',
      shortName: 'Agropecuario & Granjas',
      icon: Sprout,
      tag: 'Software Especializado',
      title: 'Control agronómico y gestión avícola de precisión en campo y web',
      description: 'Desarrollamos soluciones web a la medida para registrar lotes de postura, consumo de concentrado, mortalidad, trazabilidad de cosechas y control de jornales.',
      image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Invernadero tecnificado y monitoreo agrícola',
      benefits: [
        'Sistemas web GranjaWP para avicultura: control de postura, mortalidad y balanceados.',
        'Sistema InvernaderoFM: monitoreo de cosechas, aplicaciones fitosanitarias y jornales.',
        'Acceso desde computadores, tablets y celulares sin instalación compleja.',
        'Reportes de costos por lote, rendimiento diario y exportación a Excel.'
      ],
      recommendedService: 'Desarrollo de Software Agropecuario',
      serviceLink: '/desarrollo-software',
      ctaText: 'Ver Software de Campo'
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
      imageAlt: 'Equipo profesional de consultoría colaborando',
      benefits: [
        'Almacenamiento centralizado en la nube o NAS con permisos estrictos por usuario.',
        'Configuración de redes privadas virtuales (VPN) para teletrabajo seguro.',
        'Políticas de seguridad informática y respaldo continuo ante ransomware.',
        'Asesoría técnica para renovación de portátiles y periféricos de trabajo.'
      ],
      recommendedService: 'Infraestructura & Cloud',
      serviceLink: '/servicios/infraestructura',
      ctaText: 'Consultar Soluciones Cloud'
    },
    {
      id: 'manufactura',
      name: 'Industria & Manufactura',
      shortName: 'Industria & Logística',
      icon: Factory,
      tag: 'Alta Disponibilidad',
      title: 'Infraestructura robusta y redes industriales de alta resistencia',
      description: 'Diseñamos e implementamos cableado estructurado, enlaces Wi-Fi industriales, servidores locales redundantes y soporte preventivo a equipos de planta.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Planta industrial y sistemas de control técnico',
      benefits: [
        'Mantenimiento de hardware expuesto a polvo, vibración o ambientes exigentes.',
        'Servidores locales Proxmox/Windows Server con redundancia de discos (RAID).',
        'Segmentación de redes VLAN para separar tráfico administrativo de maquinaria.',
        'Monitoreo continuo de enlaces de conectividad y fuentes ininterrumpidas (UPS).'
      ],
      recommendedService: 'Infraestructura & Redes',
      serviceLink: '/servicios/infraestructura',
      ctaText: 'Solicitar Evaluación de Planta'
    }
  ];

  const current = industries[activeTab];

  return (
    <section className="py-24 bg-[#FDFBF7] border-b border-[#E8E2D5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#FAF6EE] border border-[#E8E2D5] text-stone-800 text-xs font-semibold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#B86B42]" />
            <span>Especialización por Industria</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-950 tracking-tight">
            Soluciones adaptadas a la realidad de su sector
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            No todas las empresas operan igual. En INTEPE diseñamos planes de soporte e ingeniería ajustados al modelo y desafíos de cada industria.
          </p>
        </div>

        {/* Industry Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            const isSelected = activeTab === idx;
            return (
              <button
                key={ind.id}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 border cursor-pointer ${
                  isSelected
                    ? 'bg-[#1F2923] text-white border-[#1F2923] shadow-sm'
                    : 'bg-white text-stone-700 border-[#E8E2D5] hover:bg-[#FAF6EE] hover:text-stone-950'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-[#B86B42]' : 'text-stone-500'}`} />
                <span>{ind.shortName}</span>
              </button>
            );
          })}
        </div>

        {/* Active Industry Showcase Card */}
        <div className="bg-white rounded-3xl border border-[#E8E2D5] shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left: Content and Benefits */}
            <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FAF6EE] text-[#B86B42] border border-[#E8DFD0]">
                    {current.tag}
                  </span>
                  <span className="text-xs font-semibold text-stone-500">• {current.name}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-stone-950 leading-tight">
                  {current.title}
                </h3>

                <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                  {current.description}
                </p>

                {/* Benefits List */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                    Beneficios y capacidades aplicadas:
                  </h4>
                  <div className="space-y-2.5">
                    {current.benefits.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full bg-[#FAF6EE] border border-[#E8E2D5] flex items-center justify-center text-[#B86B42] shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="text-xs sm:text-sm text-stone-700 leading-snug">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-[#F5F0E6] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  to={current.serviceLink}
                  className="inline-flex items-center justify-center space-x-2 bg-[#1F2923] text-white px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm hover:bg-stone-800 transition-all shadow-xs"
                >
                  <span>{current.ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-[#B86B42]" />
                </Link>

                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=Hola%20INTEPE,%20deseo%20asesor%C3%ADa%20para%20el%20sector:%20${encodeURIComponent(current.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-[#FAF6EE] text-stone-900 border border-[#E8E2D5] px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm hover:bg-[#F5F0E6] transition-all"
                >
                  <span>Consultar por WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
                </a>
              </div>

            </div>

            {/* Right: Immersive Contextual Photo */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-stone-900">
              <img 
                src={current.image} 
                alt={current.imageAlt}
                className="w-full h-full object-cover opacity-90 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/20"></div>
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg text-stone-900 space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Servicio Recomendado</span>
                </div>
                <strong className="text-sm font-black block text-stone-950">{current.recommendedService}</strong>
                <p className="text-[11px] text-stone-600">Diseñado para la continuidad operativa de su empresa en Colombia.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
