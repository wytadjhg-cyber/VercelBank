
import React, { useState, useEffect } from 'react';
import { X, ChevronRight, CreditCard, ShieldCheck, Truck, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface PurchaseFlowProps {
  onClose: () => void;
  onComplete: () => void;
}

const PurchaseFlow: React.FC<PurchaseFlowProps> = ({ onClose, onComplete }) => {
  const [step, setStep] = useState<'model' | 'checkout'>('model');
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);

  const UNIT_PRICE = 69.99;

  useEffect(() => {
    const generateProductImage = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = "A high-end studio product photograph of a sleek matte black iPhone power case. The case features four small, glowing blue LED battery indicators at the base. It is presented on a minimalist circular metallic pedestal in a dark, luxury industrial setting with cinematic blue accent lighting. 8k resolution, ultra-detailed textures.";
        
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: prompt }],
          },
          config: {
            imageConfig: {
              aspectRatio: "1:1"
            }
          }
        });

        let foundImage = false;
        if (response.candidates && response.candidates[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
              const base64Data = part.inlineData.data;
              setGeneratedImageUrl(`data:image/png;base64,${base64Data}`);
              foundImage = true;
              break;
            }
          }
        }
        
        if (!foundImage) {
           throw new Error("No image data found in response");
        }
      } catch (error) {
        console.error("Image generation failed:", error);
        // Reliable fallback for production if API key is missing or generation fails
        setGeneratedImageUrl("https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1200&auto=format&fit=crop");
      } finally {
        setIsGenerating(false);
      }
    };

    generateProductImage();
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
    <div className="fixed inset-0 z-[200] flex items-center justify-center animate-in fade-in duration-500">
      <div className="absolute inset-0 bg-black/98 backdrop-blur-3xl" onClick={onClose} />
      
      <div className="relative w-full max-w-7xl h-full md:h-[90vh] md:max-h-[900px] bg-zinc-950 md:rounded-[3rem] border border-white/10 shadow-[0_0_150px_rgba(0,0,0,1)] overflow-hidden flex flex-col md:flex-row">
        
        {/* Product Visual - Now visible on mobile at the top or left on desktop */}
        <div className="w-full md:w-1/2 h-[300px] md:h-full bg-[#050505] relative flex flex-col items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/5 group flex-shrink-0">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center space-y-6 animate-pulse">
              <div className="relative">
                <div className="w-16 h-16 md:w-24 md:h-24 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 w-6 h-6 md:w-8 md:h-8" />
              </div>
              <div className="text-center">
                <p className="text-white font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-1 md:mb-2">Visualizing Core</p>
                <p className="text-zinc-500 text-[8px] md:text-[10px] uppercase tracking-widest">Generating Studio Asset...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-transparent opacity-50"></div>
              <div className="relative w-full h-full flex items-center justify-center p-6 md:p-12">
                <img 
                  src={generatedImageUrl || ""} 
                  alt="Vercel Power Case Visual" 
                  className="w-full h-full object-contain filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] md:drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="absolute bottom-4 left-6 right-6 md:bottom-12 md:left-12 md:right-12 flex justify-between items-end z-10">
                <div>
                  <h3 className="text-xl md:text-3xl font-black uppercase tracking-tighter mb-0 md:mb-1">Vercel Core</h3>
                  <p className="text-zinc-500 text-[8px] md:text-xs font-bold uppercase tracking-[0.4em]">Onyx Black Edition</p>
                </div>
                <div className="text-right">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-blue-500/30 flex items-center justify-center">
                    <ShieldCheck size={14} className="text-blue-500" />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex-1 flex flex-col h-full bg-zinc-950 overflow-hidden relative min-h-0">
          <div className="p-6 md:p-10 border-b border-white/5 flex justify-between items-center bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-30">
            {step === 'checkout' ? (
              <button onClick={() => setStep('model')} className="flex items-center text-zinc-500 hover:text-white transition-colors group text-[10px] md:text-sm font-bold uppercase tracking-widest">
                <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back
              </button>
            ) : (
              <div className="flex flex-col">
                <h2 className="text-lg md:text-2xl font-black uppercase tracking-tighter text-white">Choose Model</h2>
                <div className="flex gap-1 mt-1 md:mt-2">
                  <div className="w-6 md:w-8 h-1 rounded-full bg-blue-600"></div>
                  <div className="w-6 md:w-8 h-1 rounded-full bg-zinc-800"></div>
                </div>
              </div>
            )}
            <button onClick={onClose} className="p-2 md:p-3 bg-white/5 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-all transform hover:rotate-90">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-12 scrollbar-hide">
            {step === 'model' ? (
              <div className="space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {models.map((group, idx) => (
                  <div key={idx} className="space-y-4 md:space-y-6">
                    <h3 className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 flex items-center gap-4">
                      {group.series}
                      <div className="h-px flex-1 bg-white/5"></div>
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
                      {group.variants.map((variant) => (
                        <button
                          key={variant}
                          onClick={() => setSelectedModel(variant)}
                          className={`group relative py-4 md:py-6 px-2 md:px-4 rounded-2xl md:rounded-3xl border text-[10px] md:text-sm font-bold transition-all duration-500 ${
                            selectedModel === variant 
                            ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]' 
                            : 'bg-zinc-900/40 border-white/5 text-zinc-500 hover:border-white/20 hover:bg-zinc-800/80 hover:text-white'
                          }`}
                        >
                          {variant}
                          {selectedModel === variant && (
                            <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-white text-blue-600 p-1 md:p-1.5 rounded-full shadow-lg animate-in zoom-in">
                              <Check size={10} strokeWidth={4} />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="max-w-xl mx-auto space-y-6 md:space-y-10 py-2 md:py-4 animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="space-y-4 md:space-y-6">
                  <h3 className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] text-zinc-500">Shipping Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <input type="text" placeholder="First Name" className="w-full bg-zinc-900/50 border border-white/5 p-4 md:p-5 rounded-xl md:rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-zinc-900 transition-all text-white text-sm placeholder:text-zinc-700" />
                    <input type="text" placeholder="Last Name" className="w-full bg-zinc-900/50 border border-white/5 p-4 md:p-5 rounded-xl md:rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-zinc-900 transition-all text-white text-sm placeholder:text-zinc-700" />
                  </div>
                  <input type="email" placeholder="Email Address" className="w-full bg-zinc-900/50 border border-white/5 p-4 md:p-5 rounded-xl md:rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-zinc-900 transition-all text-white text-sm placeholder:text-zinc-700" />
                  <input type="text" placeholder="Shipping Address" className="w-full bg-zinc-900/50 border border-white/5 p-4 md:p-5 rounded-xl md:rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-zinc-900 transition-all text-white text-sm placeholder:text-zinc-700" />
                </div>

                <div className="space-y-4 md:space-y-6">
                  <h3 className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] text-zinc-500">Payment</h3>
                  <div className="bg-zinc-900/30 border border-white/5 rounded-2xl md:rounded-[2.5rem] p-6 md:p-8 space-y-4 md:space-y-6 backdrop-blur-md">
                    <div className="relative group">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                      <input type="text" placeholder="Card Number" className="w-full bg-zinc-950 border border-white/5 pl-12 p-4 md:p-5 rounded-xl md:rounded-2xl focus:outline-none focus:border-blue-500 transition-all text-white text-sm placeholder:text-zinc-800" />
                    </div>
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      <input type="text" placeholder="MM / YY" className="w-full bg-zinc-950 border border-white/5 p-4 md:p-5 rounded-xl md:rounded-2xl focus:outline-none focus:border-blue-500 transition-all text-white text-sm placeholder:text-zinc-800" />
                      <input type="text" placeholder="CVC" className="w-full bg-zinc-950 border border-white/5 p-4 md:p-5 rounded-xl md:rounded-2xl focus:outline-none focus:border-blue-500 transition-all text-white text-sm placeholder:text-zinc-800" />
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8 bg-white/5 rounded-2xl md:rounded-[2.5rem] border border-white/10 space-y-3 md:space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 text-[10px] md:text-sm font-medium">Model</span>
                    <span className="text-white text-xs md:text-base font-bold">{selectedModel} Power Case</span>
                  </div>
                  <div className="flex justify-between items-center text-lg md:text-xl font-bold pt-4 md:pt-6 border-t border-white/10">
                    <span className="uppercase tracking-tighter text-white">Total</span>
                    <span className="text-white font-black">${UNIT_PRICE.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 md:p-12 border-t border-white/5 bg-black/40 backdrop-blur-2xl sticky bottom-0 z-40">
            {step === 'model' ? (
              <button
                disabled={!selectedModel || isGenerating}
                onClick={() => setStep('checkout')}
                className={`w-full py-4 md:py-6 rounded-xl md:rounded-2xl font-black text-sm md:text-xl uppercase tracking-[0.3em] md:tracking-[0.4em] transition-all duration-500 flex items-center justify-center group shadow-2xl ${
                  selectedModel && !isGenerating
                  ? 'bg-white text-black hover:bg-zinc-200 hover:-translate-y-1' 
                  : 'bg-zinc-900 text-zinc-700 cursor-not-allowed opacity-50'
                }`}
              >
                {isGenerating ? 'Visualizing...' : 'Next Step'} <ChevronRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
              </button>
            ) : (
              <button
                onClick={onComplete}
                className="w-full py-4 md:py-6 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm md:text-xl rounded-xl md:rounded-2xl transition-all duration-500 shadow-[0_10px_30px_rgba(59,130,246,0.4)] md:shadow-[0_20px_60px_rgba(59,130,246,0.4)] uppercase tracking-[0.3em] md:tracking-[0.4em] hover:-translate-y-1 active:scale-95"
              >
                Complete Payment
              </button>
            )}
            
            <div className="mt-4 md:mt-8 flex justify-center gap-6 md:gap-10 text-zinc-600 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em]">
              <div className="flex items-center gap-1.5 md:gap-2">
                <ShieldCheck size={12} className="text-blue-500" /> 
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <Truck size={12} className="text-blue-500" /> 
                <span>Global Free Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseFlow;
