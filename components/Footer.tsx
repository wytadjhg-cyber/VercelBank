
import React from 'react';
import { MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-20 border-t border-white/5 bg-black">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <span className="text-3xl font-black tracking-tighter mb-4 block uppercase">VERCEL</span>
            <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
              Premium technology and refined design for the modern professional.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-12 text-center md:text-left">
            <div className="flex flex-col space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Support</span>
              <a 
                href="https://wa.me/16825215131" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center md:justify-start text-blue-500 hover:text-blue-400 transition-colors text-sm font-bold"
              >
                <MessageCircle size={16} className="mr-2" />
                WhatsApp: +1 682 521 5131
              </a>
              <span className="text-zinc-600 text-sm cursor-default select-none uppercase tracking-widest text-[10px] font-bold">Help Center</span>
              <span className="text-zinc-600 text-sm cursor-default select-none uppercase tracking-widest text-[10px] font-bold">Shipping</span>
              <span className="text-zinc-600 text-sm cursor-default select-none uppercase tracking-widest text-[10px] font-bold">Returns</span>
            </div>
            <div className="flex flex-col space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Legal</span>
              <span className="text-zinc-600 text-sm cursor-default select-none uppercase tracking-widest text-[10px] font-bold">Privacy</span>
              <span className="text-zinc-600 text-sm cursor-default select-none uppercase tracking-widest text-[10px] font-bold">Terms</span>
            </div>
          </div>
        </div>
        
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-zinc-600 text-xs tracking-widest">
          <div className="cursor-default uppercase font-black text-[9px]">© 2026 VERCEL TECH LTD. ALL RIGHTS RESERVED.</div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {/* Social links removed */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
