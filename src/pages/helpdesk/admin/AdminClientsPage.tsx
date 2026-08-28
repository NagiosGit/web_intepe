import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { clientService } from '../../../services/clientService';
import { HelpDeskLayout } from '../../../components/helpdesk/HelpDeskLayout';
import { 
  Building2, 
  PlusCircle, 
  Search, 
  X, 
  RefreshCw,
  Edit3,
  CheckCircle2
} from 'lucide-react';
import type { Client, CreateClientInput } from '../../../types/helpdesk';

export const AdminClientsPage: React.FC = () => {
  const [clients, setClients] = useState<(Client & { users_count?: number; active_tickets_count?: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal: New Client
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClient, setNewClient] = useState<CreateClientInput>({
    name: '',
    nit: '',
    email: '',
    phone: '',
  });
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  // Modal: Edit Client
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [editForm, setEditForm] = useState<{
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
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  const loadClients = async () => {
    setLoading(true);
    try {
      const data = await clientService.getClients();
      setClients(data);
    } catch (err) {
      console.error('Error fetching clients:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.name.trim()) {
      setModalError('El nombre de la empresa es obligatorio.');
      return;
    }

    setModalLoading(true);
    setModalError(null);

    try {
      await clientService.createClient(newClient);
      setIsModalOpen(false);
      setNewClient({ name: '', nit: '', email: '', phone: '' });
      await loadClients();
    } catch (err: any) {
      setModalError(err?.message || 'Error al crear la empresa.');
    } finally {
      setModalLoading(false);
    }
  };

  const handleOpenEdit = (client: Client) => {
    setEditingClient(client);
    setEditForm({
      name: client.name,
      nit: client.nit || '',
      email: client.email || '',
      phone: client.phone || '',
      status: client.status,
    });
    setEditError(null);
  };

  const handleUpdateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClient || !editForm.name.trim()) {
      setEditError('El nombre de la empresa es obligatorio.');
      return;
    }

    setEditLoading(true);
    setEditError(null);

    try {
      await clientService.updateClient(editingClient.id, editForm);
      setEditingClient(null);
      await loadClients();
    } catch (err: any) {
      setEditError(err?.message || 'Error al actualizar la empresa.');
    } finally {
      setEditLoading(false);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: 'ACTIVO' | 'INACTIVO') => {
    const nextStatus = currentStatus === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
    try {
      await clientService.updateClient(id, { status: nextStatus });
      await loadClients();
    } catch (err) {
      console.error('Error changing client status:', err);
    }
  };

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.internal_code.toLowerCase().includes(search.toLowerCase()) ||
    (c.nit && c.nit.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <HelpDeskLayout
      title="Gestión de Empresas Clientes"
      subtitle="Administración de cuentas corporativas autorizadas para acceder a la Mesa de Ayuda."
      actions={
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#FF7120] text-black font-['Space_Grotesk'] font-bold text-xs hover:bg-[#FF853A] transition-all shadow-[0_0_20px_rgba(255,113,32,0.4)] cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ NUEVA EMPRESA CLIENTE</span>
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
            placeholder="Buscar por código, nombre o NIT..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#05070A]/80 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#FF7120] focus:ring-1 focus:ring-[#FF7120]/30 transition-colors"
          />
        </div>

        <button
          onClick={loadClients}
          className="text-xs font-mono text-slate-400 hover:text-cyan-400 flex items-center gap-1.5 self-end sm:self-auto cursor-pointer transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
          <span>Actualizar ({clients.length} empresas)</span>
        </button>
      </div>

      {/* 2. Clients Table */}
      <div className="bg-[#0D1219]/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hud-box shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
        <div className="hud-corner-tl"></div>
        <div className="hud-corner-br"></div>
        {loading ? (
          <div className="py-20 text-center text-xs font-mono text-slate-400 space-y-3">
            <div className="w-8 h-8 border-2 border-[#FF7120] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <span>Cargando empresas clientes...</span>
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="py-16 text-center space-y-3 p-4">
            <Building2 className="w-10 h-10 text-slate-600 mx-auto" />
            <div className="text-sm font-bold text-white font-['Space_Grotesk']">
              No hay empresas registradas
            </div>
            <p className="text-xs font-mono text-slate-400 max-w-sm mx-auto">
              Haga clic en "+ NUEVA EMPRESA CLIENTE" para registrar la primera cuenta corporativa.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.04] text-slate-300 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Código</th>
                  <th className="py-3 px-4">Razón Social / Empresa</th>
                  <th className="py-3 px-4">NIT</th>
                  <th className="py-3 px-4">Contacto</th>
                  <th className="py-3 px-4">Usuarios</th>
                  <th className="py-3 px-4">Tickets Activos</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-cyan-400 whitespace-nowrap">
                      {client.internal_code}
                    </td>
                    <td className="py-3.5 px-4 font-sans font-bold text-white whitespace-nowrap">
                      {client.name}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                      {client.nit || '--'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 text-[11px] whitespace-nowrap">
                      <div>{client.email || '--'}</div>
                      <div className="text-slate-500 text-[10px]">{client.phone || ''}</div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10 text-[11px]">
                        {client.users_count || 0} usuario(s)
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-[#FF7120]/10 text-[#FF7120] border border-[#FF7120]/30 font-bold text-[11px]">
                        {client.active_tickets_count || 0} activos
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        client.status === 'ACTIVO'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-red-500/15 text-red-400 border border-red-500/30'
                      }`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                      <Link
                        to={`/admin/clientes/${client.id}`}
                        className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-black font-bold transition-all text-[11px]"
                      >
                        Usuarios & Detalle
                      </Link>
                      <button
                        onClick={() => handleOpenEdit(client)}
                        className="px-2 py-1 rounded bg-white/5 hover:bg-[#FF7120] hover:text-black text-slate-300 font-bold text-[11px] border border-white/10 transition-colors cursor-pointer inline-flex items-center gap-1"
                        title="Editar Empresa"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Editar</span>
                      </button>
                      <button
                        onClick={() => handleToggleStatus(client.id, client.status)}
                        className={`px-2 py-1 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                          client.status === 'ACTIVO'
                            ? 'bg-white/5 border-white/10 text-slate-400 hover:text-red-400'
                            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        }`}
                      >
                        {client.status === 'ACTIVO' ? 'Desactivar' : 'Activar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal: New Client */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0D1219] border border-white/15 rounded-2xl max-w-lg w-full p-6 space-y-4 hud-box shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#FF7120]" />
                <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                  Registrar Nueva Empresa Cliente
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-500 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {modalError && (
              <div className="p-2.5 rounded bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono">
                {modalError}
              </div>
            )}

            <form onSubmit={handleCreateClient} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                  Razón Social / Nombre de la Empresa <span className="text-[#FF7120]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  placeholder="Ej: Agroindustrial Penagos S.A.S."
                  className="w-full px-3 py-2 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#FF7120]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                  NIT / Identificación Tributaria
                </label>
                <input
                  type="text"
                  value={newClient.nit || ''}
                  onChange={(e) => setNewClient({ ...newClient, nit: e.target.value })}
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
                    value={newClient.email || ''}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    placeholder="contacto@empresa.com"
                    className="w-full px-3 py-2 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#FF7120]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                    Teléfono / Celular
                  </label>
                  <input
                    type="text"
                    value={newClient.phone || ''}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    placeholder="Ej: 3001234567"
                    className="w-full px-3 py-2 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#FF7120]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-white/5 text-slate-400 font-mono text-xs hover:text-white cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={modalLoading}
                  className="px-5 py-2 rounded-lg bg-[#FF7120] text-black font-['Space_Grotesk'] font-bold text-xs hover:bg-[#FF853A] disabled:opacity-50 cursor-pointer"
                >
                  {modalLoading ? 'Creando Empresa...' : 'GUARDAR EMPRESA'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Client */}
      {editingClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0D1219] border border-white/15 rounded-2xl max-w-lg w-full p-6 space-y-4 hud-box shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">
                  Editar {editingClient.internal_code}: {editingClient.name}
                </h3>
              </div>
              <button
                onClick={() => setEditingClient(null)}
                className="text-slate-500 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {editError && (
              <div className="p-2.5 rounded bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono">
                {editError}
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
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#FF7120]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                  NIT / Identificación Tributaria
                </label>
                <input
                  type="text"
                  value={editForm.nit}
                  onChange={(e) => setEditForm({ ...editForm, nit: e.target.value })}
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
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    placeholder="contacto@empresa.com"
                    className="w-full px-3 py-2 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#FF7120]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                    Teléfono / Celular
                  </label>
                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    placeholder="Ej: 3001234567"
                    className="w-full px-3 py-2 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#FF7120]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1">
                  Estado de la Empresa
                </label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg bg-[#05070A] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                >
                  <option value="ACTIVO">ACTIVO (Permitir radicar y consultar)</option>
                  <option value="INACTIVO">INACTIVO (Bloquear temporalmente)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingClient(null)}
                  className="px-4 py-2 rounded-lg bg-white/5 text-slate-400 font-mono text-xs hover:text-white cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={editLoading}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-cyan-500 text-black font-['Space_Grotesk'] font-bold text-xs hover:bg-cyan-400 disabled:opacity-50 cursor-pointer"
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
