import { create } from 'zustand';
import { Product } from '../types/product';

interface CartStore {
  items: Product[];
  isOpen: boolean;
  toggleCart: () => void;
  addItem: (item: Product) => void;
  removeItem: (itemId: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  isOpen: false,
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  addItem: (item) =>
    set((state) => ({ items: [...state.items, item], isOpen: true })),
  removeItem: (itemId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
      isOpen: state.items.length > 1,
    })),
  clearCart: () => set({ items: [], isOpen: false }),
}));