import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { QuickContact } from '../components/home/QuickContact';

export const ContactPage: React.FC = () => {
  return (
    <div className="bg-[#0F172A] text-slate-100">
      <PageHeader
        badge="Canales de Atención"
        title="Hablemos de Tecnología"
        subtitle="Cuéntenos qué necesita su empresa y encontraremos la mejor solución tecnológica para su operación."
        breadcrumbCurrent="Contacto"
      />

      <QuickContact showHeader={false} />
    </div>
  );
};
