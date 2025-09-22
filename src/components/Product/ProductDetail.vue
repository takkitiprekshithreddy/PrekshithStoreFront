<template>
  <div class="modal fade" tabindex="-1" :id="`productDetailModal-${product.id}`">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="main-heading">Product Details</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row g-4">
            <div class="col-md-6">
              <div class="">
                <img
                  :src="product.image || 'https://placehold.co/600x400'"
                  class="img-fluid rounded-3"
                  style="max-height: 400px"
                />
              </div>
            </div>

            <div class="col-md-6">
              <h2 class="product-title">{{ product.name }}</h2>
              <span v-if="product.bestSeller" class="badge text-bg-warning p-2">
                <i class="bi bi-star-fill"></i> Bestseller
              </span>
              <span>
                <i class="bi bi-tag-fill px-1"></i>
                <span class="product-category">{{ product.category }}</span>
              </span>
              <p class="text-muted">{{ product.description }}</p>

              <div class="h3 price-container">
                <span
                  class="product-price"
                  :style="{ textDecoration: product.salePrice ? 'line-through' : 'none' }"
                >
                  ₹{{ product.price.toFixed(0) }}
                </span>
                <!--Add text-dcoration line through if product.saleprice is present-->
                <span class="product-sale" v-if="product.salePrice">
                  ₹{{ product.salePrice.toFixed(0) }}</span
                >
              </div>

              <div class="">
                <div class="d-flex align-items-center gap-2 mb-2"></div>
                <div class="product-tags">
                  <span class="product-tag" v-for="(tag, index) in product.tags" :key="index">{{
                    tag
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            class="btn-wishlist"
            @click="handleWishlistToggle()"
            :class="{
              'btn-warning': isWishlisted,
              'btn-outline-warning': !isWishlisted,
              'btn-wishlist': true,
            }"
          >
            {{ isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist' }}
          </button>
          <button class="add-to-cart-btn" @click="handleAddToCart" :disabled="isAddedToCart">
            {{ isAddedToCart ? 'Added to Cart' : 'Add to Cart' }}
          </button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'
// import { QueryEndAtConstraint } from 'firebase/firestore'
import { useWishlistStore } from '@/stores/wishlistStore'
import { ref, computed } from 'vue'

const props = defineProps({ product: Object })
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const isAddedToCart = ref(false)
const isWishlisted = computed(() => wishlistStore.isWishlisted(props.product.id))
function handleWishlistToggle() {
  if (isWishlisted.value) {
    wishlistStore.removeFromWishlist(props.product.id)
  } else {
    wishlistStore.addToWishlist(props.product)
  }
}

const handleAddToCart = () => {
  cartStore.addItem({ ...props.product, quantity: 1 })
  isAddedToCart.value = true
}
</script>

<style scoped>
.add-to-cart-btn {
  background-color: #ff9900;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
}
.add-to-cart-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.product-detail-container {
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
}
.main-heading {
  color: rgb(52, 172, 176);
}

.product-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-image img {
  max-width: 100%;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  padding: 10px;
}

.product-info {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-title {
  font-size: 1.6rem;
  font-weight: bold;
  color: #111;
}

.product-description {
  font-size: 1rem;
  line-height: 1.5;
  color: #333;
}

.price-container {
  margin: 10px 0;
}

.product-price {
  font-size: 1.6rem;
  font-weight: bold;
  color: #1e90ff; /* Final price - Dodger Blue */
}

.product-sale {
  font-size: 1.2rem;
  color: #b8a74b; /* Original price - Goldish tone */
  margin-left: 10px;
}

.btn-contact {
  background-color: #007bff; /* Blue Amazon style */
  border: none;
  font-weight: 600;
  color: white;
  padding: 12px 20px;
  border-radius: 6px;
  transition: all 0.3s ease;
  cursor: pointer;
  width: fit-content;
}

.btn-contact:hover {
  background-color: #0056b3;
  color: #ffd700; /* Gold text on hover */
}
.product-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #1e90ff; /* Title in Dodger Blue */
  margin-bottom: 10px;
}

.product-category {
  display: inline-block;
  background-color: orange;
  color: white;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 12px;
  margin-bottom: 15px;
}

.product-tags {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.product-tag {
  background: #ff4d6d; /* fixed pink/red */
  color: #fff; /* white text */
  font-size: 0.85rem;
  font-weight: 500;
  padding: 5px 12px;
  border-radius: 15px; /* pill shape */
  border: 1px solid #ff4d6d;
}
.wishlist-btn {
  margin-left: 1rem;
}
.btn-warning {
  background-color: #ffd700 !important; /* golden */
  color: #000;
  border: 1px solid #ccc;
}
.btn-outline-warning {
  background-color: transparent;
  border: 1px solid #ffd700;
  color: #ffd700;
}
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
</style>
