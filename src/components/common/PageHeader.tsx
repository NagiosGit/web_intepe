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
    <div className="pt-32 pb-14 md:pt-36 md:pb-16 bg-gradient-to-b from-[#F5F0E6] via-[#FAF6EE] to-[#FDFBF7] border-b border-[#E8E2D5] relative overflow-hidden">
      
      {/* Decorative Warm Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FAF6EE] rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F5F0E6] rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3.5 text-center relative z-10">
        
        {/* Breadcrumbs */}
        <nav className="inline-flex items-center space-x-2 text-xs text-stone-600 mb-1 bg-white/80 backdrop-blur-xs px-3.5 py-1 rounded-full border border-[#E8E2D5] shadow-2xs">
          <Link to="/" className="hover:text-stone-950 flex items-center transition-colors">
            <Home className="w-3.5 h-3.5 mr-1 text-[#B86B42]" />
            <span>Inicio</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <span className="text-stone-900 font-semibold">{breadcrumbCurrent}</span>
        </nav>

        {/* Optional Badge */}
        {badge && (
          <div>
            <span className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-stone-800 bg-white px-3.5 py-1 rounded-full border border-[#E8E2D5] shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B86B42]"></span>
              <span>{badge}</span>
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-950 tracking-tight max-w-4xl mx-auto">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed font-normal">
            {subtitle}
          </p>
        )}

      </div>
    </div>
  );
};
