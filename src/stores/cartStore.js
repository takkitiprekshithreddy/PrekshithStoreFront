import { defineStore } from 'pinia'

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    items: [],
  }),
  getters: {
    cartCount: (state) => state.items.reduce((count, item) => count + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },
  actions: {
    addItem(product) {
      const existing = this.items.find((i) => i.id === product.id)
      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
    },
    removeItem(productId) {
      this.items = this.items.filter((item) => item.id !== productId)
    },
    updateQuantity(productId, quantity) {
      const item = this.items.find((i) => i.id === productId)
      if (item) {
        if (quantity > 0) item.quantity = quantity
        else this.removeItem(productId)
      }
    },
    clearCart() {
      this.items = []
    },
  },
})
