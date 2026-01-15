
import React, { useEffect, useState } from 'react';
import { X, Loader2, ShieldCheck, Lock, Smartphone, CheckCircle2 } from 'lucide-react';

interface PurchaseFlowProps {
  onClose: () => void;
  onComplete: () => void;
  productImage: string;
}

const PAYPAL_CLIENT_ID = "AaUWy1kyY_e25tOqB78Zpaq3IObGDkFl927z3wfIx6k_mwei9wSFQp0cCw6rGOvH5eFUfTF31ushF5Uf";

const PurchaseFlow: React.FC<PurchaseFlowProps> = ({ onClose, onComplete }) => {
  const [step, setStep] = useState<'model' | 'payment' | 'success'>('model');
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const models = [
    "iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 16 Plus", "iPhone 16",
    "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15 Plus", "iPhone 15",
    "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14 Plus", "iPhone 14",
    "iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13", "iPhone 12 Pro Max"
  ];

  useEffect(() => {
    if (step === 'payment') {
      if ((window as any).paypal) {
        setIsSdkLoaded(true);
        renderButtons();
        return;
      }

      const script = document.createElement('script');
      script.id = 'paypal-sdk';
      script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&components=buttons&currency=USD`;
      script.async = true;
      script.crossOrigin = "anonymous";
      
      script.onload = () => {
        setIsSdkLoaded(true);
        renderButtons();
      };
      
      script.onerror = () => setError("Failed to load secure payment gateway.");
      document.body.appendChild(script);
    }

    function renderButtons() {
      const container = document.getElementById('paypal-button-container');
      if (container && (window as any).paypal) {
        container.innerHTML = '';
        (window as any).paypal.Buttons({
          style: {
            layout: 'vertical',
            color: 'white',
            shape: 'pill',
            label: 'checkout'
          },
          createOrder: async () => {
            const res = await fetch("/api/orders", { method: "POST" });
            const data = await res.json();
            if (data.id) return data.id;
            throw new Error(data.error || "Order creation failed");
          },
          onApprove: async (data: any) => {
            const res = await fetch(`/api/orders/${data.orderID}/capture`, { method: "POST" });
            if (res.ok) {
                onComplete();
                setStep('success');
            } else {
                setError("Payment capture failed. Please contact support.");
            }
          },
          onCancel: () => console.log("Transaction cancelled by user"),
          onError: (err: any) => { 
            console.error("PayPal UI Error:", err);
            setError("The payment gateway encountered an issue. Please try again.");
          }
        }).render("#paypal-button-container");
      }
    }
  }, [step, onComplete]);

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
    setStep('payment');
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-zinc-950 rounded-[3rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden">
        {step !== 'success' && (
          <div className="p-8 md:p-10 border-b border-white/5 flex justify-between items-center bg-black">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white leading-none">
                {step === 'model' ? 'Choose Variant' : 'Checkout'}
              </h2>
              <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">
                {step === 'model' ? 'Select your device' : selectedModel}
              </p>
            </div>
            <button onClick={onClose} className="p-4 bg-white/5 rounded-full text-zinc-500 hover:text-white transition-all transform hover:rotate-90">
              <X size={24} />
            </button>
          </div>
        )}

        <div className="p-8 md:p-12 max-h-[70vh] overflow-y-auto scrollbar-hide">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold uppercase tracking-widest text-center">
              {error}
            </div>
          )}

          {step === 'model' && (
            <div className="grid grid-cols-1 gap-3">
              {models.map(model => (
                <button
                  key={model}
                  onClick={() => handleModelSelect(model)}
                  className="w-full flex items-center justify-between p-6 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-blue-500/50 hover:bg-zinc-900 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <Smartphone size={18} className="text-zinc-600 group-hover:text-blue-500 transition-colors" />
                    <span className="text-sm font-bold uppercase tracking-widest text-zinc-300 group-hover:text-white">{model}</span>
                  </div>
                  <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center group-hover:border-blue-500">
                    <div className="w-2 h-2 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-10">
              {!isSdkLoaded && !error && (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-6" />
                  <p className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-700 text-center">Establishing Secure Link...</p>
                </div>
              )}
              
              <div id="paypal-button-container" className="w-full min-h-[150px]"></div>

              <div className="pt-10 border-t border-white/5 space-y-8">
                <div className="flex items-center justify-center gap-4 text-zinc-600">
                  <ShieldCheck size={20} className="text-blue-500/50" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">PayPal Verified Merchant</span>
                </div>
                
                <div className="flex items-center justify-center gap-3">
                   <Lock size={14} className="text-zinc-800" />
                   <p className="text-zinc-700 text-[9px] font-bold uppercase tracking-[0.2em] text-center max-w-xs leading-relaxed">
                     All transactions are protected by industry-standard 256-bit encryption.
                   </p>
                </div>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="py-20 flex flex-col items-center text-center animate-in zoom-in-95 duration-700">
              <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mb-10 border border-blue-500/20">
                <CheckCircle2 size={48} className="text-blue-500" />
              </div>
              <h2 className="text-5xl font-black uppercase tracking-tighter text-white mb-6">Payment Received</h2>
              <p className="text-zinc-400 text-sm font-light leading-relaxed max-w-sm mb-12">
                Thank you for choosing Vercel. Your custom build for the <span className="text-white font-bold">{selectedModel}</span> is now entering production. You will receive a confirmation email shortly.
              </p>
              <button 
                onClick={onClose}
                className="px-16 py-6 bg-white text-black font-black rounded-2xl uppercase tracking-[0.4em] text-xs hover:bg-zinc-200 transition-all"
              >
                Return to Store
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseFlow;
