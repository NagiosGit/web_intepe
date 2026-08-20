import React, { useState } from 'react';
import { faqData } from '../../data/faqData';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-[#FAF6EE] border-b border-[#E8E2D5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white border border-[#E8E2D5] text-stone-800 text-xs font-semibold shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#B86B42]" />
            <span>Respuestas a Dudas Frecuentes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-950 tracking-tight">
            Preguntas Frecuentes sobre el Servicio TI
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Aspectos clave sobre la contratación, cobertura y modalidades de atención de INTEPE S.A.S.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-2xs ${
                  isOpen ? 'border-[#B86B42] ring-1 ring-[#B86B42]/20' : 'border-[#E8E2D5]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between space-x-4 focus:outline-none"
                >
                  <span className="font-bold text-sm sm:text-base text-stone-900">
                    {item.question}
                  </span>
                  <div className="p-1.5 rounded-xl bg-[#F5F0E6] text-[#B86B42] shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-stone-600 text-xs sm:text-sm leading-relaxed border-t border-[#F5F0E6]">
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
