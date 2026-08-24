import React, { useState, useEffect, useRef } from 'react';
import { 
  Server, 
  Cpu, 
  Activity, 
  Zap
} from 'lucide-react';

export const CyberServerCore3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate mouse offset from center (-1 to 1)
      const mouseX = (e.clientX - centerX) / (window.innerWidth / 2);
      const mouseY = (e.clientY - centerY) / (window.innerHeight / 2);

      // Smooth subtle tilt
      setRotate({
        x: -mouseY * 12, // Max 12 deg tilt
        y: mouseX * 16   // Max 16 deg tilt
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-lg mx-auto select-none"
      onMouseLeave={() => {
        setRotate({ x: 0, y: 0 });
      }}
    >
      {/* 1. Ambient Hologram Glow Behind */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF7120]/15 via-cyan-500/10 to-[#FF7120]/15 rounded-3xl blur-2xl transform scale-90 pointer-events-none animate-pulse"></div>

      {/* 2. Main 3D Tilting Frame */}
      <div 
        className="relative transition-transform duration-300 ease-out preserve-3d"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >

        {/* Floating Top HUD Tag: ChainGPT Labs Bracket Style */}
        <div 
          className="absolute -top-6 -left-3 z-30 flex items-center gap-2 px-3 py-1 rounded bg-[#080B0E]/90 border border-cyan-500/40 text-cyan-400 font-mono text-[10px] shadow-[0_0_15px_rgba(0,229,255,0.2)] transition-transform duration-300"
          style={{ transform: 'translateZ(40px)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
          <span className="font-bold tracking-widest">[ ✢ ] CORE OPERATIONAL // 24/7</span>
        </div>

        {/* Floating Top-Right 3D Rotating Node (Exact ChainGPT Labs Feature) */}
        <div 
          className="absolute -top-8 -right-4 z-30 p-3 rounded-lg bg-[#0D1219]/95 border border-[#FF7120]/40 shadow-[0_0_25px_rgba(255,113,32,0.25)] hud-box transition-transform duration-300 hidden sm:flex flex-col items-center gap-1"
          style={{ transform: 'translateZ(50px)' }}
        >
          <div className="hud-corner-tl"></div>
          <div className="hud-corner-tr"></div>
          <div className="hud-corner-bl"></div>
          <div className="hud-corner-br"></div>

          {/* 3D Wireframe Node Graphic */}
          <div className="w-10 h-10 relative flex items-center justify-center">
            <div className="absolute inset-0 border border-dashed border-[#FF7120]/40 rounded-full animate-spin [animation-duration:8s]"></div>
            <div className="absolute inset-1 border border-cyan-500/40 rounded-full animate-spin [animation-duration:4s] [animation-direction:reverse]"></div>
            <Cpu className="w-5 h-5 text-[#FF7120] animate-pulse" />
          </div>
          <span className="text-[9px] font-mono text-slate-300 font-bold">LATENCIA: 4ms</span>
        </div>

        {/* 3. Main Glass Cockpit Card */}
        <div className="cyber-card rounded-xl p-6 sm:p-7 border border-white/15 bg-[#080B0E]/85 backdrop-blur-xl hud-box shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden relative">
          <div className="hud-corner-tl"></div>
          <div className="hud-corner-tr"></div>
          <div className="hud-corner-bl"></div>
          <div className="hud-corner-br"></div>

          {/* Cyber Laser Scanline sweep across the card */}
          <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
            <div className="w-full h-24 bg-gradient-to-b from-transparent via-[#FF7120]/40 to-transparent animate-laser-scan"></div>
          </div>

          {/* Cockpit Card Header */}
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-[#FF7120]/10 border border-[#FF7120]/30 flex items-center justify-center text-[#FF7120]">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block font-['Space_Grotesk']">
                  INTEPE COMMAND CENTER
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  INFRAESTRUCTURA & OUTSOURCING
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                ONLINE
              </span>
            </div>
          </div>

          {/* Central 3D Cyber Server Rack Animation Visualization */}
          <div className="my-5 p-4 rounded-lg bg-[#05070A]/90 border border-white/10 relative overflow-hidden group">
            {/* Background Grid Pattern in Mini Visualizer */}
            <div className="absolute inset-0 cyber-grid-dense opacity-30 pointer-events-none"></div>

            <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <Server className="w-3.5 h-3.5" />
                RACK MULTI-TENANT // 100% OPERACIONAL
              </span>
              <span className="text-emerald-400 font-semibold">99.8% SLA</span>
            </div>

            {/* Server Blade Rows with blinking LED fiber optic simulation */}
            <div className="space-y-2 relative z-10 font-mono text-xs">
              {/* Blade 1: Mesa de Ayuda & Tickets */}
              <div className="p-2.5 rounded bg-white/[0.03] border border-white/5 flex items-center justify-between hover:border-cyan-500/30 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span className="text-white text-xs font-semibold">Mesa de Ayuda L1/L2/L3</span>
                </div>
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="text-slate-400">Cola: 0 req</span>
                  <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">&lt; 15 min</span>
                </div>
              </div>

              {/* Blade 2: Servidores & Virtualización */}
              <div className="p-2.5 rounded bg-white/[0.03] border border-white/5 flex items-center justify-between hover:border-[#FF7120]/30 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF7120] animate-pulse"></span>
                  <span className="text-white text-xs font-semibold">Servidores Windows / Linux</span>
                </div>
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="text-slate-400">Proxmox VE</span>
                  <span className="px-1.5 py-0.2 rounded bg-[#FF7120]/20 text-[#FFA14A] font-bold border border-[#FF7120]/30">Activo</span>
                </div>
              </div>

              {/* Blade 3: Redes & Ciberseguridad */}
              <div className="p-2.5 rounded bg-white/[0.03] border border-white/5 flex items-center justify-between hover:border-emerald-500/30 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-white text-xs font-semibold">Firewall & Ciberseguridad</span>
                </div>
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="text-slate-400">Fortinet / VPN</span>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">Cifrado TLS</span>
                </div>
              </div>
            </div>

            {/* Micro Audio / Pulse wave ticker */}
            <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>CANALES ACTIVOS: WHATSAPP · TICKETS · PBX · REMOTO</span>
              <span className="text-cyan-400 font-bold">100% DISPONIBLE</span>
            </div>
          </div>

          {/* Key Metric Gauges (4 cols) */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Disponibilidad SLA</span>
              <span className="text-2xl font-black text-[#00E5FF] font-['Space_Grotesk'] block">99.8%</span>
              <span className="text-[10px] text-slate-500 block">Garantía contractual</span>
            </div>

            <div className="p-3 rounded bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Respuesta L1</span>
              <span className="text-2xl font-black text-[#FF7120] font-['Space_Grotesk'] block">&lt; 15 min</span>
              <span className="text-[10px] text-slate-500 block">Soporte inmediato</span>
            </div>
          </div>

          {/* Bottom Interactive Trigger Box */}
          <div className="p-3.5 rounded bg-gradient-to-r from-[#FF7120]/10 via-transparent to-cyan-500/10 border border-white/10 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-white font-['Space_Grotesk'] block">
                ¿Desea cotizar la infraestructura de su empresa?
              </span>
              <span className="text-[11px] text-slate-400 font-mono block">
                Cálculo instantáneo según puestos y servidores
              </span>
            </div>
            <a 
              href="/cotizador-outsourcing"
              className="p-2 rounded bg-[#FF7120] text-black hover:bg-[#FF853A] transition-all transform hover:scale-105 shrink-0 shadow-[0_0_15px_rgba(255,113,32,0.5)]"
              title="Calcular Cotización"
            >
              <Zap className="w-4 h-4 fill-current" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
