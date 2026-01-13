
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

  useEffect(() => {
    const generateImage = async () => {
      try {
        setLoading(true);
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        // Refined prompt to emphasize the iPhone identity via the camera array and the case features
        const prompt = `Hyper-realistic, 8k resolution studio product photography of the "Vercel Core" power bank phone case for iPhone 16 Pro Max. The case is premium matte black with a sophisticated integrated battery hump on the back. At the top left of the case, the iconic iPhone triple-lens camera array is clearly visible through a precision cutout. On the lower back surface of the case, there are four small, precise, circular glowing blue LED battery status indicators. The product stands vertically on a brushed dark titanium circular platform. Dramatic low-key rim lighting, soft reflections, deep black minimalist background. The focus is sharp on the matte texture, the camera lenses, and the glowing blue status lights. Ultra-luxury tech aesthetic.`;

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

        // Find the image part in the response candidates
        const imagePart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
        
        if (imagePart?.inlineData?.data) {
          setImageUrl(`data:image/png;base64,${imagePart.inlineData.data}`);
        } else {
          console.error("No image data in response", response);
          setError(true);
        }
      } catch (err) {
        console.error("Image generation failed:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    generateImage();
  }, []);

  if (loading) {
    return (
      <div className={`flex flex-col items-center justify-center bg-zinc-900/50 rounded-3xl border border-white/5 p-12 aspect-[9/16] ${className}`} style={style}>
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Generating Master Asset...</p>
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div className={`flex flex-col items-center justify-center bg-zinc-900/50 rounded-3xl border border-red-500/20 p-12 aspect-[9/16] ${className}`} style={style}>
        <div className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Master Asset Sync Failure</div>
        <button 
          onClick={() => window.location.reload()}
          className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] underline"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className={`relative group ${className}`} style={style}>
      <div className="absolute -inset-4 bg-blue-600/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
      <img 
        src={imageUrl} 
        alt="Vercel Core Generated iPhone Asset" 
        className="w-full h-auto rounded-[2rem] drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)] transition-transform duration-1000 group-hover:scale-[1.02]"
        style={{ imageRendering: 'auto' }}
      />
    </div>
  );
};

export default AIProductImage;
