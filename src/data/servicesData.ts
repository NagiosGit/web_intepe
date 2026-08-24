import type { Service } from '../types';

export const servicesData: Service[] = [
  {
    id: 'outsourcing-ti',
    slug: 'outsourcing-ti',
    title: 'Outsourcing TI Integral',
    shortDescription: 'Departamento de tecnología tercerizado para la continuidad, seguridad y productividad de su empresa.',
    fullDescription: 'En INTEPE S.A.S. asumimos la administración y soporte completo de la infraestructura tecnológica de su organización. Nuestro servicio de Outsourcing TI combina Mesa de Ayuda dedicada L1/L2/L3, mantenimiento preventivo programado, administración de servidores, seguridad perimetral y dirección técnica, permitiendo a su equipo enfocarse en el crecimiento del negocio sin preocupaciones operativas.',
    category: 'outsourcing',
    icon: 'Briefcase',
    badge: 'Gestión Integral TI',
    features: [
      'Mesa de Ayuda dedicada para usuarios con SLA < 15 min (L1/L2/L3)',
      'Administración proactiva de servidores Windows Server, Linux y Proxmox',
      'Mantenimiento preventivo y correctivo programado de computadores',
      'Configuración y seguridad de redes LAN, WAN, Wi-Fi y Firewalls',
      'Copias de seguridad automáticas locales y en la nube',
      'Servicios IMAC (Instalaciones, traslados y adecuación de puestos)',
      'Modalidades: 100% Remoto, Híbrido con visitas y Técnico Residente'
    ],
    benefits: [
      'Reducción de costos laborales fijos sin pasivos de nómina',
      'Continuidad operativa garantizada con equipo multidisciplinario',
      'Soporte técnico confiable con acuerdos de nivel de servicio (SLA)'
    ],
    ctaText: 'Conocer Outsourcing TI →',
    ctaLink: '/outsourcing-ti'
  },
  {
    id: 'help-desk',
    slug: 'help-desk',
    title: 'Mesa de Ayuda (Help Desk L1/L2/L3)',
    shortDescription: 'Asistencia técnica inmediata multicanal para mantener a sus colaboradores siempre productivos y sin interrupciones.',
    fullDescription: 'Canalice y resuelva cualquier requerimiento informático de sus usuarios con rapidez y trazabilidad total. Nuestra Mesa de Ayuda gestiona incidentes de software, hardware, conectividad, correo y cuentas de usuario mediante WhatsApp corporativo, portal de tickets, asistencia remota instantánea y visitas presenciales en sitio.',
    category: 'outsourcing',
    icon: 'Headset',
    badge: 'Soporte Inmediato L1/L2/L3',
    features: [
      'Atención multicanal: WhatsApp Corporativo, Portal de Tickets, PBX y Remoto',
      'Tiempos de primera respuesta < 15 minutos en incidentes críticos',
      'Soporte especializado para equipos Windows, macOS y Linux',
      'Diagnóstico y solución de periféricos, impresoras y conectividad',
      'Gestión de cuentas Google Workspace, Microsoft 365 y software ofimático',
      'Escalamiento técnico estructurado (Nivel 1, Nivel 2 y Nivel 3)',
      'Reportes mensuales de gestión con métricas e indicadores de servicio'
    ],
    benefits: [
      'Resolución rápida de dudas y problemas cotidianos de los usuarios',
      'Máxima disponibilidad de los puestos de trabajo sin pérdidas de tiempo',
      'Trazabilidad en tiempo real de cada requerimiento con sistema de tickets'
    ],
    ctaText: 'Ver Mesa de Ayuda →',
    ctaLink: '/help-desk'
  },
  {
    id: 'infraestructura-tecnologica',
    slug: 'infraestructura-tecnologica',
    title: 'Infraestructura Tecnológica',
    shortDescription: 'Soluciones robustas para mantener una infraestructura de servidores y redes estable y eficiente.',
    fullDescription: 'Diseñamos, configuramos y mantenemos la base tecnológica sobre la que operan los sistemas de su empresa. Desde la instalación de servidores locales o en la nube, virtualización de entornos y cableado estructurado, hasta la seguridad perimetral y respaldo seguro de información.',
    category: 'infrastructure',
    icon: 'Server',
    badge: 'Estabilidad & Redes',
    features: [
      'Configuración y soporte de Servidores Windows Server y Linux',
      'Virtualización de servidores (Proxmox, VMware, Hyper-V)',
      'Diseño y mantenimiento de redes LAN, WAN y cableado estructurado',
      'Redes Wi-Fi empresariales con roaming y segmentación',
      'Seguridad perimetral, configuración de Firewalls y VPNs',
      'Sistemas de backup local y en la nube automatizados',
      'Administración y monitoreo continuo de infraestructura'
    ],
    benefits: [
      'Redes y servidores estables con alta disponibilidad',
      'Acceso remoto seguro para teletrabajo y sucursales',
      'Infraestructura escalable que acompaña el crecimiento de la empresa'
    ],
    ctaText: 'Ver soluciones de infraestructura →',
    ctaLink: '/infraestructura-tecnologica'
  },
  {
    id: 'mantenimiento-soporte',
    slug: 'mantenimiento',
    title: 'Mantenimiento y Soporte',
    shortDescription: 'Mantenimiento preventivo y correctivo de equipos de cómputo para maximizar su vida útil.',
    fullDescription: 'El mantenimiento periódico es la mejor inversión para evitar fallas imprevistas en los computadores y servidores de su empresa. Realizamos limpiezas físicas profundas, revisión de componentes, optimización del sistema operativo y corrección de fallas de hardware y software.',
    category: 'maintenance',
    icon: 'Wrench',
    badge: 'Prevención de Fallas',
    features: [
      'Mantenimiento preventivo físico de hardware (limpieza y pasta térmica)',
      'Mantenimiento correctivo y reemplazo de partes dañadas',
      'Diagnóstico de salud de unidades de almacenamiento (SSD/HDD) y RAM',
      'Optimización del sistema operativo y eliminación de software innecesario',
      'Instalación de actualizaciones críticas y parches de seguridad',
      'Elaboración de informe técnico del estado de cada equipo'
    ],
    benefits: [
      'Mayor velocidad y rendimiento en los equipos de los empleados',
      'Prevención de pérdidas de datos por fallas de hardware',
      'Prolongación de la vida útil del parque informático'
    ],
    ctaText: 'Ver mantenimiento →',
    ctaLink: '/mantenimiento'
  },
  {
    id: 'licenciamiento-software',
    slug: 'licenciamiento',
    title: 'Licenciamiento y Software',
    shortDescription: 'Venta y gestión de soluciones de software y licenciamiento empresarial legal y transparente.',
    fullDescription: 'Garantice la legalidad y seguridad del software en su empresa. Le asesoramos en la adquisición, renovación y administración de licencias originales para sistemas operativos, herramientas ofimáticas, antivirus corporativos y aplicaciones empresariales.',
    category: 'cloud',
    icon: 'ShieldCheck',
    badge: '100% Legal',
    features: [
      'Asesoría en licenciamiento corporativo por volumen o suscripción',
      'Licencias oficiales de sistemas operativos Windows y servidores',
      'Herramientas de productividad Microsoft 365 y software ofimático',
      'Soluciones de antivirus corporativo y seguridad de endpoints',
      'Gestión de renovaciones para evitar interrupciones en el servicio'
    ],
    benefits: [
      'Cumplimiento con las normativas legales de derechos de autor en Colombia',
      'Acceso a parches y soporte oficial del fabricante',
      'Evita riesgos de seguridad asociados a software no autorizado'
    ],
    ctaText: 'Consultar licenciamiento →',
    ctaLink: '/contacto'
  },
  {
    id: 'google-workspace',
    slug: 'google-workspace',
    title: 'Google Workspace',
    shortDescription: 'Implementación, administración y soporte de Google Workspace para colaboración empresarial.',
    fullDescription: 'Modernice el correo y las herramientas de trabajo en equipo de su empresa. Integramos y administramos Google Workspace (Gmail corporativo, Drive, Meet, Documentos), configurando dominios, políticas de seguridad y almacenamiento en la nube para una colaboración fluida.',
    category: 'cloud',
    icon: 'Cloud',
    badge: 'Colaboración Cloud',
    features: [
      'Aprovisionamiento y configuración de cuentas @suempresa.com',
      'Migración de correos y calendarios desde plataformas anteriores',
      'Gestión de almacenamiento en Google Drive corporativo',
      'Políticas de seguridad, doble factor de autenticación (2FA) y permisos',
      'Soporte técnico continuo y administración de usuarios'
    ],
    benefits: [
      'Correo corporativo profesional con la confiabilidad y antispam de Google',
      'Colaboración en tiempo real en documentos y videoconferencias',
      'Acceso seguro desde computadores y dispositivos móviles'
    ],
    ctaText: 'Ver Google Workspace →',
    ctaLink: '/google-workspace'
  }
];
