import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Link } from 'react-router-dom';
import { Cloud, CheckCircle2, ArrowRight, MessageSquare, Mail, Users, Shield, HardDrive } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const GoogleWorkspacePage: React.FC = () => {
  const tools = [
    { title: 'Gmail Corporativo', desc: 'Correo profesional con dominio @suempresa.com, protección antispam y 99.9% de uptime.', icon: Mail },
    { title: 'Google Drive & Docs', desc: 'Almacenamiento en la nube y trabajo colaborativo en documentos en tiempo real.', icon: HardDrive },
    { title: 'Google Meet', desc: 'Videollamadas empresariales seguras con grabación y enlace directo de calendario.', icon: Users },
    { title: 'Seguridad & Administración', desc: 'Control centralizado de dispositivos, 2FA y políticas de acceso a la información.', icon: Shield }
  ];

  return (
    <div>
      <PageHeader
        badge="Productividad Cloud"
        title="Google Workspace para Empresas"
        subtitle="Implementación, administración, soporte y licenciamiento corporativo de Google Workspace."
        breadcrumbCurrent="Google Workspace"
      />

      {/* 1. Main 2-Column Overview (Clean White) */}
      <div className="bg-white py-20 border-b border-[#D8E1EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
                Colaboración empresarial en la nube con Gmail corporativo
              </h2>
              <p className="text-[#243447] text-base leading-relaxed">
                En <strong>INTEPE S.A.S.</strong> somos especialistas en la implementación y administración de <strong>Google Workspace</strong> (Gmail, Google Drive, Google Meet, Calendar, Documentos y Hojas de cálculo) para organizaciones de todos los tamaños.
              </p>
              <p className="text-[#64748B] text-sm leading-relaxed">
                Configuramos su dominio institucional (@suempresa.com), migramos los correos existentes sin interrupciones y establecemos políticas de seguridad para proteger la información de su empresa.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  to="/contacto"
                  className="px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#0077C8] hover:bg-[#0062a6] shadow-md shadow-[#0077C8]/20 transition-all flex items-center space-x-2"
                >
                  <span>Solicitar Google Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hola INTEPE S.A.S., deseo cotizar licencias y administración de Google Workspace.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl font-semibold text-xs text-[#0B1F3A] bg-[#F7F9FC] border border-[#D8E1EA] hover:bg-[#EAF5FC] transition-all flex items-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#0077C8]" />
                  <span>Asesoría por WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#F7F9FC] p-8 rounded-3xl border border-[#D8E1EA] space-y-4 shadow-sm">
              <h3 className="font-bold text-[#0B1F3A] text-lg flex items-center">
                <Cloud className="w-5 h-5 mr-2 text-[#0077C8]" />
                Servicios de Google Workspace:
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#243447]">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0077C8] shrink-0 mt-0.5" />
                  <span>Configuración de correos corporativos @suempresa.com.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0077C8] shrink-0 mt-0.5" />
                  <span>Migración transparente de buzones y contactos antiguos.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0077C8] shrink-0 mt-0.5" />
                  <span>Almacenamiento corporativo seguro en Google Drive.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0077C8] shrink-0 mt-0.5" />
                  <span>Políticas de seguridad, 2FA y control de dispositivos.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B86F4B] shrink-0 mt-0.5" />
                  <span>Soporte técnico continuo y administración de cuentas.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Google Workspace Apps (Contrasting #F7F9FC Background) */}
      <div className="bg-[#F7F9FC] py-20 border-b border-[#D8E1EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0077C8] bg-white px-3.5 py-1 rounded-full border border-[#D8E1EA] shadow-2xs">
              Ecosistema Integrado
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">
              Herramientas líderes para el trabajo en equipo
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((t, idx) => {
              const Icon = t.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-[#D8E1EA] shadow-sm space-y-3 hover:border-[#0077C8] transition-all">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF5FC] flex items-center justify-center text-[#0077C8] shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-[#0B1F3A]">{t.title}</h4>
                  <p className="text-[#64748B] text-xs leading-relaxed">{t.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Bottom Action Section (Clean White) */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">
            ¿Necesita migrar a Google Workspace o adquirir nuevas licencias?
          </h3>
          <p className="text-[#243447] text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Le asesoramos en la selección del plan ideal para su empresa con facturación y soporte en Colombia.
          </p>
          <div className="pt-2">
            <Link
              to="/contacto"
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#0077C8] hover:bg-[#0062a6] shadow-lg shadow-[#0077C8]/20 transition-all"
            >
              <span>Consultar Planes y Precios</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};
