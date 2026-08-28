import React, { useState, useEffect } from 'react';
import { technicianService } from '../../../services/technicianService';
import { authService } from '../../../services/authService';
import { HelpDeskLayout } from '../../../components/helpdesk/HelpDeskLayout';
import { 
  Wrench, 
  PlusCircle, 
  Search, 
  X, 
  RefreshCw,
  UserCheck,
  Edit3,
  CheckCircle2,
  KeyRound
} from 'lucide-react';
import type { Profile, CreateTechnicianInput } from '../../../types/helpdesk';

export const AdminTechniciansPage: React.FC = () => {
  const [technicians, setTechnicians] = useState<(Profile & { assigned_tickets_count?: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal: New Technician
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTech, setNewTech] = useState<CreateTechnicianInput>({
    full_name: '',
    email: '',
    phone: '',
    specialty: 'Hardware & Redes',
    password: '',
  });
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [createdCredentials, setCreatedCredentials] = useState<{ email: string; pass: string } | null>(null);

  // Modal: Edit Technician
  const [editingTech, setEditingTech] = useState<Profile | null>(null);
  const [editForm, setEditForm] = useState<{
    full_name: string;
    email: string;
    phone: string;
    specialty: string;
    status: 'ACTIVO' | 'INACTIVO';
  }>({
    full_name: '',
    email: '',
    phone: '',
    specialty: 'Hardware & Redes',
    status: 'ACTIVO',
  });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState<string | null>(null);
  const [resetPasswordError, setResetPasswordError] = useState<string | null>(null);

  const handleSendPasswordReset = async (email: string) => {
    setResetPasswordLoading(true);
    setResetPasswordError(null);
    setResetPasswordSuccess(null);
    try {
      await authService.resetPassword(email);
      setResetPasswordSuccess(`Se ha enviado un correo con el enlace de restablecimiento a ${email}.`);
    } catch (err: any) {
      console.error('Error sending reset email:', err);
      setResetPasswordError(err?.message || 'No fue posible enviar el correo de recuperación.');
    } finally {
      setResetPasswordLoading(false);
    }
  };

  const loadTechnicians = async () => {
    setLoading(true);
    try {
      const data = await technicianService.getTechnicians(false);
      setTechnicians(data);
    } catch (err) {
      console.error('Error fetching technicians:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTechnicians();
  }, []);

  const handleCreateTechnician = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTech.full_name.trim() || !newTech.email.trim()) {
      setModalError('Nombre y correo electrónico son obligatorios.');
      return;
    }

    setModalLoading(true);
    setModalError(null);

    try {
      const generatedPass = newTech.password || 'IntepeTech' + Math.floor(1000 + Math.random() * 9000) + '!';
      await technicianService.createTechnician({
        ...newTech,
        password: generatedPass,
      });

      setCreatedCredentials({
        email: newTech.email,
        pass: generatedPass,
      });

      await loadTechnicians();
    } catch (err: any) {
      setModalError(err?.message || 'Error al registrar el técnico.');
    } finally {
      setModalLoading(false);
    }
  };

  const handleOpenEdit = (tech: Profile) => {
    setEditingTech(tech);
    setEditForm({
      full_name: tech.full_name,
      email: tech.email,
      phone: tech.phone || '',
      specialty: tech.specialty || 'Hardware & Redes',
      status: tech.status,
    });
    setEditError(null);
    setResetPasswordSuccess(null);
    setResetPasswordError(null);
  };

  const handleUpdateTechnician = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTech || !editForm.full_name.trim() || !editForm.email.trim()) {
      setEditError('El nombre y el correo electrónico son obligatorios.');
      return;
    }

    setEditLoading(true);
    setEditError(null);

    try {
      await technicianService.updateTechnician(editingTech.id, editForm);
      setEditingTech(null);
      await loadTechnicians();
    } catch (err: any) {
      setEditError(err?.message || 'Error al actualizar el técnico.');
    } finally {
      setEditLoading(false);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: 'ACTIVO' | 'INACTIVO') => {
    const nextStatus = currentStatus === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
    try {
      await technicianService.toggleTechnicianStatus(id, nextStatus);
      await loadTechnicians();
    } catch (err) {
      console.error('Error changing technician status:', err);
    }
  };

  const filteredTechs = technicians.filter(t => 
    t.full_name.toLowerCase().includes(search.toLowerCase()) ||
    t.email.toLowerCase().includes(search.toLowerCase()) ||
    (t.specialty && t.specialty.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <HelpDeskLayout
      title="Técnicos de Soporte INTEPE"
      subtitle="Administración del equipo de ingenieros y especialistas de soporte técnico."
      actions={
        <button
          onClick={() => {
            setCreatedCredentials(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#FF7120] text-black font-['Space_Grotesk'] font-bold text-xs hover:bg-[#FF853A] transition-all shadow-[0_0_20px_rgba(255,113,32,0.4)] cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ NUEVO TÉCNICO</span>
        </button>
      }
    >
      {/* 1. Search Bar */}
      <div className="bg-[#0D1219]/90 backdrop-blur-xl border border-white/10 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 hud-box shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="hud-corner-tl"></div>
        <div className="hud-corner-br"></div>
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre, especialidad o correo..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#05070A]/80 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#FF7120] focus:ring-1 focus:ring-[#FF7120]/30 transition-colors"
          />
        </div>

        <button
          onClick={loadTechnicians}
          className="text-xs font-mono text-slate-400 hover:text-cyan-400 flex items-center gap-1.5 self-end sm:self-auto cursor-pointer transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
          <span>Actualizar ({technicians.length} técnicos)</span>
        </button>
      </div>

      {/* 2. Technicians Table */}
      <div className="bg-[#0D1219]/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hud-box shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
        <div className="hud-corner-tl"></div>
        <div className="hud-corner-br"></div>
        {loading ? (
          <div className="py-20 text-center text-xs font-mono text-slate-400 space-y-3">
            <div className="w-8 h-8 border-2 border-[#FF7120] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <span>Cargando equipo técnico...</span>
          </div>
        ) : filteredTechs.length === 0 ? (
          <div className="py-16 text-center space-y-3 p-4">
            <Wrench className="w-10 h-10 text-slate-600 mx-auto" />
            <div className="text-sm font-bold text-white font-['Space_Grotesk']">
              No hay técnicos registrados
            </div>
            <p className="text-xs font-mono text-slate-400 max-w-sm mx-auto">
              Haga clic en "+ NUEVO TÉCNICO" para habilitar el acceso a un miembro del equipo de soporte.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.04] text-slate-300 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Nombre Completo</th>
                  <th className="py-3 px-4">Correo Corporativo</th>
                  <th className="py-3 px-4">Teléfono</th>
                  <th className="py-3 px-4">Especialidad Principal</th>
                  <th className="py-3 px-4">Carga de Trabajo</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredTechs.map((tech) => (
                  <tr key={tech.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-sans font-bold text-white whitespace-nowrap">
                      {tech.full_name}
                    </td>
                    <td className="py-3.5 px-4 text-cyan-400 whitespace-nowrap">
                      {tech.email}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                      {tech.phone || '--'}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded bg-white/5 text-slate-300 border border-white/10 text-[11px] font-sans">
                        {tech.specialty || 'Soporte General'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold text-[11px]">
                        {tech.assigned_tickets_count || 0} asignados
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        tech.status === 'ACTIVO'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-red-500/15 text-red-400 border border-red-500/30'
                      }`}>
                        {tech.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                      <button
                        onClick={() => handleOpenEdit(tech)}
                        className="px-2.5 py-1 rounded bg-white/5 hover:bg-[#FF7120] hover:text-black text-slate-300 font-bold text-[11px] border border-white/10 transition-colors cursor-pointer inline-flex items-center gap-1"
                        title="Editar Técnico"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Editar</span>
                      </button>
                      <button
                        onClick={() => handleToggleStatus(tech.id, tech.status)}
                        className={`px-3 py-1 rounded text-[11px] font-bold border transition-colors cursor-pointer ${
                          tech.status === 'ACTIVO'
                            ? 'bg-white/5 border-white/10 text-slate-400 hover:text-red-400'
                            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        }`}
                      >
                        {tech.status === 'ACTIVO' ? 'Desactivar' : 'Activar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal 1: New Technician */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0D1219] border border-white/15 rounded-2xl max-w-md w-full p-6 space-y-4 hud-box shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white font-['Space_Grotesk'] flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[#FF7120]" />
                <span>Registrar Técnico de INTEPE</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {createdCredentials ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 font-mono text-xs">
                <UserCheck className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="text-white font-bold">¡Técnico registrado exitosamente!</div>
                <div className="text-slate-300 text-left bg-black/40 p-3 rounded space-y-1">
                  <div><strong>Correo:</strong> {createdCredentials.email}</div>
                  <div><strong>Contraseña Temporal:</strong> <span className="text-[#FF7120] font-bold">{createdCredentials.pass}</span></div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded bg-emerald-500 text-black font-bold text-xs cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <form onSubmit={handleCreateTechnician} className="space-y-4">
                {modalError && (
                  <div className="p-2.5 rounded bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono">
                    {modalError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                    Nombre Completo <span className="text-[#FF7120]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newTech.full_name}
                    onChange={(e) => setNewTech({ ...newTech, full_name: e.target.value })}
                    placeholder="Ej: Ing. Carlos Pérez"
                    className="w-full px-3 py-2 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#FF7120]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                    Correo Electrónico de Acceso <span className="text-[#FF7120]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={newTech.email}
                    onChange={(e) => setNewTech({ ...newTech, email: e.target.value })}
                    placeholder="carlos.perez@intepe.net"
                    className="w-full px-3 py-2 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#FF7120]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                    Teléfono de Contacto
                  </label>
                  <input
                    type="text"
                    value={newTech.phone || ''}
                    onChange={(e) => setNewTech({ ...newTech, phone: e.target.value })}
                    placeholder="Ej: 3101234567"
                    className="w-full px-3 py-2 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#FF7120]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                    Especialidad Técnica
                  </label>
                  <select
                    value={newTech.specialty || 'Hardware & Redes'}
                    onChange={(e) => setNewTech({ ...newTech, specialty: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Hardware & Diagnóstico">Hardware & Diagnóstico</option>
                    <option value="Redes, Firewalls & VPN">Redes, Firewalls & VPN</option>
                    <option value="Servidores Windows & Linux">Servidores Windows & Linux</option>
                    <option value="Google Workspace & Microsoft 365">Google Workspace & Microsoft 365</option>
                    <option value="Seguridad Informática & Antivirus">Seguridad Informática & Antivirus</option>
                    <option value="Desarrollo & Bases de Datos">Desarrollo & Bases de Datos</option>
                    <option value="Soporte General Nivel 1 & 2">Soporte General Nivel 1 & 2</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                    Contraseña Inicial (Opcional)
                  </label>
                  <input
                    type="password"
                    value={newTech.password || ''}
                    onChange={(e) => setNewTech({ ...newTech, password: e.target.value })}
                    placeholder="Dejar vacía para generar automáticamente"
                    className="w-full px-3 py-2 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#FF7120]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded bg-white/5 text-slate-400 font-mono text-xs hover:text-white cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={modalLoading}
                    className="px-5 py-2 rounded bg-[#FF7120] text-black font-['Space_Grotesk'] font-bold text-xs hover:bg-[#FF853A] disabled:opacity-50 cursor-pointer shadow-[0_0_15px_rgba(255,113,32,0.3)]"
                  >
                    {modalLoading ? 'Registrando...' : 'REGISTRAR TÉCNICO'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Modal 2: Edit Technician */}
      {editingTech && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0D1219] border border-white/15 rounded-2xl max-w-md w-full p-6 space-y-4 hud-box shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                  Editar Técnico: {editingTech.full_name}
                </h3>
              </div>
              <button onClick={() => setEditingTech(null)} className="text-slate-500 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {editError && (
              <div className="p-2.5 rounded bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono">
                {editError}
              </div>
            )}

            <form onSubmit={handleUpdateTechnician} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                  Nombre Completo <span className="text-[#FF7120]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editForm.full_name}
                  onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#FF7120]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                  Correo Electrónico de Acceso <span className="text-[#FF7120]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  placeholder="tecnico@intepe.net"
                  className="w-full px-3 py-2 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#FF7120]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                  Teléfono de Contacto
                </label>
                <input
                  type="text"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  placeholder="Ej: 3101234567"
                  className="w-full px-3 py-2 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#FF7120]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                  Especialidad Técnica
                </label>
                <select
                  value={editForm.specialty}
                  onChange={(e) => setEditForm({ ...editForm, specialty: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                >
                  <option value="Hardware & Diagnóstico">Hardware & Diagnóstico</option>
                  <option value="Redes, Firewalls & VPN">Redes, Firewalls & VPN</option>
                  <option value="Servidores Windows & Linux">Servidores Windows & Linux</option>
                  <option value="Google Workspace & Microsoft 365">Google Workspace & Microsoft 365</option>
                  <option value="Seguridad Informática & Antivirus">Seguridad Informática & Antivirus</option>
                  <option value="Desarrollo & Bases de Datos">Desarrollo & Bases de Datos</option>
                  <option value="Soporte General Nivel 1 & 2">Soporte General Nivel 1 & 2</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                  Estado del Técnico
                </label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                >
                  <option value="ACTIVO">ACTIVO (Disponible para asignación de tickets)</option>
                  <option value="INACTIVO">INACTIVO (Fuera de servicio / No asignar)</option>
                </select>
              </div>

              {/* Password Recovery section */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-white block">Restablecimiento de Contraseña</span>
                    <span className="text-[10px] font-mono text-slate-400">Envía un enlace seguro para que el técnico defina su nueva clave</span>
                  </div>
                </div>

                {resetPasswordSuccess && (
                  <div className="p-2.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                    {resetPasswordSuccess}
                  </div>
                )}

                {resetPasswordError && (
                  <div className="p-2.5 rounded bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono">
                    {resetPasswordError}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => handleSendPasswordReset(editingTech.email)}
                  disabled={resetPasswordLoading}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#FF7120]/10 border border-[#FF7120]/30 text-[#FF7120] font-mono text-xs hover:bg-[#FF7120] hover:text-black font-bold transition-all disabled:opacity-50 cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>{resetPasswordLoading ? 'Enviando enlace...' : '📧 Enviar Enlace de Restablecimiento al Correo'}</span>
                </button>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingTech(null)}
                  className="px-4 py-2 rounded bg-white/5 text-slate-400 font-mono text-xs hover:text-white cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={editLoading}
                  className="flex items-center gap-1.5 px-5 py-2 rounded bg-cyan-500 text-black font-['Space_Grotesk'] font-bold text-xs hover:bg-cyan-400 disabled:opacity-50 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{editLoading ? 'Guardando...' : 'GUARDAR CAMBIOS'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </HelpDeskLayout>
  );
};
