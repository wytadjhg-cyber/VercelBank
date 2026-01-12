
import React, { useState, useEffect } from 'react';
import { X, ChevronRight, CreditCard, ShieldCheck, Truck, ArrowLeft, Check, Sparkles, Zap } from 'lucide-react';

interface PurchaseFlowProps {
  onClose: () => void;
  onComplete: () => void;
}

const PurchaseFlow: React.FC<PurchaseFlowProps> = ({ onClose, onComplete }) => {
  const [step, setStep] = useState<'model' | 'checkout'>('model');
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [isVisualizing, setIsVisualizing] = useState(true);

  // This is the EXACT SAME realistic picture that will show everywhere.
  // Using a high-quality static asset ensures it works on Vercel perfectly.
  const REALISTIC_PRODUCT_IMAGE = "https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1200&auto=format&fit=crop";

  const UNIT_PRICE = 69.99;

  useEffect(() => {
    // Luxury transition delay to maintain the "Visualizing Core" brand vibe
    const timer = setTimeout(() => {
      setIsVisualizing(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

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
    <div className="fixed inset-0 z-[200] flex items-center justify-center animate-in fade-in duration-500 px-0 md:px-6">
      <div className="absolute inset-0 bg-black/98 backdrop-blur-3xl" onClick={onClose} />
      
      <div className="relative w-full max-w-7xl h-full md:h-[90vh] md:max-h-[900px] bg-zinc-950 md:rounded-[3rem] border-x md:border border-white/10 shadow-[0_0_150px_rgba(0,0,0,1)] overflow-hidden flex flex-col md:flex-row">
        
        {/* Consistent Realistic Product Visual Section */}
        <div className="w-full md:w-1/2 h-[40vh] md:h-full bg-[#050505] relative flex flex-col items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/5 group flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent opacity-50"></div>
          
          {isVisualizing ? (
            <div className="flex flex-col items-center justify-center space-y-6 animate-pulse px-6">
              <div className="relative">
                <div className="w-16 h-16 md:w-24 md:h-24 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 w-6 h-6 md:w-8 md:h-8" />
              </div>
              <div className="text-center">
                <p className="text-white font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-2">Visualizing Core</p>
                <p className="text-zinc-500 text-[8px] md:text-[10px] uppercase tracking-widest">Optimizing Performance Geometry...</p>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full flex flex-col items-center justify-center animate-in zoom-in-95 duration-1000">
              <div className="relative w-full h-full p-8 md:p-16 flex items-center justify-center">
                <img 
                  src={REALISTIC_PRODUCT_IMAGE} 
                  alt="Vercel Masterpiece Edition" 
                  className="w-full h-full object-contain filter drop-shadow-[0_20px_60px_rgba(0,0,0,0.9)] transition-all duration-1000 group-hover:scale-105 rounded-[2rem] md:rounded-[3rem]"
                />
              </div>
              
              <div className="absolute bottom-6 left-8 right-8 flex justify-between items-end z-10 pointer-events-none">
                <div>
                  <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-0 text-white">Vercel Core</h3>
                  <p className="text-zinc-500 text-[8px] md:text-xs font-bold uppercase tracking-[0.5em]">Studio Master Edition</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                    <Zap size={12} className="text-blue-500 inline mr-2" />
                    <span className="text-[8px] md:text-[10px] font-black text-white uppercase tracking-widest">6999 mAh</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Interaction & Checkout Section */}
        <div className="flex-1 flex flex-col h-full bg-zinc-950 overflow-hidden relative min-h-0">
          <div className="p-6 md:p-10 border-b border-white/5 flex justify-between items-center bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-30">
            {step === 'checkout' ? (
              <button onClick={() => setStep('model')} className="flex items-center text-zinc-500 hover:text-white transition-colors group text-[10px] md:text-sm font-bold uppercase tracking-widest">
                <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back
              </button>
            ) : (
              <div className="flex flex-col">
                <h2 className="text-lg md:text-2xl font-black uppercase tracking-tighter text-white">Choose Model</h2>
                <div className="flex gap-1 mt-1">
                  <div className="w-8 h-1 rounded-full bg-blue-600"></div>
                  <div className="w-8 h-1 rounded-full bg-zinc-800"></div>
                </div>
              </div>
            )}
            <button onClick={onClose} className="p-2 md:p-3 bg-white/5 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-all transform hover:rotate-90">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-12 scrollbar-hide">
            {step === 'model' ? (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {models.map((group, idx) => (
                  <div key={idx} className="space-y-6">
                    <h3 className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] text-zinc-500 flex items-center gap-4">
                      {group.series}
                      <div className="h-px flex-1 bg-white/5"></div>
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                      {group.variants.map((variant) => (
                        <button
                          key={variant}
                          onClick={() => setSelectedModel(variant)}
                          className={`group relative py-5 md:py-8 px-3 md:px-4 rounded-2xl md:rounded-[2rem] border text-[11px] md:text-[13px] font-black transition-all duration-500 ${
                            selectedModel === variant 
                            ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_30px_rgba(59,130,246,0.4)] scale-[0.97]' 
                            : 'bg-zinc-900/40 border-white/5 text-zinc-500 hover:border-white/20 hover:bg-zinc-800/80 hover:text-white'
                          }`}
                        >
                          {variant}
                          {selectedModel === variant && (
                            <div className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 bg-white text-blue-600 p-1.5 rounded-full shadow-lg animate-in zoom-in">
                              <Check size={12} strokeWidth={4} />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="max-w-xl mx-auto space-y-10 animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="space-y-6">
                  <h3 className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] text-zinc-500">Shipping Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" className="w-full bg-zinc-900/50 border border-white/5 p-5 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-zinc-900 transition-all text-white text-sm" />
                    <input type="text" placeholder="Last Name" className="w-full bg-zinc-900/50 border border-white/5 p-5 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-zinc-900 transition-all text-white text-sm" />
                  </div>
                  <input type="email" placeholder="Email Address" className="w-full bg-zinc-900/50 border border-white/5 p-5 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-zinc-900 transition-all text-white text-sm" />
                  <input type="text" placeholder="Full Delivery Address" className="w-full bg-zinc-900/50 border border-white/5 p-5 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-zinc-900 transition-all text-white text-sm" />
                </div>

                <div className="space-y-6">
                  <h3 className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] text-zinc-500">Secure Checkout</h3>
                  <div className="bg-zinc-900/30 border border-white/5 rounded-[2.5rem] p-8 space-y-6 backdrop-blur-md">
                    <div className="relative group">
                      <CreditCard className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-500 transition-colors" size={20} />
                      <input type="text" placeholder="Card Number" className="w-full bg-zinc-950 border border-white/5 pl-14 p-5 rounded-2xl focus:outline-none focus:border-blue-500 transition-all text-white text-sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="MM / YY" className="w-full bg-zinc-950 border border-white/5 p-5 rounded-2xl focus:outline-none focus:border-blue-500 transition-all text-white text-sm" />
                      <input type="text" placeholder="CVC" className="w-full bg-zinc-950 border border-white/5 p-5 rounded-2xl focus:outline-none focus:border-blue-500 transition-all text-white text-sm" />
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 flex justify-between items-center">
                  <div>
                    <span className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Total Amount</span>
                    <span className="text-white text-2xl font-black">${UNIT_PRICE.toFixed(2)}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Standard Delivery</span>
                    <span className="text-white text-xs font-bold uppercase tracking-widest">Calculated</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 md:p-12 border-t border-white/5 bg-black/60 backdrop-blur-3xl sticky bottom-0 z-40">
            {step === 'model' ? (
              <button
                disabled={!selectedModel || isVisualizing}
                onClick={() => setStep('checkout')}
                className={`w-full py-5 md:py-8 rounded-[1.5rem] md:rounded-[2rem] font-black text-sm md:text-xl uppercase tracking-[0.4em] transition-all duration-500 flex items-center justify-center group shadow-2xl ${
                  selectedModel && !isVisualizing
                  ? 'bg-white text-black hover:bg-zinc-200 hover:-translate-y-1' 
                  : 'bg-zinc-900 text-zinc-700 cursor-not-allowed opacity-50'
                }`}
              >
                {isVisualizing ? 'Visualizing...' : 'Continue to Checkout'} <ChevronRight size={22} className="ml-2 group-hover:translate-x-2 transition-transform" />
              </button>
            ) : (
              <button
                onClick={onComplete}
                className="w-full py-5 md:py-8 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm md:text-xl rounded-[1.5rem] md:rounded-[2rem] transition-all duration-500 shadow-[0_20px_60px_rgba(59,130,246,0.4)] uppercase tracking-[0.4em] hover:-translate-y-1 active:scale-95"
              >
                Confirm Payment
              </button>
            )}
            
            <div className="mt-8 flex justify-center gap-10 text-zinc-600 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em]">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-blue-500" /> 
                <span>Encrypted SSL</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck size={14} className="text-blue-500" /> 
                <span>Worldwide Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseFlow;
