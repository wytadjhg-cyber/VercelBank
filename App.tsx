
import React, { useState } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Features from './components/Features.tsx';
import Lifestyle from './components/Lifestyle.tsx';
import ProductDetails from './components/ProductDetails.tsx';
import Testimonials from './components/Testimonials.tsx';
import Pricing from './components/Pricing.tsx';
import FAQ from './components/FAQ.tsx';
import Footer from './components/Footer.tsx';
import CartSidebar from './components/CartSidebar.tsx';
import PurchaseFlow from './components/PurchaseFlow.tsx';

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isPurchaseFlowOpen, setIsPurchaseFlowOpen] = useState(false);

  // The high-resolution asset link provided by the user
  const PRODUCT_IMAGE = "https://i.ibb.co/QjKsGkBV/phone-case.jpg";

  const startPurchaseFlow = () => {
    setIsPurchaseFlowOpen(true);
  };

  const completeCheckout = () => {
    setCartCount(prev => prev + 1);
    setIsPurchaseFlowOpen(false);
    setIsCartOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white">
      {/* Ambient background glow */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <Navbar onCartClick={() => setIsCartOpen(true)} cartCount={cartCount} />
      
      <main className="relative z-10">
        <Hero onBuyNow={startPurchaseFlow} />
        <Features />
        <Lifestyle />
        <ProductDetails />
        <Testimonials />
        <Pricing onAddToCart={startPurchaseFlow} productImage={PRODUCT_IMAGE} />
        <FAQ />
      </main>

      <Footer />
      
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        count={cartCount}
        setCount={setCartCount}
      />

      {isPurchaseFlowOpen && (
        <PurchaseFlow 
          onClose={() => setIsPurchaseFlowOpen(false)} 
          onComplete={completeCheckout} 
          productImage={PRODUCT_IMAGE}
        />
      )}
    </div>
  );
};

export default App;
