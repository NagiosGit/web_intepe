import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import { 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  ArrowLeft,
  KeyRound,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const UpdatePasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim()) {
      setErrorMsg('Por favor ingrese su nueva contraseña.');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMsg('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('Las contraseñas no coinciden. Por favor verifíquelas.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      await authService.updatePassword(newPassword);
      setSuccess(true);
      setTimeout(() => {
        navigate('/help-desk/login');
      }, 3000);
    } catch (err: any) {
      console.error('Password update error:', err);
      setErrorMsg(err?.message || 'No fue posible actualizar la contraseña. El enlace puede haber expirado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080B0E] text-slate-100 flex flex-col justify-center py-10 sm:px-6 lg:px-8 relative overflow-hidden cyber-grid">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF7120]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        
        {/* Back Link */}
        <div className="mb-5 text-center">
          <Link 
            to="/help-desk/login" 
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-[#FF7120] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al Inicio de Sesión</span>
          </Link>
        </div>

        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center gap-3 mb-1">
            <div className="relative p-2.5 rounded-xl bg-[#0D1219] border border-white/10 shadow-[0_0_25px_rgba(255,113,32,0.25)]">
              <div className="hud-corner-tl"></div>
              <div className="hud-corner-br"></div>
              <KeyRound className="w-7 h-7 text-[#FF7120]" />
            </div>
            <div className="text-left">
              <div className="text-xl font-black text-white font-['Space_Grotesk'] tracking-tight">
                INTEPE <span className="text-[#FF7120]">S.A.S.</span>
              </div>
              <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                // SEGURIDAD DE ACCESO
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white font-['Space_Grotesk'] tracking-tight">
            Restablecer Contraseña
          </h1>
          <p className="text-xs font-mono text-slate-400 max-w-xs mx-auto">
            Ingrese su nueva contraseña de acceso para su cuenta en la Mesa de Ayuda.
          </p>
        </div>

        {/* Form Card */}
        <div className="mt-8 bg-[#0D1219]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 hud-box shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div className="hud-corner-tl"></div>
          <div className="hud-corner-br"></div>

          {success ? (
            <div className="text-center space-y-4 py-4 font-mono">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="text-base font-bold text-white font-['Space_Grotesk']">
                ¡Contraseña Actualizada con Éxito!
              </div>
              <p className="text-xs text-slate-300">
                Su nueva contraseña ha sido guardada. Redirigiendo al inicio de sesión...
              </p>
              <Link
                to="/help-desk/login"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FF7120] text-black font-['Space_Grotesk'] font-bold text-xs hover:bg-[#FF853A] transition-all"
              >
                <span>Ir al Inicio de Sesión Ahora</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-xs font-mono text-red-300">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Nueva Contraseña <span className="text-[#FF7120]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-[#05070A]/80 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#FF7120] focus:ring-1 focus:ring-[#FF7120]/30 transition-all placeholder:text-slate-600"
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

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Confirmar Nueva Contraseña <span className="text-[#FF7120]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repita su nueva contraseña"
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-[#05070A]/80 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#FF7120] focus:ring-1 focus:ring-[#FF7120]/30 transition-all placeholder:text-slate-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#FF7120] text-black font-['Space_Grotesk'] font-bold text-sm hover:bg-[#FF853A] focus:outline-none transition-all shadow-[0_0_20px_rgba(255,113,32,0.4)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <span className="font-mono text-xs">Guardando nueva contraseña...</span>
                ) : (
                  <>
                    <span>ACTUALIZAR CONTRASEÑA</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
};
