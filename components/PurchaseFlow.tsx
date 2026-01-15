
import React, { useEffect, useState } from 'react';
import { X, Loader2, ShieldCheck, Lock } from 'lucide-react';

interface PurchaseFlowProps {
  onClose: () => void;
  onComplete: () => void;
  productImage: string;
}

// Public Client ID (Safe to be public as per PayPal docs)
const PAYPAL_CLIENT_ID = "AaUWy1kyY_e25tOqB78Zpaq3IObGDkFl927z3wfIx6k_mwei9wSFQp0cCw6rGOvH5eFUfTF31ushF5Uf";

const PurchaseFlow: React.FC<PurchaseFlowProps> = ({ onClose, onComplete }) => {
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);

  useEffect(() => {
    // 1. Prevent multiple script loads
    if (window.hasOwnProperty('paypal')) {
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
    
    document.body.appendChild(script);

    function renderButtons() {
      const container = document.getElementById('paypal-button-container');
      if (container && (window as any).paypal) {
        // Clear container before rendering to prevent double buttons
        container.innerHTML = '';
        (window as any).paypal.Buttons({
          createOrder: async () => {
            const res = await fetch("/api/orders", { method: "POST" });
            if (!res.ok) throw new Error("Could not create order");
            const data = await res.json();
            return data.id;
          },
          onApprove: async (data: any) => {
            const res = await fetch(`/api/orders/${data.orderID}/capture`, { method: "POST" });
            if (res.ok) {
                alert("Payment authorized. Welcome to Vercel.");
                onComplete();
            } else {
                alert("Authorization failed. Please check your bank.");
            }
          },
          onCancel: () => console.log("User cancelled"),
          onError: (err: any) => { 
            console.error("PayPal Error:", err); 
            alert("Payment could not be processed at this time."); 
          }
        }).render("#paypal-button-container");
      }
    }

    return () => {
      // Cleanup is usually not required for the SDK script as it's a global dependency
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-zinc-950 rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden">
        <div className="p-8 md:p-10 border-b border-white/5 flex justify-between items-center bg-black">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Checkout</h2>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] mt-1">Vercel Core Premium</p>
          </div>
          <button onClick={onClose} className="p-4 bg-white/5 rounded-full text-zinc-500 hover:text-white transition-all transform hover:rotate-90">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 md:p-12">
          {!isSdkLoaded && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-6" />
              <p className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-700 text-center">Opening Secure Channel...</p>
            </div>
          )}
          
          <div id="paypal-button-container" className="w-full min-h-[150px]"></div>

          <div className="mt-12 pt-10 border-t border-white/5 space-y-8">
            <div className="flex items-center justify-center gap-4 text-blue-500/40">
              <ShieldCheck size={24} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">PayPal Security Verified</span>
            </div>
            
            <div className="flex items-center justify-center gap-3">
               <Lock size={14} className="text-zinc-800" />
               <p className="text-zinc-700 text-[9px] font-bold uppercase tracking-[0.2em] text-center max-w-xs leading-relaxed">
                 Encrypted Transaction Gateway. Your data is protected by global banking standards.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseFlow;
