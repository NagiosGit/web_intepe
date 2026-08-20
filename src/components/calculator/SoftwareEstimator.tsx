import React, { useState } from 'react';
import { 
  Code2, 
  Send, 
  Info
} from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const SoftwareEstimator: React.FC = () => {
  const [appType, setAppType] = useState<string>('web');
  const [platform, setPlatform] = useState<string>('web_desktop');
  const [userScale, setUserScale] = useState<string>('10 – 50 usuarios');
  const [selectedModules, setSelectedModules] = useState<string[]>([
    'admin_panel',
    'database',
    'reports',
    'roles_permissions'
  ]);

  const modulesList = [
    { id: 'admin_panel', label: 'Panel Administrativo (Dashboard)', desc: 'Control central y gestión de usuarios' },
    { id: 'database', label: 'Base de Datos Estructurada', desc: 'Diseño relacional seguro con copias de respaldo' },
    { id: 'api_integrations', label: 'Integraciones & APIs Externas', desc: 'Conexión con pasarelas, ERPs u otros servicios' },
    { id: 'reports', label: 'Módulo de Reportes & Exportación', desc: 'Generación de informes PDF, Excel y estadísticas' },
    { id: 'roles_permissions', label: 'Roles y Niveles de Permisos', desc: 'Control granular de acceso según el perfil de usuario' },
    { id: 'automation', label: 'Automatización de Tareas', desc: 'Notificaciones automáticas, alertas y disparadores' },
    { id: 'cloud_hosting', label: 'Despliegue en Servidores / Cloud', desc: 'Configuración de entorno de producción escalable' },
    { id: 'maintenance_plan', label: 'Soporte y Mantenimiento Post-Entrega', desc: 'Acompañamiento, mejoras continuas y parches' },
  ];

  const toggleModule = (id: string) => {
    if (selectedModules.includes(id)) {
      setSelectedModules(selectedModules.filter(m => m !== id));
    } else {
      setSelectedModules([...selectedModules, id]);
    }
  };

  const getScopeLevel = () => {
    const count = selectedModules.length;
    if (count <= 3) return { level: 'Alcance Esencial', complexity: 'Baja / Media', duration: '4 – 8 semanas aprox.' };
    if (count <= 6) return { level: 'Alcance Empresarial', complexity: 'Media / Avanzada', duration: '8 – 14 semanas aprox.' };
    return { level: 'Plataforma Completa / ERP', complexity: 'Avanzada / Alta', duration: '12 – 20+ semanas aprox.' };
  };

  const scopeInfo = getScopeLevel();

  const generateWhatsAppMessage = () => {
    const activeMods = selectedModules
      .map(id => modulesList.find(m => m.id === id)?.label)
      .join(', ');

    const msg = `*ESTIMACIÓN DE PROYECTO DE SOFTWARE — INTEPE S.A.S.*\n` +
      `--------------------------------\n` +
      `• *Tipo de Solución:* ${appType}\n` +
      `• *Plataforma:* ${platform}\n` +
      `• *Escala de Usuarios:* ${userScale}\n` +
      `• *Nivel Estimado:* ${scopeInfo.level} (Complejidad ${scopeInfo.complexity})\n` +
      `• *Módulos Requeridos:* ${activeMods}\n` +
      `--------------------------------\n` +
      `Hola equipo de desarrollo INTEPE, me gustaría solicitar una evaluación técnica formal para este requerimiento.`;

    return encodeURIComponent(msg);
  };

  return (
    <section className="py-24 bg-[#FDFBF7] border-b border-[#E8E2D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#F5F0E6] border border-[#E8E2D5] text-stone-800 text-xs font-semibold shadow-2xs">
            <Code2 className="w-3.5 h-3.5 text-[#B86B42]" />
            <span>Estimador de Alcance de Software</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-950 tracking-tight">
            Estime su proyecto de software
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Seleccione las características clave para estructurar una evaluación técnica preliminar con nuestros ingenieros.
          </p>
        </div>

        {/* Form Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls (Left 7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D5] shadow-xs space-y-6">
            
            {/* 1. Tipo de Aplicación */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                1. Tipo de Aplicación requerida:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'web', label: 'Aplicación Web' },
                  { id: 'erp', label: 'Sistema ERP / Gestión' },
                  { id: 'mobile', label: 'App Móvil Android' },
                  { id: 'integration', label: 'Integración API / BD' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setAppType(item.label)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border text-center transition-all ${
                      appType === item.label
                        ? 'bg-[#F5F0E6] border-[#B86B42] text-stone-950 font-bold shadow-2xs ring-1 ring-[#B86B42]/30'
                        : 'bg-[#FDFBF7] border-[#E8E2D5] text-stone-700 hover:bg-white hover:border-[#B86B42]/40'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Plataforma */}
            <div className="space-y-3 pt-3 border-t border-[#F5F0E6]">
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                2. Plataforma principal de uso:
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'web_desktop', label: 'Navegador Web (PC/Laptop)' },
                  { id: 'mobile_field', label: 'Móvil / Trabajo de Campo' },
                  { id: 'cross_platform', label: 'Multiplataforma (Web + App)' },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlatform(p.label)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border text-center transition-all ${
                      platform === p.label
                        ? 'bg-[#F5F0E6] border-[#B86B42] text-stone-950 font-bold shadow-2xs ring-1 ring-[#B86B42]/30'
                        : 'bg-[#FDFBF7] border-[#E8E2D5] text-stone-700 hover:bg-white hover:border-[#B86B42]/40'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Escala de Usuarios */}
            <div className="space-y-3 pt-3 border-t border-[#F5F0E6]">
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                3. Cantidad estimada de usuarios del sistema:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  '1 – 10 usuarios',
                  '11 – 50 usuarios',
                  '51 – 200 usuarios',
                  'Más de 200 usuarios'
                ].map((scale) => (
                  <button
                    key={scale}
                    type="button"
                    onClick={() => setUserScale(scale)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border text-center transition-all ${
                      userScale === scale
                        ? 'bg-[#F5F0E6] border-[#B86B42] text-stone-950 font-bold shadow-2xs ring-1 ring-[#B86B42]/30'
                        : 'bg-[#FDFBF7] border-[#E8E2D5] text-stone-700 hover:bg-white hover:border-[#B86B42]/40'
                    }`}
                  >
                    {scale}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Módulos / Requerimientos */}
            <div className="space-y-3 pt-3 border-t border-[#F5F0E6]">
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                4. Componentes y Módulos a integrar:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">

                {modulesList.map((m) => {
                  const isChecked = selectedModules.includes(m.id);
                  return (
                    <div
                      key={m.id}
                      onClick={() => toggleModule(m.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start space-x-2.5 ${
                        isChecked 
                          ? 'bg-[#F5F0E6] border-[#B86B42] text-stone-950' 
                          : 'bg-[#FDFBF7] border-[#E8E2D5] text-stone-600 hover:bg-white hover:border-[#B86B42]/40'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        readOnly
                        className="mt-0.5 w-4 h-4 rounded text-[#B86B42] focus:ring-[#B86B42] border-[#E8E2D5]"
                      />
                      <div>
                        <div className="text-xs font-bold text-stone-900">{m.label}</div>
                        <div className="text-[10px] text-stone-500">{m.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Summary (Deep Forest Contrast) */}
          <div className="lg:col-span-5 bg-[#1F2923] text-white rounded-3xl p-7 sm:p-8 border border-stone-800 space-y-6 shadow-xl sticky top-28">
            <div className="border-b border-white/10 pb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#B86B42] flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B86B42] mr-1.5"></span>
                Diagnóstico de Alcance
              </span>
              <h3 className="text-xl font-extrabold text-white">
                Estimación Preliminar de Software
              </h3>
            </div>

            <div className="space-y-3 text-xs text-stone-300">
              <div className="flex justify-between">
                <span>Tipo de Solución:</span>
                <strong className="text-white">{appType}</strong>
              </div>
              <div className="flex justify-between">
                <span>Plataforma:</span>
                <strong className="text-white">{platform}</strong>
              </div>
              <div className="flex justify-between">
                <span>Nivel de Alcance:</span>
                <strong className="text-[#FAF6EE] font-bold">{scopeInfo.level}</strong>
              </div>
              <div className="flex justify-between">
                <span>Complejidad Técnica:</span>
                <strong className="text-white">{scopeInfo.complexity}</strong>
              </div>
              <div className="flex justify-between">
                <span>Tiempo de Entrega Estimado:</span>
                <strong className="text-white font-mono">{scopeInfo.duration}</strong>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/30 border border-white/10 text-xs text-stone-300 space-y-2">
              <div className="flex items-center text-[#B86B42] font-semibold text-xs">
                <Info className="w-4 h-4 mr-1.5 shrink-0" />
                <span>Evaluación Técnica Requerida</span>
              </div>
              <p className="text-[11px] text-stone-300 leading-relaxed">
                Cada desarrollo de software es único. Para brindarle una cotización definitiva y cronograma exacto, realizamos una sesión de análisis de requerimientos sin costo.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 rounded-xl font-bold text-xs uppercase tracking-wider text-stone-900 bg-[#FDFBF7] hover:bg-[#FAF6EE] shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4 text-[#B86B42]" />
                <span>Solicitar evaluación técnica</span>
              </a>

              <a
                href={`mailto:${siteConfig.email}?subject=Solicitud%20Evaluaci%C3%B3n%20Software%20INTEPE&body=Hola%20INTEPE,%20deseo%20evaluar%20un%20proyecto%20de%20software.`}
                className="w-full py-3 px-5 rounded-xl font-semibold text-xs text-stone-300 hover:text-white bg-white/10 hover:bg-white/15 text-center block transition-all"
              >
                Enviar por correo a soporte@intepe.net
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
