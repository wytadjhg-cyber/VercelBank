
import React from 'react';

interface AIProductImageProps {
  className?: string;
  style?: React.CSSProperties;
}

const AIProductImage: React.FC<AIProductImageProps> = ({ className, style }) => {
  /**
   * MASTER ASSET OPTIMIZATION:
   * We use the direct high-resolution PNG provided. 
   * To ensure "Perfect Quality" on high-DPI (Retina) screens, we constrain the display 
   * width to a fraction of the native resolution. This forces the browser to downsample 
   * for ultra-sharp edge definition.
   */
  const MASTER_ASSET_URL = "https://img.sanishtech.com/u/5b192219d20ddcda39ccaf7b0b35b4ef.png";

  return (
    <div 
      className={`relative group animate-in fade-in zoom-in-95 duration-1000 flex justify-center items-center ${className}`} 
      style={style}
    >
      {/* Deep luxury ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-blue-600/10 blur-[140px] rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-1000 pointer-events-none"></div>
      
      {/* 
          PIXEL-PERFECT CONTAINER:
          Constraining the 1000px+ image to ~440px creates a 2.5x pixel density (PPI),
          matching the standard for luxury product photography.
      */}
      <div className="relative z-10 w-full max-w-[440px] mx-auto transition-all duration-1000 group-hover:scale-[1.03] group-hover:-translate-y-2">
        <img 
          src={MASTER_ASSET_URL} 
          alt="Vercel Core Premium" 
          className="w-full h-auto drop-shadow-[0_50px_100px_rgba(0,0,0,1)]"
          style={{ 
            imageRendering: 'high-quality',
            // Specific browser flags for maximum sharpness on PNG assets
            WebkitFontSmoothing: 'antialiased',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
          }}
        />
        
        {/* Subtle dynamic highlight overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 pointer-events-none z-20 opacity-20 rounded-[4rem]"></div>
      </div>

      {/* Quality Certification Badge */}
      <div className="absolute bottom-2 right-2 md:bottom-8 md:right-0 z-30 flex items-center gap-3 px-5 py-3 bg-zinc-950/80 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform translate-x-4">
        <div className="relative">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping absolute inset-0"></div>
          <div className="w-2 h-2 rounded-full bg-blue-500 relative"></div>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white leading-none mb-1">Ultra-HD Master</span>
          <span className="text-[7px] font-bold text-zinc-500 uppercase tracking-widest">Lossless PNG • High-PPI</span>
        </div>
      </div>
    </div>
  );
};

export default AIProductImage;
