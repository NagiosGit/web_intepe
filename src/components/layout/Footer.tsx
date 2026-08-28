import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  ChevronRight, 
  Cpu,
  Calculator,
  Terminal,
  CreditCard,
  Lock
} from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#05070A] text-slate-300 pt-16 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF7120]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* System Status Banner (ChainGPT Labs signature header) */}
        <div className="cyber-card p-4 rounded-md border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="hud-corner-tl"></div>
          <div className="hud-corner-br"></div>
          
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Terminal className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>ESTADO OPERACIONAL: 100% ACTIVO</span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                SLA de disponibilidad garantizado &gt; 99.8% | Monitoreo proactivo 24/7
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link 
              to="/pagos"
              className="px-3 py-2 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 font-bold font-mono text-xs flex items-center gap-1.5 transition-all"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>PORTAL DE PAGOS PSE / PAYPAL</span>
            </Link>
            <Link 
              to="/cotizador-outsourcing"
              className="btn-cyber-primary text-xs py-2 px-4"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>COTIZAR EN LÍNEA</span>
            </Link>
          </div>
        </div>

        {/* Main 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Corporate Profile & Logo (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-[#FF7120]">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white font-['Space_Grotesk']">
                  INTEPE <span className="text-[#FF7120]">S.A.S.</span>
                </span>
                <span className="block text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                  {siteConfig.legalName}
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-sans">
              Aliado estratégico en Outsourcing TI, mesa de ayuda, infraestructura de servidores y desarrollo de software especializado a la medida para empresas en Colombia.
            </p>

            <div className="p-3 rounded bg-white/[0.02] border border-white/5 space-y-1 font-mono text-[11px] text-slate-400">
              <div><span className="text-slate-200 font-semibold">NIT:</span> {siteConfig.nit}</div>
              <div><span className="text-slate-200 font-semibold">SEDE:</span> {siteConfig.address}</div>
            </div>
          </div>

          {/* Col 2: Servicios TI (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 border-b border-white/10 pb-2 flex items-center justify-between">
              <span>// SERVICIOS TI</span>
              <span className="text-[#FF7120]">[01]</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/outsourcing-ti" className="hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="w-3 h-3 mr-1 text-[#FF7120] group-hover:translate-x-0.5 transition-transform" />
                  <span>Outsourcing TI Integral</span>
                </Link>
              </li>
              <li>
                <Link to="/help-desk" className="hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="w-3 h-3 mr-1 text-[#FF7120] group-hover:translate-x-0.5 transition-transform" />
                  <span>Mesa de Ayuda (Help Desk)</span>
                </Link>
              </li>
              <li>
                <Link to="/infraestructura-tecnologica" className="hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="w-3 h-3 mr-1 text-[#FF7120] group-hover:translate-x-0.5 transition-transform" />
                  <span>Infraestructura & Servidores</span>
                </Link>
              </li>
              <li>
                <Link to="/mantenimiento" className="hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="w-3 h-3 mr-1 text-[#FF7120] group-hover:translate-x-0.5 transition-transform" />
                  <span>Mantenimiento Preventivo</span>
                </Link>
              </li>
              <li>
                <Link to="/google-workspace" className="hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="w-3 h-3 mr-1 text-[#FF7120] group-hover:translate-x-0.5 transition-transform" />
                  <span>Google Workspace & Cloud</span>
                </Link>
              </li>
              <li>
                <Link to="/desarrollo-software" className="hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="w-3 h-3 mr-1 text-[#FF7120] group-hover:translate-x-0.5 transition-transform" />
                  <span>Desarrollo de Software</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Software Propio & Proyectos (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 border-b border-white/10 pb-2 flex items-center justify-between">
              <span>// RECURSOS</span>
              <span className="text-[#FF7120]">[02]</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/help-desk/login" className="text-cyan-400 font-semibold hover:text-cyan-300 flex items-center group">
                  <ChevronRight className="w-3 h-3 mr-1 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>🎧 Mesa de Ayuda (Clientes)</span>
                </Link>
              </li>
              <li>
                <Link to="/pagos" className="text-slate-300 hover:text-white flex items-center group">
                  <ChevronRight className="w-3 h-3 mr-1 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                  <span>💳 Pagos en Línea (PSE)</span>
                </Link>
              </li>
              <li>
                <Link to="/proyectos/granjaweb" className="hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="w-3 h-3 mr-1 text-[#FF7120] group-hover:translate-x-0.5 transition-transform" />
                  <span>GranjaWP (Agrícola)</span>
                </Link>
              </li>
              <li>
                <Link to="/proyectos/invernaderos" className="hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="w-3 h-3 mr-1 text-[#FF7120] group-hover:translate-x-0.5 transition-transform" />
                  <span>InvernaderoFM (Agro)</span>
                </Link>
              </li>
              <li>
                <Link to="/proyectos" className="hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="w-3 h-3 mr-1 text-[#FF7120] group-hover:translate-x-0.5 transition-transform" />
                  <span>Portafolio de Soluciones</span>
                </Link>
              </li>
              <li>
                <Link to="/cotizador-outsourcing" className="text-[#FF853A] font-semibold hover:underline flex items-center pt-2">
                  <span>→ Simulador de Costos</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Terminal de Contacto Directo (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 border-b border-white/10 pb-2 flex items-center justify-between">
              <span>// CONTACTO & PAGOS</span>
              <span className="text-[#FF7120]">[03]</span>
            </h4>
            
            <div className="space-y-2.5 text-xs text-slate-400">
              <a 
                href={`tel:${siteConfig.mobile.replace(/\s+/g, '')}`} 
                className="flex items-center gap-2.5 p-2 rounded bg-white/[0.02] border border-white/5 hover:border-[#FF7120]/40 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#FF7120] shrink-0" />
                <span className="font-mono text-white">{siteConfig.mobile}</span>
              </a>

              <a 
                href={`mailto:${siteConfig.email}`} 
                className="flex items-center gap-2.5 p-2 rounded bg-white/[0.02] border border-white/5 hover:border-[#FF7120]/40 transition-colors"
              >
                <Mail className="w-4 h-4 text-[#FF7120] shrink-0" />
                <span className="font-mono text-white text-[11px] truncate">{siteConfig.email}</span>
              </a>

              {/* Secure Payment Badges */}
              <div className="p-2.5 rounded bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    Pasarelas Seguras
                  </span>
                  <Link to="/pagos" className="text-[10px] text-slate-400 hover:text-white underline">
                    Ver métodos
                  </Link>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-slate-400">
                  <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-300">PSE</span>
                  <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-emerald-300">Wompi</span>
                  <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-blue-300">PayPal</span>
                  <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-amber-300">Bancolombia</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            © {new Date().getFullYear()} {siteConfig.legalName} Todos los derechos reservados.
          </div>
          
          <div className="flex items-center space-x-6">
            <Link to="/pagos" className="hover:text-cyan-400 transition-colors text-cyan-400">
              Portal de Pagos
            </Link>
            <span className="text-slate-800">|</span>
            <Link to="/politica-privacidad" className="hover:text-white transition-colors">
              Política de Privacidad
            </Link>
            <span className="text-slate-800">|</span>
            <Link to="/tratamiento-datos" className="hover:text-white transition-colors">
              Tratamiento de Datos
            </Link>
            <span className="text-slate-800">|</span>
            <Link to="/tarjeta-presentacion" className="text-slate-600 hover:text-slate-400 transition-colors" title="Acceso a Papelería Corporativa">
              🔒
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

