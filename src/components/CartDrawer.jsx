import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, subtotal, itemCount, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      clearCart();
    }, 1500);
  };

  const closeDrawer = () => {
    setIsCartOpen(false);
    setOrderComplete(false);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-[#0d0d0d] text-white border-l border-white/10 flex flex-col justify-between shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-[0.25em] font-mono text-neutral-400">
                  YOUR BAG
                </span>
                <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full font-mono text-neutral-300">
                  {itemCount} {itemCount === 1 ? 'RELIC' : 'RELICS'}
                </span>
              </div>
              <button
                onClick={closeDrawer}
                className="p-1.5 text-neutral-400 hover:text-white transition-colors"
                aria-label="Close Bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {orderComplete ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <CheckCircle2 className="w-16 h-16 text-white mb-6 animate-pulse" />
                  <h3 className="text-xl font-display uppercase tracking-tight mb-2">
                    RELIC RESERVED
                  </h3>
                  <p className="text-xs text-neutral-400 max-w-xs leading-relaxed mb-8">
                    Your acquisition has been registered. A confirmation dossier and tracking archive has been dispatched.
                  </p>
                  <button
                    onClick={closeDrawer}
                    className="bg-white text-black text-xs uppercase tracking-[0.2em] font-medium px-8 py-3.5 hover:bg-neutral-200 transition-colors"
                  >
                    CONTINUE EXPLORING
                  </button>
                </div>
              ) : cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <div className="w-16 h-16 mb-6 opacity-30 flex items-center justify-center border border-white/20 rounded-full">
                    <img src="/brand/fr_monogram_white.png" alt="FR" className="w-8 h-8 object-contain" />
                  </div>
                  <p className="text-sm uppercase tracking-[0.2em] font-display text-neutral-300 mb-2">
                    BAG IS EMPTY
                  </p>
                  <p className="text-xs text-neutral-500 max-w-xs mb-8">
                    Every piece in the collection is designed to become part of your story.
                  </p>
                  <Link
                    to="/shop"
                    onClick={closeDrawer}
                    className="inline-flex items-center gap-2 border border-white/20 text-white text-xs uppercase tracking-[0.2em] px-6 py-3 hover:bg-white hover:text-black transition-all"
                  >
                    DISCOVER RELICS <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className="flex gap-4 p-3 bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all group"
                    >
                      {/* Thumbnail */}
                      <div className="w-20 h-24 bg-neutral-900 overflow-hidden flex-shrink-0 relative">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 flex flex-col justify-between py-0.5">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="text-xs font-display uppercase tracking-wide text-neutral-200">
                              {item.product.name}
                            </h4>
                            <span className="text-xs font-mono font-medium text-neutral-300">
                              ${item.product.price * item.quantity}
                            </span>
                          </div>
                          <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono mt-0.5">
                            {item.product.serial}
                          </p>
                          <p className="text-[10px] text-neutral-400 mt-1">
                            Spec: <span className="text-neutral-300">{item.size}</span>
                          </p>
                        </div>

                        {/* Quantity & Delete Controls */}
                        <div className="flex items-center justify-between pt-2 border-t border-white/5">
                          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                              className="text-neutral-400 hover:text-white p-0.5"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-mono px-2 text-neutral-200">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                              className="text-neutral-400 hover:text-white p-0.5"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id, item.size)}
                            className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && !orderComplete && (
              <div className="p-6 border-t border-white/10 bg-[#0a0a0a] space-y-4">
                <div className="flex justify-between items-center text-xs text-neutral-400 font-mono">
                  <span>COMPLIMENTARY SHIPPING</span>
                  <span className="text-white">APPLIED</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs uppercase tracking-[0.2em] font-mono text-neutral-400">
                    SUBTOTAL
                  </span>
                  <span className="text-xl font-display font-bold text-white tracking-tight">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-neutral-400 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-300" />
                  <span>Insured Express Courier Dispatch</span>
                </div>

                <button
                  disabled={isCheckingOut}
                  onClick={handleCheckout}
                  className="w-full bg-white text-black py-4 uppercase tracking-[0.25em] text-xs font-semibold hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  {isCheckingOut ? (
                    <span>AUTHORIZING RESERVATION...</span>
                  ) : (
                    <>
                      <span>ACQUIRE RELICS</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
