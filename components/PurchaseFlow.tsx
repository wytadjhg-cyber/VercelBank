
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
    // 1. Check if script already exists to avoid duplicates
    if (document.getElementById('paypal-sdk')) {
      setIsSdkLoaded(true);
      return;
    }

    // 2. Load PayPal SDK dynamically
    const script = document.createElement('script');
    script.id = 'paypal-sdk';
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&components=buttons&currency=USD`;
    script.async = true;
    script.crossOrigin = "anonymous";
    
    script.onload = () => {
      setIsSdkLoaded(true);
      if ((window as any).paypal) {
        // Render the buttons using the exact logic provided in the prompt
        (window as any).paypal.Buttons({
          createOrder: async () => {
            const res = await fetch("/api/orders", { method: "POST" });
            const data = await res.json();
            return data.id;
          },
          onApprove: async (data: any) => {
            const res = await fetch(`/api/orders/${data.orderID}/capture`, { method: "POST" });
            if (res.ok) {
                alert("Payment successful!");
                onComplete();
            } else {
                alert("Payment capture failed. Please contact support.");
            }
          },
          onCancel: () => alert("Payment cancelled."),
          onError: (err: any) => { 
            console.error("PayPal Error:", err); 
            alert("Payment error. Please try again or use a different method."); 
          }
        }).render("#paypal-button-container");
      }
    };
    
    script.onerror = () => {
      console.error("PayPal SDK failed to load.");
    };

    document.body.appendChild(script);

    return () => {
      // We keep the script tag to avoid re-loading it if the modal is re-opened
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-zinc-950 rounded-[3rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,1)] overflow-hidden">
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
              <p className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-700">Connecting to Global Gateway...</p>
            </div>
          )}
          
          {/* PayPal Button Container */}
          <div id="paypal-button-container" className="w-full min-h-[150px] transition-opacity duration-500"></div>

          <div className="mt-12 pt-10 border-t border-white/5 space-y-8">
            <div className="flex items-center justify-center gap-4 text-blue-500/40">
              <ShieldCheck size={24} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">PayPal Security Verified</span>
            </div>
            
            <div className="flex items-center justify-center gap-3">
               <Lock size={14} className="text-zinc-800" />
               <p className="text-zinc-700 text-[9px] font-bold uppercase tracking-[0.2em] text-center max-w-xs leading-relaxed">
                 End-to-end encrypted transaction. Your financial data is handled exclusively by PayPal.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseFlow;
