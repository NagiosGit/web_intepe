import React from 'react';
import { 
  Server, 
  Cloud, 
  Cpu, 
  Database, 
  Terminal
} from 'lucide-react';

export const TechEcosystem: React.FC = () => {
  const categories = [
    {
      category: 'Sistemas & Virtualización',
      icon: Server,
      techs: [
        { name: 'Windows Server', desc: 'Active Directory, File Server & DNS', badge: 'Microsoft' },
        { name: 'Linux Server', desc: 'Ubuntu Server, Debian & Rocky Linux', badge: 'Linux' },
        { name: 'Proxmox & VMware', desc: 'Virtualización de alta disponibilidad', badge: 'Hypervisor' },
      ]
    },
    {
      category: 'Cloud & Colaboración',
      icon: Cloud,
      techs: [
        { name: 'Google Workspace', desc: 'Gmail corporativo, Drive & Meet', badge: 'Google Cloud' },
        { name: 'Microsoft 365', desc: 'Office 365, Teams & SharePoint', badge: 'Cloud Suite' },
        { name: 'Cloud Backups', desc: 'Copias cifradas y replicación remota', badge: 'Storage' },
      ]
    },
    {
      category: 'Hardware & Redes',
      icon: Cpu,
      techs: [
        { name: 'Dell & HPE', desc: 'Servidores PowerEdge y almacenamiento', badge: 'Hardware' },
        { name: 'Cisco & MikroTik', desc: 'Routers, switches y enlaces VPN', badge: 'Routing' },
        { name: 'Ubiquiti UniFi', desc: 'Wi-Fi corporativo de alta densidad', badge: 'Wireless' },
      ]
    },
    {
      category: 'Software & Bases de Datos',
      icon: Database,
      techs: [
        { name: 'PostgreSQL & MySQL', desc: 'Bases de datos relacionales seguras', badge: 'Databases' },
        { name: 'React & Node.js', desc: 'Desarrollo web moderno escalable', badge: 'Stack' },
        { name: 'Python & Automation', desc: 'Scripts de automatización e integración', badge: 'Automation' },
      ]
    }
  ];

  return (
    <section className="py-24 bg-[#080B0E] border-b border-white/10 relative overflow-hidden cyber-grid">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#FF7120]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="tech-badge">
            <Terminal className="w-3.5 h-3.5 text-[#FF7120]" />
            <span>ECOSISTEMA & PLATAFORMAS COMPATIBLES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Space_Grotesk']">
            Tecnologías <span className="text-[#FF7120]">Líderes</span> Integradas
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-sans">
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
                className="cyber-card rounded-lg p-6 sm:p-7 hud-box flex flex-col justify-between space-y-5 group"
              >
                <div className="hud-corner-tl"></div>
                <div className="hud-corner-br"></div>

                <div className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-center space-x-3 border-b border-white/10 pb-3.5">
                    <div className="w-9 h-9 rounded bg-[#FF7120]/10 border border-[#FF7120]/30 flex items-center justify-center text-[#FF7120] group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-[#FF7120] block uppercase font-bold">
                        [0{idx + 1} // DOMAIN]
                      </span>
                      <h3 className="font-bold text-sm text-white font-['Space_Grotesk'] leading-tight">
                        {cat.category}
                      </h3>
                    </div>
                  </div>

                  {/* Technology Items */}
                  <div className="space-y-3 pt-1">
                    {cat.techs.map((tech, tIdx) => (
                      <div key={tIdx} className="p-2.5 rounded bg-white/[0.02] border border-white/5 space-y-1 group/item hover:border-[#FF7120]/30 transition-colors">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-white font-['Space_Grotesk'] group-hover/item:text-[#FF853A] transition-colors">
                            {tech.name}
                          </span>
                          <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                            {tech.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-sans leading-snug">
                          {tech.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>COMPATIBILIDAD</span>
                  <span className="text-emerald-400 font-bold">100% SOPORTADO</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
