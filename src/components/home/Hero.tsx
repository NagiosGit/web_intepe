import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Code2, 
  Headset,
  Sparkles
} from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { CyberServerCore3D } from './CyberServerCore3D';

const techBadges = [
  'Microsoft 365',
  'Google Workspace',
  'AWS Cloud',
  'Proxmox VE',
  'Windows Server',
  'Linux Debian/Ubuntu',
  'Ubiquiti UniFi',
  'Fortinet Security',
  'Mikrotik',
  'PostgreSQL',
  'React & TypeScript',
  'Node.js & Python'
];

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 bg-[#080B0E] border-b border-white/10 overflow-hidden cyber-grid">

      {/* 2. Ambient Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[#FF7120]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-12 right-12 w-[550px] h-[450px] bg-cyan-500/8 rounded-full blur-3xl pointer-events-none"></div>

      {/* 3. Top Cyber Ticker Ribbon */}
      <div className="w-full overflow-hidden border-y border-white/5 bg-white/[0.015] py-2 mb-10 select-none relative z-10">
        <div className="animate-marquee flex items-center gap-8 font-mono text-xs tracking-widest text-slate-400 uppercase">
          <span className="flex items-center gap-2 text-cyan-400">
            <Sparkles className="w-3 h-3" />
            <span>MESA DE AYUDA L1 · L2 · L3 (&lt; 15 MIN)</span>
          </span>
          <span className="text-[#FF7120]">✦</span>
          <span>OUTSOURCING TI DE ALTO RENDIMIENTO</span>
          <span className="text-[#FF7120]">✦</span>
          <span>ADMINISTRACIÓN DE SERVIDORES & CLOUD</span>
          <span className="text-[#FF7120]">✦</span>
          <span>DESARROLLO DE SOFTWARE A MEDIDA</span>
          <span className="text-[#FF7120]">✦</span>
          <span>PORTAL DE PAGOS SEGUROS PSE / PAYPAL</span>
          <span className="text-[#FF7120]">✦</span>
          <span className="flex items-center gap-2 text-cyan-400">
            <Sparkles className="w-3 h-3" />
            <span>MESA DE AYUDA L1 · L2 · L3 (&lt; 15 MIN)</span>
          </span>
          <span className="text-[#FF7120]">✦</span>
          <span>OUTSOURCING TI DE ALTO RENDIMIENTO</span>
          <span className="text-[#FF7120]">✦</span>
          <span>ADMINISTRACIÓN DE SERVIDORES & CLOUD</span>
          <span className="text-[#FF7120]">✦</span>
          <span>DESARROLLO DE SOFTWARE A MEDIDA</span>
          <span className="text-[#FF7120]">✦</span>
          <span>PORTAL DE PAGOS SEGUROS PSE / PAYPAL</span>
          <span className="text-[#FF7120]">✦</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Value Proposition & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-7 text-left">
            
            {/* Live Operational Telemetry Tag */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-4"></span>
              <span className="text-emerald-400 font-bold uppercase tracking-wider">● OPERACIÓN TI ACTIVA</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-300">SLA 99.8% GARANTIZADO</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] font-['Space_Grotesk']">
                Tecnología y <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7120] to-[#FFA14A]">Outsourcing TI</span> que impulsan su empresa.
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal font-sans">
                {siteConfig.heroSubtitle}
              </p>
            </div>

            {/* Quick Benefits Bullet Points with Neon Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-center space-x-2.5 text-xs font-mono text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Mesa de Ayuda L1/L2/L3 (&lt; 15 min)</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs font-mono text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#FF7120] shrink-0" />
                <span>Servidores, Redes & Copias en Nube</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs font-mono text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#FF7120] shrink-0" />
                <span>Desarrollo de Software a la Medida</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs font-mono text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Atención Remota + Presencial Bogotá</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                to="/cotizador-outsourcing"
                className="btn-cyber-primary text-sm py-3.5 px-7"
              >
                <span>COTIZAR OUTSOURCING TI</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/help-desk"
                className="btn-cyber-outline text-sm py-3.5 px-6 flex items-center justify-center gap-2 text-cyan-300 border-cyan-500/30 hover:border-cyan-400"
              >
                <Headset className="w-4 h-4 text-cyan-400" />
                <span>MESA DE AYUDA</span>
              </Link>

              <Link
                to="/desarrollo-software"
                className="btn-cyber-outline text-sm py-3.5 px-6"
              >
                <span>SOFTWARE PROPIO</span>
                <Code2 className="w-4 h-4 text-[#FF7120]" />
              </Link>
            </div>

          </div>

          {/* Right Column: 3D Interactive Cyber Server Core (5 cols) */}
          <div className="lg:col-span-5">
            <CyberServerCore3D />
          </div>

        </div>

        {/* Tech Partners / Stack Continuous Strip */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="text-center text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">
            // TECNOLOGÍAS, ESTÁNDARES Y PLATAFORMAS INTEGRADAS
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {techBadges.map((tech, idx) => (
              <div 
                key={idx}
                className="px-3 py-1 rounded bg-white/[0.03] border border-white/5 text-xs font-mono text-slate-400 hover:text-[#FF7120] hover:border-[#FF7120]/30 transition-colors"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

