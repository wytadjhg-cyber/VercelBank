import React, { useState, useEffect } from 'react';
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

declare global {
  interface Window {
    paypal: any;
  }
}

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isPurchaseFlowOpen, setIsPurchaseFlowOpen] = useState(false);

  const PRODUCT_IMAGE = "https://i.ibb.co/QjKsGkBV/phone-case.jpg";

  const startPurchaseFlow = () => {
    setIsCartOpen(false);
    setIsPurchaseFlowOpen(true);
  };

  const completeCheckout = () => {
    setCartCount(0);
    setIsPurchaseFlowOpen(false);
  };

  // 🔥 LOAD PAYPAL SDK ONCE
  useEffect(() => {
    if (document.getElementById("paypal-sdk")) return;

    const script = document.createElement("script");
    script.id = "paypal-sdk";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AaUWy1kyY_e25tOqB78Zpaq3IObGDkFl927z3wfIx6k_mwei9wSFQp0cCw6rGOvH5eFUfTF31ushF5Uf&components=buttons&currency=USD";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // 🔥 RENDER PAYPAL BUTTONS WHEN CHECKOUT OPENS
  useEffect(() => {
    if (!isPurchaseFlowOpen) return;
    if (!window.paypal) return;

    setTimeout(() => {
      window.paypal.Buttons({
        createOrder: async () => {
          const res = await fetch("/api/orders", { method: "POST" });
          const data = await res.json();
          return data.id;
        },
        onApprove: async (data: any) => {
          await fetch(`/api/orders/${data.orderID}/capture`, {
            method: "POST",
          });
          alert("Payment successful!");
          completeCheckout();
        },
        onError: (err: any) => {
          console.error("PayPal error:", err);
          alert("Payment failed. Please try again.");
        },
      }).render("#paypal-button-container");
    }, 300);
  }, [isPurchaseFlowOpen]);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white">
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
        onCheckout={startPurchaseFlow}
      />

      {isPurchaseFlowOpen && (
        <PurchaseFlow 
          onClose={() => setIsPurchaseFlowOpen(false)} 
          onComplete={completeCheckout} 
          productImage={PRODUCT_IMAGE}
        >
          {/* 🔥 PAYPAL BUTTON GOES HERE */}
          <div id="paypal-button-container" className="mt-6"></div>
        </PurchaseFlow>
      )}
    </div>
  );
};

export default App;
