export interface UserRangeOption {
  id: string;
  label: string;
  minUsers: number;
  maxUsers: number;
  baseRatePerUser: number;
}

export interface ServerOption {
  id: string;
  label: string;
  count: number;
  cost: number;
}

export interface SupportModeOption {
  id: string;
  label: string;
  description: string;
  multiplier: number;
}

export interface ScheduleOption {
  id: string;
  label: string;
  description: string;
  multiplier: number;
}

export interface InfrastructureLevelOption {
  id: string;
  label: string;
  description: string;
  baseCost: number;
}

export interface AdditionalServiceOption {
  id: string;
  label: string;
  description: string;
  monthlyCost: number;
  perUserCost?: number;
}

export const pricingConfig = {
  currency: 'COP',
  currencySymbol: '$',
  
  userRanges: [
    { id: '1-10', label: '1 – 10 usuarios', minUsers: 1, maxUsers: 10, baseRatePerUser: 60000 },
    { id: '11-25', label: '11 – 25 usuarios', minUsers: 11, maxUsers: 25, baseRatePerUser: 52000 },
    { id: '26-50', label: '26 – 50 usuarios', minUsers: 26, maxUsers: 50, baseRatePerUser: 48000 },
    { id: '51-100', label: '51 – 100 usuarios', minUsers: 51, maxUsers: 100, baseRatePerUser: 42000 },
    { id: '101-250', label: '101 – 250 usuarios', minUsers: 101, maxUsers: 250, baseRatePerUser: 38000 },
    { id: '250+', label: 'Más de 250 usuarios', minUsers: 251, maxUsers: 500, baseRatePerUser: 32000 },
  ] as UserRangeOption[],

  servers: [
    { id: '0', label: 'Ninguno', count: 0, cost: 0 },
    { id: '1', label: '1 Servidor', count: 1, cost: 200000 },
    { id: '2-5', label: '2 – 5 Servidores', count: 3, cost: 480000 },
    { id: '5+', label: 'Más de 5 Servidores', count: 6, cost: 900000 },
  ] as ServerOption[],

  supportModes: [
    { 
      id: 'remote', 
      label: 'Remoto', 
      description: 'Mesa de ayuda ágil para resolución de incidentes a distancia.', 
      multiplier: 1.0 
    },
    { 
      id: 'hybrid', 
      label: 'Remoto + Presencial', 
      description: 'Soporte remoto continuo con visitas programadas y atención en sitio.', 
      multiplier: 1.35 
    },
    { 
      id: 'integral', 
      label: 'Soporte Integral', 
      description: 'Cobertura total con máxima prioridad presencial y gestión proactiva.', 
      multiplier: 1.65 
    },
  ] as SupportModeOption[],

  schedules: [
    { id: 'business', label: 'Horario empresarial', description: 'Lunes a Viernes 8:00 AM a 6:00 PM', multiplier: 1.0 },
    { id: 'extended', label: 'Extendido', description: 'Lunes a Sábado con cobertura ampliada', multiplier: 1.25 },
    { id: '24-7', label: '24/7 Crítico', description: 'Atención continua 24 horas para operaciones críticas', multiplier: 1.6 },
  ] as ScheduleOption[],

  infrastructureLevels: [
    { id: 'basic', label: 'Básica', description: 'Equipos de cómputo estándar y red local básica', baseCost: 0 },
    { id: 'medium', label: 'Intermedia', description: 'Servidores dedicados, Wi-Fi administrado y backup local', baseCost: 150000 },
    { id: 'advanced', label: 'Avanzada', description: 'Infraestructura híbrida, firewall perimetral y virtualización', baseCost: 350000 },
  ] as InfrastructureLevelOption[],

  additionalServices: [
    { id: 'server_admin', label: 'Administración de Servidores', description: 'Mantenimiento y monitoreo de Windows/Linux', monthlyCost: 180000 },
    { id: 'networks', label: 'Redes y Conectividad', description: 'Gestión de switches, routers y Wi-Fi corporativo', monthlyCost: 140000 },
    { id: 'backup', label: 'Backup y Copias de Seguridad', description: 'Copias automáticas en la nube y almacenamiento seguro', monthlyCost: 120000, perUserCost: 5000 },
    { id: 'security', label: 'Seguridad y Protección', description: 'Control de accesos, antivirus y políticas de seguridad', monthlyCost: 150000 },
    { id: 'm365', label: 'Microsoft 365', description: 'Administración de usuarios, correo Teams y aplicaciones', monthlyCost: 100000, perUserCost: 4000 },
    { id: 'gsuite', label: 'Google Workspace', description: 'Aprovisionamiento y administración de cuentas Google', monthlyCost: 100000, perUserCost: 4000 },
    { id: 'virtualization', label: 'Virtualización', description: 'Gestión de máquinas virtuales y entornos Proxmox/VMware', monthlyCost: 190000 },
    { id: 'monitoring', label: 'Monitoreo Proactivo', description: 'Alertas tempranas de fallas y disponibilidad', monthlyCost: 120000 },
    { id: 'onsite_support', label: 'Soporte Presencial Frecuente', description: 'Visitas técnicas preventivas programadas', monthlyCost: 230000 },
    { id: 'asset_management', label: 'Gestión de Activos TI', description: 'Inventario técnico y hoja de vida de equipos', monthlyCost: 95000 },
  ] as AdditionalServiceOption[],
};
