
import React from 'react';
import { Truck, Sparkles } from 'lucide-react';
import AIProductImage from './AIProductImage.tsx';

interface PricingProps {
  onAddToCart: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onAddToCart }) => {
  return (
    <section id="pricing" className="py-24 bg-black relative overflow-hidden scroll-mt-24">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-blue-600/5 blur-[180px] opacity-30 rounded-full"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto p-8 md:p-16 rounded-[4rem] border border-white/10 bg-zinc-950/50 backdrop-blur-xl shadow-2xl flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Product Image Side */}
          <div className="flex-1 w-full max-w-sm lg:max-w-md order-1">
            <AIProductImage className="w-full" />
          </div>

          {/* Product Details Side */}
          <div className="flex-1 text-center lg:text-left order-2">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <Sparkles size={14} className="text-blue-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">Masterpiece Edition</span>
            </div>
            <h2 className="text-6xl font-black mb-4 tracking-tighter uppercase text-white">Vercel Core</h2>
            
            <p className="text-zinc-500 text-sm mb-12 max-w-md mx-auto lg:mx-0 leading-relaxed font-light">
              Crafted with medical-grade ABS and high-density power cells. The only case that balances 6999mAh capacity with a silhouette that stays impossibly thin.
            </p>

            <div className="flex items-center justify-center lg:justify-start space-x-8 mb-12">
              <span className="text-7xl font-black tracking-tighter text-white">$69.99</span>
              <div className="text-left">
                <div className="text-zinc-700 line-through text-xl font-bold tracking-tight">$149.00</div>
                <div className="text-blue-500 font-black uppercase text-[10px] tracking-widest mt-1">Limited Release</div>
              </div>
            </div>

            <button 
              onClick={onAddToCart}
              className="w-full py-10 bg-white hover:bg-zinc-200 text-black font-black text-2xl rounded-3xl transition-all duration-300 shadow-[0_30px_60px_rgba(255,255,255,0.1)] transform active:scale-95 uppercase tracking-[0.4em]"
            >
              Buy Now
            </button>
            
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-8 opacity-50">
               <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                 <Truck size={14} className="text-blue-500" /> Insured Global Shipping
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
