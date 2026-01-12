
import React from 'react';
import { BatteryCharging, Shield, Zap, Sliders } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      title: "Built-in Power Bank",
      description: "Extend your phone life by up to 150% with our high-density lithium-polymer battery cells.",
      icon: <BatteryCharging size={28} className="text-blue-500" />,
    },
    {
      title: "Ultra-Slim Design",
      description: "Precisely crafted from premium ABS. Luxury without the unnecessary bulk.",
      icon: <Sliders size={28} className="text-blue-500" />,
    },
    {
      title: "CE Certified Power",
      description: "Fully certified for safety and performance. No high-concern chemicals used.",
      icon: <Zap size={28} className="text-blue-500" />,
    },
    {
      title: "Grade 5 Protection",
      description: "Engineered in partnership with LIEFOX for maximum durability and protection.",
      icon: <Shield size={28} className="text-blue-500" />,
    }
  ];

  return (
    <section id="features" className="py-24 bg-zinc-950 scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Engineered for Excellence</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="group p-8 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="mb-6 p-4 rounded-2xl bg-zinc-950 w-fit group-hover:scale-110 transition-transform duration-500">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{feature.title}</h3>
              <p className="text-zinc-400 leading-relaxed font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
