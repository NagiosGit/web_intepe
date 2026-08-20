import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Headset, 
  Server, 
  Code2, 
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#FDFBF7] border-b border-[#E8E2D5] overflow-hidden">
      
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#F5F0E6] rounded-full blur-3xl opacity-80 pointer-events-none -mr-40"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FAF6EE] rounded-full blur-3xl opacity-70 pointer-events-none -ml-32"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Value Proposition (7 cols) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#F5F0E6] border border-[#E8E2D5] text-stone-800 text-xs font-semibold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#B86B42] animate-pulse"></span>
              <span>{siteConfig.tagline}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-950 tracking-tight leading-[1.12]">
                Tecnología confiable para impulsar su empresa
              </h1>
              <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl font-normal pt-2">
                {siteConfig.heroSubtitle}
              </p>
            </div>

            {/* Quick Benefits Bullet Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-center space-x-2 text-xs font-semibold text-stone-800">
                <CheckCircle2 className="w-4 h-4 text-[#B86B42] shrink-0" />
                <span>Outsourcing TI y Help Desk especializado</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-stone-800">
                <CheckCircle2 className="w-4 h-4 text-[#B86B42] shrink-0" />
                <span>Servidores, redes y respaldo continuo</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-stone-800">
                <CheckCircle2 className="w-4 h-4 text-[#B86B42] shrink-0" />
                <span>Desarrollo de software y ERP a la medida</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-stone-800">
                <CheckCircle2 className="w-4 h-4 text-[#B86B42] shrink-0" />
                <span>Google Workspace y licenciamiento oficial</span>
              </div>
            </div>

            {/* 2 Clear Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                to="/cotizador-outsourcing"
                className="px-7 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-center text-[#FDFBF7] bg-[#1F2923] hover:bg-[#141C17] shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2.5 group"
              >
                <span>Cotizar Outsourcing TI</span>
                <ArrowRight className="w-4 h-4 text-[#B86B42] group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/desarrollo-software"
                className="px-7 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-center text-stone-800 bg-white hover:bg-[#F5F0E6] border border-[#E8E2D5] shadow-2xs hover:shadow-sm transition-all flex items-center justify-center space-x-2"
              >
                <span>Desarrollo de Software</span>
                <Code2 className="w-4 h-4 text-stone-600" />
              </Link>
            </div>

            {/* WhatsApp Quick Note */}
            <div className="pt-2 flex items-center space-x-2 text-xs text-stone-500 font-medium">
              <MessageSquare className="w-4 h-4 text-[#B86B42]" />
              <span>Atención corporativa directa:</span>
              <a 
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Hola INTEPE S.A.S., deseo consultar sobre sus servicios de TI.')}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-stone-900 font-bold hover:underline"
              >
                {siteConfig.mobile}
              </a>
            </div>

          </div>

          {/* Right Column: Clean Technical Authority Bento Floating Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#FAF6EE] rounded-3xl p-6 sm:p-8 border border-[#E8E2D5] shadow-md space-y-6 relative">
              
              {/* Header Card */}
              <div className="flex items-center justify-between border-b border-[#E8E2D5] pb-4">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-white border border-[#E8E2D5] flex items-center justify-center text-stone-800 shadow-2xs">
                    <ShieldCheck className="w-5 h-5 text-[#B86B42]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm">Respaldo Tecnológico B2B</h3>
                    <span className="text-[10px] text-stone-500 font-mono">INTEPE S.A.S. · Bogotá</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-stone-800 border border-[#E8E2D5]">
                  Activo 2026
                </span>
              </div>

              {/* 4 Quadrants of Authority */}
              <div className="grid grid-cols-2 gap-3.5">
                
                {/* 1. Help Desk */}
                <div className="p-4 rounded-2xl bg-white border border-[#E8E2D5] shadow-2xs space-y-2 hover:border-[#B86B42]/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <Headset className="w-4 h-4 text-stone-700" />
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  </div>
                  <div className="font-bold text-xs text-stone-900">Mesa de Ayuda</div>
                  <div className="text-[10px] text-stone-500">Atención remota y presencial L1/L2</div>
                </div>

                {/* 2. Infraestructura */}
                <div className="p-4 rounded-2xl bg-white border border-[#E8E2D5] shadow-2xs space-y-2 hover:border-[#B86B42]/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <Server className="w-4 h-4 text-stone-700" />
                    <span className="text-[9px] font-bold text-stone-600 bg-[#F5F0E6] px-1.5 py-0.5 rounded">99.8% SLA</span>
                  </div>
                  <div className="font-bold text-xs text-stone-900">Infraestructura</div>
                  <div className="text-[10px] text-stone-500">Servidores, redes y copias de seguridad</div>
                </div>

                {/* 3. Software a Medida */}
                <div className="p-4 rounded-2xl bg-white border border-[#E8E2D5] shadow-2xs space-y-2 hover:border-[#B86B42]/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <Code2 className="w-4 h-4 text-[#B86B42]" />
                    <Sparkles className="w-3.5 h-3.5 text-[#B86B42]" />
                  </div>
                  <div className="font-bold text-xs text-stone-900">Software a Medida</div>
                  <div className="text-[10px] text-stone-500">Sistemas ERP y plataformas web</div>
                </div>

                {/* 4. Casos Reales */}
                <div className="p-4 rounded-2xl bg-white border border-[#E8E2D5] shadow-2xs space-y-2 hover:border-[#B86B42]/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-800">GranjaWP</span>
                    <span className="text-[9px] font-bold text-stone-500 bg-[#F5F0E6] px-1.5 py-0.5 rounded">Producción</span>
                  </div>
                  <div className="font-bold text-xs text-stone-900">InvernaderoFM</div>
                  <div className="text-[10px] text-stone-500">Casos demostrados en vivo</div>
                </div>

              </div>

              {/* Bottom Quick Indicator */}
              <div className="p-3.5 rounded-xl bg-white border border-[#E8E2D5] flex items-center justify-between text-xs text-stone-700">
                <span className="font-medium">¿Desea una cotización inmediata?</span>
                <Link to="/cotizador-outsourcing" className="font-bold text-[#B86B42] hover:underline flex items-center">
                  <span>Abrir cotizador</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
