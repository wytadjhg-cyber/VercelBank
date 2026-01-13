
import React, { useState } from 'react';
import { X, ChevronRight, CreditCard, ShieldCheck, Truck, ArrowLeft, Check } from 'lucide-react';
import AIProductImage from './AIProductImage.tsx';

interface PurchaseFlowProps {
  onClose: () => void;
  onComplete: () => void;
  productImage: string;
}

const PurchaseFlow: React.FC<PurchaseFlowProps> = ({ onClose, onComplete }) => {
  const [step, setStep] = useState<'model' | 'checkout'>('model');
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const UNIT_PRICE = 69.99;

  const models = [
    { series: "iPhone 16 Series", variants: ["16", "16 Plus", "16 Pro", "16 Pro Max"] },
    { series: "iPhone 15 Series", variants: ["15", "15 Plus", "15 Pro", "15 Pro Max"] },
    { series: "iPhone 14 Series", variants: ["14", "14 Plus", "14 Pro", "14 Pro Max"] },
    { series: "iPhone 13 Series", variants: ["13", "13 mini", "13 Pro", "13 Pro Max"] },
    { series: "iPhone 12 Series", variants: ["12", "12 mini", "12 Pro", "12 Pro Max"] },
    { series: "iPhone 11 Series", variants: ["11", "11 Pro", "11 Pro Max"] },
    { series: "Classic", variants: ["iPhone X", "iPhone XR"] },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-8 animate-in fade-in duration-500">
      <div className="absolute inset-0 bg-black/98 backdrop-blur-3xl" onClick={onClose} />
      
      <div className="relative w-full max-w-7xl h-full max-h-[900px] bg-zinc-950 md:rounded-[3rem] border border-white/10 shadow-[0_0_150px_rgba(0,0,0,1)] overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Product Visual - EXCLUSIVE HIGH FIDELITY DISPLAY */}
        <div className="hidden md:flex flex-1 bg-[#020202] relative flex-col items-center justify-center overflow-hidden border-r border-white/5 group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent opacity-30"></div>
          
          <div className="relative w-full h-full flex items-center justify-center p-16">
            <AIProductImage className="w-full max-w-[400px]" />
          </div>

          <div className="absolute bottom-16 left-16 right-16 flex justify-between items-end z-10">
            <div className="space-y-3">
              <h3 className="text-5xl font-black uppercase tracking-tighter text-white">Vercel Core</h3>
              <div className="flex items-center gap-4">
                <span className="w-12 h-px bg-blue-600"></span>
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.6em]">Founders Fidelity Optics</p>
              </div>
            </div>
            <div className="text-right">
              <div className="w-16 h-16 rounded-full border border-blue-500/20 flex items-center justify-center bg-blue-500/5 backdrop-blur-xl">
                <ShieldCheck size={32} className="text-blue-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Step Logic */}
        <div className="flex-[1.3] flex flex-col h-full bg-zinc-950 overflow-hidden relative">
          <div className="p-10 md:p-14 border-b border-white/5 flex justify-between items-center bg-black/80 backdrop-blur-3xl sticky top-0 z-30">
            {step === 'checkout' ? (
              <button onClick={() => setStep('model')} className="flex items-center text-zinc-500 hover:text-white transition-colors group text-[10px] font-black uppercase tracking-[0.4em]">
                <ArrowLeft size={16} className="mr-3 group-hover:-translate-x-2 transition-transform" /> Device Select
              </button>
            ) : (
              <div className="flex flex-col">
                <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Choose Your Device</h2>
                <div className="flex gap-1.5 mt-3">
                  <div className="w-20 h-1 rounded-full bg-blue-600"></div>
                  <div className="w-10 h-1 rounded-full bg-zinc-800"></div>
                </div>
              </div>
            )}
            <button onClick={onClose} className="p-4 bg-white/5 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-all transform hover:rotate-90">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-10 md:p-14 scrollbar-hide">
            {step === 'model' ? (
              <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
                {models.map((group, idx) => (
                  <div key={idx} className="space-y-8">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-700 flex items-center gap-6">
                      {group.series}
                      <div className="h-px flex-1 bg-white/5"></div>
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {group.variants.map((variant) => (
                        <button
                          key={variant}
                          onClick={() => setSelectedModel(variant)}
                          className={`group relative py-8 px-4 rounded-[2rem] border text-[11px] font-black uppercase tracking-widest transition-all duration-500 ${
                            selectedModel === variant 
                            ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_50px_rgba(59,130,246,0.4)]' 
                            : 'bg-zinc-900/40 border-white/5 text-zinc-600 hover:border-white/20 hover:bg-zinc-800/80 hover:text-white'
                          }`}
                        >
                          {variant}
                          {selectedModel === variant && (
                            <div className="absolute -top-3 -right-3 bg-white text-blue-600 p-2 rounded-full shadow-2xl animate-in zoom-in">
                              <Check size={14} strokeWidth={4} />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="max-w-2xl mx-auto space-y-12 py-6 animate-in fade-in slide-in-from-right-10 duration-700">
                <div className="space-y-8">
                  <h3 className="text-[12px] font-black uppercase tracking-[0.5em] text-zinc-600">Logistics & Delivery</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" placeholder="First Name" className="w-full bg-zinc-900/50 border border-white/5 p-7 rounded-[1.5rem] focus:outline-none focus:border-blue-500 focus:bg-zinc-900 transition-all text-white placeholder:text-zinc-800 font-bold uppercase text-[11px] tracking-widest" />
                    <input type="text" placeholder="Last Name" className="w-full bg-zinc-900/50 border border-white/5 p-7 rounded-[1.5rem] focus:outline-none focus:border-blue-500 focus:bg-zinc-900 transition-all text-white placeholder:text-zinc-800 font-bold uppercase text-[11px] tracking-widest" />
                  </div>
                  <input type="email" placeholder="Contact Email" className="w-full bg-zinc-900/50 border border-white/5 p-7 rounded-[1.5rem] focus:outline-none focus:border-blue-500 focus:bg-zinc-900 transition-all text-white placeholder:text-zinc-800 font-bold uppercase text-[11px] tracking-widest" />
                  <input type="text" placeholder="Full Delivery Address" className="w-full bg-zinc-900/50 border border-white/5 p-7 rounded-[1.5rem] focus:outline-none focus:border-blue-500 focus:bg-zinc-900 transition-all text-white placeholder:text-zinc-800 font-bold uppercase text-[11px] tracking-widest" />
                </div>

                <div className="p-12 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-8">
                  <div className="flex justify-between items-center text-zinc-600 text-[11px] font-black uppercase tracking-[0.5em]">
                    <span>Precision Unit</span>
                    <span className="text-white">{selectedModel} Edition</span>
                  </div>
                  <div className="flex justify-between items-center text-5xl font-black pt-10 border-t border-white/10">
                    <span className="uppercase tracking-tighter text-white">Total</span>
                    <span className="text-white">${UNIT_PRICE.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-10 md:p-14 border-t border-white/5 bg-black/80 backdrop-blur-3xl sticky bottom-0 z-40">
            {step === 'model' ? (
              <button
                disabled={!selectedModel}
                onClick={() => setStep('checkout')}
                className={`w-full py-10 rounded-[2.5rem] font-black text-2xl uppercase tracking-[0.4em] transition-all duration-500 flex items-center justify-center group shadow-2xl ${
                  selectedModel
                  ? 'bg-white text-black hover:bg-zinc-200 hover:-translate-y-2' 
                  : 'bg-zinc-900 text-zinc-800 cursor-not-allowed opacity-50'
                }`}
              >
                Proceed <ChevronRight size={28} className="ml-6 group-hover:translate-x-3 transition-transform" />
              </button>
            ) : (
              <button
                onClick={onComplete}
                className="w-full py-10 bg-blue-600 hover:bg-blue-500 text-white font-black text-2xl rounded-[2.5rem] transition-all duration-500 shadow-[0_40px_80px_rgba(59,130,246,0.4)] uppercase tracking-[0.4em] hover:-translate-y-2 active:scale-95"
              >
                Authorize Payment
              </button>
            )}
            
            <div className="mt-10 flex justify-center gap-14 text-zinc-800 text-[10px] font-black uppercase tracking-[0.4em]">
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-blue-700" /> 
                <span>AES-256</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck size={18} className="text-blue-700" /> 
                <span>Expedited Priority</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseFlow;
