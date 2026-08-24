import React, { useState } from 'react';
import { 
  Send, 
  Terminal
} from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const SoftwareEstimator: React.FC = () => {
  const [appType, setAppType] = useState<string>('Aplicación Web');
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
      `• *Escala de Usuarios:* ${userScale}\n` +
      `• *Nivel Estimado:* ${scopeInfo.level} (Complejidad ${scopeInfo.complexity})\n` +
      `• *Módulos Requeridos:* ${activeMods}\n` +
      `--------------------------------\n` +
      `Hola equipo de desarrollo INTEPE, me gustaría solicitar una evaluación técnica formal para este requerimiento.`;

    return encodeURIComponent(msg);
  };

  return (
    <section className="py-24 bg-[#080B0E] border-b border-white/10 relative overflow-hidden cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="tech-badge">
            <Terminal className="w-3.5 h-3.5 text-[#FF7120]" />
            <span>ARQUITECTURA DE SOFTWARE & ESTIMACIÓN</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Space_Grotesk']">
            Estime su Proyecto de <span className="text-[#FF7120]">Software</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-sans">
            Seleccione las características clave para estructurar una evaluación técnica preliminar con nuestro equipo de ingeniería.
          </p>
        </div>

        {/* Form Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls (Left 7 cols) */}
          <div className="lg:col-span-7 cyber-card rounded-lg p-6 sm:p-8 hud-box space-y-6">
            <div className="hud-corner-tl"></div>
            <div className="hud-corner-br"></div>

            {/* 1. Tipo de Aplicación */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold text-[#FF7120] uppercase tracking-wider block">
                [01] // TIPO DE SOLUCIÓN REQUERIDA:
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
                    className={`py-2 px-3 rounded text-xs font-mono transition-all text-center ${
                      appType === item.label
                        ? 'bg-[#FF7120] text-black font-bold shadow-[0_0_15px_rgba(255,113,32,0.4)]'
                        : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Escala de Usuarios */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <label className="text-xs font-mono font-bold text-[#FF7120] uppercase tracking-wider block">
                [02] // ESCALA DE USUARIOS ESTIMADA:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  '1 – 10 usuarios',
                  '10 – 50 usuarios',
                  '50 – 200 usuarios',
                  'Más de 200 usuarios'
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setUserScale(item)}
                    className={`py-2 px-3 rounded text-xs font-mono transition-all text-center ${
                      userScale === item
                        ? 'bg-cyan-500 text-black font-bold shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                        : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Módulos Funcionales */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold text-[#FF7120] uppercase tracking-wider block">
                  [03] // MÓDULOS FUNCIONALES ({selectedModules.length} ACTIVOS):
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {modulesList.map((mod) => {
                  const isChecked = selectedModules.includes(mod.id);
                  return (
                    <div
                      key={mod.id}
                      onClick={() => toggleModule(mod.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all flex items-start space-x-3 ${
                        isChecked
                          ? 'bg-[#FF7120]/10 border-[#FF7120]/60 text-white'
                          : 'bg-white/[0.02] border-white/5 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-0.5 rounded accent-[#FF7120]"
                      />
                      <div className="flex-1 text-xs font-sans">
                        <div className="font-bold font-['Space_Grotesk'] text-white">
                          {mod.label}
                        </div>
                        <div className="text-[11px] text-slate-400 leading-snug">
                          {mod.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Scope Cockpit Card (Right 5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="cyber-card rounded-lg p-6 sm:p-8 hud-box border border-[#FF7120]/30 shadow-[0_0_35px_rgba(255,113,32,0.15)] space-y-6">
              <div className="hud-corner-tl !border-[#FF7120]"></div>
              <div className="hud-corner-tr !border-[#FF7120]"></div>
              <div className="hud-corner-bl !border-[#FF7120]"></div>
              <div className="hud-corner-br !border-[#FF7120]"></div>

              <div>
                <span className="text-xs font-mono font-bold text-[#FF7120] uppercase tracking-wider block">
                  // DICTAMEN TÉCNICO PRELIMINAR
                </span>
                <h3 className="text-xl font-bold text-white font-['Space_Grotesk'] mt-1">
                  {scopeInfo.level}
                </h3>
              </div>

              <div className="space-y-3 font-mono text-xs text-slate-300 border-y border-white/10 py-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Tipo de Software:</span>
                  <span className="font-bold text-white">{appType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Complejidad:</span>
                  <span className="font-bold text-cyan-400">{scopeInfo.complexity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tiempo de desarrollo:</span>
                  <span className="font-bold text-emerald-400">{scopeInfo.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Módulos seleccionados:</span>
                  <span className="font-bold text-[#FF853A]">{selectedModules.length} módulos</span>
                </div>
              </div>

              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-cyber-primary text-xs py-3.5 flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>SOLICITAR EVALUACIÓN TÉCNICA</span>
              </a>

              <p className="text-[11px] text-slate-400 font-sans text-center">
                Un ingeniero de INTEPE revisará sus flujos y requerimientos para entregar una cotización formal con garantía.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
