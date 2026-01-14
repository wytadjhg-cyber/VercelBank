
import React from 'react';
import { X, ShoppingBag } from 'lucide-react';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  count: number;
  setCount: (n: number) => void;
  onCheckout: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, count, setCount, onCheckout }) => {
  const UNIT_PRICE = 69.99;

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/85 backdrop-blur-md z-[100] transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 border-l border-white/10 z-[101] transition-transform duration-500 ease-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-10 border-b border-white/10 flex justify-between items-center bg-black">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Your Order</h2>
            <button onClick={onClose} className="p-4 bg-white/5 rounded-full text-zinc-500 hover:text-white transition-all transform hover:rotate-90">
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-10 scrollbar-hide">
            {count === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-zinc-800">
                <ShoppingBag size={80} className="mb-8 opacity-10" />
                <p className="text-xl font-black uppercase tracking-[0.4em]">Cart is Empty</p>
                <button 
                  onClick={onClose}
                  className="mt-10 text-blue-600 hover:text-blue-400 font-black uppercase tracking-[0.3em] text-[10px] underline underline-offset-8"
                >
                  Return to Store
                </button>
              </div>
            ) : (
              <div className="space-y-10">
                <div className="bg-zinc-900/40 p-10 rounded-[2.5rem] border border-white/5">
                  <div className="flex-1">
                    <h3 className="font-black text-white uppercase tracking-tighter text-2xl mb-2">Vercel Core</h3>
                    <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.5em] mb-10">High-Density Power Unit</p>
                    <div className="flex justify-between items-center">
                      <div className="font-black text-3xl text-white">${UNIT_PRICE.toFixed(2)}</div>
                      <div className="flex items-center gap-6 bg-black px-8 py-4 rounded-full border border-white/10">
                        <button onClick={() => setCount(Math.max(0, count - 1))} className="text-zinc-500 hover:text-white font-black text-xl transition-colors">-</button>
                        <span className="font-black text-sm w-6 text-center text-white">{count}</span>
                        <button onClick={() => setCount(count + 1)} className="text-zinc-500 hover:text-white font-black text-xl transition-colors">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {count > 0 && (
            <div className="p-10 border-t border-white/10 bg-black space-y-8">
              <div className="flex justify-between items-center text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em]">
                <span>Order Total</span>
                <span className="text-white font-black">${(count * UNIT_PRICE).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em]">
                <span>Logistics</span>
                <span className="text-blue-600 font-black tracking-widest">COMPLIMENTARY</span>
              </div>
              <div className="flex justify-between items-center text-4xl font-black pt-8 border-t border-white/10 text-white">
                <span className="uppercase tracking-tighter">Total</span>
                <span>${(count * UNIT_PRICE).toFixed(2)}</span>
              </div>
              <button 
                onClick={onCheckout}
                className="w-full py-10 bg-white text-black font-black text-xl rounded-[2.5rem] hover:bg-zinc-200 transition-all shadow-[0_30px_60px_rgba(255,255,255,0.1)] uppercase tracking-[0.4em] active:scale-[0.98]"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
