import React from 'react';
import { Hero } from '../components/home/Hero';
import { ValueProposition } from '../components/home/ValueProposition';
import { ServicesOverview } from '../components/home/ServicesOverview';
import { DifferentialSection } from '../components/home/DifferentialSection';
import { SoftwareSection } from '../components/home/SoftwareSection';
import { ProjectsOverview } from '../components/home/ProjectsOverview';
import { OutsourcingCalculator } from '../components/calculator/OutsourcingCalculator';
import { MethodologySection } from '../components/home/MethodologySection';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { QuickContact } from '../components/home/QuickContact';

export const HomePage: React.FC = () => {
  return (
    <>
      {/* 1. Hero Principal con Jerarquía Estricta */}
      <Hero />

      {/* 2. Propuesta de Valor (4 Tarjetas Sintetizadas) */}
      <ValueProposition />

      {/* 3. Servicios Tecnológicos */}
      <ServicesOverview />

      {/* 4. Sección Diferencial: ¿Necesita algo que no está en el catálogo? */}
      <DifferentialSection />

      {/* 5. Desarrollo de Software a Medida */}
      <SoftwareSection />

      {/* 6. Tecnología Desarrollada por INTEPE (Proyectos Reales) */}
      <ProjectsOverview />

      {/* 7. Cotizador Dinámico de Outsourcing TI */}
      <OutsourcingCalculator />

      {/* 8. Metodología: De la Idea al Software */}
      <MethodologySection />

      {/* 9. Tecnología con Visión Empresarial */}
      <WhyChooseUs />

      {/* 10. Contacto Rápido */}
      <QuickContact />
    </>
  );
};
