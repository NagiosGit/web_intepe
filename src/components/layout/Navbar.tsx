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
  Globe,
  Layers,
  Zap,
  Sprout,
  Building2
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
    }, 150);
  };

  const handleSoftwareEnter = () => {
    if (softwareTimeoutRef.current) clearTimeout(softwareTimeoutRef.current);
    setSoftwareOpen(true);
    setServicesOpen(false);
  };

  const handleSoftwareLeave = () => {
    softwareTimeoutRef.current = setTimeout(() => {
      setSoftwareOpen(false);
    }, 150);
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
        ? 'bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E8E2D5] shadow-xs' 
        : 'bg-[#FDFBF7] border-b border-[#E8E2D5]/70'
    }`}>
      
      {/* 1. Micro Header - Tonos Cálidos */}
      <div className="hidden lg:block bg-[#F5F0E6] border-b border-[#E8E2D5]/60 py-1.5 text-xs text-stone-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-2 font-medium text-stone-800">
            <span className="w-2 h-2 rounded-full bg-[#B86B42] inline-block"></span>
            <span>{siteConfig.legalName} · {siteConfig.city}</span>
          </div>
          <div className="flex items-center space-x-6">
            <a 
              href={`mailto:${siteConfig.email}`}
              className="flex items-center hover:text-[#B86B42] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 mr-1.5 text-stone-500" />
              <span>{siteConfig.email}</span>
            </a>
            <span className="text-[#E8E2D5]">|</span>
            <a 
              href={`tel:${siteConfig.mobile.replace(/[^0-9]/g, '')}`}
              className="flex items-center font-semibold text-stone-800 hover:text-[#B86B42] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 mr-1.5 text-[#B86B42]" />
              <span>{siteConfig.mobile}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Sigla */}
          <Link to="/" className="flex items-center space-x-3 group shrink-0">
            <img 
              src="/logo/LOGON.png" 
              alt="Logo INTEPE S.A.S." 
              className="h-11 w-auto object-contain group-hover:scale-105 transition-transform" 
            />
            <div className="flex flex-col justify-center">
              <div className="flex items-baseline space-x-1.5">
                <img 
                  src="/logo/Solo_Intepe_2026_8.png" 
                  alt="INTEPE" 
                  className="h-5 sm:h-6 w-auto object-contain"
                />
                <span className="text-xs font-black tracking-wider text-stone-700">
                  S.A.S.
                </span>
              </div>
              <span className="text-[10px] text-stone-500 font-semibold tracking-wider uppercase mt-0.5">
                Soluciones Tecnológicas B2B
              </span>
            </div>
          </Link>

          {/* Desktop Typographic Menu */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-sm font-semibold">
            
            {/* INICIO */}
            <Link
              to="/"
              className={`px-3 py-2 rounded-xl transition-colors ${
                location.pathname === '/' 
                  ? 'text-[#1F2923] font-bold bg-[#F5F0E6]' 
                  : 'text-stone-700 hover:text-stone-950 hover:bg-[#FAF6EE]'
              }`}
            >
              INICIO
            </Link>

            {/* SERVICIOS ▾ */}
            <div 
              className="relative"
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
            >
              <button
                type="button"
                className={`px-3 py-2 rounded-xl transition-colors flex items-center space-x-1 ${
                  isServicesActive ? 'text-[#1F2923] font-bold bg-[#F5F0E6]' : 'text-stone-700 hover:text-stone-950 hover:bg-[#FAF6EE]'
                }`}
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                <span>SERVICIOS</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? 'rotate-180 text-stone-900' : 'text-stone-400'}`} />
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-0 w-[380px] pt-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="bg-[#FDFBF7] rounded-2xl shadow-xl border border-[#E8E2D5] p-5 space-y-3">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 border-b border-[#E8E2D5] pb-2 flex items-center justify-between">
                      <span>Servicios TI Empresariales</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B86B42]"></span>
                    </div>
                    <div className="grid grid-cols-1 gap-1.5">
                      <Link
                        to="/outsourcing-ti"
                        className="p-2.5 rounded-xl hover:bg-[#F5F0E6] transition-colors flex items-start space-x-3 group"
                      >
                        <Briefcase className="w-5 h-5 text-stone-700 shrink-0 mt-0.5 group-hover:text-[#B86B42] transition-colors" />
                        <div>
                          <div className="font-bold text-stone-900 text-xs">Outsourcing TI</div>
                          <div className="text-[11px] text-stone-500">Gestión integral de tecnología</div>
                        </div>
                      </Link>

                      <Link
                        to="/help-desk"
                        className="p-2.5 rounded-xl hover:bg-[#F5F0E6] transition-colors flex items-start space-x-3 group"
                      >
                        <Headset className="w-5 h-5 text-stone-700 shrink-0 mt-0.5 group-hover:text-[#B86B42] transition-colors" />
                        <div>
                          <div className="font-bold text-stone-900 text-xs">Help Desk</div>
                          <div className="text-[11px] text-stone-500">Soporte y atención ágil a usuarios</div>
                        </div>
                      </Link>

                      <Link
                        to="/infraestructura-tecnologica"
                        className="p-2.5 rounded-xl hover:bg-[#F5F0E6] transition-colors flex items-start space-x-3 group"
                      >
                        <Server className="w-5 h-5 text-stone-700 shrink-0 mt-0.5 group-hover:text-[#B86B42] transition-colors" />
                        <div>
                          <div className="font-bold text-stone-900 text-xs">Infraestructura</div>
                          <div className="text-[11px] text-stone-500">Servidores, redes y virtualización</div>
                        </div>
                      </Link>

                      <Link
                        to="/mantenimiento"
                        className="p-2.5 rounded-xl hover:bg-[#F5F0E6] transition-colors flex items-start space-x-3 group"
                      >
                        <Wrench className="w-5 h-5 text-[#B86B42] shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-stone-900 text-xs">Mantenimiento</div>
                          <div className="text-[11px] text-stone-500">Preventivo y correctivo periódico</div>
                        </div>
                      </Link>

                      <Link
                        to="/google-workspace"
                        className="p-2.5 rounded-xl hover:bg-[#F5F0E6] transition-colors flex items-start space-x-3 group"
                      >
                        <Cloud className="w-5 h-5 text-stone-700 shrink-0 mt-0.5 group-hover:text-[#B86B42] transition-colors" />
                        <div>
                          <div className="font-bold text-stone-900 text-xs">Cloud & Workspace</div>
                          <div className="text-[11px] text-stone-500">Google Workspace y colaboración</div>
                        </div>
                      </Link>
                    </div>

                    <div className="pt-2 border-t border-[#E8E2D5] flex items-center justify-between">
                      <Link
                        to="/servicios"
                        className="text-xs font-bold text-stone-900 hover:text-[#B86B42] flex items-center"
                      >
                        <span>Ver todos los servicios</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* SOFTWARE ▾ */}
            <div 
              className="relative"
              onMouseEnter={handleSoftwareEnter}
              onMouseLeave={handleSoftwareLeave}
            >
              <button
                type="button"
                className={`px-3 py-2 rounded-xl transition-colors flex items-center space-x-1 ${
                  isSoftwareActive ? 'text-[#1F2923] font-bold bg-[#F5F0E6]' : 'text-stone-700 hover:text-stone-950 hover:bg-[#FAF6EE]'
                }`}
                onClick={() => setSoftwareOpen(!softwareOpen)}
              >
                <span>SOFTWARE</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${softwareOpen ? 'rotate-180 text-stone-900' : 'text-stone-400'}`} />
              </button>

              {softwareOpen && (
                <div className="absolute top-full -left-20 w-[540px] pt-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="bg-[#FDFBF7] rounded-2xl shadow-xl border border-[#E8E2D5] p-6">
                    <div className="grid grid-cols-12 gap-6">
                      
                      {/* Left: Capacidades (7 cols) */}
                      <div className="col-span-7 space-y-3">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 border-b border-[#E8E2D5] pb-1.5 flex items-center justify-between">
                          <span>Desarrollo de Software</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B86B42]"></span>
                        </div>

                        <div className="space-y-1.5">
                          <Link
                            to="/desarrollo-software"
                            className="block p-2 rounded-xl hover:bg-[#F5F0E6] transition-colors"
                          >
                            <div className="font-bold text-xs text-stone-900 flex items-center">
                              <Code2 className="w-3.5 h-3.5 mr-1.5 text-stone-700" />
                              Software a Medida
                            </div>
                            <div className="text-[11px] text-stone-500">Soluciones adaptadas a sus procesos</div>
                          </Link>

                          <Link
                            to="/desarrollo-software"
                            className="block p-2 rounded-xl hover:bg-[#F5F0E6] transition-colors"
                          >
                            <div className="font-bold text-xs text-stone-900 flex items-center">
                              <Globe className="w-3.5 h-3.5 mr-1.5 text-stone-700" />
                              Aplicaciones Web
                            </div>
                            <div className="text-[11px] text-stone-500">Sistemas accesibles y seguros</div>
                          </Link>

                          <Link
                            to="/desarrollo-software"
                            className="block p-2 rounded-xl hover:bg-[#F5F0E6] transition-colors"
                          >
                            <div className="font-bold text-xs text-stone-900 flex items-center">
                              <Layers className="w-3.5 h-3.5 mr-1.5 text-stone-700" />
                              Sistemas ERP
                            </div>
                            <div className="text-[11px] text-stone-500">Administración y flujos empresariales</div>
                          </Link>

                          <Link
                            to="/desarrollo-software"
                            className="block p-2 rounded-xl hover:bg-[#F5F0E6] transition-colors"
                          >
                            <div className="font-bold text-xs text-stone-900 flex items-center">
                              <Zap className="w-3.5 h-3.5 mr-1.5 text-[#B86B42]" />
                              Automatización & APIs
                            </div>
                            <div className="text-[11px] text-stone-500">Integración con bases de datos</div>
                          </Link>
                        </div>
                      </div>

                      {/* Right: Proyectos Reales (5 cols) */}
                      <div className="col-span-5 bg-[#FAF6EE] rounded-xl p-4 flex flex-col justify-between space-y-3 border border-[#E8E2D5]">
                        <div className="space-y-2.5">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-600">
                            Experiencia Real
                          </div>
                          
                          <div className="space-y-2">
                            <Link to="/proyectos/granjaweb" className="block hover:text-[#B86B42] text-xs">
                              <div className="font-bold text-stone-900 flex items-center">
                                <Sprout className="w-3.5 h-3.5 mr-1 text-[#B86B42]" />
                                GranjaWP
                              </div>
                              <div className="text-[10px] text-stone-500">Gestión avícola y pecuaria</div>
                            </Link>

                            <Link to="/proyectos/invernaderos" className="block hover:text-[#B86B42] text-xs">
                              <div className="font-bold text-stone-900 flex items-center">
                                <Layers className="w-3.5 h-3.5 mr-1 text-stone-700" />
                                InvernaderoFM
                              </div>
                              <div className="text-[10px] text-stone-500">Monitoreo agronómico</div>
                            </Link>

                            <Link to="/proyectos/intepr-erp" className="block hover:text-[#B86B42] text-xs">
                              <div className="font-bold text-stone-900 flex items-center">
                                <Building2 className="w-3.5 h-3.5 mr-1 text-stone-700" />
                                INTEPR-ERP
                              </div>
                              <div className="text-[10px] text-stone-500">ERP a la medida</div>
                            </Link>
                          </div>
                        </div>

                        <Link
                          to="/proyectos"
                          className="text-[11px] font-bold text-stone-900 hover:text-[#B86B42] flex items-center pt-2 border-t border-[#E8E2D5]"
                        >
                          <span>Ver proyectos →</span>
                        </Link>
                      </div>

                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* PROYECTOS */}
            <Link
              to="/proyectos"
              className={`px-3 py-2 rounded-xl transition-colors ${
                location.pathname.startsWith('/proyectos') 
                  ? 'text-[#1F2923] font-bold bg-[#F5F0E6]' 
                  : 'text-stone-700 hover:text-stone-950 hover:bg-[#FAF6EE]'
              }`}
            >
              PROYECTOS
            </Link>

            {/* COTIZADOR TI */}
            <Link
              to="/cotizador-outsourcing"
              className={`px-3 py-2 rounded-xl transition-colors ${
                location.pathname === '/cotizador-outsourcing' 
                  ? 'text-[#1F2923] font-bold bg-[#F5F0E6]' 
                  : 'text-stone-700 hover:text-stone-950 hover:bg-[#FAF6EE]'
              }`}
            >
              COTIZADOR TI
            </Link>

            {/* NOSOTROS */}
            <Link
              to="/nosotros"
              className={`px-3 py-2 rounded-xl transition-colors ${
                location.pathname === '/nosotros' 
                  ? 'text-[#1F2923] font-bold bg-[#F5F0E6]' 
                  : 'text-stone-700 hover:text-stone-950 hover:bg-[#FAF6EE]'
              }`}
            >
              NOSOTROS
            </Link>

            {/* CONTACTO */}
            <Link
              to="/contacto"
              className={`px-3 py-2 rounded-xl transition-colors ${
                location.pathname === '/contacto' 
                  ? 'text-[#1F2923] font-bold bg-[#F5F0E6]' 
                  : 'text-stone-700 hover:text-stone-950 hover:bg-[#FAF6EE]'
              }`}
            >
              CONTACTO
            </Link>

          </nav>

          {/* Botón CTA Primario en Tono Oscuro de Contraste Fuerte */}
          <div className="hidden lg:flex items-center">
            <Link
              to="/cotizador-outsourcing"
              className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-[#FDFBF7] bg-[#1F2923] hover:bg-[#141C17] shadow-sm hover:shadow-md transition-all flex items-center space-x-2"
            >
              <span>COTIZAR AHORA</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#B86B42]" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <Link
              to="/cotizador-outsourcing"
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#1F2923]"
            >
              Cotizar
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-800 hover:bg-[#F5F0E6] transition-colors"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FDFBF7] border-b border-[#E8E2D5] px-6 py-6 shadow-2xl animate-in slide-in-from-top-2 duration-150 max-h-[80vh] overflow-y-auto space-y-3">
          
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-stone-900 border-b border-[#F5F0E6]"
          >
            INICIO
          </Link>

          {/* Accordion Servicios */}
          <div>
            <button
              type="button"
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full py-2 text-sm font-bold text-stone-900 flex items-center justify-between border-b border-[#F5F0E6]"
            >
              <span>SERVICIOS TI</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileServicesOpen && (
              <div className="pl-4 py-2 space-y-2 bg-[#F5F0E6] rounded-xl my-1 text-xs">
                <Link to="/outsourcing-ti" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-stone-800 font-medium">
                  • Outsourcing TI
                </Link>
                <Link to="/help-desk" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-stone-800 font-medium">
                  • Mesa de Ayuda (Help Desk)
                </Link>
                <Link to="/infraestructura-tecnologica" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-stone-800 font-medium">
                  • Infraestructura Tecnológica
                </Link>
                <Link to="/mantenimiento" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-stone-800 font-medium">
                  • Mantenimiento y Soporte
                </Link>
                <Link to="/google-workspace" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-stone-800 font-medium">
                  • Google Workspace & Cloud
                </Link>
                <Link to="/servicios" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-stone-900 font-bold">
                  → Ver todos los servicios
                </Link>
              </div>
            )}
          </div>

          {/* Accordion Software */}
          <div>
            <button
              type="button"
              onClick={() => setMobileSoftwareOpen(!mobileSoftwareOpen)}
              className="w-full py-2 text-sm font-bold text-stone-900 flex items-center justify-between border-b border-[#F5F0E6]"
            >
              <span>DESARROLLO DE SOFTWARE</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileSoftwareOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileSoftwareOpen && (
              <div className="pl-4 py-2 space-y-2 bg-[#F5F0E6] rounded-xl my-1 text-xs">
                <Link to="/desarrollo-software" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-stone-800 font-medium">
                  • Software a Medida
                </Link>
                <Link to="/desarrollo-software" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-stone-800 font-medium">
                  • Aplicaciones Web & ERP
                </Link>
                <Link to="/proyectos/granjaweb" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-stone-800 font-medium">
                  • Caso: GranjaWP
                </Link>
                <Link to="/proyectos/invernaderos" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-stone-800 font-medium">
                  • Caso: InvernaderoFM
                </Link>
                <Link to="/proyectos/intepr-erp" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-stone-800 font-medium">
                  • Caso: INTEPR-ERP
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/proyectos"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-stone-900 border-b border-[#F5F0E6]"
          >
            PROYECTOS
          </Link>

          <Link
            to="/cotizador-outsourcing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-stone-900 border-b border-[#F5F0E6]"
          >
            COTIZADOR TI
          </Link>

          <Link
            to="/nosotros"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-stone-900 border-b border-[#F5F0E6]"
          >
            NOSOTROS
          </Link>

          <Link
            to="/contacto"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-stone-900 border-b border-[#F5F0E6]"
          >
            CONTACTO
          </Link>

          <div className="pt-4">
            <Link
              to="/cotizador-outsourcing"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-center text-white bg-[#1F2923] hover:bg-[#141C17] flex items-center justify-center space-x-2"
            >
              <span>COTIZAR AHORA</span>
              <ArrowRight className="w-4 h-4 text-[#B86B42]" />
            </Link>
          </div>

        </div>
      )}

    </header>
  );
};
