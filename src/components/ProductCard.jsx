import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ relic, priority = false }) {
  const { addToCart, setQuickViewProduct } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col cursor-pointer"
    >
      {/* Editorial Image Canvas */}
      <div className="relative aspect-[4/5] bg-[#0c0c0c] overflow-hidden border border-white/5 group-hover:border-white/20 transition-all duration-700">
        <Link to={`/product/${relic.id}`} className="absolute inset-0 z-10 block">
          <span className="sr-only">View {relic.name}</span>
        </Link>

        {/* Relic Serial Badge Overlay */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
          <span className="bg-black/80 backdrop-blur px-2.5 py-1 text-[9px] uppercase tracking-[0.25em] font-mono text-neutral-400 border border-white/10">
            {relic.serial}
          </span>
          {relic.badge && (
            <span className="hidden sm:inline-block bg-white/10 backdrop-blur px-2 py-1 text-[9px] uppercase tracking-[0.2em] font-mono text-neutral-300">
              {relic.badge}
            </span>
          )}
        </div>

        {/* Main Image with Zoom on Hover */}
        <div className="w-full h-full overflow-hidden">
          <img
            src={relic.image}
            alt={relic.name}
            loading={priority ? "eager" : "lazy"}
            className="w-full h-full object-cover transform transition-transform duration-1000 ease-out group-hover:scale-108 filter contrast-[1.05]"
          />
        </div>

        {/* Ambient Dark Gradient on bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-40 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" />

        {/* Quick Action Buttons (Slide in on hover) */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex gap-2 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              addToCart(relic, 1);
            }}
            className="flex-1 bg-white text-black py-3 px-3 uppercase tracking-[0.2em] text-[11px] font-semibold hover:bg-neutral-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>ACQUIRE</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setQuickViewProduct(relic);
            }}
            className="bg-black/80 backdrop-blur text-white p-3 border border-white/20 hover:bg-white hover:text-black transition-all flex items-center justify-center"
            aria-label="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editorial Meta */}
      <div className="pt-4 flex justify-between items-start gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-neutral-400 block mb-1">
            {relic.category}
          </span>
          <Link to={`/product/${relic.id}`} className="block group-hover:text-neutral-300 transition-colors">
            <h3 className="text-sm md:text-base font-display font-medium uppercase tracking-tight text-white">
              {relic.name}
            </h3>
          </Link>
        </div>

        <div className="text-right">
          <p className="text-sm font-mono text-neutral-300 tracking-wider">
            ${relic.price}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
