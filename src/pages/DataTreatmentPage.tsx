import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Scale } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const DataTreatmentPage: React.FC = () => {
  return (
    <div>
      <PageHeader
        badge="Cumplimiento Ley 1581"
        title="Tratamiento de Datos Personales"
        subtitle="Autorización y políticas de tratamiento de datos conforme a la legislación de la República de Colombia."
        breadcrumbCurrent="Tratamiento de Datos"
      />

      <div className="bg-[#F7F9FC] py-20 border-b border-[#D8E1EA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#D8E1EA] shadow-sm space-y-8 text-[#243447] text-sm leading-relaxed">
            
            <div className="flex items-center space-x-3 text-[#0B1F3A] border-b border-[#F7F9FC] pb-4">
              <Scale className="w-6 h-6 text-[#0077C8]" />
              <h2 className="text-xl font-bold">
                Marco Legal y Derechos del Titular (Ley 1581 de 2012)
              </h2>
            </div>

            <p>
              En cumplimiento de la <strong>Ley Estatutaria 1581 de 2012</strong> y el <strong>Decreto 1377 de 2013</strong> de la República de Colombia, <strong>{siteConfig.legalName} (INTEPE S.A.S.)</strong> informa que al diligenciar cualquiera de nuestros formularios o cotizadores en línea, el titular autoriza de manera voluntaria, previa, explícita e informada el tratamiento de sus datos personales.
            </p>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#0B1F3A]">Derechos que le asisten como Titular de Datos:</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-[#64748B]">
                <li><strong>Conocer, actualizar y rectificar</strong> sus datos personales frente a INTEPE S.A.S.</li>
                <li><strong>Solicitar prueba</strong> de la autorización otorgada para el tratamiento de sus datos.</li>
                <li><strong>Ser informado</strong> por el responsable del tratamiento, previa solicitud, respecto del uso que se le ha dado a sus datos personales.</li>
                <li><strong>Revocar la autorización</strong> y/o solicitar la supresión del dato cuando en el tratamiento no se respeten los principios, derechos y garantías constitucionales y legales.</li>
                <li><strong>Acceder en forma gratuita</strong> a sus datos personales que hayan sido objeto de tratamiento.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-[#0B1F3A]">Canal para Ejercicio de Derechos (Habeas Data):</h3>
              <p>
                Para ejercer cualquiera de sus derechos o solicitar la supresión de sus registros de nuestras bases de datos de contacto comercial, puede remitir un correo electrónico formal a: <a href={`mailto:${siteConfig.email}`} className="text-[#0077C8] font-semibold hover:underline">{siteConfig.email}</a> indicando en el asunto "Ejercicio de Derechos Habeas Data".
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
