import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowLeft,
  KeyRound
} from 'lucide-react';

export const HelpDeskLoginPage: React.FC = () => {
  const { user, profile, login, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Password Recovery state
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);

  // If already logged in, redirect automatically
  useEffect(() => {
    if (user && profile && !authLoading) {
      if (profile.role === 'ADMIN_INTEPE') {
        navigate('/admin/help-desk', { replace: true });
      } else if (profile.role === 'TECNICO_INTEPE') {
        navigate('/tecnico', { replace: true });
      } else {
        navigate('/help-desk', { replace: true });
      }
    }
  }, [user, profile, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Por favor ingrese su correo electrónico y contraseña.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      await login(email, password);
      // AuthProvider state change will trigger navigation
    } catch (err: any) {
      console.error('Login error:', err);
      if (err?.message?.includes('Invalid login credentials')) {
        setErrorMsg('Credenciales inválidas. Verifique su correo y contraseña.');
      } else if (err?.message?.includes('Email not confirmed')) {
        setErrorMsg('El correo electrónico no ha sido confirmado.');
      } else {
        setErrorMsg(err?.message || 'No fue posible iniciar sesión. Verifique su conexión.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) {
      setResetError('Por favor ingrese su correo.');
      return;
    }

    setResetLoading(true);
    setResetError(null);

    try {
      await authService.resetPassword(resetEmail);
      setResetSuccess(true);
    } catch (err: any) {
      setResetError(err?.message || 'No fue posible enviar el enlace de recuperación.');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col justify-center py-10 sm:px-6 lg:px-8 relative overflow-hidden cyber-grid">
      
      {/* Background Ambience Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF7120]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        
        {/* Brand Header with Official HelpDesk Round Logo */}
        <div className="text-center space-y-4">
          <Link to="/" className="inline-block group mb-1" title="Ir al sitio web principal">
            <div className="relative inline-flex items-center justify-center p-1.5 rounded-full bg-gradient-to-b from-cyan-500/30 via-transparent to-[#FF7120]/30 shadow-[0_0_40px_rgba(0,229,255,0.3)] group-hover:shadow-[0_0_55px_rgba(0,229,255,0.5)] transition-all duration-300">
              <img 
                src="/logo/logoRedondo_helpdesk.png" 
                alt="Mesa de Ayuda INTEPE" 
                className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-full transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-['Space_Grotesk'] tracking-tight">
              Mesa de Ayuda <span className="text-[#FF7120]">INTEPE</span>
            </h1>
            <p className="text-xs font-mono text-slate-300 max-w-xs mx-auto mt-1">
              Ingreso seguro a la plataforma corporativa
            </p>
          </div>
        </div>
      </div>

      {/* Login Card */}
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-[#1E293B]/95 backdrop-blur-xl py-7 px-6 sm:px-9 rounded-2xl border border-white/15 shadow-[0_25px_50px_rgba(0,0,0,0.5)] hud-box">
          <div className="hud-corner-tl"></div>
          <div className="hud-corner-br"></div>

          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-red-300 text-xs font-mono">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1.5">
                Correo Electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@empresa.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#FF7120] focus:ring-1 focus:ring-[#FF7120] transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase">
                  Contraseña
                </label>
                <button
                  type="button"
                  onClick={() => setIsResetModalOpen(true)}
                  className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  ¿Olvidó su contraseña?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#FF7120] focus:ring-1 focus:ring-[#FF7120] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#FF7120] text-black font-['Space_Grotesk'] font-bold text-sm hover:bg-[#FF853A] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(255,113,32,0.4)] cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                    <span>INICIANDO SESIÓN...</span>
                  </>
                ) : (
                  <>
                    <span>INICIAR SESIÓN</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>

          {/* Access Policy Notice */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <p className="text-[11px] font-mono text-slate-400 leading-relaxed">
              🔒 El acceso a la Mesa de Ayuda es exclusivo para clientes previamente registrados y personal autorizado de <strong className="text-white">INTEPE S.A.S.</strong>
            </p>
          </div>

        </div>

        {/* Back Link at Bottom */}
        <div className="mt-6 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-[#FF7120] hover:underline transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a www.intepe.net</span>
          </Link>
        </div>
      </div>

      {/* Password Reset Modal */}
      {isResetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0D1219] border border-white/15 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
            <div className="flex items-center gap-2.5 text-cyan-400">
              <KeyRound className="w-5 h-5" />
              <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                Recuperación de Contraseña
              </h3>
            </div>

            {resetSuccess ? (
              <div className="space-y-4 text-center py-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <p className="text-xs font-mono text-slate-300">
                  Hemos enviado un enlace de restablecimiento a <strong>{resetEmail}</strong>. Por favor revise su bandeja de entrada.
                </p>
                <button
                  onClick={() => {
                    setIsResetModalOpen(false);
                    setResetSuccess(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-white/10 text-white font-mono text-xs hover:bg-white/20"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-3">
                <p className="text-xs text-slate-400 font-mono">
                  Ingrese su correo electrónico corporativo registrado para recibir el enlace de cambio de contraseña.
                </p>

                {resetError && (
                  <div className="p-2.5 rounded bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono">
                    {resetError}
                  </div>
                )}

                <input
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="usuario@empresa.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsResetModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-white/5 text-slate-400 font-mono text-xs hover:text-white"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-mono font-bold text-xs hover:bg-cyan-400 disabled:opacity-50"
                  >
                    {resetLoading ? 'Enviando...' : 'Enviar Enlace'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
