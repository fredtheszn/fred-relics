import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);

  if (!quickViewProduct) return null;

  const activeSize = selectedSize || (quickViewProduct.sizes && quickViewProduct.sizes[0]);

  const handleAdd = () => {
    addToCart(quickViewProduct, 1, activeSize);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQuickViewProduct(null);
    }, 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl bg-[#0d0d0d] border border-white/10 shadow-2xl z-10 overflow-hidden grid grid-cols-1 md:grid-cols-2 max-h-[90vh]"
        >
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 bg-black/60 backdrop-blur text-neutral-400 hover:text-white rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Product Image */}
          <div className="relative aspect-square md:aspect-auto bg-neutral-900 overflow-hidden flex items-center justify-center">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur px-2.5 py-1 text-[9px] uppercase tracking-[0.25em] font-mono text-neutral-300 border border-white/10">
              {quickViewProduct.serial}
            </div>
          </div>

          {/* Right: Product Info & Actions */}
          <div className="p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-neutral-400">
                  {quickViewProduct.category}
                </span>
                <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-neutral-300">
                  {quickViewProduct.badge}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tight text-white mb-2">
                {quickViewProduct.name}
              </h2>

              <p className="text-xl font-mono text-white mb-4">
                ${quickViewProduct.price}
              </p>

              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                {quickViewProduct.description}
              </p>

              {/* Sizes */}
              {quickViewProduct.sizes && (
                <div className="mb-6">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-neutral-400 block mb-2">
                    SELECT DIMENSION / SIZE
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`text-xs uppercase font-mono px-3.5 py-2 border transition-all ${
                          activeSize === s
                            ? 'border-white bg-white text-black font-semibold'
                            : 'border-white/15 text-neutral-400 hover:border-white/40'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Specs bullet points */}
              <div className="border-t border-white/10 pt-4 mb-6">
                <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-neutral-500 block mb-2">
                  ARCHIVE SPECIFICATIONS
                </span>
                <ul className="space-y-1.5 text-[11px] text-neutral-400">
                  {quickViewProduct.specs.slice(0, 3).map((spec, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-white/40 rounded-full"></span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <button
                onClick={handleAdd}
                className="w-full bg-white text-black py-3.5 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-neutral-200 transition-all flex items-center justify-center gap-2"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>ADDED TO BAG</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO BAG</span>
                  </>
                )}
              </button>

              <Link
                to={`/product/${quickViewProduct.id}`}
                onClick={() => setQuickViewProduct(null)}
                className="w-full border border-white/15 text-white py-3 uppercase tracking-[0.2em] text-xs font-mono text-center block hover:border-white/40 transition-all"
              >
                VIEW COMPLETE DOSSIER →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
