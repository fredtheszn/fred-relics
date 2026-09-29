import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';

import { CartProvider } from './context/CartContext';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';
import QuickViewModal from './components/QuickViewModal';
import Footer from './components/Footer';

import Home from './pages/Home';
import Shop from './pages/Shop';
import Collections from './pages/Collections';
import Product from './pages/Product';
import About from './pages/About';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  // Initialize Lenis smooth scrolling
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let lenis;
    try {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 0.9,
        smoothTouch: false,
        touchMultiplier: 1.5,
        infinite: false,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    } catch (e) {
      console.warn('Lenis scroll error:', e);
    }

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Preloader />

        {/* Global Film Grain Noise Texture */}
        <div className="bg-noise pointer-events-none" />

        {/* Core App Shell */}
        <div className="relative min-h-screen bg-[#050505] text-[#f5f5f5] flex flex-col justify-between">
          <Navbar />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>

          <Footer />

          {/* Global Interactive Overlays */}
          <CartDrawer />
          <SearchModal />
          <QuickViewModal />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}
