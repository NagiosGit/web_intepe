import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Building2
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
    <section id="contacto" className={`bg-white border-b border-[#D8E1EA] ${showHeader ? 'py-24' : 'py-16'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (only when showHeader is true) */}
        {showHeader && (
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0077C8] bg-[#EAF5FC] px-3.5 py-1 rounded-full border border-[#D8E1EA]">
              Atención Empresarial
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
              Hablemos de tecnología
            </h2>
            <p className="text-[#243447] text-sm sm:text-base">
              Cuéntenos qué necesita su empresa y encontraremos una solución adaptada a su operación.
            </p>
          </div>
        )}

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Info Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F7F9FC] rounded-3xl p-8 border border-[#D8E1EA] space-y-6 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#D8E1EA] flex items-center justify-center text-[#0077C8] shadow-2xs">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0B1F3A] text-base">
                    {siteConfig.legalName}
                  </h3>
                  <span className="text-xs text-[#64748B] font-medium">{siteConfig.city}</span>
                </div>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm text-[#243447]">
                <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-white border border-[#D8E1EA]">
                  <MapPin className="w-4 h-4 text-[#0077C8] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0B1F3A] block text-xs">Ubicación:</strong>
                    <span>{siteConfig.address}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-white border border-[#D8E1EA]">
                  <Mail className="w-4 h-4 text-[#0077C8] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0B1F3A] block text-xs">Correo Electrónico:</strong>
                    <a href={`mailto:${siteConfig.email}`} className="text-[#0077C8] hover:underline">
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-white border border-[#D8E1EA]">
                  <Phone className="w-4 h-4 text-[#B86F4B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0B1F3A] block text-xs">Líneas de Atención:</strong>
                    <span>Celular: {siteConfig.mobile}</span><br />
                    <span>Fijo Bogotá: {siteConfig.phone}</span>
                  </div>
                </div>
              </div>

              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hola INTEPE S.A.S., estoy interesado en conocer sus soluciones tecnológicas.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-center text-[#0B1F3A] bg-white hover:bg-[#EAF5FC] border border-[#D8E1EA] flex items-center justify-center space-x-2 transition-all shadow-2xs"
              >
                <MessageSquare className="w-4 h-4 text-[#0077C8]" />
                <span>Escribir por WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#D8E1EA] shadow-sm">
            {isSubmitted ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#EAF5FC] text-[#0077C8] flex items-center justify-center mx-auto border border-[#D8E1EA]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1F3A]">¡Solicitud Enviada!</h3>
                <p className="text-[#243447] text-xs sm:text-sm max-w-md mx-auto">
                  Gracias por escribirnos. Nuestro equipo se pondrá en contacto en breve para atender su requerimiento.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0B1F3A] text-white"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#243447] block mb-1">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Juan Pérez"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F9FC] border border-[#D8E1EA] text-xs text-[#243447] focus:outline-none focus:border-[#0077C8] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#243447] block mb-1">
                      Empresa
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Comercializadora SAS"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F9FC] border border-[#D8E1EA] text-xs text-[#243447] focus:outline-none focus:border-[#0077C8] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#243447] block mb-1">
                      Cargo en la empresa
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Gerente / Director TI"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F9FC] border border-[#D8E1EA] text-xs text-[#243447] focus:outline-none focus:border-[#0077C8] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#243447] block mb-1">
                      Servicio de interés *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F9FC] border border-[#D8E1EA] text-xs text-[#243447] focus:outline-none focus:border-[#0077C8] focus:bg-white"
                    >
                      <option value="Outsourcing TI">Outsourcing TI</option>
                      <option value="Help Desk">Help Desk</option>
                      <option value="Infraestructura">Infraestructura</option>
                      <option value="Desarrollo de software">Desarrollo de software</option>
                      <option value="ERP">ERP</option>
                      <option value="Google Workspace">Google Workspace</option>
                      <option value="Mantenimiento">Mantenimiento</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#243447] block mb-1">
                      Correo corporativo *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="juan@empresa.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F9FC] border border-[#D8E1EA] text-xs text-[#243447] focus:outline-none focus:border-[#0077C8] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#243447] block mb-1">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="313 386 2656"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F9FC] border border-[#D8E1EA] text-xs text-[#243447] focus:outline-none focus:border-[#0077C8] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#243447] block mb-1">
                    Mensaje o descripción del requerimiento
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describa brevemente lo que necesita su empresa..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F9FC] border border-[#D8E1EA] text-xs text-[#243447] focus:outline-none focus:border-[#0077C8] focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#0077C8] hover:bg-[#0062a6] shadow-md shadow-[#0077C8]/20 flex items-center justify-center space-x-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>ENVIAR SOLICITUD →</span>
                </button>

                <p className="text-[10px] text-[#64748B] text-center">
                  Sus datos personales están protegidos conforme a la Ley 1581 de 2012 de Colombia.
                </p>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
