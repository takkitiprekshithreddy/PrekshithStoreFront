<template>
  <div class="container py-4">
    <h2>Your Wishlist</h2>

    <!-- Empty wishlist message -->
    <div v-if="wishlistStore.items.length === 0" class="text-center py-5">
      <p>Your wishlist is empty.</p>
      <router-link class="btn btn-wishlist" :to="{ name: APP_ROUTE_NAMES.HOME }">
        Continue Shopping
      </router-link>
    </div>

    <!-- Wishlist items -->
    <div v-else>
      <div v-for="product in wishlistStore.items" :key="product.id" class="wishlist-row-custom">
        <!-- Image -->
        <div class="wishlist-img-col">
          <img :src="product.image" alt="product" class="wishlist-img" />
        </div>
        <!-- Name -->
        <div class="wishlist-name-col">
          <span>{{ product.name }}</span>
        </div>
        <!-- Add to Cart -->
        <div class="wishlist-add-col">
          <button
            class="btn btn-warning w-100"
            :disabled="addedToCart[product.id]"
            @click="handleAddToCart(product)"
          >
            {{ addedToCart[product.id] ? 'Added to Cart' : 'Add to Cart' }}
          </button>
        </div>
        <!-- Remove -->
        <div class="wishlist-remove-col">
          <button
            class="btn btn-wishlist w-100"
            @click="wishlistStore.removeFromWishlist(product.id)"
          >
            Remove from Wishlist
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWishlistStore } from '@/stores/wishlistStore'
import { useCartStore } from '@/stores/cartStore'
import { APP_ROUTE_NAMES } from '@/constants/routeNames'
import { ref } from 'vue'

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()
const addedToCart = ref({})

function handleAddToCart(product) {
  cartStore.addItem(product)
  addedToCart.value[product.id] = true
}
</script>

<style scoped>
/* Custom wishlist button styling */
.btn-wishlist {
  background: linear-gradient(90deg, #d72660 0%, #8224e3 100%); /* pink to violet */
  color: #fff !important;
  border: none;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(68, 16, 98, 0.12);
  transition:
    box-shadow 0.15s,
    filter 0.15s;
}
.btn-wishlist:hover,
.btn-wishlist:active,
.btn-wishlist:focus {
  filter: brightness(1.08);
  box-shadow: 0 4px 16px rgba(130, 36, 227, 0.18);
  color: #fff !important;
}

/* Make the wishlist rows perfectly aligned */
.wishlist-row-custom {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  background: #23272c;
  border-radius: 10px;
  padding: 12px 0 12px 0 !important;
  /* No extra left or right padding from card */
  box-shadow: none;
  border: none;
  min-height: 82px;
}

/* Image column */
.wishlist-img-col {
  width: 78px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 0;
  padding-right: 0;
}

.wishlist-img {
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 5px;
  background: #fff;
  display: block;
}

/* Name column */
.wishlist-name-col {
  flex-grow: 1;
  min-width: 0;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  padding-left: 10px;
  padding-right: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* Add to Cart button */
.wishlist-add-col {
  width: 176px;
  padding-left: 0px;
  padding-right: 14px;
}

/* Remove Button */
.wishlist-remove-col {
  width: 210px;
  padding-right: 0px;
  padding-left: 0px;
}

@media (max-width: 900px) {
  .wishlist-row-custom {
    flex-direction: column;
    align-items: stretch;
  }
  .wishlist-img-col,
  .wishlist-name-col,
  .wishlist-add-col,
  .wishlist-remove-col {
    width: 100% !important;
    padding: 8px 0 !important;
  }
  .wishlist-name-col {
    font-size: 16px;
  }
}
</style>
