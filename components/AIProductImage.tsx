
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

  // Aggressive caching for the "Master Asset"
  const CACHE_KEY = "VERCEL_CORE_MASTER_V10";
  // High-quality fallback if AI fails (luxury phone case stock)
  const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=1000";

  useEffect(() => {
    const initImage = async () => {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        setImageUrl(cached);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const prompt = `Hyper-realistic 8K professional product photography of the "Vercel Core" luxury power bank phone case for iPhone 16 Pro Max. The case is finished in a premium matte Obsidian Black material with subtle Titanium accents. The case features a refined integrated battery hump. At the bottom are four circular glowing sapphire-blue LED status lights. The product is placed on a dark reflective studio surface with clean minimalist aesthetic. Cinematic lighting with sharp rim highlights. 8k resolution, professional studio photography.`;

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
          localStorage.setItem(CACHE_KEY, base64Data);
        } else {
          setImageUrl(FALLBACK_IMAGE);
        }
      } catch (err) {
        console.error("Asset Generation Failed:", err);
        setImageUrl(FALLBACK_IMAGE);
      } finally {
        setLoading(false);
      }
    };

    initImage();
  }, []);

  if (loading) {
    return (
      <div className={`flex flex-col items-center justify-center bg-zinc-900/50 rounded-[3rem] border border-white/5 p-12 aspect-[9/16] ${className}`} style={style}>
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-6" />
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500 text-center leading-relaxed">
          Retrieving Master Asset...
        </p>
      </div>
    );
  }

  return (
    <div className={`relative group animate-in fade-in zoom-in-95 duration-1000 ${className}`} style={style}>
      <div className="absolute -inset-10 bg-blue-600/5 blur-[120px] rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-1000"></div>
      
      <img 
        src={imageUrl || FALLBACK_IMAGE} 
        alt="Vercel Core Premium" 
        className="w-full h-auto rounded-[3rem] drop-shadow-[0_40px_80px_rgba(0,0,0,0.9)] transition-all duration-1000 relative z-10 border border-white/5"
      />
      <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-20 opacity-20"></div>
    </div>
  );
};

export default AIProductImage;
