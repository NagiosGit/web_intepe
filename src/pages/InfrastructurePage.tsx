import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Link } from 'react-router-dom';
import { 
  Server, 
  Wifi, 
  Layers, 
  Database, 
  Clock, 
  ShieldCheck, 
  Cloud, 
  Network,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const InfrastructurePage: React.FC = () => {
  const infraItems = [
    { title: 'Servidores', desc: 'Administración de Servidores Windows Server y Linux con alta disponibilidad.', icon: Server },
    { title: 'Redes LAN / WAN', desc: 'Diseño, mantenimiento y cableado estructurado certificado.', icon: Network },
    { title: 'Wi-Fi Empresarial', desc: 'Redes inalámbricas corporativas con segmentación y cobertura total.', icon: Wifi },
    { title: 'Virtualización', desc: 'Optimización de hardware mediante entornos virtuales seguros.', icon: Layers },
    { title: 'Backup Automatizado', desc: 'Copias de seguridad locales y en la nube con esquemas de recuperación.', icon: Database },
    { title: 'Monitoreo Continuo', desc: 'Supervisión proactiva del rendimiento de servidores y enlaces.', icon: Clock },
    { title: 'Seguridad Perimetral', desc: 'Firewalls, VPNs para teletrabajo y protección contra amenazas.', icon: ShieldCheck },
    { title: 'Servicios Cloud', desc: 'Migración y administración de infraestructura en la nube.', icon: Cloud }
  ];

  return (
    <div>
      <PageHeader
        badge="Servidores & Redes"
        title="Infraestructura Tecnológica"
        subtitle="Construimos, optimizamos y administramos la infraestructura tecnológica que sostiene la operación de su empresa."
        breadcrumbCurrent="Infraestructura"
      />

      {/* 1. Intro Section (Clean White) */}
      <div className="bg-white py-16 border-b border-[#D8E1EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
              Estabilidad, conectividad y seguridad para su empresa
            </h2>
            <p className="text-[#243447] text-sm sm:text-base leading-relaxed">
              Una infraestructura tecnológica bien diseñada previene caídas imprevistas, pérdidas de datos y cuellos de botella. En <strong>INTEPE S.A.S.</strong> brindamos soluciones modulares y escalables adaptadas a las necesidades y tamaño de su organización.
            </p>
          </div>
        </div>
      </div>

      {/* 2. 8 Clean Cards Grid (Contrasting #F7F9FC Background) */}
      <div className="bg-[#F7F9FC] py-20 border-b border-[#D8E1EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0077C8] bg-white px-3.5 py-1 rounded-full border border-[#D8E1EA] shadow-2xs">
              Capacidades de Infraestructura
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">
              Componentes clave para su red y servidores
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {infraItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-[#D8E1EA] shadow-sm hover:border-[#0077C8] hover:shadow-lg transition-all duration-200 space-y-3 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F7F9FC] border border-[#D8E1EA] flex items-center justify-center text-[#0077C8] group-hover:bg-[#EAF5FC] transition-colors shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-[#0B1F3A] text-base group-hover:text-[#0077C8] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[#64748B] text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Action Section (Clean White) */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0B1F3A] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-bold text-white text-lg sm:text-xl">¿Desea evaluar la infraestructura de su empresa?</h4>
              <p className="text-[#EAF5FC]/80 text-xs sm:text-sm">Realizamos diagnósticos de servidores, conectividad y copias de seguridad.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
              <Link
                to="/contacto"
                className="px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-center text-[#0B1F3A] bg-white hover:bg-[#EAF5FC] transition-all flex items-center justify-center space-x-2"
              >
                <span>Solicitar Diagnóstico</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0077C8]" />
              </Link>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hola INTEPE S.A.S., deseo cotizar infraestructura y servidores.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl font-semibold text-xs text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-4 h-4 text-[#EAF5FC]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
