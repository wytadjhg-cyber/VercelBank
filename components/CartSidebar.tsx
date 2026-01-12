
import React from 'react';
import { X, ShoppingBag } from 'lucide-react';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  count: number;
  setCount: (n: number) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, count, setCount }) => {
  const UNIT_PRICE = 69.99;

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 border-l border-white/10 z-[101] transition-transform duration-500 ease-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-8 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-tight">Your Selection</h2>
            <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-8">
            {count === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-zinc-500">
                <ShoppingBag size={64} className="mb-6 opacity-20" />
                <p className="text-lg">Your cart is empty.</p>
                <button 
                  onClick={onClose}
                  className="mt-6 text-blue-500 hover:text-blue-400 font-medium underline underline-offset-4"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex gap-6 items-center bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=200&auto=format&fit=crop" 
                      alt="Product" 
                      className="w-20 h-20 rounded-xl object-cover border border-white/10 glow-blue"
                    />
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-0.5">
                      <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                      <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                      <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                      <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">Vercel Power Case</h3>
                    <p className="text-zinc-500 text-sm mb-4">Core Edition / Modern iPhone</p>
                    <div className="flex justify-between items-center">
                      <div className="font-bold text-blue-500">${UNIT_PRICE.toFixed(2)}</div>
                      <div className="flex items-center gap-4 bg-zinc-950 px-3 py-1 rounded-full border border-white/10">
                        <button onClick={() => setCount(Math.max(0, count - 1))} className="text-zinc-400 hover:text-white">-</button>
                        <span className="font-medium text-sm w-4 text-center">{count}</span>
                        <button onClick={() => setCount(count + 1)} className="text-zinc-400 hover:text-white">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {count > 0 && (
            <div className="p-8 border-t border-white/10 bg-zinc-950 space-y-6">
              <div className="flex justify-between items-center text-zinc-400">
                <span>Subtotal</span>
                <span className="text-white font-medium">${(count * UNIT_PRICE).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-zinc-400">
                <span>Shipping</span>
                <span className="text-blue-500 font-bold uppercase text-[10px] tracking-widest">FREE</span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold pt-4 border-t border-white/5">
                <span>Total</span>
                <span>${(count * UNIT_PRICE).toFixed(2)}</span>
              </div>
              <button className="w-full py-5 bg-white text-black font-black text-xl rounded-2xl hover:bg-zinc-200 transition-colors shadow-xl">
                Checkout Now
              </button>
              <p className="text-center text-[10px] text-zinc-600 tracking-widest uppercase">
                Secure SSL Encrypted Payment
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
