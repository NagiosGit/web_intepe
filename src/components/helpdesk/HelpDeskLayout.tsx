import React from 'react';
import type { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  PlusCircle, 
  ListOrdered, 
  Building2, 
  LogOut, 
  ArrowLeft,
  Wrench,
  LayoutDashboard,
  Cpu,
  Sparkles
} from 'lucide-react';

interface Props {
  children: ReactNode;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export const HelpDeskLayout: React.FC<Props> = ({ children, title, subtitle, actions }) => {
  const { profile, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/help-desk/login');
  };

  const getNavLinks = () => {
    if (!profile) return [];

    if (profile.role === 'ADMIN_INTEPE') {
      return [
        { to: '/admin/help-desk', label: 'Bandeja Global', icon: LayoutDashboard },
        { to: '/admin/clientes', label: 'Empresas Clientes', icon: Building2 },
        { to: '/admin/tecnicos', label: 'Técnicos INTEPE', icon: Wrench },
      ];
    }

    if (profile.role === 'TECNICO_INTEPE') {
      return [
        { to: '/tecnico', label: 'Mis Tickets Asignados', icon: LayoutDashboard },
      ];
    }

    // CLIENTE
    return [
      { to: '/help-desk', label: 'Inicio', icon: LayoutDashboard },
      { to: '/help-desk/tickets', label: 'Mis Solicitudes', icon: ListOrdered },
      { to: '/help-desk/tickets/nuevo', label: '+ Nueva Solicitud', icon: PlusCircle, isPrimary: true },
    ];
  };

  const navLinks = getNavLinks();

  return (
    <div className="relative min-h-screen bg-[#080B0E] text-slate-100 flex flex-col font-sans selection:bg-[#FF7120] selection:text-black overflow-x-hidden cyber-grid">
      
      {/* 0. Ambient Glowing Gradients matching main website */}
      <div className="fixed top-0 left-1/4 -translate-x-1/2 -translate-y-1/3 w-[850px] h-[550px] bg-[#FF7120]/8 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="fixed top-1/3 right-0 w-[650px] h-[550px] bg-cyan-500/6 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="fixed bottom-0 left-1/3 w-[700px] h-[400px] bg-purple-600/4 rounded-full blur-[160px] pointer-events-none z-0"></div>

      {/* 1. Header Bar */}
      <header className="sticky top-0 z-40 bg-[#080B0E]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo & Portal Brand matching Navbar */}
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-2.5 group">
                <div className="relative p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-[#FF7120]/50 transition-colors">
                  <div className="hud-corner-tl"></div>
                  <div className="hud-corner-br"></div>
                  <Cpu className="w-5 h-5 text-[#FF7120] transition-transform group-hover:scale-110" />
                </div>
                <div>
                  <div className="text-base font-black text-white font-['Space_Grotesk'] tracking-tight flex items-center gap-1.5 leading-none">
                    INTEPE <span className="text-[#FF7120]">S.A.S.</span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold block mt-1 tracking-wider">
                    // MESA DE AYUDA B2B
                  </span>
                </div>
              </Link>
            </div>

            {/* Navigation Links for Desktop */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.to;

                if (link.isPrimary) {
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="ml-2 flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#FF7120] text-black font-['Space_Grotesk'] font-bold text-xs hover:bg-[#FF853A] transition-all shadow-[0_0_15px_rgba(255,113,32,0.3)]"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.label}</span>
                    </Link>
                  );
                }

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      isActive
                        ? 'bg-white/10 text-white font-bold border border-white/10 shadow-[0_0_10px_rgba(255,255,255,0.05)]'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-cyan-400" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User Session & Logout */}
            <div className="flex items-center space-x-3">
              {profile && (
                <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-right backdrop-blur-md">
                  <div>
                    <div className="text-xs font-bold text-white font-['Space_Grotesk'] leading-tight">
                      {profile.full_name}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      {profile.client ? profile.client.name : profile.role === 'ADMIN_INTEPE' ? 'INTEPE S.A.S. [ADMIN]' : 'Soporte Técnico INTEPE'}
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider ${
                    profile.role === 'ADMIN_INTEPE'
                      ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                      : profile.role === 'TECNICO_INTEPE'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {profile.role === 'ADMIN_INTEPE' ? 'ADMIN' : profile.role === 'TECNICO_INTEPE' ? 'TÉCNICO' : 'CLIENTE'}
                  </span>
                </div>
              )}

              <button
                onClick={handleLogout}
                title="Cerrar Sesión"
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Strip */}
        <div className="md:hidden border-t border-white/5 bg-[#05070A]/95 px-4 py-2 flex items-center justify-around">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;

            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-mono ${
                  isActive
                    ? 'bg-[#FF7120] text-black font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </header>

      {/* 2. Main Page Header Banner */}
      <div className="relative z-10 bg-gradient-to-b from-[#111822]/80 via-[#0D1219]/80 to-transparent border-b border-white/10 py-6 sm:py-8 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Micro Ribbon */}
          <div className="flex items-center gap-2 mb-2">
            <Link to="/" className="text-slate-400 hover:text-[#FF7120] text-xs font-mono flex items-center gap-1 transition-colors">
              <ArrowLeft className="w-3 h-3" />
              <span>Sitio Web Principal</span>
            </Link>
            <span className="text-slate-600 text-xs font-mono">/</span>
            <span className="inline-flex items-center gap-1 text-cyan-400 text-xs font-mono font-bold">
              <Sparkles className="w-3 h-3" />
              <span>Mesa de Ayuda B2B</span>
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-['Space_Grotesk'] tracking-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
                  {subtitle}
                </p>
              )}
            </div>

            {actions && (
              <div className="flex items-center gap-3">
                {actions}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Dynamic Page Body */}
      <main className="relative z-10 flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>

      {/* 4. Help Desk Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#080B0E]/90 backdrop-blur-md py-4 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>INFORMÁTICA Y TECNOLOGÍA PENAGOS S.A.S. (INTEPE S.A.S.) • Tel: (+57) 313 386 2656</span>
          <span className="text-cyan-400/80 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Sesión Cifrada • RLS Multi-Tenant Activo</span>
          </span>
        </div>
      </footer>
    </div>
  );
};
