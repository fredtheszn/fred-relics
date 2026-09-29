import { useState, useEffect } from 'react';
import { db, auth } from '../../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Plus, Trash2, Edit2 } from 'lucide-react';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Dummy data state for quick admin prototyping
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '' });

  // In a real app we'd fetch from Firestore `collection(db, 'products')`
  // But for prototype we'll establish the mock skeleton

  return (
    <div className="pt-32 p-8 max-w-6xl mx-auto min-h-screen">
      <header className="mb-12 flex justify-between items-end border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter uppercase">Admin Panel.</h1>
          <p className="text-xs tracking-widest text-gray-500">Manage Inventory & Logistics</p>
        </div>
        <button className="text-xs uppercase tracking-widest bg-black text-white px-6 py-3 font-semibold hover:bg-gray-800 transition-colors">
          Logout
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Add Product Form */}
        <div className="lg:col-span-1 bg-gray-50 p-6">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-6">Add New Item</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">Product Name</label>
              <input type="text" className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-black" placeholder="e.g. Silver Ring" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">Price (USD)</label>
              <input type="number" className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-black" placeholder="250" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">Category</label>
              <select className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-black bg-white">
                <option>Watches</option>
                <option>Bracelets</option>
                <option>Belts</option>
                <option>Rings</option>
              </select>
            </div>
            <button className="w-full bg-black text-white p-4 uppercase tracking-[0.2em] text-[10px] font-bold mt-6 hover:bg-gray-900 transition flex items-center justify-center gap-2">
              <Plus className="w-3 h-3" /> Add Product to Database
            </button>
          </div>
        </div>

        {/* Product List */}
        <div className="lg:col-span-2">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-6">Current Inventory</h2>
          
          <div className="bg-white border border-gray-200">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50 text-[10px] uppercase tracking-widest text-gray-500">
              <div className="col-span-5">Product</div>
              <div className="col-span-3">Category</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            
            {/* Mock Data Row */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 items-center text-sm">
              <div className="col-span-5 font-medium tracking-wide">Obsidian Watch</div>
              <div className="col-span-3 text-gray-500 text-xs">Watches</div>
              <div className="col-span-2">${450}</div>
              <div className="col-span-2 flex justify-end gap-3 text-gray-400">
                <button className="hover:text-black transition-colors"><Edit2 className="w-4 h-4" /></button>
                <button className="hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            
             <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 items-center text-sm">
              <div className="col-span-5 font-medium tracking-wide">Silver Curb Chain</div>
              <div className="col-span-3 text-gray-500 text-xs">Bracelets</div>
              <div className="col-span-2">${120}</div>
              <div className="col-span-2 flex justify-end gap-3 text-gray-400">
                <button className="hover:text-black transition-colors"><Edit2 className="w-4 h-4" /></button>
                <button className="hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
