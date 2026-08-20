import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { ShieldCheck } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div>
      <PageHeader
        badge="Marco Legal"
        title="Política de Privacidad"
        subtitle="Lineamientos de protección, confidencialidad y uso de la información en INTEPE S.A.S."
        breadcrumbCurrent="Política de Privacidad"
      />

      <div className="bg-[#F7F9FC] py-20 border-b border-[#D8E1EA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#D8E1EA] shadow-sm space-y-8 text-[#243447] text-sm leading-relaxed">
            
            <div className="flex items-center space-x-3 text-[#0B1F3A] border-b border-[#F7F9FC] pb-4">
              <ShieldCheck className="w-6 h-6 text-[#0077C8]" />
              <h2 className="text-xl font-bold">
                Compromiso de Privacidad y Seguridad de la Información
              </h2>
            </div>

            <p>
              <strong>{siteConfig.legalName} (INTEPE S.A.S.)</strong>, con NIT {siteConfig.nit}, domiciliada en {siteConfig.city}, con correo oficial de contacto <strong>{siteConfig.email}</strong>, informa a sus usuarios, clientes y visitantes que los datos suministrados a través de formularios, cotizadores y canales digitales serán administrados bajo estrictos parámetros de seguridad y confidencialidad.
            </p>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#0B1F3A]">1. Datos Recolectados</h3>
              <p>
                Recopilamos información corporativa y de contacto estrictamente necesaria para la atención comercial y técnica, incluyendo: nombre completo, empresa, cargo, teléfono, correo electrónico, ciudad y detalles técnicos de la infraestructura o proyecto a cotizar.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#0B1F3A]">2. Uso y Finalidad</h3>
              <p>
                La información suministrada se utiliza exclusivamente para:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-[#64748B]">
                <li>Elaborar propuestas técnico-económicas de Outsourcing TI y desarrollo de software.</li>
                <li>Prestar servicios de soporte técnico, gestión de tickets y atención en Mesa de Ayuda.</li>
                <li>Facturación electrónica y comunicaciones administrativas institucionales.</li>
                <li>Notificaciones sobre renovaciones de licencias y mantenimiento programado.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#0B1F3A]">3. Confidencialidad y No Transferencia</h3>
              <p>
                INTEPE S.A.S. no vende, no arrienda ni transfiere los datos personales de sus clientes a terceros con fines publicitarios o no autorizados.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#0B1F3A]">4. Contacto para Consultas de Privacidad</h3>
              <p>
                Cualquier consulta relacionada con la privacidad de sus datos puede remitirse a: <a href={`mailto:${siteConfig.email}`} className="text-[#0077C8] font-semibold hover:underline">{siteConfig.email}</a>.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
