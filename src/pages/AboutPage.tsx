import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { 
  Target, 
  Compass, 
  Building
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const AboutPage: React.FC = () => {
  return (
    <div>
      <PageHeader
        badge="Nuestra Compañía"
        title="Informática y Tecnología Penagos S.A.S."
        subtitle="En INTEPE S.A.S. somos un aliado tecnológico empresarial en Colombia, integrando servicios de Outsourcing TI, soporte técnico, infraestructura y desarrollo de software a medida."
        breadcrumbCurrent="Nosotros"
      />

      {/* 1. Core Intro & Official Emblem (Clean Ivory / White) */}
      <div className="bg-[#FDFBF7] py-24 border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-950 tracking-tight">
                Tecnología confiable y soluciones que realmente funcionan
              </h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                <strong>Informática y Tecnología Penagos S.A.S. (INTEPE S.A.S.)</strong> nació con el compromiso de brindar a las empresas un respaldo técnico honesto, calificado y cercano. Entendemos que la tecnología no es solo un conjunto de equipos, sino el motor fundamental que impulsa la productividad diaria de su negocio.
              </p>
              <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">
                Nuestro diferencial radica en la capacidad de atender tanto las necesidades de soporte e infraestructura física como el diseño y desarrollo de aplicaciones web y sistemas ERP personalizados.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="p-8 rounded-3xl bg-white border border-[#E8E2D5] shadow-xs flex flex-col items-center text-center space-y-4">
                <img 
                  src="/logo/LOGON.png" 
                  alt="Emblema Oficial INTEPE" 
                  className="w-36 h-36 object-contain"
                />
                <div className="flex items-center justify-center space-x-1.5 pt-1">
                  <img 
                    src="/logo/Solo_Intepe_2026_8.png" 
                    alt="INTEPE" 
                    className="h-6 w-auto object-contain"
                  />
                  <span className="text-sm font-black text-stone-700">S.A.S.</span>
                </div>
                <span className="text-xs text-stone-500 font-mono">NIT: {siteConfig.nit}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Mission and Vision (Contrasting #FAF6EE Background) */}
      <div className="bg-[#FAF6EE] py-24 border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E8E2D5] shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F5F0E6] border border-[#E8E2D5] flex items-center justify-center text-stone-900 shadow-2xs">
                <Target className="w-6 h-6 text-[#B86B42]" />
              </div>
              <h3 className="text-xl font-bold text-stone-950">
                Nuestra Misión
              </h3>
              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                Brindar soluciones integrales de tecnología, soporte técnico, infraestructura y desarrollo de software a la medida, convirtiéndonos en el aliado estratégico de las organizaciones para optimizar sus procesos, proteger su información y asegurar su continuidad operativa.
              </p>
            </div>

            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E8E2D5] shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F5F0E6] border border-[#E8E2D5] flex items-center justify-center text-[#B86B42] shadow-2xs">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-stone-950">
                Nuestra Visión
              </h3>
              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                Consolidarnos como una empresa referente en Colombia por la calidad técnica, cercanía humana y confiabilidad de nuestros servicios de Outsourcing TI y desarrollo de soluciones empresariales que aportan valor tangible.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Corporate Data Card (Clean Ivory / White) */}
      <div className="bg-[#FDFBF7] py-24 border-b border-[#E8E2D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center space-x-3 border-b border-[#E8E2D5] pb-4">
            <div className="w-10 h-10 rounded-xl bg-[#F5F0E6] flex items-center justify-center text-stone-900">
              <Building className="w-5 h-5 text-[#B86B42]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-950">
                Información Corporativa Oficial
              </h3>
              <p className="text-xs text-stone-500">
                Datos de registro y representación de la compañía
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-white border border-[#E8E2D5] space-y-1 shadow-2xs">
              <span className="text-stone-500 font-semibold block text-xs">Razón Social:</span>
              <strong className="text-stone-950 text-sm">{siteConfig.legalName}</strong>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E8E2D5] space-y-1 shadow-2xs">
              <span className="text-stone-500 font-semibold block text-xs">Sigla Comercial:</span>
              <strong className="text-[#B86B42] text-sm">{siteConfig.commercialName}</strong>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E8E2D5] space-y-1 shadow-2xs">
              <span className="text-stone-500 font-semibold block text-xs">NIT:</span>
              <strong className="text-stone-950 font-mono text-sm">{siteConfig.nit}</strong>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E8E2D5] space-y-1 shadow-2xs">
              <span className="text-stone-500 font-semibold block text-xs">Ubicación y Banco:</span>
              <strong className="text-stone-950 text-sm">{siteConfig.city} • {siteConfig.bank}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Why Choose Us (Warm Arena Background) */}
      <div className="bg-[#FAF6EE] border-b border-[#E8E2D5]">
        <WhyChooseUs />
      </div>

    </div>
  );
};
