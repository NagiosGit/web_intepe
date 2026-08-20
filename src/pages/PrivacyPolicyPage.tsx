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

      <div className="bg-[#FAF6EE] py-24 border-b border-[#E8E2D5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E2D5] shadow-xs space-y-8 text-stone-700 text-sm leading-relaxed">
            
            <div className="flex items-center space-x-3 text-stone-900 border-b border-[#F5F0E6] pb-4">
              <ShieldCheck className="w-6 h-6 text-[#B86B42]" />
              <h2 className="text-xl font-bold">
                Compromiso de Privacidad y Seguridad de la Información
              </h2>
            </div>

            <p>
              <strong>{siteConfig.legalName} (INTEPE S.A.S.)</strong>, con NIT {siteConfig.nit}, domiciliada en {siteConfig.city}, con correo oficial de contacto <strong>{siteConfig.email}</strong>, informa a sus usuarios, clientes y visitantes que los datos suministrados a través de formularios, cotizadores y canales digitales serán administrados bajo estrictos parámetros de seguridad y confidencialidad.
            </p>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-stone-950">1. Datos Recolectados</h3>
              <p>
                Recopilamos información corporativa y de contacto estrictamente necesaria para la atención comercial y técnica, incluyendo: nombre completo, empresa, cargo, teléfono, correo electrónico, ciudad y detalles técnicos de la infraestructura o proyecto a cotizar.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-stone-950">2. Uso y Finalidad</h3>
              <p>
                La información suministrada se utiliza exclusivamente para:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-stone-600">
                <li>Elaborar propuestas técnico-económicas de Outsourcing TI y desarrollo de software.</li>
                <li>Prestar servicios de soporte técnico, gestión de tickets y atención en Mesa de Ayuda.</li>
                <li>Facturación electrónica y comunicaciones administrativas institucionales.</li>
                <li>Notificaciones sobre renovaciones de licencias y mantenimiento programado.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-stone-950">3. Confidencialidad y No Transferencia</h3>
              <p>
                INTEPE S.A.S. no vende, no arrienda ni transfiere los datos personales de sus clientes a terceros con fines publicitarios o no autorizados.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-stone-950">4. Contacto para Consultas de Privacidad</h3>
              <p>
                Cualquier consulta relacionada con la privacidad de sus datos puede remitirse a: <a href={`mailto:${siteConfig.email}`} className="text-stone-900 font-semibold hover:text-[#B86B42] hover:underline">{siteConfig.email}</a>.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
