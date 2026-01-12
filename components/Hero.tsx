
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface HeroProps {
  onBuyNow: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBuyNow }) => {
  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Animated Glowing Ring Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[100px] opacity-40"></div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-block px-4 py-1.5 mb-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm animate-fade-in">
          <span className="text-xs font-semibold tracking-widest text-blue-400 uppercase">iPhone 16 Pro Max Model Available</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6 text-gradient animate-slide-up leading-[1.1]">
          Power, Perfected.
        </h1>
        
        <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed animate-slide-up delay-200">
          Advanced luxury power case. Zero compromises. Infinite energy.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-slide-up delay-300">
          <button 
            onClick={scrollToPricing}
            className="group relative px-10 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] uppercase tracking-widest"
          >
            <span className="relative z-10">Buy It Now</span>
          </button>
          
          <button 
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center text-white hover:text-blue-400 transition-colors font-medium group"
          >
            Explore Technology <ChevronRight size={20} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Removed the lifestyle image block as requested */}
        <div className="mt-20 relative max-w-6xl mx-auto">
          <div className="absolute inset-0 bg-blue-600/10 blur-[150px] rounded-full scale-75 opacity-30"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
