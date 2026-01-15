
import React from 'react';
import { ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-600/5 rounded-full blur-[160px] opacity-40"></div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-block px-5 py-2 mb-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm animate-fade-in">
          <span className="text-[10px] font-black tracking-[0.4em] text-blue-400 uppercase">iPhone 16 compatibility release</span>
        </div>
        
        <h1 className="text-7xl md:text-[11rem] font-black tracking-tighter mb-10 text-gradient animate-slide-up leading-[0.85]">
          POWER.<br/>PERFECTED.
        </h1>
        
        <p className="text-xl md:text-3xl text-zinc-400 max-w-3xl mx-auto mb-16 font-light leading-relaxed animate-slide-up delay-200">
          The ultimate power case for the iPhone 16 Series. <br className="hidden md:block" /> Designed with precision, crafted for performance.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 animate-slide-up delay-300">
          <button 
            onClick={scrollToPricing}
            className="group relative px-20 py-8 bg-white text-black font-black rounded-3xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_30px_60px_rgba(255,255,255,0.2)] uppercase tracking-[0.4em] text-sm"
          >
            Buy It Now
          </button>
          
          <button 
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center text-zinc-500 hover:text-white transition-all font-bold group uppercase tracking-widest text-[10px]"
          >
            Explore Technology <ChevronRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="mt-40 grid grid-cols-2 md:grid-cols-4 gap-12 opacity-30 animate-fade-in delay-500 max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-black">6999</span>
            <span className="text-[9px] uppercase tracking-widest font-black text-zinc-500">Peak mAh</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-black">15W</span>
            <span className="text-[9px] uppercase tracking-widest font-black text-zinc-500">Fast Sync</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-black">G5</span>
            <span className="text-[9px] uppercase tracking-widest font-black text-zinc-500">Titanium Grade</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-black">V3</span>
            <span className="text-[9px] uppercase tracking-widest font-black text-zinc-500">Core Engine</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
