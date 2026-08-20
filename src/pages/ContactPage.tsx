import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { QuickContact } from '../components/home/QuickContact';

export const ContactPage: React.FC = () => {
  return (
    <div>
      <PageHeader
        badge="Canales de Atención"
        title="Hablemos de tecnología"
        subtitle="Cuéntenos qué necesita su empresa y encontraremos la mejor solución tecnológica para su operación."
        breadcrumbCurrent="Contacto"
      />

      <QuickContact showHeader={false} />
    </div>
  );
};
