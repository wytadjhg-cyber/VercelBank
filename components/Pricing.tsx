
import React from 'react';
import { Check, ShieldCheck, Truck } from 'lucide-react';

interface PricingProps {
  onAddToCart: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onAddToCart }) => {
  return (
    <section id="pricing" className="py-24 bg-black relative overflow-hidden scroll-mt-24">
      {/* Background glow for call to action */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-blue-600/10 blur-[150px] opacity-30 rounded-full"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto p-8 md:p-12 rounded-[2.5rem] border border-white/10 bg-zinc-900/40 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left order-2 md:order-1">
            <h2 className="text-5xl font-extrabold mb-4 tracking-tighter uppercase text-white">Vercel Power Case</h2>
            <p className="text-zinc-400 text-lg mb-8 font-light italic">By LIEFOX Engineering</p>
            
            <div className="flex items-center justify-center md:justify-start space-x-4 mb-8">
              <span className="text-6xl font-bold tracking-tight text-white">$69.99</span>
              <div className="text-left">
                <div className="text-zinc-500 line-through">$149</div>
                <div className="text-blue-500 font-bold uppercase text-[10px] tracking-widest">Limited Release</div>
              </div>
            </div>

            <ul className="space-y-4 mb-8 text-left inline-block md:block">
              <li className="flex items-center text-zinc-300">
                <div className="bg-blue-600/20 p-1 rounded-full mr-3">
                  <span className="text-blue-500"><Check size={14} /></span>
                </div>
                <span>CE Certified Safety</span>
              </li>
              <li className="flex items-center text-zinc-300">
                <div className="bg-blue-600/20 p-1 rounded-full mr-3">
                  <span className="text-blue-500"><Check size={14} /></span>
                </div>
                <span>Premium ABS Construction</span>
              </li>
              <li className="flex items-center text-zinc-300">
                <div className="bg-blue-600/20 p-1 rounded-full mr-3">
                  <span className="text-blue-500"><Check size={14} /></span>
                </div>
                <span>iPhone X to 16 Pro Max Ready</span>
              </li>
            </ul>

            <button 
              onClick={onAddToCart}
              className="w-full py-5 bg-white hover:bg-zinc-200 text-black font-black text-xl rounded-2xl transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)] transform active:scale-95 uppercase tracking-[0.2em]"
            >
              Buy It Now
            </button>
          </div>

          <div className="flex-1 w-full max-w-sm order-1 md:order-2">
            <div className="relative group">
              {/* Pedestal & Case Visual Implementation matching the user image shared earlier */}
              <div className="relative z-10 flex flex-col items-center py-10">
                
                {/* The Phone Case - Matte Black */}
                <div className="relative w-56 h-96 bg-zinc-900 rounded-[3rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col items-center justify-between p-8 transform group-hover:scale-[1.02] transition-transform duration-700 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none"></div>
                  
                  {/* Camera Module Cutout */}
                  <div className="w-24 h-24 bg-black rounded-3xl border border-white/5 shadow-inner self-start"></div>
                  
                  {/* 4 Blue LEDs Visual */}
                  <div className="w-full flex flex-col items-center gap-6 mb-4">
                    <div className="flex gap-2">
                       <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,1)]"></div>
                       <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,1)]"></div>
                       <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,1)]"></div>
                       <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)] animate-pulse"></div>
                    </div>
                    {/* Power Button Detail */}
                    <div className="absolute bottom-16 right-6 w-8 h-4 bg-zinc-800 rounded-full border border-white/10 flex items-center justify-center">
                       <div className="w-1.5 h-1.5 rounded-full bg-zinc-600"></div>
                    </div>
                  </div>
                </div>

                {/* The Pedestal Base */}
                <div className="relative mt-[-20px] w-72 h-16 z-[-1]">
                   <div className="absolute inset-0 bg-zinc-800 rounded-full border-t border-white/20 shadow-2xl"></div>
                   <div className="absolute inset-x-2 inset-y-1 bg-zinc-900 rounded-full border-t border-white/10"></div>
                   {/* Blue reflected underglow */}
                   <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-blue-600/30 blur-xl rounded-full"></div>
                </div>
              </div>

              {/* Ambient glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600/10 blur-[100px] opacity-40 rounded-full"></div>
            </div>
            
            <div className="mt-8 flex justify-center gap-6 text-zinc-500">
              <div className="flex items-center text-[10px] tracking-widest uppercase font-bold">
                <Truck size={14} className="mr-2 text-blue-500" /> Express
              </div>
              <div className="flex items-center text-[10px] tracking-widest uppercase font-bold">
                <ShieldCheck size={14} className="mr-2 text-blue-500" /> Secure
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
