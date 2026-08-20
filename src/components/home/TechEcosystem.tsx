import React from 'react';
import { 
  Server, 
  Cloud, 
  Cpu, 
  Database, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

export const TechEcosystem: React.FC = () => {
  const categories = [
    {
      category: 'Sistemas & Virtualización',
      icon: Server,
      techs: [
        { name: 'Windows Server', desc: 'Active Directory, File Server & DNS', badge: 'Microsoft' },
        { name: 'Linux Server', desc: 'Ubuntu Server, Debian & Rocky Linux', badge: 'Open Source' },
        { name: 'Proxmox & VMware', desc: 'Virtualización de alta disponibilidad', badge: 'Virtualization' },
      ]
    },
    {
      category: 'Cloud & Colaboración',
      icon: Cloud,
      techs: [
        { name: 'Google Workspace', desc: 'Gmail corporativo, Drive & Meet', badge: 'Cloud Suite' },
        { name: 'Microsoft 365', desc: 'Office 365, Teams & SharePoint', badge: 'Productivity' },
        { name: 'Cloud Backups', desc: 'Copias cifradas y replicación remota', badge: 'Security' },
      ]
    },
    {
      category: 'Hardware & Redes',
      icon: Cpu,
      techs: [
        { name: 'Dell & HPE', desc: 'Servidores PowerEdge y almacenamiento', badge: 'Enterprise HW' },
        { name: 'Cisco & MikroTik', desc: 'Routers, switches y enlaces VPN', badge: 'Networking' },
        { name: 'Ubiquiti UniFi', desc: 'Wi-Fi corporativo de alta densidad', badge: 'Wireless' },
      ]
    },
    {
      category: 'Software & Bases de Datos',
      icon: Database,
      techs: [
        { name: 'PostgreSQL & MySQL', desc: 'Bases de datos estructuradas seguras', badge: 'Relational DB' },
        { name: 'React & Node.js', desc: 'Desarrollo web moderno escalable', badge: 'Frontend & API' },
        { name: 'Python & Automation', desc: 'Scripts de automatización e integración', badge: 'Integration' },
      ]
    }
  ];

  return (
    <section className="py-24 bg-[#FDFBF7] border-b border-[#E8E2D5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#F5F0E6] border border-[#E8E2D5] text-stone-800 text-xs font-semibold shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B86B42]"></span>
            <span>Ecosistema & Marcas Compatibles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-950 tracking-tight">
            Tecnologías líderes en las que su empresa puede confiar
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Implementamos, configuramos y administramos plataformas globales y estándares abiertos con ingeniería certificada y soporte continuo.
          </p>
        </div>

        {/* 4 Categorized Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E2D5] shadow-xs hover:-translate-y-1 hover:shadow-md hover:border-[#B86B42]/50 transition-all duration-300 flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-center space-x-3 border-b border-[#F5F0E6] pb-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF6EE] border border-[#E8E2D5] flex items-center justify-center text-stone-800 group-hover:bg-[#1F2923] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-stone-900 leading-snug">{cat.category}</h3>
                      <span className="text-[10px] text-stone-500 font-medium">Estándar Empresarial</span>
                    </div>
                  </div>

                  {/* Tech Items List */}
                  <div className="space-y-3">
                    {cat.techs.map((t, tIdx) => (
                      <div key={tIdx} className="p-3 rounded-2xl bg-[#FDFBF7] border border-[#E8E2D5] space-y-1 hover:bg-[#FAF6EE] transition-colors">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-stone-900">{t.name}</span>
                          <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-white text-stone-600 border border-[#E8E2D5]">
                            {t.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 leading-tight">
                          {t.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center space-x-1.5 text-[11px] text-[#B86B42] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Soporte e integración oficial</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Confidence Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-[#FAF6EE] border border-[#E8E2D5] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#E8E2D5] flex items-center justify-center text-[#B86B42] shrink-0 shadow-2xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-stone-900 block font-bold text-xs sm:text-sm">¿Su empresa utiliza otro software o infraestructura específica?</strong>
              <span className="text-stone-500">Nos adaptamos a sus sistemas actuales sin forzar migraciones innecesarias ni compras obligatorias.</span>
            </div>
          </div>
          <a
            href="#contacto"
            className="shrink-0 font-bold text-stone-900 hover:text-[#B86B42] bg-white px-4 py-2.5 rounded-xl border border-[#E8E2D5] hover:bg-[#FDFBF7] transition-all shadow-2xs"
          >
            Consultar compatibilidad →
          </a>
        </div>

      </div>
    </section>
  );
};
