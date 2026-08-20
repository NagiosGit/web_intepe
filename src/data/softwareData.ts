import type { SoftwareCapability, MethodologyStep } from '../types';

export const softwareCapabilities: SoftwareCapability[] = [
  {
    id: 'business-systems',
    title: 'Sistemas Empresariales & ERP',
    description: 'Plataformas completas para centralizar compras, inventarios multisede, facturación, cuentas por cobrar y tesorería a la medida de su empresa.',
    icon: 'Layers'
  },
  {
    id: 'agro-software',
    title: 'Software Agropecuario & Control de Cultivos',
    description: 'Soluciones especializadas como GranjaWP e InvernaderoFM para monitoreo de naves, control de lotes, cosechas, dosificación y costos de producción.',
    icon: 'Cpu'
  },
  {
    id: 'web-apps',
    title: 'Aplicaciones Web Corporativas',
    description: 'Portales y paneles de control accesibles desde cualquier navegador o dispositivo con autenticación segura y roles de usuario granulares.',
    icon: 'Globe'
  },
  {
    id: 'mobile-apps',
    title: 'Planillas Digitales & Apps de Campo',
    description: 'Sistemas optimizados para captura rápida de datos en campo, bodegas, galpones e invernaderos, eliminando las planillas físicas de papel.',
    icon: 'Smartphone'
  },
  {
    id: 'automation',
    title: 'Automatización & Liquidación Operativa',
    description: 'Módulos para liquidación automática de jornales agrícolas, horas, vales y cálculo del punto de equilibrio financiero por lote.',
    icon: 'Zap'
  },
  {
    id: 'integrations',
    title: 'Integraciones, APIs & Reportes',
    description: 'Conexión con bases de datos relacionales seguras, sincronización de servicios y exportación ejecutiva a formatos Excel y PDF.',
    icon: 'GitBranch'
  }
];

export const methodologySteps: MethodologyStep[] = [
  {
    step: '01',
    title: 'Descubrimiento',
    description: 'Entendemos el problema y los procesos actuales.',
    details: 'Nos reunimos con su equipo para conocer a fondo la dinámica de su operación, identificar cuellos de botella y definir los objetivos del proyecto.'
  },
  {
    step: '02',
    title: 'Análisis de Procesos',
    description: 'Definimos requerimientos, usuarios, procesos y alcance.',
    details: 'Estructuramos las especificaciones funcionales, roles de usuario, flujo de datos y cronograma de entregas sin costos ocultos.'
  },
  {
    step: '03',
    title: 'Diseño & Prototipado',
    description: 'Diseñamos la experiencia y arquitectura de la solución.',
    details: 'Diseñamos interfaces intuitivas (UI/UX) y definimos la arquitectura de bases de datos, seguridad y escalabilidad tecnológica.'
  },
  {
    step: '04',
    title: 'Desarrollo Ágil',
    description: 'Construimos, probamos e integramos la solución.',
    details: 'Programamos el software bajo estándares de calidad, realizando pruebas continuas de seguridad, rendimiento e integración.'
  },
  {
    step: '05',
    title: 'Despliegue & Evolución',
    description: 'Soporte, mejoras, nuevas funcionalidades y crecimiento.',
    details: 'Acompañamos el despliegue con capacitación y garantizamos soporte técnico continuo para que el software evolucione con su empresa.'
  }
];
