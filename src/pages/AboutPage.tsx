import React, { useState, useEffect, useRef } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { 
  Target, 
  Compass, 
  Building, 
  Terminal, 
  Cpu
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

const CorporateIdentityCard3D: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = (e.clientX - centerX) / (window.innerWidth / 2);
      const mouseY = (e.clientY - centerY) / (window.innerHeight / 2);

      setRotate({
        x: -mouseY * 14,
        y: mouseX * 18
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={cardRef}
      className="relative w-full max-w-sm select-none"
      style={{ perspective: '1200px' }}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
    >
      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF7120]/20 via-cyan-500/15 to-[#FF7120]/20 rounded-2xl blur-xl transform scale-95 pointer-events-none animate-pulse"></div>

      {/* 3D Tilting Card */}
      <div 
        className="relative transition-transform duration-300 ease-out preserve-3d"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Floating Top Bracket Tag */}
        <div 
          className="absolute -top-4 -left-2 z-20 flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#080B0E]/90 border border-[#FF7120]/40 text-[#FF853A] font-mono text-[9px] shadow-[0_0_15px_rgba(255,113,32,0.3)]"
          style={{ transform: 'translateZ(30px)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF7120] animate-ping"></span>
          <span className="font-bold tracking-widest">[ ✢ ] REGISTRO JURÍDICO ACTIVO</span>
        </div>

        {/* Main Card Body */}
        <div className="p-8 rounded-xl cyber-card hud-box border border-white/15 bg-[#080B0E]/90 backdrop-blur-xl flex flex-col items-center text-center space-y-4 w-full shadow-[0_25px_50px_rgba(0,0,0,0.8)] overflow-hidden relative">
          <div className="hud-corner-tl !border-[#FF7120]"></div>
          <div className="hud-corner-tr !border-[#FF7120]"></div>
          <div className="hud-corner-bl !border-[#FF7120]"></div>
          <div className="hud-corner-br !border-[#FF7120]"></div>

          {/* Laser Scanline */}
          <div className="absolute inset-0 pointer-events-none opacity-25 overflow-hidden">
            <div className="w-full h-16 bg-gradient-to-b from-transparent via-[#FF7120]/50 to-transparent animate-laser-scan"></div>
          </div>

          {/* 3D Orbital Center Node Graphic */}
          <div className="w-20 h-20 relative flex items-center justify-center my-1" style={{ transform: 'translateZ(25px)' }}>
            {/* Outer Spinning Ring */}
            <div className="absolute inset-0 border border-dashed border-[#FF7120]/50 rounded-full animate-spin [animation-duration:9s]"></div>
            {/* Inner Counter-Spinning Ring */}
            <div className="absolute inset-2 border border-cyan-500/50 rounded-full animate-spin [animation-duration:5s] [animation-direction:reverse]"></div>
            {/* Center Core Chip */}
            <div className="w-12 h-12 rounded-lg bg-[#FF7120]/15 border border-[#FF7120]/40 flex items-center justify-center text-[#FF7120] shadow-[0_0_20px_rgba(255,113,32,0.4)]">
              <Cpu className="w-6 h-6 text-[#FF7120] animate-pulse" />
            </div>
          </div>

          {/* Corporate Names */}
          <div className="space-y-1 relative z-10" style={{ transform: 'translateZ(20px)' }}>
            <div className="text-2xl font-black text-white font-['Space_Grotesk'] tracking-tight">
              INTEPE <span className="text-[#FF7120]">S.A.S.</span>
            </div>
            <div className="text-xs text-slate-300 font-mono">
              {siteConfig.legalName}
            </div>
          </div>

          {/* Telemetry Details */}
          <div className="pt-3 border-t border-white/10 w-full font-mono text-xs text-slate-300 space-y-1.5 relative z-10" style={{ transform: 'translateZ(15px)' }}>
            <div className="flex items-center justify-between px-2 py-1 rounded bg-white/[0.02] border border-white/5">
              <span className="text-slate-400 text-[11px]">NIT:</span>
              <strong className="text-white">{siteConfig.nit}</strong>
            </div>
            <div className="flex items-center justify-between px-2 py-1 rounded bg-white/[0.02] border border-white/5">
              <span className="text-slate-400 text-[11px]">SEDE:</span>
              <span className="text-slate-300 text-[11px]">{siteConfig.city}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 pt-1 text-[10px] text-emerald-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>100% OPERACIONAL & HABILITADA</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#080B0E] text-slate-100 min-h-screen">
      <PageHeader
        badge="Nuestra Compañía"
        title="Informática y Tecnología Penagos S.A.S."
        subtitle="En INTEPE S.A.S. somos un aliado tecnológico empresarial en Colombia, integrando servicios de Outsourcing TI, soporte técnico, infraestructura y desarrollo de software a medida."
        breadcrumbCurrent="Nosotros"
      />

      {/* 1. Core Intro & Corporate Badge */}
      <div className="bg-[#080B0E] py-24 border-b border-white/10 cyber-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="tech-badge">
                <Terminal className="w-3.5 h-3.5 text-[#FF7120]" />
                <span>EXPERIENCIA & COMPROMISO</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-['Space_Grotesk']">
                Tecnología confiable y soluciones que realmente funcionan
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                <strong className="text-white">Informática y Tecnología Penagos S.A.S. (INTEPE S.A.S.)</strong> nació con el compromiso de brindar a las empresas un respaldo técnico honesto, altamente calificado y proactivo. Entendemos que la tecnología no es solo un conjunto de equipos, sino el motor fundamental que impulsa la continuidad y productividad diaria de su compañía.
              </p>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
                Nuestro diferencial radica en la capacidad de atender integralmente tanto las necesidades de soporte e infraestructura física como el diseño y desarrollo de aplicaciones web, portales de campo y sistemas ERP personalizados.
              </p>
            </div>

            {/* Right Column: 3D Interactive Corporate Badge */}
            <div className="lg:col-span-4 flex justify-center">
              <CorporateIdentityCard3D />
            </div>

          </div>
        </div>
      </div>

      {/* 2. Mission and Vision */}
      <div className="bg-[#080B0E] py-24 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="cyber-card p-8 sm:p-10 rounded-lg hud-box space-y-4">
              <div className="hud-corner-tl"></div>
              <div className="hud-corner-br"></div>
              
              <div className="w-12 h-12 rounded bg-[#FF7120]/10 border border-[#FF7120]/30 flex items-center justify-center text-[#FF7120]">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
                Nuestra Misión
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                Brindar soluciones integrales de tecnología, soporte técnico, infraestructura y desarrollo de software a la medida, convirtiéndonos en el aliado estratégico de las organizaciones para optimizar sus procesos, proteger su información y asegurar su continuidad operativa.
              </p>
            </div>

            <div className="cyber-card p-8 sm:p-10 rounded-lg hud-box space-y-4">
              <div className="hud-corner-tl"></div>
              <div className="hud-corner-br"></div>
              
              <div className="w-12 h-12 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">
                Nuestra Visión
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                Consolidarnos como una empresa referente en Colombia por la calidad técnica, cercanía humana y confiabilidad de nuestros servicios de Outsourcing TI y desarrollo de soluciones empresariales que aportan valor tangible.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Corporate Data Card */}
      <div className="bg-[#080B0E] py-24 border-b border-white/10 cyber-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
            <div className="w-10 h-10 rounded bg-[#FF7120]/10 border border-[#FF7120]/30 flex items-center justify-center text-[#FF7120]">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                Ficha de Identificación Jurídica & Comercial
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Datos oficiales para proveedores y licitaciones corporativas.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 rounded cyber-card">
              <span className="text-slate-400 block text-[10px] uppercase">Razón Social</span>
              <span className="font-bold text-white mt-1 block">{siteConfig.legalName}</span>
            </div>
            <div className="p-4 rounded cyber-card">
              <span className="text-slate-400 block text-[10px] uppercase">NIT</span>
              <span className="font-bold text-[#FF7120] mt-1 block">{siteConfig.nit}</span>
            </div>
            <div className="p-4 rounded cyber-card">
              <span className="text-slate-400 block text-[10px] uppercase">Domicilio Principal</span>
              <span className="font-bold text-white mt-1 block">{siteConfig.city}</span>
            </div>
            <div className="p-4 rounded cyber-card">
              <span className="text-slate-400 block text-[10px] uppercase">Dirección Sede</span>
              <span className="font-bold text-white mt-1 block">{siteConfig.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Why Choose Us Component */}
      <WhyChooseUs />
    </div>
  );
};
