import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface PageHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  breadcrumbCurrent: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  title,
  subtitle,
  breadcrumbCurrent,
}) => {
  return (
    <div className="pt-32 pb-14 md:pt-36 md:pb-16 bg-gradient-to-b from-[#EAF5FC] via-[#F7F9FC] to-[#F1F5F9] border-b border-[#D8E1EA] relative overflow-hidden">
      
      {/* Subtle decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0077C8]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#B86F4B]/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3.5 text-center relative z-10">
        
        {/* Breadcrumbs */}
        <nav className="inline-flex items-center space-x-2 text-xs text-[#64748B] mb-1 bg-white/80 backdrop-blur-xs px-3.5 py-1 rounded-full border border-[#D8E1EA] shadow-2xs">
          <Link to="/" className="hover:text-[#0077C8] flex items-center transition-colors">
            <Home className="w-3.5 h-3.5 mr-1 text-[#0077C8]" />
            <span>Inicio</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-[#D8E1EA]" />
          <span className="text-[#0B1F3A] font-semibold">{breadcrumbCurrent}</span>
        </nav>

        {/* Optional Badge */}
        {badge && (
          <div>
            <span className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#0077C8] bg-white px-3.5 py-1 rounded-full border border-[#D8E1EA] shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B86F4B]"></span>
              <span>{badge}</span>
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B1F3A] tracking-tight max-w-4xl mx-auto">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-sm sm:text-base text-[#243447] max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}

      </div>
    </div>
  );
};
