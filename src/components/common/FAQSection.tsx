import React, { useState } from 'react';
import { faqData } from '../../data/faqData';
import { ChevronDown, ChevronUp, Terminal } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-[#080B0E] border-b border-white/10 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FF7120]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="tech-badge">
            <Terminal className="w-3.5 h-3.5 text-[#FF7120]" />
            <span>BASE DE CONOCIMIENTO TI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-['Space_Grotesk']">
            Preguntas <span className="text-[#FF7120]">Frecuentes</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Aspectos clave sobre la contratación, cobertura, SLAs y modalidades de atención de INTEPE S.A.S.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;
            const formattedNum = String(idx + 1).padStart(2, '0');
            return (
              <div
                key={idx}
                className={`cyber-card rounded-md border transition-all duration-200 overflow-hidden hud-box ${
                  isOpen 
                    ? 'border-[#FF7120]/60 bg-[#141C27]' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {isOpen && (
                  <>
                    <div className="hud-corner-tl"></div>
                    <div className="hud-corner-br"></div>
                  </>
                )}
                
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between space-x-4 focus:outline-none group"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#FF7120]">
                      [{formattedNum}]
                    </span>
                    <span className={`font-bold text-sm sm:text-base transition-colors font-['Space_Grotesk'] ${
                      isOpen ? 'text-[#FF853A]' : 'text-slate-200 group-hover:text-white'
                    }`}>
                      {item.question}
                    </span>
                  </div>
                  <div className={`p-1.5 rounded bg-white/5 shrink-0 transition-colors ${
                    isOpen ? 'text-[#FF7120] bg-[#FF7120]/10' : 'text-slate-400'
                  }`}>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-white/5 font-sans pl-11">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
