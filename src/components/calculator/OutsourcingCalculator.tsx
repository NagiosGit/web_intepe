import React, { useState } from 'react';
import { pricingConfig } from '../../config/pricingConfig';
import { siteConfig } from '../../config/siteConfig';
import { 
  Send, 
  ArrowRight,
  Server,
  Users,
  Clock,
  Layers,
  Terminal,
  Zap
} from 'lucide-react';

export const OutsourcingCalculator: React.FC = () => {
  // Wizard state
  const [selectedUserRangeId, setSelectedUserRangeId] = useState<string>('11-25');
  const [workstationsCount, setWorkstationsCount] = useState<number>(15);
  const [selectedServerId, setSelectedServerId] = useState<string>('1');
  const [selectedSupportModeId, setSelectedSupportModeId] = useState<string>('hybrid');
  const [selectedScheduleId, setSelectedScheduleId] = useState<string>('business');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'backup',
    'security',
    'monitoring'
  ]);

  // Lead Modal / Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    role: '',
    phone: '',
    email: '',
    city: 'Bogotá',
    comments: ''
  });

  // Config items
  const userRange = pricingConfig.userRanges.find(u => u.id === selectedUserRangeId) || pricingConfig.userRanges[1];
  const serverOpt = pricingConfig.servers.find(s => s.id === selectedServerId) || pricingConfig.servers[1];
  const supportMode = pricingConfig.supportModes.find(m => m.id === selectedSupportModeId) || pricingConfig.supportModes[1];
  const scheduleOpt = pricingConfig.schedules.find(s => s.id === selectedScheduleId) || pricingConfig.schedules[0];
  const infraOpt = pricingConfig.infrastructureLevels[1];

  // Base Calculation Formula
  const calculateTotal = () => {
    let usersSubtotal = workstationsCount * userRange.baseRatePerUser;
    let serversSubtotal = serverOpt.cost;
    let infraSubtotal = infraOpt.baseCost;

    let addonsSubtotal = 0;
    selectedAddons.forEach(addonId => {
      const addon = pricingConfig.additionalServices.find(a => a.id === addonId);
      if (addon) {
        addonsSubtotal += addon.monthlyCost;
        if (addon.perUserCost) {
          addonsSubtotal += addon.perUserCost * workstationsCount;
        }
      }
    });

    const coreBase = (usersSubtotal + serversSubtotal + infraSubtotal) * supportMode.multiplier * scheduleOpt.multiplier;
    const finalTotal = coreBase + addonsSubtotal;

    return Math.round(finalTotal);
  };

  const estimatedMonthlyTotal = calculateTotal();

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(val);
  };

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(a => a !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const getAddonsNames = () => {
    return selectedAddons
      .map(id => pricingConfig.additionalServices.find(a => a.id === id)?.label)
      .filter(Boolean)
      .join(', ');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = encodeURIComponent(
      `*COTIZACIÓN ESTIMADA OUTSOURCING TI — INTEPE S.A.S.*\n` +
      `-------------------------------------------\n` +
      `• *Cliente:* ${formData.name}\n` +
      `• *Empresa:* ${formData.company || 'No especificada'}\n` +
      `• *Cargo:* ${formData.role || 'No especificado'}\n` +
      `• *Ciudad:* ${formData.city}\n` +
      `• *Teléfono:* ${formData.phone}\n` +
      `• *Email:* ${formData.email}\n` +
      `-------------------------------------------\n` +
      `*PARÁMETROS TÉCNICOS:* \n` +
      `• *Puestos / Usuarios:* ${workstationsCount} (${userRange.label})\n` +
      `• *Servidores:* ${serverOpt.label}\n` +
      `• *Modalidad:* ${supportMode.label}\n` +
      `• *Horario de Atención:* ${scheduleOpt.label}\n` +
      `• *Servicios Adicionales:* ${getAddonsNames() || 'Ninguno'}\n` +
      `-------------------------------------------\n` +
      `*VALOR MENSUAL ESTIMADO:* ${formatCOP(estimatedMonthlyTotal)} + IVA\n` +
      `• *Notas del cliente:* ${formData.comments || 'Ninguna'}`
    );

    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`, '_blank');
    setIsModalOpen(false);
  };

  return (
    <div className="py-12 bg-[#080B0E] relative cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="tech-badge">
            <Terminal className="w-3.5 h-3.5 text-[#FF7120]" />
            <span>SIMULADOR PARAMÉTRICO DE COSTOS TI</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Space_Grotesk']">
            Cotizador de <span className="text-[#FF7120]">Outsourcing TI</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-sans">
            Configure las variables tecnológicas de su empresa para obtener un valor mensual estimado con total transparencia y desglose técnico.
          </p>
        </div>

        {/* 2 Columns: Configurator (7 cols) + Sticky Summary (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Settings (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Users Count & Slider */}
            <div className="cyber-card rounded-lg p-6 sm:p-7 hud-box space-y-4">
              <div className="hud-corner-tl"></div>
              <div className="hud-corner-br"></div>

              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded bg-[#FF7120]/10 border border-[#FF7120]/30 flex items-center justify-center text-[#FF7120]">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#FF7120] block uppercase">
                      [PASO 01]
                    </span>
                    <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
                      Puestos de Trabajo & Usuarios
                    </h3>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-white font-['Space_Grotesk'] text-[#FF7120]">
                    {workstationsCount}
                  </span>
                  <span className="text-xs font-mono text-slate-400 ml-1">equipos</span>
                </div>
              </div>

              {/* Slider */}
              <div className="space-y-3 pt-2">
                <input 
                  type="range"
                  min="1"
                  max="150"
                  value={workstationsCount}
                  onChange={(e) => {
                    const count = parseInt(e.target.value);
                    setWorkstationsCount(count);
                    const matchedRange = pricingConfig.userRanges.find(
                      r => count >= r.minUsers && count <= r.maxUsers
                    );
                    if (matchedRange) setSelectedUserRangeId(matchedRange.id);
                  }}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FF7120]"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-500">
                  <span>1 usuario</span>
                  <span>50 usuarios</span>
                  <span>100 usuarios</span>
                  <span>150+ usuarios</span>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-2">
                {pricingConfig.userRanges.map((range) => (
                  <button
                    key={range.id}
                    type="button"
                    onClick={() => {
                      setSelectedUserRangeId(range.id);
                      setWorkstationsCount(range.minUsers);
                    }}
                    className={`py-1.5 px-2 rounded text-[11px] font-mono transition-all text-center ${
                      selectedUserRangeId === range.id
                        ? 'bg-[#FF7120] text-black font-bold shadow-[0_0_15px_rgba(255,113,32,0.4)]'
                        : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Servidores Físicos o Virtuales */}
            <div className="cyber-card rounded-lg p-6 sm:p-7 hud-box space-y-4">
              <div className="hud-corner-tl"></div>
              <div className="hud-corner-br"></div>

              <div className="flex items-center space-x-3 border-b border-white/10 pb-3">
                <div className="w-8 h-8 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Server className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400 block uppercase">
                    [PASO 02]
                  </span>
                  <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
                    Servidores & Virtualización
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {pricingConfig.servers.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedServerId(s.id)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      selectedServerId === s.id
                        ? 'bg-[#FF7120]/10 border-[#FF7120] text-white shadow-[0_0_15px_rgba(255,113,32,0.2)]'
                        : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <div className="font-bold text-xs font-['Space_Grotesk'] text-white">
                      {s.label}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 mt-1">
                      {s.cost === 0 ? 'Sin servidores' : `+ ${formatCOP(s.cost)}/mes`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Modalidad de Soporte */}
            <div className="cyber-card rounded-lg p-6 sm:p-7 hud-box space-y-4">
              <div className="hud-corner-tl"></div>
              <div className="hud-corner-br"></div>

              <div className="flex items-center space-x-3 border-b border-white/10 pb-3">
                <div className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-cyan-400 block uppercase">
                    [PASO 03]
                  </span>
                  <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
                    Modalidad de Cobertura
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {pricingConfig.supportModes.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedSupportModeId(m.id)}
                    className={`p-4 rounded-lg border text-left transition-all space-y-1.5 ${
                      selectedSupportModeId === m.id
                        ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-[0_0_20px_rgba(0,229,255,0.2)]'
                        : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs font-['Space_Grotesk'] text-white">
                        {m.label}
                      </span>
                      {selectedSupportModeId === m.id && (
                        <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      {m.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Horario de Atención */}
            <div className="cyber-card rounded-lg p-6 sm:p-7 hud-box space-y-4">
              <div className="hud-corner-tl"></div>
              <div className="hud-corner-br"></div>

              <div className="flex items-center space-x-3 border-b border-white/10 pb-3">
                <div className="w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-400 block uppercase">
                    [PASO 04]
                  </span>
                  <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
                    Horario de Mesa de Ayuda
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {pricingConfig.schedules.map((sch) => (
                  <button
                    key={sch.id}
                    type="button"
                    onClick={() => setSelectedScheduleId(sch.id)}
                    className={`p-3.5 rounded-lg border text-left transition-all ${
                      selectedScheduleId === sch.id
                        ? 'bg-emerald-500/10 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                        : 'bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <div className="font-bold text-xs font-['Space_Grotesk'] text-white">
                      {sch.label}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      {sch.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Servicios Adicionales */}
            <div className="cyber-card rounded-lg p-6 sm:p-7 hud-box space-y-4">
              <div className="hud-corner-tl"></div>
              <div className="hud-corner-br"></div>

              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-purple-400 block uppercase">
                      [PASO 05]
                    </span>
                    <h3 className="text-base font-bold text-white font-['Space_Grotesk']">
                      Servicios Adicionales (Add-ons)
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {selectedAddons.length} seleccionados
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {pricingConfig.additionalServices.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
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
                      <div className="flex-1 text-xs">
                        <div className="font-bold font-['Space_Grotesk'] text-white">
                          {addon.label}
                        </div>
                        <div className="text-[11px] text-slate-400 leading-snug">
                          {addon.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Pricing Cockpit Summary (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="cyber-card rounded-lg p-6 sm:p-8 hud-box border border-[#FF7120]/30 shadow-[0_0_35px_rgba(255,113,32,0.15)] space-y-6">
              <div className="hud-corner-tl !border-[#FF7120]"></div>
              <div className="hud-corner-tr !border-[#FF7120]"></div>
              <div className="hud-corner-bl !border-[#FF7120]"></div>
              <div className="hud-corner-br !border-[#FF7120]"></div>

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-[#FF7120] uppercase tracking-wider block">
                    // RESUMEN DE COTIZACIÓN
                  </span>
                  <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                    Plan de Outsourcing TI
                  </h3>
                </div>
                <span className="px-2 py-1 text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded">
                  ESTIMADO
                </span>
              </div>

              {/* Price Big Display */}
              <div className="p-4 rounded bg-white/[0.02] border border-white/5 space-y-1 text-center">
                <div className="text-xs font-mono text-slate-400 uppercase">Valor Mensual Estimado</div>
                <div className="text-3xl sm:text-4xl font-black text-[#FF7120] font-['Space_Grotesk'] tracking-tight">
                  {formatCOP(estimatedMonthlyTotal)}
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  + IVA mensual | Facturación empresarial
                </div>
              </div>

              {/* Breakdown List */}
              <div className="space-y-2 text-xs font-mono text-slate-300 border-t border-white/10 pt-4">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Puestos / Usuarios:</span>
                  <span className="font-bold text-white">{workstationsCount} equipos</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Servidores:</span>
                  <span className="font-bold text-white">{serverOpt.label}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Modalidad:</span>
                  <span className="font-bold text-cyan-400">{supportMode.label}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Horario:</span>
                  <span className="font-bold text-emerald-400">{scheduleOpt.label}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Add-ons activos:</span>
                  <span className="font-bold text-[#FF853A]">{selectedAddons.length} módulos</span>
                </div>
              </div>

              {/* CTA Action Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full btn-cyber-primary text-xs py-3.5"
              >
                <span>GENERAR PROPUESTA FORMAL</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="p-3 rounded bg-white/[0.02] border border-white/5 text-[11px] text-slate-400 font-sans text-center">
                Sin compromiso. Incluye diagnóstico inicial gratuito de su infraestructura tecnológica.
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Proposal Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="cyber-card rounded-lg p-6 sm:p-8 max-w-lg w-full hud-box border border-[#FF7120]/40 shadow-[0_0_50px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto">
            <div className="hud-corner-tl !border-[#FF7120]"></div>
            <div className="hud-corner-tr !border-[#FF7120]"></div>
            <div className="hud-corner-bl !border-[#FF7120]"></div>
            <div className="hud-corner-br !border-[#FF7120]"></div>

            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#FF7120] uppercase block">
                  // DESPACHO DE PROPUESTA
                </span>
                <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                  Datos de su Empresa
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-slate-300">Nombre *</label>
                  <input
                    type="text"
                    required
                    placeholder="Su nombre"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white text-xs font-sans focus:outline-none focus:border-[#FF7120]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-slate-300">Empresa *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nombre empresa"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white text-xs font-sans focus:outline-none focus:border-[#FF7120]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-slate-300">Teléfono / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="310 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white text-xs font-sans focus:outline-none focus:border-[#FF7120]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-slate-300">Correo *</label>
                  <input
                    type="email"
                    required
                    placeholder="correo@empresa.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white text-xs font-sans focus:outline-none focus:border-[#FF7120]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-300">Ciudad</label>
                <input
                  type="text"
                  placeholder="Bogotá, Medellín, Cali..."
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white text-xs font-sans focus:outline-none focus:border-[#FF7120]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-300">Comentarios Adicionales</label>
                <textarea
                  rows={3}
                  placeholder="Detalles sobre sedes, contingencias o fechas deseadas..."
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white text-xs font-sans focus:outline-none focus:border-[#FF7120]"
                />
              </div>

              <div className="p-3 rounded bg-white/[0.02] border border-white/5 font-mono text-xs text-slate-300 flex justify-between">
                <span>Total Estimado:</span>
                <span className="font-bold text-[#FF7120]">{formatCOP(estimatedMonthlyTotal)}/mes</span>
              </div>

              <button
                type="submit"
                className="w-full btn-cyber-primary text-xs py-3"
              >
                <Send className="w-4 h-4" />
                <span>DESPACHAR A WHATSAPP DE INTEPE</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
