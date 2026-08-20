import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Link } from 'react-router-dom';
import { Headset, CheckCircle2, ArrowRight, MessageSquare, ShieldCheck, Monitor, HelpCircle } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const HelpDeskPage: React.FC = () => {
  return (
    <div>
      <PageHeader
        badge="Mesa de Ayuda L1 / L2"
        title="Help Desk y Soporte Técnico"
        subtitle="Atención rápida y oportuna para resolver incidentes en puestos de trabajo, correo, impresoras y aplicaciones."
        breadcrumbCurrent="Help Desk"
      />

      {/* 1. Intro Section */}
      <div className="bg-[#FDFBF7] py-24 border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-950 tracking-tight">
                Soporte continuo para la productividad de sus usuarios
              </h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                Nuestra <strong>Mesa de Ayuda (Help Desk)</strong> brinda asistencia remota y presencial oportuna a sus colaboradores, reduciendo tiempos de inactividad causados por fallas en software, sistemas operativos, antivirus, impresoras y conectividad.
              </p>
              <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">
                Atendemos mediante canales unificados de soporte con tiempos de respuesta estructurados según la criticidad del incidente.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/cotizador-outsourcing"
                  className="inline-flex items-center space-x-2 px-7 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-stone-100 bg-[#1F2923] hover:bg-[#141C17] shadow-md transition-all"
                >
                  <span>Cotizar con Help Desk</span>
                  <ArrowRight className="w-4 h-4 text-[#B86B42]" />
                </Link>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hola INTEPE S.A.S., deseo consultar sobre su servicio de Mesa de Ayuda / Help Desk.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-4 rounded-xl font-semibold text-xs text-stone-800 bg-white border border-[#E8E2D5] hover:bg-[#F5F0E6] transition-all flex items-center space-x-2 shadow-2xs"
                >
                  <MessageSquare className="w-4 h-4 text-[#B86B42]" />
                  <span>Consultar por WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#FAF6EE] p-8 sm:p-10 rounded-3xl border border-[#E8E2D5] space-y-5 shadow-xs">
              <h3 className="font-bold text-stone-900 text-base flex items-center">
                <Headset className="w-4 h-4 mr-2 text-[#B86B42]" />
                Niveles de Atención
              </h3>
              <div className="space-y-3.5 text-xs sm:text-sm text-stone-700">
                <div className="p-4 rounded-2xl bg-white border border-[#E8E2D5]">
                  <strong className="text-stone-950 block text-xs">Nivel 1 (L1) — Primer Contacto:</strong>
                  <span className="text-stone-600 text-xs">Atención rápida a solicitudes comunes, configuración de correos, permisos y soporte remoto inmediato.</span>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#E8E2D5]">
                  <strong className="text-stone-950 block text-xs">Nivel 2 (L2) — Especializado:</strong>
                  <span className="text-stone-600 text-xs">Diagnóstico avanzado de sistemas operativos, fallas de hardware, problemas de red y visitas presenciales.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Cobertura de Incidentes */}
      <div className="bg-[#FAF6EE] py-24 border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-800 bg-white px-3.5 py-1 rounded-full border border-[#E8E2D5] shadow-2xs">
              Alcance de la Atención
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-950">
              ¿Qué resolvemos en su día a día?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Puestos de Trabajo', desc: 'Configuración, formateo, optimización y actualización de Windows, macOS y Linux.', icon: Monitor },
              { title: 'Conectividad & Periféricos', desc: 'Solución a fallas de Wi-Fi, impresoras en red, escáneres y recursos compartidos.', icon: CheckCircle2 },
              { title: 'Seguridad & Antivirus', desc: 'Limpieza de malware, actualización de firmas de seguridad y protección de endpoints.', icon: ShieldCheck },
              { title: 'Cuentas & Correo', desc: 'Gestión de contraseñas, Google Workspace, Microsoft 365 y clientes Outlook.', icon: HelpCircle },
              { title: 'Respaldo de Datos', desc: 'Configuración de sincronización en la nube y recuperación de archivos importantes.', icon: ShieldCheck },
              { title: 'Asesoría al Usuario', desc: 'Acompañamiento en el uso correcto de herramientas de software y buenas prácticas.', icon: Headset },
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
