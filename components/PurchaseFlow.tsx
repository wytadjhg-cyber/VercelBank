
import React, { useEffect, useState } from 'react';
import { X, Loader2, ShieldCheck, Lock } from 'lucide-react';

interface PurchaseFlowProps {
  onClose: () => void;
  onComplete: () => void;
  productImage: string;
}

// Public Client ID (Safe to be public)
const PAYPAL_CLIENT_ID = "AaUWy1kyY_e25tOqB78Zpaq3IObGDkFl927z3wfIx6k_mwei9wSFQp0cCw6rGOvH5eFUfTF31ushF5Uf";

const PurchaseFlow: React.FC<PurchaseFlowProps> = ({ onClose, onComplete }) => {
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Avoid double loading
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
                alert("Thank you. Your Vercel order is confirmed.");
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
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-zinc-950 rounded-[3rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden">
        <div className="p-8 md:p-10 border-b border-white/5 flex justify-between items-center bg-black">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white leading-none">Checkout</h2>
            <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Vercel Core Premium</p>
          </div>
          <button onClick={onClose} className="p-4 bg-white/5 rounded-full text-zinc-500 hover:text-white transition-all transform hover:rotate-90">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 md:p-12">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold uppercase tracking-widest text-center">
              {error}
            </div>
          )}

          {!isSdkLoaded && !error && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-6" />
              <p className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-700 text-center">Establishing Secure Link...</p>
            </div>
          )}
          
          <div id="paypal-button-container" className="w-full min-h-[150px]"></div>

          <div className="mt-12 pt-10 border-t border-white/5 space-y-8">
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
      </div>
    </div>
  );
};

export default PurchaseFlow;
