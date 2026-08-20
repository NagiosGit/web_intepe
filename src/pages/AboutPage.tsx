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

      {/* 1. Core Intro & Official Emblem (Clean White) */}
      <div className="bg-white py-20 border-b border-[#D8E1EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
                Tecnología confiable y soluciones que realmente funcionan
              </h2>
              <p className="text-[#243447] text-sm sm:text-base leading-relaxed">
                <strong>Informática y Tecnología Penagos S.A.S. (INTEPE S.A.S.)</strong> nació con el compromiso de brindar a las empresas un respaldo técnico honesto, calificado y cercano. Entendemos que la tecnología no es solo un conjunto de equipos, sino el motor fundamental que impulsa la productividad diaria de su negocio.
              </p>
              <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed">
                Nuestro diferencial radica en la capacidad de atender tanto las necesidades de soporte e infraestructura física como el diseño y desarrollo de aplicaciones web y sistemas ERP personalizados.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="p-8 rounded-3xl bg-[#F7F9FC] border border-[#D8E1EA] shadow-sm flex flex-col items-center text-center space-y-4">
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
                  <span className="text-sm font-black text-[#0077C8]">S.A.S.</span>
                </div>
                <span className="text-xs text-[#64748B] font-mono">NIT: {siteConfig.nit}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Mission and Vision (Contrasting #F7F9FC Background) */}
      <div className="bg-[#F7F9FC] py-20 border-b border-[#D8E1EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#D8E1EA] shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#EAF5FC] border border-[#D8E1EA] flex items-center justify-center text-[#0077C8] shadow-2xs">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3A]">
                Nuestra Misión
              </h3>
              <p className="text-[#243447] text-xs sm:text-sm leading-relaxed">
                Brindar soluciones integrales de tecnología, soporte técnico, infraestructura y desarrollo de software a la medida, convirtiéndonos en el aliado estratégico de las organizaciones para optimizar sus procesos, proteger su información y asegurar su continuidad operativa.
              </p>
            </div>

            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#D8E1EA] shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#E8DCCB] flex items-center justify-center text-[#B86F4B] shadow-2xs">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3A]">
                Nuestra Visión
              </h3>
              <p className="text-[#243447] text-xs sm:text-sm leading-relaxed">
                Consolidarnos como una empresa referente en Colombia por la calidad técnica, cercanía humana y confiabilidad de nuestros servicios de Outsourcing TI y desarrollo de soluciones empresariales que aportan valor tangible.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Corporate Data Card (Clean White) */}
      <div className="bg-white py-20 border-b border-[#D8E1EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center space-x-3 border-b border-[#F7F9FC] pb-4">
            <div className="w-10 h-10 rounded-xl bg-[#EAF5FC] flex items-center justify-center text-[#0077C8]">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0B1F3A]">
                Información Corporativa Oficial
              </h3>
              <p className="text-xs text-[#64748B]">
                Datos de registro y representación de la compañía
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-[#F7F9FC] border border-[#D8E1EA] space-y-1">
              <span className="text-[#64748B] font-semibold block text-xs">Razón Social:</span>
              <strong className="text-[#0B1F3A] text-sm">{siteConfig.legalName}</strong>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7F9FC] border border-[#D8E1EA] space-y-1">
              <span className="text-[#64748B] font-semibold block text-xs">Sigla Comercial:</span>
              <strong className="text-[#0077C8] text-sm">{siteConfig.commercialName}</strong>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7F9FC] border border-[#D8E1EA] space-y-1">
              <span className="text-[#64748B] font-semibold block text-xs">NIT:</span>
              <strong className="text-[#0B1F3A] font-mono text-sm">{siteConfig.nit}</strong>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7F9FC] border border-[#D8E1EA] space-y-1">
              <span className="text-[#64748B] font-semibold block text-xs">Ubicación y Banco:</span>
              <strong className="text-[#0B1F3A] text-sm">{siteConfig.city} • {siteConfig.bank}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Why Choose Us (Warm Arena Background) */}
      <div className="bg-[#FAF7F2] py-20 border-b border-[#E8DCCB]">
        <WhyChooseUs />
      </div>

    </div>
  );
};
