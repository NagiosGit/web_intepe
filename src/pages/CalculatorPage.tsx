import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { OutsourcingCalculator } from '../components/calculator/OutsourcingCalculator';
import { SoftwareEstimator } from '../components/calculator/SoftwareEstimator';
import { FAQSection } from '../components/common/FAQSection';

export const CalculatorPage: React.FC = () => {
  return (
    <div className="bg-[#0F172A] text-slate-100">
      <PageHeader
        badge="Herramientas Interactivas"
        title="Cotizador de Servicios TI"
        subtitle="Calcule en tiempo real una estimación de su plan de Outsourcing TI o evalúe el alcance para su próximo proyecto de software a medida."
        breadcrumbCurrent="Cotizador TI"
      />

      <OutsourcingCalculator />

      <SoftwareEstimator />

      <FAQSection />
    </div>
  );
};
