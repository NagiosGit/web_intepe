import React from 'react';
import { Terminal } from 'lucide-react';

interface PageHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  breadcrumbCurrent?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  title,
  subtitle,
}) => {
  return (
    <div className="pt-32 pb-12 md:pt-36 md:pb-16 bg-[#0F172A] border-b border-white/10 relative overflow-hidden cyber-grid">
      
      {/* Decorative Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#FF7120]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-[400px] h-[250px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 text-center relative z-10">
        
        {/* Optional Badge */}
        {badge && (
          <div>
            <span className="tech-badge">
              <Terminal className="w-3 h-3 text-[#FF7120]" />
              <span>{badge}</span>
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight max-w-4xl mx-auto font-['Space_Grotesk'] leading-[1.1]">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal font-sans pt-1">
            {subtitle}
          </p>
        )}

      </div>
    </div>
  );
};
