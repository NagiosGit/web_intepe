import React from 'react';
import { Hero } from '../components/home/Hero';
import { TrustSLASection } from '../components/home/TrustSLASection';
import { ValueProposition } from '../components/home/ValueProposition';
import { ServicesOverview } from '../components/home/ServicesOverview';
import { IndustrySolutions } from '../components/home/IndustrySolutions';
import { TechEcosystem } from '../components/home/TechEcosystem';
import { SoftwareSection } from '../components/home/SoftwareSection';
import { ProjectsOverview } from '../components/home/ProjectsOverview';
import { OutsourcingCalculator } from '../components/calculator/OutsourcingCalculator';
import { DifferentialSection } from '../components/home/DifferentialSection';
import { MethodologySection } from '../components/home/MethodologySection';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { QuickContact } from '../components/home/QuickContact';

export const HomePage: React.FC = () => {
  return (
    <>
      {/* 1. Hero Principal con Tarjetas de Autoridad Técnica */}
      <Hero />

      {/* 2. Insignias de Confianza, SLA < 2h y Garantías Comerciales */}
      <TrustSLASection />

      {/* 3. Propuesta de Valor (4 Pilares Fundamentales) */}
      <ValueProposition />

      {/* 4. Servicios Tecnológicos en Bento Grid */}
      <ServicesOverview />

      {/* 5. Soluciones Especializadas por Sector / Industria con Imágenes */}
      <IndustrySolutions />

      {/* 6. Ecosistema de Tecnologías y Marcas Compatibles */}
      <TechEcosystem />

      {/* 7. Desarrollo de Software a Medida */}
      <SoftwareSection />

      {/* 8. Proyectos Reales Demostrados (GranjaWP, InvernaderoFM, INTEPR-ERP) */}
      <ProjectsOverview />

      {/* 9. Cotizador Dinámico de Outsourcing TI */}
      <OutsourcingCalculator />

      {/* 11. Sección Diferencial: ¿Necesita algo que no está en el catálogo? */}
      <DifferentialSection />

      {/* 12. Metodología: De la Idea al Software */}
      <MethodologySection />

      {/* 13. Tecnología con Visión Empresarial */}
      <WhyChooseUs />

      {/* 14. Contacto Rápido */}
      <QuickContact />
    </>
  );
};
