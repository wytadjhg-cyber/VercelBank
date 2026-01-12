
import React from 'react';

const Lifestyle: React.FC = () => {
  return (
    <section className="relative py-32 overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/id/12/1920/1080" 
          alt="Luxury background" 
          className="w-full h-full object-cover opacity-40 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter leading-tight">
            Designed for those who <span className="text-blue-500">never slow down.</span>
          </h2>
          <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed mb-10 max-w-xl">
            From late-night boardrooms to trans-atlantic flights, Vercel ensures your digital lifeline stays connected with effortless elegance.
          </p>
          <div className="flex flex-wrap gap-12">
            <div>
              <div className="text-4xl font-bold mb-1">24h+</div>
              <div className="text-zinc-500 uppercase tracking-widest text-xs">Extra Battery</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">0.1s</div>
              <div className="text-zinc-500 uppercase tracking-widest text-xs">Charging Latency</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">6999mAh</div>
              <div className="text-zinc-500 uppercase tracking-widest text-xs">Peak Capacity</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lifestyle;
