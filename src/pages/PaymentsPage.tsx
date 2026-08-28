import React, { useState } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { 
  CreditCard, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  Copy, 
  Check, 
  Building2, 
  Globe, 
  FileText, 
  MessageSquare,
  Lock,
  ArrowRight,
  ChevronDown,
  Zap,
  ShieldAlert
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export const PaymentsPage: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const paymentMethods = [
    {
      id: 'wompi',
      title: 'Wompi Bancolombia (PSE & Tarjetas)',
      badge: 'RECAUDO NACIONAL // COLOMBIA',
      badgeColor: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10',
      desc: 'Pasarela oficial de pagos para Colombia. Permite pagar con débito bancario PSE, tarjetas de crédito, Botón Bancolombia y Nequi con confirmación inmediata.',
      methods: ['PSE (Todos los bancos)', 'Tarjetas Visa / Mastercard / Amex', 'Botón Bancolombia', 'Nequi', 'Puntos Corresponsales'],
      actionLabel: 'PAGAR CON WOMPI / PSE',
      link: siteConfig.paymentLinks.wompi,
      icon: CreditCard,
      highlight: true
    },
    {
      id: 'paypal',
      title: 'PayPal (Pagos Internacionales)',
      badge: 'INTERNACIONAL // USD',
      badgeColor: 'border-blue-500/40 text-blue-400 bg-blue-500/10',
      desc: 'Canal seguro para clientes en el exterior o compañías que deseen pagar servicios de software, consultoría o licencias en dólares (USD).',
      methods: ['Saldo PayPal', 'Tarjetas de Crédito Internacionales', 'Conversión automática de divisas', 'Protección al comprador'],
      actionLabel: 'PAGAR CON PAYPAL (USD)',
      link: siteConfig.paymentLinks.paypal,
      icon: Globe,
      highlight: false
    }
  ];

  const faqs = [
    {
      q: '¿Cómo obtengo mi factura electrónica después de pagar?',
      a: 'Una vez procesado el pago, nuestro departamento contable emite y envía la Factura Electrónica validada por la DIAN al correo registrado de su empresa en un plazo máximo de 24 horas hábiles.'
    },
    {
      q: '¿Cómo notifico que ya realicé el pago de mi mensualidad?',
      a: 'Puede enviar el comprobante directamente a nuestro WhatsApp de Tesorería (+57 313 386 2656) o al correo soporte@intepe.net indicando el nombre de su empresa y el número de cotización o factura.'
    },
    {
      q: '¿Los pagos a través de Wompi y PayPal son seguros?',
      a: 'Totalmente. Tanto Wompi (plataforma de Bancolombia vigilada por la Superintendencia Financiera) como PayPal cuentan con certificación PCI-DSS Nivel 1 y cifrado bancario TLS de 256 bits. INTEPE S.A.S. no almacena datos de sus tarjetas.'
    },
    {
      q: '¿Manejan retenciones en la fuente o ICA?',
      a: 'Sí. Si su compañía es agente retenedor, puede descontar las retenciones legales aplicables y enviarnos el certificado de retención correspondiente junto con el soporte del pago.'
    }
  ];

  return (
    <div className="bg-[#0F172A] text-slate-100 min-h-screen">
      {/* Header */}
      <PageHeader
        badge="Pasarela Segura // PSE, Tarjetas y Bancos"
        title="Portal de Pagos en Línea"
        subtitle="Realice el pago de sus facturas de outsourcing, pólizas de soporte, licenciamiento o desarrollo de forma rápida y 100% segura."
        breadcrumbCurrent="Pagos en Línea"
      />

      {/* Intro Security Notice */}
      <section className="py-12 bg-[#0F172A] border-b border-white/10 cyber-grid relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="cyber-card p-4 sm:p-5 rounded-lg hud-box border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="hud-corner-tl"></div>
            <div className="hud-corner-br"></div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  TRANSACCIONES CIFRADAS CON SEGURIDAD BANCARIA TLS 256-BIT
                </span>
                <p className="text-xs text-slate-400 font-sans">
                  Recaudos procesados mediante canales vigilados por la Superfinanciera de Colombia.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-slate-300">NIT: {siteConfig.nit}</span>
              <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-emerald-400 font-semibold">100% ACTIVO</span>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Gateways Grid */}
      <section className="py-16 bg-[#0F172A] border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="tech-badge">
              <span>MÉTODOS DE PAGO DISPONIBLES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-['Space_Grotesk']">
              Seleccione su canal de pago preferido
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Haga clic en el botón correspondiente para ser redirigido a la pasarela de pago segura.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {paymentMethods.map((pm) => {
              const Icon = pm.icon;
              return (
                <div
                  key={pm.id}
                  className={`cyber-card p-8 rounded-lg hud-box flex flex-col justify-between space-y-6 ${
                    pm.highlight 
                      ? 'border-cyan-500/50 shadow-[0_0_35px_rgba(0,229,255,0.12)] bg-white/[0.03]' 
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="hud-corner-tl"></div>
                  <div className="hud-corner-tr"></div>
                  <div className="hud-corner-bl"></div>
                  <div className="hud-corner-br"></div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded border uppercase tracking-wider ${pm.badgeColor}`}>
                        {pm.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-white font-['Space_Grotesk']">
                        {pm.title}
                      </h3>
                      <p className="text-xs text-slate-300 font-sans mt-2 leading-relaxed">
                        {pm.desc}
                      </p>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-white/10">
                      <span className="text-[11px] font-mono font-bold text-slate-400 uppercase block">
                        Medios aceptados:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {pm.methods.map((m, mIdx) => (
                          <div key={mIdx} className="flex items-center space-x-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span>{m}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 space-y-2">
                    <a
                      href={pm.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-3 px-5 rounded font-bold font-['Space_Grotesk'] text-xs flex items-center justify-center gap-2 transition-all ${
                        pm.highlight
                          ? 'btn-cyber-primary'
                          : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                      }`}
                    >
                      <span>{pm.actionLabel}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <span className="text-[10px] text-slate-500 font-mono text-center block">
                      Redirección cifrada directa a la pasarela
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Bre-B Instant Transfer & Receipt Submission */}
      <section className="py-16 bg-[#0F172A] border-b border-white/10 cyber-grid relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-2">
            <div className="tech-badge">
              <Zap className="w-3.5 h-3.5 text-[#FF7120]" />
              <span>TRANSFERENCIA INMEDIATA // SISTEMA BRE-B</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-['Space_Grotesk']">
              Transferencias Inmediatas por Bre-B
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto">
              Envíe su pago en tiempo real desde cualquier banco o billetera digital en Colombia utilizando nuestra llave oficial Bre-B.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Bre-B Key & Legal Entity Box */}
            <div className="md:col-span-7 cyber-card p-6 sm:p-8 rounded-lg hud-box border border-white/10 space-y-5 flex flex-col justify-between">
              <div className="hud-corner-tl"></div>
              <div className="hud-corner-br"></div>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono text-xs font-bold text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#FF7120]" />
                    LLAVE OFICIAL BRE-B
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-[#FF7120]/40 text-[#FF7120] bg-[#FF7120]/10 uppercase">
                    INTEROPERABILIDAD TOTAL
                  </span>
                </div>

                <div className="space-y-3 font-sans text-xs">
                  {/* Bre-B Key Highlight Box */}
                  <div className="p-4 rounded-lg bg-[#FF7120]/[0.06] border border-[#FF7120]/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-slate-300 uppercase flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-[#FF7120]" />
                        Llave Bre-B (Transferencias Inmediatas):
                      </span>
                      <button
                        onClick={() => copyToClipboard(siteConfig.bankDetails.breB, 'breb')}
                        className="px-2.5 py-1 rounded bg-[#FF7120]/20 hover:bg-[#FF7120]/30 text-white font-mono text-[11px] font-bold flex items-center gap-1.5 transition-all border border-[#FF7120]/40"
                        title="Copiar Llave Bre-B"
                      >
                        {copiedField === 'breb' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">¡COPIADO!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[#FF7120]" />
                            <span>COPIAR LLAVE</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="text-2xl sm:text-3xl font-mono font-black text-white tracking-wider">
                      {siteConfig.bankDetails.breB}
                    </div>

                    {/* Etiqueta Informativa de Apoyo */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <div className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[11px] font-mono flex items-center gap-1.5">
                        <span className="text-slate-400">Banco de destino:</span>
                        <strong className="text-white font-semibold">Bancolombia (Ahorros)</strong>
                      </div>
                    </div>

                    <span className="text-[10px] text-slate-400 block font-mono">
                      Válida desde Bancolombia, Nequi, Daviplata, BBVA, Banco de Bogotá, Davivienda y cualquier entidad con Bre-B.
                    </span>
                  </div>

                  {/* Legal Entity */}
                  <div className="flex items-center justify-between p-3 rounded bg-white/[0.02] border border-white/5">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Razón Social / Titular:</span>
                      <strong className="text-white">{siteConfig.legalName}</strong>
                    </div>
                    <button
                      onClick={() => copyToClipboard(siteConfig.legalName, 'name')}
                      className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                      title="Copiar Razón Social"
                    >
                      {copiedField === 'name' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* NIT */}
                  <div className="flex items-center justify-between p-3 rounded bg-white/[0.02] border border-white/5">
                    <div>
                      <span className="text-slate-400 block text-[11px]">NIT (Sin dígito de verificación):</span>
                      <strong className="text-white font-mono">{siteConfig.nit}</strong>
                    </div>
                    <button
                      onClick={() => copyToClipboard(siteConfig.nit, 'nit')}
                      className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                      title="Copiar NIT"
                    >
                      {copiedField === 'nit' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded bg-white/[0.02] border border-white/10 text-[11px] text-slate-400 flex items-start gap-2">
                <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  Para inscripción de INTEPE en su ERP (SAP, Oracle, Siigo) o transferencias bancarias tradicionales que requieran certificación bancaria y RUT, solicítelos al departamento de Tesorería.
                </span>
              </div>
            </div>

            {/* Radicate Receipt Card */}
            <div className="md:col-span-5 cyber-card p-6 sm:p-8 rounded-lg hud-box border border-emerald-500/30 bg-emerald-500/[0.02] space-y-5 flex flex-col justify-between">
              <div className="hud-corner-tl"></div>
              <div className="hud-corner-br"></div>

              <div className="space-y-4">
                <div className="w-10 h-10 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <MessageSquare className="w-5 h-5" />
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white font-['Space_Grotesk']">
                    ¿Ya realizó su transferencia por Bre-B?
                  </h4>
                  <p className="text-xs text-slate-300 font-sans mt-1 leading-relaxed">
                    Radique su comprobante de pago por WhatsApp para agilizar la aplicación contable a su cuenta y la emisión de su factura electrónica.
                  </p>
                </div>

                <div className="space-y-2 text-xs text-slate-400 font-sans border-t border-white/10 pt-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Confirmación en menos de 1 hora hábil</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Emisión de Factura Electrónica DIAN</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Soporte directo de Tesorería</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-white/10">
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hola INTEPE, adjunto comprobante de pago por Bre-B para la factura/cotización de mi empresa.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-['Space_Grotesk'] text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(16,185,129,0.25)]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>REPORTAR PAGO POR WHATSAPP</span>
                </a>
                <span className="text-[10px] text-slate-500 font-mono text-center block">
                  Línea directa: {siteConfig.phone}
                </span>
                <a
                  href={`mailto:${siteConfig.email}?subject=${encodeURIComponent('Comprobante de Pago - INTEPE S.A.S.')}`}
                  className="w-full py-2 px-3 rounded bg-white/5 hover:bg-white/10 text-slate-300 font-mono text-[11px] flex items-center justify-center gap-1.5 transition-colors border border-white/10"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Enviar por Correo Electrónico</span>
                </a>
              </div>
            </div>

          </div>

          {/* Security Notice: Anti-Fraud Disclaimer */}
          <div className="cyber-card p-5 sm:p-6 rounded-lg hud-box border border-amber-500/40 bg-amber-500/[0.04] space-y-3">
            <div className="hud-corner-tl"></div>
            <div className="hud-corner-br"></div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    AVISO DE SEGURIDAD IMPORTANTE // PREVENCIÓN DE FRAUDE & PHISHING
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold">
                    CANAL OFICIAL INTEPE
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  <strong>INFORMATICA Y TECNOLOGIA PENAGOS S.A.S. jamás le solicitará contraseñas, claves dinámicas, códigos de confirmación vía SMS ni le enviará enlaces externos para validar, autorizar o procesar un pago por Bre-B.</strong>
                </p>
                <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed font-sans">
                  Toda validación de pago se efectúa de manera 100% interna y segura una vez usted remite su comprobante oficial emitido por su propia entidad bancaria a nuestros canales autorizados (<strong className="text-slate-300">soporte@intepe.net</strong> o WhatsApp <strong className="text-slate-300">+57 313 386 2656</strong>). Ante cualquier llamada, mensaje o enlace sospechoso, absténgase de compartir información y repórtelo de inmediato a nuestra línea de atención.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-[#0F172A] border-b border-white/10 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <div className="tech-badge">
              <span>PREGUNTAS FRECUENTES</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-['Space_Grotesk']">
              Dudas sobre Pagos y Facturación
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="cyber-card rounded-lg border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-bold text-white hover:text-cyan-400 transition-colors"
                >
                  <span className="font-['Space_Grotesk'] pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-cyan-400 shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-slate-400 leading-relaxed font-sans border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Banner */}
      <section className="py-16 bg-[#0F172A] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h4 className="text-xl font-bold text-white font-['Space_Grotesk']">
            ¿Necesita una cotización previa o formalizar un contrato de Outsourcing?
          </h4>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Simule el costo de su servicio con nuestro cotizador interactivo o hable con un consultor.
          </p>
          <div className="pt-2">
            <a
              href="/cotizador-outsourcing"
              className="btn-cyber-primary text-xs py-2.5 px-5 inline-flex items-center gap-2"
            >
              <span>IR AL COTIZADOR EN LÍNEA</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
