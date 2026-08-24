import type { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'granjaweb',
    slug: 'granjaweb',
    title: 'GranjaWP',
    tagline: 'Plataforma web integral para la gestión agronómica, control de invernaderos, cosechas diarias, inventario de bodega, costos por lote y rentabilidad financiera.',
    category: 'Gestión Agrícola & Invernaderos',
    icon: 'Sprout',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    description: 'Sistema web integral desarrollado por INTEPE S.A.S. para digitalizar, controlar y rentabilizar operaciones agrícolas, producción en invernaderos (arándanos, tomate, hortalizas, uchuvas), bodega de insumos, despachos y liquidación de jornales.',
    fullDescription: 'GranjaWP es una plataforma ERP agropecuaria desarrollada a la medida por INTEPE S.A.S. para transformar la administración operativa y financiera de granjas agrícolas y cultivos bajo invernadero. Centraliza en una arquitectura moderna el monitoreo en tiempo real de lotes en producción, cálculo automático del punto de equilibrio y precio mínimo de venta base, control de cosechas diarias, inventario de agroquímicos y herramientas con alertas de agotamiento, registro de gastos y facturas, gestión de despachos, cartera y liquidación de nómina de operarios de campo.',
    features: [
      'Dashboard ejecutivo con KPIs en tiempo real: ingresos en producción, gastos consolidados, utilidad neta activa y porcentaje de eficiencia financiera.',
      'Cálculo automático de costo base y punto de equilibrio por lote/invernadero (INV_ARAN2, INV_TOMATE, INV_HORTALIZAS, INV_ARANDANOS) determinando el precio mínimo de venta por kilo o canastilla.',
      'Control de gastos y facturación electrónica de proveedores clasificado por labores de siembra, mantenimiento, agroinsumos, servicios públicos y fletes.',
      'Reporte de ventas y finanzas con comparativas de rentabilidad, análisis de márgenes y estado de cartera (total cobrado en caja vs. cuentas por cobrar pendientes).',
      'Inventario integral de bodega con clasificación de consumibles (fertilizantes, abonos, fungicidas) y activos fijos/herramientas, con alertas tempranas de stock crítico.',
      'Planilla de cosecha diaria con registro de corte por invernadero, pesaje de canastillas/kilos y trazabilidad de recolección.',
      'Liquidación automatizada de nómina y mano de obra agrícola: control de jornales, horas trabajadas, vales de anticipo y comprobantes de pago.',
      'Módulo de despachos y remisiones comerciales a clientes con control de entregas, precios unitarios y flujo de caja diario.'
    ],
    highlights: [
      'Visibilidad financiera 100% precisa del costo real de producción y margen por cada invernadero y cultivo.',
      'Alertas inteligentes en tiempo real para evitar desabastecimiento de fertilizantes e insumos químicos críticos.',
      'Control riguroso de cartera y cobranzas para maximizar la liquidez y rentabilidad del negocio agrícola.'
    ],
    targetAudience: 'Productores agrícolas, administradores de invernaderos y cultivos comerciales (arándanos, hortalizas, tomate, frutales), agroindustrias y empresas del sector agropecuario.',
    modules: [
      { name: 'Dashboard & Punto de Equilibrio', desc: 'Monitoreo de ingresos, gastos, utilidad neta activa y cálculo del precio base por kilo/canastilla por cada lote en producción.' },
      { name: 'Control de Gastos & Facturación', desc: 'Registro de egresos de proveedores por concepto agronómico (siembras, abonos, fletes, servicios) con adjuntos en PDF y exportación a Excel.' },
      { name: 'Ventas, Finanzas & Cartera', desc: 'Análisis de rentabilidad por invernadero, gráficas de rendimiento financiero y seguimiento de cobros en caja vs. cartera pendiente.' },
      { name: 'Inventario & Bodega de Insumos', desc: 'Control de stock físico en tiempo real de fertilizantes, pesticidas y herramientas en uso por operarios con alertas de nivel crítico.' },
      { name: 'Cosecha Diaria & Despachos', desc: 'Registro diario de recolección en campo, pesajes por variedad y generación de remisiones de despacho a clientes.' },
      { name: 'Nómina & Mano de Obra Agrícola', desc: 'Administración de operarios, asignación de tareas por bloque, control de jornales diarios y deducción de vales.' }
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
