import React, { useEffect, useRef, useState } from 'react';
import { X, Loader2, ShieldCheck, Lock } from 'lucide-react';

interface PurchaseFlowProps {
  onClose: () => void;
  onComplete: () => void;
  productImage: string;
}

const PAYPAL_CLIENT_ID =
  "AaUWy1kyY_e25tOqB78Zpaq3IObGDkFl927z3wfIx6k_mwei9wSFQp0cCw6rGOvH5eFUfTF31ushF5Uf";

const PurchaseFlow: React.FC<PurchaseFlowProps> = ({ onClose, onComplete }) => {
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);
  const buttonsRendered = useRef(false);

  useEffect(() => {
    // Prevent loading SDK multiple times
    if ((window as any).paypal) {
      setIsSdkLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&components=buttons&currency=USD`;
    script.async = true;
    script.crossOrigin = "anonymous";

    script.onload = () => setIsSdkLoaded(true);
    script.onerror = () => console.error("Failed to load PayPal SDK");

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (!isSdkLoaded) return;
    if (!(window as any).paypal) return;
    if (buttonsRendered.current) return;

    buttonsRendered.current = true;

    (window as any).paypal.Buttons({
      createOrder: async () => {
        const res = await fetch("/api/orders", { method: "POST" });

        if (!res.ok) {
          throw new Error("Failed to create PayPal order");
        }

        const data = await res.json();
        return data.id;
      },

      onApprove: async (data: any) => {
        const res = await fetch("/api/capture", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderID: data.orderID })
        });

        if (!res.ok) {
          throw new Error("Failed to capture PayPal order");
        }

        alert("Payment successful!");
        onComplete();
      },

      onCancel: () => {
        alert("Payment cancelled.");
      },

      onError: (err: any) => {
        console.error("PayPal error:", err);
        alert("Payment error.");
      }
    }).render("#paypal-button-container");
  }, [isSdkLoaded, onComplete]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-zinc-950 rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-black">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white">
              Secure Checkout
            </h2>
            <div className="flex items-center gap-2 text-zinc-500 mt-1">
              <Lock size={12} />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Encrypted Session
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 bg-white/5 rounded-full text-zinc-500 hover:text-white transition-all transform hover:rotate-90"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8 md:p-12">
          {!isSdkLoaded && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">
                Initializing Gateway...
              </p>
            </div>
          )}

          <div
            id="paypal-button-container"
            className="w-full min-h-[150px]"
          ></div>

          <div className="mt-10 pt-10 border-t border-white/5 flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-3 text-blue-500/50">
              <ShieldCheck size={20} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                Purchase Protection Active
              </span>
            </div>
            <p className="text-zinc-600 text-[9px] font-medium leading-relaxed uppercase tracking-widest max-w-xs mx-auto">
              Payments are processed securely by PayPal. Your financial
              information is never shared with Vercel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseFlow;
