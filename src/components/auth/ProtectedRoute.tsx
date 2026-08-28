import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, ArrowLeft, Lock } from 'lucide-react';
import type { UserRole } from '../../types/helpdesk';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles 
}) => {
  const { user, profile, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center text-slate-300 font-mono space-y-4 cyber-grid">
        <div className="w-12 h-12 rounded-xl bg-[#FF7120]/10 border border-[#FF7120]/40 flex items-center justify-center text-[#FF7120] animate-pulse">
          <Lock className="w-6 h-6 animate-spin" />
        </div>
        <div className="text-sm tracking-wider">
          VERIFICANDO CREDENCIALES & SESIÓN SEGURA...
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return <Navigate to="/help-desk/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(profile.role)) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-xl bg-[#0D1219] border border-red-500/30 text-center space-y-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 mx-auto flex items-center justify-center">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">
              Acceso Restringido
            </h2>
            <p className="text-xs font-mono text-slate-400">
              Su usuario ({profile.email}) con rol <span className="text-[#FF7120] font-bold">[{profile.role}]</span> no cuenta con privilegios para consultar esta sección.
            </p>
          </div>
          <div className="pt-2">
            <Link
              to={
                profile.role === 'ADMIN_INTEPE'
                  ? '/admin/help-desk'
                  : profile.role === 'TECNICO_INTEPE'
                  ? '/tecnico'
                  : '/help-desk'
              }
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FF7120] text-black font-bold text-xs hover:bg-[#FF853A] transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>IR A MI PANEL ASIGNADO</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
