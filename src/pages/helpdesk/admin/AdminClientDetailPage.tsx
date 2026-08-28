import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { clientService } from '../../../services/clientService';
import { ticketService } from '../../../services/ticketService';
import { authService } from '../../../services/authService';
import { HelpDeskLayout } from '../../../components/helpdesk/HelpDeskLayout';
import { TicketStatusBadge } from '../../../components/helpdesk/TicketStatusBadge';
import { TicketPriorityBadge } from '../../../components/helpdesk/TicketPriorityBadge';
import { 
  Users, 
  PlusCircle, 
  ArrowLeft, 
  X, 
  UserCheck, 
  FileText,
  Edit3,
  Building2,
  CheckCircle2,
  KeyRound
} from 'lucide-react';
import type { Client, Profile, Ticket, CreateClientUserInput } from '../../../types/helpdesk';

export const AdminClientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [client, setClient] = useState<(Client & { users: Profile[] }) | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal: New User
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState<CreateClientUserInput>({
    client_id: id || '',
    full_name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [createdCredentials, setCreatedCredentials] = useState<{ email: string; pass: string } | null>(null);

  // Modal: Edit Client Company
  const [isEditClientModalOpen, setIsEditClientModalOpen] = useState(false);
  const [editClientForm, setEditClientForm] = useState<{
    name: string;
    nit: string;
    email: string;
    phone: string;
    status: 'ACTIVO' | 'INACTIVO';
  }>({
    name: '',
    nit: '',
    email: '',
    phone: '',
    status: 'ACTIVO',
  });
  const [editClientLoading, setEditClientLoading] = useState(false);
  const [editClientError, setEditClientError] = useState<string | null>(null);

  // Modal: Edit Client User
  const [editingUser, setEditingUser] = useState<Profile | null>(null);
  const [editUserForm, setEditUserForm] = useState<{
    full_name: string;
    email: string;
    phone: string;
    status: 'ACTIVO' | 'INACTIVO';
  }>({
    full_name: '',
    email: '',
    phone: '',
    status: 'ACTIVO',
  });
  const [editUserLoading, setEditUserLoading] = useState(false);
  const [editUserError, setEditUserError] = useState<string | null>(null);
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

  const loadData = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const [cliData, ticketsRes] = await Promise.all([
        clientService.getClientById(id),
        ticketService.getTickets({ client_id: id, pageSize: 20 }),
      ]);
      setClient(cliData);
      setTickets(ticketsRes.tickets);
      if (cliData) {
        setEditClientForm({
          name: cliData.name,
          nit: cliData.nit || '',
          email: cliData.email || '',
          phone: cliData.phone || '',
          status: cliData.status,
        });
      }
    } catch (err) {
      console.error('Error fetching client details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !newUser.full_name.trim() || !newUser.email.trim()) {
      setModalError('Nombre y correo son obligatorios.');
      return;
    }

    setModalLoading(true);
    setModalError(null);

    try {
      const generatedPass = newUser.password || 'Intepe' + Math.floor(1000 + Math.random() * 9000) + '!';
      await clientService.createClientUser({
        ...newUser,
        client_id: id,
        password: generatedPass,
      });

      setCreatedCredentials({
        email: newUser.email,
        pass: generatedPass,
      });

      await loadData();
    } catch (err: any) {
      setModalError(err?.message || 'Error al aprovisionar el usuario.');
    } finally {
      setModalLoading(false);
    }
  };

  const handleUpdateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !editClientForm.name.trim()) {
      setEditClientError('El nombre de la empresa es obligatorio.');
      return;
    }

    setEditClientLoading(true);
    setEditClientError(null);

    try {
      await clientService.updateClient(id, editClientForm);
      setIsEditClientModalOpen(false);
      await loadData();
    } catch (err: any) {
      setEditClientError(err?.message || 'Error al actualizar los datos de la empresa.');
    } finally {
      setEditClientLoading(false);
    }
  };

  const handleOpenEditUser = (user: Profile) => {
    setEditingUser(user);
    setEditUserForm({
      full_name: user.full_name,
      email: user.email,
      phone: user.phone || '',
      status: user.status,
    });
    setEditUserError(null);
    setResetPasswordSuccess(null);
    setResetPasswordError(null);
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser || !editUserForm.full_name.trim() || !editUserForm.email.trim()) {
      setEditUserError('El nombre y el correo electrónico son obligatorios.');
      return;
    }

    setEditUserLoading(true);
    setEditUserError(null);

    try {
      await clientService.updateClientUser(editingUser.id, editUserForm);
      setEditingUser(null);
      await loadData();
    } catch (err: any) {
      setEditUserError(err?.message || 'Error al actualizar el usuario.');
    } finally {
      setEditUserLoading(false);
    }
  };

  const handleToggleUserStatus = async (user: Profile) => {
    const nextStatus = user.status === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
    try {
      await clientService.updateClientUser(user.id, { status: nextStatus });
      await loadData();
    } catch (err) {
      console.error('Error toggling user status:', err);
    }
  };

  if (loading) {
    return (
      <HelpDeskLayout title="Cargando Empresa...">
        <div className="py-20 text-center text-xs font-mono text-slate-400 space-y-3">
          <div className="w-8 h-8 border-2 border-[#FF7120] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <span>Cargando ficha de cliente y usuarios autorizados...</span>
        </div>
      </HelpDeskLayout>
    );
  }

  if (!client) {
    return (
      <HelpDeskLayout title="Empresa No Encontrada">
        <div className="text-center py-12">
          <Link to="/admin/clientes" className="text-xs font-mono text-cyan-400">
            ← Volver a Empresas
          </Link>
        </div>
      </HelpDeskLayout>
    );
  }

  return (
    <HelpDeskLayout
      title={`${client.internal_code}: ${client.name}`}
      subtitle={`Ficha corporativa • NIT: ${client.nit || 'Sin registrar'}`}
      actions={
        <div className="flex items-center gap-2">
          <Link
            to="/admin/clientes"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 text-slate-300 hover:text-white font-mono text-xs border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a Empresas</span>
          </Link>
          <button
            onClick={() => {
              setCreatedCredentials(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FF7120] text-black font-['Space_Grotesk'] font-bold text-xs hover:bg-[#FF853A] cursor-pointer shadow-[0_0_15px_rgba(255,113,32,0.3)]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ CREAR USUARIO</span>
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Company Info */}
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-[#0D1219]/90 backdrop-blur-xl border border-white/10 hud-box space-y-4 text-xs font-mono shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
            <div className="hud-corner-tl"></div>
            <div className="hud-corner-br"></div>
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white font-['Space_Grotesk'] uppercase text-cyan-400 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                <span>Datos Corporativos</span>
              </h3>
              <button
                onClick={() => setIsEditClientModalOpen(true)}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-cyan-500 hover:text-black text-cyan-400 font-bold transition-all text-[11px] cursor-pointer"
                title="Editar Datos de la Empresa"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editar</span>
              </button>
            </div>

            <div className="space-y-2.5">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Razón Social:</span>
                <span className="text-white font-bold">{client.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Código Interno:</span>
                <span className="text-cyan-400 font-bold">{client.internal_code}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">NIT:</span>
                <span className="text-slate-300">{client.nit || '--'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Correo de Contacto:</span>
                <span className="text-slate-300">{client.email || '--'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Teléfono:</span>
                <span className="text-slate-300">{client.phone || '--'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Estado:</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  client.status === 'ACTIVO' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {client.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Center/Right Column: Users of this client & Tickets */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Users Table */}
          <div className="p-5 rounded-xl bg-[#0D1219]/90 backdrop-blur-xl border border-white/10 hud-box space-y-4 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
            <div className="hud-corner-tl"></div>
            <div className="hud-corner-br"></div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white font-['Space_Grotesk'] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#FF7120]" />
                <span>Usuarios Autorizados de la Empresa ({client.users.length})</span>
              </h3>
              <button
                onClick={() => {
                  setCreatedCredentials(null);
                  setIsModalOpen(true);
                }}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 cursor-pointer"
              >
                + Agregar Usuario
              </button>
            </div>

            {client.users.length === 0 ? (
              <div className="py-8 text-center text-xs font-mono text-slate-500">
                Esta empresa aún no tiene usuarios con acceso al Help Desk.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.04] text-slate-400 text-[10px] uppercase">
                      <th className="py-2.5 px-3">Nombre Completo</th>
                      <th className="py-2.5 px-3">Correo de Ingreso</th>
                      <th className="py-2.5 px-3">Teléfono</th>
                      <th className="py-2.5 px-3">Estado</th>
                      <th className="py-2.5 px-3 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {client.users.map((u) => (
                      <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-2.5 px-3 font-bold text-white whitespace-nowrap">{u.full_name}</td>
                        <td className="py-2.5 px-3 text-cyan-400 whitespace-nowrap">{u.email}</td>
                        <td className="py-2.5 px-3 text-slate-400 whitespace-nowrap">{u.phone || '--'}</td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            u.status === 'ACTIVO' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right whitespace-nowrap space-x-2">
                          <button
                            onClick={() => handleOpenEditUser(u)}
                            className="px-2.5 py-1 rounded bg-white/5 hover:bg-cyan-500 hover:text-black text-cyan-300 font-bold transition-all text-[11px] cursor-pointer inline-flex items-center gap-1"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Editar</span>
                          </button>
                          <button
                            onClick={() => handleToggleUserStatus(u)}
                            className={`px-2 py-1 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                              u.status === 'ACTIVO'
                                ? 'bg-white/5 border-white/10 text-slate-400 hover:text-red-400'
                                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                            }`}
                          >
                            {u.status === 'ACTIVO' ? 'Desactivar' : 'Activar'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Tickets of this client */}
          <div className="p-5 rounded-xl bg-[#0D1219]/90 backdrop-blur-xl border border-white/10 hud-box space-y-4 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
            <div className="hud-corner-tl"></div>
            <div className="hud-corner-br"></div>
            <h3 className="text-base font-bold text-white font-['Space_Grotesk'] flex items-center gap-2 pb-3 border-b border-white/10">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Historial de Solicitudes de {client.name} ({tickets.length})</span>
            </h3>

            {tickets.length === 0 ? (
              <div className="py-8 text-center text-xs font-mono text-slate-500">
                No hay tickets registrados por esta empresa.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-500 text-[10px] uppercase">
                      <th className="pb-2">Ticket</th>
                      <th className="pb-2">Asunto</th>
                      <th className="pb-2">Prioridad</th>
                      <th className="pb-2">Estado</th>
                      <th className="pb-2 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {tickets.map((t) => (
                      <tr key={t.id}>
                        <td className="py-2.5 font-bold text-cyan-400">{t.ticket_number}</td>
                        <td className="py-2.5 text-white max-w-xs truncate">{t.subject}</td>
                        <td className="py-2.5"><TicketPriorityBadge priority={t.priority} size="sm" /></td>
                        <td className="py-2.5"><TicketStatusBadge status={t.status} size="sm" /></td>
                        <td className="py-2.5 text-right">
                          <Link
                            to={`/help-desk/tickets/${t.id}`}
                            className="px-2.5 py-1 rounded bg-white/5 hover:bg-[#FF7120] hover:text-black font-bold text-[11px]"
                          >
                            Ver
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* MODAL 1: New Client User */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0D1219] border border-white/15 rounded-2xl max-w-md w-full p-6 space-y-4 hud-box shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white font-['Space_Grotesk'] flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-400" />
                <span>Crear Usuario para {client.name}</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {createdCredentials ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 font-mono text-xs">
                <UserCheck className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="text-white font-bold">¡Usuario creado exitosamente!</div>
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
              <form onSubmit={handleCreateUser} className="space-y-4">
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
                    value={newUser.full_name}
                    onChange={(e) => setNewUser({ ...newUser, full_name: e.target.value })}
                    placeholder="Ej: Ing. Carlos Gómez"
                    className="w-full px-3 py-2 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                    Correo Electrónico <span className="text-[#FF7120]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="carlos@empresa.com"
                    className="w-full px-3 py-2 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                    Teléfono / Celular
                  </label>
                  <input
                    type="text"
                    value={newUser.phone || ''}
                    onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    placeholder="3101234567"
                    className="w-full px-3 py-2 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                    Contraseña Inicial (Opcional - Se generará una si se deja vacía)
                  </label>
                  <input
                    type="password"
                    value={newUser.password || ''}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    placeholder="Dejar vacía para contraseña segura automática"
                    className="w-full px-3 py-2 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
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
                    className="px-5 py-2 rounded bg-cyan-500 text-black font-mono font-bold text-xs hover:bg-cyan-400 disabled:opacity-50 cursor-pointer"
                  >
                    {modalLoading ? 'Creando Usuario...' : 'CREAR USUARIO'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: Edit Client Company */}
      {isEditClientModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0D1219] border border-white/15 rounded-2xl max-w-lg w-full p-6 space-y-4 hud-box shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                  Editar Datos de {client.name}
                </h3>
              </div>
              <button
                onClick={() => setIsEditClientModalOpen(false)}
                className="text-slate-500 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {editClientError && (
              <div className="p-2.5 rounded bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono">
                {editClientError}
              </div>
            )}

            <form onSubmit={handleUpdateClient} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                  Razón Social / Nombre de la Empresa <span className="text-[#FF7120]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editClientForm.name}
                  onChange={(e) => setEditClientForm({ ...editClientForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#FF7120]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                  NIT / Identificación Tributaria
                </label>
                <input
                  type="text"
                  value={editClientForm.nit}
                  onChange={(e) => setEditClientForm({ ...editClientForm, nit: e.target.value })}
                  placeholder="Ej: 900.123.456-7"
                  className="w-full px-3 py-2 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#FF7120]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                    Correo Corporativo
                  </label>
                  <input
                    type="email"
                    value={editClientForm.email}
                    onChange={(e) => setEditClientForm({ ...editClientForm, email: e.target.value })}
                    placeholder="contacto@empresa.com"
                    className="w-full px-3 py-2 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#FF7120]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                    Teléfono de Contacto
                  </label>
                  <input
                    type="text"
                    value={editClientForm.phone}
                    onChange={(e) => setEditClientForm({ ...editClientForm, phone: e.target.value })}
                    placeholder="Ej: 3001234567"
                    className="w-full px-3 py-2 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#FF7120]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                  Estado Operativo
                </label>
                <select
                  value={editClientForm.status}
                  onChange={(e) => setEditClientForm({ ...editClientForm, status: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                >
                  <option value="ACTIVO">ACTIVO (Permitir radicar y consultar tickets)</option>
                  <option value="INACTIVO">INACTIVO (Bloquear temporalmente acceso)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsEditClientModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-white/5 text-slate-400 font-mono text-xs hover:text-white cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={editClientLoading}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-cyan-500 text-black font-['Space_Grotesk'] font-bold text-xs hover:bg-cyan-400 disabled:opacity-50 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{editClientLoading ? 'Guardando...' : 'GUARDAR CAMBIOS'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Edit Client User Profile */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0D1219] border border-white/15 rounded-2xl max-w-md w-full p-6 space-y-4 hud-box shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                  Editar Usuario: {editingUser.full_name}
                </h3>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="text-slate-500 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {editUserError && (
              <div className="p-2.5 rounded bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono">
                {editUserError}
              </div>
            )}

            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                  Nombre Completo <span className="text-[#FF7120]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editUserForm.full_name}
                  onChange={(e) => setEditUserForm({ ...editUserForm, full_name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                  Correo Electrónico de Acceso <span className="text-[#FF7120]">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={editUserForm.email}
                  onChange={(e) => setEditUserForm({ ...editUserForm, email: e.target.value })}
                  placeholder="usuario@empresa.com"
                  className="w-full px-3 py-2 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                  Teléfono / Celular
                </label>
                <input
                  type="text"
                  value={editUserForm.phone}
                  onChange={(e) => setEditUserForm({ ...editUserForm, phone: e.target.value })}
                  placeholder="Ej: 3101234567"
                  className="w-full px-3 py-2 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                  Estado del Usuario
                </label>
                <select
                  value={editUserForm.status}
                  onChange={(e) => setEditUserForm({ ...editUserForm, status: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                >
                  <option value="ACTIVO">ACTIVO (Permitir acceso y radicación)</option>
                  <option value="INACTIVO">INACTIVO (Bloquear inicio de sesión)</option>
                </select>
              </div>

              {/* Password Recovery section */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-white block">Restablecimiento de Contraseña</span>
                    <span className="text-[10px] font-mono text-slate-400">Si el usuario olvidó su clave, envíale un enlace para definir una nueva.</span>
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
                  onClick={() => handleSendPasswordReset(editingUser.email)}
                  disabled={resetPasswordLoading}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs hover:bg-cyan-500 hover:text-black font-bold transition-all disabled:opacity-50 cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>{resetPasswordLoading ? 'Enviando enlace...' : '📧 Enviar Enlace de Restablecimiento al Correo'}</span>
                </button>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-lg bg-white/5 text-slate-400 font-mono text-xs hover:text-white cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={editUserLoading}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#FF7120] text-black font-['Space_Grotesk'] font-bold text-xs hover:bg-[#FF853A] disabled:opacity-50 cursor-pointer shadow-[0_0_15px_rgba(255,113,32,0.3)]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{editUserLoading ? 'Guardando...' : 'GUARDAR CAMBIOS'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </HelpDeskLayout>
  );
};
