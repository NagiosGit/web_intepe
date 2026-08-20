import type { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'granjaweb',
    slug: 'granjaweb',
    title: 'GranjaWP',
    tagline: 'Plataforma web para la gestión integral de producción avícola, lotes de postura, inventario y costos agropecuarios.',
    category: 'Gestión Agropecuaria & Avícola',
    icon: 'Sprout',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
    demoUrl: 'https://granjawp.netlify.app/',
    description: 'Sistema web y móvil desarrollado por INTEPE S.A.S. para digitalizar y automatizar el control productivo, sanitario, logístico y financiero de granjas avícolas y agropecuarias.',
    fullDescription: 'GranjaWP es una solución integral desarrollada por INTEPE S.A.S. para transformar la administración operativa en explotaciones avícolas. Permite registrar en tiempo real la producción de huevos clasificada por calidades, control de mortalidad, pesajes periódicos, consumo de alimento por lote y vacunación, integrando la liquidación de nómina de galponeros, control de ventas y cálculo automático del punto de equilibrio financiero por lote.',
    features: [
      'Dashboard con KPIs en tiempo real: postura diaria, conversión alimenticia, mortalidad y aves activas.',
      'Control de lotes y galpones con seguimiento por edades (semanas/días) y línea genética.',
      'Planilla diaria de producción de huevos clasificada por calidades (Jumbo, AAA, AA, A, B, C, Roto, Sucio).',
      'Registro de consumo de alimento en bultos y kilos con descuento automático de inventario.',
      'Plan de vacunación y sanidad con trazabilidad de dosis, tratamientos veterinarios y alertas.',
      'Módulo de despachos, clientes y remisiones de venta con control de cartera y cobranza.',
      'Liquidación de nómina de operarios con registro de jornales, horas extras, vales y generación de vouchers.',
      'Análisis financiero de rentabilidad, cálculo del costo base por huevo y exportación de reportes a Excel y PDF.'
    ],
    highlights: [
      'Reemplazo 100% de planillas de papel por registros digitales seguros desde cualquier dispositivo.',
      'Cálculo automático de la tasa de conversión alimenticia y costo unitario de producción.',
      'Visibilidad financiera instantánea de utilidades netas, ingresos y gastos operativos.'
    ],
    targetAudience: 'Productores avícolas, granjas de postura y engorde, administradores agropecuarios y empresas del sector pecuario.',
    modules: [
      { name: 'Dashboard Ejecutivo', desc: 'Resumen consolidado de aves activas, mortalidad acumulada, porcentaje de postura y saldo en caja.' },
      { name: 'Galpones & Lotes', desc: 'Gestión por etapas de desarrollo (cría, levante, producción) y estado operativo del galpón.' },
      { name: 'Inventario & Bodega', desc: 'Control de existencias de alimento concentrado, medicamentos e insumos con alerta de stock mínimo.' },
      { name: 'Despachos & Facturación', desc: 'Emisión de remisiones, control de precios por cubeta, cartera de clientes y cuentas por cobrar.' },
      { name: 'Mano de Obra', desc: 'Control de asistencia, jornales, adelantos y liquidación de nómina periódica por trabajador.' }
    ]
  },
  {
    id: 'invernaderos',
    slug: 'invernaderos',
    title: 'InvernaderoFM',
    tagline: 'Plataforma web integral para la administración, monitoreo, control de cosechas, insumos y rentabilidad de cultivos bajo invernadero.',
    category: 'Automatización & Control Agronómico',
    icon: 'Layers',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
    demoUrl: 'https://invernaderofm.netlify.app/',
    description: 'Herramienta tecnológica desarrollada por INTEPE S.A.S. para supervisar variables agronómicas, registrar cosechas diarias, controlar dosificación de insumos y calcular la rentabilidad por bloque.',
    fullDescription: 'InvernaderoFM es una plataforma web modular diseñada por INTEPE S.A.S. para la gestión operativa y financiera de cultivos protegidos en invernaderos y naves agrícolas. Centraliza la captura diaria de datos de corte por producto y calidad, el control riguroso de bodega (fertilizantes, pesticidas y herramientas), la aplicación de dosis fitosanitarias por operario y la liquidación de labores agrícolas, permitiendo a los administradores conocer con exactitud el costo de producción y el margen neto de cada lote.',
    features: [
      'Dashboard operativo y financiero con análisis de rendimiento por nave e invernadero.',
      'Gestión modular de bloques e invernaderos con dimensiones (largo x ancho), fecha de siembra y estimación de cosecha.',
      'Planilla de cosecha diaria con registro de corte por producto, clasificación de calidades y operario recolector.',
      'Inventario de bodega clasificado en consumibles (fertilizantes, dosis) y herramientas/activos (motobombas, mangueras).',
      'Control de aplicación de insumos con asignación de dosis por plaga/cultivo y responsable aplicador.',
      'Traslado y asignación física de herramientas entre bodegas, áreas y operarios responsables.',
      'Módulo de despachos con remisiones de venta, gestión de clientes, estados de cobro y cartera pendiente.',
      'Liquidación central de mano de obra agrícola (jornaleros por sábado o fijos quincenales) con vales y vouchers PDF.',
      'Cálculo del punto de equilibrio y costo base por lote para fijación estratégica de precios de venta.'
    ],
    highlights: [
      'Trazabilidad agronómica completa desde la siembra hasta la cosecha y el despacho comercial.',
      'Eliminación de fugas de inventario en fertilizantes e insumos químicos mediante registro estricto de dosis.',
      'Liquidación automatizada de jornales y tareas con exportación de históricos a Excel.'
    ],
    targetAudience: 'Productores bajo cubierta, empresas de flores, hortalizas, frutas y cultivos especializados que requieren control de costos.',
    modules: [
      { name: 'Gestión de Invernaderos / Bloques', desc: 'Configuración de naves, estados (Activo, En Cosecha, Preparación, Descanso) y dimensiones.' },
      { name: 'Cosecha Diaria', desc: 'Registro de recolección por canastillas, kilos o unidades según catálogo de productos y calidades.' },
      { name: 'Bodega & Insumos', desc: 'Control de compras, stock de fertilizantes, agroquímicos y localización de herramientas físicas.' },
      { name: 'Despachos & Cartera', desc: 'Generación de comprobantes de venta, control de clientes, cobros recibidos y saldo pendiente.' },
      { name: 'Nómina & Vales', desc: 'Planilla de jornales, trabajo por horas o contratos de labor, con deducción automática de anticipos.' }
    ]
  },
  {
    id: 'intepr-erp',
    slug: 'intepr-erp',
    title: 'INTEPR-ERP',
    tagline: 'Sistema ERP empresarial modular desarrollado para centralizar y gestionar procesos administrativos, inventarios y operativos.',
    category: 'Sistemas Empresariales & ERP',
    icon: 'Building2',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    description: 'Sistema empresarial integral desarrollado por INTEPE S.A.S. para unificar la administración, compras, inventarios, facturación y reportes gerenciales en una arquitectura escalable sin cobros abusivos por usuario.',
    fullDescription: 'INTEPR-ERP representa la capacidad de ingeniería de INTEPE S.A.S. para construir plataformas de gestión empresarial a la medida exacta del flujo de trabajo de cada organización. Centraliza los datos financieros, comerciales y logísticos en un entorno seguro y de alto rendimiento, permitiendo a gerencias y directores tomar decisiones con información auditada en tiempo real.',
    features: [
      'Arquitectura modular personalizada según las áreas y operaciones de la empresa.',
      'Facturación, compras, cuentas por pagar y cuentas por cobrar centralizadas.',
      'Administración de inventarios multisede y control de traslados entre bodegas.',
      'Control de clientes, proveedores y trazabilidad de pedidos.',
      'Módulo de tesorería, flujo de caja y conciliación de movimientos.',
      'Generación de reportes ejecutivos e indicadores de gestión empresarial.',
      'Integración con bases de datos relacionales seguras y esquemas de copias de seguridad automáticas.'
    ],
    highlights: [
      '100% adaptable a los procesos y requerimientos específicos de la compañía.',
      'Sin cobros recurrentes de licenciamiento por usuario adicional.',
      'Software de propiedad de la empresa con respaldo y soporte técnico directo de INTEPE.'
    ],
    targetAudience: 'Pequeñas y medianas empresas en Colombia que buscan un sistema ERP robusto y adaptado a su realidad operativa.',
    modules: [
      { name: 'Ventas & Facturación', desc: 'Emisión de documentos comerciales, cotizaciones y control de cartera de clientes.' },
      { name: 'Compras & Proveedores', desc: 'Órdenes de compra, recepción de mercancías y gestión de cuentas por pagar.' },
      { name: 'Inventarios Multisede', desc: 'Control de existencias, kardex, traslados internos y alertas de reabastecimiento.' },
      { name: 'Tesorería & Bancos', desc: 'Flujo de efectivo, egresos operacionales y estados de cuenta consolidados.' }
    ]
  }
];
