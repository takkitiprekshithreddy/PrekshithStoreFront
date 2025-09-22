<template>
  <div class="container py-4">
    <h2>Your Cart</h2>

    <div v-if="!cartStore.cartCount" class="text-center py-5">
      <p>Your cart is empty.</p>
      <router-link class="btn btn-warning" :to="{ name: APP_ROUTE_NAMES.HOME }">
        Continue Shopping
      </router-link>
    </div>

    <div v-else>
      <div
        v-for="item in cartStore.items"
        :key="item.id"
        class="cart-item d-flex align-items-center justify-content-between mb-3 p-3 rounded"
      >
        <div class="d-flex align-items-center item-left">
          <img :src="item.image" alt="product" class="item-image me-3" />
          <div class="item-name">{{ item.name }}</div>
        </div>

        <div class="item-price">₹{{ item.price.toFixed(0) }}</div>

        <div class="quantity-control d-flex align-items-center">
          <button
            class="qty-btn"
            :disabled="item.quantity <= 1"
            @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
          >
            –
          </button>
          <span class="qty-value">{{ item.quantity }}</span>
          <button class="qty-btn" @click="cartStore.updateQuantity(item.id, item.quantity + 1)">
            +
          </button>
        </div>

        <div class="item-subtotal">₹{{ (item.price * item.quantity).toFixed(0) }}</div>

        <button
          class="btn btn-sm btn-outline-danger remove-btn"
          @click="cartStore.removeItem(item.id)"
        >
          Remove
        </button>
      </div>

      <div class="d-flex justify-content-end fs-4 mt-4">
        Total: ₹{{ cartStore.totalPrice.toFixed(0) }}
      </div>

      <div class="text-end mt-3">
        <button class="btn btn-success" @click="proceedToPay">Proceed to Pay</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { useSwal } from '@/composibles/useSwal'
import { APP_ROUTE_NAMES } from '@/constants/routeNames'

const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()
const { showSuccess } = useSwal()

function proceedToPay() {
  if (!authStore.isAuthenticated) {
    router.push({ name: APP_ROUTE_NAMES.SIGN_IN })
  } else {
    showSuccess('Order placed successfully!')
    cartStore.clearCart()
  }
}
</script>

<style scoped>
.cart-item {
  background-color: var(--bs-body-bg);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.item-left {
  flex: 2;
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.item-name {
  font-weight: 500;
}

.item-price,
.item-subtotal {
  flex: 1;
  text-align: center;
  font-weight: 500;
}

.quantity-control {
  flex: 1;
  justify-content: center;
  background-color: #f4c712; /* light golden */
  color: #000;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
}

.qty-btn {
  background: transparent;
  border: none;
  color: #000;
  font-size: 1.2rem;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.qty-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.qty-value {
  margin: 0 0.75rem;
  min-width: 24px;
  text-align: center;
  font-weight: 600;
}

.remove-btn {
  flex: 0.5;
}

@media (max-width: 576px) {
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  .item-price,
  .item-subtotal,
  .quantity-control,
  .remove-btn {
    flex: none;
    width: 100%;
    text-align: left;
  }
}
</style>
