
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Which iPhone models is the Vercel Power Case compatible with?",
      answer: "Vercel supports modern iPhone models starting from the iPhone X and XR, through the iPhone 11, 12, 13, 14, and 15 series, all the way up to the latest iPhone 16 Pro Max."
    },
    {
      question: "What is the actual battery capacity?",
      answer: "Our LIEFOX-engineered power cases provide a massive 5000mAh to 6999mAh capacity, ensuring you have reliable power for even the longest days and most demanding usage."
    },
    {
      question: "Are the materials safe for daily use?",
      answer: "Yes. Our cases are made from high-grade ABS polymer and are verified to contain 'No High-Concern Chemicals' (المواد الكيميائية عالية القلق: لا أحد), making them completely safe for you and the environment."
    },
    {
      question: "Is the product certified for international use?",
      answer: "Absolutely. All our units carry the CE certification (شهادة CE), meeting strict European health, safety, and environmental protection standards for electronics."
    },
    {
      question: "Does it support fast charging?",
      answer: "Yes, our integrated technology supports optimized fast-charging delivery to your iPhone while maintaining thermal efficiency and battery health."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-zinc-950 scroll-mt-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-4xl font-bold mb-4 text-center tracking-tight">Support & FAQ</h2>
        <p className="text-center text-zinc-500 mb-12 uppercase tracking-widest text-[10px]">Everything you need to know</p>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="border border-white/5 rounded-2xl bg-zinc-900/20 overflow-hidden transition-all duration-300"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-lg font-medium text-white">{faq.question}</span>
                {openIndex === idx ? <ChevronUp size={20} className="text-blue-500" /> : <ChevronDown size={20} className="text-zinc-500" />}
              </button>
              {openIndex === idx && (
                <div className="p-6 pt-0 text-zinc-400 font-light leading-relaxed border-t border-white/5 animate-in slide-in-from-top-2">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
