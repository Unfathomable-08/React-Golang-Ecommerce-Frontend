import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,

      initCart: async () => {
        useCartStore.persist.rehydrate(); // Ensure storage is loaded
        let id = get().cartId;
        if (!id) {
          id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36);
          set({ cartId: id });
        }
        await get().fetchCart();
      },

      fetchCart: async () => {
        const id = get().cartId;
        if (!id) return;

        try {
          const res = await fetch(`/api/cart?cartId=${id}`);
          const data = await res.json();
          if (data && data.items) {
            console.log(data.items)
            const mappedItems = data.items.map(item => ({
              id: item.productId._id,
              name: item.productId.name,
              price: item.productId.price,
              image: item.productId.images?.[0]?.url,
              quantity: item.qty,
              ...item.productId
            }));
            set({ items: mappedItems });
          }
        } catch (error) {
          console.error('Failed to fetch cart:', error);
        }
      },

      addItem: async (item) => {
        const { cartId } = get();
        if (!cartId) await get().initCart(); // Ensure ID exists

        // Optimistic update
        const existingItem = get().items.find((i) => i.id === item.id);
        if (existingItem) {
          set({
            items: get().items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ items: [...get().items, { ...item, quantity: 1 }] });
        }

        // API Call
        try {
          await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              cartId: get().cartId,
              productId: item.id || item._id,
              qty: 1
            })
          });
          // Background sync to ensure correctness
          get().fetchCart();
        } catch (err) {
          console.error("Add to cart failed", err);
          // Revert or show error? For now just log
        }
      },

      removeItem: async (id) => {
        // Optimistic
        set({ items: get().items.filter((i) => i.id !== id) });

        try {
          await fetch(`/api/cart?cartId=${get().cartId}&productId=${id}`, {
            method: 'DELETE'
          });
        } catch (err) {
          console.error("Remove item failed", err);
        }
      },

      updateQuantity: async (id, quantity) => {
        if (quantity <= 0) {
          await get().removeItem(id);
          return;
        }

        // Optimistic
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        });

        try {
          await fetch('/api/cart', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              cartId: get().cartId,
              productId: id,
              qty: quantity
            })
          });
        } catch (err) {
          console.error("Update qty failed", err);
        }
      },

      clearCart: () => {
        set({ items: [] });
        // Optionally clear on backend too if "Order Placed"
        // We might want a clearCart API endpoint or just let it expire
      },

      totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: 'go-cart-storage',
      skipHydration: true,
      partialize: (state) => ({ cartId: state.cartId }), // Only persist cartId
    }
  )
);