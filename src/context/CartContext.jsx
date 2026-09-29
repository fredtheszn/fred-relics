import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('fred_relics_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('fred_relics_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const addToCart = (product, quantity = 1, size = null) => {
    const chosenSize = size || (product.sizes && product.sizes[0]) || 'Standard';
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === chosenSize
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      } else {
        return [...prev, { product, quantity, size: chosenSize }];
      }
    });
    showNotification(`Added ${product.name} to Bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId, size) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size === size))
    );
  };

  const updateQuantity = (productId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.size === size) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
        itemCount,
        subtotal,
        notification
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
