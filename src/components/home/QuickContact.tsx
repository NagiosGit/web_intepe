import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Terminal
} from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

interface QuickContactProps {
  showHeader?: boolean;
}

export const QuickContact: React.FC<QuickContactProps> = ({
  showHeader = true
}) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    role: '',
    email: '',
    phone: '',
    service: 'Outsourcing TI',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = encodeURIComponent(
      `*CONTACTO COMERCIAL — INTEPE S.A.S.*\n` +
      `--------------------------------\n` +
      `• *Nombre:* ${formData.name}\n` +
      `• *Empresa:* ${formData.company || 'No especificada'}\n` +
      `• *Cargo:* ${formData.role || 'No especificado'}\n` +
      `• *Correo:* ${formData.email}\n` +
      `• *Teléfono:* ${formData.phone}\n` +
      `• *Servicio:* ${formData.service}\n` +
      `• *Mensaje:* ${formData.message}`
    );

    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`, '_blank');
    setIsSubmitted(true);
  };

  return (
    <section id="contacto" className={`bg-[#080B0E] border-b border-white/10 relative overflow-hidden cyber-grid ${showHeader ? 'py-24' : 'py-16'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        {showHeader && (
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="tech-badge">
              <Terminal className="w-3.5 h-3.5 text-[#FF7120]" />
              <span>CANAL DIRECTO & CONSULTORÍA TI</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Space_Grotesk']">
              Inicie su Proyecto <span className="text-[#FF7120]">Tecnológico</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-sans">
              Escríbanos para evaluar su infraestructura actual o cotizar un servicio de Outsourcing o software adaptado a su empresa.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Corporate Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="cyber-card rounded-lg p-8 hud-box space-y-6">
              <div className="hud-corner-tl"></div>
              <div className="hud-corner-br"></div>

              <div>
                <span className="text-xs font-mono font-bold text-[#FF7120] uppercase tracking-wider block mb-1">
                  // CONTACTO OFICIAL
                </span>
                <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
                  Información Corporativa
                </h3>
                <p className="text-slate-400 text-xs mt-1">
                  Respuesta técnica y comercial en horario laboral.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href={`tel:${siteConfig.mobile.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3.5 p-3 rounded bg-white/[0.02] border border-white/5 hover:border-[#FF7120]/40 transition-colors"
                >
                  <div className="w-9 h-9 rounded bg-[#FF7120]/10 flex items-center justify-center text-[#FF7120] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">Línea Móvil & WhatsApp</div>
                    <div className="text-sm font-mono font-bold text-white">{siteConfig.mobile}</div>
                  </div>
                </a>

                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3.5 p-3 rounded bg-white/[0.02] border border-white/5 hover:border-[#FF7120]/40 transition-colors"
                >
                  <div className="w-9 h-9 rounded bg-[#FF7120]/10 flex items-center justify-center text-[#FF7120] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">Correo Electrónico</div>
                    <div className="text-xs font-mono font-bold text-white">{siteConfig.email}</div>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 p-3 rounded bg-white/[0.02] border border-white/5">
                  <div className="w-9 h-9 rounded bg-white/5 flex items-center justify-center text-slate-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">Sede Principal</div>
                    <div className="text-xs font-mono text-white">{siteConfig.address}</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded bg-[#FF7120]/5 border border-[#FF7120]/20 space-y-1">
                <div className="text-xs font-mono font-bold text-[#FF853A]">
                  // COMPROMISO DE ATENCIÓN
                </div>
                <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                  Asignamos un consultor técnico para evaluar sus requerimientos y estructurar una propuesta sin costo inicial.
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Interactive Cyber Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="cyber-card rounded-lg p-8 sm:p-10 hud-box">
              <div className="hud-corner-tl"></div>
              <div className="hud-corner-tr"></div>
              <div className="hud-corner-bl"></div>
              <div className="hud-corner-br"></div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300">
                      Nombre y Apellido *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Ing. Carlos Medina"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded bg-white/5 border border-white/10 text-white text-xs font-sans placeholder:text-slate-500 focus:outline-none focus:border-[#FF7120]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300">
                      Empresa *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nombre de su compañía"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded bg-white/5 border border-white/10 text-white text-xs font-sans placeholder:text-slate-500 focus:outline-none focus:border-[#FF7120]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="carlos@empresa.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded bg-white/5 border border-white/10 text-white text-xs font-sans placeholder:text-slate-500 focus:outline-none focus:border-[#FF7120]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="310 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded bg-white/5 border border-white/10 text-white text-xs font-sans placeholder:text-slate-500 focus:outline-none focus:border-[#FF7120]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-slate-300">
                    Servicio Requerido *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded bg-[#0D1219] border border-white/10 text-white text-xs font-sans focus:outline-none focus:border-[#FF7120]"
                  >
                    <option value="Outsourcing TI">Outsourcing TI Integral</option>
                    <option value="Mesa de Ayuda">Mesa de Ayuda (Help Desk)</option>
                    <option value="Infraestructura y Redes">Infraestructura & Servidores</option>
                    <option value="Mantenimiento Preventivo">Mantenimiento Preventivo</option>
                    <option value="Google Workspace">Google Workspace & Cloud</option>
                    <option value="Desarrollo de Software">Desarrollo de Software a Medida</option>
                    <option value="Software GranjaWP">Software Agrícola GranjaWP</option>
                    <option value="Software InvernaderoFM">Software Agronómico InvernaderoFM</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-slate-300">
                    Detalle del Requerimiento *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describa brevemente el número de usuarios, equipos o necesidad tecnológica..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded bg-white/5 border border-white/10 text-white text-xs font-sans placeholder:text-slate-500 focus:outline-none focus:border-[#FF7120]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-cyber-primary text-xs py-3.5"
                >
                  <Send className="w-4 h-4" />
                  <span>ENVIAR SOLICITUD POR WHATSAPP</span>
                </button>

                {isSubmitted && (
                  <div className="p-3 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono text-center">
                    ✓ Mensaje estructurado y enviado hacia WhatsApp corporativo.
                  </div>
                )}
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
