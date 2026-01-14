
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
      question: "Is checkout secure?",
      answer: "Absolutely. We exclusively partner with PayPal for all payment processing. Whether you use your PayPal account or a credit card, your data is protected by PayPal's industry-leading encryption and 24/7 fraud monitoring."
    },
    {
      question: "Do you accept international credit cards?",
      answer: "Yes. Through our PayPal Advanced integration, we accept Visa, Mastercard, American Express, and Discover from almost any country worldwide."
    },
    {
      question: "What is the actual battery capacity?",
      answer: "Our LIEFOX-engineered power cases provide a massive 5000mAh to 6999mAh capacity, ensuring you have reliable power for even the longest days and most demanding usage."
    },
    {
      question: "Is the product certified?",
      answer: "Every Vercel Core unit carries full CE certification (شهادة CE), meeting strict international safety and environmental standards for lithium-polymer devices."
    },
    {
      question: "How fast is shipping?",
      answer: "Orders are processed within 24 hours. We use priority global logistics to ensure your Vercel unit arrives in 3-7 business days depending on your location."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-zinc-950 scroll-mt-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-4xl font-bold mb-4 text-center tracking-tight text-white">Support & FAQ</h2>
        <p className="text-center text-zinc-500 mb-12 uppercase tracking-widest text-[10px] font-black">Powered by PayPal Security</p>
        
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
                <span className="text-sm md:text-lg font-bold text-white uppercase tracking-tight">{faq.question}</span>
                {openIndex === idx ? <ChevronUp size={18} className="text-blue-500" /> : <ChevronDown size={18} className="text-zinc-600" />}
              </button>
              {openIndex === idx && (
                <div className="p-6 pt-0 text-zinc-400 font-light leading-relaxed border-t border-white/5 animate-in slide-in-from-top-2 text-sm">
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
