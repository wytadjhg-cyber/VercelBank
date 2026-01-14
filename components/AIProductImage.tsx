
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Loader2 } from 'lucide-react';

interface AIProductImageProps {
  className?: string;
  style?: React.CSSProperties;
}

const AIProductImage: React.FC<AIProductImageProps> = ({ className, style }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Incremented version to V5 to trigger a new generation with the lights at the bottom of the bulge
  const CACHE_KEY = 'VERCEL_MASTER_ASSET_V5';

  useEffect(() => {
    const initImage = async () => {
      // Check if we already have a "set" image in storage
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        setImageUrl(cached);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        /**
         * Final refined prompt based on precise user feedback:
         * 1. Focus on iPhone 16 Pro Max identity (triple camera module at top left).
         * 2. Focus on the integrated battery hump/bulge on the rear.
         * 3. Position 4 blue lights precisely AT THE BOTTOM EDGE OF THE BATTERY BULGE.
         * 4. Luxury studio aesthetics.
         */
        const prompt = `Masterpiece 8K studio product photography of a premium matte black "Vercel" power bank case for an iPhone 16 Pro Max. The case has a refined, smooth integrated battery bulge on the back. At the very bottom part of this battery hump, near the lower taper, there are exactly four small, perfectly circular, glowing sapphire-blue LED status lights in a horizontal row. The triple-lens camera module is sharp and clear at the top. The product is shown from a sleek rear-view angle on a dark reflective surface. Cinematic low-key lighting with sophisticated blue rim highlights, deep black minimalist background, and ultra-sharp professional textures.`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: prompt }],
          },
          config: {
            imageConfig: {
              aspectRatio: "9:16",
            },
          },
        });

        const imagePart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
        
        if (imagePart?.inlineData?.data) {
          const base64Data = `data:image/png;base64,${imagePart.inlineData.data}`;
          setImageUrl(base64Data);
          // "Set" the image permanently for this user session
          localStorage.setItem(CACHE_KEY, base64Data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Master Asset Generation Failed:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    initImage();
  }, []);

  if (loading) {
    return (
      <div className={`flex flex-col items-center justify-center bg-zinc-900/50 rounded-3xl border border-white/5 p-12 aspect-[9/16] ${className}`} style={style}>
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600 text-center leading-relaxed">Adjusting Status<br/>Indicator Mesh...</p>
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div className={`flex flex-col items-center justify-center bg-zinc-900/50 rounded-3xl border border-red-500/20 p-12 aspect-[9/16] ${className}`} style={style}>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500/50 mb-4">Master Asset Sync Failure</p>
        <button 
          onClick={() => { localStorage.removeItem(CACHE_KEY); window.location.reload(); }} 
          className="text-blue-500 text-[10px] font-black uppercase tracking-widest underline"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className={`relative group ${className}`} style={style}>
      {/* Dynamic ambient glow */}
      <div className="absolute -inset-10 bg-blue-600/5 blur-[120px] rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-1000"></div>
      
      <img 
        src={imageUrl} 
        alt="Vercel Core Master Asset" 
        className="w-full h-auto rounded-[2.5rem] drop-shadow-[0_40px_80px_rgba(0,0,0,0.9)] transition-transform duration-1000 group-hover:scale-[1.01] relative z-10"
        style={{ imageRendering: 'auto' }}
      />
      
      {/* Luxury glass reflection overlay */}
      <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-20 opacity-20"></div>
    </div>
  );
};

export default AIProductImage;
