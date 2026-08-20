import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Link } from 'react-router-dom';
import { 
  Headset, 
  CheckCircle2, 
  Monitor, 
  Laptop, 
  Mail, 
  Printer, 
  FileText,
  LifeBuoy,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const HelpDeskPage: React.FC = () => {
  const items = [
    { title: 'Soporte L1 / L2', desc: 'Atención clasificada según la complejidad del incidente técnico.', icon: LifeBuoy },
    { title: 'Gestión de tickets', desc: 'Registro, trazabilidad y control de tiempos de atención por solicitud.', icon: FileText },
    { title: 'Atención remota', desc: 'Asistencia inmediata a través de software seguro de control remoto.', icon: Monitor },
    { title: 'Soporte presencial', desc: 'Visitas técnicas en sitio para fallas físicas o de hardware.', icon: Headset },
    { title: 'Windows / macOS / Linux', desc: 'Soporte a los principales sistemas operativos del entorno empresarial.', icon: Laptop },
    { title: 'Correo & Aplicaciones', desc: 'Configuración y resolución de problemas en cuentas de correo corporativo.', icon: Mail },
    { title: 'Impresoras & Periféricos', desc: 'Conexión, escaneo y solución de problemas en impresoras de red.', icon: Printer }
  ];

  return (
    <div>
      <PageHeader
        badge="Atención a Usuarios"
        title="Mesa de Ayuda / Help Desk"
        subtitle="Atención de incidentes y solicitudes de usuarios mediante soporte remoto y presencial oportuno."
        breadcrumbCurrent="Help Desk"
      />

      {/* 1. Intro Section (Clean White) */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
                Soporte técnico oportuno para que su empresa nunca se detenga
              </h2>
              <p className="text-[#243447] text-sm sm:text-base leading-relaxed">
                La <strong>Mesa de Ayuda de INTEPE S.A.S.</strong> actúa como el canal centralizado de atención donde sus empleados pueden reportar dudas, fallas e incidentes técnicos.
              </p>
              <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed">
                Diagnosticamos y resolvemos los problemas en el menor tiempo posible, evitando la pérdida de horas laborales y asegurando la continuidad de cada puesto de trabajo.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/contacto"
                  className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#0077C8] hover:bg-[#0062a6] shadow-md shadow-[#0077C8]/20 transition-all"
                >
                  <span>Solicitar soporte Help Desk</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hola INTEPE S.A.S., requiero información sobre el servicio de Help Desk.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 rounded-xl font-semibold text-xs text-[#0B1F3A] bg-[#F7F9FC] border border-[#D8E1EA] hover:bg-[#EAF5FC] transition-all flex items-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#0077C8]" />
                  <span>Consultar por WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#F7F9FC] p-8 rounded-3xl border border-[#D8E1EA] space-y-4 shadow-sm">
              <h3 className="font-bold text-[#0B1F3A] text-base flex items-center">
                <Headset className="w-4 h-4 mr-2 text-[#0077C8]" />
                ¿Por qué tercerizar su Help Desk con INTEPE?
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#243447]">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0077C8] shrink-0 mt-0.5" />
                  <span>Atención estandarizada con registro ordenado de incidentes.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0077C8] shrink-0 mt-0.5" />
                  <span>Asistencia remota en minutos para resolver problemas comunes.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B86F4B] shrink-0 mt-0.5" />
                  <span>Mayor tranquilidad para la gerencia y satisfacción del usuario.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Capabilities Grid (Contrasting #F7F9FC Background) */}
      <div className="bg-[#F7F9FC] border-t border-b border-[#D8E1EA] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0077C8] bg-white px-3.5 py-1 rounded-full border border-[#D8E1EA] shadow-2xs">
              Especialidades
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">
              Capacidades de la Mesa de Ayuda
            </h3>
            <p className="text-[#64748B] text-xs sm:text-sm">
              Soporte de primer y segundo nivel para resolver incidentes en hardware, software y redes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-[#D8E1EA] shadow-sm space-y-2 hover:border-[#0077C8] hover:shadow-md transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#EAF5FC] flex items-center justify-center text-[#0077C8]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-[#0B1F3A]">{item.title}</h4>
                  <p className="text-[#64748B] text-xs leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Bottom CTA Section (Clean White) */}
      <div className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A]">
            ¿Sus colaboradores pierden tiempo por fallas técnicas?
          </h3>
          <p className="text-[#243447] text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Implemente una mesa de ayuda profesional que responda de inmediato a los incidentes diarios.
          </p>
          <div className="pt-2">
            <Link
              to="/cotizador-outsourcing"
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#0077C8] hover:bg-[#0062a6] shadow-lg shadow-[#0077C8]/20 transition-all"
            >
              <span>Calcular costo de soporte para su empresa</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};
