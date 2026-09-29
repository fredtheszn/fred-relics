import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Search, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount, setIsCartOpen, setIsSearchOpen } = useCart();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 40) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
  });

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          hasScrolled
            ? 'bg-[#050505]/85 backdrop-blur-xl border-b border-white/10 py-4 text-white shadow-2xl'
            : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-6 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="group flex items-center gap-3 relative z-10">
            <div className="h-6 md:h-7 w-auto flex items-center">
              <img 
                src="/brand/wordmark_white.png" 
                alt="FRED RELICS" 
                className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-[1.02] filter brightness-100" 
              />
            </div>
            <span className="hidden sm:inline-block w-[1px] h-3.5 bg-white/20 ml-1"></span>
            <span className="hidden sm:inline-block text-[9px] uppercase tracking-[0.3em] text-neutral-400 font-mono">
              RELICS
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-10">
            <Link
              to="/shop"
              className={`text-xs uppercase tracking-[0.25em] transition-colors relative py-1 hover:text-white ${
                location.pathname === '/shop' ? 'text-white font-medium' : 'text-neutral-300'
              }`}
            >
              Shop
              {location.pathname === '/shop' && (
                <motion.span
                  layoutId="activeNav"
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-white"
                />
              )}
            </Link>
            <Link
              to="/collections"
              className={`text-xs uppercase tracking-[0.25em] transition-colors relative py-1 hover:text-white ${
                location.pathname === '/collections' ? 'text-white font-medium' : 'text-neutral-300'
              }`}
            >
              Collections
              {location.pathname === '/collections' && (
                <motion.span
                  layoutId="activeNav"
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-white"
                />
              )}
            </Link>
            <Link
              to="/about"
              className={`text-xs uppercase tracking-[0.25em] transition-colors relative py-1 hover:text-white ${
                location.pathname === '/about' ? 'text-white font-medium' : 'text-neutral-300'
              }`}
            >
              About
              {location.pathname === '/about' && (
                <motion.span
                  layoutId="activeNav"
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-white"
                />
              )}
            </Link>
          </nav>

          {/* Right Actions: Search & Bag */}
          <div className="flex items-center gap-5 sm:gap-7">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors py-1 group"
              aria-label="Search Relics"
            >
              <Search className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              <span className="hidden lg:inline-block text-[11px] uppercase tracking-[0.2em] font-mono text-neutral-400 group-hover:text-white">
                Search
              </span>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 bg-white/5 hover:bg-white/15 px-3.5 py-1.5 rounded-full border border-white/10 text-white transition-all duration-300 group relative"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
              <span className="text-[11px] uppercase tracking-[0.2em] font-mono">
                Bag
              </span>
              <span className="bg-white text-black text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-mono">
                {itemCount}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-neutral-200 hover:text-white transition-colors p-1"
              aria-label="Open Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-[#050505] text-white flex flex-col justify-between p-8 md:hidden"
          >
            {/* Header with Close */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <div className="h-6">
                <img 
                  src="/brand/wordmark_white.png" 
                  alt="FRED RELICS" 
                  className="h-full w-auto object-contain" 
                />
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-neutral-400 hover:text-white transition-colors"
                aria-label="Close Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-8 my-auto py-10">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-center justify-between text-3xl font-display uppercase tracking-tight text-neutral-200 hover:text-white"
              >
                <span>Overview</span>
                <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
              <Link
                to="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-center justify-between text-3xl font-display uppercase tracking-tight text-neutral-200 hover:text-white"
              >
                <span>Shop Relics</span>
                <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
              <Link
                to="/collections"
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-center justify-between text-3xl font-display uppercase tracking-tight text-neutral-200 hover:text-white"
              >
                <span>Collections</span>
                <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-center justify-between text-3xl font-display uppercase tracking-tight text-neutral-200 hover:text-white"
              >
                <span>Philosophy</span>
                <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
            </nav>

            {/* Footer Note */}
            <div className="border-t border-white/10 pt-6">
              <p className="text-[10px] uppercase tracking-[0.3em] font-mono text-neutral-400 mb-2">
                FRED RELICS // ARCHIVE
              </p>
              <p className="text-sm text-neutral-300 font-display">
                NOT JUST ACCESSORIES. RELICS.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
