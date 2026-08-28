import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Link } from 'react-router-dom';
import { Cloud, Mail, HardDrive, ShieldCheck, CheckCircle2, ArrowRight, MessageSquare, Terminal } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const GoogleWorkspacePage: React.FC = () => {
  return (
    <div className="bg-[#0F172A] text-slate-100">
      <PageHeader
        badge="Productividad en la Nube"
        title="Google Workspace y Soluciones Cloud"
        subtitle="Correo corporativo @suempresa.com, almacenamiento seguro en la nube y herramientas de colaboración en tiempo real."
        breadcrumbCurrent="Google Workspace"
      />

      {/* Intro Section */}
      <div className="bg-[#0F172A] py-24 border-b border-white/10 cyber-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="tech-badge">
                <Terminal className="w-3.5 h-3.5 text-[#FF7120]" />
                <span>PARTNER & ADMINISTRACIÓN CLOUD</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-['Space_Grotesk']">
                Comuníquese y colabore con herramientas cloud de clase mundial
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                Asesoramos, implementamos y administramos el ecosistema de <strong className="text-white">Google Workspace</strong> para su empresa: cuentas de correo corporativo personalizadas con la máxima seguridad antispam de Gmail, almacenamiento colaborativo en Google Drive y videoconferencias en Google Meet.
              </p>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
                Nos encargamos de la migración de correos históricos desde otros servidores sin pérdida de información ni interrupciones operativas.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hola INTEPE S.A.S., deseo cotizar licencias y configuración de Google Workspace para mi empresa.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cyber-primary text-xs"
                >
                  <span>COTIZAR GOOGLE WORKSPACE</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  to="/contacto"
                  className="btn-cyber-outline text-xs"
                >
                  <MessageSquare className="w-4 h-4 text-[#FF7120]" />
                  <span>CONTACTAR ASESOR</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 cyber-card p-8 sm:p-10 rounded-lg hud-box border border-white/10 space-y-5">
              <div className="hud-corner-tl"></div>
              <div className="hud-corner-br"></div>
              
              <h3 className="font-bold text-white text-base flex items-center font-['Space_Grotesk']">
                <Cloud className="w-4 h-4 mr-2 text-[#FF7120]" />
                Ventajas de Google Workspace
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-300 font-sans">
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF7120] shrink-0 mt-0.5" />
                  <span>Cuentas de correo con dominio corporativo @suempresa.com.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF7120] shrink-0 mt-0.5" />
                  <span>Seguridad líder en la industria con autenticación en 2 pasos (2FA).</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF7120] shrink-0 mt-0.5" />
                  <span>Almacenamiento en Google Drive con carpetas compartidas.</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF7120] shrink-0 mt-0.5" />
                  <span>Acceso desde computadores, portátiles, tablets y celulares.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Aplicaciones Incluidas */}
      <div className="bg-[#0F172A] py-24 border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="tech-badge">
              <span>SUITE DE PRODUCTIVIDAD</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-['Space_Grotesk']">
              Herramientas de Colaboración Cloud
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Gmail Empresarial', desc: 'Correo seguro sin publicidad, filtro antispam avanzado y 99.9% de disponibilidad.', icon: Mail },
              { title: 'Google Drive', desc: 'Almacenamiento seguro en la nube con permisos por carpeta y control de versiones.', icon: HardDrive },
              { title: 'Google Meet', desc: 'Videoconferencias en alta definición con subtítulos y grabación para reuniones.', icon: Cloud },
              { title: 'Docs, Sheets & Slides', desc: 'Creación colaborativa de documentos y hojas de cálculo en tiempo real.', icon: CheckCircle2 },
              { title: 'Google Calendar', desc: 'Calendarios compartidos para coordinar citas, salas de juntas y agendas.', icon: CheckCircle2 },
              { title: 'Consola de Administración', desc: 'Panel central para altas, bajas, reseteo de contraseñas y políticas de acceso.', icon: ShieldCheck },
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
