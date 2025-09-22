import { defineStore } from 'pinia'

export const useWishlistStore = defineStore('wishlistStore', {
  state: () => ({
    items: [], // Array of product objects in the wishlist
  }),
  getters: {
    isWishlisted: (state) => (productId) => {
      return state.items.some((item) => item.id === productId)
    },
  },
  actions: {
    addToWishlist(product) {
      // Only add if not already in wishlist
      if (!this.isWishlisted(product.id)) {
        this.items.push(product)
      }
    },
    removeFromWishlist(productId) {
      this.items = this.items.filter((item) => item.id !== productId)
    },
    clearWishlist() {
      this.items = []
    },
  },
})
