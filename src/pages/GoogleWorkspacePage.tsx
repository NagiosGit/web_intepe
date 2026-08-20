import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Link } from 'react-router-dom';
import { Cloud, Mail, HardDrive, ShieldCheck, CheckCircle2, ArrowRight, MessageSquare } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const GoogleWorkspacePage: React.FC = () => {
  return (
    <div>
      <PageHeader
        badge="Productividad en la Nube"
        title="Google Workspace y Soluciones Cloud"
        subtitle="Correo corporativo @suempresa.com, almacenamiento seguro en la nube y herramientas de colaboración en tiempo real."
        breadcrumbCurrent="Google Workspace"
      />

      {/* 1. Intro Section */}
      <div className="bg-[#FDFBF7] py-24 border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-950 tracking-tight">
                Comuníquese y colabore con herramientas cloud de clase mundial
              </h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                Asesoramos, implementamos y administramos el ecosistema de <strong>Google Workspace</strong> para su empresa: cuentas de correo corporativo personalizadas con la máxima seguridad antispam de Gmail, almacenamiento colaborativo en Google Drive y videoconferencias en Google Meet.
              </p>
              <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">
                Nos encargamos de la migración de correos históricos desde otros servidores sin pérdida de información ni interrupciones operativas.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hola INTEPE S.A.S., deseo cotizar licencias y configuración de Google Workspace para mi empresa.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-7 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-stone-100 bg-[#1F2923] hover:bg-[#141C17] shadow-md transition-all"
                >
                  <span>Cotizar Google Workspace</span>
                  <ArrowRight className="w-4 h-4 text-[#B86B42]" />
                </a>
                <Link
                  to="/contacto"
                  className="px-7 py-4 rounded-xl font-semibold text-xs text-stone-800 bg-white border border-[#E8E2D5] hover:bg-[#F5F0E6] transition-all flex items-center space-x-2 shadow-2xs"
                >
                  <MessageSquare className="w-4 h-4 text-[#B86B42]" />
                  <span>Contactar Asesor</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#FAF6EE] p-8 sm:p-10 rounded-3xl border border-[#E8E2D5] space-y-5 shadow-xs">
              <h3 className="font-bold text-stone-900 text-base flex items-center">
                <Cloud className="w-4 h-4 mr-2 text-[#B86B42]" />
                Ventajas de Google Workspace
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-sm text-stone-700">
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#B86B42] shrink-0 mt-0.5" />
                  <span>Correo corporativo profesional con interfaz intuitiva de Gmail.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#B86B42] shrink-0 mt-0.5" />
                  <span>Almacenamiento compartido seguro en Google Drive (desde 30 GB hasta ilimitado).</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#B86B42] shrink-0 mt-0.5" />
                  <span>Edición de documentos, hojas de cálculo y presentaciones en tiempo real.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#B86B42] shrink-0 mt-0.5" />
                  <span>Consola de administración centralizada con autenticación en dos pasos (2FA).</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Grid de Aplicaciones */}
      <div className="bg-[#FAF6EE] py-24 border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-800 bg-white px-3.5 py-1 rounded-full border border-[#E8E2D5] shadow-2xs">
              Ecosistema Integral
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-950">
              Herramientas Incluidas en Google Workspace
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Gmail Empresarial', desc: 'Direcciones personalizadas @suempresa.com con 99.9% de disponibilidad garantizada.', icon: Mail },
              { title: 'Google Drive', desc: 'Almacene, sincronice y comparta archivos institucionales con permisos granulares.', icon: HardDrive },
              { title: 'Google Meet', desc: 'Videoconferencias seguras con cifrado de extremo a extremo y control de participantes.', icon: Cloud },
              { title: 'Google Docs & Sheets', desc: 'Trabaje en simultáneo con su equipo en hojas de cálculo y reportes corporativos.', icon: Cloud },
              { title: 'Seguridad & Consola Admin', desc: 'Control central de dispositivos móviles, políticas de contraseña y retención de datos.', icon: ShieldCheck },
              { title: 'Soporte y Migración INTEPE', desc: 'Acompañamiento en el alta de usuarios, renovación de licencias y soporte continuo.', icon: CheckCircle2 },
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
