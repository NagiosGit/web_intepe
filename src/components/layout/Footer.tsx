import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  ChevronRight, 
  Building2
} from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B1F3A] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Corporate Profile & Official Logo (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              {/* LOGON.png on neat light container */}
              <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center shadow-md shrink-0">
                <img 
                  src="/logo/LOGON.png" 
                  alt="INTEPE S.A.S." 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline space-x-1.5">
                  <div className="bg-white px-2 py-0.5 rounded-lg flex items-center shadow-xs">
                    <img 
                      src="/logo/Solo_Intepe_2026_8.png" 
                      alt="INTEPE" 
                      className="h-4 sm:h-5 w-auto object-contain"
                    />
                  </div>
                  <span className="text-xs font-black tracking-wider text-[#0077C8]">
                    S.A.S.
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-1">
                  {siteConfig.legalName}
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
              Aliado estratégico en Outsourcing TI, soporte tecnológico, infraestructura empresarial y desarrollo de software a la medida en Colombia.
            </p>

            <div className="pt-2 flex items-center space-x-2 text-[11px] text-slate-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#B86F4B]"></span>
              <span>NIT: {siteConfig.nit} · Bogotá, Colombia</span>
            </div>
          </div>

          {/* Col 2: Servicios TI (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-white/10 pb-2 flex items-center justify-between">
              <span>Servicios TI</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0077C8]"></span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link to="/outsourcing-ti" className="hover:text-[#0077C8] transition-colors flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-[#0077C8]" />
                  <span>Outsourcing TI Integral</span>
                </Link>
              </li>
              <li>
                <Link to="/help-desk" className="hover:text-[#0077C8] transition-colors flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-[#0077C8]" />
                  <span>Mesa de Ayuda (Help Desk)</span>
                </Link>
              </li>
              <li>
                <Link to="/infraestructura-tecnologica" className="hover:text-[#0077C8] transition-colors flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-[#0077C8]" />
                  <span>Infraestructura & Servidores</span>
                </Link>
              </li>
              <li>
                <Link to="/mantenimiento" className="hover:text-[#0077C8] transition-colors flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-[#0077C8]" />
                  <span>Mantenimiento Preventivo</span>
                </Link>
              </li>
              <li>
                <Link to="/google-workspace" className="hover:text-[#0077C8] transition-colors flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-[#0077C8]" />
                  <span>Google Workspace & Cloud</span>
                </Link>
              </li>
              <li>
                <Link to="/cotizador-outsourcing" className="text-[#0077C8] font-semibold hover:underline flex items-center pt-1">
                  <span>→ Cotizador en tiempo real</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Desarrollo & Software (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-white/10 pb-2 flex items-center justify-between">
              <span>Software</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B86F4B]"></span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link to="/desarrollo-software" className="hover:text-[#0077C8] transition-colors flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-[#B86F4B]" />
                  <span>Software a Medida</span>
                </Link>
              </li>
              <li>
                <Link to="/desarrollo-software" className="hover:text-[#0077C8] transition-colors flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-[#B86F4B]" />
                  <span>Sistemas ERP</span>
                </Link>
              </li>
              <li>
                <Link to="/proyectos/granjaweb" className="hover:text-[#0077C8] transition-colors flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-[#B86F4B]" />
                  <span>Caso: GranjaWEB</span>
                </Link>
              </li>
              <li>
                <Link to="/proyectos/invernaderos" className="hover:text-[#0077C8] transition-colors flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-[#B86F4B]" />
                  <span>Caso: Invernaderos</span>
                </Link>
              </li>
              <li>
                <Link to="/proyectos/intepr-erp" className="hover:text-[#0077C8] transition-colors flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-[#B86F4B]" />
                  <span>Caso: INTEPR-ERP</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contacto Oficial (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-white/10 pb-2 flex items-center justify-between">
              <span>Contacto</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0077C8]"></span>
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#0077C8] shrink-0 mt-0.5" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#0077C8] shrink-0 mt-0.5" />
                <a href={`mailto:${siteConfig.email}`} className="text-[#0077C8] hover:underline">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="w-3.5 h-3.5 text-[#B86F4B] shrink-0 mt-0.5" />
                <div>
                  <span>Cel: {siteConfig.mobile}</span><br />
                  <span>Fijo: {siteConfig.phone}</span>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>Banco: {siteConfig.bank}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Subfooter */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          
          <div>
            © 2026 <strong>{siteConfig.legalName}</strong> (INTEPE S.A.S.). Todos los derechos reservados.
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-slate-400">
            <Link to="/politica-privacidad" className="hover:text-white transition-colors">
              Política de Privacidad
            </Link>
            <span>•</span>
            <Link to="/tratamiento-datos" className="hover:text-white transition-colors">
              Tratamiento de Datos Personales
            </Link>
            <span>•</span>
            <div className="flex items-center space-x-1 text-slate-400">
              <Lock className="w-3 h-3 text-[#0077C8]" />
              <span>Conexión Segura SSL</span>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};
