import React, { useState } from 'react';
import { pricingConfig } from '../../config/pricingConfig';
import { siteConfig } from '../../config/siteConfig';
import { 
  Calculator, 
  CheckCircle2, 
  Send, 
  Info,
  ChevronDown,
  ChevronUp,
  ArrowRight
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

  // Mobile drawer summary collapse
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState<boolean>(false);

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
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Config items
  const userRange = pricingConfig.userRanges.find(u => u.id === selectedUserRangeId) || pricingConfig.userRanges[1];
  const serverOpt = pricingConfig.servers.find(s => s.id === selectedServerId) || pricingConfig.servers[1];
  const supportMode = pricingConfig.supportModes.find(m => m.id === selectedSupportModeId) || pricingConfig.supportModes[1];
  const scheduleOpt = pricingConfig.schedules.find(s => s.id === selectedScheduleId) || pricingConfig.schedules[0];
  const infraOpt = pricingConfig.infrastructureLevels[1];

  // Base Calculation Formula (Decoupled from pricingConfig.ts)
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
      `*SOLICITUD FORMAL DE PROPUESTA — INTEPE S.A.S.*\n` +
      `• *Nombre:* ${formData.name}\n` +
      `• *Empresa:* ${formData.company}\n` +
      `• *Cargo:* ${formData.role || 'No especificado'}\n` +
      `• *Teléfono:* ${formData.phone}\n` +
      `• *Correo:* ${formData.email}\n` +
      `• *Ciudad:* ${formData.city}\n` +
      `• *Comentarios:* ${formData.comments || 'Ninguno'}\n` +
      `--------------------------------\n` +
      `• *Resultado Cotizador:* ${formatCOP(estimatedMonthlyTotal)} COP / mes\n` +
      `• *Equipos:* ${workstationsCount} | *Servidores:* ${serverOpt.label}\n` +
      `• *Modalidad:* ${supportMode.label} | *Horario:* ${scheduleOpt.label}\n` +
      `• *Adicionales:* ${getAddonsNames() || 'Estándar'}`
    );

    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`, '_blank');
    setIsSubmitted(true);
  };

  return (
    <section id="cotizador" className="py-24 bg-[#F7F9FC] border-b border-[#D8E1EA]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#EAF5FC] border border-[#D8E1EA] text-[#0B1F3A] text-xs font-semibold">
            <Calculator className="w-3.5 h-3.5 text-[#0077C8]" />
            <span>Herramienta Interactiva en Tiempo Real</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1F3A] tracking-tight">
            Calcule su plan de Outsourcing TI
          </h2>
          <p className="text-[#243447] text-sm sm:text-base">
            Configure las necesidades de su empresa y obtenga una estimación en tiempo real.
          </p>
        </div>

        {/* Wizard Form & Sticky Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 6 Steps Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#D8E1EA] shadow-sm space-y-8">
            
            {/* PASO 1: Usuarios */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0B1F3A] flex items-center">
                  <span className="w-5 h-5 rounded-full bg-[#0077C8] text-white text-[10px] flex items-center justify-center font-mono mr-2">1</span>
                  ¿Cuántos usuarios tiene su empresa?
                </label>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {pricingConfig.userRanges.map((ur) => (
                  <button
                    key={ur.id}
                    type="button"
                    onClick={() => {
                      setSelectedUserRangeId(ur.id);
                      setWorkstationsCount(Math.min(Math.max(workstationsCount, ur.minUsers), ur.maxUsers));
                    }}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border text-center transition-all ${
                      selectedUserRangeId === ur.id
                        ? 'bg-[#EAF5FC] border-[#0077C8] text-[#0077C8] font-bold shadow-sm ring-1 ring-[#0077C8]/20'
                        : 'bg-[#F7F9FC] border-[#D8E1EA] text-[#243447] hover:bg-white hover:border-[#0077C8]/40'
                    }`}
                  >
                    {ur.label}
                  </button>
                ))}
              </div>
            </div>

            {/* PASO 2: Equipos */}
            <div className="space-y-3 pt-4 border-t border-[#F7F9FC]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0B1F3A] flex items-center">
                  <span className="w-5 h-5 rounded-full bg-[#0077C8] text-white text-[10px] flex items-center justify-center font-mono mr-2">2</span>
                  ¿Cuántos equipos necesita administrar?
                </label>
                <span className="text-sm font-bold text-[#0077C8] font-mono">
                  {workstationsCount} computadores
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="150"
                value={workstationsCount}
                onChange={(e) => setWorkstationsCount(Number(e.target.value))}
                className="w-full h-2 bg-[#D8E1EA] rounded-lg appearance-none cursor-pointer accent-[#0077C8]"
              />
              <div className="flex justify-between text-[10px] text-[#64748B] font-mono">
                <span>1 equipo</span>
                <span>50 equipos</span>
                <span>100 equipos</span>
                <span>150+</span>
              </div>
            </div>

            {/* PASO 3: Servidores */}
            <div className="space-y-3 pt-4 border-t border-[#F7F9FC]">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0B1F3A] flex items-center">
                <span className="w-5 h-5 rounded-full bg-[#0077C8] text-white text-[10px] flex items-center justify-center font-mono mr-2">3</span>
                ¿Tiene servidores?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {pricingConfig.servers.map((srv) => (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => setSelectedServerId(srv.id)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border text-center transition-all ${
                      selectedServerId === srv.id
                        ? 'bg-[#EAF5FC] border-[#0077C8] text-[#0077C8] font-bold shadow-sm ring-1 ring-[#0077C8]/20'
                        : 'bg-[#F7F9FC] border-[#D8E1EA] text-[#243447] hover:bg-white hover:border-[#0077C8]/40'
                    }`}
                  >
                    {srv.label}
                  </button>
                ))}
              </div>
            </div>

            {/* PASO 4: Modalidad de Soporte */}
            <div className="space-y-3 pt-4 border-t border-[#F7F9FC]">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0B1F3A] flex items-center">
                <span className="w-5 h-5 rounded-full bg-[#0077C8] text-white text-[10px] flex items-center justify-center font-mono mr-2">4</span>
                ¿Qué modalidad de soporte necesita?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {pricingConfig.supportModes.map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setSelectedSupportModeId(mode.id)}
                    className={`p-3.5 rounded-2xl text-left border transition-all ${
                      selectedSupportModeId === mode.id
                        ? 'bg-[#EAF5FC] border-[#0077C8] text-[#0B1F3A] ring-2 ring-[#0077C8]/20'
                        : 'bg-[#F7F9FC] border-[#D8E1EA] text-[#243447] hover:bg-white hover:border-[#0077C8]/40'
                    }`}
                  >
                    <div className="font-bold text-xs sm:text-sm text-[#0B1F3A]">{mode.label}</div>
                    <div className="text-[10px] text-[#64748B] mt-0.5">{mode.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* PASO 5: Horario */}
            <div className="space-y-3 pt-4 border-t border-[#F7F9FC]">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0B1F3A] flex items-center">
                <span className="w-5 h-5 rounded-full bg-[#0077C8] text-white text-[10px] flex items-center justify-center font-mono mr-2">5</span>
                Horario de cobertura:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {pricingConfig.schedules.map((sc) => (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => setSelectedScheduleId(sc.id)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      selectedScheduleId === sc.id
                        ? 'bg-[#EAF5FC] border-[#0077C8] text-[#0B1F3A] font-bold'
                        : 'bg-[#F7F9FC] border-[#D8E1EA] text-[#243447] hover:bg-white hover:border-[#0077C8]/40'
                    }`}
                  >
                    <div className="text-xs font-bold">{sc.label}</div>
                    <div className="text-[10px] text-[#64748B]">{sc.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* PASO 6: Servicios Adicionales */}
            <div className="space-y-3 pt-4 border-t border-[#F7F9FC]">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0B1F3A] flex items-center">
                <span className="w-5 h-5 rounded-full bg-[#0077C8] text-white text-[10px] flex items-center justify-center font-mono mr-2">6</span>
                Servicios adicionales:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {pricingConfig.additionalServices.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start space-x-2.5 ${
                        isChecked 
                          ? 'bg-[#EAF5FC] border-[#0077C8]/60 text-[#0B1F3A]' 
                          : 'bg-[#F7F9FC] border-[#D8E1EA] text-[#64748B] hover:bg-white hover:border-[#0077C8]/40'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        readOnly
                        className="mt-0.5 w-4 h-4 rounded text-[#0077C8] focus:ring-[#0077C8] border-[#D8E1EA] pointer-events-none"
                      />
                      <div>
                        <div className="text-xs font-bold text-[#0B1F3A]">{addon.label}</div>
                        <div className="text-[10px] text-[#64748B]">{addon.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Lateral Summary (Sticky on Desktop, Accordion on Mobile) */}
          <div className="lg:col-span-5 sticky top-28 space-y-4">
            <div className="bg-[#0B1F3A] text-white rounded-3xl p-7 border border-white/10 shadow-xl space-y-5">
              
              <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0077C8] flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B86F4B] mr-1.5"></span>
                    Resumen en Tiempo Real
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Plan de Outsourcing TI
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
                  className="lg:hidden p-1.5 rounded-lg bg-white/10 text-slate-300"
                >
                  {mobileSummaryOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Breakdown Details */}
              <div className={`space-y-2 text-xs text-slate-300 ${mobileSummaryOpen ? 'block' : 'hidden lg:block'}`}>
                <div className="flex justify-between">
                  <span>Usuarios / Puestos:</span>
                  <strong className="text-white font-mono">{workstationsCount} equipos</strong>
                </div>
                <div className="flex justify-between">
                  <span>Rango:</span>
                  <strong className="text-white">{userRange.label}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Servidores:</span>
                  <strong className="text-white">{serverOpt.label}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Modalidad:</span>
                  <strong className="text-[#0077C8]">{supportMode.label}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Horario:</span>
                  <strong className="text-white">{scheduleOpt.label}</strong>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <span className="text-[11px] text-slate-400 block mb-1">Adicionales incluidos:</span>
                  <p className="text-[11px] text-[#EAF5FC] leading-relaxed font-medium">
                    {getAddonsNames() || 'Ninguno'}
                  </p>
                </div>
              </div>

              {/* Price Tag Output */}
              <div className="p-4 rounded-2xl bg-black/30 border border-white/10 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  SU PLAN ESTIMADO:
                </span>
                <div className="text-2xl sm:text-3xl font-black text-[#EAF5FC] font-mono">
                  {formatCOP(estimatedMonthlyTotal)}
                  <span className="text-xs font-normal text-slate-400 ml-1">COP / mes</span>
                </div>
                <div className="flex items-center text-[10px] text-slate-400 pt-1">
                  <Info className="w-3 h-3 mr-1 text-[#0077C8] shrink-0" />
                  <span>*Estimado orientativo en pesos colombianos antes de IVA.</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-1">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-3.5 px-5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#0077C8] hover:bg-[#0062a6] shadow-lg shadow-[#0077C8]/25 transition-all flex items-center justify-center space-x-2"
                >
                  <span>SOLICITAR ESTA PROPUESTA</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Lead Capture Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1F3A]/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-7 sm:p-8 shadow-2xl border border-[#D8E1EA]">
            
            {isSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#EAF5FC] text-[#0077C8] flex items-center justify-center mx-auto border border-[#D8E1EA]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1F3A]">¡Propuesta Solicitada!</h3>
                <p className="text-[#243447] text-xs sm:text-sm">
                  Hemos transferido los detalles calculados al canal oficial de INTEPE S.A.S. Un ingeniero se comunicará a la brevedad.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setIsModalOpen(false);
                  }}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0B1F3A] text-white"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#F7F9FC] pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-[#0B1F3A]">
                      Solicitud Formal de Propuesta TI
                    </h3>
                    <p className="text-xs text-[#64748B]">
                      Estimado: <strong className="text-[#0077C8]">{formatCOP(estimatedMonthlyTotal)} COP / mes</strong>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="p-1 rounded-lg text-[#64748B] hover:text-[#0B1F3A]"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#243447] block mb-1">Nombre Completo *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Andrés Ramírez"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#F7F9FC] border border-[#D8E1EA] text-xs text-[#243447] focus:outline-none focus:border-[#0077C8] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#243447] block mb-1">Empresa / Razón Social *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Logística SAS"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#F7F9FC] border border-[#D8E1EA] text-xs text-[#243447] focus:outline-none focus:border-[#0077C8] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#243447] block mb-1">Cargo en la empresa</label>
                    <input
                      type="text"
                      placeholder="Ej. Gerente General / TI"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#F7F9FC] border border-[#D8E1EA] text-xs text-[#243447] focus:outline-none focus:border-[#0077C8] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#243447] block mb-1">Ciudad *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Bogotá"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#F7F9FC] border border-[#D8E1EA] text-xs text-[#243447] focus:outline-none focus:border-[#0077C8] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#243447] block mb-1">Teléfono / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="313 386 2656"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#F7F9FC] border border-[#D8E1EA] text-xs text-[#243447] focus:outline-none focus:border-[#0077C8] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#243447] block mb-1">Correo Corporativo *</label>
                    <input
                      type="email"
                      required
                      placeholder="andres@empresa.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#F7F9FC] border border-[#D8E1EA] text-xs text-[#243447] focus:outline-none focus:border-[#0077C8] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#243447] block mb-1">Comentarios o requerimientos adicionales</label>
                  <textarea
                    rows={2}
                    placeholder="Detalles sobre sedes, sucursales, o necesidades puntuales..."
                    value={formData.comments}
                    onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#F7F9FC] border border-[#D8E1EA] text-xs text-[#243447] focus:outline-none focus:border-[#0077C8] focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#0077C8] hover:bg-[#0062a6] transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar Propuesta a INTEPE S.A.S.</span>
                </button>

                <p className="text-[10px] text-[#64748B] text-center">
                  Información protegida bajo la Ley 1581 de 2012 de Colombia.
                </p>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
