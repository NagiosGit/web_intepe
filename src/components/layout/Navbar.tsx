import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  ArrowRight,
  ChevronDown,
  Briefcase,
  Headset,
  Server,
  Wrench,
  Cloud,
  Code2,
  Layers,
  Sprout,
  Calculator,
  Cpu,
  CreditCard
} from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [softwareOpen, setSoftwareOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileSoftwareOpen, setMobileSoftwareOpen] = useState(false);

  const location = useLocation();
  const servicesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const softwareTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setSoftwareOpen(false);
    setMobileServicesOpen(false);
    setMobileSoftwareOpen(false);
  }, [location.pathname]);

  const handleServicesEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesOpen(true);
    setSoftwareOpen(false);
  };

  const handleServicesLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 180);
  };

  const handleSoftwareEnter = () => {
    if (softwareTimeoutRef.current) clearTimeout(softwareTimeoutRef.current);
    setSoftwareOpen(true);
    setServicesOpen(false);
  };

  const handleSoftwareLeave = () => {
    softwareTimeoutRef.current = setTimeout(() => {
      setSoftwareOpen(false);
    }, 180);
  };

  const isServicesActive = [
    '/servicios',
    '/outsourcing-ti',
    '/help-desk',
    '/infraestructura-tecnologica',
    '/mantenimiento',
    '/google-workspace'
  ].includes(location.pathname);

  const isSoftwareActive = [
    '/desarrollo-software'
  ].includes(location.pathname);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#0F172A]/98 backdrop-blur-2xl border-b border-white/15 shadow-[0_10px_40px_rgba(0,0,0,0.5)]' 
        : 'bg-[#0F172A]/95 backdrop-blur-xl border-b border-white/10'
    }`}>
      
      {/* 1. Micro Top Bar - Cyber HUD style */}
      <div className="hidden lg:block bg-[#090E17] border-b border-white/10 py-1 text-xs text-slate-400 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 -ml-2.5"></span>
              SISTEMA OPERATIVO TI
            </span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-400 tracking-wide">NIT: {siteConfig.nit}</span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-400">BOGOTÁ, COLOMBIA</span>
          </div>

          <div className="flex items-center space-x-4 text-slate-300">
            <a href={`tel:${siteConfig.mobile.replace(/\s+/g, '')}`} className="flex items-center gap-1.5 hover:text-[#FF7120] transition-colors">
              <Phone className="w-3 h-3 text-[#FF7120]" />
              <span>{siteConfig.mobile}</span>
            </a>
            <span className="text-slate-700">|</span>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-1.5 hover:text-[#FF7120] transition-colors">
              <Mail className="w-3 h-3 text-[#FF7120]" />
              <span>{siteConfig.email}</span>
            </a>
            <span className="text-slate-700">|</span>
            <Link to="/help-desk/login" className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-bold transition-colors">
              <Headset className="w-3 h-3 text-cyan-400" />
              <span>PORTAL HELP DESK</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-[#FF7120]/50 transition-colors">
              <div className="hud-corner-tl"></div>
              <div className="hud-corner-br"></div>
              <Cpu className="w-6 h-6 text-[#FF7120] transition-transform group-hover:scale-110" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white font-['Space_Grotesk']">
                INTEPE <span className="text-[#FF7120]">S.A.S.</span>
              </span>
              <span className="block text-[10px] font-mono tracking-widest text-slate-400 uppercase -mt-0.5">
                TI & SOFTWARE SOLUTIONS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link 
              to="/" 
              className={`px-3.5 py-2 text-sm font-medium transition-colors rounded-sm ${
                location.pathname === '/' 
                  ? 'text-[#FF7120] bg-white/5 font-semibold' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Inicio
            </Link>

            {/* Dropdown: Servicios TI */}
            <div 
              className="relative"
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
            >
              <button 
                className={`flex items-center gap-1 px-3.5 py-2 text-sm font-medium transition-colors rounded-sm ${
                  isServicesActive 
                    ? 'text-[#FF7120] bg-white/5 font-semibold' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>Servicios TI</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180 text-[#FF7120]' : ''}`} />
              </button>

              {/* Mega Dropdown Menu with Hover Bridge */}
              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[700px] z-50">
                  <div className="bg-[#1E293B] rounded-xl p-5 border border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.6)] hud-box">
                    <div className="hud-corner-tl"></div>
                    <div className="hud-corner-tr"></div>
                    <div className="hud-corner-bl"></div>
                    <div className="hud-corner-br"></div>
                    
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs font-mono text-slate-300">
                      <span className="text-[#FF7120] font-bold tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#FF7120] animate-pulse"></span>
                        PORTAFOLIO DE SERVICIOS TI CORPORATIVOS
                      </span>
                      <Link to="/servicios" className="hover:text-white flex items-center gap-1 transition-colors text-slate-200 font-medium">
                        Ver Catálogo Completo <ArrowRight className="w-3 h-3 text-[#FF7120]" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      {/* Columna 1: Soporte & Mesa de Ayuda */}
                      <div className="space-y-2.5">
                        <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00E5FF] px-2.5 py-1 rounded bg-cyan-500/15 inline-block border border-cyan-500/30">
                          // SOPORTE & MESA DE AYUDA
                        </div>

                        <Link 
                          to="/help-desk"
                          className="p-3 rounded-lg bg-[#0F172A] hover:bg-[#283548] border border-white/10 hover:border-cyan-400/60 shadow-sm transition-all group flex items-start gap-3"
                        >
                          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform shrink-0 border border-cyan-500/30">
                            <Headset className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                              Mesa de Ayuda (Help Desk)
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/25 text-cyan-200 font-mono font-bold">L1/L2/L3</span>
                            </div>
                            <div className="text-xs text-slate-300 line-clamp-1">Soporte multicanal con SLA &lt; 15 min</div>
                          </div>
                        </Link>

                        <Link 
                          to="/outsourcing-ti"
                          className="p-3 rounded-lg bg-[#0F172A] hover:bg-[#283548] border border-white/10 hover:border-[#FF7120]/60 shadow-sm transition-all group flex items-start gap-3"
                        >
                          <div className="p-2 rounded-lg bg-[#FF7120]/20 text-[#FF7120] group-hover:scale-110 transition-transform shrink-0 border border-[#FF7120]/30">
                            <Briefcase className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white group-hover:text-[#FF7120] transition-colors">
                              Outsourcing TI Integral
                            </div>
                            <div className="text-xs text-slate-300 line-clamp-1">Departamento de sistemas tercerizado</div>
                          </div>
                        </Link>

                        <Link 
                          to="/mantenimiento"
                          className="p-3 rounded-lg bg-[#0F172A] hover:bg-[#283548] border border-white/10 hover:border-emerald-400/60 shadow-sm transition-all group flex items-start gap-3"
                        >
                          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform shrink-0 border border-emerald-500/30">
                            <Wrench className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                              Mantenimiento Preventivo
                            </div>
                            <div className="text-xs text-slate-300 line-clamp-1">Hardware, limpieza física y optimización SO</div>
                          </div>
                        </Link>
                      </div>

                      {/* Columna 2: Infraestructura & Nube */}
                      <div className="space-y-2.5">
                        <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 px-2.5 py-1 rounded bg-amber-500/10 inline-block border border-amber-500/30">
                          // INFRAESTRUCTURA & CLOUD
                        </div>

                        <Link 
                          to="/infraestructura-tecnologica"
                          className="p-3 rounded-lg bg-[#0F172A] hover:bg-[#283548] border border-white/10 hover:border-amber-400/50 shadow-sm transition-all group flex items-start gap-3"
                        >
                          <div className="p-2 rounded-lg bg-amber-500/15 text-amber-400 group-hover:scale-110 transition-transform shrink-0 border border-amber-500/20">
                            <Server className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">
                              Infraestructura & Redes
                            </div>
                            <div className="text-xs text-slate-300 line-clamp-1">Servidores, cableado, Wi-Fi y backups</div>
                          </div>
                        </Link>

                        <Link 
                          to="/google-workspace"
                          className="p-3 rounded-lg bg-[#0F172A] hover:bg-[#283548] border border-white/10 hover:border-blue-400/50 shadow-sm transition-all group flex items-start gap-3"
                        >
                          <div className="p-2 rounded-lg bg-blue-500/15 text-blue-400 group-hover:scale-110 transition-transform shrink-0 border border-blue-500/20">
                            <Cloud className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                              Google Workspace & Cloud
                            </div>
                            <div className="text-xs text-slate-300 line-clamp-1">Correo corporativo y productividad nube</div>
                          </div>
                        </Link>

                        <Link 
                          to="/desarrollo-software"
                          className="p-3 rounded-lg bg-[#0F172A] hover:bg-[#283548] border border-white/10 hover:border-purple-400/50 shadow-sm transition-all group flex items-start gap-3"
                        >
                          <div className="p-2 rounded-lg bg-purple-500/15 text-purple-400 group-hover:scale-110 transition-transform shrink-0 border border-purple-500/20">
                            <Code2 className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white group-hover:text-purple-400 transition-colors">
                              Software a Medida
                            </div>
                            <div className="text-xs text-slate-300 line-clamp-1">Automatización y desarrollo especializado</div>
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Micro Footer Bar inside dropdown */}
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-300">
                      <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        Atención Remota + Presencial en Bogotá y Sabana
                      </span>
                      <Link to="/cotizador-outsourcing" className="text-[#FF7120] hover:underline font-bold flex items-center gap-1">
                        Cotizar Plan Mensual →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Dropdown: Software Propio */}
            <div 
              className="relative"
              onMouseEnter={handleSoftwareEnter}
              onMouseLeave={handleSoftwareLeave}
            >
              <button 
                className={`flex items-center gap-1 px-3.5 py-2 text-sm font-medium transition-colors rounded-sm ${
                  isSoftwareActive 
                    ? 'text-[#FF7120] bg-white/5 font-semibold' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>Software</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${softwareOpen ? 'rotate-180 text-[#FF7120]' : ''}`} />
              </button>

              {softwareOpen && (
                <div className="absolute top-full left-0 pt-6 w-80 z-50">
                  <div className="bg-[#0B0F15] rounded-xl p-3.5 border border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.98),0_0_35px_rgba(255,113,32,0.12)] hud-box">
                    <div className="hud-corner-tl"></div>
                    <div className="hud-corner-br"></div>
                    <div className="space-y-2">
                      <Link 
                        to="/desarrollo-software"
                        className="p-3 rounded-lg bg-[#05070A] hover:bg-[#181310] border border-white/10 hover:border-[#FF7120]/50 shadow-sm flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-all group"
                      >
                        <div className="p-2 rounded-lg bg-[#FF7120]/15 text-[#FF7120] group-hover:scale-110 transition-transform shrink-0 border border-[#FF7120]/20">
                          <Code2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-white group-hover:text-[#FF7120] transition-colors">Desarrollo Propio</div>
                          <div className="text-[11px] text-slate-400">ERPs y plataformas a la medida</div>
                        </div>
                      </Link>

                      <Link 
                        to="/proyectos/granjaweb"
                        className="p-3 rounded-lg bg-[#05070A] hover:bg-[#0c1813] border border-white/10 hover:border-emerald-400/50 shadow-sm flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-all group"
                      >
                        <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400 group-hover:scale-110 transition-transform shrink-0 border border-emerald-500/20">
                          <Sprout className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-white group-hover:text-emerald-400 transition-colors">GranjaWP</div>
                          <div className="text-[11px] text-slate-400">Gestión agrícola e invernaderos</div>
                        </div>
                      </Link>

                      <Link 
                        to="/proyectos/invernaderos"
                        className="p-3 rounded-lg bg-[#05070A] hover:bg-[#111722] border border-white/10 hover:border-cyan-400/50 shadow-sm flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-all group"
                      >
                        <div className="p-2 rounded-lg bg-cyan-500/15 text-cyan-400 group-hover:scale-110 transition-transform shrink-0 border border-cyan-500/20">
                          <Layers className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-white group-hover:text-cyan-400 transition-colors">InvernaderoFM</div>
                          <div className="text-[11px] text-slate-400">Control agronómico y cosecha</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link 
              to="/proyectos" 
              className={`px-3.5 py-2 text-sm font-medium transition-colors rounded-sm ${
                location.pathname === '/proyectos' 
                  ? 'text-[#FF7120] bg-white/5 font-semibold' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Proyectos
            </Link>

            <Link 
              to="/cotizador-outsourcing" 
              className={`px-3.5 py-2 text-sm font-medium transition-colors rounded-sm flex items-center gap-1.5 ${
                location.pathname === '/cotizador-outsourcing' 
                  ? 'text-[#FF7120] bg-white/5 font-semibold' 
                  : 'text-slate-300 hover:text-[#FF7120] hover:bg-white/5'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-[#FF7120]" />
              <span>Cotizador</span>
              <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold bg-[#FF7120]/20 text-[#FF7120] border border-[#FF7120]/30 rounded">
                LIVE
              </span>
            </Link>

            <Link 
              to="/nosotros" 
              className={`px-3.5 py-2 text-sm font-medium transition-colors rounded-sm ${
                location.pathname === '/nosotros' 
                  ? 'text-[#FF7120] bg-white/5 font-semibold' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Nosotros
            </Link>

            <Link 
              to="/contacto" 
              className={`px-3.5 py-2 text-sm font-medium transition-colors rounded-sm ${
                location.pathname === '/contacto' 
                  ? 'text-[#FF7120] bg-white/5 font-semibold' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Contacto
            </Link>
          </nav>

          {/* Desktop Call to Action Button */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link 
              to="/cotizador-outsourcing"
              className="btn-cyber-primary text-xs"
            >
              <span>COTIZAR AHORA</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center space-x-2">
            <Link
              to="/cotizador-outsourcing"
              className="px-3 py-1.5 text-xs font-bold bg-[#FF7120] text-black rounded font-['Space_Grotesk']"
            >
              Cotizador
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded bg-white/5 text-slate-300 hover:text-white border border-white/10 focus:outline-none"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#FF7120]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B0F15] border-b border-white/15 px-4 pt-3 pb-6 space-y-2 max-h-[calc(100vh-80px)] overflow-y-auto shadow-2xl">
          <Link
            to="/"
            className={`block px-3 py-2 text-base font-medium rounded ${
              location.pathname === '/' ? 'text-[#FF7120] bg-white/5 font-bold' : 'text-slate-300'
            }`}
          >
            Inicio
          </Link>

          <div>
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-slate-300 hover:text-white"
            >
              <span>Servicios TI</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180 text-[#FF7120]' : ''}`} />
            </button>
            {mobileServicesOpen && (
              <div className="pl-4 space-y-1.5 mt-1 border-l-2 border-[#FF7120]/40 my-2">
                <Link to="/servicios" className="block px-3 py-1.5 text-sm text-slate-300 hover:text-white">Ver Catálogo Completo</Link>
                <Link to="/help-desk" className="block px-3 py-1.5 text-sm text-cyan-400 hover:text-cyan-300 font-medium">Mesa de Ayuda (Help Desk L1/L2/L3)</Link>
                <Link to="/outsourcing-ti" className="block px-3 py-1.5 text-sm text-[#FF7120] hover:text-[#FF853A] font-medium">Outsourcing TI Integral</Link>
                <Link to="/infraestructura-tecnologica" className="block px-3 py-1.5 text-sm text-amber-400 hover:text-amber-300">Infraestructura & Redes</Link>
                <Link to="/mantenimiento" className="block px-3 py-1.5 text-sm text-emerald-400 hover:text-emerald-300">Mantenimiento Preventivo</Link>
                <Link to="/google-workspace" className="block px-3 py-1.5 text-sm text-blue-400 hover:text-blue-300">Google Workspace & Cloud</Link>
                <Link to="/desarrollo-software" className="block px-3 py-1.5 text-sm text-purple-400 hover:text-purple-300">Software a Medida</Link>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => setMobileSoftwareOpen(!mobileSoftwareOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-slate-300 hover:text-white"
            >
              <span>Software Desarrollado</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileSoftwareOpen ? 'rotate-180 text-[#FF7120]' : ''}`} />
            </button>
            {mobileSoftwareOpen && (
              <div className="pl-4 space-y-1.5 mt-1 border-l-2 border-[#FF7120]/40 my-2">
                <Link to="/desarrollo-software" className="block px-3 py-1.5 text-sm text-purple-400 hover:text-purple-300">Software a Medida</Link>
                <Link to="/proyectos/granjaweb" className="block px-3 py-1.5 text-sm text-emerald-400 hover:text-emerald-300">GranjaWP (Agrícola)</Link>
                <Link to="/proyectos/invernaderos" className="block px-3 py-1.5 text-sm text-cyan-400 hover:text-cyan-300">InvernaderoFM (Agronómico)</Link>
              </div>
            )}
          </div>

          <Link
            to="/proyectos"
            className={`block px-3 py-2 text-base font-medium rounded ${
              location.pathname === '/proyectos' ? 'text-[#FF7120] bg-white/5' : 'text-slate-300'
            }`}
          >
            Proyectos
          </Link>

          <Link
            to="/cotizador-outsourcing"
            className={`block px-3 py-2 text-base font-medium rounded ${
              location.pathname === '/cotizador-outsourcing' ? 'text-[#FF7120] bg-white/5' : 'text-slate-300'
            }`}
          >
            Cotizador Interactivo
          </Link>

          <Link
            to="/nosotros"
            className={`block px-3 py-2 text-base font-medium rounded ${
              location.pathname === '/nosotros' ? 'text-[#FF7120] bg-white/5' : 'text-slate-300'
            }`}
          >
            Nosotros
          </Link>

          <Link
            to="/pagos"
            className={`block px-3 py-2 text-base font-medium rounded flex items-center justify-between ${
              location.pathname === '/pagos' || location.pathname === '/link-pagos' ? 'text-cyan-400 bg-white/5' : 'text-slate-300'
            }`}
          >
            <span className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-cyan-400" />
              <span>Pagos en Línea (PSE / PayPal)</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">SEGURO</span>
          </Link>

          <Link
            to="/contacto"
            className={`block px-3 py-2 text-base font-medium rounded ${
              location.pathname === '/contacto' ? 'text-[#FF7120] bg-white/5' : 'text-slate-300'
            }`}
          >
            Contacto
          </Link>

          <div className="pt-4 border-t border-white/10 space-y-3">
            <Link
              to="/cotizador-outsourcing"
              className="w-full btn-cyber-primary"
            >
              <span>INICIAR COTIZACIÓN TI</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="text-center font-mono text-xs text-slate-400">
              Móvil: {siteConfig.mobile}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
