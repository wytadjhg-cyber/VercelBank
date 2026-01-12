
import React from 'react';

const ProductDetails: React.FC = () => {
  const specs = [
    { label: "Battery Capacity", value: "5000-6999 mAh High-Density" },
    { label: "Brand", value: "LIEFOX (Official Partner)" },
    { label: "Material", value: "ABS (High Grade Polymer)" },
    { label: "Certification", value: "CE Certified / FCC / RoHS" },
    { label: "Chemical Standards", value: "Zero High-Concern Chemicals (Non-Toxic)" },
    { label: "Function", value: "Smart Power Case / Integrated Charging" },
    { label: "Origin", value: "CN (Precision Engineered)" },
  ];

  const compatibilityGroups = [
    { series: "iPhone 16 Series", models: "16, 16 Plus, 16 Pro, 16 Pro Max" },
    { series: "iPhone 15 Series", models: "15, 15 Plus, 15 Pro, 15 Pro Max" },
    { series: "iPhone 14 Series", models: "14, 14 Plus, 14 Pro, 14 Pro Max" },
    { series: "iPhone 13 Series", models: "13, 13 mini, 13 Pro, 13 Pro Max" },
    { series: "iPhone 12 Series", models: "12, 12 mini, 12 Pro, 12 Pro Max" },
    { series: "iPhone 11 Series", models: "11, 11 Pro, 11 Pro Max" },
    { series: "Legacy Modern", models: "iPhone X, iPhone XR" }
  ];

  return (
    <section id="specs" className="py-24 bg-zinc-950 scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Technical Mastery</h2>
          <p className="text-blue-500 font-bold tracking-widest uppercase text-xs">Performance Data & Compatibility</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Technical Specs */}
          <div className="bg-zinc-900/30 p-8 rounded-[2rem] border border-white/5">
            <h3 className="text-xl font-bold mb-8 text-white border-b border-white/10 pb-4">Hardware Specifications</h3>
            <div className="space-y-0">
              {specs.map((spec, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row justify-between py-5 border-b border-white/5 group hover:bg-white/5 transition-colors px-2">
                  <span className="text-zinc-500 font-medium uppercase tracking-[0.2em] text-[10px] mb-1 sm:mb-0">{spec.label}</span>
                  <span className="text-white font-semibold text-sm text-left sm:text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Compatibility List */}
          <div className="bg-zinc-900/30 p-8 rounded-[2rem] border border-white/5">
            <h3 className="text-xl font-bold mb-8 text-white border-b border-white/10 pb-4">Compatible Devices</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {compatibilityGroups.map((group, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-blue-500 font-bold text-[10px] uppercase tracking-widest">{group.series}</div>
                  <div className="text-zinc-300 text-sm font-light leading-relaxed">{group.models}</div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-blue-600/5 rounded-xl border border-blue-500/20">
              <p className="text-[10px] text-blue-400 font-medium leading-relaxed uppercase tracking-wider text-center">
                Automated Power Switching technology detects your device model for optimized charging cycles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
