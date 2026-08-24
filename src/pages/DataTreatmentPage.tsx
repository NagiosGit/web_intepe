import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Scale } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const DataTreatmentPage: React.FC = () => {
  return (
    <div className="bg-[#080B0E] text-slate-100">
      <PageHeader
        badge="Cumplimiento Ley 1581 de 2012"
        title="Tratamiento de Datos Personales"
        subtitle="Autorización y políticas de tratamiento de datos conforme a la legislación de la República de Colombia."
        breadcrumbCurrent="Tratamiento de Datos"
      />

      <div className="bg-[#080B0E] py-24 border-b border-white/10 cyber-grid">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="cyber-card rounded-lg p-8 sm:p-12 hud-box border border-white/10 space-y-8 text-slate-300 text-sm leading-relaxed font-sans">
            <div className="hud-corner-tl"></div>
            <div className="hud-corner-tr"></div>
            <div className="hud-corner-bl"></div>
            <div className="hud-corner-br"></div>

            <div className="flex items-center space-x-3 text-white border-b border-white/10 pb-4">
              <Scale className="w-6 h-6 text-[#FF7120]" />
              <h2 className="text-xl font-bold font-['Space_Grotesk']">
                Marco Legal y Derechos del Titular (Habeas Data Colombia)
              </h2>
            </div>

            <p>
              En cumplimiento de la <strong className="text-white">Ley Estatutaria 1581 de 2012</strong> y el <strong className="text-white">Decreto 1377 de 2013</strong> de la República de Colombia, <strong className="text-white">{siteConfig.legalName} (INTEPE S.A.S.)</strong> informa que al diligenciar cualquiera de nuestros formularios o cotizadores en línea, el titular autoriza de manera voluntaria, previa, explícita e informada el tratamiento de sus datos personales.
            </p>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-white font-['Space_Grotesk']">Derechos que le asisten como Titular de Datos:</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-400 font-sans">
                <li><strong className="text-white">Conocer, actualizar y rectificar</strong> sus datos personales frente a INTEPE S.A.S.</li>
                <li><strong className="text-white">Solicitar prueba</strong> de la autorización otorgada para el tratamiento de sus datos.</li>
                <li><strong className="text-white">Ser informado</strong> por el responsable del tratamiento, previa solicitud, respecto del uso que se le ha dado a sus datos personales.</li>
                <li><strong className="text-white">Revocar la autorización</strong> y/o solicitar la supresión del dato cuando en el tratamiento no se respeten los principios y garantías constitucionales.</li>
                <li><strong className="text-white">Acceder en forma gratuita</strong> a sus datos personales que hayan sido objeto de tratamiento.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-white font-['Space_Grotesk']">Canal para Ejercicio de Derechos (Habeas Data):</h3>
              <p>
                Para ejercer cualquiera de sus derechos o solicitar la supresión de sus registros de nuestras bases de datos, puede remitir un correo electrónico formal a: <a href={`mailto:${siteConfig.email}`} className="text-[#FF853A] font-mono hover:underline">{siteConfig.email}</a> indicando en el asunto "Ejercicio de Derechos Habeas Data".
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
