import { useState, useCallback } from 'react';

export function useCartVisibility() {
  const [isCartVisible, setIsCartVisible] = useState(false);

  const toggleCart = useCallback(() => {
    setIsCartVisible(prev => !prev);
  }, []);

  return { isCartVisible, toggleCart };
}