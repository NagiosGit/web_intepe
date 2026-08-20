import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Server, 
  Code2, 
  Shield, 
  Cloud, 
  CheckCircle2,
  Layers
} from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 bg-gradient-to-b from-[#F7F9FC]/80 via-white to-[#F7F9FC]/40 overflow-hidden border-b border-[#D8E1EA]/60">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#EAF5FC]/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#E8DCCB]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Heading, Value & 2 Buttons */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline Badge with Terracotta accent dot */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#EAF5FC] border border-[#D8E1EA] text-[#0B1F3A] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#B86F4B] animate-pulse"></span>
              <span>INTEPE S.A.S. · Su Aliado Tecnológico</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-[#0B1F3A] tracking-tight leading-[1.12]">
              {siteConfig.tagline}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#243447] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {siteConfig.heroSubtitle}
            </p>

            {/* 4 Value Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-[#243447] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#0077C8] shrink-0" />
                <span>Outsourcing TI y soporte especializado</span>
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-[#243447] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#0077C8] shrink-0" />
                <span>Desarrollo de software y ERP a medida</span>
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-[#243447] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#0077C8] shrink-0" />
                <span>Servidores, redes y virtualización</span>
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-[#243447] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#0077C8] shrink-0" />
                <span>Atención remota y presencial en Bogotá</span>
              </div>
            </div>

            {/* Strict Button Hierarchy */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                to="/cotizador-outsourcing"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#0077C8] hover:bg-[#0062a6] shadow-md shadow-[#0077C8]/20 hover:shadow-lg hover:shadow-[#0077C8]/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2"
              >
                <span>Cotizar Outsourcing TI</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/desarrollo-software"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-[#0B1F3A] bg-white hover:bg-[#EAF5FC] border border-[#0077C8] shadow-sm transition-all flex items-center justify-center space-x-2"
              >
                <Code2 className="w-4 h-4 text-[#0077C8]" />
                <span>Desarrollar mi software</span>
              </Link>
            </div>

          </div>

          {/* Right Column: Mini Dashboard Tecnológico */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#D8E1EA] shadow-xl shadow-[#0B1F3A]/5 space-y-5">
              
              {/* Dashboard Header */}
              <div className="flex items-center justify-between border-b border-[#EAF5FC] pb-3.5">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0077C8] animate-pulse"></div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0B1F3A]">
                    SOLUCIONES PARA SU EMPRESA
                  </span>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#F7F9FC] text-[#64748B] border border-[#D8E1EA]/60">
                  INTEPE S.A.S.
                </span>
              </div>

              {/* 4 Quadrants */}
              <div className="grid grid-cols-2 gap-3">
                
                {/* INFRA */}
                <div className="p-4 rounded-2xl bg-[#F7F9FC] border border-[#D8E1EA]/70 hover:border-[#0077C8] hover:bg-white transition-all space-y-1 group">
                  <div className="flex items-center justify-between text-[#0077C8]">
                    <Server className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">INFRA</span>
                  </div>
                  <div className="font-bold text-[#0B1F3A] text-xs sm:text-sm">Servidores & Redes</div>
                  <div className="text-[10px] sm:text-[11px] text-[#64748B]">Windows · Linux · Virtualización · Wi-Fi</div>
                </div>

                {/* DEV (with terracotta accent indicator) */}
                <div className="p-4 rounded-2xl bg-[#F7F9FC] border border-[#D8E1EA]/70 hover:border-[#B86F4B] hover:bg-white transition-all space-y-1 group">
                  <div className="flex items-center justify-between text-[#0077C8]">
                    <Code2 className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#B86F4B]">DEV</span>
                  </div>
                  <div className="font-bold text-[#0B1F3A] text-xs sm:text-sm">Software a Medida</div>
                  <div className="text-[10px] sm:text-[11px] text-[#64748B]">Web · ERP · Apps · Automatización</div>
                </div>

                {/* CLOUD */}
                <div className="p-4 rounded-2xl bg-[#F7F9FC] border border-[#D8E1EA]/70 hover:border-[#0077C8] hover:bg-white transition-all space-y-1 group">
                  <div className="flex items-center justify-between text-[#0077C8]">
                    <Cloud className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">CLOUD</span>
                  </div>
                  <div className="font-bold text-[#0B1F3A] text-xs sm:text-sm">Google Workspace</div>
                  <div className="text-[10px] sm:text-[11px] text-[#64748B]">Colaboración · Correo · Backups</div>
                </div>

                {/* SOPORTE */}
                <div className="p-4 rounded-2xl bg-[#F7F9FC] border border-[#D8E1EA]/70 hover:border-[#0077C8] hover:bg-white transition-all space-y-1 group">
                  <div className="flex items-center justify-between text-[#0077C8]">
                    <Shield className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">SOPORTE</span>
                  </div>
                  <div className="font-bold text-[#0B1F3A] text-xs sm:text-sm">Help Desk L1/L2</div>
                  <div className="text-[10px] sm:text-[11px] text-[#64748B]">Atención remota y presencial</div>
                </div>

              </div>

              {/* Bottom Proposition */}
              <div className="p-3.5 rounded-2xl bg-[#EAF5FC] border border-[#D8E1EA] flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="font-bold text-[#0B1F3A] flex items-center text-xs">
                    <Layers className="w-3.5 h-3.5 mr-1 text-[#0077C8]" />
                    Un solo punto de contacto
                  </div>
                  <div className="text-[#64748B] text-[11px]">Tecnología centralizada, segura y escalable.</div>
                </div>
                <Link
                  to="/servicios"
                  className="font-bold text-[#0077C8] hover:text-[#0B1F3A] hover:underline shrink-0 ml-3 text-xs"
                >
                  Ver soluciones →
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
